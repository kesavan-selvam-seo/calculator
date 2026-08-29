// memory-engine.js - 3D Card Flipping Concentration Memory Engine

class MemoryEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 4;
    this.turns = 0;
    this.score = 0;
    this.isLocked = false;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    const pairs = rawLevel.pairs || [
      ['🦁 Lion', '🦁 Lion'],
      ['🐼 Panda', '🐼 Panda'],
      ['🦊 Fox', '🦊 Fox'],
      ['🐸 Frog', '🐸 Frog']
    ];

    this.totalPairs = pairs.length;
    this.matchedPairs = 0;
    this.turns = 0;
    this.score = 0;
    this.flippedCards = [];
    this.isLocked = false;

    // Create flat list of cards with unique instance IDs and pair matching keys
    let cardList = [];
    pairs.forEach((pair, pairIdx) => {
      cardList.push({ id: `c_${pairIdx}_a`, pairKey: pairIdx, content: pair[0] });
      cardList.push({ id: `c_${pairIdx}_b`, pairKey: pairIdx, content: pair[1] });
    });

    // Shuffle cards
    this.cards = cardList.sort(() => Math.random() - 0.5);

    this.renderBoard();
  }

  renderBoard() {
    const gridCols = this.totalPairs <= 4 ? 'grid-cols-2 sm:grid-cols-4' : (this.totalPairs <= 6 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4');

    const cardsHtml = this.cards.map((c, idx) => `
      <div data-card-id="${c.id}" data-pair-key="${c.pairKey}" class="memory-card-wrapper perspective-1000 h-28 sm:h-36 cursor-pointer select-none">
        <div class="memory-card relative w-full h-full rounded-3xl transform-style-preserve-3d shadow-md transition-all">
          <!-- Card Front (Hidden when face down) -->
          <div class="card-face card-back absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 border-3 border-white shadow-md flex items-center justify-center text-3xl sm:text-4xl text-white backface-hidden">
            <span>✨</span>
          </div>
          <!-- Card Face (Revealed on flip) -->
          <div class="card-face card-front absolute inset-0 rounded-3xl bg-white border-3 border-indigo-200 shadow-md flex flex-col items-center justify-center p-2 text-center rotate-y-180 backface-hidden">
            <span class="text-xl sm:text-2xl font-bold text-slate-800">${c.content}</span>
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-3xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-purple-100 text-purple-800 border border-purple-200">
            Pairs: <strong id="matched-pairs-count">${this.matchedPairs}</strong> / ${this.totalPairs}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Turns: <strong id="turns-count" class="text-indigo-600 text-base">${this.turns}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div id="memory-progress-bar" class="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300" style="width: 0%"></div>
        </div>

        <!-- Cards Grid -->
        <div class="grid ${gridCols} gap-3 sm:gap-4 mb-6" id="memory-grid">
          ${cardsHtml}
        </div>

        <div id="memory-feedback" class="mt-4 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const cardWrappers = this.container.querySelectorAll('.memory-card-wrapper');

    cardWrappers.forEach(wrap => {
      wrap.addEventListener('click', () => {
        if (this.isLocked) return;
        const innerCard = wrap.querySelector('.memory-card');
        if (innerCard.classList.contains('flipped') || innerCard.classList.contains('matched')) return;

        // Flip card
        innerCard.classList.add('flipped');
        if (window.soundEngine) window.soundEngine.playPop();

        this.flippedCards.push({
          element: wrap,
          inner: innerCard,
          pairKey: wrap.getAttribute('data-pair-key'),
          cardId: wrap.getAttribute('data-card-id')
        });

        if (this.flippedCards.length === 2) {
          this.checkMatch();
        }
      });
    });
  }

  checkMatch() {
    this.isLocked = true;
    this.turns++;
    const turnsEl = this.container.querySelector('#turns-count');
    if (turnsEl) turnsEl.textContent = this.turns;

    const [first, second] = this.flippedCards;
    const isMatch = first.pairKey === second.pairKey;

    if (isMatch) {
      this.matchedPairs++;
      this.score += 20;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      first.inner.classList.add('matched');
      second.inner.classList.add('matched');

      first.element.classList.add('scale-105', 'opacity-90');
      second.element.classList.add('scale-105', 'opacity-90');

      const matchedCountEl = this.container.querySelector('#matched-pairs-count');
      if (matchedCountEl) matchedCountEl.textContent = this.matchedPairs;

      const progressPct = Math.round((this.matchedPairs / this.totalPairs) * 100);
      const progressBar = this.container.querySelector('#memory-progress-bar');
      if (progressBar) progressBar.style.width = `${progressPct}%`;

      this.flippedCards = [];
      this.isLocked = false;

      if (this.matchedPairs >= this.totalPairs) {
        setTimeout(() => this.finish(), 600);
      }
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      setTimeout(() => {
        first.inner.classList.remove('flipped');
        second.inner.classList.remove('flipped');
        this.flippedCards = [];
        this.isLocked = false;
      }, 900);
    }
  }

  finish() {
    const perfectTurns = this.totalPairs + 2;
    let stars = 3;
    if (this.turns > perfectTurns + 6) stars = 1;
    else if (this.turns > perfectTurns + 2) stars = 2;

    const maxScore = this.totalPairs * 20;

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars,
        turns: this.turns
      });
    }
  }
}

window.MemoryEngine = MemoryEngine;
