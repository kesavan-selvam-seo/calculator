// Google Analytics 4 Tracking
(function () {
  var gaId = "G-449EVK65FB";

  if (!window.gtag) {
    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", gaId, {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title
    });
  }
})();

// Initialize theme
(function () {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Add Blog to every page header navigation that uses the shared script.
  // The homepage already has the link, so do not create a duplicate there.
  const nav = document.getElementById('nav-links');
  if (nav && !nav.querySelector('a[href="/blog/"]')) {
    const blogLink = document.createElement('a');
    blogLink.href = '/blog/';
    blogLink.className = 'nav-link';
    blogLink.textContent = 'Blog';

    const themeButton = nav.querySelector('.theme-btn');
    if (themeButton) {
      nav.insertBefore(blogLink, themeButton);
    } else {
      nav.appendChild(blogLink);
    }
  }

  // Blog category/article headings must never inherit the sticky navigation behavior.
  document.querySelectorAll('.detail-header').forEach((detailHeader) => {
    detailHeader.style.position = 'static';
    detailHeader.style.top = 'auto';
    detailHeader.style.zIndex = 'auto';
  });

  // Theme toggler
  const themeToggleBtns = document.querySelectorAll('.theme-btn');

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    const icons = document.querySelectorAll('.theme-btn-icon');

    icons.forEach(icon => {
      if (theme === 'dark') {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      }
    });
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcons(initialTheme);

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavLinks = document.getElementById('nav-links');

  if (menuToggle && mobileNavLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNavLinks.classList.toggle('active');
    });
  }

  // FAQ accordion UI
  const faqHeading = document.querySelector('.article-content #faq');
  if (faqHeading) {
    const faqItems = [];
    let node = faqHeading.nextElementSibling;

    while (node && node.tagName.toLowerCase() === 'details') {
      faqItems.push(node);
      node = node.nextElementSibling;
    }

    if (faqItems.length) {
      faqItems.forEach(item => {
        item.classList.add('cp-faq-item');
        item.setAttribute('name', 'calcuportal-faq');

        const summary = item.querySelector(':scope > summary');
        if (summary) {
          summary.classList.add('cp-faq-summary');
        }

        const answer = item.querySelector(':scope > p');
        if (answer) {
          answer.classList.add('cp-faq-answer');
        }
      });

      if (!document.getElementById('calcuportal-faq-ui')) {
        const style = document.createElement('style');
        style.id = 'calcuportal-faq-ui';
        style.textContent = `
          .article-content #faq {
            margin-top: 3.5rem;
            margin-bottom: 1.25rem;
            padding-bottom: 0.75rem;
            border-bottom: 0;
            color: var(--text-primary);
            font-family: var(--font-heading);
            font-size: 1.75rem;
            font-weight: 800;
          }
          .article-content .cp-faq-item {
            margin: 0 0 0.75rem;
            padding: 0;
            border: 1px solid var(--border-color);
            border-radius: 0.9rem;
            background: var(--bg-card);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          }
          .article-content .cp-faq-item:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-md);
          }
          .article-content .cp-faq-item[open] {
            border-color: var(--primary);
            box-shadow: var(--shadow-md);
          }
          .article-content .cp-faq-summary {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            padding: 1.05rem 1.15rem;
            cursor: pointer;
            list-style: none;
            color: var(--text-primary);
            font-family: var(--font-sans);
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.45;
            user-select: none;
          }
          .article-content .cp-faq-summary::-webkit-details-marker {
            display: none;
          }
          .article-content .cp-faq-summary::marker {
            display: none;
          }
          .article-content .cp-faq-summary::after {
            content: '+';
            flex: 0 0 auto;
            width: 1.8rem;
            height: 1.8rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--primary-light);
            color: var(--primary);
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1;
          }
          .article-content .cp-faq-item[open] .cp-faq-summary::after {
            content: '−';
          }
          .article-content .cp-faq-summary:focus-visible {
            outline: 3px solid var(--primary-light);
            outline-offset: -3px;
          }
          .article-content .cp-faq-answer {
            margin: 0;
            padding: 0 1.15rem 1.15rem;
            color: var(--text-secondary);
            font-family: var(--font-sans);
            font-size: 0.96rem;
            line-height: 1.75;
            text-align: left;
          }
          @media (max-width: 768px) {
            .article-content #faq {
              margin-top: 2.5rem;
              font-size: 1.5rem;
            }
            .article-content .cp-faq-summary {
              padding: 0.95rem 0.9rem;
              font-size: 0.95rem;
            }
            .article-content .cp-faq-summary::after {
              width: 1.65rem;
              height: 1.65rem;
              font-size: 1.1rem;
            }
            .article-content .cp-faq-answer {
              padding: 0 0.9rem 1rem;
              font-size: 0.92rem;
              line-height: 1.65;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
});