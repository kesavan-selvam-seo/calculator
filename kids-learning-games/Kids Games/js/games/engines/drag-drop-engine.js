// drag-drop-engine.js - Touch & Drag Slot Placement Game Engine

class DragDropEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.roundIndex = 0;
    this.score = 0;
    this.rounds = [];
    this.selectedOption = null;

    this.init();
  }

  init() {
    const rawRounds = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.rounds = Array.isArray(rawRounds) ? [...rawRounds] : [];
    if (this.rounds.length === 0) {
      this.rounds = [
        { prompt: 'Match the target item:', slots: ['Slot 1', 'Slot 2'], correct: 'Slot 1', options: ['Slot 1', 'Slot 2'] }
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

    const current = this.rounds[this.roundIndex];
    const progressPct = Math.round(((this.roundIndex) / this.rounds.length) * 100);

    const optionsHtml = (current.options || []).map(opt => `
      <div data-val="${opt}" class="drag-item cursor-grab active:cursor-grabbing px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all text-center select-none border-2 border-indigo-400">
        ${opt}
      </div>
    `).join('');

    const slotsHtml = (current.slots || []).map(slot => `
      <div data-slot="${slot}" class="drop-target p-6 rounded-3xl border-3 border-dashed border-slate-300 bg-white/70 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] shadow-sm">
        <span class="text-slate-400 text-sm font-semibold mb-2">Target Zone</span>
        <span class="text-xl font-bold text-slate-700">${slot}</span>
        <div class="placed-slot-content mt-2 hidden text-indigo-700 font-extrabold text-lg bg-indigo-100 px-4 py-1.5 rounded-full"></div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Round ${this.roundIndex + 1} of ${this.rounds.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-teal-400 to-indigo-500 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center mb-8 animate-pop-in">
          <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 font-display">
            ${current.prompt}
          </h3>
          <p class="text-slate-500 font-medium text-sm sm:text-base">
            👉 Tap an option below, then tap the matching box to place it!
          </p>
        </div>

        <!-- Target Placement Slots -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" id="drop-slots-grid">
          ${slotsHtml}
        </div>

        <!-- Available Choice Items -->
        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-inner">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3">Available Choices</div>
          <div class="flex flex-wrap items-center justify-center gap-4" id="drag-items-container">
            ${optionsHtml}
          </div>
        </div>

        <!-- Feedback Alert -->
        <div id="drag-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const items = this.container.querySelectorAll('.drag-item');
    const slots = this.container.querySelectorAll('.drop-target');

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('ring-4', 'ring-amber-400', 'scale-105'));
        item.classList.add('ring-4', 'ring-amber-400', 'scale-105');
        this.selectedOption = item.getAttribute('data-val');
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        if (!this.selectedOption) {
          alert('Please tap an option first!');
          return;
        }
        const targetSlot = slot.getAttribute('data-slot');
        this.checkMatch(this.selectedOption, targetSlot, slot);
      });
    });
  }

  checkMatch(chosen, targetSlot, slotElement) {
    const current = this.rounds[this.roundIndex];
    const isCorrect = (chosen === current.correct) || (targetSlot === current.correct);
    const feedbackEl = this.container.querySelector('#drag-feedback');

    if (isCorrect) {
      this.score += 15;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      slotElement.classList.add('border-emerald-500', 'bg-emerald-50');
      const placed = slotElement.querySelector('.placed-slot-content');
      placed.textContent = `✓ ${chosen}`;
      placed.classList.remove('hidden');

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
      feedbackEl.innerHTML = `🌟 <strong>Perfect Match!</strong> Great job!`;
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      slotElement.classList.add('border-amber-400', 'bg-amber-50');

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
      feedbackEl.innerHTML = `✨ <strong>Nice try!</strong> The matching box was: <u>${current.correct}</u>`;
    }

    setTimeout(() => {
      this.selectedOption = null;
      this.roundIndex++;
      this.renderRound();
    }, 1400);
  }

  finish() {
    const maxScore = this.rounds.length * 15;
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

window.DragDropEngine = DragDropEngine;
