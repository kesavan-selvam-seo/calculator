from pathlib import Path

ROOT = Path(__file__).resolve().parent
STYLE = '''<style id="calcuportal-category-card-style">
.blog-category-wrap { max-width: 1200px; margin: 0 auto; }
.article-list { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:28px; }
.article-list .calc-card { height:100%; min-width:0; overflow:hidden; padding:0 0 1.5rem; border:1px solid var(--border-color); border-radius:16px; background:var(--card-bg); box-shadow:0 4px 14px rgba(0,0,0,.08); }
.article-card-image { display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; object-position:center; background:#fff; }
.article-list .calc-card h2 { margin:1rem 1.25rem .55rem; font-size:17px; line-height:1.45; font-weight:700; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; }
.article-list .calc-card p { margin:.35rem 1.25rem 1rem; color:var(--text-secondary); font-size:14px; line-height:1.55; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; }
.article-list .calc-card > a:last-child { display:inline-block; margin:0 1.25rem; font-size:14px; font-weight:600; }
@media (max-width:900px) { .article-list { grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; } }
@media (max-width:650px) { .blog-category-wrap { max-width:100%; } .article-list { grid-template-columns:1fr; gap:18px; } }
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")
    # Replace the generated card style block so repeated workflow runs always converge.
    import re
    text = re.sub(r'<style id="calcuportal-category-card-style">.*?</style>', '', text, flags=re.I | re.S)
    updated = text.replace("</head>", STYLE + "\n</head>", 1)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled category page: {path}")
