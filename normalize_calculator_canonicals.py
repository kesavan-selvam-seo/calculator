from pathlib import Path
import re
import json

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
    # GitHub Pages cannot emit per-file HTTP redirects. Preserve the existing
    # fallback body and redirect legacy aliases immediately to their canonical.
    if path.parent == ROOT / 'calculators' and path.name != 'index.html':
        updated = updated.replace('../pages/about.html', '/about/').replace('../pages/contact.html', '/contact/')
        updated = updated.replace('href="../index.html"', 'href="/"')
        updated = updated.replace("href='../index.html'", "href='/'")
        start = '<!-- legacy-calculator-redirect:start -->'
        end = '<!-- legacy-calculator-redirect:end -->'
        updated = re.sub(re.escape(start) + r'.*?' + re.escape(end) + r'\n?', '', updated, flags=re.S)
        destination = json.dumps(canonical)
        redirect = (f'{start}\n'
                    f'  <meta http-equiv="refresh" content="0; url={canonical}">\n'
                    f'  <script>window.location.replace({destination} + window.location.search + window.location.hash);</script>\n'
                    f'{end}\n')
        head_end = updated.lower().find('</head>')
        if head_end >= 0:
            updated = updated[:head_end] + redirect + updated[head_end:]
    if count and updated != text:
        path.write_text(updated, encoding="utf-8")
        changed += 1

print(f"Normalized {changed} calculator canonical tags")
