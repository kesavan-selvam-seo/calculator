from pathlib import Path
from datetime import datetime, timezone
from xml.sax.saxutils import escape
import subprocess

BASE_URL = "https://www.calcuportal.com"
ROOT = Path(__file__).resolve().parent
SITEMAP = ROOT / "sitemap.xml"

EXCLUDED_DIRS = {
    ".git", ".github", "node_modules", "vendor", "assets", "css", "js"
}
EXCLUDED_FILES = {
    "404.html",
    "category-template.html"
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


def git_lastmod(path: Path) -> str:
    """Return the date of the latest Git commit that changed this page."""
    rel = path.relative_to(ROOT).as_posix()
    try:
        value = subprocess.check_output(
            ["git", "log", "-1", "--format=%cI", "--", rel],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
        if value:
            return datetime.fromisoformat(value.replace("Z", "+00:00")).date().isoformat()
    except (subprocess.CalledProcessError, ValueError):
        pass
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).date().isoformat()


pages = sorted(
    (p for p in ROOT.rglob("*.html") if is_public_html(p)),
    key=lambda p: page_url(p),
)

urls = [(page_url(path), git_lastmod(path)) for path in pages]

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
