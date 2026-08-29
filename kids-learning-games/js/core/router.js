// router.js - Clean URL SPA Router
// Uses real paths instead of hash (#/) URLs for SEO-friendly navigation.

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
    const pathname = window.location.pathname;
    const index = pathname.indexOf(marker);
    return index >= 0 ? pathname.slice(0, index) + marker : '';
  }

  cleanHashUrl() {
    if (!window.location.hash) return;
    const hash = window.location.hash.slice(1) || '/';
    const route = hash.startsWith('/') ? hash : '/' + hash;
    const query = window.location.search || '';
    const cleanUrl = this.getBasePath() + (route === '/' ? '/' : route) + query;
    window.history.replaceState({}, '', cleanUrl);
  }

  init(mountId) {
    this.homeView = new window.HomeView(mountId);
    this.gamesView = new window.GamesView(mountId);
    this.subjectView = new window.SubjectView(mountId);
    this.ageView = new window.AgeView(mountId);
    this.progressView = new window.ProgressView(mountId);
    this.parentsView = new window.ParentsView(mountId);
    this.gameRunner = new window.GameRunner(mountId);

    // Convert old hash URLs such as /kids-learning-games/#/games
    // to clean URLs such as /kids-learning-games/games/.
    this.cleanHashUrl();

    window.addEventListener('popstate', () => this.handleRoute());

    // Intercept internal hash links and convert them to real clean URLs.
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href || link.target || link.hasAttribute('download')) return;
      if (!link.href.startsWith(window.location.origin)) return;

      const url = new URL(link.href);
      if (!url.hash || !url.hash.startsWith('#/')) return;

      e.preventDefault();
      const route = url.hash.slice(1) || '/';
      const cleanPath = this.getBasePath() + (route.startsWith('/') ? route : '/' + route);
      window.history.pushState({}, '', cleanPath);
      this.handleRoute();
    });

    this.handleRoute();
  }

  getPath() {
    let p = (window.location.pathname || '/').split('?')[0];
    const base = this.getBasePath();

    if (base && p.startsWith(base)) {
      p = p.slice(base.length) || '/';
    }

    if (p.endsWith('index.html')) return '/';
    if (!p.startsWith('/')) p = '/' + p;
    return p;
  }

  navigate(path) {
    const route = path || '/';
    const cleanPath = this.getBasePath() + (route.startsWith('/') ? route : '/' + route);
    window.history.pushState({}, '', cleanPath);
    this.handleRoute();
  }

  handleRoute() {
    const path = this.getPath();
    this.currentPath = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path === '/' || path === '' || path === '/home') {
      this.homeView.render();
      return;
    }

    if (path === '/games' || path === '/games/' || path === '/all-games') {
      this.gamesView.render();
      return;
    }

    if (path.startsWith('/games/')) {
      const slug = path.replace('/games/', '').replace(/^\/+|\/+$/g, '');
      if (slug) {
        this.gameRunner.loadGame(slug);
        return;
      }
    }

    const subjectSlugs = [
      'math-games', 'english-games', 'science-games', 'gk-games',
      'spelling-games', 'logic-games', 'geography-games', 'memory-games',
      'creativity-games', 'fast-games'
    ];
    const matchSub = subjectSlugs.find(s => path === `/${s}` || path === `/${s}/`);
    if (matchSub) {
      this.subjectView.render(matchSub);
      return;
    }

    if (path.startsWith('/games-for-') && path.includes('-year-olds')) {
      const ageSlug = path.replace(/^\/+|\/+$/g, '');
      this.ageView.render(ageSlug);
      return;
    }

    if (path === '/progress' || path === '/progress/') {
      this.progressView.render();
      return;
    }

    if (path === '/parents' || path === '/parents/') {
      this.parentsView.render();
      return;
    }

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
          <a href="#/" class="btn-chubby btn-primary px-6 py-3 text-base">🏠 Back to Home</a>
          <a href="#/games" class="btn-chubby btn-emerald px-6 py-3 text-base">🎮 Browse 100 Games</a>
        </div>
      </div>
    `;
  }
}

window.router = new Router();
