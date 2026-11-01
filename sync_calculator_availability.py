#!/usr/bin/env python3
"""Synchronize calculator availability labels from one category manifest.

Source of truth: data/calculator-categories.json.
This script fails if a listed calculator is missing, noindexed, or unlinked from
the category hub. It updates the server-rendered HTML and JSON-LD so search
engines and browsers see consistent availability without relying on JS.
Run: python3 sync_calculator_availability.py
Check: python3 sync_calculator_availability.py --check
"""
import argparse
from html import escape
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parent
BASE = "https://www.calcuportal.com"
MANIFEST = ROOT / "data/calculator-categories.json"
DIRECTORY = ROOT / "calculators/index.html"


def replace_once(source, pattern, value, label):
    updated, count = re.subn(pattern, lambda _match: value, source, count=1, flags=re.S)
    if count != 1:
        raise ValueError(f"{label}: expected one matching section, found {count}")
    return updated


def validate_and_load():
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    category = data["categories"]["astrology-numerology"]
    slugs = [tool["slug"] for tool in category["tools"]]
    if not slugs or len(slugs) != len(set(slugs)):
        raise ValueError("Astrology calculator inventory must contain unique tools")
    if category["category_url"] != "/categories/astrology-numerology/":
        raise ValueError("Unexpected astrology category URL")
    for tool in category["tools"]:
        slug = tool["slug"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
            raise ValueError(f"Unsafe calculator slug: {slug}")
        page = ROOT / "calculators" / slug / "index.html"
        if not page.is_file():
            raise ValueError(f"Listed calculator page does not exist: {page}")
        html = page.read_text(encoding="utf-8-sig")
        if re.search(r'<meta\b[^>]*\bname=["\x27]robots["\x27][^>]*\bcontent=["\x27][^"\x27]*\bnoindex\b', html, flags=re.I):
            raise ValueError(f"Listed calculator has a noindex directive: {page}")
        if not re.search(r"<h1\b", html, flags=re.I):
            raise ValueError(f"Listed calculator has no H1 heading: {page}")
    return category


def sync_directory(text, category):
    """Keep all calculator cards inside the existing category-grid.

    The same manifest supplies names, descriptions and icons. The obsolete
    standalone astrology callout is removed and never re-created.
    """
    tools = category["tools"]
    start_marker = "      <!-- BEGIN GENERATED ASTROLOGY CALCULATOR CARDS -->"
    end_marker = "      <!-- END GENERATED ASTROLOGY CALCULATOR CARDS -->"

    # Backward compatibility: clean up the old "Explore 7 ..." banner.
    text = re.sub(
        r'\n?[ \t]*<p style="margin-bottom:2rem"><a href="/categories/astrology-numerology/">.*?</a></p>',
        "",
        text,
        count=1,
        flags=re.S,
    )

    # Remove the previously generated cards before rebuilding, so the process
    # can run repeatedly without introducing duplicates.
    generated_pattern = (
        re.escape(start_marker) + r".*?" + re.escape(end_marker) + r"\n?"
    )
    if text.count(start_marker) != text.count(end_marker) or text.count(start_marker) > 1:
        raise ValueError("Generated astrology card markers are mismatched")
    text = re.sub(generated_pattern, "", text, count=1, flags=re.S)

    # Reject any duplicate hand-written astrology cards outside the generated block.
    for tool in tools:
        existing = 'href="' + tool["slug"] + '/"'
        if existing in text:
            raise ValueError("Duplicate non-generated calculator card: " + existing)

    cards = []
    for tool in tools:
        slug = tool["slug"]
        title = escape(tool["name"])
        description = escape(tool["description"])
        icon = escape(tool["icon"])
        cards.append(
            '        <a href="' + slug + '/" class="calc-card">\n'
            '          <div class="calc-card-header">\n'
            '            <h3 class="calc-card-title">' + title + '</h3>\n'
            '            <span class="calc-card-icon" aria-hidden="true">' + icon + '</span>\n'
            '          </div>\n'
            '          <p class="calc-card-desc">' + description + '</p>\n'
            '          <div class="calc-card-footer"><span>Open Tool</span><span>&rarr;</span></div>\n'
            '        </a>'
        )

    # The page has one grid; insert cards right before its closing tag.
    block = start_marker + "\n" + "\n".join(cards) + "\n" + end_marker + "\n"
    ending = "\n</div>\n    </section>\n  </main>"
    if text.count(ending) != 1:
        raise ValueError("Calculator directory grid end marker was not found exactly once")
    return text.replace(ending, "\n" + block + ending, 1)


def sync_category(text, category):
    tools = category["tools"]
    count = len(tools)
    description = f"Explore {count} astrology and numerology calculators: {category['seo_topics']}"
    category_links = set(re.findall(r'href="/calculators/([a-z0-9-]+)/"', text))
    desired_slugs = {tool["slug"] for tool in tools}
    if category_links != desired_slugs:
        raise ValueError(
            "Category cards must match manifest; missing="
            + repr(sorted(desired_slugs - category_links))
            + ", unlisted=" + repr(sorted(category_links - desired_slugs))
        )

    # Use a replacement function to preserve backreference boundaries safely.
    for attr in ('name="description"', 'property="og:description"'):
        pattern = r'(<meta ' + re.escape(attr) + r' content=")[^"]*(")'
        matches = list(re.finditer(pattern, text))
        if len(matches) != 1:
            raise ValueError(f"Category {attr} expected once, found {len(matches)}")
        m = matches[0]
        text = text[:m.start()] + m.group(1) + escape(description, quote=True) + m.group(2) + text[m.end():]

    text = replace_once(
        text,
        r'<span class="status">\d+ calculators · Astrology &amp; numerology</span>',
        f'<span class="status">{count} calculators · Astrology &amp; numerology</span>',
        "Astrology hero availability label"
    )

    question = "Are all the listed astrology and numerology calculators available?"
    names = ", ".join(tool["name"] for tool in tools)
    answer = (
        f"Yes. This category currently links to {count} published calculator pages: "
        + names + ". Select a tool to review its inputs, method and limitations."
    )
    text = replace_once(
        text,
        r'<details><summary>Are all [^<]*calculators available[^<]*\?</summary><p>.*?</p></details>',
        f'<details><summary>{escape(question)}</summary><p>{escape(answer)}</p></details>',
        "Category visible availability FAQ"
    )

    match = re.search(r'(<script type="application/ld\+json">)(.*?)(</script>)', text, re.S)
    if not match:
        raise ValueError("Category structured data script missing")
    structured = json.loads(match.group(2))
    graph = structured["@graph"]
    page_node = next(item for item in graph if item.get("@type") == "CollectionPage")
    page_node["description"] = description
    list_node = next(item for item in graph if item.get("@type") == "ItemList")
    list_node["numberOfItems"] = count
    list_node["itemListElement"] = [
        {"@type":"ListItem","position":index,
         "name":tool["name"],"url":BASE + "/calculators/" + tool["slug"] + "/"}
        for index, tool in enumerate(tools, 1)
    ]
    faq = next(item for item in graph if item.get("@type") == "FAQPage")
    availability_questions = [
        item for item in faq["mainEntity"]
        if item["name"].startswith("Are all ") and "calculators available" in item["name"]
    ]
    if len(availability_questions) != 1:
        raise ValueError("Category structured availability FAQ missing or duplicated")
    availability_questions[0]["name"] = question
    availability_questions[0]["acceptedAnswer"]["text"] = answer
    compact = json.dumps(structured, ensure_ascii=False, separators=(",", ":"))
    text = text[:match.start()] + match.group(1) + compact + match.group(3) + text[match.end():]
    return text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail if output is out of sync")
    args = parser.parse_args()
    category = validate_and_load()
    count = len(category["tools"])
    changes = []
    for path, updater in (
        (DIRECTORY, sync_directory),
        (ROOT / "categories/astrology-numerology/index.html", sync_category),
    ):
        original = path.read_text(encoding="utf-8-sig")
        updated = updater(original, category)
        if original != updated:
            changes.append(str(path.relative_to(ROOT)))
            if not args.check:
                path.write_text(updated, encoding="utf-8")
    if args.check and changes:
        print("Out of sync: " + ", ".join(changes), file=sys.stderr)
        return 1
    print(f"Astrology availability: {count} verified calculator pages; "
          + ("already in sync" if not changes else
             "updated " + ", ".join(changes) if not args.check else "check failed"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
