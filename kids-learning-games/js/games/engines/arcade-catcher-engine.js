// arcade-catcher-engine.js - 60FPS HTML5 Canvas Arcade Falling Catcher & Bubble Popper

class ArcadeCatcherEngine {
  constructor(container, game, difficulty, onComplete, onScoreUpdate) {
    this.container = container;
    this.game = game;
    this.difficulty = difficulty || 'easy';
    this.onComplete = onComplete;
    this.onScoreUpdate = onScoreUpdate;

    this.canvas = null;
    this.ctx = null;
    this.animationId = null;

    this.score = 0;
    this.caughtCount = 0;
    this.targetCaught = 0;
    this.requiredCatches = 5;

    this.player = { x: 200, y: 340, width: 70, height: 45, speed: 7, targetX: 200 };
    this.items = [];
    this.spawnTimer = 0;
    this.keys = { left: false, right: false };
    this.isRunning = false;

    this.init();
  }

  init() {
    const rawLevel = (this.game.levels && this.game.levels[this.difficulty]) || {};
    this.targetRule = rawLevel.targetRule || 'Catch matching items!';
    this.targetValues = rawLevel.targetValues || [5];
    this.targetType = rawLevel.targetType || 'exact';
    this.speed = rawLevel.speed || 2.5;
    this.requiredCatches = 5;
    this.score = 0;
    this.caughtCount = 0;

    this.renderShell();
  }

  renderShell() {
    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto py-4 px-2">
        <div class="flex items-center justify-between mb-3">
          <span class="px-4 py-1.5 rounded-full text-sm font-bold bg-sky-100 text-sky-800 border border-sky-200">
            Target: <strong>${this.targetRule}</strong>
          </span>
          <span class="text-sm font-bold text-slate-500">
            Caught: <strong id="arcade-caught" class="text-indigo-600 text-base">0 / ${this.requiredCatches}</strong>
          </span>
        </div>

        <!-- Canvas Game Window -->
        <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-900 aspect-[4/3]">
          <canvas id="arcade-canvas" class="w-full h-full block"></canvas>

          <!-- Start / Ready Overlay -->
          <div id="arcade-start-overlay" class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-10">
            <div class="text-5xl sm:text-6xl mb-3 animate-bounce-soft">🧺</div>
            <h3 class="text-2xl sm:text-3xl font-extrabold mb-2 font-display">${this.game.title}</h3>
            <p class="text-sky-300 font-semibold mb-6 max-w-md">${this.targetRule}</p>
            <button id="start-arcade-btn" class="btn-chubby btn-emerald px-8 py-3 text-lg">
              Start Game ▶
            </button>
          </div>
        </div>

        <!-- On-Screen Controls for Touch Devices -->
        <div class="flex items-center justify-center gap-6 mt-4 select-none">
          <button id="arcade-left-btn" class="d-pad-btn w-16 h-16 text-2xl font-bold">◀</button>
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Use Touch or Arrow Keys</span>
          <button id="arcade-right-btn" class="d-pad-btn w-16 h-16 text-2xl font-bold">▶</button>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#arcade-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Resize canvas internal buffer to resolution
    this.canvas.width = 480;
    this.canvas.height = 360;
    this.player.y = this.canvas.height - 50;
    this.player.x = (this.canvas.width - this.player.width) / 2;

    this.bindControls();
  }

  bindControls() {
    const startBtn = this.container.querySelector('#start-arcade-btn');
    const overlay = this.container.querySelector('#arcade-start-overlay');

    startBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      if (window.soundEngine) window.soundEngine.playPop();
      this.start();
    });

    const leftBtn = this.container.querySelector('#arcade-left-btn');
    const rightBtn = this.container.querySelector('#arcade-right-btn');

    leftBtn.addEventListener('mousedown', () => { this.keys.left = true; });
    leftBtn.addEventListener('mouseup', () => { this.keys.left = false; });
    leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys.left = true; });
    leftBtn.addEventListener('touchend', () => { this.keys.left = false; });

    rightBtn.addEventListener('mousedown', () => { this.keys.right = true; });
    rightBtn.addEventListener('mouseup', () => { this.keys.right = false; });
    rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys.right = true; });
    rightBtn.addEventListener('touchend', () => { this.keys.right = false; });

    window.onkeydown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = true;
    };

    window.onkeyup = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
    };

    // Mouse & Touch direct drag on canvas
    const handlePointerMove = (clientX) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const x = (clientX - rect.left) * scaleX;
      this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.width, x - this.player.width / 2));
    };

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isRunning) handlePointerMove(e.clientX);
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isRunning && e.touches[0]) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX);
      }
    });
  }

  start() {
    this.isRunning = true;
    this.items = [];
    this.loop();
  }

  loop() {
    if (!this.isRunning) return;

    this.update();
    this.draw();

    this.animationId = requestAnimationFrame(() => this.loop());
  }

  update() {
    // Keyboard movement
    if (this.keys.left) {
      this.player.x = Math.max(0, this.player.x - this.player.speed);
    }
    if (this.keys.right) {
      this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + this.player.speed);
    }

    // Item Spawning
    this.spawnTimer++;
    if (this.spawnTimer > 45) {
      this.spawnTimer = 0;
      this.spawnItem();
    }

    // Item updates & collisions
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.vy;

      // Collision with player basket
      if (
        it.y + it.size >= this.player.y &&
        it.y <= this.player.y + this.player.height &&
        it.x + it.size >= this.player.x &&
        it.x <= this.player.x + this.player.width
      ) {
        if (it.isTarget) {
          this.score += 20;
          this.caughtCount++;
          if (this.onScoreUpdate) this.onScoreUpdate(this.score);
          if (window.soundEngine) window.soundEngine.playCorrect();

          const countEl = this.container.querySelector('#arcade-caught');
          if (countEl) countEl.textContent = `${this.caughtCount} / ${this.requiredCatches}`;

          if (this.caughtCount >= this.requiredCatches) {
            this.finish();
            return;
          }
        } else {
          if (window.soundEngine) window.soundEngine.playWrong();
        }
        this.items.splice(i, 1);
        continue;
      }

      // Out of bounds
      if (it.y > this.canvas.height + 20) {
        this.items.splice(i, 1);
      }
    }
  }

  spawnItem() {
    const isTarget = Math.random() > 0.45;
    let label = '';

    if (this.targetType === 'even') {
      label = isTarget ? (Math.floor(Math.random() * 5) * 2 + 2) : (Math.floor(Math.random() * 5) * 2 + 1);
    } else if (this.targetType === 'vowels') {
      const vowels = ['A', 'E', 'I', 'O', 'U'];
      const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
      label = isTarget ? vowels[Math.floor(Math.random() * vowels.length)] : consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      label = isTarget ? this.targetValues[0] : (this.targetValues[0] + (Math.random() > 0.5 ? 2 : -1));
    }

    this.items.push({
      x: 30 + Math.random() * (this.canvas.width - 60),
      y: -30,
      size: 36,
      vy: this.speed + (Math.random() * 1.5),
      label: label,
      isTarget: isTarget,
      color: isTarget ? '#10B981' : '#F59E0B'
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Starry / space background
    this.ctx.fillStyle = '#0F172A';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw basket / player with fallback
    this.ctx.fillStyle = '#4F46E5';
    this.ctx.beginPath();
    if (this.ctx.roundRect) {
      this.ctx.roundRect(this.player.x, this.player.y, this.player.width, this.player.height, 12);
    } else {
      this.ctx.rect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
    this.ctx.fill();

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 20px Fredoka, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🧺', this.player.x + this.player.width / 2, this.player.y + 30);

    // Draw falling items
    for (let it of this.items) {
      this.ctx.fillStyle = it.color;
      this.ctx.beginPath();
      this.ctx.arc(it.x + it.size / 2, it.y + it.size / 2, it.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.stroke();

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = 'bold 16px Nunito, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(String(it.label), it.x + it.size / 2, it.y + it.size / 2);
    }
  }

  finish() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.onkeydown = null;
    window.onkeyup = null;

    const maxScore = this.requiredCatches * 20;
    const stars = this.score >= maxScore * 0.8 ? 3 : (this.score >= maxScore * 0.5 ? 2 : 1);

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        maxScore: maxScore,
        stars: stars
      });
    }
  }
}

window.ArcadeCatcherEngine = ArcadeCatcherEngine;
