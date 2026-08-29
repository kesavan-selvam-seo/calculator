// progress-manager.js - Privacy-preserving local progress and gamification tracker

class ProgressManager {
  constructor() {
    this.storageKey = 'klg_user_progress_v1';
    this.state = this.loadState();
    this.updateStreak();
  }

  loadState() {
    const defaultState = {
      totalStars: 0,
      totalPoints: 0,
      gamesPlayedTotal: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      unlockedBadges: [],
      gameScores: {}, // { [gameId]: { bestScore, bestStars, timesPlayed, lastPlayed } }
      categoryCounts: {}, // { math: 3, english: 2, etc. }
      perfectMathGames: 0,
      threeStarGames: 0,
      dailyQuestsCompleted: 0,
      dailyQuestDate: null,
      dailyQuestDone: false
    };

    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        return { ...defaultState, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, using session memory.');
    }
    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}

    // Dispatch update event for UI reactivity
    window.dispatchEvent(new CustomEvent('klg_progress_updated', { detail: this.state }));
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.state.lastActiveDate;

    if (!lastDate) {
      this.state.lastActiveDate = today;
      this.state.streakDays = 1;
      this.saveState();
      return;
    }

    if (lastDate === today) {
      // Same day, keep streak
      return;
    }

    const last = new Date(lastDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      this.state.streakDays = (this.state.streakDays || 0) + 1;
    } else if (diffDays > 1) {
      // Missed a day
      this.state.streakDays = 1;
    }

    this.state.lastActiveDate = today;

    // Reset daily challenge state if day changed
    if (this.state.dailyQuestDate !== today) {
      this.state.dailyQuestDate = today;
      this.state.dailyQuestDone = false;
    }

    this.saveState();
  }

  recordGameCompletion(game, score, maxScore, stars, timeSeconds = 0) {
    if (!game) return { newBadges: [], pointsEarned: 0 };

    const gameId = game.id;
    const category = (game.category || 'general').toLowerCase();
    const isPerfect = score >= maxScore && maxScore > 0;

    // Calculate points (e.g. 50 base + 20 per star + score)
    const pointsEarned = Math.round(score * 10 + (stars * 20));

    this.state.totalPoints = (this.state.totalPoints || 0) + pointsEarned;
    this.state.gamesPlayedTotal = (this.state.gamesPlayedTotal || 0) + 1;

    // Update category counts
    this.state.categoryCounts = this.state.categoryCounts || {};
    this.state.categoryCounts[category] = (this.state.categoryCounts[category] || 0) + 1;

    if (stars === 3) {
      this.state.threeStarGames = (this.state.threeStarGames || 0) + 1;
      if (category === 'math') {
        this.state.perfectMathGames = (this.state.perfectMathGames || 0) + 1;
      }
    }

    // Update game record
    this.state.gameScores = this.state.gameScores || {};
    const existing = this.state.gameScores[gameId] || { bestScore: 0, bestStars: 0, timesPlayed: 0 };
    
    // Increment stars difference only if higher than previous best
    const starsDifference = Math.max(0, stars - (existing.bestStars || 0));
    this.state.totalStars = (this.state.totalStars || 0) + starsDifference;

    this.state.gameScores[gameId] = {
      bestScore: Math.max(existing.bestScore || 0, score),
      bestStars: Math.max(existing.bestStars || 0, stars),
      timesPlayed: (existing.timesPlayed || 0) + 1,
      lastPlayed: new Date().toISOString()
    };

    // Check newly unlocked badges
    const newBadges = this.checkBadges();

    this.saveState();

    return {
      newBadges,
      pointsEarned,
      starsEarned: stars,
      starsDifference,
      isPerfect
    };
  }

  checkBadges() {
    const newlyUnlocked = [];
    if (!window.BADGES_DATA) return newlyUnlocked;

    const currentUnlocked = new Set(this.state.unlockedBadges || []);

    window.BADGES_DATA.forEach(badge => {
      if (!currentUnlocked.has(badge.id)) {
        try {
          if (badge.check(this.state)) {
            newlyUnlocked.push(badge);
            this.state.unlockedBadges.push(badge.id);
          }
        } catch (e) {
          console.error('Error evaluating badge:', badge.id, e);
        }
      }
    });

    return newlyUnlocked;
  }

  completeDailyQuest() {
    const today = new Date().toISOString().split('T')[0];
    if (this.state.dailyQuestDone && this.state.dailyQuestDate === today) {
      return false;
    }

    this.state.dailyQuestDate = today;
    this.state.dailyQuestDone = true;
    this.state.dailyQuestsCompleted = (this.state.dailyQuestsCompleted || 0) + 1;
    this.state.totalPoints = (this.state.totalPoints || 0) + 100;
    this.state.totalStars = (this.state.totalStars || 0) + 3;

    const newBadges = this.checkBadges();
    this.saveState();
    return { newBadges, bonusPoints: 100, bonusStars: 3 };
  }

  getGameProgress(gameId) {
    return (this.state.gameScores && this.state.gameScores[gameId]) || { bestScore: 0, bestStars: 0, timesPlayed: 0 };
  }

  getStats() {
    return {
      ...this.state,
      unlockedBadgesList: (window.BADGES_DATA || []).filter(b => (this.state.unlockedBadges || []).includes(b.id)),
      allBadgesList: window.BADGES_DATA || []
    };
  }

  resetAllProgress() {
    localStorage.removeItem(this.storageKey);
    this.state = this.loadState();
    this.saveState();
  }
}

window.progressManager = new ProgressManager();
