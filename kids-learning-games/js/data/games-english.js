// games-english.js - English, Reading & Spelling Games (Games 21–40)

window.GAMES_ENGLISH = [
  {
    id: 'g21',
    title: 'Word Scramble',
    slug: 'word-scramble',
    category: 'spelling',
    subcategory: 'Anagrams',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🔤',
    colorTheme: 'amber',
    description: 'Rearrange the jumbled letter tiles to spell the secret word!',
    instructions: 'Click or drag the letter tiles in the right order to spell the word based on the clue.',
    learningObjectives: ['Spelling patterns', 'Anagram decoding', 'Vocabulary retention'],
    gameType: 'word-spelling',
    seoTitle: 'Word Scramble — Anagram Spelling Game for Kids',
    seoDescription: 'Unscramble letters to solve fun word puzzles for kids.',
    levels: {
      easy: [
        { word: 'CAT', scrambled: 'ATC', clue: 'A furry pet that purrs 🐱' },
        { word: 'DOG', scrambled: 'GDO', clue: 'A friendly barking puppy 🐶' },
        { word: 'SUN', scrambled: 'NSU', clue: 'Shines bright in the sky ☀️' },
        { word: 'BOOK', scrambled: 'OKOB', clue: 'Full of stories to read 📖' },
        { word: 'TREE', scrambled: 'EETR', clue: 'Has green leaves and branches 🌳' }
      ],
      medium: [
        { word: 'PLANET', scrambled: 'NETALP', clue: 'Orbits around a star like Earth 🪐' },
        { word: 'CASTLE', scrambled: 'LTESAC', clue: 'A royal fortress with towers 🏰' },
        { word: 'MONKEY', scrambled: 'YNKOME', clue: 'Loves bananas and swinging on trees 🐒' },
        { word: 'FLOWER', scrambled: 'WROELF', clue: 'Colorful and smells sweet 🌸' },
        { word: 'WIZARD', scrambled: 'DARZIW', clue: 'Casts magical spells 🧙' }
      ],
      hard: [
        { word: 'DINOSAUR', scrambled: 'RUSAONID', clue: 'Ancient giant reptile 🦖' },
        { word: 'BUTTERFLY', scrambled: 'LYFTTUBRE', clue: 'Transforms from a caterpillar 🦋' },
        { word: 'TELESCOPE', scrambled: 'SCOPETELE', clue: 'Used to view distant stars 🔭' },
        { word: 'ADVENTURE', scrambled: 'TREVNEADU', clue: 'An exciting journey or quest 🗺️' },
        { word: 'CHOCOLATE', scrambled: 'LATECHOCO', clue: 'Delicious sweet cocoa treat 🍫' }
      ]
    }
  },
  {
    id: 'g22',
    title: 'Spelling Bee',
    slug: 'spelling-bee',
    category: 'spelling',
    subcategory: 'Spelling',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🐝',
    colorTheme: 'yellow',
    description: 'Listen to the audio clue or read the definition and type the correct spelling.',
    instructions: 'Use the onscreen keyboard or physical keys to spell the word correctly without mistakes.',
    learningObjectives: ['Phonetic spelling', 'Word recognition', 'Auditory processing'],
    gameType: 'word-spelling',
    seoTitle: 'Spelling Bee — Online Kids Spelling Game',
    seoDescription: 'Test your spelling skills with friendly clues and sound hints.',
    levels: {
      easy: [
        { word: 'FISH', clue: 'Swims in water with fins 🐟' },
        { word: 'FROG', clue: 'Green amphibian that hops 🐸' },
        { word: 'BIRD', clue: 'Feathered animal that flies 🐦' },
        { word: 'MILK', clue: 'Nutritious white dairy drink 🥛' },
        { word: 'STAR', clue: 'Twinkles in the night sky ⭐' }
      ],
      medium: [
        { word: 'DOLPHIN', clue: 'Intelligent friendly ocean mammal 🐬' },
        { word: 'RAINBOW', clue: 'Colorful arc in sky after rain 🌈' },
        { word: 'GUITAR', clue: 'Musical instrument with 6 strings 🎸' },
        { word: 'JUNGLE', clue: 'Thick tropical forest with wildlife 🌴' },
        { word: 'PENGUIN', clue: 'Flightless bird living in cold ice 🐧' }
      ],
      hard: [
        { word: 'KNOWLEDGE', clue: 'Information and skills acquired through learning 💡' },
        { word: 'BEAUTIFUL', clue: 'Pleasing to the senses or mind ✨' },
        { word: 'ASTRONAUT', clue: 'Person trained to travel into outer space 👨‍🚀' },
        { word: 'ENVIRONMENT', clue: 'The natural world around living things 🌿' },
        { word: 'TREASURE', clue: 'A collection of precious jewels and gold 💎' }
      ]
    }
  },
  {
    id: 'g23',
    title: 'Word Builder',
    slug: 'word-builder',
    category: 'english',
    subcategory: 'Phonics',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🧱',
    colorTheme: 'emerald',
    description: 'Place letter blocks in the correct slots to build the pictured word.',
    instructions: 'Tap the letter blocks below to fill in the missing word slots.',
    learningObjectives: ['Word construction', 'CVC phonics', 'Early reading'],
    gameType: 'word-spelling',
    seoTitle: 'Word Builder — Phonics Letter Slot Game for Kids',
    seoDescription: 'Build words letter-by-letter with colorful letter blocks.',
    levels: {
      easy: [
        { word: 'BUS', clue: 'Large yellow vehicle for school 🚌' },
        { word: 'HAT', clue: 'Worn on your head 🎩' },
        { word: 'PIG', clue: 'Pink farm animal that oinks 🐷' },
        { word: 'CUP', clue: 'Used to drink hot cocoa ☕' },
        { word: 'FOX', clue: 'Clever wild animal with bushy tail 🦊' }
      ],
      medium: [
        { word: 'SNAKE', clue: 'Slithers silently on ground 🐍' },
        { word: 'TRAIN', clue: 'Rides on railway tracks 🚆' },
        { word: 'SMILE', clue: 'Happy expression on your face 😊' },
        { word: 'BREAD', clue: 'Baked food used for sandwiches 🍞' },
        { word: 'CLOCK', clue: 'Shows the time of day ⏰' }
      ],
      hard: [
        { word: 'DRAGON', clue: 'Mythical fire-breathing creature 🐉' },
        { word: 'ROCKET', clue: 'Blasts off to outer space 🚀' },
        { word: 'BRIDGE', clue: 'Crosses over a river or road 🌉' },
        { word: 'PENCIL', clue: 'Used to write and draw ✏️' },
        { word: 'GALAXY', clue: 'Huge system of billions of stars 🌌' }
      ]
    }
  },
  {
    id: 'g24',
    title: 'Missing Letter',
    slug: 'missing-letter',
    category: 'spelling',
    subcategory: 'Vowels & Consonants',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '❓',
    colorTheme: 'rose',
    description: 'Spot the missing vowel or consonant to complete the word!',
    instructions: 'Look at the word with the blank spot and select the letter that completes it.',
    learningObjectives: ['Vowel recognition', 'Consonant blending', 'Spelling accuracy'],
    gameType: 'quiz',
    seoTitle: 'Missing Letter — Early Spelling Game for Children',
    seoDescription: 'Find the missing letter in simple words and sight vocabulary.',
    levels: {
      easy: [
        { prompt: 'D _ G (Barking pet 🐶)', options: ['O', 'A', 'E', 'U'], answer: 'O' },
        { prompt: 'S _ N (Shining in sky ☀️)', options: ['U', 'I', 'O', 'A'], answer: 'U' },
        { prompt: 'C _ T (Furry feline 🐱)', options: ['A', 'O', 'E', 'I'], answer: 'A' },
        { prompt: 'P _ N (Used for writing 🖊️)', options: ['E', 'O', 'U', 'A'], answer: 'E' },
        { prompt: 'B _ X (Container for gifts 📦)', options: ['O', 'E', 'A', 'I'], answer: 'O' }
      ],
      medium: [
        { prompt: 'F R _ G (Green hopper 🐸)', options: ['O', 'A', 'U', 'E'], answer: 'O' },
        { prompt: 'T R _ E (Has green leaves 🌳)', options: ['E', 'A', 'O', 'I'], answer: 'E' },
        { prompt: 'S T _ R (Twinkles at night ⭐)', options: ['A', 'E', 'O', 'U'], answer: 'A' },
        { prompt: 'M _ L K (Nutritious white drink 🥛)', options: ['I', 'E', 'A', 'O'], answer: 'I' },
        { prompt: 'S H _ P (Sails on ocean 🚢)', options: ['I', 'E', 'O', 'U'], answer: 'I' }
      ],
      hard: [
        { prompt: 'K N _ W L E D G E', options: ['O', 'A', 'U', 'I'], answer: 'O' },
        { prompt: 'D _ N O S A U R', options: ['I', 'E', 'A', 'Y'], answer: 'I' },
        { prompt: 'A S T R _ N A U T', options: ['O', 'A', 'E', 'U'], answer: 'O' },
        { prompt: 'P Y R _ M I D', options: ['A', 'E', 'O', 'U'], answer: 'A' },
        { prompt: 'B U T T E R F L _', options: ['Y', 'I', 'E', 'A'], answer: 'Y' }
      ]
    }
  },
  {
    id: 'g25',
    title: 'Alphabet Treasure Hunt',
    slug: 'alphabet-treasure-hunt',
    category: 'english',
    subcategory: 'Alphabet',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🗺️',
    colorTheme: 'cyan',
    description: 'Find letter treasures in strict alphabetical order (A to Z)!',
    instructions: 'Tap the letter chests in correct alphabetical sequence to unlock the pirate treasure.',
    learningObjectives: ['A-Z sequencing', 'Letter identification', 'Visual scanning'],
    gameType: 'pattern-sequence',
    seoTitle: 'Alphabet Treasure Hunt — Alphabetical Order Kids Game',
    seoDescription: 'Embark on a treasure hunt by tapping letters in A to Z alphabetical order.',
    levels: {
      easy: [
        { prompt: 'Order these letters: C, A, D, B', items: ['C', 'A', 'D', 'B'], correctOrder: ['A', 'B', 'C', 'D'] },
        { prompt: 'Order these letters: F, H, E, G', items: ['F', 'H', 'E', 'G'], correctOrder: ['E', 'F', 'G', 'H'] },
        { prompt: 'Order these letters: K, I, L, J', items: ['K', 'I', 'L', 'J'], correctOrder: ['I', 'J', 'K', 'L'] }
      ],
      medium: [
        { prompt: 'Order letters: P, M, O, N', items: ['P', 'M', 'O', 'N'], correctOrder: ['M', 'N', 'O', 'P'] },
        { prompt: 'Order letters: T, Q, S, R', items: ['T', 'Q', 'S', 'R'], correctOrder: ['Q', 'R', 'S', 'T'] },
        { prompt: 'Order letters: X, U, W, V', items: ['X', 'U', 'W', 'V'], correctOrder: ['U', 'V', 'W', 'X'] }
      ],
      hard: [
        { prompt: 'Alphabetize words: Bear, Apple, Cat, Dog', items: ['Bear', 'Apple', 'Cat', 'Dog'], correctOrder: ['Apple', 'Bear', 'Cat', 'Dog'] },
        { prompt: 'Alphabetize words: Frog, Elephant, Giraffe, Hippo', items: ['Frog', 'Elephant', 'Giraffe', 'Hippo'], correctOrder: ['Elephant', 'Frog', 'Giraffe', 'Hippo'] },
        { prompt: 'Alphabetize words: Moon, Sun, Planet, Star', items: ['Moon', 'Sun', 'Planet', 'Star'], correctOrder: ['Moon', 'Planet', 'Star', 'Sun'] }
      ]
    }
  },
  {
    id: 'g26',
    title: 'Letter Match',
    slug: 'letter-match',
    category: 'english',
    subcategory: 'Alphabet',
    ageRange: '4–6',
    minAge: 4,
    maxAge: 6,
    difficulty: 'Easy',
    icon: '🔤',
    colorTheme: 'purple',
    description: 'Match uppercase capital letters with their lowercase pairs!',
    instructions: 'Tap the uppercase letter on the left, then select its matching lowercase letter.',
    learningObjectives: ['Case pairing (A-a, B-b)', 'Early letter recognition', 'Print concepts'],
    gameType: 'memory',
    seoTitle: 'Letter Match — Uppercase and Lowercase Matching Game',
    seoDescription: 'Match capital and small letters with interactive flip cards.',
    levels: {
      easy: { pairs: [['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd']] },
      medium: { pairs: [['E', 'e'], ['G', 'g'], ['H', 'h'], ['M', 'm'], ['R', 'r'], ['T', 't']] },
      hard: { pairs: [['Q', 'q'], ['D', 'd'], ['B', 'b'], ['P', 'p'], ['N', 'n'], ['U', 'u'], ['W', 'w'], ['M', 'm']] }
    }
  },
  {
    id: 'g27',
    title: 'Beginning Sound Match',
    slug: 'beginning-sound-match',
    category: 'english',
    subcategory: 'Phonics',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🔊',
    colorTheme: 'teal',
    description: 'Connect pictures to their starting phonics sound letter!',
    instructions: 'Look at the picture and select the letter that makes its beginning sound.',
    learningObjectives: ['Initial phoneme isolation', 'Phonemic awareness', 'Letter-sound correspondence'],
    gameType: 'quiz',
    seoTitle: 'Beginning Sound Match — Phonics Game for Kindergarten',
    seoDescription: 'Match cute pictures to their beginning phonics sounds and letters.',
    levels: {
      easy: [
        { prompt: 'What letter does 🍎 Apple start with?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        { prompt: 'What letter does 🐻 Bear start with?', options: ['B', 'D', 'P', 'R'], answer: 'B' },
        { prompt: 'What letter does 🐱 Cat start with?', options: ['C', 'K', 'S', 'G'], answer: 'C' },
        { prompt: 'What letter does 🐶 Dog start with?', options: ['D', 'B', 'P', 'T'], answer: 'D' },
        { prompt: 'What letter does 🐘 Elephant start with?', options: ['E', 'A', 'I', 'O'], answer: 'E' }
      ],
      medium: [
        { prompt: 'What letter does 🦁 Lion start with?', options: ['L', 'I', 'J', 'R'], answer: 'L' },
        { prompt: 'What letter does 🐒 Monkey start with?', options: ['M', 'N', 'W', 'H'], answer: 'M' },
        { prompt: 'What letter does 🚀 Rocket start with?', options: ['R', 'P', 'B', 'D'], answer: 'R' },
        { prompt: 'What letter does ☀️ Sun start with?', options: ['S', 'C', 'Z', 'X'], answer: 'S' },
        { prompt: 'What letter does 🐢 Turtle start with?', options: ['T', 'D', 'P', 'F'], answer: 'T' }
      ],
      hard: [
        { prompt: 'Which letter blend starts 🍓 Strawberry?', options: ['Str', 'Spr', 'Scr', 'Shr'], answer: 'Str' },
        { prompt: 'Which letter blend starts 👑 Crown?', options: ['Cr', 'Cl', 'Gr', 'Pr'], answer: 'Cr' },
        { prompt: 'Which digraph starts 🦈 Shark?', options: ['Sh', 'Ch', 'Th', 'Wh'], answer: 'Sh' },
        { prompt: 'Which digraph starts 🧀 Cheese?', options: ['Ch', 'Sh', 'Th', 'Ph'], answer: 'Ch' },
        { prompt: 'Which digraph starts 🐋 Whale?', options: ['Wh', 'Th', 'Sh', 'Ch'], answer: 'Wh' }
      ]
    }
  },
  {
    id: 'g28',
    title: 'Ending Sound Match',
    slug: 'ending-sound-match',
    category: 'english',
    subcategory: 'Phonics',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🎯',
    colorTheme: 'blue',
    description: 'Identify the ending phonics sound of spoken words.',
    instructions: 'Listen or say the word out loud and pick the final letter sound.',
    learningObjectives: ['Final phoneme isolation', 'Phonological awareness', 'Spelling foundations'],
    gameType: 'quiz',
    seoTitle: 'Ending Sound Match — Phonics Ending Letter Game',
    seoDescription: 'Identify the ending sounds of common words in this fun phonics challenge.',
    levels: {
      easy: [
        { prompt: 'What letter does "DUCK" 🦆 end with?', options: ['K', 'T', 'P', 'D'], answer: 'K' },
        { prompt: 'What letter does "FROG" 🐸 end with?', options: ['G', 'D', 'B', 'P'], answer: 'G' },
        { prompt: 'What letter does "CAT" 🐱 end with?', options: ['T', 'D', 'P', 'K'], answer: 'T' },
        { prompt: 'What letter does "CRAB" 🦀 end with?', options: ['B', 'D', 'P', 'G'], answer: 'B' },
        { prompt: 'What letter does "SUN" ☀️ end with?', options: ['N', 'M', 'P', 'G'], answer: 'N' }
      ],
      medium: [
        { prompt: 'What ending sound is in "LAMP" 💡?', options: ['MP', 'NT', 'NK', 'ST'], answer: 'MP' },
        { prompt: 'What ending sound is in "NEST" 🪺?', options: ['ST', 'SP', 'SK', 'FT'], answer: 'ST' },
        { prompt: 'What ending sound is in "RING" 💍?', options: ['NG', 'NK', 'ND', 'NT'], answer: 'NG' },
        { prompt: 'What ending sound is in "HAND" ✋?', options: ['ND', 'NT', 'NK', 'MP'], answer: 'ND' },
        { prompt: 'What ending sound is in "MILK" 🥛?', options: ['LK', 'LT', 'LP', 'LD'], answer: 'LK' }
      ],
      hard: [
        { prompt: 'What ending sound in "BRANCH" 🌿?', options: ['NCH', 'NTH', 'NSH', 'RCH'], answer: 'NCH' },
        { prompt: 'What ending sound in "ELEPHANT" 🐘?', options: ['NT', 'ND', 'NK', 'MP'], answer: 'NT' },
        { prompt: 'What ending sound in "CHURCH" ⛪?', options: ['RCH', 'NCH', 'TCH', 'LCH'], answer: 'RCH' },
        { prompt: 'What ending sound in "WATCH" ⌚?', options: ['TCH', 'CH', 'SH', 'TH'], answer: 'TCH' },
        { prompt: 'What ending sound in "SPLASH" 💦?', options: ['SH', 'CH', 'TH', 'SK'], answer: 'SH' }
      ]
    }
  },
  {
    id: 'g29',
    title: 'Rhyming Words Race',
    slug: 'rhyming-words-race',
    category: 'english',
    subcategory: 'Rhymes',
    ageRange: '5–8',
    minAge: 5,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🎵',
    colorTheme: 'rose',
    description: 'Find words that rhyme and share the same word family ending sound!',
    instructions: 'Select the word that rhymes with the prompt word (e.g. Cat & Hat).',
    learningObjectives: ['Rhyme recognition', 'Word families (-at, -og, -un, -ight)', 'Auditory discrimination'],
    gameType: 'quiz',
    seoTitle: 'Rhyming Words Race — Fun Rhyme Match Game for Kids',
    seoDescription: 'Race through rhyming word pairs and master word families.',
    levels: {
      easy: [
        { prompt: 'Which word rhymes with CAT? 🐱', options: ['HAT 🎩', 'DOG 🐶', 'SUN ☀️', 'CAR 🚗'], answer: 'HAT 🎩' },
        { prompt: 'Which word rhymes with FROG? 🐸', options: ['LOG 🪵', 'FISH 🐟', 'TREE 🌳', 'BIRD 🐦'], answer: 'LOG 🪵' },
        { prompt: 'Which word rhymes with SUN? ☀️', options: ['RUN 🏃', 'MOON 🌙', 'STAR ⭐', 'SKY ☁️'], answer: 'RUN 🏃' },
        { prompt: 'Which word rhymes with STAR? ⭐', options: ['CAR 🚗', 'BOAT ⛵', 'PLANE ✈️', 'TRUCK 🚚'], answer: 'CAR 🚗' },
        { prompt: 'Which word rhymes with CAKE? 🎂', options: ['LAKE 🌊', 'CUP ☕', 'BREAD 🍞', 'MILK 🥛'], answer: 'LAKE 🌊' }
      ],
      medium: [
        { prompt: 'Which word rhymes with NIGHT? 🌙', options: ['BRIGHT ✨', 'DARK 🌑', 'DAY ☀️', 'STAR ⭐'], answer: 'BRIGHT ✨' },
        { prompt: 'Which word rhymes with TRAIN? 🚆', options: ['RAIN 🌧️', 'TRACK 🛤️', 'CAR 🚗', 'WHEEL 🛞'], answer: 'RAIN 🌧️' },
        { prompt: 'Which word rhymes with CLOCK? ⏰', options: ['ROCK 🪨', 'TIME ⌛', 'WATCH ⌚', 'HOUR 🕐'], answer: 'ROCK 🪨' },
        { prompt: 'Which word rhymes with BEAR? 🐻', options: ['CHAIR 🪑', 'LION 🦁', 'TIGER 🐯', 'CUB 🐾'], answer: 'CHAIR 🪑' },
        { prompt: 'Which word rhymes with BOAT? ⛵', options: ['COAT 🧥', 'SHIP 🚢', 'SEA 🌊', 'FISH 🐟'], answer: 'COAT 🧥' }
      ],
      hard: [
        { prompt: 'Which word rhymes with DRAGON? 🐉', options: ['WAGON 🚜', 'LIZARD 🦎', 'FIRE 🔥', 'CASTLE 🏰'], answer: 'WAGON 🚜' },
        { prompt: 'Which word rhymes with MOUNTAIN? 🏔️', options: ['FOUNTAIN ⛲', 'VALLEY 🌲', 'RIVER 🌊', 'HILL ⛰️'], answer: 'FOUNTAIN ⛲' },
        { prompt: 'Which word rhymes with FLOWER? 🌸', options: ['TOWER 🗼', 'GARDEN 🪴', 'PETAL 🌺', 'LEAF 🍃'], answer: 'TOWER 🗼' },
        { prompt: 'Which word rhymes with TREASURE? 💎', options: ['PLEASURE 😊', 'GOLD 🪙', 'CHEST 📦', 'ISLAND 🏝️'], answer: 'PLEASURE 😊' },
        { prompt: 'Which word rhymes with FEATHER? 🪶', options: ['WEATHER ⛅', 'BIRD 🐦', 'WING 🪽', 'FLY ✈️'], answer: 'WEATHER ⛅' }
      ]
    }
  },
  {
    id: 'g30',
    title: 'Opposite Words Match',
    slug: 'opposite-words-match',
    category: 'english',
    subcategory: 'Antonyms',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '↔️',
    colorTheme: 'indigo',
    description: 'Match words that mean the exact opposite (Hot & Cold, Big & Small).',
    instructions: 'Tap two cards that form an opposite pair to clear the board.',
    learningObjectives: ['Antonym vocabulary', 'Conceptual contrasts', 'Semantic relations'],
    gameType: 'memory',
    seoTitle: 'Opposite Words Match — Kids Antonym Game',
    seoDescription: 'Flip cards and find matching opposite words in this vocabulary memory game.',
    levels: {
      easy: { pairs: [['HOT 🔥', 'COLD ❄️'], ['BIG 🐘', 'SMALL 🐭'], ['UP ⬆️', 'DOWN ⬇️'], ['DAY ☀️', 'NIGHT 🌙']] },
      medium: { pairs: [['FAST 🐆', 'SLOW 🐢'], ['HAPPY 😄', 'SAD 😢'], ['HEAVY 🏋️', 'LIGHT 🪶'], ['OPEN 🚪', 'CLOSED 🔒'], ['CLEAN ✨', 'DIRTY 🐾'], ['TALL 🦒', 'SHORT 🦔']] },
      hard: { pairs: [['ANCIENT 🏛️', 'MODERN 🏙️'], ['GENEROUS 🎁', 'SELFISH 🤐'], ['BRAVE 🦸', 'COWARDLY 😨'], ['EMPTY 🫙', 'FULL 🫗'], ['ROUGH 🪨', 'SMOOTH 🪞'], ['VICTORY 🏆', 'DEFEAT 🏳️'], ['COMPLEX 🧩', 'SIMPLE 🟢'], ['EXPENSIVE 💎', 'CHEAP 🪙']] }
    }
  },
  {
    id: 'g31',
    title: 'Synonym Match',
    slug: 'synonym-match',
    category: 'english',
    subcategory: 'Vocabulary',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '✨',
    colorTheme: 'teal',
    description: 'Pair words that share similar or identical meanings (Happy & Glad).',
    instructions: 'Choose the word that has the same or closest meaning as the prompt word.',
    learningObjectives: ['Synonym recognition', 'Vocabulary expansion', 'Nuanced expression'],
    gameType: 'quiz',
    seoTitle: 'Synonym Match — Fun Synonym Learning Game for Kids',
    seoDescription: 'Discover words with similar meanings to make your writing and speaking richer.',
    levels: {
      easy: [
        { prompt: 'What is a synonym for BIG?', options: ['Huge', 'Tiny', 'Small', 'Narrow'], answer: 'Huge' },
        { prompt: 'What is a synonym for HAPPY?', options: ['Glad', 'Sad', 'Angry', 'Tired'], answer: 'Glad' },
        { prompt: 'What is a synonym for FAST?', options: ['Quick', 'Slow', 'Late', 'Heavy'], answer: 'Quick' },
        { prompt: 'What is a synonym for SMART?', options: ['Clever', 'Silly', 'Loud', 'Slow'], answer: 'Clever' },
        { prompt: 'What is a synonym for SHUT?', options: ['Close', 'Open', 'Break', 'Drop'], answer: 'Close' }
      ],
      medium: [
        { prompt: 'What is a synonym for BRAVE?', options: ['Courageous', 'Afraid', 'Timid', 'Weak'], answer: 'Courageous' },
        { prompt: 'What is a synonym for DELICIOUS?', options: ['Tasty', 'Boring', 'Cold', 'Bitter'], answer: 'Tasty' },
        { prompt: 'What is a synonym for TINY?', options: ['Miniature', 'Enormous', 'Gigantic', 'Heavy'], answer: 'Miniature' },
        { prompt: 'What is a synonym for TIRED?', options: ['Exhausted', 'Energetic', 'Awake', 'Excited'], answer: 'Exhausted' },
        { prompt: 'What is a synonym for QUIET?', options: ['Silent', 'Noisy', 'Loud', 'Chatty'], answer: 'Silent' }
      ],
      hard: [
        { prompt: 'What is a synonym for ABUNDANT?', options: ['Plentiful', 'Scarce', 'Empty', 'Rare'], answer: 'Plentiful' },
        { prompt: 'What is a synonym for PERILOUS?', options: ['Dangerous', 'Safe', 'Easy', 'Pleasant'], answer: 'Dangerous' },
        { prompt: 'What is a synonym for ASTONISHING?', options: ['Surprising', 'Boring', 'Common', 'Normal'], answer: 'Surprising' },
        { prompt: 'What is a synonym for CONCEAL?', options: ['Hide', 'Show', 'Reveal', 'Display'], answer: 'Hide' },
        { prompt: 'What is a synonym for SINCERE?', options: ['Honest', 'Fake', 'Dishonest', 'Sneaky'], answer: 'Honest' }
      ]
    }
  },
  {
    id: 'g32',
    title: 'Antonym Adventure',
    slug: 'antonym-adventure',
    category: 'english',
    subcategory: 'Antonyms',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🧭',
    colorTheme: 'emerald',
    description: 'Choose the correct opposite to progress through magical adventure gates!',
    instructions: 'Pick the direct antonym (opposite) of each highlighted word to unlock the path.',
    learningObjectives: ['Antonyms', 'Vocabulary comprehension', 'Reading context'],
    gameType: 'quiz',
    seoTitle: 'Antonym Adventure — Online Antonym Game for Kids',
    seoDescription: 'Navigate through adventure levels by identifying opposite words.',
    levels: {
      easy: [
        { prompt: 'Opposite of HARD (like a rock):', options: ['Soft', 'Heavy', 'Solid', 'Tough'], answer: 'Soft' },
        { prompt: 'Opposite of NEAR:', options: ['Far', 'Close', 'Beside', 'Next'], answer: 'Far' },
        { prompt: 'Opposite of EARLY:', options: ['Late', 'Soon', 'Quick', 'First'], answer: 'Late' },
        { prompt: 'Opposite of DRY:', options: ['Wet', 'Sunny', 'Warm', 'Sandy'], answer: 'Wet' },
        { prompt: 'Opposite of WIN:', options: ['Lose', 'Play', 'Score', 'Champion'], answer: 'Lose' }
      ],
      medium: [
        { prompt: 'Opposite of ANCIENT:', options: ['Modern', 'Old', 'Historical', 'Rustic'], answer: 'Modern' },
        { prompt: 'Opposite of SMOOTH:', options: ['Rough', 'Silky', 'Flat', 'Soft'], answer: 'Rough' },
        { prompt: 'Opposite of PEACEFUL:', options: ['Noisy / Chaos', 'Calm', 'Quiet', 'Serene'], answer: 'Noisy / Chaos' },
        { prompt: 'Opposite of ENEMY:', options: ['Friend / Ally', 'Foe', 'Stranger', 'Rival'], answer: 'Friend / Ally' },
        { prompt: 'Opposite of POISONOUS:', options: ['Harmless / Safe', 'Toxic', 'Deadly', 'Dangerous'], answer: 'Harmless / Safe' }
      ],
      hard: [
        { prompt: 'Opposite of OPTIMISTIC:', options: ['Pessimistic', 'Hopeful', 'Cheerful', 'Confident'], answer: 'Pessimistic' },
        { prompt: 'Opposite of PERMANENT:', options: ['Temporary', 'Endless', 'Constant', 'Forever'], answer: 'Temporary' },
        { prompt: 'Opposite of INFERIOR:', options: ['Superior', 'Lower', 'Lesser', 'Poor'], answer: 'Superior' },
        { prompt: 'Opposite of RIGID:', options: ['Flexible', 'Stiff', 'Hard', 'Solid'], answer: 'Flexible' },
        { prompt: 'Opposite of ARTIFICIAL:', options: ['Natural', 'Synthetic', 'Man-made', 'Fake'], answer: 'Natural' }
      ]
    }
  },
  {
    id: 'g33',
    title: 'Word Search',
    slug: 'word-search',
    category: 'spelling',
    subcategory: 'Puzzles',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🔍',
    colorTheme: 'cyan',
    description: 'Find hidden vocabulary words nestled in a letter grid!',
    instructions: 'Tap the start and end of hidden words in the grid to highlight them.',
    learningObjectives: ['Visual word search', 'Spelling recognition', 'Spatial scanning'],
    gameType: 'quiz',
    seoTitle: 'Word Search for Kids — Free Educational Word Grid Game',
    seoDescription: 'Find hidden animal, nature, and science words in interactive letter grids.',
    levels: {
      easy: [
        { prompt: 'Find the animal hidden in: [ C A T D O G ]', options: ['CAT', 'SUN', 'BOX', 'CUP'], answer: 'CAT' },
        { prompt: 'Find the bird hidden in: [ D U C K F O X ]', options: ['DUCK', 'FISH', 'FROG', 'BEAR'], answer: 'DUCK' },
        { prompt: 'Find the food hidden in: [ P I Z Z A B A T ]', options: ['PIZZA', 'APPLE', 'BREAD', 'MILK'], answer: 'PIZZA' }
      ],
      medium: [
        { prompt: 'Find the planet in: [ M A R S J U P I T E R ]', options: ['MARS', 'MOON', 'STAR', 'SUN'], answer: 'MARS' },
        { prompt: 'Find the ocean animal in: [ S H A R K T U R T L E ]', options: ['SHARK', 'EAGLE', 'LION', 'WOLF'], answer: 'SHARK' },
        { prompt: 'Find the instrument in: [ G U I T A R P I A N O ]', options: ['GUITAR', 'DRUM', 'FLUTE', 'BELL'], answer: 'GUITAR' }
      ],
      hard: [
        { prompt: 'Find the constellation in: [ O R I O N G A L A X Y ]', options: ['ORION', 'COMET', 'ASTEROID', 'METEOR'], answer: 'ORION' },
        { prompt: 'Find the ecosystem in: [ R A I N F O R E S T ]', options: ['RAINFOREST', 'DESERT', 'TUNDRA', 'SAVANNA'], answer: 'RAINFOREST' },
        { prompt: 'Find the microscopic organism in: [ B A C T E R I A ]', options: ['BACTERIA', 'VIRUS', 'CELL', 'FUNGUS'], answer: 'BACTERIA' }
      ]
    }
  },
  {
    id: 'g34',
    title: 'Sentence Builder',
    slug: 'sentence-builder',
    category: 'english',
    subcategory: 'Grammar',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '📝',
    colorTheme: 'blue',
    description: 'Assemble scrambled words into a meaningful, grammatically correct sentence.',
    instructions: 'Tap words in the proper sequence (Subject + Verb + Object) to form complete sentences.',
    learningObjectives: ['Sentence structure', 'Syntax and grammar', 'Capitalization and punctuation'],
    gameType: 'pattern-sequence',
    seoTitle: 'Sentence Builder — Kids Sentence Construction Game',
    seoDescription: 'Arrange scrambled words to build complete, grammatically sound sentences.',
    levels: {
      easy: [
        { prompt: 'Build a sentence:', items: ['cat.', 'The', 'sleeps'], correctOrder: ['The', 'cat.', 'sleeps'] },
        { prompt: 'Build a sentence:', items: ['is', 'Sun', 'bright.', 'The'], correctOrder: ['The', 'Sun', 'is', 'bright.'] },
        { prompt: 'Build a sentence:', items: ['plays', 'A', 'dog', 'fetch.'], correctOrder: ['A', 'dog', 'plays', 'fetch.'] }
      ],
      medium: [
        { prompt: 'Build a sentence:', items: ['Birds', 'in', 'sing', 'trees.', 'the'], correctOrder: ['Birds', 'sing', 'in', 'the', 'trees.'] },
        { prompt: 'Build a sentence:', items: ['reads', 'She', 'book.', 'an', 'exciting'], correctOrder: ['She', 'reads', 'an', 'exciting', 'book.'] },
        { prompt: 'Build a sentence:', items: ['orbit', 'around', 'Planets', 'sun.', 'the'], correctOrder: ['Planets', 'orbit', 'around', 'the', 'sun.'] }
      ],
      hard: [
        { prompt: 'Build a sentence:', items: ['astronauts', 'Brave', 'space', 'explored', 'station.', 'the'], correctOrder: ['Brave', 'astronauts', 'explored', 'the', 'space', 'station.'] },
        { prompt: 'Build a sentence:', items: ['provides', 'The', 'energy', 'sunlight', 'for', 'plants.'], correctOrder: ['The', 'sunlight', 'provides', 'energy', 'for', 'plants.'] },
        { prompt: 'Build a sentence:', items: ['Rainforests', 'contain', 'species.', 'diverse', 'millions', 'of'], correctOrder: ['Rainforests', 'contain', 'millions', 'of', 'diverse', 'species.'] }
      ]
    }
  },
  {
    id: 'g35',
    title: 'Grammar Detective',
    slug: 'grammar-detective',
    category: 'english',
    subcategory: 'Grammar',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🕵️‍♀️',
    colorTheme: 'purple',
    description: 'Investigate sentences and detect grammar, punctuation, or spelling mistakes!',
    instructions: 'Find which part of the sentence contains an error or choose the correct correction.',
    learningObjectives: ['Punctuation rules', 'Subject-verb agreement', 'Grammatical accuracy'],
    gameType: 'quiz',
    seoTitle: 'Grammar Detective — Spot Grammar Mistakes Game for Kids',
    seoDescription: 'Become a grammar detective and solve sentence error cases.',
    levels: {
      easy: [
        { prompt: 'Which sentence has correct capitalization?', options: ['The dog ran fast.', 'the dog ran fast.', 'The dog Ran fast.', 'the Dog ran Fast.'], answer: 'The dog ran fast.' },
        { prompt: 'Which sentence uses the correct end punctuation?', options: ['Where is my toy?', 'Where is my toy.', 'Where is my toy!', 'Where is my toy,'], answer: 'Where is my toy?' },
        { prompt: 'Choose the correct word: "They ____ going to the park."', options: ['are', 'is', 'am', 'was'], answer: 'are' },
        { prompt: 'Choose the correct word: "She ____ an apple every morning."', options: ['eats', 'eat', 'eating', 'eaten'], answer: 'eats' },
        { prompt: 'Which word should begin with a capital letter?', options: ['monday', 'apple', 'table', 'water'], answer: 'monday' }
      ],
      medium: [
        { prompt: 'Fix the error: "He don\'t know the answer."', options: ['He doesn\'t know', 'He not know', 'He didn\'t knows', 'He don\'t knows'], answer: 'He doesn\'t know' },
        { prompt: 'Choose correct homophone: "I can ____ the music loudly."', options: ['hear', 'here', 'hair', 'hare'], answer: 'hear' },
        { prompt: 'Choose correct word: "This is ____ jacket."', options: ['their', 'there', 'they\'re', 'theirs'], answer: 'their' },
        { prompt: 'Which sentence uses commas correctly?', options: ['I bought apples, bananas, and oranges.', 'I bought, apples bananas, and oranges.', 'I bought apples bananas and, oranges.', 'I bought apples, bananas and oranges,'], answer: 'I bought apples, bananas, and oranges.' },
        { prompt: 'Identify the past tense of RUN:', options: ['ran', 'runned', 'running', 'runs'], answer: 'ran' }
      ],
      hard: [
        { prompt: 'Choose the correct pronoun: "Between you and ____, this is exciting."', options: ['me', 'I', 'myself', 'mine'], answer: 'me' },
        { prompt: 'Choose correct word: "The heavy rain had an ____ on the harvest."', options: ['effect', 'affect', 'effective', 'affection'], answer: 'effect' },
        { prompt: 'Identify the adverb in: "The cheetah ran exceptionally fast."', options: ['exceptionally', 'cheetah', 'ran', 'fast'], answer: 'exceptionally' },
        { prompt: 'Which sentence has NO misplaced modifier?', options: ['Barking loudly, the puppy chased the ball.', 'Barking loudly, the ball was chased by puppy.', 'The puppy chased the ball barking loudly on floor.', 'Barking the ball loudly puppy chased.'], answer: 'Barking loudly, the puppy chased the ball.' },
        { prompt: 'Identify the conjunction in: "I wanted to go outside, but it rained."', options: ['but', 'wanted', 'outside', 'rained'], answer: 'but' }
      ]
    }
  },
  {
    id: 'g36',
    title: 'Noun or Verb?',
    slug: 'noun-or-verb',
    category: 'english',
    subcategory: 'Parts of Speech',
    ageRange: '6–10',
    minAge: 6,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🏷️',
    colorTheme: 'amber',
    description: 'Classify words into Nouns (naming person/place/thing) or Verbs (actions).',
    instructions: 'Determine if the word is an action you do (Verb) or a person, place, or thing (Noun).',
    learningObjectives: ['Parts of speech', 'Noun vs verb distinction', 'Syntax basics'],
    gameType: 'quiz',
    seoTitle: 'Noun or Verb? — Parts of Speech Sorting Game',
    seoDescription: 'Sort words into noun and verb categories with interactive feedback.',
    levels: {
      easy: [
        { prompt: 'Is "ELEPHANT" 🐘 a Noun or a Verb?', options: ['Noun (Person/Place/Thing)', 'Verb (Action Word)'], answer: 'Noun (Person/Place/Thing)' },
        { prompt: 'Is "JUMP" 🦘 a Noun or a Verb?', options: ['Verb (Action Word)', 'Noun (Person/Place/Thing)'], answer: 'Verb (Action Word)' },
        { prompt: 'Is "CASTLE" 🏰 a Noun or a Verb?', options: ['Noun (Person/Place/Thing)', 'Verb (Action Word)'], answer: 'Noun (Person/Place/Thing)' },
        { prompt: 'Is "DANCE" 💃 a Noun or a Verb?', options: ['Verb (Action Word)', 'Noun (Person/Place/Thing)'], answer: 'Verb (Action Word)' },
        { prompt: 'Is "PIZZA" 🍕 a Noun or a Verb?', options: ['Noun (Person/Place/Thing)', 'Verb (Action Word)'], answer: 'Noun (Person/Place/Thing)' }
      ],
      medium: [
        { prompt: 'In "The bird sings sweetly", what is SINGS?', options: ['Verb', 'Noun', 'Adjective', 'Pronoun'], answer: 'Verb' },
        { prompt: 'In "The ocean is vast", what is OCEAN?', options: ['Noun', 'Verb', 'Adverb', 'Preposition'], answer: 'Noun' },
        { prompt: 'Is "WHISPER" an action or thing?', options: ['Verb (Action)', 'Noun (Thing)'], answer: 'Verb (Action)' },
        { prompt: 'Is "GALAXY" a Noun or Verb?', options: ['Noun', 'Verb'], answer: 'Noun' },
        { prompt: 'In "Cheetahs sprint quickly", what is SPRINT?', options: ['Verb', 'Noun', 'Adjective', 'Conjunction'], answer: 'Verb' }
      ],
      hard: [
        { prompt: 'Identify the Adjective in: "The shiny silver rocket soared."', options: ['shiny', 'rocket', 'soared', 'The'], answer: 'shiny' },
        { prompt: 'Identify the Proper Noun: "We visited Paris during summer."', options: ['Paris', 'visited', 'summer', 'We'], answer: 'Paris' },
        { prompt: 'Identify the Abstract Noun: "Kindness makes the world brighter."', options: ['Kindness', 'world', 'brighter', 'makes'], answer: 'Kindness' },
        { prompt: 'Identify the Pronoun in: "She gave them a present."', options: ['She / them', 'gave', 'present', 'a'], answer: 'She / them' },
        { prompt: 'In "The dog barked at its reflection", what is REFLECTION?', options: ['Noun', 'Verb', 'Adjective', 'Preposition'], answer: 'Noun' }
      ]
    }
  },
  {
    id: 'g37',
    title: 'Plural Words Challenge',
    slug: 'plural-words-challenge',
    category: 'spelling',
    subcategory: 'Plurals',
    ageRange: '6–10',
    minAge: 6,
    maxAge: 10,
    difficulty: 'Medium',
    icon: '👥',
    colorTheme: 'rose',
    description: 'Transform singular words into their correct regular and irregular plural forms!',
    instructions: 'Select the correctly spelled plural version (e.g. Cat -> Cats, Box -> Boxes, Child -> Children).',
    learningObjectives: ['Plural spelling rules (-s, -es, -ies)', 'Irregular plurals', 'Morphological understanding'],
    gameType: 'quiz',
    seoTitle: 'Plural Words Challenge — Kids Plural Nouns Game',
    seoDescription: 'Master plural rules with regular and irregular noun challenges.',
    levels: {
      easy: [
        { prompt: 'Plural of CAT 🐱:', options: ['Cats', 'Cates', 'Caties', 'Catss'], answer: 'Cats' },
        { prompt: 'Plural of DOG 🐶:', options: ['Dogs', 'Doges', 'Dogies', 'Dogz'], answer: 'Dogs' },
        { prompt: 'Plural of BOOK 📖:', options: ['Books', 'Bookes', 'Bookies', 'Bookx'], answer: 'Books' },
        { prompt: 'Plural of APPLE 🍎:', options: ['Apples', 'Applees', 'Applis', 'Applez'], answer: 'Apples' },
        { prompt: 'Plural of TREE 🌳:', options: ['Trees', 'Treees', 'Treies', 'Treex'], answer: 'Trees' }
      ],
      medium: [
        { prompt: 'Plural of BOX 📦:', options: ['Boxes', 'Boxs', 'Boxies', 'Boxen'], answer: 'Boxes' },
        { prompt: 'Plural of BABY 👶:', options: ['Babies', 'Babys', 'Babyes', 'Babi'], answer: 'Babies' },
        { prompt: 'Plural of FOX 🦊:', options: ['Foxes', 'Foxs', 'Foxies', 'Foxen'], answer: 'Foxes' },
        { prompt: 'Plural of LEAF 🍃:', options: ['Leaves', 'Leafs', 'Leafes', 'Leavies'], answer: 'Leaves' },
        { prompt: 'Plural of WATCH ⌚:', options: ['Watches', 'Watchs', 'Watchies', 'Watchez'], answer: 'Watches' }
      ],
      hard: [
        { prompt: 'Plural of CHILD 🧒:', options: ['Children', 'Childs', 'Childrens', 'Childes'], answer: 'Children' },
        { prompt: 'Plural of TOOTH 🦷:', options: ['Teeth', 'Tooths', 'Teethes', 'Toothes'], answer: 'Teeth' },
        { prompt: 'Plural of MOUSE 🐭:', options: ['Mice', 'Mouses', 'Mices', 'Mousen'], answer: 'Mice' },
        { prompt: 'Plural of CACTUS 🌵:', options: ['Cacti', 'Cactuses', 'Cactis', 'Cactii'], answer: 'Cacti' },
        { prompt: 'Plural of SHEEP 🐑:', options: ['Sheep (stays same)', 'Sheeps', 'Sheepes', 'Shoop'], answer: 'Sheep (stays same)' }
      ]
    }
  },
  {
    id: 'g38',
    title: 'Singular-to-Plural Race',
    slug: 'singular-to-plural-race',
    category: 'spelling',
    subcategory: 'Speed Plurals',
    ageRange: '7–11',
    minAge: 7,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '⚡',
    colorTheme: 'teal',
    description: 'Race against the ticking timer by converting singular nouns to plurals!',
    instructions: 'Quickly select the right plural form before the countdown ends.',
    learningObjectives: ['Rapid recall', 'Plural rule application', 'Speed fluency'],
    gameType: 'quiz',
    seoTitle: 'Singular-to-Plural Race — Fast Spelling Race for Kids',
    seoDescription: 'Test your speed converting singular nouns into plural plurals.',
    levels: {
      easy: [
        { prompt: 'Plural of STAR ⭐:', options: ['Stars', 'Stares', 'Staries', 'Starz'], answer: 'Stars' },
        { prompt: 'Plural of CAR 🚗:', options: ['Cars', 'Cares', 'Caries', 'Carz'], answer: 'Cars' },
        { prompt: 'Plural of CUP ☕:', options: ['Cups', 'Cupes', 'Cupies', 'Cupz'], answer: 'Cups' },
        { prompt: 'Plural of BALL ⚽:', options: ['Balls', 'Balles', 'Ballies', 'Ballz'], answer: 'Balls' },
        { prompt: 'Plural of DUCK 🦆:', options: ['Ducks', 'Duckes', 'Duckies', 'Duckz'], answer: 'Ducks' }
      ],
      medium: [
        { prompt: 'Plural of CITY 🏙️:', options: ['Cities', 'Citys', 'Cityes', 'Citis'], answer: 'Cities' },
        { prompt: 'Plural of WISH ✨:', options: ['Wishes', 'Wishs', 'Wishies', 'Wishez'], answer: 'Wishes' },
        { prompt: 'Plural of KNIFE 🔪:', options: ['Knives', 'Knifes', 'Knifing', 'Knivees'], answer: 'Knives' },
        { prompt: 'Plural of GLASS 🥛:', options: ['Glasses', 'Glasss', 'Glassies', 'Glasse'], answer: 'Glasses' },
        { prompt: 'Plural of BUTTERFLY 🦋:', options: ['Butterflies', 'Butterflys', 'Butterfles', 'Butterflyes'], answer: 'Butterflies' }
      ],
      hard: [
        { prompt: 'Plural of PERSON 🧑:', options: ['People', 'Persons', 'Peoples', 'Persones'], answer: 'People' },
        { prompt: 'Plural of FOOT 🦶:', options: ['Feet', 'Foots', 'Feets', 'Footes'], answer: 'Feet' },
        { prompt: 'Plural of GOOSE 🪿:', options: ['Geese', 'Gooses', 'Geeses', 'Goosen'], answer: 'Geese' },
        { prompt: 'Plural of CRISIS 💥:', options: ['Crises', 'Crisiss', 'Crisises', 'Crisi'], answer: 'Crises' },
        { prompt: 'Plural of PHENOMENON 🌌:', options: ['Phenomena', 'Phenomenons', 'Phenomenas', 'Phenomene'], answer: 'Phenomena' }
      ]
    }
  },
  {
    id: 'g39',
    title: 'Vocabulary Memory',
    slug: 'vocabulary-memory',
    category: 'memory',
    subcategory: 'Vocabulary',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🧠',
    colorTheme: 'purple',
    description: 'Flip cards and match rich vocabulary words with their meanings or icons.',
    instructions: 'Find the pairs connecting words with their definitions in this 3D memory challenge.',
    learningObjectives: ['Vocabulary retention', 'Word association', 'Concentration'],
    gameType: 'memory',
    seoTitle: 'Vocabulary Memory — Word & Meaning Matching Game',
    seoDescription: 'Flip cards to match new words with definitions and illustrations.',
    levels: {
      easy: { pairs: [['ASTRONAUT', '👨‍🚀 Space Flyer'], ['VOLCANO', '🌋 Lava Mountain'], ['RAINBOW', '🌈 Colorful Sky'], ['TELESCOPE', '🔭 Star Viewer']] },
      medium: { pairs: [['MIGRATION', '🦅 Animal Travel'], ['FOSSIL', '🦴 Ancient Bone'], ['HABITAT', '🏡 Natural Home'], ['SOLAR', '☀️ Sun Energy'], ['HERBIVORE', '🌿 Plant Eater'], ['PREDATOR', '🦁 Hunter Animal']] },
      hard: { pairs: [['ECOSYSTEM', '🌱 Living Web'], ['GRAVITY', '🌌 Pulling Force'], ['ATMOSPHERE', '💨 Air Layer'], ['CHLOROPHYLL', '🍃 Green Sun Trapper'], ['METAMORPHOSIS', '🦋 Life Change'], ['EXPEDITION', '🗺️ Journey Quest'], ['RENEWABLE', '♻️ Clean Energy'], ['CARNIVORE', '🥩 Meat Eater']] }
    }
  },
  {
    id: 'g40',
    title: 'Picture-to-Word Match',
    slug: 'picture-to-word-match',
    category: 'english',
    subcategory: 'Reading',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🖼️',
    colorTheme: 'blue',
    description: 'Look at the colorful illustration and pick the exact matching word!',
    instructions: 'Identify what is pictured in the card and click the matching written word.',
    learningObjectives: ['Sight word association', 'Early reading confidence', 'Object identification'],
    gameType: 'quiz',
    seoTitle: 'Picture-to-Word Match — Early Reading Game for Kids',
    seoDescription: 'Connect pictures with sight words to build kindergarten and 1st grade reading fluency.',
    levels: {
      easy: [
        { prompt: 'What is this? 🦁', options: ['LION', 'TIGER', 'BEAR', 'WOLF'], answer: 'LION' },
        { prompt: 'What is this? 🚀', options: ['ROCKET', 'PLANE', 'CAR', 'TRAIN'], answer: 'ROCKET' },
        { prompt: 'What is this? 🍕', options: ['PIZZA', 'BURGER', 'APPLE', 'BREAD'], answer: 'PIZZA' },
        { prompt: 'What is this? 🎸', options: ['GUITAR', 'DRUM', 'PIANO', 'BELL'], answer: 'GUITAR' },
        { prompt: 'What is this? 🌻', options: ['FLOWER', 'TREE', 'LEAF', 'GRASS'], answer: 'FLOWER' }
      ],
      medium: [
        { prompt: 'What is this? 🦩', options: ['FLAMINGO', 'PARROT', 'EAGLE', 'OWL'], answer: 'FLAMINGO' },
        { prompt: 'What is this? 🚁', options: ['HELICOPTER', 'AIRPLANE', 'ROCKET', 'SUBMARINE'], answer: 'HELICOPTER' },
        { prompt: 'What is this? 🏰', options: ['CASTLE', 'HOUSE', 'CABIN', 'TENT'], answer: 'CASTLE' },
        { prompt: 'What is this? 🐬', options: ['DOLPHIN', 'SHARK', 'WHALE', 'SEAL'], answer: 'DOLPHIN' },
        { prompt: 'What is this? 🔭', options: ['TELESCOPE', 'MICROSCOPE', 'CAMERA', 'BINOCULARS'], answer: 'TELESCOPE' }
      ],
      hard: [
        { prompt: 'What is this instrument? 🔬', options: ['MICROSCOPE', 'TELESCOPE', 'STETHOSCOPE', 'PERISCOPE'], answer: 'MICROSCOPE' },
        { prompt: 'What is this amphibian? 🦎', options: ['CHAMELEON', 'SALAMANDER', 'IGUANA', 'GECKO'], answer: 'CHAMELEON' },
        { prompt: 'What is this monument? 🗽', options: ['STATUE OF LIBERTY', 'EIFFEL TOWER', 'BIG BEN', 'TAJ MAHAL'], answer: 'STATUE OF LIBERTY' },
        { prompt: 'What celestial object is this? 🪐', options: ['SATURN', 'JUPITER', 'MARS', 'NEPTUNE'], answer: 'SATURN' },
        { prompt: 'What structure is this? 🛕', options: ['TEMPLE', 'PYRAMID', 'PAGODA', 'IGLOO'], answer: 'TEMPLE' }
      ]
    }
  }
];
