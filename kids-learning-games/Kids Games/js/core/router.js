// router.js - SPA Router supporting clean URLs, hash routes & dynamic view rendering
// Robust across root domains, subdirectories (e.g. /kids-games/), and static file hosting.

class Router {
  constructor() {
    this.routes = [];
    this.currentPath = '';
    
    // View instances
    this.homeView = null;
    this.gamesView = null;
    this.subjectView = null;
    this.ageView = null;
    this.progressView = null;
    this.parentsView = null;
    this.gameRunner = null;
  }

  init(mountId) {
    this.homeView = new window.HomeView(mountId);
    this.gamesView = new window.GamesView(mountId);
    this.subjectView = new window.SubjectView(mountId);
    this.ageView = new window.AgeView(mountId);
    this.progressView = new window.ProgressView(mountId);
    this.parentsView = new window.ParentsView(mountId);
    this.gameRunner = new window.GameRunner(mountId);

    // Listen for hash changes & popstate
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());

    // Intercept internal relative links for clean navigation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('download') && !link.target) {
        const url = new URL(link.href);
        if (url.hash) {
          // Handled natively by hashchange
          return;
        }
      }
    });

    // Handle initial route
    this.handleRoute();
  }

  getPath() {
    if (window.location.hash) {
      let hash = window.location.hash.slice(1).trim();
      if (!hash.startsWith('/')) hash = '/' + hash;
      return hash.split('?')[0];
    }
    
    const p = (window.location.pathname || '/').split('?')[0];
    // If the path ends in index.html, or is a subdirectory root (e.g. /kids-games/ or /games/)
    if (p.endsWith('index.html') || p === '/' || p.endsWith('/kids-games/') || p.endsWith('/kids-games') || p.endsWith('/games/') || p.endsWith('/games')) {
      return '/';
    }
    return p;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const path = this.getPath();
    this.currentPath = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Homepage: / or #/
    if (path === '/' || path === '' || path === '/home') {
      this.homeView.render();
      return;
    }

    // 2. Games Directory: /games or #/games
    if (path === '/games' || path === '/games/' || path === '/all-games') {
      this.gamesView.render();
      return;
    }

    // 3. Individual Game: /games/:slug or #/games/:slug
    if (path.startsWith('/games/')) {
      const slug = path.replace('/games/', '').replace(/^\/+|\/+$/g, '');
      if (slug) {
        this.gameRunner.loadGame(slug);
        return;
      }
    }

    // 4. Subject Landing Pages: /math-games, /english-games, /science-games, /gk-games, /spelling-games, /logic-games, /geography-games, /creativity-games, /fast-games
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

    // 5. Age Landing Pages: /games-for-4-year-olds through /games-for-12-year-olds
    if (path.startsWith('/games-for-') && path.includes('-year-olds')) {
      const ageSlug = path.replace(/^\/+|\/+$/g, '');
      this.ageView.render(ageSlug);
      return;
    }

    // 6. Progress Dashboard: /progress or #/progress
    if (path === '/progress' || path === '/progress/') {
      this.progressView.render();
      return;
    }

    // 7. Parents Portal: /parents or #/parents
    if (path === '/parents' || path === '/parents/') {
      this.parentsView.render();
      return;
    }

    // 8. 404 Fallback
    this.render404();
  }

  render404() {
    const mount = document.getElementById('main-content-mount');
    if (!mount) return;

    document.title = 'Page Not Found — Kids Learning Games';

    mount.innerHTML = `
      <div class="max-w-xl mx-auto py-20 px-4 text-center">
        <div class="text-8xl mb-4 animate-bounce-soft">🕵️</div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-800 font-display mb-3">
          Oops! This game went missing.
        </h1>
        <p class="text-slate-500 font-medium text-base mb-8">
          The page or game you're looking for was moved or doesn't exist. Let's find another fun game!
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a href="#/" class="btn-chubby btn-primary px-6 py-3 text-base">
            🏠 Back to Home
          </a>
          <a href="#/games" class="btn-chubby btn-emerald px-6 py-3 text-base">
            🎮 Browse 100 Games
          </a>
        </div>
      </div>
    `;
  }
}

window.router = new Router();
