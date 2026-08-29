// game-runner.js - Universal Game Runner, Difficulty Selector & Results Screen Controller

class GameRunner {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentGame = null;
    this.currentDifficulty = 'easy';
    this.activeEngine = null;
    this.liveScore = 0;
  }

  loadGame(gameSlug, difficulty = 'easy') {
    const game = window.getGameBySlug(gameSlug);
    if (!game) {
      this.renderNotFound();
      return;
    }

    this.currentGame = game;
    this.currentDifficulty = difficulty;
    this.liveScore = 0;

    // Update document title for SEO
    document.title = `${game.title} — Kids Learning Games`;

    this.renderGameShell();
    this.startEngine();
  }

  renderNotFound() {
    this.container.innerHTML = `
      <div class="max-w-xl mx-auto py-16 px-4 text-center">
        <div class="text-7xl mb-4 animate-bounce-soft">🕵️</div>
        <h1 class="text-3xl font-extrabold text-slate-800 mb-2 font-display">Oops! This game went missing.</h1>
        <p class="text-slate-500 mb-6 font-medium">We couldn't find that game. Let's find another fun game to play!</p>
        <a href="#/games" class="btn-chubby btn-primary px-8 py-3 text-lg inline-block">
          Back to Games Directory 🎮
        </a>
      </div>
    `;
  }

  renderGameShell() {
    const g = this.currentGame;
    const isSoundOn = window.soundEngine ? window.soundEngine.isSoundEnabled() : true;

    this.container.innerHTML = `
      <div class="max-w-4xl mx-auto py-4 px-3 sm:px-6">
        <!-- Breadcrumbs Navigation -->
        <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-indigo-600">Home</a>
          <span>›</span>
          <a href="#/${g.category}-games" class="capitalize hover:text-indigo-600">${g.category} Games</a>
          <span>›</span>
          <span class="text-slate-800">${g.title}</span>
        </nav>

        <!-- Top Game Header Bar -->
        <header class="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3 sm:gap-4">
            <span class="text-4xl sm:text-5xl select-none p-3 rounded-2xl bg-indigo-50 border border-indigo-100">${g.icon}</span>
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h1 class="text-2xl sm:text-3xl font-black text-slate-800 font-display">${g.title}</h1>
                <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-700 uppercase">${g.category}</span>
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Ages ${g.ageRange}</span>
              </div>
              <p class="text-slate-500 text-xs sm:text-sm font-medium line-clamp-1">${g.description}</p>
            </div>
          </div>

          <!-- Controls: Difficulty & Sound & Fullscreen -->
          <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <!-- Difficulty Selector -->
            <div class="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200">
              <button data-diff="easy" class="diff-btn px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${this.currentDifficulty === 'easy' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">Easy</button>
              <button data-diff="medium" class="diff-btn px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${this.currentDifficulty === 'medium' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">Medium</button>
              <button data-diff="hard" class="diff-btn px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${this.currentDifficulty === 'hard' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">Hard</button>
            </div>

            <!-- Sound Toggle Button -->
            <button id="game-sound-toggle" class="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-base shadow-sm transition-all" title="Toggle Sound">
              ${isSoundOn ? '🔊' : '🔇'}
            </button>

            <!-- Fullscreen Button -->
            <button id="game-fullscreen-toggle" class="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-base shadow-sm transition-all" title="Fullscreen">
              ⛶
            </button>
          </div>
        </header>

        <!-- Active Game Play Area Container -->
        <main id="active-game-viewport" class="min-h-[460px]"></main>

        <!-- Educational Insight & Learning Objectives -->
        <footer class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
            <h2 class="text-base font-extrabold text-slate-800 mb-3 flex items-center gap-2">
              <span>🎯</span> Learning Objectives
            </h2>
            <ul class="space-y-2 text-sm text-slate-600">
              ${(g.learningObjectives || ['Critical thinking', 'Fun educational practice']).map(obj => `
                <li class="flex items-center gap-2">
                  <span class="text-emerald-500 font-bold">✓</span> ${obj}
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="bg-indigo-50/60 rounded-3xl p-6 shadow-sm border border-indigo-100">
            <h2 class="text-base font-extrabold text-indigo-950 mb-2 flex items-center gap-2">
              <span>👨‍👩‍👧</span> Parent & Teacher Insight
            </h2>
            <p class="text-xs sm:text-sm text-indigo-900/80 leading-relaxed">
              This activity strengthens mental focus and foundational ${g.category} understanding through interactive visual reinforcement. Suitable for independent or guided play.
            </p>
          </div>
        </footer>
      </div>
    `;

    this.bindHeaderEvents();
  }

  bindHeaderEvents() {
    const diffButtons = this.container.querySelectorAll('.diff-btn');
    diffButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newDiff = btn.getAttribute('data-diff');
        if (newDiff !== this.currentDifficulty) {
          if (window.soundEngine) window.soundEngine.playClick();
          this.currentDifficulty = newDiff;
          this.renderGameShell();
          this.startEngine();
        }
      });
    });

    const soundBtn = this.container.querySelector('#game-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          const enabled = window.soundEngine.toggleSound();
          soundBtn.textContent = enabled ? '🔊' : '🔇';
        }
      });
    }

    const fsBtn = this.container.querySelector('#game-fullscreen-toggle');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          this.container.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  startEngine() {
    const viewport = this.container.querySelector('#active-game-viewport');
    if (!viewport) return;

    const onComplete = (results) => this.handleGameComplete(results);
    const onScoreUpdate = (score) => { this.liveScore = score; };

    const type = this.currentGame.gameType;

    switch (type) {
      case 'arcade-catcher':
        this.activeEngine = new window.ArcadeCatcherEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'drag-drop':
        this.activeEngine = new window.DragDropEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'word-spelling':
        this.activeEngine = new window.WordSpellingEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'memory':
        this.activeEngine = new window.MemoryEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'pattern-sequence':
        this.activeEngine = new window.PatternSequenceEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'speed-typing':
        this.activeEngine = new window.SpeedTypingEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'maze-nav':
        this.activeEngine = new window.MazeNavEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'canvas-art':
        this.activeEngine = new window.CanvasArtEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'tangram-shape':
        this.activeEngine = new window.TangramShapeEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'sudoku-logic':
        this.activeEngine = new window.SudokuLogicEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'map-geography':
        this.activeEngine = new window.MapGeographyEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'quest':
        this.activeEngine = new window.QuestEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
      case 'quiz':
      default:
        this.activeEngine = new window.QuizEngine(viewport, this.currentGame, this.currentDifficulty, onComplete, onScoreUpdate);
        break;
    }
  }

  handleGameComplete(results) {
    const { score, maxScore, stars, timeSeconds = 0 } = results;

    // Record progress in LocalStorage
    let progressResult = { newBadges: [], pointsEarned: 50 };
    if (window.progressManager) {
      progressResult = window.progressManager.recordGameCompletion(this.currentGame, score, maxScore, stars, timeSeconds);
    }

    // Play sounds & burst confetti
    if (window.soundEngine) {
      window.soundEngine.playFanfare();
    }
    if (window.confettiEngine) {
      window.confettiEngine.burst(100);
    }

    this.renderResultScreen(results, progressResult);
  }

  renderResultScreen(results, progressResult) {
    const { score, maxScore, stars } = results;
    const g = this.currentGame;

    // Next game suggestion
    const nextGame = window.GAMES_DATA.find(x => x.category === g.category && x.id !== g.id) || window.GAMES_DATA[0];

    const praises = [
      '🌟 Superstar Learning Champion!',
      '🧠 Incredible Brain Power!',
      '🚀 You are Reaching for the Stars!',
      '🎉 Fantastic Work, Keep Shining!'
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];

    const starsHtml = [1, 2, 3].map(st => {
      const isEarned = st <= stars;
      return `
        <span class="text-5xl sm:text-6xl inline-block transform transition-transform ${isEarned ? `animate-star-${st} text-amber-400 drop-shadow-md` : 'text-slate-300 opacity-40'}">
          ⭐
        </span>
      `;
    }).join(' ');

    const newBadgeHtml = (progressResult.newBadges || []).map(b => `
      <div class="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-amber-900 flex items-center justify-center gap-3 animate-pop-in">
        <span class="text-3xl">${b.icon}</span>
        <div class="text-left">
          <div class="text-xs font-black uppercase text-amber-700">Badge Unlocked!</div>
          <div class="font-bold text-sm sm:text-base">${b.title}</div>
        </div>
      </div>
    `).join('');

    const viewport = this.container.querySelector('#active-game-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="max-w-lg mx-auto py-6 px-4">
        <div class="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-indigo-100 text-center animate-pop-in">
          <!-- Stars Display -->
          <div class="flex items-center justify-center gap-3 mb-4">
            ${starsHtml}
          </div>

          <h2 class="text-2xl sm:text-3xl font-black text-slate-800 mb-2 font-display">
            ${praise}
          </h2>

          <p class="text-slate-500 font-semibold text-sm mb-6">
            You completed <strong>${g.title}</strong> on <span class="capitalize text-indigo-600 font-bold">${this.currentDifficulty}</span> mode!
          </p>

          <!-- Score Card -->
          <div class="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase">Score</span>
              <div class="text-2xl sm:text-3xl font-black text-indigo-600 font-display">${score} / ${maxScore}</div>
            </div>
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase">Points Earned</span>
              <div class="text-2xl sm:text-3xl font-black text-emerald-600 font-display">+${progressResult.pointsEarned || 50}</div>
            </div>
          </div>

          ${newBadgeHtml}

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button id="replay-game-btn" class="w-full sm:w-auto btn-chubby btn-amber px-6 py-3 text-base flex items-center justify-center gap-2">
              <span>↺</span> Play Again
            </button>
            <a href="#/games/${nextGame.slug}" class="w-full sm:w-auto btn-chubby btn-primary px-6 py-3 text-base flex items-center justify-center gap-2">
              Next Game <span>➔</span>
            </a>
          </div>

          <div class="mt-6">
            <a href="#/games" class="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              ← Back to All 100 Games
            </a>
          </div>
        </div>
      </div>
    `;

    const replayBtn = viewport.querySelector('#replay-game-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.renderGameShell();
        this.startEngine();
      });
    }
  }
}

window.GameRunner = GameRunner;
