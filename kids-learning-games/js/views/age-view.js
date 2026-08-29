// age-view.js - Dedicated Age Landing Pages with Milestones & Curated Games

class AgeView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(ageSlug) {
    const ageList = window.AGES_DATA || [];
    const ageNum = parseInt(ageSlug.replace(/[^0-9]/g, ''), 10) || 5;
    const ageData = ageList.find(a => a.age === ageNum) || ageList[0];

    document.title = `${ageData.title} — Kids Learning Games`;

    const curatedGames = (window.getGamesByAge ? window.getGamesByAge(ageNum) : []).slice(0, 16);

    const gameCardsHtml = curatedGames.map(g => `
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">${g.icon}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase">${g.category}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Ages ${g.ageRange}</span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display">${g.title}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">${g.description}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400">Diff: ${g.difficulty}</span>
          <a href="#/games/${g.slug}" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play ▶
          </a>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-6">
          <a href="#/" class="hover:text-indigo-600">Home</a>
          <span>›</span>
          <span class="text-slate-800">${ageData.title}</span>
        </nav>

        <!-- Age Hero Banner -->
        <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${ageData.themeColor} text-white shadow-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
          <div class="max-w-xl">
            <span class="text-xs font-black bg-white/25 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3 backdrop-blur-sm">
              ${ageData.heroBadge}
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-display mb-3">${ageData.title}</h1>
            <p class="text-white/95 font-medium text-base sm:text-lg leading-relaxed mb-6">
              ${ageData.description}
            </p>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-xs font-black">
              <span>🎯</span> Curated for ${ageNum}-Year-Old Development
            </div>
          </div>

          <div class="text-7xl sm:text-9xl select-none animate-bounce-soft">
            ${ageData.icon}
          </div>
        </div>

        <!-- Developmental Milestones -->
        <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
          <h2 class="text-2xl font-black text-slate-800 font-display mb-4">
            🌱 Developmental Milestones for ${ageNum} Year Olds
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            ${(ageData.milestones || []).map(m => `
              <div class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span class="text-indigo-600 font-black text-lg">★</span>
                <span class="text-slate-700 font-bold text-sm sm:text-base">${m}</span>
              </div>
            `).join('')}
          </div>

          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold flex items-start gap-3">
            <span class="text-xl">💡</span>
            <div><strong>Parent Tip:</strong> ${ageData.parentTips}</div>
          </div>
        </div>

        <!-- Curated Games Grid -->
        <div class="mb-14">
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-6">
            Recommended Games for Age ${ageNum}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${gameCardsHtml}
          </div>
        </div>

      </div>
    `;
  }
}

window.AgeView = AgeView;
