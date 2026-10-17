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

  // Blog category/article pages contain a second <header> for the page title.
  // Scope sticky behavior to the real primary navigation header so the detail
  // header never becomes sticky and the mobile nav remains attached to it.
  const detailHeaders = document.querySelectorAll('.detail-header');
  if (detailHeaders.length) {
    const primaryHeader = document.querySelector('body > header');

    if (primaryHeader) {
      const detailPageStyle = document.createElement('style');
      detailPageStyle.id = 'calcuportal-detail-header-fix';
      detailPageStyle.textContent = `
        body > header {
          position: -webkit-sticky !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          align-self: stretch !important;
          flex-shrink: 0 !important;
        }
        body > main header.detail-header {
          position: static !important;
          top: auto !important;
          right: auto !important;
          bottom: auto !important;
          left: auto !important;
          z-index: auto !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        @media (max-width: 768px) {
          html,
          body {
            overflow-x: clip !important;
          }
          body > header {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 0 !important;
          }
        }
      `;
      document.head.appendChild(detailPageStyle);

      detailHeaders.forEach((detailHeader) => {
        detailHeader.style.position = 'static';
        detailHeader.style.top = 'auto';
        detailHeader.style.zIndex = 'auto';
      });
    }
  }

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

/* Homepage calculator search: load the published directory and filter it as the user types. */
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const resultsSection = document.getElementById('search-results-section');
  const resultsGrid = document.getElementById('search-results-grid');
  const categoriesSection = document.getElementById('categories-directory-section');

  // This shared script is also used by inner pages; search only exists on the homepage.
  if (!searchInput || !resultsSection || !resultsGrid) return;

  const directoryUrl = new URL('/calculators/', window.location.origin);
  let calculatorIndex = null;
  let indexPromise = null;
  let debounceTimer = null;

  const normalizeSearchText = function (value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  };

  const tokenAliases = {
    bmi: ['body mass index'],
    dob: ['date of birth', 'birthday', 'age'],
    birthday: ['date of birth', 'age'],
    emi: ['equated monthly instalment', 'equated monthly installment', 'monthly loan payment', 'loan repayment'],
    instalment: ['installment', 'emi', 'monthly payment'],
    installment: ['instalment', 'emi', 'monthly payment'],
    cgpa: ['cumulative grade point average', 'gpa', 'grade point average'],
    gpa: ['grade point average', 'cgpa'],
    percent: ['percentage', 'discount', 'proportion'],
    pct: ['percentage', 'percent'],
    petrol: ['fuel', 'mileage'],
    diesel: ['fuel', 'mileage'],
    mpg: ['fuel', 'mileage', 'gas'],
    gas: ['fuel', 'mileage', 'mpg'],
    kwh: ['electricity', 'electricity cost', 'power usage'],
    'electric bill': ['electricity cost', 'utility rate'],
    calorie: ['calorie intake', 'calorie burn', 'bmr', 'tdee'],
    calories: ['calorie intake', 'calorie burn', 'bmr', 'tdee'],
    salary: ['income tax', 'take home pay'],
    takehome: ['take home pay', 'income tax'],
    'take home': ['take home pay', 'income tax'],
    tax: ['income tax', 'sales tax'],
    weight: ['ideal weight', 'pounds', 'kilograms', 'kg'],
    height: ['feet to cm', 'centimeters', 'meters'],
    mortgage: ['home loan', 'loan emi', 'amortization'],
    investment: ['compound interest', 'irr', 'future value'],
    bill: ['electricity cost', 'utility rate']
  };

  function hasWholePhrase(text, phrase) {
    const paddedText = ' ' + text + ' ';
    const paddedPhrase = ' ' + phrase + ' ';
    return paddedText.indexOf(paddedPhrase) !== -1;
  }

  function loadCalculatorIndex() {
    if (calculatorIndex) return Promise.resolve(calculatorIndex);
    if (indexPromise) return indexPromise;

    indexPromise = fetch(directoryUrl.href, { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) throw new Error('Calculator directory request failed.');
        return response.text();
      })
      .then(function (html) {
        const parsedDocument = new DOMParser().parseFromString(html, 'text/html');
        const cards = Array.from(parsedDocument.querySelectorAll('.category-grid a.calc-card'));
        const seenUrls = new Set();

        calculatorIndex = cards.map(function (sourceCard) {
          const titleElement = sourceCard.querySelector('.calc-card-title');
          const descriptionElement = sourceCard.querySelector('.calc-card-desc');
          const title = titleElement ? titleElement.textContent.trim() : '';
          const description = descriptionElement ? descriptionElement.textContent.trim() : '';
          const rawHref = sourceCard.getAttribute('href');

          if (!title || !rawHref) return null;

          let url;
          try {
            url = new URL(rawHref, directoryUrl);
          } catch (error) {
            return null;
          }

          if (url.origin !== window.location.origin || seenUrls.has(url.href)) return null;
          seenUrls.add(url.href);

          return {
            title: title,
            description: description,
            icon: (sourceCard.querySelector('.calc-card-icon') || {}).textContent || '🧮',
            url: url.href,
            titleSearch: normalizeSearchText(title),
            descriptionSearch: normalizeSearchText(description),
            searchText: normalizeSearchText([
              title,
              description,
              rawHref,
              sourceCard.textContent
            ].join(' '))
          };
        }).filter(Boolean);

        if (!calculatorIndex.length) {
          calculatorIndex = null;
          throw new Error('No calculator cards were found in the directory.');
        }

        return calculatorIndex;
      })
      .catch(function (error) {
        indexPromise = null;
        throw error;
      });

    return indexPromise;
  }

  function matchesToken(item, token) {
    if (hasWholePhrase(item.searchText, token)) return true;

    const aliases = tokenAliases[token] || [];
    return aliases.some(function (alias) {
      return hasWholePhrase(item.searchText, normalizeSearchText(alias));
    });
  }

  function rankCalculator(item, query, tokens) {
    let score = 0;

    if (item.titleSearch === query) score += 100;
    else if (item.titleSearch.indexOf(query) === 0) score += 60;
    else if (item.titleSearch.indexOf(query) !== -1) score += 35;

    tokens.forEach(function (token) {
      if (hasWholePhrase(item.titleSearch, token)) score += 12;
      else if (hasWholePhrase(item.descriptionSearch, token)) score += 5;
      else score += 1;
    });

    return score;
  }

  function addMessage(message, isError) {
    const paragraph = document.createElement('p');
    paragraph.className = 'search-empty-state';
    paragraph.setAttribute('role', 'status');
    paragraph.style.gridColumn = '1 / -1';
    paragraph.style.textAlign = 'center';
    paragraph.style.padding = '1rem';
    paragraph.textContent = message;
    if (isError) paragraph.style.color = 'var(--text-secondary)';
    resultsGrid.replaceChildren(paragraph);
  }

  function makeResultCard(item) {
    const card = document.createElement('a');
    card.className = 'calc-card';
    card.href = item.url;

    const header = document.createElement('div');
    header.className = 'calc-card-header';

    const title = document.createElement('h3');
    title.className = 'calc-card-title';
    title.textContent = item.title;

    const icon = document.createElement('span');
    icon.className = 'calc-card-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.icon;

    const description = document.createElement('p');
    description.className = 'calc-card-desc';
    description.textContent = item.description;

    const footer = document.createElement('div');
    footer.className = 'calc-card-footer';

    const footerLabel = document.createElement('span');
    footerLabel.textContent = 'Open Calculator';

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    header.append(title, icon);
    footer.append(footerLabel, arrow);
    card.append(header, description, footer);
    return card;
  }

  function setResultCount(count) {
    const header = resultsSection.querySelector('.category-header');
    if (!header) return;

    let countElement = header.querySelector('.search-result-count');
    if (!countElement) {
      countElement = document.createElement('span');
      countElement.className = 'search-result-count';
      countElement.setAttribute('aria-live', 'polite');
      countElement.style.color = 'var(--text-secondary)';
      countElement.style.fontSize = '0.9rem';
      header.appendChild(countElement);
    }

    countElement.textContent = count === null ? '' : count + (count === 1 ? ' calculator found' : ' calculators found');
  }

  function resetSearchView() {
    resultsGrid.replaceChildren();
    resultsSection.classList.add('hidden');
    if (categoriesSection) categoriesSection.classList.remove('hidden');
    searchInput.setAttribute('aria-expanded', 'false');
    setResultCount(null);
  }

  async function updateSearchResults() {
    const rawQuery = searchInput.value.trim();
    const query = normalizeSearchText(rawQuery);

    if (!query) {
      resetSearchView();
      return;
    }

    resultsSection.classList.remove('hidden');
    if (categoriesSection) categoriesSection.classList.add('hidden');
    searchInput.setAttribute('aria-expanded', 'true');
    addMessage('Searching calculators…', false);

    try {
      const items = await loadCalculatorIndex();

      // Ignore an older request if the user has already changed or cleared the query.
      if (normalizeSearchText(searchInput.value.trim()) !== query) return;

      const tokens = query.split(' ').filter(Boolean);
      const matches = items.filter(function (item) {
        return tokens.every(function (token) {
          return matchesToken(item, token);
        });
      });

      matches.sort(function (a, b) {
        return rankCalculator(b, query, tokens) - rankCalculator(a, query, tokens)
          || a.title.localeCompare(b.title);
      });

      resultsGrid.replaceChildren();

      if (!matches.length) {
        addMessage('No calculators found for “' + rawQuery + '”. Try a shorter term such as age, BMI, EMI, loan, percentage, or fuel.', false);
        setResultCount(0);
        return;
      }

      const fragment = document.createDocumentFragment();
      matches.forEach(function (item) {
        fragment.appendChild(makeResultCard(item));
      });
      resultsGrid.appendChild(fragment);
      setResultCount(matches.length);
    } catch (error) {
      if (normalizeSearchText(searchInput.value.trim()) !== query) return;
      addMessage('Calculator search could not load the directory. Please try again in a moment.', true);
      setResultCount(0);
      console.error('CalcuPortal search error:', error);
    }
  }

  searchInput.setAttribute('aria-label', 'Search calculators by name or topic');
  searchInput.setAttribute('aria-controls', 'search-results-grid');
  searchInput.setAttribute('aria-expanded', 'false');

  searchInput.addEventListener('input', function () {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(updateSearchResults, 120);
  });

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && searchInput.value) {
      searchInput.value = '';
      resetSearchView();
    }
  });
});
