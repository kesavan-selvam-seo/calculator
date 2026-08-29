// games-fast.js - Fast & Skill-Based Games (Games 91–100)

window.GAMES_FAST = [
  {
    id: 'g91',
    title: 'Typing Race',
    slug: 'typing-race',
    category: 'fast',
    subcategory: 'Typing',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🏎️',
    colorTheme: 'red',
    description: 'Type words accurately to boost your racecar ahead of competitors to the finish line!',
    instructions: 'Type the displayed words as quickly and accurately as you can using your keyboard.',
    learningObjectives: ['Touch typing agility', 'Keyboard fluency', 'Spelling speed'],
    gameType: 'speed-typing',
    seoTitle: 'Typing Race — Fast Keyboard Typing Game for Kids',
    seoDescription: 'Race cars down the track by typing words accurately and quickly.',
    levels: {
      easy: { words: ['cat', 'dog', 'sun', 'hat', 'run', 'fox', 'cup', 'red', 'big', 'car'], targetWpm: 15 },
      medium: { words: ['planet', 'rocket', 'castle', 'dolphin', 'jungle', 'rainbow', 'dragon', 'guitar'], targetWpm: 25 },
      hard: { words: ['astronaut', 'knowledge', 'dinosaur', 'environment', 'telescope', 'adventure', 'celebration'], targetWpm: 40 }
    }
  },
  {
    id: 'g92',
    title: 'Reaction Tap',
    slug: 'reaction-tap',
    category: 'fast',
    subcategory: 'Reflexes',
    ageRange: '5–12',
    minAge: 5,
    maxAge: 12,
    difficulty: 'Easy',
    icon: '⚡',
    colorTheme: 'amber',
    description: 'Test your lightning reflexes! Tap the target immediately when the light turns GREEN!',
    instructions: 'Wait for the signal to switch from Red to Green and tap instantly.',
    learningObjectives: ['Motor reaction time', 'Inhibition control', 'Focus & attention'],
    gameType: 'speed-typing',
    seoTitle: 'Reaction Tap — Kids Reflex & Reaction Time Game',
    seoDescription: 'Test how fast your reaction reflexes are with fun visual tap challenges.',
    levels: {
      easy: { rounds: 5, timeWindow: 2000 },
      medium: { rounds: 7, timeWindow: 1200 },
      hard: { rounds: 10, timeWindow: 700 }
    }
  },
  {
    id: 'g93',
    title: 'Quick Count',
    slug: 'quick-count',
    category: 'fast',
    subcategory: 'Subitizing',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '⏱️',
    colorTheme: 'blue',
    description: 'Rapidly count groups of flashing stars and objects before the swift timer ends!',
    instructions: 'Count the items on screen instantly and tap the matching number.',
    learningObjectives: ['Subitizing (instant visual quantity recognition)', 'Rapid counting', 'Speed numeracy'],
    gameType: 'quiz',
    seoTitle: 'Quick Count — Speed Counting Game for Children',
    seoDescription: 'Count objects under a fast timer to sharpen visual subitizing skills.',
    levels: {
      easy: [
        { prompt: 'Quick! How many stars? ⭐ ⭐ ⭐ ⭐', visualCount: 4, options: [3, 4, 5, 6], answer: 4 },
        { prompt: 'Quick! How many diamonds? 💎 💎 💎', visualCount: 3, options: [2, 3, 4, 5], answer: 3 },
        { prompt: 'Quick! How many apples? 🍎 🍎 🍎 🍎 🍎', visualCount: 5, options: [4, 5, 6, 7], answer: 5 }
      ],
      medium: [
        { prompt: 'Count quickly: 🎈 🎈 🎈 🎈 🎈 🎈 🎈', visualCount: 7, options: [6, 7, 8, 9], answer: 7 },
        { prompt: 'Count quickly: 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀', visualCount: 8, options: [7, 8, 9, 10], answer: 8 },
        { prompt: 'Count quickly: 🚗 🚗 🚗 🚗 🚗 🚗', visualCount: 6, options: [5, 6, 7, 8], answer: 6 }
      ],
      hard: [
        { prompt: 'Instant count: ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡ ⚡', visualCount: 12, options: [10, 11, 12, 13], answer: 12 },
        { prompt: 'Instant count: 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓 🍓', visualCount: 14, options: [13, 14, 15, 16], answer: 14 }
      ]
    }
  },
  {
    id: 'g94',
    title: 'Memory Sequence',
    slug: 'memory-sequence',
    category: 'fast',
    subcategory: 'Memory',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🔁',
    colorTheme: 'purple',
    description: 'Watch the sequence of glowing musical tiles and repeat them in rapid succession!',
    instructions: 'Tap the tiles in the exact order they flashed.',
    learningObjectives: ['Working memory span', 'Sequential reproduction', 'Auditory-visual recall'],
    gameType: 'pattern-sequence',
    seoTitle: 'Memory Sequence — Fast Sequence Recall Game for Kids',
    seoDescription: 'Test your sequential memory with rapidly expanding patterns.',
    levels: {
      easy: [
        { prompt: 'Repeat: 1 -> 2 -> 3', items: ['Tile 1', 'Tile 2', 'Tile 3'], correctOrder: ['Tile 1', 'Tile 2', 'Tile 3'] },
        { prompt: 'Repeat: 4 -> 1 -> 4', items: ['Tile 4', 'Tile 1', 'Tile 4 (b)'], correctOrder: ['Tile 4', 'Tile 1', 'Tile 4 (b)'] }
      ],
      medium: [
        { prompt: 'Repeat 4 steps: A -> B -> C -> D', items: ['Tile A', 'Tile B', 'Tile C', 'Tile D'], correctOrder: ['Tile A', 'Tile B', 'Tile C', 'Tile D'] },
        { prompt: 'Repeat 5 steps: 2 -> 4 -> 1 -> 3 -> 2', items: ['2a', '4', '1', '3', '2b'], correctOrder: ['2a', '4', '1', '3', '2b'] }
      ],
      hard: [
        { prompt: 'Repeat 6 steps: Red -> Blue -> Green -> Yellow -> Orange -> Purple', items: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'], correctOrder: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple'] }
      ]
    }
  },
  {
    id: 'g95',
    title: 'Balloon Letter Pop',
    slug: 'balloon-letter-pop',
    category: 'fast',
    subcategory: 'Phonics',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🎈',
    colorTheme: 'rose',
    description: 'Pop floating helium balloons carrying requested letters or sight words!',
    instructions: 'Click only on balloons that have the target letter before they float away.',
    learningObjectives: ['Letter identification', 'Visual target tracking', 'Speed recognition'],
    gameType: 'arcade-catcher',
    seoTitle: 'Balloon Letter Pop — Early Phonics Balloon Popping Game',
    seoDescription: 'Pop colorful balloons containing target alphabet letters.',
    levels: {
      easy: { targetRule: 'Pop letter "A" balloons 🎈', targetValues: ['A'], speed: 2, totalItems: 10 },
      medium: { targetRule: 'Pop Vowel balloons (A, E, I, O, U) 🎈', targetType: 'vowels', speed: 3, totalItems: 12 },
      hard: { targetRule: 'Pop Consonant blends (St, Br, Ch, Sh) 🎈', targetType: 'blends', speed: 4, totalItems: 15 }
    }
  },
  {
    id: 'g96',
    title: 'Catch the Correct Answer',
    slug: 'catch-the-correct-answer',
    category: 'fast',
    subcategory: 'Arcade',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🎮',
    colorTheme: 'emerald',
    description: 'Maneuver your hero to catch correct answers falling from the sky while dodging wrong ones!',
    instructions: 'Move with Arrow keys or touch buttons to catch answers that solve the equation at the top.',
    learningObjectives: ['Dynamic problem solving', 'Hand-eye coordination', 'Fast arithmetic calculation'],
    gameType: 'arcade-catcher',
    seoTitle: 'Catch the Correct Answer — Arcade Math Catcher Game',
    seoDescription: 'Move your character to catch right answers while dodging obstacles.',
    levels: {
      easy: { targetRule: 'Solve: 5 + 3 = ? (Catch 8)', targetValues: [8], speed: 2, totalItems: 10 },
      medium: { targetRule: 'Solve: 7 × 6 = ? (Catch 42)', targetValues: [42], speed: 3, totalItems: 12 },
      hard: { targetRule: 'Solve: 100 - 37 = ? (Catch 63)', targetValues: [63], speed: 4, totalItems: 15 }
    }
  },
  {
    id: 'g97',
    title: 'Flashcard Challenge',
    slug: 'flashcard-challenge',
    category: 'fast',
    subcategory: 'Flashcards',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '📇',
    colorTheme: 'cyan',
    description: 'Rapid-fire digital flashcards! How many facts can you answer in 60 seconds?',
    instructions: 'Quickly answer each flashcard before the rapid timer ticks down.',
    learningObjectives: ['Fact automaticity', 'Rapid retrieval', 'Confidence building'],
    gameType: 'quiz',
    seoTitle: 'Flashcard Challenge — 60-Second Rapid Fire Quiz Game',
    seoDescription: 'Test mental math, capitals, and vocabulary in rapid 60-second flashcard rounds.',
    levels: {
      easy: [
        { prompt: 'Flashcard: 2 + 2 = ?', options: [4, 5, 3, 6], answer: 4 },
        { prompt: 'Flashcard: 5 + 5 = ?', options: [10, 11, 9, 8], answer: 10 },
        { prompt: 'Flashcard: 3 + 4 = ?', options: [7, 6, 8, 9], answer: 7 },
        { prompt: 'Flashcard: 10 - 4 = ?', options: [6, 5, 7, 8], answer: 6 },
        { prompt: 'Flashcard: 6 + 3 = ?', options: [9, 8, 10, 7], answer: 9 }
      ],
      medium: [
        { prompt: 'Flashcard: 6 × 4 = ?', options: [24, 20, 28, 22], answer: 24 },
        { prompt: 'Flashcard: 8 × 7 = ?', options: [56, 54, 58, 62], answer: 56 },
        { prompt: 'Flashcard: 45 ÷ 5 = ?', options: [9, 8, 7, 10], answer: 9 },
        { prompt: 'Flashcard: 9 × 9 = ?', options: [81, 72, 89, 91], answer: 81 },
        { prompt: 'Flashcard: 63 ÷ 7 = ?', options: [9, 8, 7, 6], answer: 9 }
      ],
      hard: [
        { prompt: 'Flashcard: 15 × 6 = ?', options: [90, 80, 85, 95], answer: 90 },
        { prompt: 'Flashcard: 144 ÷ 12 = ?', options: [12, 11, 13, 14], answer: 12 },
        { prompt: 'Flashcard: 25 × 4 = ?', options: [100, 95, 105, 110], answer: 100 },
        { prompt: 'Flashcard: 84 ÷ 7 = ?', options: [12, 11, 13, 14], answer: 12 },
        { prompt: 'Flashcard: 13 × 7 = ?', options: [91, 89, 93, 97], answer: 91 }
      ]
    }
  },
  {
    id: 'g98',
    title: 'Treasure Hunt Quiz',
    slug: 'treasure-hunt-quiz',
    category: 'gk',
    subcategory: 'Adventure',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🏴‍☠️',
    colorTheme: 'amber',
    description: 'Solve riddles across Math, Nature, and Geography to discover the pirate treasure!',
    instructions: 'Answer each clue to unlock the next island coordinate on the treasure map.',
    learningObjectives: ['Cross-curricular problem solving', 'Riddle comprehension', 'Multi-domain synthesis'],
    gameType: 'quiz',
    seoTitle: 'Treasure Hunt Quiz — Educational Quest Game for Kids',
    seoDescription: 'Follow pirate treasure clues across science, math, and geography riddles.',
    levels: {
      easy: [
        { prompt: 'Treasure Clue 1: I have 4 legs and bark, but cannot climb trees. Who am I? 🐶', options: ['Dog', 'Cat', 'Fish', 'Bird'], answer: 'Dog' },
        { prompt: 'Treasure Clue 2: Add 5 gold coins + 5 silver coins. How many total coins? 🪙', options: [10, 8, 9, 12], answer: 10 },
        { prompt: 'Treasure Clue 3: Sail to the icy continent at the South Pole! ❄️', options: ['Antarctica', 'Europe', 'Africa', 'Australia'], answer: 'Antarctica' }
      ],
      medium: [
        { prompt: 'Treasure Clue 1: What is 7 × 8 gold doubloons?', options: [56, 54, 58, 62], answer: 56 },
        { prompt: 'Treasure Clue 2: Which organ pumps blood through the pirate captain\'s veins? 🫀', options: ['Heart', 'Lungs', 'Stomach', 'Brain'], answer: 'Heart' },
        { prompt: 'Treasure Clue 3: Which gas in Earth\'s air do plants make that we breathe? 💨', options: ['Oxygen', 'Carbon Dioxide', 'Helium', 'Nitrogen'], answer: 'Oxygen' }
      ],
      hard: [
        { prompt: 'Treasure Clue 1: What is the capital of Egypt where the Great Pyramids stand? 🏜️', options: ['Cairo', 'Alexandria', 'Luxor', 'Giza'], answer: 'Cairo' },
        { prompt: 'Treasure Clue 2: Calculate: 15 × 4 + 40 = ?', options: [100, 90, 110, 120], answer: 100 },
        { prompt: 'Treasure Clue 3: Which force pulls the treasure chest down to Earth\'s ground? 🌍', options: ['Gravity', 'Magnetism', 'Friction', 'Buoyancy'], answer: 'Gravity' }
      ]
    }
  },
  {
    id: 'g99',
    title: 'Daily Learning Quest',
    slug: 'daily-learning-quest',
    category: 'fast',
    subcategory: 'Quests',
    ageRange: '5–12',
    minAge: 5,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🎯',
    colorTheme: 'teal',
    description: 'Complete a rotating trio of daily questions across Math, Reading, and Science to earn bonus stars!',
    instructions: 'Answer all 3 daily questions to complete today\'s quest and extend your daily streak.',
    learningObjectives: ['Daily learning routine', 'Multi-subject mastery', 'Habit building'],
    gameType: 'quest',
    seoTitle: 'Daily Learning Quest — Daily Brain Workout for Kids',
    seoDescription: 'A rotating daily challenge across math, science, and english for children.',
    levels: {
      easy: [
        { subject: 'Math', prompt: 'Solve: 6 + 7 = ?', options: [11, 12, 13, 14], answer: 13 },
        { subject: 'English', prompt: 'Which word rhymes with MOON? 🌙', options: ['SPOON 🥄', 'SUN ☀️', 'STAR ⭐', 'SKY ☁️'], answer: 'SPOON 🥄' },
        { subject: 'Science', prompt: 'Which planet is closest to the Sun? ☀️', options: ['Mercury', 'Venus', 'Earth', 'Mars'], answer: 'Mercury' }
      ],
      medium: [
        { subject: 'Math', prompt: 'Solve: 9 × 8 = ?', options: [70, 72, 74, 76], answer: 72 },
        { subject: 'English', prompt: 'Identify the verb in: "Cheetahs sprint across the grassland."', options: ['sprint', 'Cheetahs', 'grassland', 'across'], answer: 'sprint' },
        { subject: 'Science', prompt: 'Which state of matter is steam? 🫖', options: ['Gas', 'Liquid', 'Solid', 'Plasma'], answer: 'Gas' }
      ],
      hard: [
        { subject: 'Math', prompt: 'Solve: 125 ÷ 5 + 15 = ?', options: [40, 35, 45, 50], answer: 40 },
        { subject: 'Geography', prompt: 'What is the capital of Australia? 🇦🇺', options: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], answer: 'Canberra' },
        { subject: 'Science', prompt: 'Which organelle is known as the powerhouse of the cell? ⚡', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'], answer: 'Mitochondria' }
      ]
    }
  },
  {
    id: 'g100',
    title: 'Ultimate Kids Challenge',
    slug: 'ultimate-kids-challenge',
    category: 'fast',
    subcategory: 'Championship',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Hard',
    icon: '👑',
    colorTheme: 'purple',
    description: 'The grand championship! 5 rounds spanning Math, English, Science, Logic, and Geography for the Grandmaster Trophy!',
    instructions: 'Tackle all 5 subject championship rounds to prove your ultimate learning mastery.',
    learningObjectives: ['Comprehensive mastery', 'Cross-domain fluency', 'Cognitive resilience'],
    gameType: 'quest',
    seoTitle: 'Ultimate Kids Challenge — 5-Subject Grand Championship Game',
    seoDescription: 'The pinnacle 5-subject educational challenge for young scholars.',
    levels: {
      easy: [
        { subject: 'Math', prompt: 'Round 1 (Math): 10 + 15 = ?', options: [23, 24, 25, 26], answer: 25 },
        { subject: 'English', prompt: 'Round 2 (English): Opposite of HOT 🔥:', options: ['Cold ❄️', 'Warm', 'Sunny', 'Dry'], answer: 'Cold ❄️' },
        { subject: 'Science', prompt: 'Round 3 (Science): Which is a mammal? 🐬', options: ['Dolphin', 'Shark', 'Goldfish', 'Tuna'], answer: 'Dolphin' },
        { subject: 'Logic', prompt: 'Round 4 (Logic): 🔴 🔵 🔴 🔵 🔴 ?', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵' },
        { subject: 'Geography', prompt: 'Round 5 (Geography): Capital of France? 🇫🇷', options: ['Paris', 'Rome', 'London', 'Madrid'], answer: 'Paris' }
      ],
      medium: [
        { subject: 'Math', prompt: 'Round 1 (Math): 14 × 5 = ?', options: [65, 70, 75, 80], answer: 70 },
        { subject: 'English', prompt: 'Round 2 (English): Plural of CHILD 🧒:', options: ['Children', 'Childs', 'Childrens', 'Childes'], answer: 'Children' },
        { subject: 'Science', prompt: 'Round 3 (Science): How many bones in adult human skeleton? 🦴', options: ['206', '150', '300', '100'], answer: '206' },
        { subject: 'Logic', prompt: 'Round 4 (Logic): Odd one out: 4, 8, 12, 17, 20', options: ['17 (Odd)', '4', '8', '12'], answer: '17 (Odd)' },
        { subject: 'Geography', prompt: 'Round 5 (Geography): Which is the longest river in the world? 🏞️', options: ['Nile River', 'Amazon River', 'Yangtze', 'Mississippi'], answer: 'Nile River' }
      ],
      hard: [
        { subject: 'Math', prompt: 'Round 1 (Math): Solve: 16 × 8 - 28 = ?', options: [100, 98, 102, 108], answer: 100 },
        { subject: 'English', prompt: 'Round 2 (English): Synonym for ASTONISHING:', options: ['Surprising', 'Boring', 'Common', 'Slow'], answer: 'Surprising' },
        { subject: 'Science', prompt: 'Round 3 (Science): What is the speed of light in vacuum? 🚀', options: ['~300,000 km/s', '3,000 km/s', '1,000 km/s', 'Sound speed'], answer: '~300,000 km/s' },
        { subject: 'Logic', prompt: 'Round 4 (Logic): Next in Fibonacci: 1, 1, 2, 3, 5, 8, ?', options: [13, 11, 12, 15], answer: 13 },
        { subject: 'Geography', prompt: 'Round 5 (Geography): Deepest point in Earth\'s oceans? 🌊', options: ['Mariana Trench (Challenger Deep)', 'Puerto Rico Trench', 'Java Trench', 'Tonga Trench'], answer: 'Mariana Trench (Challenger Deep)' }
      ]
    }
  }
];
