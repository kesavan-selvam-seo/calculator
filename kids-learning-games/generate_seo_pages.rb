# generate_seo_pages.rb
# Static Site Generator creating 100% SEO-Friendly HTML pages for all 100 games, subjects, and ages.

require 'fileutils'
require 'json'

BASE_URL = "https://www.calcuportal.com/kids-games"
ROOT_DIR = File.expand_path(File.dirname(__FILE__))

# Helper to read JS data file objects
def extract_games
  games = []
  Dir.glob(File.join(ROOT_DIR, "js/data/games-*.js")).each do |file|
    next if file.end_with?("games-data.js")
    content = File.read(file)
    
    # Split by individual game object declarations
    chunks = content.split(/\{\s*id:\s*[\x27"]/)
    chunks[1..-1].each do |chunk|
      id_part = chunk.split(/[\x27"]/, 2)[0]
      id = "g" + id_part.gsub(/[^\d]/, '')
      num = id_part.gsub(/[^\d]/, '').to_i

      title = chunk[/title:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "Learning Game"
      slug = chunk[/slug:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || id
      category = chunk[/category:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "math"
      subcategory = chunk[/subcategory:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || ""
      age_range = chunk[/ageRange:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "4-12"
      min_age = (chunk[/minAge:\s*(\d+)/, 1] || 4).to_i
      max_age = (chunk[/maxAge:\s*(\d+)/, 1] || 12).to_i
      difficulty = chunk[/difficulty:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "Easy"
      icon = chunk[/icon:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "🎮"
      description = chunk[/description:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "Fun educational game for kids."
      instructions = chunk[/instructions:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "Follow the on-screen instructions to play and learn!"
      game_type = chunk[/gameType:\s*[\x27"]([^\x27"]+)[\x27"]/, 1] || "quiz"

      objs_match = chunk[/learningObjectives:\s*\[(.*?)\]/m, 1]
      objectives = objs_match ? objs_match.scan(/[\x27"]([^\x27"]+)[\x27"]/).flatten : ["Problem solving", "Cognitive skill building"]

      games << {
        id: id,
        num: num,
        title: title,
        slug: slug,
        category: category,
        subcategory: subcategory,
        age_range: age_range,
        min_age: min_age,
        max_age: max_age,
        difficulty: difficulty,
        icon: icon,
        description: description,
        instructions: instructions,
        game_type: game_type,
        objectives: objectives
      }
    end
  end
  games.sort_by { |g| g[:num] }
end

GAMES = extract_games
puts "Loaded #{GAMES.count} games for static SEO generation."

CATEGORIES = [
  { id: "math", slug: "math-games", name: "Math & Number Games", icon: "➕", color: "from-blue-500 to-indigo-600", desc: "Build rock-solid arithmetic, counting, addition, fractions, and multiplication fluency through play." },
  { id: "english", slug: "english-games", name: "English & Phonics Games", icon: "📚", color: "from-emerald-500 to-teal-600", desc: "Master phonics, sight words, reading comprehension, synonyms, and early vocabulary." },
  { id: "spelling", slug: "spelling-games", name: "Spelling & Word Games", icon: "🐝", color: "from-amber-400 to-orange-500", desc: "Unscramble letters, solve anagrams, and build spelling accuracy with interactive audio clues." },
  { id: "science", slug: "science-games", name: "Science & Nature Games", icon: "🚀", color: "from-purple-500 to-indigo-600", desc: "Explore the solar system, human anatomy, animal habitats, weather cycles, and physics." },
  { id: "logic", slug: "logic-games", name: "Logic, Brain & Puzzle Games", icon: "🧩", color: "from-rose-500 to-pink-600", desc: "Sharpen critical thinking with 4x4 Sudoku, tangrams, pattern sequences, and mazes." },
  { id: "geography", slug: "geography-games", name: "Geography & GK Games", icon: "🌍", color: "from-cyan-500 to-blue-600", desc: "Learn world maps, country flags, global capitals, continents, and India state puzzles." },
  { id: "gk", slug: "gk-games", name: "General Knowledge Games", icon: "💡", color: "from-amber-500 to-yellow-600", desc: "Fun trivia quizzes covering famous landmarks, animals, currencies, and world wonders." },
  { id: "creativity", slug: "creativity-games", name: "Creativity & Art Games", icon: "🎨", color: "from-pink-500 to-rose-600", desc: "Color mixing labs, pixel art grids, connect-the-dots, and shape construction studios." },
  { id: "fast", slug: "fast-games", name: "Fast Skills & Reflex Games", icon: "⚡", color: "from-orange-500 to-amber-600", desc: "Boost keyboard typing speed, reaction reflexes, rapid counting, and multi-round championship quests." }
]

AGES = [
  { age: 4, slug: "games-for-4-year-olds", label: "Ages 4", title: "Learning Games for 4 Year Olds", icon: "🐣", theme: "from-amber-400 to-orange-500", desc: "Preschool games focusing on color recognition, counting to 5, animal sounds, and simple letter shapes." },
  { age: 5, slug: "games-for-5-year-olds", label: "Ages 5", title: "Learning Games for 5 Year Olds", icon: "🐣", theme: "from-amber-400 to-orange-500", desc: "Kindergarten activities for counting to 10, uppercase/lowercase matching, and beginning sounds." },
  { age: 6, slug: "games-for-6-year-olds", label: "Ages 6", title: "Learning Games for 6 Year Olds", icon: "🦊", theme: "from-emerald-400 to-teal-500", desc: "1st grade games for single-digit addition, CVC spelling words, and animal habitats." },
  { age: 7, slug: "games-for-7-year-olds", label: "Ages 7", title: "Learning Games for 7 Year Olds", icon: "🦊", theme: "from-emerald-400 to-teal-500", desc: "2nd grade games for subtraction within 20, telling clock time, and sight words." },
  { age: 8, slug: "games-for-8-year-olds", label: "Ages 8", title: "Learning Games for 8 Year Olds", icon: "🦁", theme: "from-blue-400 to-indigo-500", desc: "3rd grade games for multiplication tables, parts of speech grammar, and planet sizes." },
  { age: 9, slug: "games-for-9-year-olds", label: "Ages 9", title: "Learning Games for 9 Year Olds", icon: "🦁", theme: "from-blue-400 to-indigo-500", desc: "4th grade games for division dash, fraction pizzas, 4x4 Sudoku, and world maps." },
  { age: 10, slug: "games-for-10-year-olds", label: "Ages 10", title: "Learning Games for 10 Year Olds", icon: "🚀", theme: "from-purple-500 to-pink-500", desc: "5th grade games for keyboard typing speed, world flags, science mystery labs, and math mazes." },
  { age: 11, slug: "games-for-11-year-olds", label: "Ages 11", title: "Learning Games for 11 Year Olds", icon: "🚀", theme: "from-purple-500 to-pink-500", desc: "Advanced logic puzzles, multi-round quests, world currency conversions, and speed typing." },
  { age: 12, slug: "games-for-12-year-olds", label: "Ages 12", title: "Learning Games for 12 Year Olds", icon: "🚀", theme: "from-purple-500 to-pink-500", desc: "Championship challenge, complex deduction grids, states of matter, and geography mastery." }
]

def render_html_page(title:, description:, canonical_url:, rel_root:, og_type: "website", schema_json: "", body_content:, extra_script: "")
  <<~HTML
  <!DOCTYPE html>
  <html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>#{title}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="#{description}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="#{canonical_url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="#{og_type}" />
    <meta property="og:url" content="#{canonical_url}" />
    <meta property="og:title" content="#{title}" />
    <meta property="og:description" content="#{description}" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="#{title}" />
    <meta name="twitter:description" content="#{description}" />

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦊</text></svg>" />

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              display: ['Fredoka', 'cursive', 'system-ui', 'sans-serif'],
              body: ['Nunito', 'system-ui', '-apple-system', 'sans-serif']
            },
            colors: {
              brand: {
                50: '#EEF2FF',
                100: '#E0E7FF',
                500: '#6366F1',
                600: '#4F46E5',
                700: '#4338CA',
                900: '#312E81'
              }
            }
          }
        }
      }
    </script>

    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="#{rel_root}css/styles.css" />

    <!-- Structured Data JSON-LD -->
    #{schema_json}
  </head>
  <body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">

    <canvas id="confetti-canvas"></canvas>

    <!-- Top Announcement Bar -->
    <div class="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="https://www.calcuportal.com/" class="flex items-center gap-1.5 hover:text-white font-bold transition-colors">
          <span>←</span>
          <span>Back to <strong>CalcuPortal.com</strong> (Free Online Calculators)</span>
        </a>
        <div class="hidden sm:flex items-center gap-3 text-slate-400 font-medium">
          <span>🌟 100% Free Kids Educational Games</span>
          <span>•</span>
          <span>🛡️ Child Safe & Ad-Free</span>
        </div>
      </div>
    </div>

    <!-- Navigation Header -->
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        <a href="#{rel_root}#/" class="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl p-1">
          <span class="text-3xl sm:text-4xl p-2 rounded-2xl bg-indigo-50 border border-indigo-100 group-hover:scale-110 transition-transform select-none animate-wiggle">🦊</span>
          <div>
            <span class="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 leading-none block">
              Kids <span class="text-indigo-600">Games</span>
            </span>
            <span class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              by CalcuPortal • Learn • Play
            </span>
          </div>
        </a>

        <nav class="hidden lg:flex items-center gap-1 font-extrabold text-sm text-slate-600">
          <a href="#{rel_root}#/" class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors">Home</a>
          <a href="#{rel_root}games/" class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors">All Games (100)</a>
          
          <div class="relative group">
            <button class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <span>Subjects</span>
              <span class="text-xs">▼</span>
            </button>
            <div class="absolute left-0 top-full hidden group-hover:block w-56 p-2 bg-white rounded-3xl shadow-2xl border border-slate-100 animate-pop-in z-50">
              <a href="#{rel_root}math-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-blue-50 text-slate-700 font-bold text-xs"><span class="text-lg">➕</span> Math Games</a>
              <a href="#{rel_root}english-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-emerald-50 text-slate-700 font-bold text-xs"><span class="text-lg">📚</span> English & Reading</a>
              <a href="#{rel_root}science-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-purple-50 text-slate-700 font-bold text-xs"><span class="text-lg">🚀</span> Science & Nature</a>
              <a href="#{rel_root}spelling-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-yellow-50 text-slate-700 font-bold text-xs"><span class="text-lg">🐝</span> Spelling Games</a>
              <a href="#{rel_root}logic-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-rose-50 text-slate-700 font-bold text-xs"><span class="text-lg">🧩</span> Logic & Puzzles</a>
              <a href="#{rel_root}geography-games/" class="flex items-center gap-2.5 p-2.5 rounded-2xl hover:bg-cyan-50 text-slate-700 font-bold text-xs"><span class="text-lg">🌍</span> Geography Games</a>
            </div>
          </div>

          <div class="relative group">
            <button class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <span>Ages</span>
              <span class="text-xs">▼</span>
            </button>
            <div class="absolute left-0 top-full hidden group-hover:block w-48 p-2 bg-white rounded-3xl shadow-2xl border border-slate-100 animate-pop-in z-50">
              <a href="#{rel_root}games-for-4-year-olds/" class="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-amber-50 text-slate-700 font-bold text-xs"><span>🐣</span> Ages 4–5</a>
              <a href="#{rel_root}games-for-6-year-olds/" class="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-emerald-50 text-slate-700 font-bold text-xs"><span>🦊</span> Ages 6–7</a>
              <a href="#{rel_root}games-for-8-year-olds/" class="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-blue-50 text-slate-700 font-bold text-xs"><span>🦁</span> Ages 8–9</a>
              <a href="#{rel_root}games-for-10-year-olds/" class="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-purple-50 text-slate-700 font-bold text-xs"><span>🚀</span> Ages 10–12</a>
            </div>
          </div>

          <a href="#{rel_root}progress/" class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors">Trophies</a>
          <a href="#{rel_root}parents/" class="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-indigo-600 transition-colors">Parents</a>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <button class="open-search-modal-btn p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-bold shadow-sm transition-all flex items-center gap-2" title="Search Games">
            <span>🔍</span>
            <span class="text-xs text-slate-400 font-extrabold hidden md:inline">Search...</span>
          </button>
          <button id="nav-sound-toggle" class="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-base shadow-sm transition-all select-none" title="Toggle Sound FX">🔊</button>
          <div class="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black select-none shadow-sm">
            <span>🔥</span><span id="nav-streak-count">1d</span>
          </div>
          <a href="#{rel_root}progress/" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black select-none shadow-sm hover:scale-105 transition-transform">
            <span>⭐</span><span id="nav-stars-count">0</span>
          </a>
          <button id="mobile-menu-btn" class="lg:hidden p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-bold shadow-sm">☰</button>
        </div>

      </div>

      <div id="mobile-menu-dropdown" class="hidden lg:hidden bg-white border-b border-slate-200 px-4 py-6 shadow-2xl space-y-3 font-bold text-sm">
        <a href="#{rel_root}#/" class="block p-3 rounded-2xl hover:bg-indigo-50 text-slate-800">🏠 Home</a>
        <a href="#{rel_root}games/" class="block p-3 rounded-2xl hover:bg-indigo-50 text-slate-800">🎮 All 100 Games</a>
        <a href="#{rel_root}progress/" class="block p-3 rounded-2xl hover:bg-indigo-50 text-slate-800">🏆 Trophies & Badges</a>
        <a href="#{rel_root}parents/" class="block p-3 rounded-2xl hover:bg-indigo-50 text-slate-800">👨‍👩‍👧 Parents & Educators</a>
        <a href="https://www.calcuportal.com/" class="block p-3 rounded-2xl bg-indigo-50 text-indigo-700 font-black">← Back to CalcuPortal.com</a>
      </div>
    </header>

    <main id="main-content-mount" class="flex-grow">
      #{body_content}
    </main>

    <!-- Global Search Modal -->
    <div id="global-search-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto hidden">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 mt-12 animate-pop-in">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🔍</span>
            <h3 class="text-xl font-bold font-display text-slate-800">Search Learning Games</h3>
          </div>
          <button id="close-search-modal-btn" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center">✕</button>
        </div>
        <div class="relative mb-6">
          <input type="text" id="modal-search-input" placeholder="Type a game name, math topic, animal, spelling word..." class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-indigo-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 font-semibold text-lg" />
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl select-none">✨</span>
        </div>
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Matching Games</div>
        <div id="modal-search-results" class="space-y-1.5 max-h-80 overflow-y-auto pr-1"></div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white pt-16 pb-12 px-4 sm:px-6 border-t border-slate-800 mt-16">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-4xl p-2 rounded-2xl bg-indigo-900 border border-indigo-700 select-none">🦊</span>
              <span class="text-2xl font-black font-display tracking-tight">Kids <span class="text-indigo-400">Games</span></span>
            </div>
            <p class="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
              Part of the <strong>CalcuPortal</strong> network. 100 free educational games for kids aged 4–12 to master math, language, science, and logic.
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold">
              <span>🛡️</span> 100% Free & Child-Safe Platform
            </div>
          </div>
          <div>
            <h4 class="text-sm font-black text-slate-200 uppercase tracking-wider mb-4 font-display">Subjects</h4>
            <ul class="space-y-2 text-xs sm:text-sm font-semibold text-slate-400">
              <li><a href="#{rel_root}math-games/" class="hover:text-white transition-colors">Math Games</a></li>
              <li><a href="#{rel_root}english-games/" class="hover:text-white transition-colors">English & Phonics</a></li>
              <li><a href="#{rel_root}science-games/" class="hover:text-white transition-colors">Science & Nature</a></li>
              <li><a href="#{rel_root}spelling-games/" class="hover:text-white transition-colors">Spelling Games</a></li>
              <li><a href="#{rel_root}logic-games/" class="hover:text-white transition-colors">Logic & Brain</a></li>
              <li><a href="#{rel_root}geography-games/" class="hover:text-white transition-colors">Geography Games</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-black text-slate-200 uppercase tracking-wider mb-4 font-display">Ages</h4>
            <ul class="space-y-2 text-xs sm:text-sm font-semibold text-slate-400">
              <li><a href="#{rel_root}games-for-4-year-olds/" class="hover:text-white transition-colors">Games for 4 Year Olds</a></li>
              <li><a href="#{rel_root}games-for-6-year-olds/" class="hover:text-white transition-colors">Games for 6 Year Olds</a></li>
              <li><a href="#{rel_root}games-for-8-year-olds/" class="hover:text-white transition-colors">Games for 8 Year Olds</a></li>
              <li><a href="#{rel_root}games-for-10-year-olds/" class="hover:text-white transition-colors">Games for 10 Year Olds</a></li>
              <li><a href="#{rel_root}games-for-12-year-olds/" class="hover:text-white transition-colors">Games for 12 Year Olds</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-black text-slate-200 uppercase tracking-wider mb-4 font-display">Network & Trust</h4>
            <ul class="space-y-2 text-xs sm:text-sm font-semibold text-slate-400">
              <li><a href="https://www.calcuportal.com/" class="hover:text-indigo-400 font-bold text-white transition-colors">🌐 CalcuPortal.com</a></li>
              <li><a href="#{rel_root}parents/" class="hover:text-indigo-400 font-bold text-white transition-colors">👨‍👩‍👧 Parents & Educators</a></li>
              <li><a href="#{rel_root}progress/" class="hover:text-white transition-colors">My Trophy Room</a></li>
              <li><a href="#{rel_root}games/" class="hover:text-white transition-colors">All 100 Games</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© 2026 CalcuPortal. All educational games built for joyful learning.</p>
          <p>COPPA & GDPR-K Aligned • Zero Tracking • 100% Free</p>
        </div>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="#{rel_root}js/data/badges-data.js"></script>
    <script src="#{rel_root}js/data/categories-data.js"></script>
    <script src="#{rel_root}js/data/ages-data.js"></script>
    <script src="#{rel_root}js/data/games-math.js"></script>
    <script src="#{rel_root}js/data/games-english.js"></script>
    <script src="#{rel_root}js/data/games-science.js"></script>
    <script src="#{rel_root}js/data/games-logic.js"></script>
    <script src="#{rel_root}js/data/games-geography.js"></script>
    <script src="#{rel_root}js/data/games-creativity.js"></script>
    <script src="#{rel_root}js/data/games-fast.js"></script>
    <script src="#{rel_root}js/data/games-data.js"></script>

    <script src="#{rel_root}js/core/sound-engine.js"></script>
    <script src="#{rel_root}js/core/confetti-engine.js"></script>
    <script src="#{rel_root}js/core/progress-manager.js"></script>
    <script src="#{rel_root}js/core/router.js"></script>

    <script src="#{rel_root}js/games/engines/quiz-engine.js"></script>
    <script src="#{rel_root}js/games/engines/drag-drop-engine.js"></script>
    <script src="#{rel_root}js/games/engines/word-spelling-engine.js"></script>
    <script src="#{rel_root}js/games/engines/memory-engine.js"></script>
    <script src="#{rel_root}js/games/engines/arcade-catcher-engine.js"></script>
    <script src="#{rel_root}js/games/engines/pattern-sequence-engine.js"></script>
    <script src="#{rel_root}js/games/engines/speed-typing-engine.js"></script>
    <script src="#{rel_root}js/games/engines/maze-nav-engine.js"></script>
    <script src="#{rel_root}js/games/engines/canvas-art-engine.js"></script>
    <script src="#{rel_root}js/games/engines/tangram-shape-engine.js"></script>
    <script src="#{rel_root}js/games/engines/sudoku-logic-engine.js"></script>
    <script src="#{rel_root}js/games/engines/map-geography-engine.js"></script>
    <script src="#{rel_root}js/games/engines/quest-engine.js"></script>
    <script src="#{rel_root}js/games/game-runner.js"></script>

    <script src="#{rel_root}js/views/home-view.js"></script>
    <script src="#{rel_root}js/views/games-view.js"></script>
    <script src="#{rel_root}js/views/subject-view.js"></script>
    <script src="#{rel_root}js/views/age-view.js"></script>
    <script src="#{rel_root}js/views/progress-view.js"></script>
    <script src="#{rel_root}js/views/parents-view.js"></script>

    <script src="#{rel_root}js/app.js"></script>
    #{extra_script}
  </body>
  </html>
  HTML
end

# 1. Generate 100 Individual Game HTML Pages
puts "Generating 100 individual game SEO pages..."
GAMES.each do |g|
  dir = File.join(ROOT_DIR, "games", g[:slug])
  FileUtils.mkdir_p(dir)

  title = "#{g[:title]} — Free #{g[:category].capitalize} Game for Kids (Ages #{g[:age_range]}) | CalcuPortal"
  desc = "Play #{g[:title]} online for free! #{g[:description]} Safe, ad-free educational game for children aged #{g[:age_range]}."
  canonical = "#{BASE_URL}/games/#{g[:slug]}/"

  schema_json = <<~JSON
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "#{g[:title]}",
      "url": "#{canonical}",
      "description": "#{g[:description]}",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "audience": {
        "@type": "PeopleAudience",
        "suggestedMinAge": #{g[:min_age]},
        "suggestedMaxAge": #{g[:max_age]}
      }
    }
    </script>
  JSON

  # Find related games in same category
  related = GAMES.select { |x| x[:category] == g[:category] && x[:id] != g[:id] }.take(4)
  related_html = related.map do |rg|
    <<~HTML
      <div class="bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100">#{rg[:icon]}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Ages #{rg[:age_range]}</span>
          </div>
          <h4 class="font-bold text-slate-800 text-base mb-1 font-display">#{rg[:title]}</h4>
          <p class="text-slate-500 text-xs font-medium line-clamp-2">#{rg[:description]}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-slate-100 flex justify-end">
          <a href="../../games/#{rg[:slug]}/" class="btn-chubby btn-primary px-4 py-1.5 text-xs">Play ▶</a>
        </div>
      </div>
    HTML
  end.join("\n")

  body_content = <<~HTML
    <div class="max-w-4xl mx-auto py-6 px-3 sm:px-6">
      
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-4" aria-label="Breadcrumb">
        <a href="../../#/" class="hover:text-indigo-600">Home</a>
        <span>›</span>
        <a href="../../#{g[:category]}-games/" class="capitalize hover:text-indigo-600">#{g[:category]} Games</a>
        <span>›</span>
        <span class="text-slate-800 font-extrabold">#{g[:title]}</span>
      </nav>

      <!-- Game Top Card -->
      <header class="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3 sm:gap-4">
          <span class="text-4xl sm:text-5xl select-none p-3 rounded-2xl bg-indigo-50 border border-indigo-100">#{g[:icon]}</span>
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <h1 class="text-2xl sm:text-3xl font-black text-slate-800 font-display">#{g[:title]}</h1>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-700 uppercase">#{g[:category]}</span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Ages #{g[:age_range]}</span>
            </div>
            <p class="text-slate-500 text-xs sm:text-sm font-medium">#{g[:description]}</p>
          </div>
        </div>
      </header>

      <!-- Interactive Playable Game Viewport -->
      <div id="standalone-game-container" class="min-h-[460px]">
        <div class="w-full h-80 flex items-center justify-center bg-white rounded-3xl shadow-xl border border-slate-200">
          <div class="text-center">
            <span class="text-5xl block mb-2 animate-bounce-soft">🎮</span>
            <div class="text-slate-600 font-bold">Loading #{g[:title]}...</div>
          </div>
        </div>
      </div>

      <!-- Rich SEO Educational Content & Instructions -->
      <article class="mt-12 space-y-8">
        
        <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <h2 class="text-xl sm:text-2xl font-black text-slate-800 font-display mb-3">
            📖 How to Play #{g[:title]}
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            #{g[:instructions]}
          </p>
          <div class="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-900 text-sm font-semibold flex items-center gap-3">
            <span class="text-2xl">💡</span>
            <span>Tip: Switch difficulty between <strong>Easy</strong>, <strong>Medium</strong>, and <strong>Hard</strong> to challenge your cognitive skills!</span>
          </div>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <h3 class="text-lg font-extrabold text-slate-800 font-display mb-3 flex items-center gap-2">
              <span>🎯</span> Learning Objectives
            </h3>
            <ul class="space-y-2 text-sm text-slate-600">
              #{g[:objectives].map { |o| "<li class='flex items-center gap-2'><span class='text-emerald-500 font-bold'>✓</span> #{o}</li>" }.join("\n")}
            </ul>
          </div>

          <div class="bg-indigo-50/60 rounded-3xl p-6 shadow-sm border border-indigo-100">
            <h3 class="text-lg font-extrabold text-indigo-950 font-display mb-2 flex items-center gap-2">
              <span>👨‍👩‍👧</span> Parent & Teacher Insight
            </h3>
            <p class="text-xs sm:text-sm text-indigo-900/80 leading-relaxed">
              #{g[:title]} strengthens foundational #{g[:category]} competence and active cognitive recall. It is completely ad-free, COPPA aligned, and safe for independent learning at home or in class.
            </p>
          </div>
        </section>

        <!-- Related Games -->
        <section>
          <h3 class="text-2xl font-black text-slate-900 font-display mb-4">
            More #{g[:category].capitalize} Games You'll Love
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            #{related_html}
          </div>
        </section>

      </article>

    </div>
  HTML

  extra_script = <<~JS
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if (window.GameRunner) {
          const runner = new window.GameRunner('standalone-game-container');
          runner.loadGame('#{g[:slug]}', 'easy');
        }
      });
    </script>
  JS

  html = render_html_page(
    title: title,
    description: desc,
    canonical_url: canonical,
    rel_root: "../../",
    og_type: "game",
    schema_json: schema_json,
    body_content: body_content,
    extra_script: extra_script
  )

  File.write(File.join(dir, "index.html"), html)
end

# 2. Generate 9 Subject Landing Pages
puts "Generating 9 subject hub SEO pages..."
CATEGORIES.each do |cat|
  dir = File.join(ROOT_DIR, cat[:slug])
  FileUtils.mkdir_p(dir)

  title = "#{cat[:name]} for Kids (Free Online Games) | CalcuPortal"
  desc = "Play 10+ free #{cat[:name]} for kids aged 4-12. #{cat[:desc]} 100% free, child-safe, and educational on CalcuPortal."
  canonical = "#{BASE_URL}/#{cat[:slug]}/"

  cat_games = GAMES.select { |g| g[:category] == cat[:id] || (cat[:id] == 'english' && g[:category] == 'spelling') || (cat[:id] == 'gk' && g[:category] == 'geography') }
  games_html = cat_games.map do |g|
    <<~HTML
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">#{g[:icon]}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase">#{g[:difficulty]}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Ages #{g[:age_range]}</span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display">#{g[:title]}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">#{g[:description]}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400">Objectives: #{g[:objectives][0]}</span>
          <a href="../games/#{g[:slug]}/" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play ▶
          </a>
        </div>
      </div>
    HTML
  end.join("\n")

  body_content = <<~HTML
    <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-6">
        <a href="../#/" class="hover:text-indigo-600">Home</a>
        <span>›</span>
        <span class="text-slate-800">#{cat[:name]}</span>
      </nav>

      <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br #{cat[:color]} text-white shadow-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
        <div class="max-w-xl">
          <span class="text-xs font-black bg-white/25 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3 backdrop-blur-sm">
            Educational Hub
          </span>
          <h1 class="text-3xl sm:text-5xl font-black font-display mb-3">#{cat[:name]} for Kids</h1>
          <p class="text-white/90 font-medium text-base sm:text-lg leading-relaxed mb-6">
            #{cat[:desc]}
          </p>
          <a href="../games/" class="btn-chubby bg-white text-slate-900 hover:bg-slate-50 px-8 py-3.5 text-base shadow-lg inline-block">
            Browse All 100 Games ➔
          </a>
        </div>
        <div class="text-7xl sm:text-9xl select-none animate-bounce-soft">#{cat[:icon]}</div>
      </div>

      <div class="mb-14">
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-6">
          Playable #{cat[:name]}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          #{games_html}
        </div>
      </div>

    </div>
  HTML

  html = render_html_page(
    title: title,
    description: desc,
    canonical_url: canonical,
    rel_root: "../",
    og_type: "website",
    body_content: body_content
  )

  File.write(File.join(dir, "index.html"), html)
end

# 3. Generate 9 Age Hub Pages
puts "Generating 9 age hub SEO pages..."
AGES.each do |a|
  dir = File.join(ROOT_DIR, a[:slug])
  FileUtils.mkdir_p(dir)

  title = "#{a[:title]} (Free Educational Games) | CalcuPortal"
  desc = "Free online educational games specifically curated for #{a[:age]} year old kids. #{a[:desc]}"
  canonical = "#{BASE_URL}/#{a[:slug]}/"

  age_games = GAMES.select { |g| a[:age] >= g[:min_age] && a[:age] <= g[:max_age] }.take(16)
  games_html = age_games.map do |g|
    <<~HTML
      <div class="game-card-hover bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-4xl p-3 rounded-2xl bg-slate-50 border border-slate-100 select-none">#{g[:icon]}</span>
            <div class="flex flex-col items-end gap-1">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 uppercase">#{g[:category]}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Ages #{g[:age_range]}</span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-800 mb-1 font-display">${g[:title]}</h3>
          <p class="text-slate-500 text-xs sm:text-sm font-medium mb-4 line-clamp-2">#{g[:description]}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-400">Diff: #{g[:difficulty]}</span>
          <a href="../games/#{g[:slug]}/" class="btn-chubby btn-primary px-5 py-2 text-sm">
            Play ▶
          </a>
        </div>
      </div>
    HTML
  end.join("\n")

  body_content = <<~HTML
    <div class="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      <nav class="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-6">
        <a href="../#/" class="hover:text-indigo-600">Home</a>
        <span>›</span>
        <span class="text-slate-800">#{a[:title]}</span>
      </nav>

      <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br #{a[:theme]} text-white shadow-2xl mb-12 flex flex-wrap items-center justify-between gap-6">
        <div class="max-w-xl">
          <span class="text-xs font-black bg-white/25 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3 backdrop-blur-sm">
            Age #{a[:age]} Learning Hub
          </span>
          <h1 class="text-3xl sm:text-5xl font-black font-display mb-3">#{a[:title]}</h1>
          <p class="text-white/95 font-medium text-base sm:text-lg leading-relaxed mb-6">
            #{a[:desc]}
          </p>
        </div>
        <div class="text-7xl sm:text-9xl select-none animate-bounce-soft">#{a[:icon]}</div>
      </div>

      <div class="mb-14">
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-6">
          Recommended Games for Age #{a[:age]}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          #{games_html}
        </div>
      </div>

    </div>
  HTML

  html = render_html_page(
    title: title,
    description: desc,
    canonical_url: canonical,
    rel_root: "../",
    og_type: "website",
    body_content: body_content
  )

  File.write(File.join(dir, "index.html"), html)
end

# 4. Generate Core Directory Page: games/index.html
puts "Generating games/index.html catalog page..."
FileUtils.mkdir_p(File.join(ROOT_DIR, "games"))
games_catalog_content = <<~HTML
  <div id="games-directory-mount"></div>
HTML
extra_catalog_script = <<~JS
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.GamesView) {
        const view = new window.GamesView('main-content-mount');
        view.render();
      }
    });
  </script>
JS
html_catalog = render_html_page(
  title: "All 100 Free Educational Kids Games Catalog | CalcuPortal",
  description: "Browse all 100 interactive educational games for kids aged 4–12. Math, spelling, reading, science, logic puzzles, and geography.",
  canonical_url: "#{BASE_URL}/games/",
  rel_root: "../",
  body_content: games_catalog_content,
  extra_script: extra_catalog_script
)
File.write(File.join(ROOT_DIR, "games/index.html"), html_catalog)

# 5. Generate Progress & Badges Page: progress/index.html
puts "Generating progress/index.html page..."
FileUtils.mkdir_p(File.join(ROOT_DIR, "progress"))
extra_progress_script = <<~JS
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.ProgressView) {
        const view = new window.ProgressView('main-content-mount');
        view.render();
      }
    });
  </script>
JS
html_progress = render_html_page(
  title: "My Learning Trophies & Badges — Kids Learning Games | CalcuPortal",
  description: "Track your stars, high scores, daily learning streak, and achievement badges on CalcuPortal Kids Games.",
  canonical_url: "#{BASE_URL}/progress/",
  rel_root: "../",
  body_content: '<div id="progress-mount"></div>',
  extra_script: extra_progress_script
)
File.write(File.join(ROOT_DIR, "progress/index.html"), html_progress)

# 6. Generate Parents Portal Page: parents/index.html
puts "Generating parents/index.html page..."
FileUtils.mkdir_p(File.join(ROOT_DIR, "parents"))
extra_parents_script = <<~JS
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.ParentsView) {
        const view = new window.ParentsView('main-content-mount');
        view.render();
      }
    });
  </script>
JS
html_parents = render_html_page(
  title: "Parents & Educators Guide — Kids Learning Games | CalcuPortal",
  description: "Pedagogy, cognitive science, screen-time guidance, and safety pledge for CalcuPortal Kids Learning Games.",
  canonical_url: "#{BASE_URL}/parents/",
  rel_root: "../",
  body_content: '<div id="parents-mount"></div>',
  extra_script: extra_parents_script
)
File.write(File.join(ROOT_DIR, "parents/index.html"), html_parents)

# 7. Generate Master XML Sitemap
puts "Generating full master XML sitemap with 120+ URLs..."
sitemap_xml = <<~XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Hub Pages -->
  <url>
    <loc>#{BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>#{BASE_URL}/games/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>#{BASE_URL}/progress/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>#{BASE_URL}/parents/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Subject Hub Pages -->
#{CATEGORIES.map { |c| "  <url>\n    <loc>#{BASE_URL}/#{c[:slug]}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>" }.join("\n")}

  <!-- Age Hub Pages -->
#{AGES.map { |a| "  <url>\n    <loc>#{BASE_URL}/#{a[:slug]}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>" }.join("\n")}

  <!-- All 100 Playable Games -->
#{GAMES.map { |g| "  <url>\n    <loc>#{BASE_URL}/games/#{g[:slug]}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>" }.join("\n")}
</urlset>
XML

File.write(File.join(ROOT_DIR, "sitemap.xml"), sitemap_xml)
puts "✅ SUCCESS! Generated 100 game SEO pages, 9 subject pages, 9 age pages, 3 hub pages, and master XML sitemap."
