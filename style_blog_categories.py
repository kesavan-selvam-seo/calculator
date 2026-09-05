from pathlib import Path

ROOT = Path(__file__).resolve().parent
STYLE = '''<style id="calcuportal-category-card-style">
.blog-category-wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.article-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}
.article-list .calc-card {
  height: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--card-bg);
  box-shadow: 0 4px 14px rgba(0,0,0,.08);
}
.article-list .calc-card h2,
.article-list .calc-card p,
.article-list .calc-card > a:not(:has(.article-card-image)) {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}
.article-list .calc-card h2 {
  margin-top: 1.25rem;
  margin-bottom: .7rem;
  font-size: 1.45rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.article-list .calc-card p {
  color: var(--text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 1rem;
}
.article-card-image {
  display: block;
  width: 100%;
  height: 238px;
  object-fit: cover;
  object-position: center;
  background: #fff;
}
.article-list .calc-card > a:last-child {
  display: inline-block;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  font-weight: 600;
}
@media (max-width: 900px) {
  .article-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .article-card-image {
    height: auto;
    aspect-ratio: 16 / 9;
  }
}
@media (max-width: 650px) {
  .blog-category-wrap {
    max-width: 100%;
  }
  .article-list {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .article-card-image {
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .article-list .calc-card h2 {
    font-size: 1.25rem;
  }
}
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")
    if 'id="calcuportal-category-card-style"' in text:
        continue
    updated = text.replace("</head>", STYLE + "\n</head>", 1)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled category page: {path}")
