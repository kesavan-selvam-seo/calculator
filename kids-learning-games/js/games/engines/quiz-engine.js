// quiz-engine.js - Interactive Quiz, Multiple Choice & Flashcard Game Engine

class QuizEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.currentIndex = 0;
    this.score = 0;
    this.totalQuestions = 5;
    this.questions = [];
    this.isAnswering = false;

    this.init();
  }

  init() {
    const rawQuestions = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.questions = Array.isArray(rawQuestions) ? [...rawQuestions] : (rawQuestions.questions || []);
    if (this.questions.length === 0) {
      // Fallback simple questions if empty
      this.questions = [
        { prompt: `${this.game.title} - Question 1`, options: ['A', 'B', 'C', 'D'], answer: 'A' },
        { prompt: `${this.game.title} - Question 2`, options: ['True', 'False'], answer: 'True' }
      ];
    }
    this.totalQuestions = this.questions.length;
    this.currentIndex = 0;
    this.score = 0;
    this.renderQuestion();
  }

  renderQuestion() {
    if (this.currentIndex >= this.totalQuestions) {
      this.finish();
      return;
    }

    this.isAnswering = false;
    const q = this.questions[this.currentIndex];
    const progressPct = Math.round(((this.currentIndex) / this.totalQuestions) * 100);

    let visualSection = '';
    if (q.visualCount && q.item) {
      const items = Array(q.visualCount).fill(q.item).map((it, i) => `
        <span class="inline-block transform hover:scale-125 transition-transform duration-200 cursor-pointer animate-bounce-soft" style="animation-delay: ${i * 0.1}s;">${it}</span>
      `).join(' ');
      visualSection = `
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-inner border border-indigo-100 flex flex-wrap items-center justify-center gap-3 text-4xl sm:text-5xl">
          ${items}
        </div>
      `;
    }

    const optionsHtml = (q.options || []).map((opt, idx) => {
      const colors = [
        'border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100 hover:border-blue-400 hover:shadow-blue-200',
        'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-emerald-200',
        'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-400 hover:shadow-amber-200',
        'border-purple-300 bg-purple-50 text-purple-900 hover:bg-purple-100 hover:border-purple-400 hover:shadow-purple-200'
      ];
      const colorClass = colors[idx % colors.length];

      return `
        <button data-option="${String(opt).replace(/"/g, '&quot;')}" class="quiz-option-btn w-full p-4 sm:p-5 rounded-2xl border-3 ${colorClass} font-bold text-lg sm:text-xl shadow-md transition-all transform active:scale-95 text-left flex items-center justify-between group">
          <span>${opt}</span>
          <span class="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">👉</span>
        </button>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <!-- Question Badge & Progress Bar -->
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Question ${this.currentIndex + 1} of ${this.totalQuestions}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <!-- Question Prompt Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center mb-6 animate-pop-in">
          <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4 leading-relaxed font-display">
            ${q.prompt}
          </h3>
          ${visualSection}
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="quiz-options-container">
          ${optionsHtml}
        </div>

        <!-- Feedback Banner (Hidden initially) -->
        <div id="quiz-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    // Bind event listeners
    const buttons = this.container.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chosen = btn.getAttribute('data-option');
        this.handleChoice(chosen, btn);
      });
    });
  }

  handleChoice(chosen, buttonElement) {
    if (this.isAnswering) return;
    this.isAnswering = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = String(chosen).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
    const feedbackEl = this.container.querySelector('#quiz-feedback');
    const allBtns = this.container.querySelectorAll('.quiz-option-btn');

    allBtns.forEach(btn => {
      btn.disabled = true;
      const optVal = btn.getAttribute('data-option');
      if (String(optVal).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
        btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600', 'scale-105');
      }
    });

    if (isCorrect) {
      this.score += 10;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
      feedbackEl.innerHTML = `🎉 <strong>Awesome!</strong> That's completely correct! ⭐`;
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      buttonElement.classList.add('bg-rose-100', 'text-rose-800', 'border-rose-400');

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
      feedbackEl.innerHTML = `✨ <strong>Nice try!</strong> The right answer was: <u>${q.answer}</u>`;
    }

    setTimeout(() => {
      this.currentIndex++;
      this.renderQuestion();
    }, 1400);
  }

  finish() {
    const maxScore = this.totalQuestions * 10;
    const pct = (this.score / maxScore) * 100;
    let stars = 1;
    if (pct >= 80) stars = 3;
    else if (pct >= 50) stars = 2;

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars,
        totalQuestions: this.totalQuestions
      });
    }
  }
}

window.QuizEngine = QuizEngine;
