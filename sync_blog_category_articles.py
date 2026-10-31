from pathlib import Path
from html import escape
import re
import runpy

ROOT = Path(__file__).resolve().parent
BLOG_DIR = ROOT / "blog"
CUSTOM_HUBS = {"education", "general-knowledge"}

# First run the existing CMS/category generator so content/posts entries continue
# to work exactly as before.
runpy.run_path(str(ROOT / "generate_blog_categories.py"), run_name="__main__")

CARD = '''<a class="calc-card blog-card" href="{url}" aria-label="Read {title}">{image}<div class="blog-card-body"><h3 class="blog-card-title">{title}</h3><p class="blog-card-excerpt">{desc}</p><span class="blog-card-link">Read Guide →</span></div></a>'''


def get_meta(html, name):
    pattern = rf'<meta[^>]+(?:name|property)=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']*)["\']'
    match = re.search(pattern, html, re.I)
    if match:
        return match.group(1).strip()
    pattern = rf'<meta[^>]+content=["\']([^"\']*)["\'][^>]+(?:name|property)=["\']{re.escape(name)}["\']'
    match = re.search(pattern, html, re.I)
    return match.group(1).strip() if match else ""


def article_data(path, category):
    html = path.read_text(encoding="utf-8")
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.S)
    title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip() if title_match else ""
    if not title:
        title_match = re.search(r'<title[^>]*>(.*?)</title>', html, re.I | re.S)
        title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip() if title_match else path.parent.name.replace('-', ' ').title()

    desc = get_meta(html, "description") or "Read this practical guide from CalcuPortal."

    image = ""
    image_match = re.search(r'<img[^>]+class=["\'][^"\']*article-card-image[^"\']*["\'][^>]+src=["\']([^"\']+)', html, re.I)
    if not image_match:
        image_match = re.search(r'<meta[^>]+(?:property|name)=["\']og:image["\'][^>]+content=["\']([^"\']+)', html, re.I)
    if image_match:
        image = image_match.group(1).strip()
        if image.startswith("https://www.calcuportal.com"):
            image = image.replace("https://www.calcuportal.com", "")

    slug = path.parent.name
    url = f"/blog/{category}/{slug}/"
    return title, url, desc, image


def render_card(item):
    title, url, desc, image = item
    image_html = (
        f'<img class="article-card-image" src="{escape(image)}" '
        f'alt="{escape(title)}" width="274" height="144" loading="lazy">'
        if image else ""
    )
    return CARD.format(
        title=escape(title),
        url=escape(url),
        desc=escape(desc),
        image=image_html,
    )


def sync_category(category):
    if category in CUSTOM_HUBS:
        print(f"Skipping custom hub sync: {category}")
        return
    category_dir = BLOG_DIR / category
    category_index = category_dir / "index.html"
    if not category_index.exists():
        return

    html = category_index.read_text(encoding="utf-8")
    existing_urls = set(re.findall(r'href=["\'](/blog/[^"\']+/[^"\']+/)["\']', html, re.I))

    cards = []
    for article_index in sorted(category_dir.glob("*/index.html")):
        # The category index is category_dir/index.html, so this only finds
        # article folders such as blog/technology/example/index.html.
        item = article_data(article_index, category)
        if item[1] not in existing_urls:
            cards.append(item)

    marker = '<div class="article-list">'
    if marker not in html:
        return

    if cards:
        new_cards = ''.join(render_card(item) for item in cards)
        html = html.replace(marker, marker + new_cards, 1)

    # Pages with real article cards are indexable; placeholders are crawlable but noindex.
    # This runs after standalone articles are inserted, so a newly populated category
    # becomes indexable automatically without manual SEO tag changes.
    has_article_cards = '<a class="calc-card blog-card"' in html
    robots_directive = "index, follow" if has_article_cards else "noindex, follow"
    html = re.sub(
        r'(<meta\s+name="robots"\s+content=")[^"]*(")',
        lambda match: match.group(1) + robots_directive + match.group(2),
        html,
        count=1,
        flags=re.IGNORECASE,
    )
    current = category_index.read_text(encoding="utf-8")
    if html != current:
        category_index.write_text(html, encoding="utf-8")
        print(f"Synced {category} category: {len(cards)} new cards; robots={robots_directive}")


for category_dir in sorted(BLOG_DIR.iterdir()):
    if category_dir.is_dir() and (category_dir / "index.html").exists():
        sync_category(category_dir.name)
