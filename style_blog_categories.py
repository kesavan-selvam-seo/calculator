from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
STYLE = '''<style id="calcuportal-category-card-style">
.article-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.article-list .calc-card{width:100%;min-width:0;box-sizing:border-box;overflow:hidden;padding:0 0 20px;border:1px solid var(--border-color);border-radius:12px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.article-list .calc-card .article-card-image{display:block;width:274px;height:144px;max-width:100%;object-fit:cover;object-position:center;margin:0 auto}
.article-list .calc-card h2{margin:18px 20px 10px;font-size:17px;font-weight:700;line-height:1.35;color:#111;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.article-list .calc-card p{margin:0 20px 14px;font-size:14px;line-height:1.6;color:#6b6b6b;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.article-list .calc-card>a:last-child{display:inline-block;margin:0 20px;font-size:14px;font-weight:700;color:#111;text-decoration:underline}
@media(max-width:900px){.article-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.article-list .calc-card .article-card-image{width:100%;height:auto;aspect-ratio:274/144}}
@media(max-width:650px){.article-list{grid-template-columns:1fr;gap:18px}}
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")
    text = re.sub(r'<style id="calcuportal-category-card-style">.*?</style>', '', text, flags=re.I | re.S)
    if 'class="article-list"' not in text:
        continue
    updated = text.replace('</head>', STYLE + '\n</head>', 1)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'Styled category page: {path}')
