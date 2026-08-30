from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parent
BASE = "https://www.calcuportal.com"

CATEGORIES = {
    "education": {
        "title": "Education Guides & Resources",
        "description": "Practical education guides covering marks, grades, calculations, study planning, exams, admissions, and useful academic resources.",
        "intro": "Explore practical education guides, academic calculations, study resources, and easy-to-follow explanations for students and learners.",
        "content": "CalcuPortal's Education category brings together useful guides for students, parents, and lifelong learners. Find simple explanations for academic calculations, grades, percentages, exam-related planning, and everyday study questions. Our guides are designed to make numerical and academic concepts easier to understand, with formulas, examples, and practical steps. As new education articles are published, they can be organized here so readers can move from a topic guide to a relevant calculator or supporting resource.",
        "articles": [
            ("How to Calculate Percentage", "/blog/percentage-calculation-guide/", "Learn percentage formulas, marks calculations, percentage increase, decrease, discounts, and practical examples."),
            ("How to Calculate Age Online", "/blog/how-to-calculate-age/", "Understand exact age calculation from date of birth with simple steps and examples.")
        ]
    },
    "travel": {
        "title": "Tours & Travel Guides",
        "description": "Useful travel guides, trip calculations, travel budgeting tips, time and distance resources, and practical planning information.",
        "intro": "Explore practical travel guides and calculation resources that help you plan trips, budgets, distances, time, and everyday travel decisions.",
        "content": "The Tours & Travel category is built for practical trip planning. It will cover travel calculations, budgeting, distance and time planning, fuel costs, currency-related calculations, and useful travel tips. Clear formulas and examples can help travelers estimate costs and compare options before a journey. This category will continue to grow as more travel-focused guides and tools are published on CalcuPortal.",
        "articles": []
    },
    "general-knowledge": {
        "title": "General Knowledge Guides",
        "description": "Everyday knowledge guides, useful facts, simple calculations, conversions, measurements, dates, and practical explanations.",
        "intro": "Find easy-to-understand general knowledge articles, everyday calculations, conversions, measurements, and useful facts.",
        "content": "CalcuPortal's General Knowledge category focuses on useful information people can apply in everyday situations. Topics may include common calculations, measurements, conversions, dates, numbers, time, and practical explanations. The goal is to answer simple questions clearly without unnecessary complexity, while connecting readers to calculators and tools when a calculation is needed.",
        "articles": []
    },
    "finance": {
        "title": "Finance & Loan Guides",
        "description": "Learn about EMI calculations, loans, interest, investments, discounts, mortgages, and practical personal finance calculations.",
        "intro": "Explore practical finance guides covering EMI, loans, interest, investments, discounts, mortgages, and everyday money calculations.",
        "content": "The Finance & Loan category explains common financial calculations in a simple, practical format. Readers can learn how EMI works, how interest affects repayments, how percentages are used in discounts and finance, and how to compare different repayment scenarios. Detailed examples and formulas help make financial numbers easier to understand, while linked calculators provide a quick way to test your own values.",
        "articles": [
            ("EMI Calculation Guide", "/blog/emi-calculation-guide/", "Learn the EMI formula, step-by-step calculation method, examples, and ways to understand loan repayments."),
            ("Percentage Calculation Guide", "/blog/percentage-calculation-guide/", "Understand percentage formulas used in discounts, price changes, marks, finance, and everyday calculations.")
        ]
    },
    "health-fitness": {
        "title": "Health & Fitness Guides",
        "description": "Practical health and fitness calculation guides covering BMI, calories, body measurements, weight, and wellness topics.",
        "intro": "Explore practical health and fitness calculation guides covering BMI, calories, body measurements, weight, and wellness.",
        "content": "The Health & Fitness category provides easy-to-follow explanations for common wellness calculations. Topics can include BMI, calorie requirements, BMR, TDEE, body measurements, weight-related calculations, and other fitness metrics. Each guide is intended for general information and can help readers understand how a calculation works before using a calculator. Health calculations should not replace advice from a qualified medical professional.",
        "articles": [
            ("How to Calculate BMI", "/blog/how-to-calculate-bmi/", "Learn the BMI formula, adult BMI categories, examples, and common calculation mistakes.")
        ]
    },
    "technology": {
        "title": "Technology & Digital Guides",
        "description": "Technology guides covering digital tools, software, web concepts, productivity, automation, AI, and useful online resources.",
        "intro": "Explore practical technology and digital guides covering online tools, software, productivity, AI, automation, and web topics.",
        "content": "The Technology category is designed for readers looking for practical explanations of digital tools and technology concepts. Future guides can cover online utilities, software workflows, AI, automation, web technologies, productivity tools, and common technical questions. Articles will focus on clear explanations and practical examples so readers can understand a technology topic without needing an advanced technical background.",
        "articles": []
    },
    "business-career": {
        "title": "Business & Career Guides",
        "description": "Practical business and career guides covering salary, profit, pricing, jobs, interviews, productivity, and workplace calculations.",
        "intro": "Explore practical business and career resources covering salary, profit, pricing, jobs, interviews, and workplace calculations.",
        "content": "The Business & Career category brings together practical resources for professionals, job seekers, freelancers, and business owners. Topics can include salary calculations, profit and margin, pricing, business metrics, interviews, career planning, productivity, and workplace decisions. Clear examples and relevant calculators can help readers turn business numbers into useful decisions.",
        "articles": [
            ("Percentage Calculation Guide", "/blog/percentage-calculation-guide/", "Use percentage calculations for business growth, price changes, discounts, margins, and comparisons.")
        ]
    },
    "lifestyle": {
        "title": "Lifestyle & Hobbies Guides",
        "description": "Helpful lifestyle guides covering hobbies, everyday planning, relationships, home projects, leisure, and practical calculations.",
        "intro": "Discover practical lifestyle and hobby guides for everyday planning, leisure, home projects, relationships, and useful calculations.",
        "content": "The Lifestyle & Hobbies category is for useful information that supports everyday decisions and personal interests. Future content can cover home projects, hobbies, leisure activities, relationships, planning, entertainment, and practical calculations. The focus is on simple, useful explanations that help readers solve everyday questions quickly.",
        "articles": []
    }
}

CARD = '''<article class="calc-card"><h2>{title}</h2><p>{desc}</p><a href="{url}">Read Guide →</a></article>'''

STYLE = '''<style>.blog-category-wrap{max-width:900px;margin:auto}.blog-breadcrumb{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0;color:var(--text-muted);font-size:14px}.blog-breadcrumb a{color:var(--primary)}.category-copy{max-width:850px;margin:0 auto 32px}.category-copy p{color:var(--text-secondary);line-height:1.8;text-align:justify}.article-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.article-list .calc-card{height:100%}.empty-category{padding:28px;border:1px dashed var(--border-color);border-radius:16px;color:var(--text-secondary);text-align:center}@media(max-width:700px){.article-list{grid-template-columns:1fr}}</style>'''

HEADER = '''<header><div class="nav-container"><a href="/" class="logo"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a><button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button><nav class="nav-links" id="nav-links"><a href="/" class="nav-link">Home</a><a href="/about/" class="nav-link">About</a><a href="/contact/" class="nav-link">Contact</a><a href="/blog/" class="nav-link active">Blog</a><button class="theme-btn" title="Toggle Theme"><span class="theme-btn-icon"></span></button></nav></div></header>'''

FOOTER = '''<footer><div class="footer-container"><div class="footer-info"><a href="/" class="logo" style="display:inline-flex"><img src="/logo.png" alt="CalcuPortal Logo" class="logo-icon"><span>CalcuPortal</span></a><p style="text-align:justify">CalcuPortal provides practical calculators, guides, formulas, and useful resources for everyday calculations.</p></div><div class="footer-column"><h3>Pages</h3><ul><li><a href="/about/">About Us</a></li><li><a href="/contact/">Contact Us</a></li><li><a href="/privacy-policy/">Privacy Policy</a></li><li><a href="/disclaimer/">Disclaimer</a></li></ul></div><div class="footer-column"><h3>Blog</h3><ul><li><a href="/blog/">All Blog Categories</a></li></ul></div></div><div class="copyright-bar">© <span id="year">2026</span> CalcuPortal. All rights reserved.</div></footer>'''

for slug, data in CATEGORIES.items():
    cards = ''.join(CARD.format(title=escape(t), url=u, desc=escape(d)) for t,u,d in data['articles'])
    if not cards:
        cards = '<div class="empty-category">More '+escape(data['title'])+' articles are coming soon. Check back for new practical guides and resources.</div>'
    url = f"{BASE}/blog/{slug}/"
    html = f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="index, follow"><title>{escape(data['title'])} | CalcuPortal</title><meta name="description" content="{escape(data['description'])}"><link rel="canonical" href="{url}"><link rel="stylesheet" href="/styles.css"><script src="/script.js"></script>{STYLE}<script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"{BASE}/"}},{{"@type":"ListItem","position":2,"name":"Blog","item":"{BASE}/blog/"}},{{"@type":"ListItem","position":3,"name":"{escape(data['title'])}","item":"{url}"}}]}}</script><script type="application/ld+json">{{"@context":"https://schema.org","@type":"CollectionPage","name":"{escape(data['title'])}","url":"{url}","description":"{escape(data['description'])}","isPartOf":{{"@type":"WebSite","name":"CalcuPortal","url":"{BASE}/"}}}}</script></head><body>{HEADER}<main><div class="blog-category-wrap"><nav class="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blog/">Blog</a><span>›</span><span aria-current="page">{escape(data['title'])}</span></nav><header class="detail-header"><h1>{escape(data['title'])}</h1><p>{escape(data['intro'])}</p></header><section class="category-copy"><h2>About {escape(data['title'])}</h2><p>{escape(data['content'])}</p></section><section><div class="category-header"><h2 class="category-title">Latest {escape(data['title'])}</h2></div><div class="article-list">{cards}</div></section></div></main>{FOOTER}<script>document.getElementById('year').innerText=new Date().getFullYear();</script></body></html>'''
    out = ROOT / 'blog' / slug / 'index.html'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding='utf-8')
    print(out)
