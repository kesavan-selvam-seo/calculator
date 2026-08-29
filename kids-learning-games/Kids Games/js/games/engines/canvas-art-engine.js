// canvas-art-engine.js - Canvas Creative Art, Pixel Art Grid & Connect-the-Dots Engine

class CanvasArtEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.score = 0;
    this.connectedDots = 0;
    this.init();
  }

  init() {
    this.renderArtStudio();
  }

  renderArtStudio() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    const isDots = this.game.slug === 'connect-the-dots';
    const isPixel = this.game.slug === 'pixel-art-creator';

    if (isDots) {
      this.renderConnectDots(rawLevel);
    } else if (isPixel) {
      this.renderPixelGrid(rawLevel);
    } else {
      this.renderFreeCanvas();
    }
  }

  renderConnectDots(rawLevel) {
    const dots = rawLevel.dots || [
      { x: 150, y: 40, n: 1 },
      { x: 250, y: 120, n: 2 },
      { x: 210, y: 240, n: 3 },
      { x: 90, y: 240, n: 4 },
      { x: 50, y: 120, n: 5 }
    ];
    this.connectedDots = 1;

    this.container.innerHTML = `
      <div class="max-w-lg mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-pink-100 text-pink-800 border border-pink-200">
            Connect Dot #<strong id="next-dot-target">2</strong>
          </span>
          <span class="text-sm font-bold text-slate-500">
            Progress: <strong id="dots-progress" class="text-indigo-600">1 / ${dots.length}</strong>
          </span>
        </div>

        <div class="relative w-full aspect-square bg-white rounded-3xl shadow-xl border-4 border-indigo-100 p-4 mb-4">
          <canvas id="dots-canvas" width="320" height="320" class="w-full h-full block"></canvas>
        </div>

        <p class="text-center text-slate-500 font-semibold text-sm">
          Tap the numbered dots in ascending order (1 ➔ 2 ➔ 3...) to reveal the shape!
        </p>
      </div>
    `;

    const canvas = this.container.querySelector('#dots-canvas');
    const ctx = canvas.getContext('2d');

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connected lines
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < this.connectedDots; i++) {
        if (i === 0) ctx.moveTo(dots[i].x, dots[i].y);
        else ctx.lineTo(dots[i].x, dots[i].y);
      }
      if (this.connectedDots >= dots.length) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.fill();
      }
      ctx.stroke();

      // Draw dot circles
      dots.forEach((d, idx) => {
        const isConnected = idx < this.connectedDots;
        const isNext = idx === this.connectedDots;

        ctx.fillStyle = isConnected ? '#10B981' : (isNext ? '#F59E0B' : '#64748B');
        ctx.beginPath();
        ctx.arc(d.x, d.y, isNext ? 14 : 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(d.n), d.x, d.y);
      });
    };

    drawDots();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      if (this.connectedDots < dots.length) {
        const nextDot = dots[this.connectedDots];
        const dist = Math.hypot(clickX - nextDot.x, clickY - nextDot.y);

        if (dist < 30) {
          this.connectedDots++;
          if (window.soundEngine) window.soundEngine.playCorrect();
          const targetEl = this.container.querySelector('#next-dot-target');
          const progEl = this.container.querySelector('#dots-progress');
          if (targetEl) targetEl.textContent = this.connectedDots < dots.length ? dots[this.connectedDots].n : 'Done!';
          if (progEl) progEl.textContent = `${this.connectedDots} / ${dots.length}`;

          drawDots();

          if (this.connectedDots >= dots.length) {
            this.score = 100;
            if (this.onScoreUpdate) this.onScoreUpdate(this.score);
            setTimeout(() => this.finish(), 800);
          }
        }
      }
    });
  }

  renderPixelGrid(rawLevel) {
    const size = rawLevel.gridSize || 8;
    const palette = rawLevel.palette || ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#FFFFFF', '#000000'];
    let selectedColor = palette[0];

    let gridHtml = '';
    for (let i = 0; i < size * size; i++) {
      gridHtml += `<div data-pixel="${i}" class="pixel-cell aspect-square bg-white border border-slate-200 cursor-pointer hover:opacity-80 transition-colors"></div>`;
    }

    const paletteHtml = palette.map((col, idx) => `
      <button data-color="${col}" class="palette-swatch w-10 h-10 rounded-xl shadow-md border-2 border-white transition-transform active:scale-95 ${idx === 0 ? 'ring-4 ring-indigo-500 scale-110' : ''}" style="background-color: ${col};"></button>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-md mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
            Pixel Art Canvas (${size}x${size})
          </span>
          <button id="finish-art-btn" class="btn-chubby btn-emerald px-5 py-1.5 text-sm">
            Complete ✓
          </button>
        </div>

        <!-- Pixel Board -->
        <div class="bg-white p-3 rounded-3xl shadow-xl border border-slate-200 mb-6">
          <div class="grid rounded-2xl overflow-hidden shadow-inner border border-slate-300" style="grid-template-columns: repeat(${size}, minmax(0, 1fr));">
            ${gridHtml}
          </div>
        </div>

        <!-- Color Palette -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-center gap-3">
          ${paletteHtml}
        </div>
      </div>
    `;

    const swatches = this.container.querySelectorAll('.palette-swatch');
    swatches.forEach(sw => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('ring-4', 'ring-indigo-500', 'scale-110'));
        sw.classList.add('ring-4', 'ring-indigo-500', 'scale-110');
        selectedColor = sw.getAttribute('data-color');
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    const pixels = this.container.querySelectorAll('.pixel-cell');
    pixels.forEach(px => {
      px.addEventListener('click', () => {
        px.style.backgroundColor = selectedColor;
        if (window.soundEngine) window.soundEngine.playPop();
      });
    });

    const finishBtn = this.container.querySelector('#finish-art-btn');
    finishBtn.addEventListener('click', () => {
      this.score = 100;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      this.finish();
    });
  }

  renderFreeCanvas() {
    this.container.innerHTML = `
      <div class="max-w-md mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-4">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-pink-100 text-pink-800 border border-pink-200">
            ${this.game.title}
          </span>
          <button id="finish-drawing-btn" class="btn-chubby btn-emerald px-5 py-1.5 text-sm">
            Save Art ✓
          </button>
        </div>

        <div class="bg-white rounded-3xl p-3 shadow-xl border border-slate-200 mb-4 aspect-square">
          <canvas id="free-canvas" width="360" height="360" class="w-full h-full rounded-2xl border border-slate-200 block cursor-crosshair"></canvas>
        </div>

        <div class="flex items-center justify-center gap-3">
          <button id="clear-canvas-btn" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm">
            🗑️ Clear
          </button>
        </div>
      </div>
    `;

    const canvas = this.container.querySelector('#free-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    };

    const startDraw = (e) => {
      isDrawing = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };

    const stopDraw = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
    canvas.addEventListener('touchend', stopDraw);

    this.container.querySelector('#clear-canvas-btn').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    this.container.querySelector('#finish-drawing-btn').addEventListener('click', () => {
      this.score = 100;
      if (this.onScoreUpdate) this.onScoreUpdate(this.score);
      this.finish();
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

window.CanvasArtEngine = CanvasArtEngine;
