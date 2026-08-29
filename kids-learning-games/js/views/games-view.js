// games-view.js - All 100 Games Directory with Search, Filtering & Sorting

class GamesView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedAge = 'all';
    this.selectedDiff = 'all';
    this.selectedSort = 'popular';
  }

  render() {
    document.title = 'All 100 Educational Games for Kids — Kids Learning Games';

    this.container.innerHTML = `
      <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-8">
          <span class="px-4 py-1.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-700 uppercase tracking-widest inline-block mb-2">
            100 Playable Games Catalog
          </span>
          <h1 class="text-3xl sm:text-5xl font-black text-slate-900 font-display mb-3">
            Explore All Learning Games
          </h1>
          <p class="text-slate-500 font-medium text-sm sm:text-base">
            Filter by your child's age, favorite subject, or difficulty level to find the perfect game.
          </p>
        </div>

        <!-- Filter & Search Control Panel -->
        <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-8 space-y-5">
          
          <!-- Search Bar -->
          <div class="relative">
            <input type="text" id="games-search-input" value="${this.searchQuery}"
              placeholder="Search by game name, math, spelling, solar system, animals..."
              class="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 font-semibold text-base transition-all shadow-inner" />
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl select-none">🔍</span>
            <button id="clear-search-btn" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold ${this.searchQuery ? '' : 'hidden'}">
              ✕
            </button>
          </div>

          <!-- Category Filter Pills -->
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Filter by Category</div>
            <div class="flex flex-wrap items-center gap-2" id="category-filter-pills">
              <button data-cat="all" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">All Games</button>
              <button data-cat="math" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'math' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">➕ Math</button>
              <button data-cat="english" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'english' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">📚 English & Phonics</button>
              <button data-cat="spelling" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'spelling' ? 'bg-yellow-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🐝 Spelling</button>
              <button data-cat="science" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'science' ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🚀 Science</button>
              <button data-cat="logic" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'logic' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🧩 Logic & Brain</button>
              <button data-cat="geography" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'geography' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🌍 Geography</button>
              <button data-cat="creativity" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'creativity' ? 'bg-pink-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">🎨 Creativity</button>
              <button data-cat="fast" class="cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${this.selectedCategory === 'fast' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">⚡ Fast Skills</button>
            </div>
          </div>

          <!-- Secondary Filters: Age, Difficulty & Sorting -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            <div>
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Age Group</label>
              <select id="age-filter-select" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-700 outline-none focus:border-indigo-500">
                <option value="all" ${this.selectedAge === 'all' ? 'selected' : ''}>All Ages (4–12)</option>
                <option value="4" ${this.selectedAge === '4' ? 'selected' : ''}>Ages 4–5 (Preschool)</option>
                <option value="6" ${this.selectedAge === '6' ? 'selected' : ''}>Ages 6–7 (Early Primary)</option>
                <option value="8" ${this.selectedAge === '8' ? 'selected' : ''}>Ages 8–9 (Middle Primary)</option>
                <option value="10" ${this.selectedAge === '10' ? 'selected' : ''}>Ages 10–12 (Upper Primary)</option>
              </select>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Difficulty</label>
              <select id="diff-filter-select" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-700 outline-none focus:border-indigo-500">
                <option value="all" ${this.selectedDiff === 'all' ? 'selected' : ''}>All Difficulties</option>
                <option value="Easy" ${this.selectedDiff === 'Easy' ? 'selected' : ''}>Easy (Beginner)</option>
                <option value="Medium" ${this.selectedDiff === 'Medium' ? 'selected' : ''}>Medium (Intermediate)</option>
                <option value="Hard" ${this.selectedDiff === 'Hard' ? 'selected' : ''}>Hard (Advanced)</option>
              </select>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Sort By</label>
              <select id="sort-filter-select" class="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-sm text-slate-700 outline-none focus:border-indigo-500">
                <option value="popular" ${this.selectedSort === 'popular' ? 'selected' : ''}>Popular Games</option>
                <option value="title" ${this.selectedSort === 'title' ? 'selected' : ''}>Alphabetical (A–Z)</option>
                <option value="easiest" ${this.selectedSort === 'easiest' ? 'selected' : ''}>Easiest First</option>
                <option value="age" ${this.selectedSort === 'age' ? 'selected' : ''}>Youngest Age First</option>
              </select>
            </div>
          </div>

        </div>

        <!-- Filter Count -->
        <div class="flex items-center justify-between mb-6 px-1">
          <span class="text-sm font-extrabold text-slate-700" id="games-count-display">
            Showing matching games...
          </span>
        </div>

        <!-- Games Grid Mount Point -->
        <div id="games-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>

      </div>
    `;

    this.bindEvents();
    this.updateGrid();
  }

  bindEvents() {
    const searchInput = this.container.querySelector('#games-search-input');
    const clearBtn = this.container.querySelector('#clear-search-btn');

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      if (clearBtn) {
        if (this.searchQuery) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }
      this.updateGrid();
    });

    clearBtn.addEventListener('click', () => {
      this.searchQuery = '';
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      this.updateGrid();
    });

    // Category pills
    const catPills = this.container.querySelectorAll('.cat-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.className = 'cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all');
        pill.className = 'cat-pill px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-indigo-600 text-white shadow-md transition-all';
        this.selectedCategory = pill.getAttribute('data-cat');
        if (window.soundEngine) window.soundEngine.playClick();
        this.updateGrid();
      });
    });

    // Select dropdowns
    this.container.querySelector('#age-filter-select').addEventListener('change', (e) => {
      this.selectedAge = e.target.value;
      this.updateGrid();
    });
    this.container.querySelector('#diff-filter-select').addEventListener('change', (e) => {
      this.selectedDiff = e.target.value;
      this.updateGrid();
    });
    this.container.querySelector('#sort-filter-select').addEventListener('change', (e) => {
      this.selectedSort = e.target.value;
      this.updateGrid();
    });
  }

  updateGrid() {
    const grid = this.container.querySelector('#games-grid-container');
    const countDisplay = this.container.querySelector('#games-count-display');
    if (!grid) return;

    let filtered = window.GAMES_DATA || [];

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(g => {
        return g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.subcategory.toLowerCase().includes(q);
      });
    }

    // Category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(g => {
        if (this.selectedCategory === 'math') return g.category === 'math';
        if (this.selectedCategory === 'english') return g.category === 'english' || g.category === 'spelling';
        if (this.selectedCategory === 'spelling') return g.category === 'spelling';
        if (this.selectedCategory === 'science') return g.category === 'science';
        if (this.selectedCategory === 'logic') return g.category === 'logic' || g.category === 'memory';
        if (this.selectedCategory === 'geography') return g.category === 'geography' || g.category === 'gk';
        if (this.selectedCategory === 'creativity') return g.category === 'creativity';
        if (this.selectedCategory === 'fast') return g.category === 'fast';
        return g.category === this.selectedCategory;
      });
    }

    // Age filter
    if (this.selectedAge !== 'all') {
      const targetAge = parseInt(this.selectedAge, 10);
      filtered = filtered.filter(g => targetAge >= g.minAge && targetAge <= g.maxAge);
    }

    // Difficulty filter
    if (this.selectedDiff !== 'all') {
      filtered = filtered.filter(g => g.difficulty.toLowerCase() === this.selectedDiff.toLowerCase());
    }

    // Sorting
    if (this.selectedSort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSort === 'easiest') {
      const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      filtered.sort((a, b) => (order[a.difficulty] || 2) - (order[b.difficulty] || 2));
    } else if (this.selectedSort === 'age') {
      filtered.sort((a, b) => a.minAge - b.minAge);
    }

    countDisplay.innerHTML = `Showing <strong>${filtered.length}</strong> educational games`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl p-8 border border-slate-200">
          <div class="text-6xl mb-3 animate-bounce-soft">🕵️</div>
          <h3 class="text-2xl font-bold text-slate-800 mb-2 font-display">No matching games found</h3>
          <p class="text-slate-500 text-sm mb-4">Try clearing filters or search for another topic!</p>
          <button id="reset-all-filters-btn" class="btn-chubby btn-primary px-6 py-2 text-sm">
            Reset Filters ↺
          </button>
        </div>
      `;
      const resetBtn = grid.querySelector('#reset-all-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.searchQuery = '';
          this.selectedCategory = 'all';
          this.selectedAge = 'all';
          this.selectedDiff = 'all';
          this.render();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(g => `
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">${g.icon}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase">${g.category}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Ages ${g.ageRange}</span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display leading-snug">${g.title}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">${g.description}</p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400 uppercase">Diff: <strong class="text-slate-700">${g.difficulty}</strong></span>
          <a href="#/games/${g.slug}" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play ▶
          </a>
        </div>
      </div>
    `).join('');
  }
}

window.GamesView = GamesView;
