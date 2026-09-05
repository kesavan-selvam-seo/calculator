from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

STYLE = '''<style id="calcuportal-blog-content-style">
/* Blog article content only. Navigation, breadcrumbs and footer are unchanged. */
.article-content {
  font-family: Georgia, 'Times New Roman', serif;
  color: #222;
  line-height: 1.65;
}

.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
  font-family: Arial, Helvetica, sans-serif;
}

.article-content h2 {
  font-size: clamp(1.1rem, 3.6vw, 1.35rem);
  margin-top: 2.2em;
  border-bottom: 3px solid #b5501a;
  padding-bottom: 6px;
  color: #111;
}

.article-content h3 {
  font-size: clamp(0.98rem, 3vw, 1.08rem);
  margin-top: 1.6em;
  color: #b5501a;
}

.article-content p {
  text-align: justify;
}

.article-content .lead {
  font-size: 1.05rem;
  color: #333;
  text-align: justify;
}

.article-content details p {
  text-align: justify;
}

.article-content figure {
  margin: 1.4em 0;
}

.article-content figure img {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 8px;
}

.article-content figcaption {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.82rem;
  color: #777;
  text-align: center;
  margin-top: 8px;
}

.article-content .table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.2em 0;
}

.article-content table {
  border-collapse: collapse;
  width: 100%;
  min-width: 560px;
  margin: 0;
  font-size: 0.93rem;
  font-family: Arial, Helvetica, sans-serif;
}

.article-content caption {
  text-align: left;
  font-weight: bold;
  margin-bottom: 6px;
  white-space: normal;
}

.article-content th,
.article-content td {
  border: 1px solid #ddd;
  padding: 9px 10px;
  text-align: left;
  vertical-align: top;
}

.article-content th {
  background: #b5501a;
  color: #fff;
  position: sticky;
  top: 0;
}

.article-content tr:nth-child(even) {
  background: #fbf3ee;
}

.article-content .callout {
  background: #fff8e1;
  border-left: 4px solid #e6a817;
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.96rem;
}

.article-content .correction {
  background: #ffecec;
  border-left: 4px solid #d33;
  padding: 14px 18px;
  margin: 1.4em 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.96rem;
}

.article-content .toc {
  background: #fdf2ea;
  padding: 16px 22px;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.94rem;
}

.article-content .toc a {
  color: #b5501a;
  text-decoration: none;
}

.article-content .toc a:hover {
  text-decoration: underline;
}

.article-content details {
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px 14px;
  font-family: Arial, Helvetica, sans-serif;
}

.article-content summary {
  font-weight: bold;
  cursor: pointer;
  color: #111;
}

.article-content .tag {
  display: inline-block;
  background: #fbe6d8;
  color: #b5501a;
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 0.78rem;
  font-family: Arial, Helvetica, sans-serif;
}

@media (max-width: 768px) {
  .article-content .toc,
  .article-content .callout,
  .article-content .correction {
    padding: 14px 16px;
  }
}

@media (max-width: 480px) {
  .article-content {
    line-height: 1.6;
  }

  .article-content .lead,
  .article-content p,
  .article-content details p {
    text-align: left;
  }

  .article-content table {
    font-size: 0.82rem;
    min-width: 520px;
  }

  .article-content th,
  .article-content td {
    padding: 6px 7px;
  }

  .article-content .callout,
  .article-content .correction,
  .article-content .toc {
    font-size: 0.9rem;
    padding: 12px 14px;
  }

  .article-content details {
    padding: 9px 12px;
  }
}
</style>'''

for path in (ROOT / "blog").glob("*/index.html"):
    text = path.read_text(encoding="utf-8")

    text = re.sub(
        r'<style id="calcuportal-blog-content-style">.*?</style>',
        '',
        text,
        flags=re.I | re.S,
    )

    if 'class="article-content"' not in text:
        continue

    updated = text.replace('</head>', STYLE + '\n</head>', 1)

    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Styled blog content: {path}")
