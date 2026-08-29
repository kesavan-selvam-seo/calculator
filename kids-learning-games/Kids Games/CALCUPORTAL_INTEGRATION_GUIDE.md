# CalcuPortal Integration Guide

This guide explains how to add the **Kids Learning Games platform** to your existing website **[https://www.calcuportal.com/](https://www.calcuportal.com/)**.

---

## 🚀 Option 1: Add as a Subfolder (Recommended)
**Target URL:** `https://www.calcuportal.com/kids-games/` (or `/games/`)

All HTML, CSS, and JS files have been built with **relative paths** (`css/...`, `js/...`), so the folder can be uploaded directly into your website root with zero configuration.

### Step 1: Upload Files
1. Create a new folder named `kids-games` inside your website public root directory (e.g. `public_html/kids-games/` or `www/kids-games/` or `public/kids-games/`).
2. Copy all files from this project into that `kids-games/` folder:
   ```
   public_html/
   ├── index.html (CalcuPortal Homepage)
   ├── styles.css
   ├── script.js
   └── kids-games/
       ├── index.html
       ├── css/
       │   └── styles.css
       ├── js/
       │   ├── app.js
       │   ├── core/
       │   ├── data/
       │   ├── games/
       │   └── views/
       ├── sitemap.xml
       └── robots.txt
   ```

---

### Step 2: Add Navigation Link in CalcuPortal Header
In your CalcuPortal `index.html` (and header across other pages), add this link inside `<nav class="nav-links" id="nav-links">`:

```html
<!-- Inside CalcuPortal <nav class="nav-links" id="nav-links"> -->
<a href="/kids-games/" class="nav-link" style="color: #4F46E5; font-weight: bold;">
  🎮 Kids Games
</a>
```

---

### Step 3: Add Category Card on CalcuPortal Homepage
In your CalcuPortal `index.html`, find `<div class="category-grid">` inside `<section class="category-section" id="categories-directory-section">` and paste this card:

```html
<!-- Paste inside CalcuPortal's <div class="category-grid"> -->
<a href="/kids-games/" class="calc-card" style="border: 2px solid #6366F1; background: linear-gradient(to bottom right, #ffffff, #EEF2FF);">
  <div class="calc-card-header">
    <h3 class="calc-card-title" style="color: #4338CA;">🎮 Kids Learning Games</h3>
    <span class="calc-card-icon">🦊</span>
  </div>
  <p class="calc-card-desc">
    100 free interactive learning games for kids aged 4–12. Math, spelling, reading, science, logic puzzles, and geography.
  </p>
  <div class="calc-card-footer" style="color: #4F46E5; font-weight: bold;">
    <span>Play 100 Games</span>
    <span>&rarr;</span>
  </div>
</a>
```

---

## 🌐 Option 2: Add on a Subdomain
**Target URL:** `https://games.calcuportal.com/` or `https://kids.calcuportal.com/`

1. In your domain DNS / cPanel / Cloudflare, create a new CNAME or A record for `kids.calcuportal.com` (or `games.calcuportal.com`).
2. Point the document root of the subdomain to this project folder.
3. In CalcuPortal header, link to:
   ```html
   <a href="https://kids.calcuportal.com/" class="nav-link" target="_blank">🎮 Kids Games</a>
   ```

---

## 🖼️ Option 3: Embed via Iframe on a CalcuPortal Page
If you have a dedicated page like `https://www.calcuportal.com/kids-learning/`, you can embed the platform seamlessly:

```html
<div style="width: 100%; height: 92vh; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
  <iframe 
    src="/kids-games/" 
    title="Kids Learning Games" 
    style="width: 100%; height: 100%; border: none;"
    allow="autoplay; fullscreen">
  </iframe>
</div>
```

---

## 🛠️ Nginx / Apache Rewrite (Optional for Clean URLs)
Because the games use hash routing (`#/games/number-catcher`, `#/math-games`, etc.), **no server URL rewrites are required**. It works seamlessly on any static host, Apache, Nginx, Cloudflare Pages, Vercel, Netlify, or cPanel.
