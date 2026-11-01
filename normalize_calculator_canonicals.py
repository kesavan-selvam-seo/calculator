from pathlib import Path
import re
import json
from html import escape

ROOT = Path(__file__).resolve().parent
BASE_URL = "https://www.calcuportal.com"

CANONICAL_RE = re.compile(r'(<link\s+rel=["\']canonical["\']\s+href=["\'])([^"\']+)(["\'])', re.I)


def canonical_for(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "calculators/index.html":
        return f"{BASE_URL}/calculators/"
    if rel.endswith("/index.html") and rel.startswith("calculators/"):
        return f"{BASE_URL}/{rel[:-len('index.html')]}"
    if rel.startswith("calculators/") and rel.endswith(".html"):
        stem = rel[:-5]
        if (ROOT / stem / "index.html").exists():
            return f"{BASE_URL}/{stem}/"
    return ""

changed = 0
for path in ROOT.glob("calculators/**/*.html"):
    canonical = canonical_for(path)
    if not canonical:
        continue
    text = path.read_text(encoding="utf-8-sig")
    replacement = rf'\g<1>{canonical}\g<3>'
    updated, count = CANONICAL_RE.subn(replacement, text, count=1)
    if count == 0:
        head_end = updated.lower().find("</head>")
        if head_end >= 0:
            tag = f'  <link rel="canonical" href="{canonical}">\n'
            updated = updated[:head_end] + tag + updated[head_end:]
            count = 1
    # GitHub Pages serves static files, so legacy aliases use an instant
    # meta refresh plus location.replace (to retain query and fragment).
    # Do not retain old calculators, scripts, assets or stale article content.
    if path.parent == ROOT / 'calculators' and path.name != 'index.html':
        title = escape(path.stem.replace('-', ' ').title())
        destination = json.dumps(canonical)
        updated = (
            '<!doctype html>\n<html lang="en">\n<head>\n'
            '  <meta charset="utf-8">\n'
            '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'  <title>{title} — Page moved | CalcuPortal</title>\n'
            f'  <link rel="canonical" href="{canonical}">\n'
            f'  <script>window.location.replace({destination} + window.location.search + window.location.hash);</script>\n'
            f'  <meta http-equiv="refresh" content="0; url={canonical}">\n'
            '</head>\n<body>\n'
            '  <h1>This calculator has moved</h1>\n'
            f'  <p><a href="{canonical}">Continue to {title}</a>.</p>\n'
            '</body>\n</html>\n'
        )
    if count and updated != text:
        path.write_text(updated, encoding="utf-8")
        changed += 1

print(f"Normalized {changed} calculator pages and legacy redirects")
