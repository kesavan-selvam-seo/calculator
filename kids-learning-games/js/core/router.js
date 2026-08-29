// router.js - SPA Router with clean, crawlable path URLs

class Router {
  constructor() {
    this.routes = [];
    this.currentPath = '';
    this.homeView = null;
    this.gamesView = null;
    this.subjectView = null;
    this.ageView = null;
    this.progressView = null;
    this.parentsView = null;
    this.gameRunner = null;
  }

  getBasePath() {
    const marker = '/kids-learning-games';
    const pathname = window.location.pathname || '/';
    const index = pathname.indexOf(marker);
    return index >= 0 ? pathname.slice(0, index) + marker : marker;
  }

  cleanLegacyHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#/')) return;
    const route = hash.slice(1) || '/';
    const cleanPath = this.getBasePath() + (route === '/' ? '/' : route);
    window.history.replaceState({}, document.title, cleanPath);
  }

  normalizeHashLinks() {
    document.querySelectorAll('a[href^="#/"]').forEach(link => {
      const route = link.getAttribute('href').slice(1) || '/';
      link.setAttribute('href', this.getBasePath() + (route === '/' ? '/' : route));
    });
  }

  init(mountId) {
    this.homeView = new window.HomeView(mountId);
    this.gamesView = new window.GamesView(mountId);
    this.subjectView = new window.SubjectView(mountId);
    this.ageView = new window.AgeView(mountId);
    this.progressView = new window.ProgressView(mountId);
    this.parentsView = new window.ParentsView(mountId);
    this.gameRunner = new window.GameRunner(mountId);

    // Convert old #/ URLs to real path URLs.
    this.cleanLegacyHash();
    this.normalizeHashLinks();

    window.addEventListener('popstate', () => this.handleRoute());

    // Protect against dynamically-rendered legacy hash links.
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || link.target || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#/')) return;
      e.preventDefault();
      this.navigate(href.slice(1));
    });

    this.handleRoute();
  }

  getPath() {
    const pathname = (window.location.pathname || '/').split('?')[0];
    const base = this.getBasePath();
    if (pathname === base || pathname === `${base}/`) return '/';
    if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
    return '/';
  }

  navigate(path) {
    let route = path || '/';
    if (!route.startsWith('/')) route = '/' + route;
    const cleanPath = this.getBasePath() + (route === '/' ? '/' : route);
    window.history.pushState({}, document.title, cleanPath);
    this.handleRoute();
  }

  handleRoute() {
    const path = this.getPath();
    this.currentPath = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path === '/' || path === '/home') return this.homeView.render();
    if (path === '/games' || path === '/games/' || path === '/all-games') return this.gamesView.render();

    if (path.startsWith('/games/')) {
      const slug = path.replace(/^\/games\//, '').replace(/^\/+|\/+$/g, '');
      if (slug) return this.gameRunner.loadGame(slug);
    }

    const subjectSlugs = ['math-games', 'english-games', 'science-games', 'gk-games', 'spelling-games', 'logic-games', 'geography-games', 'memory-games', 'creativity-games', 'fast-games'];
    const subject = subjectSlugs.find(slug => path === `/${slug}` || path === `/${slug}/`);
    if (subject) return this.subjectView.render(subject);

    if (path.startsWith('/games-for-') && path.includes('-year-olds')) {
      return this.ageView.render(path.replace(/^\/+|\/+$/g, ''));
    }

    if (path === '/progress' || path === '/progress/') return this.progressView.render();
    if (path === '/parents' || path === '/parents/') return this.parentsView.render();

    this.render404();
  }

  render404() {
    const mount = document.getElementById('main-content-mount');
    if (!mount) return;
    document.title = 'Page Not Found — Kids Learning Games';
    mount.innerHTML = `
      <div class="max-w-xl mx-auto py-20 px-4 text-center">
        <div class="text-8xl mb-4 animate-bounce-soft">🕵️</div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-800 font-display mb-3">Oops! This game went missing.</h1>
        <p class="text-slate-500 font-medium text-base mb-8">The page or game you're looking for was moved or doesn't exist. Let's find another fun game!</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a href="${this.getBasePath()}/" class="btn-chubby btn-primary px-6 py-3 text-base">🏠 Back to Home</a>
          <a href="${this.getBasePath()}/games/" class="btn-chubby btn-emerald px-6 py-3 text-base">🎮 Browse 100 Games</a>
        </div>
      </div>
    `;
  }
}

window.router = new Router();
