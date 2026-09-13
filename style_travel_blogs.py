from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
TRAVEL = ROOT / "blog" / "travel"

UNIFORM_CSS = r'''
<style id="calcuportal-travel-blog-style">
.article-section,.article-content{min-width:0;max-width:100%;overflow-x:clip}
.article-content{font-family:Georgia,'Times New Roman',serif;color:var(--text-primary);line-height:1.65;text-align:justify}
.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6{font-family:Arial,Helvetica,sans-serif;text-align:left;color:var(--text-primary)}
.article-content h2{font-size:clamp(1.1rem,3.6vw,1.35rem);margin-top:2.2em;border-bottom:3px solid var(--primary);padding-bottom:6px}
.article-content h3{font-size:clamp(.98rem,3vw,1.08rem);margin-top:1.6em;color:var(--primary)}
.article-content p{color:var(--text-secondary);text-align:justify}
.article-content ul,.article-content ol,.article-content li{color:var(--text-secondary);text-align:left}
.article-content img,.article-content video,.article-content iframe,.article-content svg,.article-content canvas{display:block;width:auto;max-width:100%!important;height:auto;box-sizing:border-box}
.article-content figure{display:block;width:100%;max-width:100%;min-width:0;margin:1.4em 0;overflow:hidden;box-sizing:border-box}
.article-content figure img{width:100%!important;max-width:100%!important;height:auto!important;border-radius:8px;object-fit:contain}
.article-content figcaption{font-family:Arial,Helvetica,sans-serif;font-size:.82rem;color:var(--text-muted);text-align:center;margin-top:8px}
.article-content .table-wrap{width:100%;max-width:100%;min-width:0;overflow-x:auto;-webkit-overflow-scrolling:touch;margin:1.2em 0}
.article-content table{border-collapse:collapse;width:100%;min-width:560px;margin:0;font-size:.93rem;font-family:Arial,Helvetica,sans-serif;color:var(--text-primary)}
.article-content th,.article-content td{border:1px solid var(--border-color);padding:9px 10px;text-align:left;vertical-align:top}
.article-content th{background:var(--primary);color:#fff}
.article-content tr:nth-child(even){background:var(--border-light)}
.article-content a{color:var(--primary);text-decoration:underline}
.article-content .callout{background:var(--bg-card);border-left:4px solid var(--warning);padding:14px 18px;margin:1.4em 0;font-family:Arial,Helvetica,sans-serif;color:var(--text-secondary)}
.article-content .toc{background:var(--primary-light);padding:16px 22px;border-radius:6px;font-family:Arial,Helvetica,sans-serif;text-align:left;color:var(--text-secondary)}
@media(max-width:768px){html,body{width:100%;max-width:100%;overflow-x:hidden}main{width:100%;max-width:100%;padding:1.5rem 1rem}.detail-container{width:100%;max-width:100%;min-width:0}.article-section{width:100%;max-width:100%;min-width:0;padding:1.25rem .9rem;border-radius:1rem;overflow:hidden}.article-content{width:100%;max-width:100%;min-width:0;overflow-x:hidden}.article-content p{font-size:1rem;text-align:justify}.detail-header h1{font-size:1.8rem}.article-content table{min-width:520px;font-size:.82rem}.article-content th,.article-content td{padding:6px 7px}}
@media(max-width:480px){.article-content{line-height:1.6}.article-content p{text-align:justify!important}.article-content h1,.article-content h2,.article-content h3,.article-content h4,.article-content h5,.article-content h6,.article-content ul,.article-content ol,.article-content li{text-align:left!important}}
</style>
'''

HEADER = '''<header>
<div class="nav-container">
<a href="/" class="logo"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a>
<button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button>
<nav class="nav-links" id="nav-links">
<a href="/" class="nav-link">Home</a>
<a href="/about/" class="nav-link">About</a>
<a href="/contact/" class="nav-link">Contact</a>
<a href="/blog/" class="nav-link active">Blog</a>
<button class="theme-btn" title="Toggle Theme"><span class="theme-btn-icon"></span></button>
</nav></div></header>'''

for path in sorted(TRAVEL.glob("*/index.html")):
    text = path.read_text(encoding="utf-8")
    original = text

    # Use the same header/navigation structure as the established blog template.
    text = re.sub(r'<header><div class="nav-container">.*?</header>', HEADER, text, count=1, flags=re.S)

    # Match the established article layout: detail-container > breadcrumbs > detail-header > article-section > article-content.
    text = re.sub(r'<main><article class="blog-detail">', '<main><div class="detail-container">', text, count=1)
    text = text.replace('<nav class="blog-breadcrumb"', '<nav class="breadcrumbs"', 1)
    text = re.sub(r'</nav><header class="detail-header">', '</nav><header class="detail-header">', text, count=1)
    text = text.replace('<section><p>Good travel planning', '<section class="article-section"><div class="article-content" style="text-align: justify;"><p>Good travel planning', 1)
    text = text.replace('</p></section></article></main>', '</p></div></section></div></main>', 1)

    # The generated files contain all content in one section; if the exact intro string changes,
    # fall back to the first section marker.
    if '<section class="article-section"><div class="article-content"' not in text:
        text = text.replace('<section>', '<section class="article-section"><div class="article-content" style="text-align: justify;">', 1)
        text = text.replace('</section></article></main>', '</div></section></div></main>', 1)

    # Ensure the shared blog article CSS is present exactly once.
    text = re.sub(r'\s*<style id="calcuportal-travel-blog-style">.*?</style>\s*', '\n', text, flags=re.S)
    text = text.replace('</head>', UNIFORM_CSS + '\n</head>', 1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"Styled {path.relative_to(ROOT)}")

print("Travel blog styling sync complete.")
