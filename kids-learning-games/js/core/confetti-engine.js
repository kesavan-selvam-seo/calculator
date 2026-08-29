// confetti-engine.js - Lightweight Canvas Confetti Celebration Particle System

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#8B5CF6', '#F43F5E', '#3B82F6'];
  }

  ensureCanvas() {
    if (!this.canvas) {
      this.canvas = document.getElementById('confetti-canvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'confetti-canvas';
        document.body.appendChild(this.canvas);
      }
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  burst(count = 90) {
    this.ensureCanvas();
    this.particles = [];
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.35;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const velocity = 6 + Math.random() * 9;
      this.particles.push({
        x: originX + (Math.random() - 0.5) * 100,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 4,
        size: 8 + Math.random() * 8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        shape: Math.random() > 0.3 ? 'rect' : 'circle'
      });
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.animate();
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeCount = 0;

    for (let p of this.particles) {
      if (p.opacity <= 0.01 || p.y > this.canvas.height + 50) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravity
      p.vx *= 0.98; // Air resistance
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008; // Fade out

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
      activeCount++;
    }

    if (activeCount > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animationId = null;
    }
  }
}

window.confettiEngine = new ConfettiEngine();
