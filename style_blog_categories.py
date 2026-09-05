from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

STYLE = '''<style id="calcuportal-category-card-style">
/* Category pages only — keep the existing CalcuPortal theme */
.blog-category-wrap {
  max-width: 1120px;
  margin: 0 auto;
}

.blog-category-wrap .blog-breadcrumb {
  margin: 0 0 18px;
  padding: 0;
}

.blog-category-wrap .detail-header {
  padding: 8px 0 10px;
}

.blog-category-wrap .detail-header h1 {
  margin: 0 0 10px;
}

.blog-category-wrap .category-copy {
  margin: 28px 0 40px;
  padding: 20px 24px;
  background: var(--primary-light);
  border: 1px solid var(--border-color);
  border-radius: 14px;
}

.blog-category-wrap .category-copy h2 {
  margin: 0 0 8px;
  color: var(--primary);
}

.blog-category-wrap .category-copy p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.7;
  text-align: justify;
}

.blog-category-wrap .category-header {
  margin-bottom: 24px;
}

.blog-category-wrap .category-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.article-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.article-list .blog-card {
  width: 100%;
  max-width: 340px;
  min-width: 0;
  margin: 0 auto;
  padding: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}

.article-list .blog-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.article-list .blog-card .article-card-image {
  display: block;
  width: 100%;
  height: 178px;
  aspect-ratio: 274 / 144;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  margin: 0;
  flex-shrink: 0;
}

.article-list .blog-card .blog-card-body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-list .blog-card .blog-card-title {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.article-list .blog-card .blog-card-excerpt {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex: 1;
}

.article-list .blog-card .blog-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: underline;
}

@media (max-width: 900px) {
  .article-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .article-list .blog-card {
    max-width: 100%;
  }
}

@media (max-width: 650px) {
  .blog-category-wrap {
    width: 100%;
  }

  .blog-category-wrap .category-copy {
    padding: 18px;
    margin: 24px 0 32px;
  }

  .article-list {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .article-list .blog-card {
    max-width: 340px;
  }

  .article-list .blog-card .article-card-image {
    height: auto;
    aspect-ratio: 274 / 144;
  }
}
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")

    text = re.sub(
        r'<style id="calcuportal-category-card-style">.*?</style>',
        '',
        text,
        flags=re.I | re.S
    )

    if 'class="article-list"' not in text:
        continue

    updated = text.replace('</head>', STYLE + '\n</head>', 1)

    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled category page: {path}")
