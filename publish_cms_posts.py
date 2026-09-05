from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parent
BASE = "https://www.calcuportal.com"
POSTS_DIR = ROOT / "content" / "posts"

CATEGORIES = {
    "education": "Education",
    "travel": "Travel",
    "general-knowledge": "General Knowledge",
    "finance": "Finance",
    "health-fitness": "Health & Fitness",
    "technology": "Technology",
    "business-career": "Business & Career",
    "lifestyle": "Lifestyle",
}


def parse_frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) != 3:
        return {}, text
    raw = parts[1]
    body = parts[2].lstrip("\n")
    data = {}
    current = None
    for line in raw.splitlines():
        if not line.strip():
            continue
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if m:
            current = m.group(1)
            value = m.group(2).strip()
            data[current] = value.strip('"') if value else ""
        elif current and line.startswith("  "):
            data[current] = (str(data.get(current, "")) + " " + line.strip()).strip()
    return data, body


def clean_content(text):
    # CMS can save blank lines as literal HTML entities. Never publish them as visible text.
    text = re.sub(r"(?:&amp;)?nbsp;", " ", text, flags=re.I)
    return re.sub(r"[ \t]+\n", "\n", text)


def markdown_to_html(md):
    md = clean_content(md)
    lines = md.splitlines()
    out = []
    in_ul = False
    in_ol = False
    paragraph = []

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            text = " ".join(x.strip() for x in paragraph).strip()
            if text:
                text = html.escape(text, quote=False)
                text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
                text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
                text = re.sub(r"`(.+?)`", r"<code>\1</code>", text)
                text = re.sub(r"\[(.+?)\]\((https?://[^)]+|/[^)]+)\)", r'<a href="\2">\1</a>', text)
                out.append(f"<p>{text}</p>")
            paragraph = []

    def close_lists():
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    for line in lines:
        s = line.strip()
        if not s:
            flush_paragraph()
            close_lists()
            continue
        m = re.match(r"^(#{1,6})\s+(.+)$", s)
        if m:
            flush_paragraph()
            close_lists()
            level = len(m.group(1))
            out.append(f"<h{level}>{html.escape(m.group(2), quote=False)}</h{level}>")
            continue
        m = re.match(r"^[-*]\s+(.+)$", s)
        if m:
            flush_paragraph()
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{html.escape(m.group(1), quote=False)}</li>")
            continue
        m = re.match(r"^\d+\.\s+(.+)$", s)
        if m:
            flush_paragraph()
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{html.escape(m.group(1), quote=False)}</li>")
            continue
        if s.startswith("> "):
            flush_paragraph()
            close_lists()
            out.append(f"<blockquote>{html.escape(s[2:], quote=False)}</blockquote>")
            continue
        paragraph.append(s)
    flush_paragraph()
    close_lists()
    return "\n".join(out)


def category_info(meta):
    raw = (meta.get("category") or "general-knowledge").strip().lower()
    slug = re.sub(r"[^a-z0-9]+", "-", raw).strip("-") or "general-knowledge"
    label = CATEGORIES.get(slug, raw.replace("-", " ").title())
    return slug, label


def breadcrumb_html(title, category_slug, category_label):
    return (
        '<nav class="breadcrumbs" aria-label="Breadcrumb">'
        '<a href="/">Home</a>'
        '<span class="separator">&rsaquo;</span>'
        '<a href="/blog/">Blog</a>'
        '<span class="separator">&rsaquo;</span>'
        f'<a href="/blog/{html.escape(category_slug)}/">{html.escape(category_label)}</a>'
        '<span class="separator">&rsaquo;</span>'
        f'<span class="current" aria-current="page">{html.escape(title)}</span>'
        '</nav>'
    )


def breadcrumb_schema(title, canonical, category_slug, category_label):
    return f'''<script type="application/ld+json">
{{
  "@context":"https://schema.org",
  "@type":"BreadcrumbList",
  "itemListElement":[
    {{"@type":"ListItem","position":1,"name":"Home","item":"{BASE}/"}},
    {{"@type":"ListItem","position":2,"name":"Blog","item":"{BASE}/blog/"}},
    {{"@type":"ListItem","position":3,"name":{json.dumps(category_label)},"item":"{BASE}/blog/{category_slug}/"}},
    {{"@type":"ListItem","position":4,"name":{json.dumps(title)},"item":{json.dumps(canonical)}}}
  ]
}}
</script>'''


def extract_full_html_content(source):
    """Extract only article content from pasted full HTML so the site shell stays controlled by this generator."""
    source = clean_content(source)

    # Prefer the article element when the CMS content contains a complete HTML document.
    article_match = re.search(r"<article\b[^>]*>(.*?)</article>", source, flags=re.I | re.S)
    if article_match:
        content = article_match.group(1)
    else:
        body_match = re.search(r"<body\b[^>]*>(.*?)</body>", source, flags=re.I | re.S)
        content = body_match.group(1) if body_match else source

    # Never allow pasted site navigation/footer/breadcrumbs to replace or duplicate the common shell.
    content = re.sub(r"<header\b[^>]*>.*?</header>", "", content, flags=re.I | re.S)
    content = re.sub(r"<footer\b[^>]*>.*?</footer>", "", content, flags=re.I | re.S)
    content = re.sub(r"<nav\b[^>]*class=[\"'][^\"']*(?:breadcrumb|breadcrumbs)[^\"']*[\"'][^>]*>.*?</nav>", "", content, flags=re.I | re.S)
    content = re.sub(r"<h1\b[^>]*>.*?</h1>", "", content, count=1, flags=re.I | re.S)
    content = re.sub(r"<p\b[^>]*class=[\"'][^\"']*byline[^\"']*[\"'][^>]*>.*?</p>", "", content, count=1, flags=re.I | re.S)
    content = re.sub(r"<script\b[^>]*>.*?</script>", "", content, flags=re.I | re.S)
    content = re.sub(r"<style\b[^>]*>.*?</style>", "", content, flags=re.I | re.S)
    content = re.sub(r"\n\s*\n\s*\n+", "\n\n", content)
    return content.strip()


def render_post(meta, body):
    slug = meta.get("slug") or ""
    title = meta.get("title") or slug.replace("-", " ").title()
    description = meta.get("meta_description") or meta.get("excerpt") or ""
    canonical = f"{BASE}/blog/{slug}/"
    published = meta.get("published_date", "")
    updated = meta.get("updated_date") or published
    author = meta.get("author") or "CalcuPortal"
    image = meta.get("featured_image", "")
    category_slug, category_label = category_info(meta)

    if image and not image.startswith("/"):
        image = "/blog/images/" + image
    if not image:
        image = "/logo.png"

    # Whether CMS provides Markdown or a complete HTML document, always use the same CalcuPortal shell.
    if re.search(r"<html[\s>]|<!DOCTYPE\s+html", body, re.I):
        content = extract_full_html_content(body)
    else:
        content = markdown_to_html(body)

    breadcrumb = breadcrumb_html(title, category_slug, category_label)
    breadcrumb_json = breadcrumb_schema(title, canonical, category_slug, category_label)

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(description)}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(description)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:site_name" content="CalcuPortal">
  <meta property="og:image" content="{BASE}{image}">
  <meta property="article:published_time" content="{published}">
  <meta property="article:modified_time" content="{updated}">
  <link rel="stylesheet" href="/styles.css">
  <style>
    .article-content img,
    .article-content video,
    .article-content iframe {
      display: block;
      max-width: 100%;
      height: auto;
    }
    .article-content figure {
      width: 100%;
      max-width: 100%;
      margin: 1.5rem 0;
    }
    .article-content figure img {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 0.5rem;
    }
    .article-content figcaption {
      margin-top: 0.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .article-content .table-wrap {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    @media (max-width: 768px) {
      main {
        padding: 1.5rem 1rem;
      }
      .article-section {
        padding: 1.25rem 1rem;
        border-radius: 1rem;
      }
      .detail-header h1 {
        font-size: 1.8rem;
      }
      .article-content p,
      .article-content li {
        font-size: 1rem;
      }
      .article-content figure {
        margin: 1.25rem 0;
      }
    }
  </style>
  <script src="/script.js"></script>
  <script type="application/ld+json">
  {{
    "@context":"https://schema.org",
    "@type":"BlogPosting",
    "headline":{json.dumps(title)},
    "description":{json.dumps(description)},
    "image":[{json.dumps(BASE + image)}],
    "datePublished":{json.dumps(published)},
    "dateModified":{json.dumps(updated)},
    "author":{{"@type":"Person","name":{json.dumps(author)}}},
    "publisher":{{"@type":"Organization","name":"CalcuPortal","url":"{BASE}/"}},
    "mainEntityOfPage":{{"@type":"WebPage","@id":"{canonical}"}}
  }}
  </script>
  {breadcrumb_json}
</head>
<body>
<header>
  <div class="nav-container">
    <a href="/" class="logo"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a>
    <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button>
    <nav class="nav-links" id="nav-links">
      <a href="/" class="nav-link">Home</a>
      <a href="/about/" class="nav-link">About</a>
      <a href="/contact/" class="nav-link">Contact</a>
      <a href="/blog/" class="nav-link active">Blog</a>
      <button class="theme-btn" title="Toggle Theme"><span class="theme-btn-icon"></span></button>
    </nav>
  </div>
</header>

<main>
  <div class="detail-container">
    {breadcrumb}
    <header class="detail-header">
      <h1>{html.escape(title)}</h1>
      <p>By {html.escape(author)} · Updated {html.escape(updated)}</p>
    </header>

    <section class="article-section">
      <div class="article-content" style="text-align: justify;">
        {content}
      </div>
    </section>
  </div>
</main>

<footer>
  <div class="footer-container">
    <div class="footer-info">
      <a href="/" class="logo" style="display:inline-flex;"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a>
      <p style="text-align: justify;">CalcuPortal provides practical calculators, guides, formulas, and useful resources for everyday calculations.</p>
    </div>
    <div class="footer-column">
      <h3>Pages</h3>
      <ul>
        <li><a href="/about/">About Us</a></li>
        <li><a href="/contact/">Contact Us</a></li>
        <li><a href="/privacy-policy/">Privacy Policy</a></li>
        <li><a href="/disclaimer/">Disclaimer</a></li>
        <li><a href="/advertise/">Advertise</a></li>
        <li><a href="/terms-conditions/">Terms Conditions</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Blog</h3>
      <ul>
        <li><a href="/blog/">All Blog Categories</a></li>
      </ul>
    </div>
  </div>
  <div class="copyright-bar">© <span id="year">2026</span> CalcuPortal. All rights reserved.</div>
</footer>
<script>document.getElementById('year').innerText = new Date().getFullYear();</script>
</body>
</html>'''


for source in sorted(POSTS_DIR.glob("*.md")):
    meta, body = parse_frontmatter(source.read_text(encoding="utf-8"))
    slug = meta.get("slug")
    if not slug:
        print(f"Skipping {source}: missing slug")
        continue
    destination = ROOT / "blog" / slug / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(render_post(meta, body), encoding="utf-8")
    print(f"Published {source.name} -> {destination.relative_to(ROOT)}")
