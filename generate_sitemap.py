from pathlib import Path
from datetime import datetime, timezone
from xml.sax.saxutils import escape

BASE_URL = "https://www.calcuportal.com"
ROOT = Path(__file__).resolve().parent
SITEMAP = ROOT / "sitemap.xml"

EXCLUDED_DIRS = {
    ".git", ".github", "node_modules", "vendor", "assets", "css", "js"
}
EXCLUDED_FILES = {
    "404.html"
}


def page_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return BASE_URL + "/"
    if rel.endswith("/index.html"):
        return BASE_URL + "/" + rel[:-len("index.html")]
    if rel.endswith(".html"):
        return BASE_URL + "/" + rel[:-5]
    return BASE_URL + "/" + rel


def is_public_html(path: Path) -> bool:
    if path.name in EXCLUDED_FILES or path.suffix.lower() != ".html":
        return False
    return not any(part in EXCLUDED_DIRS for part in path.parts)


pages = sorted(
    (p for p in ROOT.rglob("*.html") if is_public_html(p)),
    key=lambda p: page_url(p),
)

# Use each file's actual modification time. This keeps lastmod tied to
# the content file instead of using one date for every URL.
urls = []
for path in pages:
    modified = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).date().isoformat()
    urls.append((page_url(path), modified))

lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]
for url, lastmod in urls:
    lines.extend([
        "  <url>",
        f"    <loc>{escape(url)}</loc>",
        f"    <lastmod>{lastmod}</lastmod>",
        "  </url>",
    ])
lines.append("</urlset>")

SITEMAP.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"Generated {SITEMAP} with {len(urls)} URLs")
