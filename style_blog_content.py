from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

STYLE = '''<style id="calcuportal-blog-content-style">
/* Blog article content — light and dark theme aware. */
.article-content {
  font-family: Georgia, 'Times New Roman', serif;
  color: var(--text-primary);
  line-height: 1.65;
  text-align: justify;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  color: var(--text-primary);
}

.article-content h2 {
  font-size: clamp(1.1rem, 3.6vw, 1.35rem);
  margin-top: 2.2em;
  border-bottom: 3px solid var(--primary);
  padding-bottom: 6px;
}

.article-content h3 {
  font-size: clamp(0.98rem, 3vw, 1.08rem);
  margin-top: 1.6em;
  color: var(--primary);
}

.article-content p,
.article-content .lead,
.article-content details p {
  text-align: justify;
  color: var(--text-secondary);
}

.article-content ul,
.article-content ol,
.article-content li {
  text-align: left;
  color: var(--text-secondary);
}

.article-content figure { margin: 1.4em 0; }

.article-content figure img {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
}

.article-content figcaption {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 8px;
}

.article-content .table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.2em 0;
}

.article-content table {
  border-collapse: collapse;
  width: 100%;
  min-width: 560px;
  margin: 0;
  font-size: 0.93rem;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text-primary);
}

.article-content caption {
  text-align: left;
  font-weight: bold;
  margin-bottom: 6px;
  white-space: normal;
  color: var(--text-primary);
}

.article-content th,
.article-content td {
  border: 1px solid var(--border-color);
  padding: 9px 10px;
  text-align: left;
  vertical-align: top;
}

.article-content th {
  background: var(--primary);
  color: #fff;
  position: sticky;
  top: 0;
}

.article-content tr:nth-child(even) {
  background: var(--border-light);
}

.article-content .callout {
  background: var(--bg-card);
  border-left: 4px solid var(--warning);
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.96rem;
  text-align: left;
  color: var(--text-secondary);
}

.article-content .correction {
  background: var(--bg-card);
  border-left: 4px solid var(--danger);
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.96rem;
  text-align: left;
  color: var(--text-secondary);
}

.article-content .toc {
  background: var(--primary-light);
  padding: 16px 22px;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.94rem;
  text-align: left;
  color: var(--text-secondary);
}

.article-content .toc a {
  color: var(--primary);
  text-decoration: none;
}

.article-content .toc a:hover { text-decoration: underline; }

.article-content details {
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg-card);
  color: var(--text-secondary);
}

.article-content summary {
  font-weight: bold;
  cursor: pointer;
  color: var(--text-primary);
  text-align: left;
}

.article-content .tag {
  display: inline-block;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 0.78rem;
  font-family: Arial, Helvetica, sans-serif;
}

@media (max-width: 768px) {
  .article-content,
  .article-content p,
  .article-content .lead,
  .article-content details p { text-align: justify; }

  .article-content h1,
  .article-content h2,
  .article-content h3,
  .article-content h4,
  .article-content h5,
  .article-content h6,
  .article-content ul,
  .article-content ol,
  .article-content li,
  .article-content summary { text-align: left; }

  .article-content .toc,
  .article-content .callout,
  .article-content .correction { padding: 14px 16px; }
}

@media (max-width: 480px) {
  .article-content { line-height: 1.6; }
  .article-content p,
  .article-content .lead,
  .article-content details p { text-align: justify !important; }
  .article-content h1,
  .article-content h2,
  .article-content h3,
  .article-content h4,
  .article-content h5,
  .article-content h6,
  .article-content ul,
  .article-content ol,
  .article-content li,
  .article-content summary { text-align: left !important; }
  .article-content table { font-size: 0.82rem; min-width: 520px; }
  .article-content th,
  .article-content td { padding: 6px 7px; }
  .article-content .callout,
  .article-content .correction,
  .article-content .toc { font-size: 0.9rem; padding: 12px 14px; }
  .article-content details { padding: 9px 12px; }
}
</style>'''

for path in (ROOT / "blog").rglob("index.html"):
    text = path.read_text(encoding="utf-8")
    text = re.sub(r'<style id="calcuportal-blog-content-style">.*?</style>', '', text, flags=re.I | re.S)
    if 'class="article-content"' not in text:
        continue
    updated = text.replace('</head>', STYLE + '\n</head>', 1)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled blog content: {path}")
