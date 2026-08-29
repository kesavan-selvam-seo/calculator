'use strict';

const dns = require('node:dns').promises;
const net = require('node:net');
const crypto = require('node:crypto');

const jobs = new Map();
const MAX_URLS = 10000;
const MAX_CONCURRENCY = 50;
const MAX_REDIRECTS = 10;
const JOB_TTL_MS = 30 * 60 * 1000;

function isPrivateIp(ip) {
  if (!ip) return true;
  if (net.isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    const [a, b] = parts;
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127);
  }
  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    return normalized === '::1' || normalized === '::' || normalized.startsWith('fc') ||
      normalized.startsWith('fd') || normalized.startsWith('fe80:') || normalized.startsWith('::ffff:127.');
  }
  return true;
}

function validateUrl(raw) {
  try {
    const url = new URL(raw);
    if (!['http:', 'https:'].includes(url.protocol)) return { ok: false, error: 'Only HTTP and HTTPS URLs are supported.' };
    if (url.username || url.password) return { ok: false, error: 'URLs with embedded credentials are not allowed.' };
    return { ok: true, url };
  } catch {
    return { ok: false, error: 'Invalid URL.' };
  }
}

async function assertPublicHost(hostname) {
  const lower = hostname.toLowerCase().replace(/\.$/, '');
  if (lower === 'localhost' || lower.endsWith('.localhost') || lower.endsWith('.local') || lower.endsWith('.internal')) {
    throw new Error('Blocked private or internal hostname.');
  }
  if (net.isIP(lower)) {
    if (isPrivateIp(lower)) throw new Error('Blocked private or internal IP address.');
    return;
  }
  const records = await dns.lookup(lower, { all: true, verbatim: true });
  if (!records.length || records.some((r) => isPrivateIp(r.address))) throw new Error('Blocked private or internal destination.');
}

function statusLabel(code) {
  const labels = { 200:'OK',201:'Created',202:'Accepted',204:'No Content',301:'Moved Permanently',302:'Found',303:'See Other',307:'Temporary Redirect',308:'Permanent Redirect',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',410:'Gone',429:'Too Many Requests',500:'Internal Server Error',501:'Not Implemented',502:'Bad Gateway',503:'Service Unavailable',504:'Gateway Timeout' };
  return labels[code] || (code >= 200 && code < 300 ? 'Success' : code >= 300 && code < 400 ? 'Redirect' : code >= 400 && code < 500 ? 'Client Error' : code >= 500 ? 'Server Error' : 'Unknown');
}

function classify(code) {
  if (code >= 200 && code < 300) return '2xx';
  if (code >= 300 && code < 400) return '3xx';
  if (code >= 400 && code < 500) return '4xx';
  if (code >= 500 && code < 600) return '5xx';
  return 'error';
}

function friendlyError(error) {
  const msg = String(error && error.message || error || 'Request failed');
  if (/timeout|aborted/i.test(msg)) return 'Request timed out.';
  if (/certificate|ssl|tls/i.test(msg)) return 'SSL certificate verification failed.';
  if (/ENOTFOUND|resolve|DNS/i.test(msg)) return 'Unable to resolve the domain.';
  if (/private|internal|blocked/i.test(msg)) return 'Blocked private or internal destination.';
  return 'Unable to establish a connection.';
}

async function checkUrl(originalUrl, timeoutMs) {
  const started = Date.now();
  const first = validateUrl(originalUrl);
  if (!first.ok) return baseError(originalUrl, first.error, Date.now() - started);

  let current = first.url;
  const chain = [];
  let response;

  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      await assertPublicHost(current.hostname);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        response = await fetch(current, {
          method: 'GET',
          redirect: 'manual',
          signal: controller.signal,
          headers: {
            'User-Agent': 'SEO-URL-Status-Checker/1.0',
            'Accept': '*/*',
          },
        });
      } finally {
        clearTimeout(timer);
      }

      const location = response.headers.get('location');
      if (response.status >= 300 && response.status < 400 && location) {
        if (response.body) response.body.cancel().catch(() => {});
        const next = new URL(location, current);
        chain.push({ url: current.toString(), statusCode: response.status, status: statusLabel(response.status), location: next.toString() });
        const nextValidation = validateUrl(next.toString());
        if (!nextValidation.ok) throw new Error(nextValidation.error);
        current = nextValidation.url;
        if (hop === MAX_REDIRECTS) throw new Error('Too many redirects.');
        continue;
      }
      if (response.body) response.body.cancel().catch(() => {});
      break;
    }

    return {
      originalUrl,
      checkedUrl: first.url.toString(),
      statusCode: response.status,
      status: statusLabel(response.status),
      category: classify(response.status),
      finalUrl: current.toString(),
      redirectCount: chain.length,
      redirectChain: chain,
      responseTimeMs: Date.now() - started,
      contentType: response.headers.get('content-type') || '',
      error: '',
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    return baseError(originalUrl, friendlyError(error), Date.now() - started, first.url.toString(), chain);
  }
}

function baseError(originalUrl, error, responseTimeMs, checkedUrl = '', redirectChain = []) {
  return { originalUrl, checkedUrl, statusCode: null, status: 'Error', category: 'error', finalUrl: '', redirectCount: redirectChain.length, redirectChain, responseTimeMs, contentType: '', error, checkedAt: new Date().toISOString() };
}

async function runJob(job, urls) {
  const queue = urls.slice();
  let cursor = 0;
  const workers = Array.from({ length: Math.min(job.concurrency, queue.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= queue.length) return;
      job.results[index] = await checkUrl(queue[index], job.timeoutMs);
      job.checked += 1;
      if (job.checked % 25 === 0 || job.checked === job.total) job.updatedAt = Date.now();
    }
  });
  await Promise.all(workers);
  job.status = 'completed';
  job.updatedAt = Date.now();
  job.completedAt = Date.now();
}

function cleanup() {
  const cutoff = Date.now() - JOB_TTL_MS;
  for (const [id, job] of jobs) if ((job.completedAt || job.updatedAt) < cutoff) jobs.delete(id);
}
setInterval(cleanup, 5 * 60 * 1000).unref();

function registerUrlStatusChecker(app) {
  app.get('/bulk-url-status-code-checker/', (req, res) => {
    res.sendFile(require('node:path').join(__dirname, 'public', 'bulk-url-status-code-checker', 'index.html'));
  });

  app.post('/api/url-status/check', async (req, res) => {
    try {
      const input = Array.isArray(req.body.urls) ? req.body.urls : [];
      if (input.length === 0 || input.length > MAX_URLS) return res.status(400).json({ error: `Provide between 1 and ${MAX_URLS} URLs.` });
      const urls = input.map((u) => String(u || '').trim()).filter(Boolean);
      const unique = [...new Set(urls)];
      const duplicatesRemoved = urls.length - unique.length;
      const timeoutMs = Math.min(Math.max(Number(req.body.timeoutMs) || 10000, 5000), 30000);
      const concurrency = Math.min(Math.max(Number(req.body.concurrency) || 10, 1), MAX_CONCURRENCY);
      const job = {
        id: crypto.randomUUID(), status: 'running', total: unique.length, checked: 0,
        results: new Array(unique.length), timeoutMs, concurrency, duplicatesRemoved,
        createdAt: Date.now(), updatedAt: Date.now(), completedAt: 0,
      };
      jobs.set(job.id, job);
      runJob(job, unique).catch((error) => { job.status = 'failed'; job.error = String(error.message || error); job.updatedAt = Date.now(); });
      res.json({ jobId: job.id, total: unique.length, duplicatesRemoved });
    } catch (error) {
      res.status(500).json({ error: 'Unable to start URL check.' });
    }
  });

  app.get('/api/url-status/jobs/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found or expired.' });
    const summary = { total: job.total, checked: job.checked, counts: { '2xx':0, '3xx':0, '4xx':0, '5xx':0, error:0 } };
    for (const r of job.results) if (r) summary.counts[r.category] = (summary.counts[r.category] || 0) + 1;
    res.json({ id: job.id, status: job.status, total: job.total, checked: job.checked, duplicatesRemoved: job.duplicatesRemoved, summary, results: job.status === 'completed' ? job.results : undefined, error: job.error || '' });
  });
}

module.exports = { registerUrlStatusChecker };
