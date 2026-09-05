from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

STYLE = '''<style id="calcuportal-blog-content-style">
/* Blog article content only. Navigation, breadcrumbs and footer stay unchanged. */
.article-section .article-content {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--text-primary);
  line-height: 1.65;
}

.article-section .article-content h1,
.article-section .article-content h2,
.article-section .article-content h3,
.article-section .article-content h4,
.article-section .article-content h5,
.article-section .article-content h6 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: left !important;
  color: var(--text-primary);
}

.article-section .article-content h2 {
  font-size: clamp(1.1rem, 3.6vw, 1.35rem);
  margin-top: 2.2em;
  border-bottom: 3px solid var(--primary);
  padding-bottom: 6px;
}

.article-section .article-content h3 {
  font-size: clamp(.98rem, 3vw, 1.08rem);
  margin-top: 1.6em;
  color: var(--primary);
}

.article-section .article-content p,
.article-section .article-content details p {
  text-align: justify !important;
}

.article-section .article-content ul,
.article-section .article-content ol,
.article-section .article-content li {
  text-align: left !important;
}

.article-section .article-content figure {
  margin: 1.4em 0;
}

.article-section .article-content figure img {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
}

.article-section .article-content figcaption {
  font-family: Arial, Helvetica, sans-serif;
  font-size: .82rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 8px;
}

.article-section .article-content .table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.2em 0;
}

.article-section .article-content table {
  border-collapse: collapse;
  width: 100%;
  min-width: 560px;
  margin: 0;
  font-size: .93rem;
  font-family: Arial, Helvetica, sans-serif;
}

.article-section .article-content caption {
  text-align: left;
  font-weight: bold;
  margin-bottom: 6px;
}

.article-section .article-content th,
.article-section .article-content td {
  border: 1px solid var(--border-color);
  padding: 9px 10px;
  text-align: left;
  vertical-align: top;
}

.article-section .article-content th {
  background: var(--primary);
  color: #fff;
}

.article-section .article-content tr:nth-child(even) {
  background: var(--bg-secondary);
}

.article-section .article-content .callout {
  background: var(--primary-light);
  border-left: 4px solid var(--primary);
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: .96rem;
}

.article-section .article-content .correction {
  background: var(--bg-secondary);
  border-left: 4px solid var(--primary);
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: .96rem;
}

.article-section .article-content .toc {
  background: var(--primary-light);
  padding: 16px 22px;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: .94rem;
}

.article-section .article-content .toc a {
  color: var(--primary);
  text-decoration: none;
}

.article-section .article-content .toc a:hover {
  text-decoration: underline;
}

.article-section .article-content details {
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: Arial, Helvetica, sans-serif;
}

.article-section .article-content summary {
  font-weight: bold;
  cursor: pointer;
  color: var(--text-primary);
  text-align: left !important;
}

.article-section .article-content .tag {
  display: inline-block;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 12px;
  padding: 2px 10px;
  font-size: .78rem;
  font-family: Arial, Helvetica, sans-serif;
}

@media (max-width: 768px) {
  .article-section .article-content p,
  .article-section .article-content details p {
    text-align: justify !important;
  }

  .article-section .article-content h1,
  .article-section .article-content h2,
  .article-section .article-content h3,
  .article-section .article-content h4,
  .article-section .article-content h5,
  .article-section .article-content h6,
  .article-section .article-content ul,
  .article-section .article-content ol,
  .article-section .article-content li,
  .article-section .article-content summary {
    text-align: left !important;
  }
}

@media (max-width: 480px) {
  .article-section .article-content {
    line-height: 1.6;
  }

  .article-section .article-content p,
  .article-section .article-content details p {
    text-align: justify !important;
  }

  .article-section .article-content ul,
  .article-section .article-content ol {
    padding-left: 1.35rem;
  }

  .article-section .article-content table {
    font-size: .82rem;
    min-width: 520px;
  }

  .article-section .article-content th,
  .article-section .article-content td {
    padding: 6px 7px;
  }
}
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")
    text = re.sub(r'<style id="calcuportal-blog-content-style">.*?</style>', '', text, flags=re.I | re.S)
    if 'class="article-content"' not in text:
        continue
    updated = text.replace('</head>', STYLE + '\n</head>', 1)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled blog content: {path}")
