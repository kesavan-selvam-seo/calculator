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

function addKidsLearningGamesNav() {
  const nav = document.getElementById('nav-links');
  if (!nav || nav.querySelector('.kids-games-nav-link')) return;

  const link = document.createElement('a');
  link.href = '/kids-learning-games/';
  link.className = 'nav-link kids-games-nav-link';
  link.textContent = 'Kids Learning Games';
  link.title = 'Kids Learning Games';
  link.setAttribute('aria-label', 'Kids Learning Games');
  link.style.whiteSpace = 'nowrap';
  link.style.fontWeight = '700';

  const themeButton = nav.querySelector('.theme-btn');
  if (themeButton) {
    nav.insertBefore(link, themeButton);
  } else {
    nav.appendChild(link);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  addKidsLearningGamesNav();

  // Fallback for delayed/cached navigation rendering.
  const navObserver = new MutationObserver(addKidsLearningGamesNav);
  const nav = document.getElementById('nav-links');
  if (nav) navObserver.observe(nav, { childList: true, subtree: true });

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
});

// Also run after initial page parsing in case DOMContentLoaded has already fired.
if (document.readyState !== 'loading') {
  addKidsLearningGamesNav();
}
