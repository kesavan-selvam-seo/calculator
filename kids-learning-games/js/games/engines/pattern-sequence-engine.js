// pattern-sequence-engine.js - Sequencing, Ordering & Simon Memory Engine

class PatternSequenceEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.roundIndex = 0;
    this.score = 0;
    this.rounds = [];
    this.currentOrder = [];

    this.init();
  }

  init() {
    const rawRounds = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.rounds = Array.isArray(rawRounds) ? [...rawRounds] : [];
    if (this.rounds.length === 0) {
      this.rounds = [
        { prompt: 'Order from first to last:', items: ['Step 1', 'Step 2', 'Step 3'], correctOrder: ['Step 1', 'Step 2', 'Step 3'] }
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

    this.currentOrder = [];
    const current = this.rounds[this.roundIndex];
    const progressPct = Math.round(((this.roundIndex) / this.rounds.length) * 100);

    // Shuffle items for the pool
    const itemsPool = [...(current.items || [])].sort(() => Math.random() - 0.5);

    const poolHtml = itemsPool.map((it, idx) => `
      <button data-item="${it}" class="seq-item-btn px-5 py-3.5 rounded-2xl bg-white border-3 border-indigo-300 text-slate-800 font-bold text-base sm:text-lg shadow-md hover:bg-indigo-50 hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all text-center">
        ${it}
      </button>
    `).join('');

    const targetSlotsHtml = (current.correctOrder || []).map((_, idx) => `
      <div id="seq-slot-${idx}" class="seq-slot p-4 rounded-2xl border-3 border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-slate-700 font-bold text-base sm:text-lg shadow-inner min-h-[60px]">
        <span class="text-xs text-slate-400 font-semibold uppercase">Step ${idx + 1}</span>
        <span class="slot-text text-indigo-700 font-extrabold"></span>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-violet-100 text-violet-800 border border-violet-200">
            Puzzle ${this.roundIndex + 1} of ${this.rounds.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <!-- Prompt Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center mb-6 animate-pop-in">
          <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 font-display">
            ${current.prompt}
          </h3>
          <p class="text-slate-500 text-sm">
            Tap items below in the correct order (1st, 2nd, 3rd...)
          </p>
        </div>

        <!-- Target Sequence Slots -->
        <div class="grid grid-cols-1 gap-3 mb-6" id="seq-slots-list">
          ${targetSlotsHtml}
        </div>

        <!-- Available Items Pool -->
        <div class="bg-violet-50/80 border border-violet-200 rounded-3xl p-6 shadow-inner text-center">
          <div class="text-xs font-bold text-violet-600 uppercase tracking-wider mb-4">Tap to Place</div>
          <div class="flex flex-wrap items-center justify-center gap-3 mb-6" id="seq-pool-container">
            ${poolHtml}
          </div>

          <div class="flex items-center justify-center gap-4">
            <button id="reset-seq-btn" class="px-6 py-2.5 rounded-full font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm transition-all">
              ↺ Reset Steps
            </button>
            <button id="check-seq-btn" class="btn-chubby btn-emerald px-8 py-2.5 text-base">
              Check Order ✓
            </button>
          </div>
        </div>

        <div id="seq-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents(current);
  }

  bindEvents(current) {
    const itemBtns = this.container.querySelectorAll('.seq-item-btn');
    const resetBtn = this.container.querySelector('#reset-seq-btn');
    const checkBtn = this.container.querySelector('#check-seq-btn');

    itemBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.currentOrder.length < current.correctOrder.length) {
          const val = btn.getAttribute('data-item');
          this.currentOrder.push(val);
          btn.disabled = true;
          btn.classList.add('opacity-30', 'cursor-not-allowed');
          this.updateSlots();
          if (window.soundEngine) window.soundEngine.playPop();

          if (this.currentOrder.length === current.correctOrder.length) {
            this.checkOrder(current);
          }
        }
      });
    });

    resetBtn.addEventListener('click', () => {
      this.currentOrder = [];
      itemBtns.forEach(b => {
        b.disabled = false;
        b.classList.remove('opacity-30', 'cursor-not-allowed');
      });
      this.updateSlots();
      if (window.soundEngine) window.soundEngine.playClick();
    });

    checkBtn.addEventListener('click', () => {
      this.checkOrder(current);
    });
  }

  updateSlots() {
    const slots = this.container.querySelectorAll('.seq-slot');
    slots.forEach((slot, idx) => {
      const textSpan = slot.querySelector('.slot-text');
      if (this.currentOrder[idx]) {
        textSpan.textContent = this.currentOrder[idx];
        slot.classList.add('border-indigo-400', 'bg-indigo-50/60');
      } else {
        textSpan.textContent = '';
        slot.classList.remove('border-indigo-400', 'bg-indigo-50/60');
      }
    });
  }

  checkOrder(current) {
    let isMatch = true;
    for (let i = 0; i < current.correctOrder.length; i++) {
      if (String(this.currentOrder[i]).trim() !== String(current.correctOrder[i]).trim()) {
        isMatch = false;
        break;
      }
    }

    const feedbackEl = this.container.querySelector('#seq-feedback');

    if (isMatch) {
      this.score += 20;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
      feedbackEl.innerHTML = `🎉 <strong>Perfect Sequence!</strong> Awesome order! ⭐`;
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
      feedbackEl.innerHTML = `✨ <strong>Nice try!</strong> The right order was: <u>${current.correctOrder.join(' ➔ ')}</u>`;
    }

    setTimeout(() => {
      this.roundIndex++;
      this.renderRound();
    }, 1600);
  }

  finish() {
    const maxScore = this.rounds.length * 20;
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

window.PatternSequenceEngine = PatternSequenceEngine;
