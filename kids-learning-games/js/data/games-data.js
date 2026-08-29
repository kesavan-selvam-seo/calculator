// games-data.js - Master aggregator and query utilities for all 100 learning games

(function() {
  function aggregateGames() {
    const math = window.GAMES_MATH || [];
    const english = window.GAMES_ENGLISH || [];
    const science = window.GAMES_SCIENCE || [];
    const logic = window.GAMES_LOGIC || [];
    const geography = window.GAMES_GEOGRAPHY || [];
    const creativity = window.GAMES_CREATIVITY || [];
    const fast = window.GAMES_FAST || [];

    const all = [
      ...math,
      ...english,
      ...science,
      ...logic,
      ...geography,
      ...creativity,
      ...fast
    ];

    window.GAMES_DATA = all;

    // Helper functions
    window.getGameBySlug = function(slug) {
      if (!slug) return null;
      const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
      return window.GAMES_DATA.find(g => g.slug === clean) || null;
    };

    window.getGameById = function(id) {
      return window.GAMES_DATA.find(g => g.id === id) || null;
    };

    window.getGamesByCategory = function(catId) {
      if (!catId || catId === 'all') return window.GAMES_DATA;
      const catLower = catId.toLowerCase().replace('-games', '');
      return window.GAMES_DATA.filter(g => {
        if (catLower === 'math') return g.category === 'math';
        if (catLower === 'english') return g.category === 'english' || g.category === 'spelling';
        if (catLower === 'spelling') return g.category === 'spelling';
        if (catLower === 'science') return g.category === 'science';
        if (catLower === 'gk') return g.category === 'gk' || g.category === 'geography';
        if (catLower === 'logic') return g.category === 'logic' || g.category === 'memory';
        if (catLower === 'geography') return g.category === 'geography';
        if (catLower === 'memory') return g.category === 'memory';
        if (catLower === 'creativity') return g.category === 'creativity';
        if (catLower === 'fast') return g.category === 'fast';
        return g.category === catLower;
      });
    };

    window.getGamesByAge = function(age) {
      const num = parseInt(age, 10);
      if (isNaN(num)) return window.GAMES_DATA;
      return window.GAMES_DATA.filter(g => num >= g.minAge && num <= g.maxAge);
    };

    window.getPopularGames = function(limit = 8) {
      // Pick top diverse games across categories
      const popularSlugs = [
        'number-catcher',
        'word-scramble',
        'memory-match',
        'shape-builder',
        'solar-system-explorer',
        'spelling-bee',
        'fraction-pizza',
        'typing-race',
        'world-map-explorer',
        'animal-habitat-match',
        'color-mixing-lab',
        'ultimate-kids-challenge'
      ];
      const found = popularSlugs.map(slug => window.getGameBySlug(slug)).filter(Boolean);
      return found.slice(0, limit);
    };

    window.searchGames = function(query) {
      if (!query || !query.trim()) return [];
      const q = query.toLowerCase().trim();
      return window.GAMES_DATA.filter(g => {
        return (
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.subcategory.toLowerCase().includes(q) ||
          (g.learningObjectives && g.learningObjectives.some(obj => obj.toLowerCase().includes(q)))
        );
      });
    };
  }

  // Run immediately and on DOM load to ensure subfiles are combined
  aggregateGames();
  window.addEventListener('DOMContentLoaded', aggregateGames);
})();
