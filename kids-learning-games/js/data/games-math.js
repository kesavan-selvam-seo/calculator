// games-math.js - Math & Number Games (Games 1–20)

window.GAMES_MATH = [
  {
    id: 'g1',
    title: 'Number Catcher',
    slug: 'number-catcher',
    category: 'math',
    subcategory: 'Numbers',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🧺',
    colorTheme: 'blue',
    description: 'Catch the falling target numbers in your magic basket before they hit the ground!',
    instructions: 'Move your basket left and right using Arrow keys, screen buttons, or mouse to catch only the target numbers.',
    learningObjectives: ['Number recognition', 'Target number identification', 'Hand-eye coordination'],
    gameType: 'arcade-catcher',
    seoTitle: 'Number Catcher — Free Online Math Game for Kids',
    seoDescription: 'Move your basket to catch target numbers in this exciting math arcade game for kids.',
    levels: {
      easy: { targetRule: 'Catch number 5', targetValues: [5], speed: 2, totalItems: 10 },
      medium: { targetRule: 'Catch Even numbers', targetType: 'even', speed: 3, totalItems: 12 },
      hard: { targetRule: 'Catch Multiples of 3', targetType: 'multiples_3', speed: 4, totalItems: 15 }
    }
  },
  {
    id: 'g2',
    title: 'Count the Apples',
    slug: 'count-the-apples',
    category: 'math',
    subcategory: 'Counting',
    ageRange: '4–6',
    minAge: 4,
    maxAge: 6,
    difficulty: 'Easy',
    icon: '🍎',
    colorTheme: 'red',
    description: 'Count the fresh apples on the tree and tap the correct number.',
    instructions: 'Count all the red apples in the orchard and click the matching number card below.',
    learningObjectives: ['One-to-one counting', 'Quantity-numeral association', 'Early numeracy'],
    gameType: 'quiz',
    seoTitle: 'Count the Apples — Early Counting Game for Preschoolers',
    seoDescription: 'Fun apple counting game for young children learning numbers 1 to 15.',
    levels: {
      easy: [
        { prompt: 'Count the apples on the branch!', visualCount: 3, item: '🍎', options: [2, 3, 4, 5], answer: 3 },
        { prompt: 'How many apples do you see?', visualCount: 5, item: '🍎', options: [4, 5, 6, 3], answer: 5 },
        { prompt: 'Count the juicy apples!', visualCount: 2, item: '🍎', options: [1, 2, 3, 4], answer: 2 },
        { prompt: 'Count all the apples!', visualCount: 4, item: '🍎', options: [3, 4, 5, 6], answer: 4 },
        { prompt: 'How many apples in the basket?', visualCount: 6, item: '🍎', options: [5, 6, 7, 8], answer: 6 }
      ],
      medium: [
        { prompt: 'Count the bright apples!', visualCount: 8, item: '🍎', options: [7, 8, 9, 10], answer: 8 },
        { prompt: 'How many apples?', visualCount: 7, item: '🍎', options: [6, 7, 8, 9], answer: 7 },
        { prompt: 'Count them carefully!', visualCount: 9, item: '🍎', options: [8, 9, 10, 11], answer: 9 },
        { prompt: 'Count the apples!', visualCount: 10, item: '🍎', options: [9, 10, 11, 12], answer: 10 },
        { prompt: 'How many apples on the tree?', visualCount: 12, item: '🍎', options: [11, 12, 13, 14], answer: 12 }
      ],
      hard: [
        { prompt: 'Count both red and green apples!', visualCount: 14, item: '🍎', options: [13, 14, 15, 16], answer: 14 },
        { prompt: 'How many apples in total?', visualCount: 15, item: '🍎', options: [14, 15, 16, 17], answer: 15 },
        { prompt: 'Count the orchard apples!', visualCount: 16, item: '🍎', options: [15, 16, 17, 18], answer: 16 },
        { prompt: 'How many apples are here?', visualCount: 18, item: '🍎', options: [17, 18, 19, 20], answer: 18 },
        { prompt: 'Count the harvest basket!', visualCount: 20, item: '🍎', options: [18, 19, 20, 21], answer: 20 }
      ]
    }
  },
  {
    id: 'g3',
    title: 'Addition Adventure',
    slug: 'addition-adventure',
    category: 'math',
    subcategory: 'Addition',
    ageRange: '5–8',
    minAge: 5,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '➕',
    colorTheme: 'emerald',
    description: 'Travel along the adventure path by solving addition challenges!',
    instructions: 'Add the two numbers together and choose the right answer to step forward on your journey.',
    learningObjectives: ['Addition fluency', 'Mental math sums', 'Basic arithmetic confidence'],
    gameType: 'quiz',
    seoTitle: 'Addition Adventure — Fun Online Addition Math Game',
    seoDescription: 'Solve addition sums to guide your hero along the adventure trail.',
    levels: {
      easy: [
        { prompt: '2 + 3 = ?', options: [4, 5, 6, 7], answer: 5 },
        { prompt: '4 + 1 = ?', options: [3, 4, 5, 6], answer: 5 },
        { prompt: '3 + 3 = ?', options: [5, 6, 7, 8], answer: 6 },
        { prompt: '5 + 2 = ?', options: [6, 7, 8, 9], answer: 7 },
        { prompt: '6 + 4 = ?', options: [9, 10, 11, 12], answer: 10 }
      ],
      medium: [
        { prompt: '8 + 7 = ?', options: [14, 15, 16, 17], answer: 15 },
        { prompt: '9 + 6 = ?', options: [14, 15, 16, 17], answer: 15 },
        { prompt: '12 + 5 = ?', options: [16, 17, 18, 19], answer: 17 },
        { prompt: '15 + 8 = ?', options: [21, 22, 23, 24], answer: 23 },
        { prompt: '14 + 11 = ?', options: [23, 24, 25, 26], answer: 25 }
      ],
      hard: [
        { prompt: '28 + 17 = ?', options: [43, 44, 45, 46], answer: 45 },
        { prompt: '35 + 29 = ?', options: [62, 63, 64, 65], answer: 64 },
        { prompt: '47 + 38 = ?', options: [83, 84, 85, 86], answer: 85 },
        { prompt: '56 + 49 = ?', options: [103, 104, 105, 106], answer: 105 },
        { prompt: '74 + 68 = ?', options: [140, 142, 144, 146], answer: 142 }
      ]
    }
  },
  {
    id: 'g4',
    title: 'Subtraction Smash',
    slug: 'subtraction-smash',
    category: 'math',
    subcategory: 'Subtraction',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '➖',
    colorTheme: 'amber',
    description: 'Smash through subtraction problems to unlock rewards!',
    instructions: 'Calculate the difference and select the correct answer to smash the target.',
    learningObjectives: ['Subtraction fluency', 'Mental subtraction', 'Number differences'],
    gameType: 'quiz',
    seoTitle: 'Subtraction Smash — Interactive Subtraction Game for Kids',
    seoDescription: 'Smash subtraction questions and build essential math calculation skills.',
    levels: {
      easy: [
        { prompt: '5 - 2 = ?', options: [2, 3, 4, 1], answer: 3 },
        { prompt: '7 - 3 = ?', options: [3, 4, 5, 6], answer: 4 },
        { prompt: '8 - 4 = ?', options: [3, 4, 5, 6], answer: 4 },
        { prompt: '9 - 5 = ?', options: [3, 4, 5, 6], answer: 4 },
        { prompt: '10 - 6 = ?', options: [3, 4, 5, 6], answer: 4 }
      ],
      medium: [
        { prompt: '15 - 7 = ?', options: [7, 8, 9, 10], answer: 8 },
        { prompt: '18 - 9 = ?', options: [8, 9, 10, 11], answer: 9 },
        { prompt: '20 - 12 = ?', options: [6, 7, 8, 9], answer: 8 },
        { prompt: '25 - 14 = ?', options: [9, 10, 11, 12], answer: 11 },
        { prompt: '32 - 15 = ?', options: [15, 16, 17, 18], answer: 17 }
      ],
      hard: [
        { prompt: '54 - 28 = ?', options: [24, 25, 26, 27], answer: 26 },
        { prompt: '72 - 35 = ?', options: [35, 36, 37, 38], answer: 37 },
        { prompt: '81 - 47 = ?', options: [32, 33, 34, 35], answer: 34 },
        { prompt: '93 - 58 = ?', options: [33, 34, 35, 36], answer: 35 },
        { prompt: '120 - 65 = ?', options: [50, 55, 60, 65], answer: 55 }
      ]
    }
  },
  {
    id: 'g5',
    title: 'Multiplication Monster',
    slug: 'multiplication-monster',
    category: 'math',
    subcategory: 'Multiplication',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '👾',
    colorTheme: 'purple',
    description: 'Tame friendly math monsters by solving multiplication tables correctly.',
    instructions: 'Multiply the numbers and pick the right answer to defeat each monster round.',
    learningObjectives: ['Times tables mastery', 'Mental multiplication', 'Quick calculation'],
    gameType: 'quiz',
    seoTitle: 'Multiplication Monster — Times Tables Game for Kids',
    seoDescription: 'Master multiplication times tables while taming colorful monster buddies.',
    levels: {
      easy: [
        { prompt: '2 × 3 = ?', options: [5, 6, 7, 8], answer: 6 },
        { prompt: '3 × 4 = ?', options: [10, 12, 14, 16], answer: 12 },
        { prompt: '5 × 5 = ?', options: [20, 25, 30, 35], answer: 25 },
        { prompt: '2 × 8 = ?', options: [14, 16, 18, 20], answer: 16 },
        { prompt: '10 × 4 = ?', options: [30, 40, 50, 60], answer: 40 }
      ],
      medium: [
        { prompt: '6 × 7 = ?', options: [40, 42, 44, 48], answer: 42 },
        { prompt: '7 × 8 = ?', options: [54, 56, 58, 62], answer: 56 },
        { prompt: '8 × 9 = ?', options: [70, 72, 74, 76], answer: 72 },
        { prompt: '9 × 6 = ?', options: [52, 54, 56, 58], answer: 54 },
        { prompt: '8 × 8 = ?', options: [60, 62, 64, 66], answer: 64 }
      ],
      hard: [
        { prompt: '12 × 11 = ?', options: [130, 132, 134, 136], answer: 132 },
        { prompt: '14 × 6 = ?', options: [80, 82, 84, 86], answer: 84 },
        { prompt: '15 × 8 = ?', options: [110, 120, 130, 140], answer: 120 },
        { prompt: '16 × 7 = ?', options: [108, 110, 112, 114], answer: 112 },
        { prompt: '25 × 5 = ?', options: [115, 120, 125, 130], answer: 125 }
      ]
    }
  },
  {
    id: 'g6',
    title: 'Division Dash',
    slug: 'division-dash',
    category: 'math',
    subcategory: 'Division',
    ageRange: '8–12',
    minAge: 8,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '➗',
    colorTheme: 'teal',
    description: 'Sprint toward victory by picking correct division answers!',
    instructions: 'Divide the numbers and choose the quotient to keep dashing ahead.',
    learningObjectives: ['Division concepts', 'Inverse multiplication', 'Quotient understanding'],
    gameType: 'quiz',
    seoTitle: 'Division Dash — Fast Online Division Math Game',
    seoDescription: 'Practice division with quick thinking challenges and fun race rewards.',
    levels: {
      easy: [
        { prompt: '6 ÷ 2 = ?', options: [2, 3, 4, 5], answer: 3 },
        { prompt: '10 ÷ 5 = ?', options: [1, 2, 3, 4], answer: 2 },
        { prompt: '12 ÷ 3 = ?', options: [3, 4, 5, 6], answer: 4 },
        { prompt: '15 ÷ 5 = ?', options: [2, 3, 4, 5], answer: 3 },
        { prompt: '20 ÷ 4 = ?', options: [4, 5, 6, 7], answer: 5 }
      ],
      medium: [
        { prompt: '36 ÷ 6 = ?', options: [5, 6, 7, 8], answer: 6 },
        { prompt: '42 ÷ 7 = ?', options: [5, 6, 7, 8], answer: 6 },
        { prompt: '56 ÷ 8 = ?', options: [6, 7, 8, 9], answer: 7 },
        { prompt: '63 ÷ 9 = ?', options: [6, 7, 8, 9], answer: 7 },
        { prompt: '72 ÷ 8 = ?', options: [7, 8, 9, 10], answer: 9 }
      ],
      hard: [
        { prompt: '96 ÷ 8 = ?', options: [11, 12, 13, 14], answer: 12 },
        { prompt: '108 ÷ 9 = ?', options: [11, 12, 13, 14], answer: 12 },
        { prompt: '135 ÷ 5 = ?', options: [25, 27, 29, 31], answer: 27 },
        { prompt: '144 ÷ 12 = ?', options: [10, 11, 12, 13], answer: 12 },
        { prompt: '225 ÷ 15 = ?', options: [13, 14, 15, 16], answer: 15 }
      ]
    }
  },
  {
    id: 'g7',
    title: 'Number Ordering Race',
    slug: 'number-ordering-race',
    category: 'math',
    subcategory: 'Ordering',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🔢',
    colorTheme: 'cyan',
    description: 'Sort numbers in ascending (smallest to largest) order.',
    instructions: 'Tap numbers in the correct sequence from smallest to largest.',
    learningObjectives: ['Number magnitude', 'Ascending/descending order', 'Sequencing'],
    gameType: 'pattern-sequence',
    seoTitle: 'Number Ordering Race — Math Sequencing Game for Kids',
    seoDescription: 'Sort numbers into the correct ascending or descending order.',
    levels: {
      easy: [
        { prompt: 'Arrange from smallest to largest', items: [4, 1, 3, 2], correctOrder: [1, 2, 3, 4] },
        { prompt: 'Arrange from smallest to largest', items: [8, 5, 7, 6], correctOrder: [5, 6, 7, 8] },
        { prompt: 'Arrange from smallest to largest', items: [10, 2, 6, 4], correctOrder: [2, 4, 6, 10] }
      ],
      medium: [
        { prompt: 'Arrange from smallest to largest', items: [24, 12, 35, 18], correctOrder: [12, 18, 24, 35] },
        { prompt: 'Arrange from smallest to largest', items: [45, 19, 52, 33], correctOrder: [19, 33, 45, 52] },
        { prompt: 'Arrange from smallest to largest', items: [88, 67, 95, 74], correctOrder: [67, 74, 88, 95] }
      ],
      hard: [
        { prompt: 'Arrange from smallest to largest', items: [142, 98, 215, 105], correctOrder: [98, 105, 142, 215] },
        { prompt: 'Arrange from smallest to largest', items: [320, 180, 450, 290], correctOrder: [180, 290, 320, 450] },
        { prompt: 'Arrange from smallest to largest', items: [840, 520, 910, 730], correctOrder: [520, 730, 840, 910] }
      ]
    }
  },
  {
    id: 'g8',
    title: 'Missing Number Mystery',
    slug: 'missing-number-mystery',
    category: 'math',
    subcategory: 'Equations',
    ageRange: '6–10',
    minAge: 6,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '🕵️‍♂️',
    colorTheme: 'indigo',
    description: 'Find the hidden number that makes the equation true!',
    instructions: 'Look at the question mark in the equation and pick the missing number.',
    learningObjectives: ['Algebraic thinking', 'Inverse operations', 'Equation balance'],
    gameType: 'quiz',
    seoTitle: 'Missing Number Mystery — Math Equation Logic Game',
    seoDescription: 'Solve missing numbers in algebraic equations and number sequences.',
    levels: {
      easy: [
        { prompt: '4 + ? = 9', options: [4, 5, 6, 7], answer: 5 },
        { prompt: '? + 3 = 8', options: [4, 5, 6, 7], answer: 5 },
        { prompt: '10 - ? = 6', options: [3, 4, 5, 6], answer: 4 },
        { prompt: '? - 2 = 7', options: [8, 9, 10, 11], answer: 9 },
        { prompt: '6 + ? = 12', options: [5, 6, 7, 8], answer: 6 }
      ],
      medium: [
        { prompt: '15 + ? = 32', options: [15, 16, 17, 18], answer: 17 },
        { prompt: '? × 4 = 28', options: [6, 7, 8, 9], answer: 7 },
        { prompt: '45 - ? = 27', options: [16, 17, 18, 19], answer: 18 },
        { prompt: '6 × ? = 54', options: [7, 8, 9, 10], answer: 9 },
        { prompt: '? ÷ 5 = 7', options: [30, 35, 40, 45], answer: 35 }
      ],
      hard: [
        { prompt: '3 × ? + 4 = 25', options: [5, 6, 7, 8], answer: 7 },
        { prompt: '50 - 2 × ? = 32', options: [8, 9, 10, 11], answer: 9 },
        { prompt: '? ÷ 4 + 12 = 20', options: [28, 32, 36, 40], answer: 32 },
        { prompt: '4 × ? - 8 = 36', options: [9, 10, 11, 12], answer: 11 },
        { prompt: '72 ÷ ? + 6 = 15', options: [6, 7, 8, 9], answer: 8 }
      ]
    }
  },
  {
    id: 'g9',
    title: 'Number Sequence Builder',
    slug: 'number-sequence-builder',
    category: 'math',
    subcategory: 'Patterns',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '📈',
    colorTheme: 'violet',
    description: 'Discover the pattern rule and place the next number in sequence!',
    instructions: 'Find the step rule (e.g. +2, +5, ×2) and select the number that comes next.',
    learningObjectives: ['Pattern recognition', 'Skip counting', 'Mathematical deduction'],
    gameType: 'quiz',
    seoTitle: 'Number Sequence Builder — Pattern Math Game for Children',
    seoDescription: 'Complete number patterns and discover skip counting rules.',
    levels: {
      easy: [
        { prompt: '2, 4, 6, 8, ?', options: [9, 10, 11, 12], answer: 10 },
        { prompt: '5, 10, 15, 20, ?', options: [22, 24, 25, 30], answer: 25 },
        { prompt: '10, 20, 30, 40, ?', options: [45, 50, 55, 60], answer: 50 },
        { prompt: '3, 6, 9, 12, ?', options: [13, 14, 15, 16], answer: 15 },
        { prompt: '1, 3, 5, 7, ?', options: [8, 9, 10, 11], answer: 9 }
      ],
      medium: [
        { prompt: '4, 8, 12, 16, ?', options: [18, 20, 22, 24], answer: 20 },
        { prompt: '20, 17, 14, 11, ?', options: [7, 8, 9, 10], answer: 8 },
        { prompt: '2, 4, 8, 16, ?', options: [24, 28, 30, 32], answer: 32 },
        { prompt: '100, 90, 80, 70, ?', options: [50, 55, 60, 65], answer: 60 },
        { prompt: '7, 14, 21, 28, ?', options: [32, 34, 35, 36], answer: 35 }
      ],
      hard: [
        { prompt: '1, 4, 9, 16, ?', options: [20, 24, 25, 30], answer: 25 },
        { prompt: '3, 6, 12, 24, ?', options: [36, 42, 48, 52], answer: 48 },
        { prompt: '1, 1, 2, 3, 5, 8, ?', options: [11, 12, 13, 14], answer: 13 },
        { prompt: '80, 40, 20, 10, ?', options: [2, 4, 5, 6], answer: 5 },
        { prompt: '2, 5, 11, 23, ?', options: [44, 45, 46, 47], answer: 47 }
      ]
    }
  },
  {
    id: 'g10',
    title: 'Math Bubble Pop',
    slug: 'math-bubble-pop',
    category: 'math',
    subcategory: 'Speed Math',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '🫧',
    colorTheme: 'sky',
    description: 'Pop floating bubbles that match the target math answer!',
    instructions: 'Read the math question and pop only the bubble displaying the right answer.',
    learningObjectives: ['Mental speed', 'Fast arithmetic', 'Visual focus'],
    gameType: 'arcade-catcher',
    seoTitle: 'Math Bubble Pop — Fast-Paced Bubble Popping Math Game',
    seoDescription: 'Pop math bubbles with correct answers before time runs out.',
    levels: {
      easy: { targetRule: 'Pop sums that equal 10', targetValues: [10], speed: 2, totalItems: 10 },
      medium: { targetRule: 'Pop sums that equal 24', targetValues: [24], speed: 3, totalItems: 12 },
      hard: { targetRule: 'Pop sums that equal 50', targetValues: [50], speed: 4, totalItems: 15 }
    }
  },
  {
    id: 'g11',
    title: 'Math Bingo',
    slug: 'math-bingo',
    category: 'math',
    subcategory: 'Mental Math',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🎯',
    colorTheme: 'purple',
    description: 'Solve arithmetic calls and mark the right tiles to score a Bingo!',
    instructions: 'Calculate the caller sum and tap the matching square on your 3x3 Bingo grid.',
    learningObjectives: ['Mental calculation', 'Number scanning', 'Strategy'],
    gameType: 'quiz',
    seoTitle: 'Math Bingo — Interactive Math Grid Game for Children',
    seoDescription: 'Solve math questions and complete the Bingo grid for high score stars.',
    levels: {
      easy: [
        { prompt: 'Bingo Call: 4 + 4', options: [6, 7, 8, 9], answer: 8 },
        { prompt: 'Bingo Call: 10 - 3', options: [6, 7, 8, 9], answer: 7 },
        { prompt: 'Bingo Call: 2 + 7', options: [8, 9, 10, 11], answer: 9 },
        { prompt: 'Bingo Call: 5 + 5', options: [8, 9, 10, 11], answer: 10 },
        { prompt: 'Bingo Call: 8 - 2', options: [5, 6, 7, 8], answer: 6 }
      ],
      medium: [
        { prompt: 'Bingo Call: 7 × 3', options: [18, 20, 21, 24], answer: 21 },
        { prompt: 'Bingo Call: 36 ÷ 4', options: [7, 8, 9, 10], answer: 9 },
        { prompt: 'Bingo Call: 8 × 4', options: [28, 30, 32, 36], answer: 32 },
        { prompt: 'Bingo Call: 45 ÷ 5', options: [7, 8, 9, 10], answer: 9 },
        { prompt: 'Bingo Call: 6 × 6', options: [32, 34, 36, 38], answer: 36 }
      ],
      hard: [
        { prompt: 'Bingo Call: 12 × 4', options: [44, 46, 48, 52], answer: 48 },
        { prompt: 'Bingo Call: 84 ÷ 7', options: [11, 12, 13, 14], answer: 12 },
        { prompt: 'Bingo Call: 15 × 3', options: [40, 42, 45, 48], answer: 45 },
        { prompt: 'Bingo Call: 96 ÷ 6', options: [14, 15, 16, 17], answer: 16 },
        { prompt: 'Bingo Call: 14 × 5', options: [65, 70, 75, 80], answer: 70 }
      ]
    }
  },
  {
    id: 'g12',
    title: 'Fraction Pizza',
    slug: 'fraction-pizza',
    category: 'math',
    subcategory: 'Fractions',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🍕',
    colorTheme: 'amber',
    description: 'Build mouth-watering pizzas to represent visual fractions!',
    instructions: 'Select the pizza slice portions that match the target fraction.',
    learningObjectives: ['Fraction concepts (1/2, 1/3, 1/4, 3/4)', 'Part-to-whole relationships', 'Visual fractions'],
    gameType: 'drag-drop',
    seoTitle: 'Fraction Pizza — Visual Fraction Learning Game for Kids',
    seoDescription: 'Slice and build pizzas to understand fractions in a fun, delicious way.',
    levels: {
      easy: [
        { prompt: 'Select the pizza showing 1/2 (half):', slots: ['🍕 Half', '🍕 Quarter', '🍕 Whole'], correct: '🍕 Half', options: ['🍕 Half', '🍕 Quarter', '🍕 Whole'] },
        { prompt: 'Select the pizza showing 1/4 (one quarter):', slots: ['🍕 Quarter', '🍕 Half', '🍕 3/4'], correct: '🍕 Quarter', options: ['🍕 Quarter', '🍕 Half', '🍕 3/4'] },
        { prompt: 'Select 1 whole pizza:', slots: ['🍕 Whole', '🍕 Half', '🍕 Slice'], correct: '🍕 Whole', options: ['🍕 Whole', '🍕 Half', '🍕 Slice'] }
      ],
      medium: [
        { prompt: 'Which shows 3/4 of a pizza?', slots: ['3/4 Pizza', '1/2 Pizza', '1/4 Pizza'], correct: '3/4 Pizza', options: ['3/4 Pizza', '1/2 Pizza', '1/4 Pizza'] },
        { prompt: 'Which shows 2/3 of a pizza?', slots: ['2/3 Pizza', '1/3 Pizza', '1/2 Pizza'], correct: '2/3 Pizza', options: ['2/3 Pizza', '1/3 Pizza', '1/2 Pizza'] },
        { prompt: 'Which fraction equals 2/4?', slots: ['1/2', '1/3', '3/4'], correct: '1/2', options: ['1/2', '1/3', '3/4'] }
      ],
      hard: [
        { prompt: 'Which shows 5/8 of a pizza?', slots: ['5/8 Pizza', '3/8 Pizza', '7/8 Pizza'], correct: '5/8 Pizza', options: ['5/8 Pizza', '3/8 Pizza', '7/8 Pizza'] },
        { prompt: 'Which fraction is greater: 2/3 or 3/5?', slots: ['2/3', '3/5', 'Equal'], correct: '2/3', options: ['2/3', '3/5', 'Equal'] },
        { prompt: 'Add fractions: 1/4 + 2/4 = ?', slots: ['3/4', '3/8', '1/2'], correct: '3/4', options: ['3/4', '3/8', '1/2'] }
      ]
    }
  },
  {
    id: 'g13',
    title: 'Place Value Builder',
    slug: 'place-value-builder',
    category: 'math',
    subcategory: 'Place Value',
    ageRange: '6–10',
    minAge: 6,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '🏗️',
    colorTheme: 'blue',
    description: 'Construct large numbers using blocks of Ones, Tens, and Hundreds.',
    instructions: 'Identify the digit in the requested place value (ones, tens, hundreds, thousands).',
    learningObjectives: ['Place value comprehension', 'Base-10 system', 'Expanded form'],
    gameType: 'quiz',
    seoTitle: 'Place Value Builder — Math Base-10 Game for Kids',
    seoDescription: 'Master ones, tens, hundreds, and thousands place value with visual building blocks.',
    levels: {
      easy: [
        { prompt: 'In the number 47, what is in the Tens place?', options: [4, 7, 40, 70], answer: 4 },
        { prompt: 'In the number 83, what is in the Ones place?', options: [8, 3, 80, 30], answer: 3 },
        { prompt: 'What number is 3 tens and 5 ones?', options: [35, 53, 305, 8], answer: 35 },
        { prompt: 'In 92, what is the value of the 9?', options: [9, 90, 92, 900], answer: 90 },
        { prompt: 'What number is 6 tens and 0 ones?', options: [6, 60, 600, 16], answer: 60 }
      ],
      medium: [
        { prompt: 'In 582, what digit is in the Hundreds place?', options: [5, 8, 2, 500], answer: 5 },
        { prompt: 'What is the value of 7 in 472?', options: [7, 70, 700, 47], answer: 70 },
        { prompt: 'What number is 4 hundreds, 2 tens, and 8 ones?', options: [428, 482, 248, 842], answer: 428 },
        { prompt: 'In 904, which digit is in the Tens place?', options: [9, 0, 4, 90], answer: 0 },
        { prompt: 'What is 700 + 40 + 6 in standard form?', options: [746, 764, 476, 7046], answer: 746 }
      ],
      hard: [
        { prompt: 'In 3,749, what digit is in the Thousands place?', options: [3, 7, 4, 9], answer: 3 },
        { prompt: 'What is the place value of 8 in 18,245?', options: ['Thousands', 'Hundreds', 'Ten Thousands', 'Tens'], answer: 'Thousands' },
        { prompt: 'What is 5,000 + 300 + 7 in standard form?', options: [5307, 5370, 5037, 537], answer: 5307 },
        { prompt: 'In 84,219, what digit is in the Ten Thousands place?', options: [8, 4, 2, 1], answer: 8 },
        { prompt: 'Round 4,782 to the nearest hundred:', options: [4700, 4800, 5000, 4780], answer: 4800 }
      ]
    }
  },
  {
    id: 'g14',
    title: 'Greater Than / Less Than',
    slug: 'greater-than-less-than',
    category: 'math',
    subcategory: 'Comparison',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🐊',
    colorTheme: 'emerald',
    description: 'Feed the hungry alligator with >, <, or = comparison symbols!',
    instructions: 'Remember the alligator mouth always opens toward the bigger number!',
    learningObjectives: ['Number comparison', 'Greater than / less than symbols', 'Quantity evaluation'],
    gameType: 'quiz',
    seoTitle: 'Greater Than Less Than — Crocodile Math Comparison Game',
    seoDescription: 'Compare numbers with greater than (>), less than (<), and equal (=) signs.',
    levels: {
      easy: [
        { prompt: '8 [ ? ] 5', options: ['>', '<', '='], answer: '>' },
        { prompt: '3 [ ? ] 9', options: ['>', '<', '='], answer: '<' },
        { prompt: '6 [ ? ] 6', options: ['>', '<', '='], answer: '=' },
        { prompt: '12 [ ? ] 7', options: ['>', '<', '='], answer: '>' },
        { prompt: '4 [ ? ] 11', options: ['>', '<', '='], answer: '<' }
      ],
      medium: [
        { prompt: '45 [ ? ] 54', options: ['>', '<', '='], answer: '<' },
        { prompt: '78 [ ? ] 69', options: ['>', '<', '='], answer: '>' },
        { prompt: '80 + 5 [ ? ] 85', options: ['>', '<', '='], answer: '=' },
        { prompt: '3 × 4 [ ? ] 2 × 7', options: ['>', '<', '='], answer: '<' },
        { prompt: '50 - 15 [ ? ] 30', options: ['>', '<', '='], answer: '>' }
      ],
      hard: [
        { prompt: '345 [ ? ] 354', options: ['>', '<', '='], answer: '<' },
        { prompt: '12 × 8 [ ? ] 15 × 6', options: ['>', '<', '='], answer: '>' },
        { prompt: '1/2 [ ? ] 2/4', options: ['>', '<', '='], answer: '=' },
        { prompt: '3/4 [ ? ] 2/3', options: ['>', '<', '='], answer: '>' },
        { prompt: '0.75 [ ? ] 0.8', options: ['>', '<', '='], answer: '<' }
      ]
    }
  },
  {
    id: 'g15',
    title: 'Even or Odd Hunt',
    slug: 'even-or-odd-hunt',
    category: 'math',
    subcategory: 'Properties',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🔍',
    colorTheme: 'rose',
    description: 'Hunt down even or odd numbers and classify them correctly.',
    instructions: 'Numbers ending in 0, 2, 4, 6, 8 are Even! Numbers ending in 1, 3, 5, 7, 9 are Odd!',
    learningObjectives: ['Even and odd properties', 'Divisibility by 2', 'Parity identification'],
    gameType: 'quiz',
    seoTitle: 'Even or Odd Hunt — Fun Math Parity Game for Kids',
    seoDescription: 'Identify even and odd numbers with fast classification challenges.',
    levels: {
      easy: [
        { prompt: 'Is 6 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' },
        { prompt: 'Is 7 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' },
        { prompt: 'Is 10 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' },
        { prompt: 'Is 3 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' },
        { prompt: 'Is 8 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' }
      ],
      medium: [
        { prompt: 'Is 24 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' },
        { prompt: 'Is 37 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' },
        { prompt: 'Is 55 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' },
        { prompt: 'Is 68 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' },
        { prompt: 'Is 91 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' }
      ],
      hard: [
        { prompt: 'Is 348 Even or Odd?', options: ['Even', 'Odd'], answer: 'Even' },
        { prompt: 'Is 759 Even or Odd?', options: ['Even', 'Odd'], answer: 'Odd' },
        { prompt: 'What is an Even number + an Odd number?', options: ['Always Odd', 'Always Even', 'Sometimes Even'], answer: 'Always Odd' },
        { prompt: 'What is an Even number × an Odd number?', options: ['Always Even', 'Always Odd', 'Neither'], answer: 'Always Even' },
        { prompt: 'Is 1,234,567 Even or Odd?', options: ['Odd', 'Even'], answer: 'Odd' }
      ]
    }
  },
  {
    id: 'g16',
    title: 'Shape Math',
    slug: 'shape-math',
    category: 'math',
    subcategory: 'Geometry',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '📐',
    colorTheme: 'indigo',
    description: 'Count sides, corners, and solve geometric math riddles!',
    instructions: 'Examine the geometric shapes and calculate the requested vertices, sides, or perimeters.',
    learningObjectives: ['2D & 3D shape properties', 'Sides and vertices counting', 'Basic perimeter'],
    gameType: 'quiz',
    seoTitle: 'Shape Math — Geometric Properties Math Game for Kids',
    seoDescription: 'Solve fun geometry challenges by counting shape sides, corners, and angles.',
    levels: {
      easy: [
        { prompt: 'How many sides does a Triangle have? 🔺', options: [2, 3, 4, 5], answer: 3 },
        { prompt: 'How many corners does a Rectangle have? ▭', options: [3, 4, 5, 6], answer: 4 },
        { prompt: 'How many sides does a Circle have? ⚪', options: [0, 1, 2, 4], answer: 0 },
        { prompt: 'How many sides does a Pentagon have? ⬟', options: [4, 5, 6, 7], answer: 5 },
        { prompt: 'How many corners does a Square have? 🟩', options: [3, 4, 5, 6], answer: 4 }
      ],
      medium: [
        { prompt: 'How many sides does a Hexagon have? ⬡', options: [5, 6, 7, 8], answer: 6 },
        { prompt: 'How many sides does an Octagon have? 🛑', options: [6, 7, 8, 9], answer: 8 },
        { prompt: 'If each side of a square is 4cm, what is its perimeter?', options: [8, 12, 16, 20], answer: 16 },
        { prompt: 'How many faces does a Cube have? 🎲', options: [4, 6, 8, 12], answer: 6 },
        { prompt: 'A triangle with all 3 equal sides is called:', options: ['Equilateral', 'Isosceles', 'Scalene', 'Right'], answer: 'Equilateral' }
      ],
      hard: [
        { prompt: 'How many edges does a cube have?', options: [8, 10, 12, 14], answer: 12 },
        { prompt: 'What is the sum of angles inside any triangle?', options: ['90°', '180°', '270°', '360°'], answer: '180°' },
        { prompt: 'Find the perimeter of a rectangle with length 7cm and width 4cm:', options: [11, 22, 28, 44], answer: 22 },
        { prompt: 'What is the name of an 8-sided 3D shape (polyhedron)?', options: ['Octahedron', 'Decahedron', 'Dodecahedron', 'Cube'], answer: 'Octahedron' },
        { prompt: 'What is the area of a square with side length 6cm?', options: [24, 30, 36, 42], answer: 36 }
      ]
    }
  },
  {
    id: 'g17',
    title: 'Measurement Match',
    slug: 'measurement-match',
    category: 'math',
    subcategory: 'Measurement',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '📏',
    colorTheme: 'teal',
    description: 'Match everyday objects to suitable units of length, weight, and capacity.',
    instructions: 'Choose the best measuring unit (cm, m, kg, grams, liters) for each object.',
    learningObjectives: ['Metric measurement units', 'Estimation skills', 'Real-world math application'],
    gameType: 'quiz',
    seoTitle: 'Measurement Match — Units of Measurement Kids Game',
    seoDescription: 'Learn meters, kilograms, liters, and centimeters in real-life measurement situations.',
    levels: {
      easy: [
        { prompt: 'Which unit is best to measure a pencil’s length? ✏️', options: ['Centimeters (cm)', 'Meters (m)', 'Kilometers (km)', 'Kilograms (kg)'], answer: 'Centimeters (cm)' },
        { prompt: 'Which unit is best to measure water in a drinking bottle? 💧', options: ['Milliliters / Liters', 'Grams', 'Meters', 'Centimeters'], answer: 'Milliliters / Liters' },
        { prompt: 'Which unit is best to weigh an apple? 🍎', options: ['Grams (g)', 'Kilometers (km)', 'Liters (L)', 'Meters (m)'], answer: 'Grams (g)' },
        { prompt: 'How many centimeters are in 1 meter?', options: [10, 50, 100, 1000], answer: 100 },
        { prompt: 'Which unit measures how heavy an elephant is? 🐘', options: ['Kilograms (kg)', 'Centimeters', 'Milliliters', 'Seconds'], answer: 'Kilograms (kg)' }
      ],
      medium: [
        { prompt: 'How many grams (g) in 1 kilogram (kg)?', options: [100, 500, 1000, 10000], answer: 1000 },
        { prompt: 'How many milliliters (ml) in 1 liter (L)?', options: [100, 500, 1000, 2000], answer: 1000 },
        { prompt: 'Distance between two distant cities is measured in:', options: ['Kilometers (km)', 'Centimeters (cm)', 'Millimeters (mm)', 'Meters (m)'], answer: 'Kilometers (km)' },
        { prompt: 'Convert 3.5 meters to centimeters:', options: [35, 350, 3500, 305], answer: 350 },
        { prompt: 'A bathtub holds approximately how much water?', options: [150 Liters', '150 Milliliters', '150 Grams', '150 Meters'], answer: '150 Liters' }
      ],
      hard: [
        { prompt: 'Convert 2,500 grams into kilograms:', options: ['2.5 kg', '25 kg', '0.25 kg', '250 kg'], answer: '2.5 kg' },
        { prompt: 'How many millimeters are in 15 centimeters?', options: [15, 150, 1500, 1.5], answer: 150 },
        { prompt: 'What is 4.2 km in meters?', options: [42, 420, 4200, 42000], answer: 4200 },
        { prompt: 'If a jug holds 750ml, how much more is needed to make 1 Liter?', options: ['250ml', '350ml', '150ml', '500ml'], answer: '250ml' },
        { prompt: 'What temperature does pure water freeze at? ❄️', options: ['0°C', '10°C', '32°C', '100°C'], answer: '0°C' }
      ]
    }
  },
  {
    id: 'g18',
    title: 'Money Counting Game',
    slug: 'money-counting-game',
    category: 'math',
    subcategory: 'Money',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🪙',
    colorTheme: 'emerald',
    description: 'Count coins and currency notes to buy awesome toy rewards!',
    instructions: 'Sum up the coins and notes shown on screen and pick the total amount.',
    learningObjectives: ['Coin and currency recognition', 'Financial math', 'Addition of money values'],
    gameType: 'quiz',
    seoTitle: 'Money Counting Game — Kids Financial Math Game',
    seoDescription: 'Count coins, dollar/rupee notes, and calculate shopping totals in this fun money game.',
    levels: {
      easy: [
        { prompt: 'What is the sum of two $1 coins + one $5 note? 💵', options: ['$5', '$6', '$7', '$8'], answer: '$7' },
        { prompt: 'How many $1 coins make $10?', options: [5, 10, 15, 20], answer: 10 },
        { prompt: 'You have a $10 bill and spend $4. How much change do you get?', options: ['$4', '$5', '$6', '$7'], answer: '$6' },
        { prompt: 'What is $2 + $2 + $1?', options: ['$4', '$5', '$6', '$7'], answer: '$5' },
        { prompt: 'Which note has higher value?', options: ['$20 Note', '$10 Note', '$5 Note', '$1 Coin'], answer: '$20 Note' }
      ],
      medium: [
        { prompt: 'Count: 3 × $10 notes + 2 × $5 notes = ?', options: ['$35', '$40', '$45', '$50'], answer: '$40' },
        { prompt: 'A book costs $14. You pay with a $20 note. Your change is:', options: ['$4', '$6', '$8', '$10'], answer: '$6' },
        { prompt: 'How many 25-cent quarters make $1.00?', options: [2, 3, 4, 5], answer: 4 },
        { prompt: 'Count: 4 × $20 notes + 1 × $10 note = ?', options: ['$80', '$90', '$100', '$110'], answer: '$90' },
        { prompt: 'If 3 apples cost $6, how much does 1 apple cost?', options: ['$1', '$2', '$3', '$4'], answer: '$2' }
      ],
      hard: [
        { prompt: 'Count: 5 × $20 + 3 × $50 + 4 × $5 = ?', options: ['$250', '$270', '$280', '$300'], answer: '$270' },
        { prompt: 'You buy an item for $34.50 and pay $50. Your change is:', options: ['$15.50', '$16.50', '$14.50', '$15.00'], answer: '$15.50' },
        { prompt: 'How many $5 notes are in $125?', options: [20, 25, 30, 35], answer: 25 },
        { prompt: 'If 4 toy cars cost $28, how much do 6 toy cars cost?', options: ['$36', '$40', '$42', '$44'], answer: '$42' },
        { prompt: 'What is 10% discount on a $60 game?', options: ['$6 off', '$10 off', '$12 off', '$15 off'], answer: '$6 off' }
      ]
    }
  },
  {
    id: 'g19',
    title: 'Clock Time Challenge',
    slug: 'clock-time-challenge',
    category: 'math',
    subcategory: 'Time',
    ageRange: '6–10',
    minAge: 6,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '⏰',
    colorTheme: 'purple',
    description: 'Read analog clocks and tell time like a master timekeeper!',
    instructions: 'Check where the short hour hand and long minute hand point and pick the time.',
    learningObjectives: ['Analog clock reading', 'Hours and minutes', 'Time intervals (half past, quarter to)'],
    gameType: 'quiz',
    seoTitle: 'Clock Time Challenge — Learn to Tell Time Game for Kids',
    seoDescription: 'Master telling time on analog and digital clocks with interactive challenges.',
    levels: {
      easy: [
        { prompt: 'Short hand on 3, long hand on 12. What time is it? 🕒', options: ['3:00', '12:00', '3:30', '12:15'], answer: '3:00' },
        { prompt: 'Short hand on 7, long hand on 12. What time is it? 🕖', options: ['6:00', '7:00', '8:00', '7:30'], answer: '7:00' },
        { prompt: 'Short hand between 4 and 5, long hand on 6. What time is it? 🕟', options: ['4:00', '4:30', '5:30', '5:00'], answer: '4:30' },
        { prompt: 'How many minutes are in 1 hour?', options: [30, 60, 100, 24], answer: 60 },
        { prompt: 'How many hours in a full day?', options: [12, 24, 48, 60], answer: 24 }
      ],
      medium: [
        { prompt: 'Long hand on 3 represents how many minutes past the hour?', options: ['5 mins', '10 mins', '15 mins (quarter past)', '30 mins'], answer: '15 mins (quarter past)' },
        { prompt: 'Short hand past 8, long hand on 9. What time is it?', options: ['8:45 (quarter to 9)', '9:45', '8:15', '9:15'], answer: '8:45 (quarter to 9)' },
        { prompt: 'If movie starts at 2:15 and lasts 45 minutes, it finishes at:', options: ['2:45', '3:00', '3:15', '3:30'], answer: '3:00' },
        { prompt: 'How many seconds are in 1 minute?', options: [30, 60, 100, 120], answer: 60 },
        { prompt: 'What time is 2 hours after 10:30 AM?', options: ['11:30 AM', '12:30 PM', '1:30 PM', '12:00 PM'], answer: '12:30 PM' }
      ],
      hard: [
        { prompt: 'A train leaves at 7:40 AM and arrives at 9:15 AM. Trip duration is:', options: ['1 hr 25 mins', '1 hr 35 mins', '1 hr 45 mins', '2 hrs'], answer: '1 hr 35 mins' },
        { prompt: 'How many days are in a standard leap year?', options: [364, 365, 366, 367], answer: 366 },
        { prompt: 'How many hours are in 1 week (7 days)?', options: [144, 168, 180, 200], answer: 168 },
        { prompt: 'What is 15:45 in 12-hour AM/PM clock time?', options: ['3:45 AM', '3:45 PM', '5:45 PM', '4:45 PM'], answer: '3:45 PM' },
        { prompt: 'How many days are in the month of July?', options: [28, 30, 31, 29], answer: 31 }
      ]
    }
  },
  {
    id: 'g20',
    title: 'Math Maze',
    slug: 'math-maze',
    category: 'math',
    subcategory: 'Mazes',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🌀',
    colorTheme: 'blue',
    description: 'Unlock maze gates by solving correct math equations along the path!',
    instructions: 'Use the D-pad or Arrow keys to guide your hero to the correct gate that solves the problem.',
    learningObjectives: ['Problem solving', 'Spatial navigation', 'Arithmetic gating'],
    gameType: 'maze-nav',
    seoTitle: 'Math Maze — Educational Maze Adventure Game',
    seoDescription: 'Navigate through maze corridors and solve math puzzles to reach the exit portal.',
    levels: {
      easy: { mazeSize: 4, questions: [{ equation: '3 + 4', answer: 7 }, { equation: '8 - 2', answer: 6 }] },
      medium: { mazeSize: 6, questions: [{ equation: '6 × 4', answer: 24 }, { equation: '20 ÷ 5', answer: 4 }] },
      hard: { mazeSize: 8, questions: [{ equation: '14 × 3', answer: 42 }, { equation: '72 ÷ 8', answer: 9 }] }
    }
  }
];
