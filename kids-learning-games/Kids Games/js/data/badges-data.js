// badges-data.js - Visual gamification badges & unlock criteria

window.BADGES_DATA = [
  {
    id: 'first_game',
    title: 'First Step!',
    icon: '🌱',
    description: 'Played your very first learning game.',
    category: 'General',
    check: (stats) => (stats.gamesPlayedTotal || 0) >= 1
  },
  {
    id: 'math_explorer',
    title: 'Math Explorer',
    icon: '➕',
    description: 'Played 3 different math games.',
    category: 'Math',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['math'] >= 3)
  },
  {
    id: 'math_champion',
    title: 'Math Champion',
    icon: '🏆',
    description: 'Scored 100% and earned 3 stars in a Math game.',
    category: 'Math',
    check: (stats) => (stats.perfectMathGames || 0) >= 1
  },
  {
    id: 'word_wizard',
    title: 'Word Wizard',
    icon: '📚',
    description: 'Completed a spelling or vocabulary game.',
    category: 'English',
    check: (stats) => (stats.categoryCounts && (stats.categoryCounts['english'] >= 1 || stats.categoryCounts['spelling'] >= 1))
  },
  {
    id: 'science_pioneer',
    title: 'Science Pioneer',
    icon: '🚀',
    description: 'Explored animals, planets, or nature in Science games.',
    category: 'Science',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['science'] >= 1)
  },
  {
    id: 'puzzle_master',
    title: 'Puzzle Master',
    icon: '🧩',
    description: 'Solved 3 logic or brain games.',
    category: 'Logic',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['logic'] >= 3)
  },
  {
    id: 'global_explorer',
    title: 'Global Explorer',
    icon: '🌍',
    description: 'Explored countries, flags, or continents in Geography.',
    category: 'Geography',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['geography'] >= 1)
  },
  {
    id: 'speed_demon',
    title: 'Speed Star',
    icon: '⚡',
    description: 'Showed lightning fast skills in a typing or reaction game.',
    category: 'Speed',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['fast'] >= 1)
  },
  {
    id: 'creative_genius',
    title: 'Creative Genius',
    icon: '🎨',
    description: 'Created art, mixed colors, or built shapes in Creativity games.',
    category: 'Creativity',
    check: (stats) => (stats.categoryCounts && stats.categoryCounts['creativity'] >= 1)
  },
  {
    id: 'perfect_score',
    title: 'Superstar!',
    icon: '⭐',
    description: 'Earned 3 gold stars in any game.',
    category: 'General',
    check: (stats) => (stats.threeStarGames || 0) >= 1
  },
  {
    id: 'star_collector_25',
    title: 'Star Collector',
    icon: '🌟',
    description: 'Collected 25 total shiny stars.',
    category: 'General',
    check: (stats) => (stats.totalStars || 0) >= 25
  },
  {
    id: 'star_collector_50',
    title: 'Cosmic Star',
    icon: '💫',
    description: 'Collected 50 total shiny stars.',
    category: 'General',
    check: (stats) => (stats.totalStars || 0) >= 50
  },
  {
    id: 'streak_3',
    title: '3-Day Streak',
    icon: '🔥',
    description: 'Played learning games 3 days in a row.',
    category: 'Habit',
    check: (stats) => (stats.streakDays || 0) >= 3
  },
  {
    id: 'daily_quest_hero',
    title: 'Quest Hero',
    icon: '🎯',
    description: 'Completed a Daily Learning Challenge.',
    category: 'General',
    check: (stats) => (stats.dailyQuestsCompleted || 0) >= 1
  },
  {
    id: 'games_10',
    title: 'Explorer 10',
    icon: '🏅',
    description: 'Played 10 different learning games.',
    category: 'General',
    check: (stats) => Object.keys(stats.gameScores || {}).length >= 10
  },
  {
    id: 'points_1000',
    title: 'Grandmaster',
    icon: '👑',
    description: 'Accumulated 1,000 total learning points.',
    category: 'Mastery',
    check: (stats) => (stats.totalPoints || 0) >= 1000
  }
];
