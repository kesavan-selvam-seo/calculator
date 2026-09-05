from pathlib import Path

ROOT = Path(__file__).resolve().parent
BLOG_DIR = ROOT / "blog"
FAVICON_TAG = '  <link rel="icon" type="image/png" href="/favicon.png">\n'

for page in BLOG_DIR.glob("*/index.html"):
    text = page.read_text(encoding="utf-8")
    if 'rel="icon"' in text.lower() or "rel='icon'" in text.lower():
        continue
    marker = '  <link rel="stylesheet" href="/styles.css">'
    if marker not in text:
        continue
    text = text.replace(marker, FAVICON_TAG + marker, 1)
    page.write_text(text, encoding="utf-8")
    print(f"Added CalcuPortal favicon: {page}")
