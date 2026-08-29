// maze-nav-engine.js - Grid-Based Maze Navigation Engine with D-Pad & Keyboard Controls

class MazeNavEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.gridSize = 6;
    this.playerPos = { r: 0, c: 0 };
    this.exitPos = { r: 5, c: 5 };
    this.walls = new Set();
    this.score = 0;
    this.moves = 0;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    this.gridSize = rawLevel.mazeSize || (this.difficulty === 'hard' ? 8 : (this.difficulty === 'medium' ? 6 : 5));
    this.playerPos = { r: 0, c: 0 };
    this.exitPos = { r: this.gridSize - 1, c: this.gridSize - 1 };
    this.score = 0;
    this.moves = 0;
    this.generateMaze();
    this.renderBoard();
  }

  generateMaze() {
    this.walls.clear();
    const obstacleCount = Math.floor((this.gridSize * this.gridSize) * 0.22);

    while (this.walls.size < obstacleCount) {
      const r = Math.floor(Math.random() * this.gridSize);
      const c = Math.floor(Math.random() * this.gridSize);

      // Don't block start or exit
      if ((r === 0 && c === 0) || (r === this.exitPos.r && c === this.exitPos.c)) continue;
      if (r === 0 && c === 1) continue; // Keep initial path open
      if (r === 1 && c === 0) continue;

      this.walls.add(`${r},${c}`);
    }
  }

  renderBoard() {
    let cellsHtml = '';
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const isPlayer = (r === this.playerPos.r && c === this.playerPos.c);
        const isExit = (r === this.exitPos.r && c === this.exitPos.c);
        const isWall = this.walls.has(`${r},${c}`);

        let cellContent = '';
        let cellClass = 'bg-slate-100 border border-slate-200';

        if (isPlayer) {
          cellContent = '🦊';
          cellClass = 'bg-indigo-100 border-2 border-indigo-400 font-extrabold text-2xl sm:text-3xl animate-bounce-soft';
        } else if (isExit) {
          cellContent = '🏆';
          cellClass = 'bg-amber-100 border-2 border-amber-400 font-extrabold text-2xl sm:text-3xl';
        } else if (isWall) {
          cellContent = '🧱';
          cellClass = 'bg-slate-400 border border-slate-500 shadow-inner';
        }

        cellsHtml += `
          <div data-row="${r}" data-col="${c}" class="maze-cell aspect-square rounded-xl flex items-center justify-center select-none shadow-sm transition-all ${cellClass}">
            ${cellContent}
          </div>
        `;
      }
    }

    this.container.innerHTML = `
      <div class="max-w-md mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Guide the Fox 🦊 to the Trophy 🏆
          </span>
          <span class="text-sm font-bold text-slate-500">
            Moves: <strong class="text-indigo-600 text-base">${this.moves}</strong>
          </span>
        </div>

        <!-- Maze Grid -->
        <div class="bg-white p-4 rounded-3xl shadow-xl border border-slate-200 mb-6">
          <div class="grid gap-1.5 sm:gap-2" style="grid-template-columns: repeat(${this.gridSize}, minmax(0, 1fr));">
            ${cellsHtml}
          </div>
        </div>

        <!-- D-Pad Directional Controls -->
        <div class="flex flex-col items-center justify-center gap-2 select-none">
          <button id="maze-up" class="d-pad-btn">▲</button>
          <div class="flex items-center justify-center gap-4">
            <button id="maze-left" class="d-pad-btn">◀</button>
            <div class="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
              DPAD
            </div>
            <button id="maze-right" class="d-pad-btn">▶</button>
          </div>
          <button id="maze-down" class="d-pad-btn">▼</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const handleMove = (dr, dc) => {
      const nr = this.playerPos.r + dr;
      const nc = this.playerPos.c + dc;

      if (nr < 0 || nr >= this.gridSize || nc < 0 || nc >= this.gridSize) return;
      if (this.walls.has(`${nr},${nc}`)) {
        if (window.soundEngine) window.soundEngine.playWrong();
        return;
      }

      this.playerPos.r = nr;
      this.playerPos.c = nc;
      this.moves++;
      if (window.soundEngine) window.soundEngine.playPop();

      if (this.playerPos.r === this.exitPos.r && this.playerPos.c === this.exitPos.c) {
        if (window.soundEngine) window.soundEngine.playCorrect();
        this.score = 100;
        if (this.onScoreUpdate) this.onScoreUpdate(this.score);
        setTimeout(() => this.finish(), 400);
      } else {
        this.renderBoard();
      }
    };

    window.onkeydown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') handleMove(-1, 0);
      if (e.key === 'ArrowDown' || e.key === 's') handleMove(1, 0);
      if (e.key === 'ArrowLeft' || e.key === 'a') handleMove(0, -1);
      if (e.key === 'ArrowRight' || e.key === 'd') handleMove(0, 1);
    };

    const upBtn = this.container.querySelector('#maze-up');
    const downBtn = this.container.querySelector('#maze-down');
    const leftBtn = this.container.querySelector('#maze-left');
    const rightBtn = this.container.querySelector('#maze-right');

    if (upBtn) upBtn.addEventListener('click', () => handleMove(-1, 0));
    if (downBtn) downBtn.addEventListener('click', () => handleMove(1, 0));
    if (leftBtn) leftBtn.addEventListener('click', () => handleMove(0, -1));
    if (rightBtn) rightBtn.addEventListener('click', () => handleMove(0, 1));
  }

  finish() {
    window.onkeydown = null;
    const optimalMoves = (this.gridSize - 1) * 2;
    let stars = 3;
    if (this.moves > optimalMoves + 8) stars = 1;
    else if (this.moves > optimalMoves + 3) stars = 2;

    if (this.onComplete) {
      this.onComplete({
        score: 100,
        maxScore: 100,
        stars: stars,
        moves: this.moves
      });
    }
  }
}

window.MazeNavEngine = MazeNavEngine;
