// word-spelling-engine.js - Letter Tiles, Anagrams & Spelling Bee Engine

class WordSpellingEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.roundIndex = 0;
    this.score = 0;
    this.words = [];
    this.currentTyped = '';

    this.init();
  }

  init() {
    const rawWords = (this.game.levels && this.game.levels[this.difficulty]) || [];
    this.words = Array.isArray(rawWords) ? [...rawWords] : [];
    if (this.words.length === 0) {
      this.words = [
        { word: 'STAR', clue: 'Twinkles in the night sky ⭐' },
        { word: 'SUN', clue: 'Bright star at center of solar system ☀️' }
      ];
    }
    this.roundIndex = 0;
    this.score = 0;
    this.renderRound();
  }

  renderRound() {
    if (this.roundIndex >= this.words.length) {
      this.finish();
      return;
    }

    this.currentTyped = '';
    const current = this.words[this.roundIndex];
    const targetWord = (current.word || '').toUpperCase();
    const progressPct = Math.round(((this.roundIndex) / this.words.length) * 100);

    // Scramble letters or provide letters pool
    let letters = (current.scrambled || targetWord).split('');
    // Shuffle if not already scrambled
    if (!current.scrambled) {
      letters = letters.sort(() => Math.random() - 0.5);
    }

    const tilesHtml = letters.map((ltr, i) => `
      <button data-letter="${ltr}" class="letter-tile w-12 h-14 sm:w-16 sm:h-18 rounded-2xl bg-white border-3 border-amber-300 shadow-md font-display font-extrabold text-2xl sm:text-3xl text-amber-900 hover:bg-amber-100 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
        ${ltr}
      </button>
    `).join('');

    const targetSlotsHtml = targetWord.split('').map((_, i) => `
      <div id="slot-${i}" class="word-slot w-12 h-14 sm:w-16 sm:h-18 rounded-2xl border-3 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl text-indigo-700 shadow-inner">
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Word ${this.roundIndex + 1} of ${this.words.length}
          </span>
          <span class="text-sm font-bold text-slate-500">
            Score: <strong class="text-indigo-600 text-base">${this.score}</strong>
          </span>
        </div>

        <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-400 to-rose-400 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <!-- Clue Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center mb-6 animate-pop-in">
          <div class="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-3">
            <span>💡 Clue</span>
            <button id="speak-clue-btn" class="hover:scale-110 transition-transform text-base" title="Hear clue">🔊</button>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 font-display">
            ${current.clue || 'Spell the word!'}
          </h3>
        </div>

        <!-- Target Word Slots -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-8">
          ${targetSlotsHtml}
        </div>

        <!-- Available Letter Tiles -->
        <div class="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 shadow-inner text-center">
          <div class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">Tap Letters in Order</div>
          <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6" id="letter-tiles-pool">
            ${tilesHtml}
          </div>

          <div class="flex items-center justify-center gap-3">
            <button id="clear-word-btn" class="px-6 py-2.5 rounded-full font-bold text-sm bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm transition-all">
              ⌫ Clear / Undo
            </button>
            <button id="submit-word-btn" class="btn-chubby btn-emerald px-8 py-2.5 text-base">
              Check Word ✓
            </button>
          </div>
        </div>

        <div id="spelling-feedback" class="mt-6 hidden p-4 rounded-2xl text-center font-bold text-lg animate-pop-in"></div>
      </div>
    `;

    this.bindEvents(targetWord);
  }

  bindEvents(targetWord) {
    const tiles = this.container.querySelectorAll('.letter-tile');
    const speakBtn = this.container.querySelector('#speak-clue-btn');
    const clearBtn = this.container.querySelector('#clear-word-btn');
    const submitBtn = this.container.querySelector('#submit-word-btn');

    if (speakBtn && 'speechSynthesis' in window) {
      speakBtn.addEventListener('click', () => {
        const clue = this.words[this.roundIndex].clue || targetWord;
        const utterance = new SpeechSynthesisUtterance(clue);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      });
    }

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        if (this.currentTyped.length < targetWord.length) {
          const letter = tile.getAttribute('data-letter');
          this.currentTyped += letter;
          tile.disabled = true;
          tile.classList.add('opacity-40', 'cursor-not-allowed');
          this.updateSlots(targetWord);
          if (window.soundEngine) window.soundEngine.playPop();

          if (this.currentTyped.length === targetWord.length) {
            this.checkWord(targetWord);
          }
        }
      });
    });

    clearBtn.addEventListener('click', () => {
      this.currentTyped = '';
      tiles.forEach(t => {
        t.disabled = false;
        t.classList.remove('opacity-40', 'cursor-not-allowed');
      });
      this.updateSlots(targetWord);
      if (window.soundEngine) window.soundEngine.playClick();
    });

    submitBtn.addEventListener('click', () => {
      this.checkWord(targetWord);
    });
  }

  updateSlots(targetWord) {
    for (let i = 0; i < targetWord.length; i++) {
      const slot = this.container.querySelector(`#slot-${i}`);
      if (slot) {
        slot.textContent = this.currentTyped[i] || '';
        if (this.currentTyped[i]) {
          slot.classList.add('border-indigo-500', 'bg-indigo-50');
        } else {
          slot.classList.remove('border-indigo-500', 'bg-indigo-50');
        }
      }
    }
  }

  checkWord(targetWord) {
    const isCorrect = this.currentTyped.trim().toUpperCase() === targetWord.trim().toUpperCase();
    const feedbackEl = this.container.querySelector('#spelling-feedback');

    if (isCorrect) {
      this.score += 15;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
      feedbackEl.innerHTML = `🎉 <strong>Spelled Correctly!</strong> Super job! ⭐`;
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      feedbackEl.className = 'mt-6 p-4 rounded-2xl text-center font-bold text-xl bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
      feedbackEl.innerHTML = `✨ <strong>Nice try!</strong> The word was: <u>${targetWord}</u>`;
    }

    setTimeout(() => {
      this.roundIndex++;
      this.renderRound();
    }, 1400);
  }

  finish() {
    const maxScore = this.words.length * 15;
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

window.WordSpellingEngine = WordSpellingEngine;
