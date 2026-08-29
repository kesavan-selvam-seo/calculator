// speed-typing-engine.js - Typing Race & Reflex Reaction Engine

class SpeedTypingEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.wordIndex = 0;
    this.score = 0;
    this.words = [];
    this.startTime = null;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    this.words = rawLevel.words || ['cat', 'dog', 'sun', 'star', 'tree', 'rocket', 'castle'];
    this.wordIndex = 0;
    this.score = 0;
    this.startTime = Date.now();

    this.renderView();
  }

  renderView() {
    if (this.wordIndex >= this.words.length) {
      this.finish();
      return;
    }

    const currentWord = this.words[this.wordIndex].toLowerCase();
    const progressPct = Math.round(((this.wordIndex) / this.words.length) * 100);

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-rose-100 text-rose-800 border border-rose-200">
            Word ${this.wordIndex + 1} of ${this.words.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <!-- Animated Race Track -->
        <div class="relative w-full bg-slate-800 rounded-3xl p-4 mb-6 shadow-xl border-4 border-slate-700 overflow-hidden">
          <div class="flex justify-between items-center text-xs text-slate-400 font-bold mb-1 px-2">
            <span>🏁 START</span>
            <span>🏆 FINISH</span>
          </div>
          <!-- Track Lane -->
          <div class="relative w-full h-14 bg-slate-900/90 rounded-2xl border border-slate-700 flex items-center px-4 overflow-hidden">
            <!-- Road Dashes -->
            <div class="absolute inset-0 flex items-center justify-around opacity-30">
              <span class="w-8 h-1 bg-yellow-400 rounded"></span>
              <span class="w-8 h-1 bg-yellow-400 rounded"></span>
              <span class="w-8 h-1 bg-yellow-400 rounded"></span>
              <span class="w-8 h-1 bg-yellow-400 rounded"></span>
            </div>
            <!-- Racer Sprite -->
            <div id="racer-car" class="absolute transition-all duration-300 text-3xl sm:text-4xl" style="left: ${Math.max(2, Math.min(88, progressPct))}%;">
              🏎️💨
            </div>
          </div>
        </div>

        <!-- Target Word Card -->
        <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center mb-6 animate-pop-in">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Type this word:</span>
          <h2 id="target-word-display" class="text-4xl sm:text-5xl font-black text-indigo-700 tracking-wider font-display mb-6 select-none">
            ${currentWord}
          </h2>

          <input type="text" id="typing-input" autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            class="w-full max-w-md mx-auto text-center font-display text-3xl font-bold py-3 px-6 rounded-2xl border-3 border-indigo-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 outline-none transition-all shadow-inner"
            placeholder="Type here..." />
        </div>

        <p class="text-center text-slate-500 text-sm font-semibold">
          💡 Type fast and press Enter or space to submit each word!
        </p>
      </div>
    `;

    this.bindEvents(currentWord);
  }

  bindEvents(targetWord) {
    const input = this.container.querySelector('#typing-input');
    if (!input) return;

    input.focus();

    input.addEventListener('input', () => {
      const val = input.value.trim().toLowerCase();
      if (val === targetWord) {
        if (window.soundEngine) window.soundEngine.playCorrect();
        this.score += 20;
        if (this.onScoreUpdate) this.onScoreUpdate(this.score);
        this.wordIndex++;
        this.renderView();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const val = input.value.trim().toLowerCase();
        if (val === targetWord) {
          if (window.soundEngine) window.soundEngine.playCorrect();
          this.score += 20;
          if (this.onScoreUpdate) this.onScoreUpdate(this.score);
          this.wordIndex++;
          this.renderView();
        } else {
          if (window.soundEngine) window.soundEngine.playWrong();
          input.classList.add('border-rose-400', 'bg-rose-50');
          setTimeout(() => {
            input.classList.remove('border-rose-400', 'bg-rose-50');
          }, 400);
        }
      }
    });
  }

  finish() {
    const maxScore = this.words.length * 20;
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    const stars = 3;

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars,
        timeSeconds: timeSpent
      });
    }
  }
}

window.SpeedTypingEngine = SpeedTypingEngine;
