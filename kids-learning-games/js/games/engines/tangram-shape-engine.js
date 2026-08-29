// tangram-shape-engine.js - Geometric Tangrams, Block Puzzles & Shape Assembly

class TangramShapeEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.placedCount = 0;
    this.requiredCount = 4;
    this.score = 0;
    this.selectedPiece = null;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    this.targetShape = rawLevel.targetShape || 'Silhouette Target';
    this.requiredCount = 4;
    this.placedCount = 0;
    this.score = 0;

    this.renderStudio();
  }

  renderStudio() {
    const pieces = [
      { id: 'p1', name: 'Large Triangle 🔺', color: 'bg-indigo-500', shape: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
      { id: 'p2', name: 'Medium Triangle 🔺', color: 'bg-rose-500', shape: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
      { id: 'p3', name: 'Square 🟩', color: 'bg-amber-500', shape: 'none' },
      { id: 'p4', name: 'Parallelogram ▰', color: 'bg-emerald-500', shape: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }
    ];

    const piecesHtml = pieces.map(p => `
      <button data-piece-id="${p.id}" class="tangram-piece p-4 rounded-2xl ${p.color} text-white font-extrabold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all text-center select-none">
        ${p.name}
      </button>
    `).join('');

    const targetSlotsHtml = [1, 2, 3, 4].map(idx => `
      <div data-slot-id="s${idx}" class="tangram-slot aspect-square rounded-2xl border-3 border-dashed border-indigo-300 bg-white/70 flex flex-col items-center justify-center text-slate-400 font-bold text-sm cursor-pointer hover:bg-indigo-50/50 transition-colors shadow-inner">
        <span>Slot #${idx}</span>
        <div class="slot-placed-badge mt-2 hidden text-xs bg-indigo-100 text-indigo-700 font-extrabold px-3 py-1 rounded-full"></div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-purple-100 text-purple-800 border border-purple-200">
            Target: <strong>${this.targetShape}</strong>
          </span>
          <span class="text-sm font-bold text-slate-500">
            Placed: <strong id="tangram-placed-counter" class="text-indigo-600">0 / ${this.requiredCount}</strong>
          </span>
        </div>

        <!-- Target Silhouette Board -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-slate-700 text-center mb-6">
          <div class="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Silhouette Assembly Area</div>
          <div class="grid grid-cols-2 gap-4 max-w-xs mx-auto" id="tangram-slots-grid">
            ${targetSlotsHtml}
          </div>
        </div>

        <!-- Available Geometric Pieces -->
        <div class="bg-purple-50/80 border border-purple-200 rounded-3xl p-5 shadow-inner text-center">
          <div class="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">Tap Piece then Tap Target Slot</div>
          <div class="flex flex-wrap items-center justify-center gap-3" id="tangram-pieces-pool">
            ${piecesHtml}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const pieces = this.container.querySelectorAll('.tangram-piece');
    const slots = this.container.querySelectorAll('.tangram-slot');

    pieces.forEach(p => {
      p.addEventListener('click', () => {
        pieces.forEach(pc => pc.classList.remove('ring-4', 'ring-amber-400', 'scale-110'));
        p.classList.add('ring-4', 'ring-amber-400', 'scale-110');
        this.selectedPiece = { id: p.getAttribute('data-piece-id'), text: p.textContent.trim(), elem: p };
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    slots.forEach(s => {
      s.addEventListener('click', () => {
        if (!this.selectedPiece) {
          alert('Tap a piece below first!');
          return;
        }
        if (s.classList.contains('filled')) return;

        s.classList.add('filled', 'border-solid', 'border-emerald-400', 'bg-emerald-50');
        const badge = s.querySelector('.slot-placed-badge');
        badge.textContent = `✓ ${this.selectedPiece.text}`;
        badge.classList.remove('hidden');

        this.selectedPiece.elem.disabled = true;
        this.selectedPiece.elem.classList.add('opacity-30', 'cursor-not-allowed');

        this.placedCount++;
        this.score += 25;
        if (this.onScoreUpdate) this.onScoreUpdate(this.score);
        if (window.soundEngine) window.soundEngine.playCorrect();

        const countEl = this.container.querySelector('#tangram-placed-counter');
        if (countEl) countEl.textContent = `${this.placedCount} / ${this.requiredCount}`;

        this.selectedPiece = null;

        if (this.placedCount >= this.requiredCount) {
          setTimeout(() => this.finish(), 800);
        }
      });
    });
  }

  finish() {
    if (this.onComplete) {
      this.onComplete({
        score: 100,
        maxScore: 100,
        stars: 3
      });
    }
  }
}

window.TangramShapeEngine = TangramShapeEngine;
