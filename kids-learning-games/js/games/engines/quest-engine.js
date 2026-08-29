// quest-engine.js - Multi-Round Learning Quest & Championship Challenge Engine

class QuestEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.roundIndex = 0;
    this.score = 0;
    this.rounds = [];

    this.init();
  }

  init() {
    const rawRounds = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.rounds = Array.isArray(rawRounds) ? [...rawRounds] : [];
    if (this.rounds.length === 0) {
      this.rounds = [
        { subject: 'Math', prompt: 'Solve: 5 + 5 = ?', options: [9, 10, 11, 12], answer: 10 },
        { subject: 'Science', prompt: 'Which planet is closest to the Sun?', options: ['Mercury', 'Earth', 'Mars'], answer: 'Mercury' }
      ];
    }
    this.roundIndex = 0;
    this.score = 0;
    this.renderRound();
  }

  renderRound() {
    if (this.roundIndex >= this.rounds.length) {
      this.finish();
      return;
    }

    const q = this.rounds[this.roundIndex];
    const progressPct = Math.round(((this.roundIndex) / this.rounds.length) * 100);

    const optionsHtml = (q.options || []).map(opt => `
      <button data-option="${opt}" class="quest-choice-btn w-full p-4 sm:p-5 rounded-2xl bg-white border-3 border-indigo-200 font-bold text-lg text-slate-800 shadow-md hover:bg-indigo-50 hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all text-left flex items-center justify-between">
        <span>${opt}</span>
        <span class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold text-sm">▶</span>
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800 border border-amber-200">
            👑 Stage ${this.roundIndex + 1} of ${this.rounds.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Points: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-400 to-indigo-500 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <!-- Quest Card -->
        <div class="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-indigo-700 text-center mb-6 animate-pop-in">
          <span class="inline-block px-4 py-1 rounded-full bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest mb-3">
            Domain: ${q.subject || 'Knowledge'}
          </span>
          <h3 class="text-2xl sm:text-3xl font-extrabold mb-4 font-display">
            ${q.prompt}
          </h3>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="quest-options-container">
          ${optionsHtml}
        </div>

        <div id="quest-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents(q);
  }

  bindEvents(q) {
    const btns = this.container.querySelectorAll('.quest-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-option');
        const isCorrect = String(chosen).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
        const feedbackEl = this.container.querySelector('#quest-feedback');

        btns.forEach(b => {
          b.disabled = true;
          if (String(b.getAttribute('data-option')).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
            b.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
          }
        });

        if (isCorrect) {
          this.score += 25;
          if (this.onScoreUpdate) this.onScoreUpdate(this.score);
          if (window.soundEngine) window.soundEngine.playCorrect();

          feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
          feedbackEl.innerHTML = `🌟 <strong>Stage Conquered!</strong> Quest point +25!`;
        } else {
          if (window.soundEngine) window.soundEngine.playWrong();
          btn.classList.add('bg-rose-100', 'text-rose-800', 'border-rose-400');

          feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
          feedbackEl.innerHTML = `✨ <strong>Nice attempt!</strong> Answer was: <u>${q.answer}</u>`;
        }

        setTimeout(() => {
          this.roundIndex++;
          this.renderRound();
        }, 1400);
      });
    });
  }

  finish() {
    const maxScore = this.rounds.length * 25;
    const pct = (this.score / maxScore) * 100;
    let stars = 1;
    if (pct >= 80) stars = 3;
    else if (pct >= 50) stars = 2;

    // Check if this was the Daily Quest
    if (this.game.slug === 'daily-learning-quest' && window.progressManager) {
      window.progressManager.completeDailyQuest();
    }

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars
      });
    }
  }
}

window.QuestEngine = QuestEngine;
