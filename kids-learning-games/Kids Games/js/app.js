// app.js - Main Application Initialization & Global UI Event Orchestration

(function() {
  function initApp() {
    // 1. Initialize SPA Router
    if (window.router) {
      window.router.init('main-content-mount');
    }

    // 2. Setup Top Navbar Counters
    updateTopNavStats();
    window.addEventListener('klg_progress_updated', updateTopNavStats);

    // 3. Sound Toggle Button in Header
    const navSoundBtn = document.getElementById('nav-sound-toggle');
    if (navSoundBtn) {
      const isSound = window.soundEngine ? window.soundEngine.isSoundEnabled() : true;
      navSoundBtn.textContent = isSound ? '🔊' : '🔇';
      navSoundBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          const enabled = window.soundEngine.toggleSound();
          navSoundBtn.textContent = enabled ? '🔊' : '🔇';
        }
      });
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
    if (mobileMenuBtn && mobileMenuDropdown) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuDropdown.classList.toggle('hidden');
      });

      // Close mobile menu on any navigation click
      mobileMenuDropdown.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          mobileMenuDropdown.classList.add('hidden');
        }
      });
    }

    // 5. Search Modal Handling
    const openSearchBtns = document.querySelectorAll('.open-search-modal-btn');
    const searchModal = document.getElementById('global-search-modal');
    const closeSearchBtn = document.getElementById('close-search-modal-btn');
    const modalSearchInput = document.getElementById('modal-search-input');
    const modalSearchResults = document.getElementById('modal-search-results');

    const openSearch = () => {
      if (searchModal) {
        searchModal.classList.remove('hidden');
        if (modalSearchInput) {
          modalSearchInput.value = '';
          modalSearchInput.focus();
          renderModalResults('');
        }
      }
    };

    const closeSearch = () => {
      if (searchModal) searchModal.classList.add('hidden');
    };

    openSearchBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

    // Close on backdrop click
    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
      });
    }

    // Keyboard shortcut (Cmd+K / Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
        closeSearch();
      }
    });

    if (modalSearchInput && modalSearchResults) {
      modalSearchInput.addEventListener('input', (e) => {
        renderModalResults(e.target.value);
      });
    }

    function renderModalResults(query) {
      if (!modalSearchResults) return;
      const q = query.trim().toLowerCase();

      let results = [];
      if (q && window.searchGames) {
        results = window.searchGames(q).slice(0, 8);
      } else {
        results = (window.getPopularGames ? window.getPopularGames(6) : (window.GAMES_DATA || []).slice(0, 6));
      }

      if (results.length === 0) {
        modalSearchResults.innerHTML = `
          <div class="py-8 text-center text-slate-400 font-semibold text-sm">
            No games found matching "${query}". Try searching "math", "spelling", or "animals".
          </div>
        `;
        return;
      }

      modalSearchResults.innerHTML = results.map(g => `
        <a href="#/games/${g.slug}" class="modal-result-item flex items-center justify-between p-3.5 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group">
          <div class="flex items-center gap-3">
            <span class="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-100">${g.icon}</span>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">${g.title}</h4>
              <span class="text-xs text-slate-400 font-semibold capitalize">${g.category} • Ages ${g.ageRange}</span>
            </div>
          </div>
          <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            Play ▶
          </span>
        </a>
      `).join('');

      // Auto close search modal when a game is chosen
      modalSearchResults.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => closeSearch());
      });
    }
  }

  function updateTopNavStats() {
    if (!window.progressManager) return;
    const stats = window.progressManager.getStats();

    const starsEl = document.getElementById('nav-stars-count');
    const streakEl = document.getElementById('nav-streak-count');

    if (starsEl) starsEl.textContent = stats.totalStars || 0;
    if (streakEl) streakEl.textContent = `${stats.streakDays || 1}d`;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
