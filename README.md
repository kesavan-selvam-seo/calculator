# Online Calculator Website - GitHub Pages Version

This is a GitHub Pages-friendly static website for online calculators.

## What is included

- Static frontend website
- Sample Age Calculator page
- Local CMS-style page generator
- SEO fields: URL slug, canonical URL, meta title, meta description, H1
- Calculator code section
- SEO content section
- FAQ section with FAQ schema
- Sitemap.xml
- Robots.txt

## Important

GitHub Pages supports only static files. It does not support a real backend CMS, database, or admin login.

This version includes `admin.html`, a local page generator. You can use it to generate a new calculator page HTML file.

## How to run locally

Open `index.html` in your browser.

## How to upload to GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder.
3. Go to repository Settings.
4. Open Pages.
5. Select Branch: `main` and Folder: `/root`.
6. Click Save.

Your website will open like:

```text
https://yourusername.github.io/repository-name/
```

## How to create a new calculator page

1. Open `admin.html` in browser.
2. Add URL slug, canonical URL, meta title, meta description, H1, calculator code, SEO content, and FAQs.
3. Click `Generate HTML Code`.
4. Click `Download index.html`.
5. Create a folder like:

```text
calculators/sip-calculator/
```

6. Upload the downloaded `index.html` inside that folder.
7. Add the new page link manually in `index.html` homepage.
8. Add the new URL manually in `sitemap.xml`.

## Example page URL

```text
/calculators/age-calculator/
```
