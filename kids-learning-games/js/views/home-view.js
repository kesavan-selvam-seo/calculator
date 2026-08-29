// home-view.js - Homepage View with Hero, Subject Hubs, Age Portals & Daily Challenge

class HomeView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    document.title = 'Kids Learning Games — Learn • Play • Explore';

    const popularGames = window.getPopularGames ? window.getPopularGames(8) : (window.GAMES_DATA || []).slice(0, 8);
    const categories = window.CATEGORIES_DATA || [];
    const ages = [
      { label: 'Ages 4–5', slug: 'games-for-4-year-olds', icon: '🐣', color: 'from-amber-400 to-orange-500', desc: 'Preschool & Phonics' },
      { label: 'Ages 6–7', slug: 'games-for-6-year-olds', icon: '🦊', color: 'from-emerald-400 to-teal-500', desc: '1st & 2nd Grade' },
      { label: 'Ages 8–9', slug: 'games-for-8-year-olds', icon: '🦁', color: 'from-blue-400 to-indigo-500', desc: 'Math & Logic Puzzles' },
      { label: 'Ages 10–12', slug: 'games-for-10-year-olds', icon: '🚀', color: 'from-purple-500 to-pink-500', desc: 'Science & Quests' }
    ];

    // Popular game cards HTML
    const gameCardsHtml = popularGames.map(g => `
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">${g.icon}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase tracking-wider">${g.category}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Ages ${g.ageRange}</span>
            </div>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-1 font-display">${g.title}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">${g.description}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400 uppercase">Diff: <strong class="text-slate-600">${g.difficulty}</strong></span>
          <a href="#/games/${g.slug}" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play Now ▶
          </a>
        </div>
      </div>
    `).join('');

    // Category cards HTML
    const catCardsHtml = categories.slice(0, 8).map(c => `
      <a href="#/${c.slug}" class="game-card-hover rounded-3xl p-5 bg-gradient-to-br ${c.color} text-white shadow-lg flex flex-col justify-between min-h-[140px] group">
        <div class="flex items-center justify-between">
          <span class="text-3xl sm:text-4xl group-hover:scale-125 transition-transform">${c.icon}</span>
          <span class="text-xs font-black bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">Explore</span>
        </div>
        <div>
          <h4 class="text-lg sm:text-xl font-extrabold font-display leading-tight">${c.name}</h4>
          <span class="text-xs text-white/80 font-semibold">10+ Playable Games</span>
        </div>
      </a>
    `).join('');

    // Age cards HTML
    const ageCardsHtml = ages.map(a => `
      <a href="#/${a.slug}" class="game-card-hover rounded-3xl p-6 bg-gradient-to-br ${a.color} text-white shadow-xl flex flex-col items-center text-center group">
        <span class="text-5xl sm:text-6xl mb-3 group-hover:scale-125 transition-transform animate-bounce-soft">${a.icon}</span>
        <h4 class="text-xl sm:text-2xl font-black font-display mb-1">${a.label}</h4>
        <p class="text-xs sm:text-sm text-white/90 font-semibold">${a.desc}</p>
      </a>
    `).join('');

    this.container.innerHTML = `
      <!-- HERO SECTION -->
      <section class="relative bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column: Copy & CTAs -->
          <div class="lg:col-span-7 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 text-indigo-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-6 border border-indigo-200">
              <span>🚀</span> 100% Free & Child-Safe Learning
            </div>
            
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 font-display tracking-tight">
              Learn Through <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Play!</span>
            </h1>

            <p class="text-lg sm:text-xl text-slate-600 font-medium mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Fun educational games that help kids aged 4–12 build math, language, science, logic, and problem-solving skills independently.
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a href="#/games" class="btn-chubby btn-primary px-8 py-4 text-lg sm:text-xl shadow-indigo-300">
                🎮 Play Games
              </a>
              <a href="#/math-games" class="btn-chubby btn-emerald px-8 py-4 text-lg sm:text-xl">
                🌟 Explore Subjects
              </a>
            </div>

            <!-- Value Props Checklist -->
            <div class="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-slate-500">
              <span class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> 100 Working Games</span>
              <span class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> No Ads or Sign-Up</span>
              <span class="flex items-center gap-1.5"><span class="text-emerald-500">✓</span> Audio & Rewards</span>
            </div>
          </div>

          <!-- Right Column: Interactive Animated Mascot Art -->
          <div class="lg:col-span-5 relative flex items-center justify-center">
            <div class="relative w-72 sm:w-96 aspect-square rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/30 flex items-center justify-center p-6 shadow-2xl">
              <!-- Floating Badges -->
              <div class="absolute -top-4 -left-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-indigo-100 flex items-center gap-2 animate-float">
                <span class="text-2xl">➕</span>
                <span class="text-xs font-extrabold text-indigo-700">Math Master</span>
              </div>
              <div class="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-emerald-100 flex items-center gap-2 animate-float-reverse">
                <span class="text-2xl">🏆</span>
                <span class="text-xs font-extrabold text-emerald-700">3 Stars Earned!</span>
              </div>
              <div class="absolute top-1/2 -right-6 px-4 py-2 rounded-2xl bg-white shadow-xl border border-amber-100 flex items-center gap-2 animate-float">
                <span class="text-2xl">🐝</span>
                <span class="text-xs font-extrabold text-amber-700">Spelling Bee</span>
              </div>

              <!-- Center Mascot Illustration -->
              <div class="text-8xl sm:text-9xl select-none animate-bounce-soft drop-shadow-2xl">
                🦊
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- TODAY'S DAILY CHALLENGE BANNER -->
      <section class="py-8 px-4 sm:px-6 bg-slate-50">
        <div class="max-w-6xl mx-auto">
          <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div class="flex items-center gap-4 sm:gap-6">
              <span class="text-5xl sm:text-6xl p-4 bg-white/20 rounded-3xl backdrop-blur-sm select-none animate-wiggle">🎯</span>
              <div>
                <div class="inline-block px-3 py-1 rounded-full bg-white/30 text-xs font-black uppercase tracking-wider mb-1">
                  Today's Daily Challenge
                </div>
                <h3 class="text-2xl sm:text-3xl font-black font-display">Daily Learning Quest</h3>
                <p class="text-amber-100 text-xs sm:text-sm font-medium max-w-md">
                  Solve 3 multi-subject questions across Math, Reading, and Science to earn +3 Bonus Stars!
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <div class="text-xs font-bold text-amber-100">Reward</div>
                <div class="text-xl font-black">⭐ +3 Stars & Badge</div>
              </div>
              <a href="#/games/daily-learning-quest" class="btn-chubby bg-white text-amber-700 hover:bg-amber-50 px-8 py-3.5 text-base sm:text-lg shadow-lg">
                Start Quest ▶
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- POPULAR GAMES SECTION -->
      <section class="py-12 sm:py-16 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-1">Top Favorites</span>
              <h2 class="text-3xl sm:text-4xl font-black text-slate-900 font-display">Popular Learning Games</h2>
            </div>
            <a href="#/games" class="btn-chubby bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-2.5 text-sm">
              View All 100 Games ➔
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${gameCardsHtml}
          </div>
        </div>
      </section>

      <!-- LEARN BY SUBJECT SECTION -->
      <section class="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-1">Curriculum Subjects</span>
            <h2 class="text-3xl sm:text-4xl font-black text-slate-900 font-display mb-3">Learn by Subject</h2>
            <p class="text-slate-500 font-medium text-sm sm:text-base">
              Explore tailored learning hubs designed by educational cognitive principles.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            ${catCardsHtml}
          </div>
        </div>
      </section>

      <!-- CHOOSE YOUR AGE SECTION -->
      <section class="py-12 sm:py-16 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-extrabold text-purple-600 uppercase tracking-widest block mb-1">Age-Tailored Content</span>
            <h2 class="text-3xl sm:text-4xl font-black text-slate-900 font-display mb-3">Choose Your Age</h2>
            <p class="text-slate-500 font-medium text-sm sm:text-base">
              Find the perfect games suited to your child's exact developmental stage.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${ageCardsHtml}
          </div>
        </div>
      </section>

      <!-- WHY KIDS & PARENTS LOVE IT SECTION -->
      <section class="py-12 sm:py-16 px-4 sm:px-6 bg-indigo-900 text-white rounded-3xl max-w-6xl mx-auto my-8 shadow-2xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">Educational Benefits</span>
          <h2 class="text-3xl sm:text-4xl font-black font-display mb-3">Why Kids & Parents Love It</h2>
          <p class="text-indigo-200 font-medium text-sm sm:text-base">
            Engineered to turn screen time into meaningful, joyful learning moments.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">🌟</div>
            <h3 class="text-xl font-bold font-display mb-2">Learn New Skills</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Step-by-step interactive mechanics reinforce core concepts in math, reading, science, and geography.
            </p>
          </div>

          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">🧠</div>
            <h3 class="text-xl font-bold font-display mb-2">Improve Problem Solving</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Deductive logic puzzles, mazes, and spatial tangrams stimulate critical thinking.
            </p>
          </div>

          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">🎴</div>
            <h3 class="text-xl font-bold font-display mb-2">Build Memory & Focus</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Card flip grids and audio-visual patterns train working memory and concentration.
            </p>
          </div>

          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">➕</div>
            <h3 class="text-xl font-bold font-display mb-2">Practice Mental Math</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Number catching, fraction pizzas, and division dash turn arithmetic into active excitement.
            </p>
          </div>

          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">📚</div>
            <h3 class="text-xl font-bold font-display mb-2">Expand Vocabulary</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Spelling bees, anagram scrambles, and sight word flashcards enrich reading comprehension.
            </p>
          </div>

          <div class="bg-indigo-800/60 border border-indigo-700 rounded-3xl p-6 shadow-md">
            <div class="text-4xl mb-3">🛡️</div>
            <h3 class="text-xl font-bold font-display mb-2">100% Safe & Private</h3>
            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              Zero advertisements, no registration, and no personal data collection ever. COPPA aligned.
            </p>
          </div>
        </div>
      </section>

      <!-- PARENTS & EDUCATORS CTA SECTION -->
      <section class="py-12 sm:py-16 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12 border-2 border-indigo-100 text-center shadow-lg">
          <span class="text-4xl sm:text-5xl mb-4 inline-block animate-bounce-soft">👨‍🏫</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-800 font-display mb-3">
            Designed for Parents & Educators
          </h2>
          <p class="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto mb-6">
            Read our curriculum guidelines, screen-time advice, developmental milestones, and classroom tips.
          </p>
          <a href="#/parents" class="btn-chubby btn-primary px-8 py-3.5 text-base">
            Explore Parents & Educators Section ➔
          </a>
        </div>
      </section>
    `;
  }
}

window.HomeView = HomeView;
