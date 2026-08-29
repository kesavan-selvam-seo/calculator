// parents-view.js - Parents & Educators Portal with Safety Pledge, Screen-Time Guide & FAQs

class ParentsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    document.title = 'Parents & Educators Guide — Kids Learning Games';

    this.container.innerHTML = `
      <div class="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-6">
          <a href="#/" class="hover:text-indigo-600">Home</a>
          <span>›</span>
          <span class="text-slate-800">Parents & Educators</span>
        </nav>

        <!-- Header Hero -->
        <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
          <div class="max-w-xl">
            <span class="px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500/30 text-indigo-300 uppercase tracking-widest inline-block mb-3 border border-indigo-400/30">
              Parent & Teacher Guide
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-display mb-4">
              Empowering Kids Through Play
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              We design our educational games around cognitive science, active retrieval practice, and child-safe engagement principles to turn digital time into meaningful intellectual growth.
            </p>
            <div class="flex items-center gap-4 text-xs font-bold text-slate-400">
              <span class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> COPPA Aligned</span>
              <span class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> No Ads Ever</span>
              <span class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> 100% Free</span>
            </div>
          </div>

          <div class="text-7xl sm:text-9xl select-none animate-bounce-soft">
            👨‍👩‍👧‍👦
          </div>
        </div>

        <!-- 4 Core Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold mb-4">
              🧠
            </div>
            <h2 class="text-xl font-extrabold text-slate-800 font-display mb-2">Cognitive Science & Active Retrieval</h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              Unlike passive videos or standard worksheets, interactive games require active decision-making. Dragging fraction pizza slices or catching number sums triggers dopamine-reinforced memory retention.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold mb-4">
              🛡️
            </div>
            <h2 class="text-xl font-extrabold text-slate-800 font-display mb-2">Zero-Data Child Safety Pledge</h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              We strictly uphold children's privacy. We do not require account registration, collect names, track behavioral ad profiles, or link to external unmoderated platforms. All progress is saved locally on your device.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold mb-4">
              ⏱️
            </div>
            <h2 class="text-xl font-extrabold text-slate-800 font-display mb-2">Mindful Screen-Time Guidance</h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              We recommend 15–20 minute sessions for children aged 4–7 and 30–45 minute sessions for ages 8–12. Our Daily Learning Quests provide a structured, bite-sized daily routine.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-bold mb-4">
              🌱
            </div>
            <h2 class="text-xl font-extrabold text-slate-800 font-display mb-2">Encouraging Positive Feedback</h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              We eliminate harsh failure buzzers. When a child misses an answer, they receive friendly, constructive prompts ("Nice try! Let's check why...") to foster resilience and a growth mindset.
            </p>
          </div>

        </div>

        <!-- Age Progression Roadmap -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 mb-12">
          <h2 class="text-2xl font-black text-slate-800 font-display mb-6">
            📈 Age-Based Learning Progression
          </h2>
          
          <div class="space-y-6">
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">🐣</span>
                <h3 class="font-extrabold text-slate-800 text-base sm:text-lg">Ages 4–5 (Preschool & Kindergarten)</h3>
              </div>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Focus on tactile counting to 10, letter shapes, primary colors, animal sound discrimination, and basic 2x2 memory cards.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">🦊</span>
                <h3 class="font-extrabold text-slate-800 text-base sm:text-lg">Ages 6–7 (1st & 2nd Grade)</h3>
              </div>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Addition/subtraction within 20, sight word spelling, phonics blends, telling analog clock time, and exploring animal habitats.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">🦁</span>
                <h3 class="font-extrabold text-slate-800 text-base sm:text-lg">Ages 8–9 (3rd & 4th Grade)</h3>
              </div>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Multiplication tables, place value, solar system facts, world maps, parts of speech grammar, and 4x4 Sudoku logic grids.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">🚀</span>
                <h3 class="font-extrabold text-slate-800 text-base sm:text-lg">Ages 10–12 (5th Grade & Middle School)</h3>
              </div>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Visual fractions, division, keyboard typing speed, world currencies and landmarks, complex science lab deduction, and multi-round challenges.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQs for Parents -->
        <div class="bg-indigo-50/70 rounded-3xl p-8 sm:p-10 shadow-sm border border-indigo-100">
          <h2 class="text-2xl font-black text-slate-900 font-display mb-6 text-center">
            Parent & Educator FAQs
          </h2>
          <div class="space-y-4 max-w-3xl mx-auto">
            <details class="bg-white rounded-2xl p-5 shadow-md border border-slate-200 cursor-pointer" open>
              <summary class="font-bold text-slate-800 list-none flex items-center justify-between">
                <span>Are all 100 games completely free?</span>
                <span class="text-indigo-600 font-black">▼</span>
              </summary>
              <p class="mt-3 text-slate-600 text-sm leading-relaxed pt-2 border-t border-slate-100">
                Yes! Every game is 100% free to play directly in modern web browsers without paywalls, hidden in-app purchases, or subscription barriers.
              </p>
            </details>

            <details class="bg-white rounded-2xl p-5 shadow-md border border-slate-200 cursor-pointer">
              <summary class="font-bold text-slate-800 list-none flex items-center justify-between">
                <span>How can teachers use this platform in classroom smartboards or tablets?</span>
                <span class="text-indigo-600 font-black">▼</span>
              </summary>
              <p class="mt-3 text-slate-600 text-sm leading-relaxed pt-2 border-t border-slate-100">
                Teachers can project games on interactive whiteboards for classroom group challenges, or assign specific game URLs (e.g. <code>#/games/fraction-pizza</code>) to student tablets during independent study stations.
              </p>
            </details>

            <details class="bg-white rounded-2xl p-5 shadow-md border border-slate-200 cursor-pointer">
              <summary class="font-bold text-slate-800 list-none flex items-center justify-between">
                <span>Can the sound effects be muted?</span>
                <span class="text-indigo-600 font-black">▼</span>
              </summary>
              <p class="mt-3 text-slate-600 text-sm leading-relaxed pt-2 border-t border-slate-100">
                Yes, a single click on the sound icon 🔊 in the top navigation bar or game header mutes all audio effects instantly across the entire website.
              </p>
            </details>
          </div>
        </div>

      </div>
    `;
  }
}

window.ParentsView = ParentsView;
