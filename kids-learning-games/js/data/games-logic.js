// games-logic.js - Logic, Puzzle & Brain Games (Games 56–70)

window.GAMES_LOGIC = [
  {
    id: 'g56',
    title: 'Memory Match',
    slug: 'memory-match',
    category: 'memory',
    subcategory: 'Concentration',
    ageRange: '4–12',
    minAge: 4,
    maxAge: 12,
    difficulty: 'Easy',
    icon: '🎴',
    colorTheme: 'purple',
    description: 'Flip cards and find pairs of cute animals, fruit, and emojis before time expires!',
    instructions: 'Tap two cards to flip them over. If they match, they stay unlocked!',
    learningObjectives: ['Working memory', 'Visual-spatial recognition', 'Focus and attention'],
    gameType: 'memory',
    seoTitle: 'Memory Match — Online Card Flip Game for Kids',
    seoDescription: 'Exercise your memory and concentration with colorful picture cards.',
    levels: {
      easy: { pairs: [['🦁 Lion', '🦁 Lion'], ['🐼 Panda', '🐼 Panda'], ['🦊 Fox', '🦊 Fox'], ['🐸 Frog', '🐸 Frog']] },
      medium: { pairs: [['🦁 Lion', '🦁 Lion'], ['🐼 Panda', '🐼 Panda'], ['🦊 Fox', '🦊 Fox'], ['🐸 Frog', '🐸 Frog'], ['🐵 Monkey', '🐵 Monkey'], ['🐘 Elephant', '🐘 Elephant']] },
      hard: { pairs: [['🦁 Lion', '🦁 Lion'], ['🐼 Panda', '🐼 Panda'], ['🦊 Fox', '🦊 Fox'], ['🐸 Frog', '🐸 Frog'], ['🐵 Monkey', '🐵 Monkey'], ['🐘 Elephant', '🐘 Elephant'], ['🦒 Giraffe', '🦒 Giraffe'], ['🦄 Unicorn', '🦄 Unicorn']] }
    }
  },
  {
    id: 'g57',
    title: 'Pattern Detective',
    slug: 'pattern-detective',
    category: 'logic',
    subcategory: 'Patterns',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🕵️',
    colorTheme: 'rose',
    description: 'Discover the repeating rule in shape and color patterns and pick what comes next!',
    instructions: 'Look at the pattern sequence (e.g. 🔴 🔵 🔴 🔵) and select the missing piece.',
    learningObjectives: ['Pattern recognition (AB, ABC, AABB)', 'Logical deduction', 'Predictive thinking'],
    gameType: 'quiz',
    seoTitle: 'Pattern Detective — Pattern Logic Game for Kids',
    seoDescription: 'Solve visual and shape patterns in this detective brain game.',
    levels: {
      easy: [
        { prompt: '🔴 🔵 🔴 🔵 🔴 ?', options: ['🔵', '🔴', '🟡', '🟢'], answer: '🔵' },
        { prompt: '⭐ 🌙 ⭐ 🌙 ⭐ ?', options: ['🌙', '⭐', '☀️', '☁️'], answer: '🌙' },
        { prompt: '🔺 🟩 🔺 🟩 🔺 ?', options: ['🟩', '🔺', '⚪', '⭐'], answer: '🟩' },
        { prompt: '🍎 🍌 🍎 🍌 🍎 ?', options: ['🍌', '🍎', '🍇', '🍊'], answer: '🍌' },
        { prompt: '🐱 🐶 🐱 🐶 🐱 ?', options: ['🐶', '🐱', '🐭', '🐰'], answer: '🐶' }
      ],
      medium: [
        { prompt: '🔴 🔵 🟡 🔴 🔵 🟡 🔴 ?', options: ['🔵', '🟡', '🔴', '🟢'], answer: '🔵' },
        { prompt: '🔺 🔺 🟩 🔺 🔺 🟩 🔺 ?', options: ['🔺', '🟩', '⚪', '⭐'], answer: '🔺' },
        { prompt: '⭐ ⭐ 🌙 🌙 ⭐ ⭐ ?', options: ['🌙', '⭐', '☀️', '☁️'], answer: '🌙' },
        { prompt: '🚗 🚗 🚌 🚗 🚗 🚌 🚗 ?', options: ['🚗', '🚌', '🚲', '✈️'], answer: '🚗' },
        { prompt: '🌸 🌻 🌹 🌸 🌻 🌹 🌸 ?', options: ['🌻', '🌹', '🌸', '🌷'], answer: '🌻' }
      ],
      hard: [
        { prompt: '1 2 4 8 16 ? (Rule: Double each time)', options: ['32', '24', '20', '30'], answer: '32' },
        { prompt: '🔺 (3 sides), 🟩 (4 sides), ⬟ (5 sides), ? (6 sides)', options: ['Hexagon ⬡', 'Octagon 🛑', 'Circle ⚪', 'Square 🟩'], answer: 'Hexagon ⬡' },
        { prompt: 'A C E G ? (Rule: Skip 1 letter)', options: ['I', 'H', 'J', 'K'], answer: 'I' },
        { prompt: 'Z Y X W V ? (Rule: Reverse alphabet)', options: ['U', 'T', 'S', 'Q'], answer: 'U' },
        { prompt: '1 1 2 3 5 8 ? (Rule: Sum of previous two)', options: ['13', '11', '12', '15'], answer: '13' }
      ]
    }
  },
  {
    id: 'g58',
    title: 'Odd One Out',
    slug: 'odd-one-out',
    category: 'logic',
    subcategory: 'Classification',
    ageRange: '4–10',
    minAge: 4,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🧐',
    colorTheme: 'amber',
    description: 'Find the item that does not belong with the rest in the group!',
    instructions: 'Examine all choices and select the odd one out that has different properties.',
    learningObjectives: ['Categorization', 'Attributes & properties comparison', 'Critical thinking'],
    gameType: 'quiz',
    seoTitle: 'Odd One Out — Kids Logic Classification Game',
    seoDescription: 'Spot the item that does not fit with the others in this deductive challenge.',
    levels: {
      easy: [
        { prompt: 'Which one does NOT belong? 🍎 🍌 🥕 🍇', options: ['Carrot 🥕 (Vegetable)', 'Apple 🍎', 'Banana 🍌', 'Grapes 🍇'], answer: 'Carrot 🥕 (Vegetable)' },
        { prompt: 'Which one is NOT a bird? 🦅 🐦 🐟 🦉', options: ['Fish 🐟 (Swims underwater)', 'Eagle 🦅', 'Sparrow 🐦', 'Owl 🦉'], answer: 'Fish 🐟 (Swims underwater)' },
        { prompt: 'Which one is NOT a vehicle? 🚗 🚌 🪑 🚲', options: ['Chair 🪑 (Furniture)', 'Car 🚗', 'Bus 🚌', 'Bicycle 🚲'], answer: 'Chair 🪑 (Furniture)' },
        { prompt: 'Which shape is NOT a polygon with straight sides? 🔺 🟩 ⚪ ⬟', options: ['Circle ⚪ (Curved)', 'Triangle 🔺', 'Square 🟩', 'Pentagon ⬟'], answer: 'Circle ⚪ (Curved)' },
        { prompt: 'Which one is NOT cold? 🧊 ❄️ 🍦 🔥', options: ['Campfire 🔥 (Hot)', 'Ice 🧊', 'Snow ❄️', 'Ice Cream 🍦'], answer: 'Campfire 🔥 (Hot)' }
      ],
      medium: [
        { prompt: 'Which one is NOT a mammal? 🐬 🐶 🐍 🐻', options: ['Snake 🐍 (Reptile)', 'Dolphin 🐬', 'Dog 🐶', 'Bear 🐻'], answer: 'Snake 🐍 (Reptile)' },
        { prompt: 'Which number is NOT Even? 4, 8, 12, 17, 20', options: ['17 (Odd number)', '4', '8', '12'], answer: '17 (Odd number)' },
        { prompt: 'Which planet is NOT a gas giant? Jupiter, Saturn, Mars, Neptune', options: ['Mars (Rocky terrestrial planet)', 'Jupiter', 'Saturn', 'Neptune'], answer: 'Mars (Rocky terrestrial planet)' },
        { prompt: 'Which country is NOT in Asia? Japan, India, China, Brazil', options: ['Brazil (South America)', 'Japan', 'India', 'China'], answer: 'Brazil (South America)' },
        { prompt: 'Which one is NOT a renewable energy source? Solar, Wind, Coal, Hydro', options: ['Coal (Fossil fuel)', 'Solar', 'Wind', 'Hydro'], answer: 'Coal (Fossil fuel)' }
      ],
      hard: [
        { prompt: 'Which number is NOT a Prime number? 2, 3, 5, 7, 9', options: ['9 (Divisible by 3)', '2', '3', '7'], answer: '9 (Divisible by 3)' },
        { prompt: 'Which element is NOT a noble gas? Helium, Neon, Argon, Oxygen', options: ['Oxygen (Reactive diatomic gas)', 'Helium', 'Neon', 'Argon'], answer: 'Oxygen (Reactive diatomic gas)' },
        { prompt: 'Which angle type is NOT less than 90°? Acute, Right, Obtuse, Reflex', options: ['Obtuse (Greater than 90°)', 'Acute', 'Right', 'Reflex'], answer: 'Obtuse (Greater than 90°)' },
        { prompt: 'Which one is NOT an island nation? Madagascar, Japan, Iceland, Switzerland', options: ['Switzerland (Landlocked)', 'Madagascar', 'Japan', 'Iceland'], answer: 'Switzerland (Landlocked)' },
        { prompt: 'Which organism is NOT a decomposer? Mushroom, Bacteria, Earthworm, Oak Tree', options: ['Oak Tree (Producer)', 'Mushroom', 'Bacteria', 'Earthworm'], answer: 'Oak Tree (Producer)' }
      ]
    }
  },
  {
    id: 'g59',
    title: 'Find the Difference',
    slug: 'find-the-difference',
    category: 'logic',
    subcategory: 'Observation',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '👀',
    colorTheme: 'teal',
    description: 'Compare two visual scenes and spot the subtle secret differences!',
    instructions: 'Examine both panels and tap on the clues to identify what changed.',
    learningObjectives: ['Visual discrimination', 'Attention to detail', 'Comparative analysis'],
    gameType: 'quiz',
    seoTitle: 'Find the Difference — Spot the Differences Game for Kids',
    seoDescription: 'Test your detective eyes and spot subtle differences between two pictures.',
    levels: {
      easy: [
        { prompt: 'Look closely: Scene A has [☀️ 🌳 🐶 🏡]. Scene B has [🌧️ 🌳 🐶 🏡]. What changed?', options: ['The weather (Sun changed to Rain 🌧️)', 'The house changed', 'The dog ran away', 'The tree grew'], answer: 'The weather (Sun changed to Rain 🌧️)' },
        { prompt: 'Scene A: [🦁 🐯 🐵]. Scene B: [🦁 🐯 🐘]. Who replaced the monkey?', options: ['Elephant 🐘', 'Giraffe 🦒', 'Zebra 🦓', 'Hippo 🦛'], answer: 'Elephant 🐘' },
        { prompt: 'Scene A has 3 red apples. Scene B has 5 red apples. How many more apples in B?', options: ['2 more apples', '1 more apple', '3 more apples', 'None'], answer: '2 more apples' }
      ],
      medium: [
        { prompt: 'Scene A: A car with 4 black wheels. Scene B: The rear wheel is bright yellow! What was altered?', options: ['Wheel color', 'Car size', 'Headlight shape', 'Window tint'], answer: 'Wheel color' },
        { prompt: 'Scene A clock reads 3:00. Scene B clock reads 3:30. How many minutes passed?', options: ['30 minutes', '15 minutes', '45 minutes', '60 minutes'], answer: '30 minutes' },
        { prompt: 'In Picture 1, the boy wears a blue striped shirt. In Picture 2, it is red polka dots. What changed?', options: ['Shirt color & pattern', 'Pants color', 'Shoe size', 'Hat style'], answer: 'Shirt color & pattern' }
      ],
      hard: [
        { prompt: 'In Castle A, there are 4 flagpoles with triangular banners. In Castle B, flagpole #3 has a star banner instead. What changed?', options: ['Banner symbol on tower #3', 'Castle wall color', 'Drawbridge state', 'Moat water level'], answer: 'Banner symbol on tower #3' },
        { prompt: 'A night sky painting in panel A has the Big Dipper constellation. Panel B is missing the pointer star Merak. What is missing?', options: ['One star in constellation', 'The Moon', 'A cloud', 'The horizon'], answer: 'One star in constellation' },
        { prompt: 'In scene 1, the shadows fall to the east (morning). In scene 2, shadows fall to the west. What shifted?', options: ['Position of the Sun / Time of day', 'Object height', 'Wind direction', 'Ground elevation'], answer: 'Position of the Sun / Time of day' }
      ]
    }
  },
  {
    id: 'g60',
    title: 'Shape Puzzle',
    slug: 'shape-puzzle',
    category: 'logic',
    subcategory: 'Geometry',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🧩',
    colorTheme: 'blue',
    description: 'Fit geometric shapes (Circle, Square, Triangle, Hexagon, Star) into matching silhouette cutouts!',
    instructions: 'Tap and match each shape to its correct outline frame.',
    learningObjectives: ['Shape recognition', 'Spatial reasoning', 'Visual contour matching'],
    gameType: 'drag-drop',
    seoTitle: 'Shape Puzzle — Shape Matching Puzzle Game for Kids',
    seoDescription: 'Fit colorful geometric shapes into their outline silhouettes.',
    levels: {
      easy: [
        { prompt: 'Match the Circle ⚪', slots: ['Outline ⚪', 'Outline 🟩', 'Outline 🔺'], correct: 'Outline ⚪', options: ['Outline ⚪', 'Outline 🟩', 'Outline 🔺'] },
        { prompt: 'Match the Square 🟩', slots: ['Outline 🟩', 'Outline ⚪', 'Outline ⭐'], correct: 'Outline 🟩', options: ['Outline 🟩', 'Outline ⚪', 'Outline ⭐'] },
        { prompt: 'Match the Triangle 🔺', slots: ['Outline 🔺', 'Outline ⬟', 'Outline 🛑'], correct: 'Outline 🔺', options: ['Outline 🔺', 'Outline ⬟', 'Outline 🛑'] }
      ],
      medium: [
        { prompt: 'Match the 5-pointed Star ⭐', slots: ['Star Frame ⭐', 'Diamond Frame 🔷', 'Heart Frame 💖'], correct: 'Star Frame ⭐', options: ['Star Frame ⭐', 'Diamond Frame 🔷', 'Heart Frame 💖'] },
        { prompt: 'Match the Hexagon (6 sides) ⬡', slots: ['Hexagon Outline ⬡', 'Pentagon Outline ⬟', 'Octagon Outline 🛑'], correct: 'Hexagon Outline ⬡', options: ['Hexagon Outline ⬡', 'Pentagon Outline ⬟', 'Octagon Outline 🛑'] },
        { prompt: 'Match the Diamond / Rhombus 🔷', slots: ['Diamond Outline 🔷', 'Oval Outline ⬭', 'Square Outline 🟩'], correct: 'Diamond Outline 🔷', options: ['Diamond Outline 🔷', 'Oval Outline ⬭', 'Square Outline 🟩'] }
      ],
      hard: [
        { prompt: 'Match the 3D Cube Silhouette 🎲', slots: ['Cube Outline 🎲', 'Sphere Outline ⚽', 'Pyramid Outline 🔺'], correct: 'Cube Outline 🎲', options: ['Cube Outline 🎲', 'Sphere Outline ⚽', 'Pyramid Outline 🔺'] },
        { prompt: 'Match the Cylinder Silhouette 🛢️', slots: ['Cylinder Outline 🛢️', 'Cone Outline 🍦', 'Torus Outline 🍩'], correct: 'Cylinder Outline 🛢️', options: ['Cylinder Outline 🛢️', 'Cone Outline 🍦', 'Torus Outline 🍩'] },
        { prompt: 'Match the Trapezoid Silhouette ⏢', slots: ['Trapezoid Outline ⏢', 'Parallelogram ▰', 'Rectangle ▭'], correct: 'Trapezoid Outline ⏢', options: ['Trapezoid Outline ⏢', 'Parallelogram ▰', 'Rectangle ▭'] }
      ]
    }
  },
  {
    id: 'g61',
    title: 'Logic Grid for Kids',
    slug: 'logic-grid-for-kids',
    category: 'logic',
    subcategory: 'Deduction',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '📊',
    colorTheme: 'indigo',
    description: 'Solve deductive logic puzzles by analyzing clues about pets, favorite colors, and sports!',
    instructions: 'Read the clues carefully and deduce which character matches each attribute.',
    learningObjectives: ['Deductive logic', 'Elimination method', 'Logical reasoning'],
    gameType: 'quiz',
    seoTitle: 'Logic Grid for Kids — Deduction Logic Puzzles',
    seoDescription: 'Solve fun child-friendly logic grid deduction challenges with step-by-step clues.',
    levels: {
      easy: [
        { prompt: 'Clue: Maya loves green. Leo does not like blue. Who loves green?', options: ['Maya', 'Leo', 'Neither', 'Both'], answer: 'Maya' },
        { prompt: 'Clue: Sam has a barking pet. Emma has a purring pet. Who owns the dog? 🐶', options: ['Sam', 'Emma', 'Neither', 'Both'], answer: 'Sam' },
        { prompt: 'Clue: Alex is taller than Ben. Ben is taller than Cole. Who is the tallest?', options: ['Alex', 'Ben', 'Cole', 'Same height'], answer: 'Alex' }
      ],
      medium: [
        { prompt: 'Clues: 1. Three friends (Amy, Dan, Zoe) each chose an apple, banana, or orange. 2. Amy is allergic to citrus (no orange). 3. Dan chose yellow fruit (banana). What did Amy choose?', options: ['Apple 🍎', 'Banana 🍌', 'Orange 🍊', 'Grapes 🍇'], answer: 'Apple 🍎' },
        { prompt: 'Clues: 1. Red car finished before Blue car. 2. Green car finished after Blue car. Which car won 1st place? 🏆', options: ['Red Car 🔴', 'Blue Car 🔵', 'Green Car 🟢', 'Tie'], answer: 'Red Car 🔴' },
        { prompt: 'Clues: 1. Lisa lives in the house with an even number. 2. The house numbers are 15, 22, and 37. Which is Lisa’s house?', options: ['House 22', 'House 15', 'House 37', 'House 100'], answer: 'House 22' }
      ],
      hard: [
        { prompt: 'Clues: 1. Mia, Noah, and Liam play Soccer, Basketball, and Tennis. 2. Mia does not use a racket. 3. The soccer player wears jersey #7. 4. Noah plays basketball. What sport does Liam play?', options: ['Tennis 🎾', 'Soccer ⚽', 'Basketball 🏀', 'Swimming 🏊'], answer: 'Tennis 🎾' },
        { prompt: 'Clues: 1. Four runners (A, B, C, D) in a race. 2. A was not 1st or 4th. 3. B finished immediately ahead of C. 4. D won 1st place. What position did A finish?', options: ['3rd Place', '2nd Place', '4th Place', '1st Place'], answer: '3rd Place' },
        { prompt: 'Clues: 1. Box A is heavier than Box B. 2. Box C is heavier than Box A. 3. Box D is lighter than Box B. Which box is the lightest of all?', options: ['Box D', 'Box B', 'Box A', 'Box C'], answer: 'Box D' }
      ]
    }
  },
  {
    id: 'g62',
    title: 'Sequence Puzzle',
    slug: 'sequence-puzzle',
    category: 'logic',
    subcategory: 'Sequencing',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '⏳',
    colorTheme: 'cyan',
    description: 'Arrange daily routines, story events, and building steps into chronological sequence!',
    instructions: 'Order events from beginning to end (First -> Next -> Last).',
    learningObjectives: ['Chronological sequencing', 'Cause and effect', 'Story comprehension'],
    gameType: 'pattern-sequence',
    seoTitle: 'Sequence Puzzle — Story & Event Sequencing Game for Kids',
    seoDescription: 'Sequence story events, morning routines, and building steps in logical order.',
    levels: {
      easy: [
        { prompt: 'Morning Routine Order:', items: ['Wake up in morning ⏰', 'Brush teeth 🪥', 'Eat breakfast 🥞', 'Go to school 🎒'], correctOrder: ['Wake up in morning ⏰', 'Brush teeth 🪥', 'Eat breakfast 🥞', 'Go to school 🎒'] },
        { prompt: 'Making a Sandwich:', items: ['Get 2 slices of bread 🍞', 'Spread peanut butter 🥜', 'Put slices together 🥪', 'Enjoy your sandwich! 😋'], correctOrder: ['Get 2 slices of bread 🍞', 'Spread peanut butter 🥜', 'Put slices together 🥪', 'Enjoy your sandwich! 😋'] }
      ],
      medium: [
        { prompt: 'Building a Snowman:', items: ['Roll giant snowballs ⛄', 'Stack head on body 🪵', 'Add carrot nose & coal eyes 🥕', 'Put on hat and scarf 🧣'], correctOrder: ['Roll giant snowballs ⛄', 'Stack head on body 🪵', 'Add carrot nose & coal eyes 🥕', 'Put on hat and scarf 🧣'] },
        { prompt: 'Baking Cookies:', items: ['Mix flour and sugar in bowl 🥣', 'Shape dough onto baking sheet 🍪', 'Bake in warm oven ♨️', 'Cool and serve! 😋'], correctOrder: ['Mix flour and sugar in bowl 🥣', 'Shape dough onto baking sheet 🍪', 'Bake in warm oven ♨️', 'Cool and serve! 😋'] }
      ],
      hard: [
        { prompt: 'Scientific Method Investigation:', items: ['Ask a question / Observe phenomenon 🔬', 'Form a testable hypothesis 💡', 'Conduct controlled experiment 🧪', 'Analyze data and draw conclusions 📊'], correctOrder: ['Ask a question / Observe phenomenon 🔬', 'Form a testable hypothesis 💡', 'Conduct controlled experiment 🧪', 'Analyze data and draw conclusions 📊'] },
        { prompt: 'Publishing a Children\'s Storybook:', items: ['Write the draft story ✍️', 'Draw colorful illustrations 🎨', 'Edit and format layout 📖', 'Print and publish books 📚'], correctOrder: ['Write the draft story ✍️', 'Draw colorful illustrations 🎨', 'Edit and format layout 📖', 'Print and publish books 📚'] }
      ]
    }
  },
  {
    id: 'g63',
    title: 'Connect the Dots',
    slug: 'connect-the-dots',
    category: 'creativity',
    subcategory: 'Counting & Art',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '✨',
    colorTheme: 'pink',
    description: 'Tap numbers in ascending order (1, 2, 3...) to draw lines and reveal secret pictures!',
    instructions: 'Click or tap each consecutive number dot to connect the lines and reveal the cute hidden artwork.',
    learningObjectives: ['Number counting', 'Hand-eye motor skills', 'Geometric line following'],
    gameType: 'canvas-art',
    seoTitle: 'Connect the Dots — Number Dot-to-Dot Game for Kids',
    seoDescription: 'Connect numbered dots to reveal animals, rockets, and stars.',
    levels: {
      easy: { dotCount: 5, shape: 'star', dots: [{ x: 150, y: 30, n: 1 }, { x: 230, y: 110, n: 2 }, { x: 190, y: 220, n: 3 }, { x: 110, y: 220, n: 4 }, { x: 70, y: 110, n: 5 }] },
      medium: { dotCount: 8, shape: 'house', dots: [{ x: 150, y: 40, n: 1 }, { x: 240, y: 110, n: 2 }, { x: 240, y: 220, n: 3 }, { x: 180, y: 220, n: 4 }, { x: 180, y: 160, n: 5 }, { x: 120, y: 160, n: 6 }, { x: 120, y: 220, n: 7 }, { x: 60, y: 220, n: 8 }] },
      hard: { dotCount: 12, shape: 'rocket', dots: [{ x: 150, y: 20, n: 1 }, { x: 180, y: 60, n: 2 }, { x: 180, y: 150, n: 3 }, { x: 220, y: 200, n: 4 }, { x: 180, y: 190, n: 5 }, { x: 160, y: 220, n: 6 }, { x: 140, y: 220, n: 7 }, { x: 120, y: 190, n: 8 }, { x: 80, y: 200, n: 9 }, { x: 120, y: 150, n: 10 }, { x: 120, y: 60, n: 11 }, { x: 150, y: 20, n: 12 }] }
    }
  },
  {
    id: 'g64',
    title: 'Maze Escape',
    slug: 'maze-escape',
    category: 'logic',
    subcategory: 'Mazes',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '🏃',
    colorTheme: 'emerald',
    description: 'Guide your playful explorer through labyrinth corridors from start to trophy exit!',
    instructions: 'Use the Arrow keys or on-screen D-pad buttons to navigate through the maze.',
    learningObjectives: ['Spatial navigation', 'Visual motor planning', 'Problem solving'],
    gameType: 'maze-nav',
    seoTitle: 'Maze Escape — Kids Online Labyrinth Maze Game',
    seoDescription: 'Navigate maze passages to reach the victory trophy.',
    levels: {
      easy: { mazeSize: 5, complexity: 'simple' },
      medium: { mazeSize: 7, complexity: 'moderate' },
      hard: { mazeSize: 9, complexity: 'advanced' }
    }
  },
  {
    id: 'g65',
    title: 'Path Finder',
    slug: 'path-finder',
    category: 'logic',
    subcategory: 'Pathfinding',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🧭',
    colorTheme: 'blue',
    description: 'Find the safest and shortest route past lava traps to reach the gold chest!',
    instructions: 'Avoid obstacles and choose the open path leading directly to the goal.',
    learningObjectives: ['Strategic path planning', 'Obstacle avoidance', 'Spatial logic'],
    gameType: 'maze-nav',
    seoTitle: 'Path Finder — Kids Obstacle Grid Navigation Game',
    seoDescription: 'Chart a safe path across the grid to reach the treasure chest.',
    levels: {
      easy: { mazeSize: 5, obstacles: 3 },
      medium: { mazeSize: 7, obstacles: 6 },
      hard: { mazeSize: 9, obstacles: 10 }
    }
  },
  {
    id: 'g66',
    title: 'Tangram Builder',
    slug: 'tangram-builder',
    category: 'creativity',
    subcategory: 'Tangrams',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '📐',
    colorTheme: 'purple',
    description: 'Combine classic 7 geometric tangram pieces to create animals and silhouettes!',
    instructions: 'Select and place triangles, squares, and parallelograms to fill the target silhouette.',
    learningObjectives: ['Geometric decomposition', 'Spatial rotation', 'Shape composition'],
    gameType: 'tangram-shape',
    seoTitle: 'Tangram Builder — Kids Geometric Tangram Puzzle Game',
    seoDescription: 'Recreate animal silhouettes using 7 geometric tangram shapes.',
    levels: {
      easy: { targetShape: 'Swan / Bird 🦢', requiredPieces: ['Large Triangle', 'Medium Triangle', 'Small Triangle', 'Square'] },
      medium: { targetShape: 'Running Fox 🦊', requiredPieces: ['2 Large Triangles', 'Medium Triangle', '2 Small Triangles', 'Square', 'Parallelogram'] },
      hard: { targetShape: 'Cat Silhouette 🐱', requiredPieces: ['Full 7-piece Tangram Set'] }
    }
  },
  {
    id: 'g67',
    title: 'Sudoku Kids',
    slug: 'sudoku-kids',
    category: 'logic',
    subcategory: 'Sudoku',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🔢',
    colorTheme: 'indigo',
    description: 'Solve friendly 4x4 mini-Sudoku grids with numbers or cute fruit shapes!',
    instructions: 'Fill the 4x4 grid so every row, column, and 2x2 box contains 1, 2, 3, and 4 without duplicates.',
    learningObjectives: ['Sudoku logic', 'Constraint satisfaction', 'Deductive reasoning'],
    gameType: 'sudoku-logic',
    seoTitle: 'Sudoku Kids — 4x4 Mini Sudoku for Children',
    seoDescription: 'Learn Sudoku easily with fun 4x4 child-friendly logic grids.',
    levels: {
      easy: { size: 4, prefilled: [[1, 2, 0, 4], [0, 4, 1, 2], [2, 1, 4, 0], [4, 0, 2, 1]], solution: [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]] },
      medium: { size: 4, prefilled: [[0, 0, 3, 4], [3, 4, 0, 0], [0, 0, 4, 3], [4, 3, 0, 0]], solution: [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]] },
      hard: { size: 4, prefilled: [[0, 2, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 2, 0]], solution: [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]] }
    }
  },
  {
    id: 'g68',
    title: 'Block Puzzle',
    slug: 'block-puzzle',
    category: 'logic',
    subcategory: 'Spatial Puzzles',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '🧱',
    colorTheme: 'teal',
    description: 'Place colorful block tetromino shapes onto the grid to clear complete rows!',
    instructions: 'Drag and place blocks onto the grid to form complete solid lines.',
    learningObjectives: ['Spatial packing', 'Geometric arrangement', 'Visual strategy'],
    gameType: 'tangram-shape',
    seoTitle: 'Block Puzzle — Kids Spatial Grid Puzzle Game',
    seoDescription: 'Fit colorful blocks into the grid to solve spatial logic puzzles.',
    levels: {
      easy: { targetGridSize: 4, blocksAvailable: ['2x1', '2x2', '1x3'] },
      medium: { targetGridSize: 6, blocksAvailable: ['L-Shape', 'T-Shape', '2x2', '3x1'] },
      hard: { targetGridSize: 8, blocksAvailable: ['Z-Shape', 'T-Shape', 'L-Shape', '4x1', '2x2'] }
    }
  },
  {
    id: 'g69',
    title: 'Color Pattern Builder',
    slug: 'color-pattern-builder',
    category: 'memory',
    subcategory: 'Sequence Memory',
    ageRange: '4–10',
    minAge: 4,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '🎨',
    colorTheme: 'rose',
    description: 'Watch the flashing color lights and repeat the musical sequence in order!',
    instructions: 'Memorize the color flashes (Red, Green, Blue, Yellow) and tap them back in the exact order.',
    learningObjectives: ['Sequential memory', 'Auditory-visual integration', 'Reaction focus'],
    gameType: 'pattern-sequence',
    seoTitle: 'Color Pattern Builder — Simon Memory Sequence Game for Kids',
    seoDescription: 'Test your memory reproducing increasingly challenging color flash sequences.',
    levels: {
      easy: [
        { prompt: 'Repeat sequence: Red -> Blue -> Green', items: ['🔴 Red', '🔵 Blue', '🟢 Green'], correctOrder: ['🔴 Red', '🔵 Blue', '🟢 Green'] },
        { prompt: 'Repeat sequence: Yellow -> Red -> Yellow', items: ['🟡 Yellow', '🔴 Red', '🟡 Yellow'], correctOrder: ['🟡 Yellow', '🔴 Red', '🟡 Yellow'] }
      ],
      medium: [
        { prompt: 'Repeat 4 colors: Green -> Yellow -> Blue -> Red', items: ['🟢 Green', '🟡 Yellow', '🔵 Blue', '🔴 Red'], correctOrder: ['🟢 Green', '🟡 Yellow', '🔵 Blue', '🔴 Red'] },
        { prompt: 'Repeat 5 colors: Red -> Red -> Blue -> Green -> Yellow', items: ['🔴 Red 1', '🔴 Red 2', '🔵 Blue', '🟢 Green', '🟡 Yellow'], correctOrder: ['🔴 Red 1', '🔴 Red 2', '🔵 Blue', '🟢 Green', '🟡 Yellow'] }
      ],
      hard: [
        { prompt: 'Repeat 6 colors sequence!', items: ['🔵 Blue', '🟢 Green', '🔴 Red', '🟡 Yellow', '🟣 Purple', '🟠 Orange'], correctOrder: ['🔵 Blue', '🟢 Green', '🔴 Red', '🟡 Yellow', '🟣 Purple', '🟠 Orange'] }
      ]
    }
  },
  {
    id: 'g70',
    title: 'Hidden Object Hunt',
    slug: 'hidden-object-hunt',
    category: 'logic',
    subcategory: 'Observation',
    ageRange: '4–10',
    minAge: 4,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🔎',
    colorTheme: 'amber',
    description: 'Search through colorful illustrated scenes to find hidden educational objects!',
    instructions: 'Read the clue for the requested object and tap on it in the scene.',
    learningObjectives: ['Visual scanning', 'Object constancy', 'Attention to detail'],
    gameType: 'quiz',
    seoTitle: 'Hidden Object Hunt — Kids Picture Search Game',
    seoDescription: 'Find hidden treasures, animals, and items in vibrant illustrated scenes.',
    levels: {
      easy: [
        { prompt: 'In the Forest scene [🌲 🦉 🍄 🐿️ 🎒], where is the hidden Owl?', options: ['In the tree branches 🦉', 'Behind the rock', 'Under the water', 'In the clouds'], answer: 'In the tree branches 🦉' },
        { prompt: 'In the Classroom scene [📚 ✏️ 💻 🍎 ⏰], where is the Red Apple?', options: ['On the teacher’s desk 🍎', 'In the trash', 'On the floor', 'Out the window'], answer: 'On the teacher’s desk 🍎' },
        { prompt: 'In the Beach scene [🏖️ 🦀 🐚 ⛵ 🥥], where is the tiny Crab?', options: ['Near the sandcastle 🦀', 'In the sky', 'On the palm tree top', 'Inside the boat'], answer: 'Near the sandcastle 🦀' }
      ],
      medium: [
        { prompt: 'Find the hidden Telescope in the Science Lab: [🔬 🧪 🔭 🧬 🧲]', options: ['By the observatory window 🔭', 'Inside the test tube', 'Under the floor tile', 'In the sink'], answer: 'By the observatory window 🔭' },
        { prompt: 'Find the Compass on the Pirate Ship deck: [🏴‍☠️ 🦜 🧭 🪙 🗺️]', options: ['Next to the captain’s wheel 🧭', 'In the crow\'s nest', 'Under the sea', 'Inside the cannon'], answer: 'Next to the captain’s wheel 🧭' },
        { prompt: 'Find the Chameleons camouflaged in the Jungle: [🌴 🦎 🌺 🦜 🐒]', options: ['Blended on the green palm leaf 🦎', 'In the river', 'In the mud', 'In the campfire'], answer: 'Blended on the green palm leaf 🦎' }
      ],
      hard: [
        { prompt: 'Find the fossilized Ammonite shell in the Museum exhibit: [🦕 🦴 🐚 💎 📜]', options: ['Embedded in the prehistoric rock layer 🐚', 'On the roof', 'In the gift shop', 'Under the stairs'], answer: 'Embedded in the prehistoric rock layer 🐚' },
        { prompt: 'Find the constellation Ursa Major in the Planetarium dome: [🌌 🪐 🔭 🌟 🚀]', options: ['Near the north celestial pole 🌟', 'In the planet ring', 'Behind the projector', 'On the horizon'], answer: 'Near the north celestial pole 🌟' }
      ]
    }
  }
];
