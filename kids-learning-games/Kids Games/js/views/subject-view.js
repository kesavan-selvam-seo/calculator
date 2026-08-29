// subject-view.js - Dedicated Subject Landing Page View with Benefits & FAQs

class SubjectView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(subjectSlug) {
    const categories = window.CATEGORIES_DATA || [];
    const cat = categories.find(c => c.slug === subjectSlug || c.id === subjectSlug) || categories[0];

    document.title = `${cat.name} for Kids — Kids Learning Games`;

    const gamesInCat = (window.getGamesByCategory ? window.getGamesByCategory(cat.id) : []).slice(0, 16);

    const gameCardsHtml = gamesInCat.map(g => `
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">${g.icon}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase">${g.difficulty}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Ages ${g.ageRange}</span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display">${g.title}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">${g.description}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400">Objectives: ${g.learningObjectives ? g.learningObjectives[0] : 'Skills'}</span>
          <a href="#/games/${g.slug}" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play ▶
          </a>
        </div>
      </div>
    `).join('');

    const faqsHtml = (cat.faqs || []).map((faq, idx) => `
      <details class="group bg-white rounded-2xl p-5 shadow-md border border-slate-200 cursor-pointer" ${idx === 0 ? 'open' : ''}>
        <summary class="font-bold text-base sm:text-lg text-slate-800 flex items-center justify-between select-none list-none">
          <span>${faq.q}</span>
          <span class="text-indigo-600 font-extrabold group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p class="mt-3 text-slate-600 text-sm leading-relaxed pt-3 border-t border-slate-100">
          ${faq.a}
        </p>
      </details>
    `).join('');

    this.container.innerHTML = `
      <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-6">
          <a href="#/" class="hover:text-indigo-600">Home</a>
          <span>›</span>
          <span class="text-slate-800">${cat.name}</span>
        </nav>

        <!-- Subject Hero Banner -->
        <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${cat.color} text-white shadow-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
          <div class="max-w-xl">
            <span class="text-xs font-black bg-white/25 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3 backdrop-blur-sm">
              Educational Hub
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-display mb-3">${cat.name} for Kids</h1>
            <p class="text-white/90 font-medium text-base sm:text-lg leading-relaxed mb-6">
              ${cat.description}
            </p>
            <a href="#/games" class="btn-chubby bg-white text-slate-900 hover:bg-slate-50 px-8 py-3.5 text-base shadow-lg inline-block">
              Browse All ${cat.name} ➔
            </a>
          </div>

          <div class="text-7xl sm:text-9xl select-none animate-bounce-soft">
            ${cat.icon}
          </div>
        </div>

        <!-- Learning Benefits -->
        <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
          <h2 class="text-2xl font-black text-slate-800 font-display mb-6">
            ✨ Learning Benefits & Curriculum Alignment
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${(cat.benefits || []).map(b => `
              <div class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span class="text-emerald-500 font-black text-xl">✓</span>
                <span class="text-slate-700 font-bold text-sm sm:text-base">${b}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Games in Subject -->
        <div class="mb-14">
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-6">
            Playable ${cat.name}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${gameCardsHtml}
          </div>
        </div>

        <!-- Frequently Asked Questions -->
        <div class="bg-indigo-50/70 rounded-3xl p-8 shadow-sm border border-indigo-100">
          <h2 class="text-2xl font-black text-slate-900 font-display mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div class="space-y-4 max-w-3xl mx-auto">
            ${faqsHtml}
          </div>
        </div>

      </div>
    `;
  }
}

window.SubjectView = SubjectView;
