// sudoku-logic-engine.js - 4x4 Mini Sudoku Logic Engine for Kids

class SudokuLogicEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.selectedNum = 1;
    this.board = [];
    this.solution = [];
    this.prefilled = [];
    this.score = 0;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    this.prefilled = rawLevel.prefilled || [
      [1, 2, 0, 4],
      [0, 4, 1, 2],
      [2, 1, 4, 0],
      [4, 0, 2, 1]
    ];
    this.solution = rawLevel.solution || [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1]
    ];

    // Clone prefilled
    this.board = this.prefilled.map(row => [...row]);
    this.selectedNum = 1;
    this.score = 0;

    this.renderBoard();
  }

  renderBoard() {
    let gridHtml = '';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = this.board[r][c];
        const isPrefilled = this.prefilled[r][c] !== 0;

        // Border accents for 2x2 boxes
        const borderRight = (c === 1) ? 'border-r-4 border-r-indigo-400' : 'border-r border-slate-200';
        const borderBottom = (r === 1) ? 'border-b-4 border-b-indigo-400' : 'border-b border-slate-200';

        const cellBg = isPrefilled ? 'bg-slate-100 font-black text-slate-800 cursor-not-allowed' : (val !== 0 ? 'bg-indigo-50 font-bold text-indigo-700 cursor-pointer' : 'bg-white cursor-pointer hover:bg-slate-50');

        gridHtml += `
          <div data-r="${r}" data-c="${c}" class="sudoku-cell aspect-square flex items-center justify-center text-2xl sm:text-3xl font-display select-none transition-all ${borderRight} ${borderBottom} ${cellBg}">
            ${val !== 0 ? val : ''}
          </div>
        `;
      }
    }

    const numPickerHtml = [1, 2, 3, 4].map(n => `
      <button data-num="${n}" class="sudoku-num-btn w-14 h-14 rounded-2xl bg-white border-3 border-indigo-200 font-display font-extrabold text-2xl text-indigo-700 shadow-md hover:scale-105 active:scale-95 transition-all ${n === this.selectedNum ? 'ring-4 ring-indigo-500 bg-indigo-50 border-indigo-400' : ''}">
        ${n}
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-md mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            4x4 Mini Sudoku
          </span>
          <button id="check-sudoku-btn" class="btn-chubby btn-emerald px-5 py-1.5 text-sm">
            Check Solution ✓
          </button>
        </div>

        <div class="bg-white p-4 rounded-3xl shadow-xl border-4 border-indigo-100 mb-6">
          <div class="grid grid-cols-4 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-inner" id="sudoku-grid">
            ${gridHtml}
          </div>
        </div>

        <!-- Number Selector -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Selected Number to Place</div>
          <div class="flex items-center justify-center gap-3">
            ${numPickerHtml}
          </div>
        </div>

        <div id="sudoku-feedback" class="mt-4 hidden p-4 rounded-2xl text-center font-bold text-base animate-pop-in"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const numBtns = this.container.querySelectorAll('.sudoku-num-btn');
    numBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        numBtns.forEach(b => b.classList.remove('ring-4', 'ring-indigo-500', 'bg-indigo-50', 'border-indigo-400'));
        btn.classList.add('ring-4', 'ring-indigo-500', 'bg-indigo-50', 'border-indigo-400');
        this.selectedNum = parseInt(btn.getAttribute('data-num'), 10);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    const cells = this.container.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const r = parseInt(cell.getAttribute('data-r'), 10);
        const c = parseInt(cell.getAttribute('data-c'), 10);

        if (this.prefilled[r][c] !== 0) return; // Cannot overwrite prefilled

        this.board[r][c] = this.selectedNum;
        if (window.soundEngine) window.soundEngine.playPop();
        this.renderBoard();
      });
    });

    const checkBtn = this.container.querySelector('#check-sudoku-btn');
    checkBtn.addEventListener('click', () => {
      this.checkSolution();
    });
  }

  checkSolution() {
    let isCorrect = true;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.board[r][c] !== this.solution[r][c]) {
          isCorrect = false;
          break;
        }
      }
    }

    const feedbackEl = this.container.querySelector('#sudoku-feedback');

    if (isCorrect) {
      this.score = 100;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      if (window.soundEngine) window.soundEngine.playCorrect();

      feedbackEl.className = 'mt-4 p-4 rounded-2xl text-center font-bold text-lg bg-emerald-100 text-emerald-800 border-2 border-emerald-300 block animate-pop-in';
      feedbackEl.innerHTML = `🎉 <strong>Sudoku Solved!</strong> Brilliant logic! ⭐`;

      setTimeout(() => this.finish(), 1000);
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      feedbackEl.className = 'mt-4 p-4 rounded-2xl text-center font-bold text-base bg-amber-100 text-amber-800 border-2 border-amber-300 block animate-pop-in';
      feedbackEl.innerHTML = `✨ <strong>Check carefully!</strong> Each row, column, and 2x2 box must have 1, 2, 3, and 4.`;
    }
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

window.SudokuLogicEngine = SudokuLogicEngine;
