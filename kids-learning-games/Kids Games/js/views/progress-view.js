// progress-view.js - Gamification & Progress Tracking Dashboard

class ProgressView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    document.title = 'My Learning Progress & Badges — Kids Learning Games';

    const stats = window.progressManager ? window.progressManager.getStats() : {
      totalStars: 0,
      totalPoints: 0,
      gamesPlayedTotal: 0,
      streakDays: 1,
      unlockedBadges: [],
      gameScores: {},
      allBadgesList: window.BADGES_DATA || []
    };

    const allBadges = window.BADGES_DATA || [];
    const unlockedSet = new Set(stats.unlockedBadges || []);

    const badgesHtml = allBadges.map(b => {
      const isUnlocked = unlockedSet.has(b.id);
      return `
        <div class="rounded-3xl p-5 border-2 text-center transition-all ${isUnlocked ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 shadow-md scale-100' : 'bg-slate-50 border-slate-200 opacity-60 grayscale'}">
          <div class="text-4xl sm:text-5xl mb-2 ${isUnlocked ? 'animate-bounce-soft' : ''}">${b.icon}</div>
          <h4 class="font-extrabold text-slate-800 text-sm sm:text-base font-display mb-1">${b.title}</h4>
          <p class="text-[11px] sm:text-xs text-slate-500 font-semibold mb-2 leading-tight">${b.description}</p>
          <span class="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isUnlocked ? 'bg-amber-400 text-amber-950' : 'bg-slate-200 text-slate-500'}">
            ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
          </span>
        </div>
      `;
    }).join('');

    // Recent games played
    const gameScoreEntries = Object.entries(stats.gameScores || {});
    const recentGamesHtml = gameScoreEntries.length === 0 ? `
      <div class="col-span-full py-8 text-center text-slate-400 font-semibold text-sm">
        No games played yet! Start your adventure by clicking on any game.
      </div>
    ` : gameScoreEntries.slice(0, 6).map(([gameId, gdata]) => {
      const g = window.getGameById ? window.getGameById(gameId) : null;
      if (!g) return '';
      return `
        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${g.icon}</span>
            <div>
              <h4 class="font-bold text-slate-800 text-sm">${g.title}</h4>
              <span class="text-xs text-slate-400">Best: <strong>${gdata.bestScore}</strong> pts (${gdata.timesPlayed}x played)</span>
            </div>
          </div>
          <a href="#/games/${g.slug}" class="btn-chubby btn-primary px-4 py-1.5 text-xs">
            Play Again ↺
          </a>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        <!-- Dashboard Header -->
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="text-6xl mb-3 animate-bounce-soft">🏆</div>
          <h1 class="text-3xl sm:text-5xl font-black text-slate-900 font-display mb-2">
            My Learning Trophy Room
          </h1>
          <p class="text-slate-500 font-medium text-sm sm:text-base">
            Track your stars, high scores, daily learning streak, and awesome achievement badges!
          </p>
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div class="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 text-center">
            <span class="text-3xl mb-1 block">⭐</span>
            <div class="text-3xl sm:text-4xl font-black text-amber-500 font-display">${stats.totalStars || 0}</div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Stars</span>
          </div>

          <div class="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 text-center">
            <span class="text-3xl mb-1 block">💎</span>
            <div class="text-3xl sm:text-4xl font-black text-indigo-600 font-display">${stats.totalPoints || 0}</div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Points</span>
          </div>

          <div class="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 text-center">
            <span class="text-3xl mb-1 block">🔥</span>
            <div class="text-3xl sm:text-4xl font-black text-rose-500 font-display">${stats.streakDays || 1} Day</div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Streak</span>
          </div>

          <div class="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100 text-center">
            <span class="text-3xl mb-1 block">🎮</span>
            <div class="text-3xl sm:text-4xl font-black text-emerald-600 font-display">${stats.gamesPlayedTotal || 0}</div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Games Played</span>
          </div>
        </div>

        <!-- Achievement Badges Trophy Case -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 mb-10">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-black text-slate-800 font-display">🎖️ Achievement Badges</h2>
              <p class="text-xs sm:text-sm text-slate-500 font-medium">Unlocked: <strong>${unlockedSet.size}</strong> of ${allBadges.length}</p>
            </div>
            <a href="#/games" class="btn-chubby btn-primary px-5 py-2 text-xs sm:text-sm">
              Earn More Badges ▶
            </a>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            ${badgesHtml}
          </div>
        </div>

        <!-- Recent Games History -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 mb-10">
          <h2 class="text-2xl font-black text-slate-800 font-display mb-4">
            🕹️ Recent Learning Activity
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${recentGamesHtml}
          </div>
        </div>

        <!-- Safe Reset Option -->
        <div class="text-center pt-6 border-t border-slate-200">
          <button id="reset-progress-btn" class="px-6 py-2.5 rounded-full text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
            ⚠️ Reset All Progress Data
          </button>
        </div>

      </div>
    `;

    const resetBtn = this.container.querySelector('#reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your stars and badges?')) {
          if (window.progressManager) window.progressManager.resetAllProgress();
          this.render();
        }
      });
    }
  }
}

window.ProgressView = ProgressView;
