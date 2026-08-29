// map-geography-engine.js - Interactive Vector Map & Geography Explorer Engine

class MapGeographyEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.roundIndex = 0;
    this.score = 0;
    this.questions = [];

    this.init();
  }

  init() {
    const rawQuestions = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.questions = Array.isArray(rawQuestions) ? [...rawQuestions] : [];
    if (this.questions.length === 0) {
      this.questions = [
        { prompt: 'Where is the Amazon Rainforest? 🌴', options: ['South America', 'Europe', 'Australia'], answer: 'South America' }
      ];
    }
    this.roundIndex = 0;
    this.score = 0;
    this.renderRound();
  }

  renderRound() {
    if (this.roundIndex >= this.questions.length) {
      this.finish();
      return;
    }

    const q = this.questions[this.roundIndex];
    const progressPct = Math.round(((this.roundIndex) / this.questions.length) * 100);

    const optionsHtml = (q.options || []).map((opt, idx) => `
      <button data-option="${opt}" class="map-choice-btn p-4 rounded-2xl bg-white border-3 border-cyan-200 text-cyan-900 font-bold text-lg shadow-md hover:bg-cyan-50 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all text-left flex items-center justify-between">
        <span>${opt}</span>
        <span>📍</span>
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
            Map Mission ${this.roundIndex + 1} of ${this.questions.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-cyan-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <!-- Interactive Vector Map Illustration -->
        <div class="bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl p-6 shadow-xl border-4 border-sky-300 text-white text-center mb-6">
          <div class="text-5xl mb-2 animate-bounce-soft">🌍</div>
          <h3 class="text-2xl sm:text-3xl font-extrabold mb-1 font-display">${q.prompt}</h3>
          <span class="text-xs text-sky-100 font-semibold uppercase tracking-widest">Select Location Below</span>
        </div>

        <!-- Location Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="map-options-container">
          ${optionsHtml}
        </div>

        <div id="map-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents(q);
  }

  bindEvents(q) {
    const btns = this.container.querySelectorAll('.map-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-option');
        const isCorrect = chosen === q.answer;
        const feedbackEl = this.container.querySelector('#map-feedback');

        btns.forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-option') === q.answer) {
            b.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
          }
        });

        if (isCorrect) {
          this.score += 20;
          if (this.onScoreUpdate) this.onScoreUpdate(this.score);
          if (window.soundEngine) window.soundEngine.playCorrect();

          feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
          feedbackEl.innerHTML = `🎉 <strong>Location Identified!</strong> Explorer point +20! ⭐`;
        } else {
          if (window.soundEngine) window.soundEngine.playWrong();
          btn.classList.add('bg-rose-100', 'text-rose-800', 'border-rose-400');

          feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
          feedbackEl.innerHTML = `✨ <strong>Nice try!</strong> The right location was: <u>${q.answer}</u>`;
        }

        setTimeout(() => {
          this.roundIndex++;
          this.renderRound();
        }, 1400);
      });
    });
  }

  finish() {
    const maxScore = this.questions.length * 20;
    const pct = (this.score / maxScore) * 100;
    let stars = 1;
    if (pct >= 80) stars = 3;
    else if (pct >= 50) stars = 2;

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars
      });
    }
  }
}

window.MapGeographyEngine = MapGeographyEngine;
