// games-science.js - Science & Nature Games (Games 41–55)

window.GAMES_SCIENCE = [
  {
    id: 'g41',
    title: 'Animal Sound Guess',
    slug: 'animal-sound-guess',
    category: 'science',
    subcategory: 'Animals',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🐾',
    colorTheme: 'amber',
    description: 'Listen to the onomatopoeia or audio clue and identify which animal makes the sound!',
    instructions: 'Read or listen to the sound description and select the animal picture.',
    learningObjectives: ['Animal classification', 'Auditory recognition', 'Zoology basics'],
    gameType: 'quiz',
    seoTitle: 'Animal Sound Guess — Fun Animal Sounds Game for Toddlers & Kids',
    seoDescription: 'Guess animal sounds and discover fun facts about creature calls.',
    levels: {
      easy: [
        { prompt: 'Which animal says "Moo-moo!"? 🐮', options: ['Cow 🐄', 'Dog 🐶', 'Duck 🦆', 'Cat 🐱'], answer: 'Cow 🐄' },
        { prompt: 'Which animal says "Woof-woof!"? 🐶', options: ['Dog 🐕', 'Lion 🦁', 'Frog 🐸', 'Sheep 🐑'], answer: 'Dog 🐕' },
        { prompt: 'Which animal says "Quack-quack!"? 🦆', options: ['Duck 🦆', 'Pig 🐷', 'Horse 🐴', 'Chicken 🐔'], answer: 'Duck 🦆' },
        { prompt: 'Which animal says "Roar!"? 🦁', options: ['Lion 🦁', 'Mouse 🐭', 'Rabbit 🐰', 'Fish 🐟'], answer: 'Lion 🦁' },
        { prompt: 'Which animal says "Ribbit-ribbit!"? 🐸', options: ['Frog 🐸', 'Elephant 🐘', 'Monkey 🐒', 'Bird 🐦'], answer: 'Frog 🐸' }
      ],
      medium: [
        { prompt: 'Which bird says "Hoot-hoot" at night? 🦉', options: ['Owl 🦉', 'Eagle 🦅', 'Parrot 🦜', 'Penguin 🐧'], answer: 'Owl 🦉' },
        { prompt: 'Which animal makes a "Trumpet" sound with its trunk? 🐘', options: ['Elephant 🐘', 'Rhino 🦏', 'Hippo 🦛', 'Giraffe 🦒'], answer: 'Elephant 🐘' },
        { prompt: 'Which animal makes a "Hiss" sound as it slithers? 🐍', options: ['Snake 🐍', 'Turtle 🐢', 'Lizard 🦎', 'Crocodile 🐊'], answer: 'Snake 🐍' },
        { prompt: 'Which insect makes a "Buzz" sound while flying? 🐝', options: ['Bee 🐝', 'Butterfly 🦋', 'Ant 🐜', 'Ladybug 🐞'], answer: 'Bee 🐝' },
        { prompt: 'Which animal makes a "Neigh" sound? 🐴', options: ['Horse 🐴', 'Cow 🐄', 'Goat 🐐', 'Sheep 🐑'], answer: 'Horse 🐴' }
      ],
      hard: [
        { prompt: 'Which marine mammal uses clicks and whistles (echolocation)? 🐬', options: ['Dolphin 🐬', 'Shark 🦈', 'Octopus 🐙', 'Crab 🦀'], answer: 'Dolphin 🐬' },
        { prompt: 'Which animal communicates by howling in packs across miles? 🐺', options: ['Wolf 🐺', 'Fox 🦊', 'Hyena 🐆', 'Bear 🐻'], answer: 'Wolf 🐺' },
        { prompt: 'Male crickets produce their chirping sound by: 🦗', options: ['Rubbing their wings together', 'Vocal cords', 'Tapping legs on ground', 'Blowing air'], answer: 'Rubbing their wings together' },
        { prompt: 'Which bird is famous for mimicking human voices and sounds? 🦜', options: ['Parrot 🦜', 'Seagull 🕊️', 'Flamingo 🦩', 'Stork 🪽'], answer: 'Parrot 🦜' },
        { prompt: 'Whale vocalizations that travel thousands of miles underwater are called:', options: ['Whale Songs', 'Whale Roars', 'Whale Chirps', 'Whale Barks'], answer: 'Whale Songs' }
      ]
    }
  },
  {
    id: 'g42',
    title: 'Animal Habitat Match',
    slug: 'animal-habitat-match',
    category: 'science',
    subcategory: 'Ecology',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🏞️',
    colorTheme: 'emerald',
    description: 'Place animals into their natural home habitats: Ocean, Desert, Arctic, Jungle, or Forest.',
    instructions: 'Drag or select the animal and place it into the correct biome habitat.',
    learningObjectives: ['Biomes & habitats', 'Animal adaptations', 'Ecosystem understanding'],
    gameType: 'drag-drop',
    seoTitle: 'Animal Habitat Match — Ecology Game for Children',
    seoDescription: 'Match polar bears, camels, and monkeys to their correct natural habitats.',
    levels: {
      easy: [
        { prompt: 'Where does the Polar Bear 🐻‍❄️ live?', slots: ['Arctic Ice ❄️', 'Desert 🏜️', 'Jungle 🌴'], correct: 'Arctic Ice ❄️', options: ['Arctic Ice ❄️', 'Desert 🏜️', 'Jungle 🌴'] },
        { prompt: 'Where does the Camel 🐪 live?', slots: ['Desert 🏜️', 'Ocean 🌊', 'Forest 🌲'], correct: 'Desert 🏜️', options: ['Desert 🏜️', 'Ocean 🌊', 'Forest 🌲'] },
        { prompt: 'Where does the Clownfish 🐠 live?', slots: ['Coral Reef Ocean 🌊', 'Desert 🏜️', 'Savanna 🌾'], correct: 'Coral Reef Ocean 🌊', options: ['Coral Reef Ocean 🌊', 'Desert 🏜️', 'Savanna 🌾'] },
        { prompt: 'Where does the Monkey 🐒 live?', slots: ['Tropical Jungle 🌴', 'Arctic ❄️', 'Cave 🪨'], correct: 'Tropical Jungle 🌴', options: ['Tropical Jungle 🌴', 'Arctic ❄️', 'Cave 🪨'] }
      ],
      medium: [
        { prompt: 'Where does the Emperor Penguin 🐧 live?', slots: ['Antarctic Ice Shelf ❄️', 'Savanna 🌾', 'Forest 🌲'], correct: 'Antarctic Ice Shelf ❄️', options: ['Antarctic Ice Shelf ❄️', 'Savanna 🌾', 'Forest 🌲'] },
        { prompt: 'Where does the Kangaroo 🦘 live naturally?', slots: ['Australian Outback 🌾', 'Deep Ocean 🌊', 'Tundra 🏔️'], correct: 'Australian Outback 🌾', options: ['Australian Outback 🌾', 'Deep Ocean 🌊', 'Tundra 🏔️'] },
        { prompt: 'Where does the Beaver 🦫 build its home?', slots: ['Freshwater River / Lake 🪵', 'Desert Dunes 🏜️', 'Treetops 🌴'], correct: 'Freshwater River / Lake 🪵', options: ['Freshwater River / Lake 🪵', 'Desert Dunes 🏜️', 'Treetops 🌴'] },
        { prompt: 'Where does the Toucan 🦜 live?', slots: ['Rainforest Canopy 🌳', 'Desert 🏜️', 'Polar Ice ❄️'], correct: 'Rainforest Canopy 🌳', options: ['Rainforest Canopy 🌳', 'Desert 🏜️', 'Polar Ice ❄️'] }
      ],
      hard: [
        { prompt: 'Where does the Snow Leopard 🐆 live?', slots: ['High Mountain Crags 🏔️', 'Swamp 🌾', 'Tropical Beach 🏖️'], correct: 'High Mountain Crags 🏔️', options: ['High Mountain Crags 🏔️', 'Swamp 🌾', 'Tropical Beach 🏖️'] },
        { prompt: 'Where does the Anglerfish 🐡 thrive?', slots: ['Abyssal Deep Ocean 🌌', 'Coral Reef 🪸', 'River Stream 🏞️'], correct: 'Abyssal Deep Ocean 🌌', options: ['Abyssal Deep Ocean 🌌', 'Coral Reef 🪸', 'River Stream 🏞️'] },
        { prompt: 'Where does the Fennec Fox 🦊 live?', slots: ['Sahara Desert 🏜️', 'Taiga Forest 🌲', 'Marshland 🌾'], correct: 'Sahara Desert 🏜️', options: ['Sahara Desert 🏜️', 'Taiga Forest 🌲', 'Marshland 🌾'] }
      ]
    }
  },
  {
    id: 'g43',
    title: 'Food Chain Builder',
    slug: 'food-chain-builder',
    category: 'science',
    subcategory: 'Ecology',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '🌿',
    colorTheme: 'teal',
    description: 'Arrange organisms into a working food chain from producers to apex predators!',
    instructions: 'Order organisms showing who eats whom in nature (Sun -> Producer -> Herbivore -> Carnivore).',
    learningObjectives: ['Producers, consumers, decomposers', 'Energy flow in nature', 'Food chains & webs'],
    gameType: 'pattern-sequence',
    seoTitle: 'Food Chain Builder — Science Food Web Game for Kids',
    seoDescription: 'Build food chains and understand how energy flows through living ecosystems.',
    levels: {
      easy: [
        { prompt: 'Build the Meadow Food Chain:', items: ['Grass 🌿', 'Rabbit 🐰', 'Fox 🦊', 'Sun ☀️'], correctOrder: ['Sun ☀️', 'Grass 🌿', 'Rabbit 🐰', 'Fox 🦊'] },
        { prompt: 'Build the Pond Food Chain:', items: ['Algae 🌱', 'Small Fish 🐟', 'Heron Bird 🪿', 'Sun ☀️'], correctOrder: ['Sun ☀️', 'Algae 🌱', 'Small Fish 🐟', 'Heron Bird 🪿'] }
      ],
      medium: [
        { prompt: 'Build the Forest Chain:', items: ['Acorn / Tree 🌰', 'Squirrel 🐿️', 'Hawk 🦅', 'Sun ☀️'], correctOrder: ['Sun ☀️', 'Acorn / Tree 🌰', 'Squirrel 🐿️', 'Hawk 🦅'] },
        { prompt: 'Build the Ocean Chain:', items: ['Plankton 🦠', 'Shrimp 🦐', 'Tuna 🐟', 'Shark 🦈'], correctOrder: ['Plankton 🦠', 'Shrimp 🦐', 'Tuna 🐟', 'Shark 🦈'] },
        { prompt: 'Build the Garden Chain:', items: ['Leaf 🍃', 'Caterpillar 🐛', 'Sparrow 🐦', 'Cat 🐱'], correctOrder: ['Leaf 🍃', 'Caterpillar 🐛', 'Sparrow 🐦', 'Cat 🐱'] }
      ],
      hard: [
        { prompt: 'Build the African Savanna Chain:', items: ['Grassland 🌾', 'Zebra 🦓', 'Lion 🦁', 'Vulture / Decomposer 🦅'], correctOrder: ['Grassland 🌾', 'Zebra 🦓', 'Lion 🦁', 'Vulture / Decomposer 🦅'] },
        { prompt: 'Build the Arctic Tundra Chain:', items: ['Arctic Moss 🌱', 'Lemming 🐹', 'Snowy Owl 🦉', 'Arctic Fox 🦊'], correctOrder: ['Arctic Moss 🌱', 'Lemming 🐹', 'Snowy Owl 🦉', 'Arctic Fox 🦊'] },
        { prompt: 'Build the Deep Sea Chain:', items: ['Phytoplankton 🔬', 'Zooplankton 🦐', 'Squid 🦑', 'Sperm Whale 🐋'], correctOrder: ['Phytoplankton 🔬', 'Zooplankton 🦐', 'Squid 🦑', 'Sperm Whale 🐋'] }
      ]
    }
  },
  {
    id: 'g44',
    title: 'Human Body Explorer',
    slug: 'human-body-explorer',
    category: 'science',
    subcategory: 'Anatomy',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🫀',
    colorTheme: 'rose',
    description: 'Explore the amazing human body and discover how your heart, lungs, and brain work!',
    instructions: 'Answer questions about organ functions and identify body systems.',
    learningObjectives: ['Human anatomy', 'Major organs (heart, brain, lungs, stomach)', 'Body systems'],
    gameType: 'quiz',
    seoTitle: 'Human Body Explorer — Interactive Anatomy Game for Kids',
    seoDescription: 'Learn about human organs, bones, and muscles in a colorful anatomy adventure.',
    levels: {
      easy: [
        { prompt: 'Which organ pumps blood throughout your whole body? 🫀', options: ['Heart', 'Brain', 'Lungs', 'Stomach'], answer: 'Heart' },
        { prompt: 'Which organ do you use to think, dream, and learn? 🧠', options: ['Brain', 'Heart', 'Kidneys', 'Liver'], answer: 'Brain' },
        { prompt: 'Which organs help you breathe in fresh oxygen? 🫁', options: ['Lungs', 'Stomach', 'Bones', 'Skin'], answer: 'Lungs' },
        { prompt: 'What helps you digest yummy food? 🥣', options: ['Stomach', 'Lungs', 'Brain', 'Ears'], answer: 'Stomach' },
        { prompt: 'What is the largest organ of the human body that covers you completely?', options: ['Skin', 'Heart', 'Liver', 'Brain'], answer: 'Skin' }
      ],
      medium: [
        { prompt: 'How many bones are in an adult human skeleton? 🦴', options: ['206', '150', '300', '100'], answer: '206' },
        { prompt: 'What protects your brain inside your head? 💀', options: ['Skull (Cranium)', 'Ribcage', 'Spine', 'Pelvis'], answer: 'Skull (Cranium)' },
        { prompt: 'Which organs filter waste and extra water from your blood?', options: ['Kidneys', 'Lungs', 'Stomach', 'Muscles'], answer: 'Kidneys' },
        { prompt: 'What connects your muscles to your bones? 🦾', options: ['Tendons', 'Arteries', 'Nerves', 'Glands'], answer: 'Tendons' },
        { prompt: 'What gives red blood cells their red color and carries oxygen?', options: ['Hemoglobin', 'Chlorophyll', 'Calcium', 'Melanin'], answer: 'Hemoglobin' }
      ],
      hard: [
        { prompt: 'Which part of the brain controls balance and movement coordination?', options: ['Cerebellum', 'Cerebrum', 'Brainstem', 'Hippocampus'], answer: 'Cerebellum' },
        { prompt: 'What are the tiny air sacs in the lungs where gas exchange occurs?', options: ['Alveoli', 'Bronchi', 'Capillaries', 'Villi'], answer: 'Alveoli' },
        { prompt: 'Which blood vessels carry oxygen-rich blood AWAY from the heart?', options: ['Arteries', 'Veins', 'Capillaries', 'Lymph vessels'], answer: 'Arteries' },
        { prompt: 'What is the strongest and longest bone in the human body?', options: ['Femur (thigh bone)', 'Tibia', 'Humerus', 'Spine'], answer: 'Femur (thigh bone)' },
        { prompt: 'Which system defends your body against viruses and bacteria? 🛡️', options: ['Immune System', 'Digestive System', 'Skeletal System', 'Endocrine System'], answer: 'Immune System' }
      ]
    }
  },
  {
    id: 'g45',
    title: 'Parts of a Plant',
    slug: 'parts-of-a-plant',
    category: 'science',
    subcategory: 'Botany',
    ageRange: '5–9',
    minAge: 5,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🌻',
    colorTheme: 'emerald',
    description: 'Discover how roots, stems, leaves, flowers, and seeds help plants grow!',
    instructions: 'Identify the plant part that performs each vital role in plant life.',
    learningObjectives: ['Plant anatomy', 'Photosynthesis basics', 'Seed dispersal'],
    gameType: 'quiz',
    seoTitle: 'Parts of a Plant — Botany Learning Game for Kids',
    seoDescription: 'Explore roots, leaves, flowers, and stems in this fun plant science game.',
    levels: {
      easy: [
        { prompt: 'Which part absorbs water and nutrients from the soil below? 🪵', options: ['Roots', 'Leaves', 'Flower', 'Petals'], answer: 'Roots' },
        { prompt: 'Which part catches sunlight to make food for the plant? 🍃', options: ['Leaves', 'Roots', 'Bark', 'Thorns'], answer: 'Leaves' },
        { prompt: 'Which part holds the plant upright and carries water upward? 🪴', options: ['Stem / Trunk', 'Flower', 'Seeds', 'Roots'], answer: 'Stem / Trunk' },
        { prompt: 'Which colorful part attracts bees and butterflies for pollination? 🌸', options: ['Flower', 'Roots', 'Soil', 'Stem'], answer: 'Flower' },
        { prompt: 'What grows into a whole new baby plant? 🌱', options: ['Seed', 'Leaf', 'Petal', 'Pollen'], answer: 'Seed' }
      ],
      medium: [
        { prompt: 'What is the green pigment in leaves that traps sunlight?', options: ['Chlorophyll', 'Melanin', 'Carotene', 'Pollen'], answer: 'Chlorophyll' },
        { prompt: 'The process plants use to make food using sunlight and carbon dioxide is:', options: ['Photosynthesis', 'Respiration', 'Evaporation', 'Germination'], answer: 'Photosynthesis' },
        { prompt: 'What gas do plants release into the air that humans breathe in? 💨', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'], answer: 'Oxygen' },
        { prompt: 'What tiny powder inside flowers is carried by bees to pollinate plants?', options: ['Pollen', 'Nectar', 'Chlorophyll', 'Sap'], answer: 'Pollen' },
        { prompt: 'When a seed begins to sprout roots and shoots, it is called:', options: ['Germination', 'Pollination', 'Transpiration', 'Fertilization'], answer: 'Germination' }
      ],
      hard: [
        { prompt: 'What vascular tissue transports water upwards from roots to leaves?', options: ['Xylem', 'Phloem', 'Cambium', 'Epidermis'], answer: 'Xylem' },
        { prompt: 'What vascular tissue transports sugars and food from leaves throughout the plant?', options: ['Phloem', 'Xylem', 'Cortex', 'Pith'], answer: 'Phloem' },
        { prompt: 'What are the microscopic pores under leaves used for gas exchange called?', options: ['Stomata', 'Chloroplasts', 'Vacuoles', 'Nodes'], answer: 'Stomata' },
        { prompt: 'Which plant group produces cones instead of flowers (like pine trees)?', options: ['Gymnosperms / Conifers', 'Angiosperms', 'Bryophytes', 'Ferns'], answer: 'Gymnosperms / Conifers' },
        { prompt: 'What part of a flower develops into a fruit after fertilization?', options: ['Ovary', 'Stigma', 'Anther', 'Petal'], answer: 'Ovary' }
      ]
    }
  },
  {
    id: 'g46',
    title: 'Life Cycle Builder',
    slug: 'life-cycle-builder',
    category: 'science',
    subcategory: 'Biology',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🦋',
    colorTheme: 'purple',
    description: 'Arrange the stages of butterfly, frog, plant, and chicken life cycles in order!',
    instructions: 'Order the biological stages from egg/seed to adult.',
    learningObjectives: ['Metamorphosis', 'Life cycles', 'Biological growth stages'],
    gameType: 'pattern-sequence',
    seoTitle: 'Life Cycle Builder — Biology Metamorphosis Game for Kids',
    seoDescription: 'Sequence the life cycles of butterflies, frogs, and plants in interactive order.',
    levels: {
      easy: [
        { prompt: 'Butterfly Life Cycle:', items: ['Egg 🥚', 'Caterpillar 🐛', 'Chrysalis / Pupa 🛖', 'Butterfly 🦋'], correctOrder: ['Egg 🥚', 'Caterpillar 🐛', 'Chrysalis / Pupa 🛖', 'Butterfly 🦋'] },
        { prompt: 'Frog Life Cycle:', items: ['Frogspawn (Eggs) 🥚', 'Tadpole 🐟', 'Froglet 🐸', 'Adult Frog 🐸'], correctOrder: ['Frogspawn (Eggs) 🥚', 'Tadpole 🐟', 'Froglet 🐸', 'Adult Frog 🐸'] }
      ],
      medium: [
        { prompt: 'Plant Life Cycle:', items: ['Seed 🌱', 'Sprout 🌿', 'Seedling 🪴', 'Mature Flowering Plant 🌻'], correctOrder: ['Seed 🌱', 'Sprout 🌿', 'Seedling 🪴', 'Mature Flowering Plant 🌻'] },
        { prompt: 'Chicken Life Cycle:', items: ['Egg in Nest 🪺', 'Hatching Chick 🐣', 'Young Chick 🐥', 'Adult Hen / Rooster 🐓'], correctOrder: ['Egg in Nest 🪺', 'Hatching Chick 🐣', 'Young Chick 🐥', 'Adult Hen / Rooster 🐓'] }
      ],
      hard: [
        { prompt: 'Honeybee Life Cycle:', items: ['Egg in honeycomb 🥚', 'Larva 🐛', 'Pupa in sealed cell 🐝', 'Adult Worker Bee 🐝'], correctOrder: ['Egg in honeycomb 🥚', 'Larva 🐛', 'Pupa in sealed cell 🐝', 'Adult Worker Bee 🐝'] },
        { prompt: 'Salmon Fish Life Cycle:', items: ['Egg in river gravel 🥚', 'Alevin / Fry 🐟', 'Smolt heading to sea 🐟', 'Spawning Adult Salmon 🐟'], correctOrder: ['Egg in river gravel 🥚', 'Alevin / Fry 🐟', 'Smolt heading to sea 🐟', 'Spawning Adult Salmon 🐟'] }
      ]
    }
  },
  {
    id: 'g47',
    title: 'Solar System Explorer',
    slug: 'solar-system-explorer',
    category: 'science',
    subcategory: 'Astronomy',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🪐',
    colorTheme: 'indigo',
    description: 'Blast off on a space mission to explore our Sun, 8 planets, and mysterious moons!',
    instructions: 'Answer astronomy trivia and discover planetary facts.',
    learningObjectives: ['Solar system planets', 'Planetary characteristics', 'Space exploration'],
    gameType: 'quiz',
    seoTitle: 'Solar System Explorer — Kids Astronomy & Planets Game',
    seoDescription: 'Explore the 8 planets, asteroid belt, and Sun in this interactive solar system quiz.',
    levels: {
      easy: [
        { prompt: 'Which planet is closest to the Sun? ☀️', options: ['Mercury', 'Venus', 'Earth', 'Mars'], answer: 'Mercury' },
        { prompt: 'Which planet is called the "Red Planet"? 🔴', options: ['Mars', 'Jupiter', 'Saturn', 'Mercury'], answer: 'Mars' },
        { prompt: 'Which is the largest planet in our solar system? 🪐', options: ['Jupiter', 'Saturn', 'Earth', 'Neptune'], answer: 'Jupiter' },
        { prompt: 'Which planet has bright, majestic rings made of ice and rock? 💍', options: ['Saturn', 'Mars', 'Mercury', 'Venus'], answer: 'Saturn' },
        { prompt: 'Which planet do we live on? 🌍', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], answer: 'Earth' }
      ],
      medium: [
        { prompt: 'Which planet is the hottest in the solar system due to greenhouse gases?', options: ['Venus', 'Mercury', 'Mars', 'Jupiter'], answer: 'Venus' },
        { prompt: 'What is the giant storm on Jupiter called?', options: ['The Great Red Spot', 'The Big Vortex', 'Eye of Jupiter', 'Solar Flare'], answer: 'The Great Red Spot' },
        { prompt: 'Which planet rotates on its side like a rolling barrel?', options: ['Uranus', 'Neptune', 'Saturn', 'Mars'], answer: 'Uranus' },
        { prompt: 'What is the name of Earth\'s natural satellite? 🌙', options: ['The Moon', 'Titan', 'Europa', 'Phobos'], answer: 'The Moon' },
        { prompt: 'What lies between the orbits of Mars and Jupiter?', options: ['The Asteroid Belt', 'Kuiper Belt', 'Oort Cloud', 'Black Hole'], answer: 'The Asteroid Belt' }
      ],
      hard: [
        { prompt: 'Which moon of Saturn has a thick nitrogen atmosphere and liquid methane lakes?', options: ['Titan', 'Enceladus', 'Europa', 'Io'], answer: 'Titan' },
        { prompt: 'Which moon of Jupiter is covered with an icy ocean that may harbor life?', options: ['Europa', 'Io', 'Ganymede', 'Callisto'], answer: 'Europa' },
        { prompt: 'How long does sunlight take to reach Earth? ☀️⏱️', options: ['About 8 minutes and 20 seconds', '1 second', '1 hour', '24 hours'], answer: 'About 8 minutes and 20 seconds' },
        { prompt: 'Which dwarf planet was reclassified from 9th planet status in 2006?', options: ['Pluto', 'Ceres', 'Eris', 'Haumea'], answer: 'Pluto' },
        { prompt: 'What is the name of the nearest galaxy to our Milky Way?', options: ['Andromeda Galaxy', 'Triangulum', 'Sombrero Galaxy', 'Centaurus A'], answer: 'Andromeda Galaxy' }
      ]
    }
  },
  {
    id: 'g48',
    title: 'Planet Size Sort',
    slug: 'planet-size-sort',
    category: 'science',
    subcategory: 'Astronomy',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🌌',
    colorTheme: 'blue',
    description: 'Arrange planets from smallest to largest in size diameter!',
    instructions: 'Order the planets according to their physical dimensions from smallest to biggest.',
    learningObjectives: ['Planetary scale', 'Comparative astronomy', 'Ordering logic'],
    gameType: 'pattern-sequence',
    seoTitle: 'Planet Size Sort — Solar System Ordering Game for Kids',
    seoDescription: 'Sort planets by size diameter from Mercury to Jupiter.',
    levels: {
      easy: [
        { prompt: 'Sort from smallest to biggest:', items: ['Mercury 🌑', 'Earth 🌍', 'Jupiter 🪐'], correctOrder: ['Mercury 🌑', 'Earth 🌍', 'Jupiter 🪐'] },
        { prompt: 'Sort from smallest to biggest:', items: ['Moon 🌙', 'Earth 🌍', 'Sun ☀️'], correctOrder: ['Moon 🌙', 'Earth 🌍', 'Sun ☀️'] }
      ],
      medium: [
        { prompt: 'Sort rocky planets (smallest to largest):', items: ['Mercury 🪨', 'Mars 🔴', 'Venus 🟡', 'Earth 🌍'], correctOrder: ['Mercury 🪨', 'Mars 🔴', 'Venus 🟡', 'Earth 🌍'] },
        { prompt: 'Sort gas & ice giants (smallest to largest):', items: ['Neptune 🔵', 'Uranus 🩵', 'Saturn 🪐', 'Jupiter 🌕'], correctOrder: ['Neptune 🔵', 'Uranus 🩵', 'Saturn 🪐', 'Jupiter 🌕'] }
      ],
      hard: [
        { prompt: 'Sort all 8 planets from smallest to largest:', items: ['Mercury', 'Mars', 'Venus', 'Earth', 'Neptune', 'Uranus', 'Saturn', 'Jupiter'], correctOrder: ['Mercury', 'Mars', 'Venus', 'Earth', 'Neptune', 'Uranus', 'Saturn', 'Jupiter'] }
      ]
    }
  },
  {
    id: 'g49',
    title: 'Weather Predictor',
    slug: 'weather-predictor',
    category: 'science',
    subcategory: 'Meteorology',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🌤️',
    colorTheme: 'sky',
    description: 'Match weather conditions with appropriate symbols, clothing, and outdoor activities!',
    instructions: 'Look at the weather scenario and choose the best clothing or weather symbol.',
    learningObjectives: ['Meteorological symbols', 'Weather safety & gear', 'Temperature concepts'],
    gameType: 'quiz',
    seoTitle: 'Weather Predictor — Kids Weather & Clothing Game',
    seoDescription: 'Learn about rain, snow, sunny days, wind, and appropriate weather clothes.',
    levels: {
      easy: [
        { prompt: 'It is pouring rain outside! 🌧️ What should you take?', options: ['Umbrella & Raincoat ☔', 'Swimsuit 🩳', 'Sunglasses 🕶️', 'T-shirt 👕'], answer: 'Umbrella & Raincoat ☔' },
        { prompt: 'It is freezing cold and snowing! ❄️ What should you wear?', options: ['Warm Jacket & Gloves 🧤', 'Sandals 🩴', 'Sunhat 👒', 'Shorts 🩳'], answer: 'Warm Jacket & Gloves 🧤' },
        { prompt: 'It is bright, hot and sunny! ☀️ What protects your eyes?', options: ['Sunglasses 🕶️', 'Snow Boots 🥾', 'Earmuffs 🎧', 'Scarf 🧣'], answer: 'Sunglasses 🕶️' },
        { prompt: 'Which symbol means Lightning and Thunder? ⚡', options: ['Thunderstorm ⛈️', 'Sunny ☀️', 'Fog 🌫️', 'Snow ❄️'], answer: 'Thunderstorm ⛈️' },
        { prompt: 'A great windy day is perfect for: 💨', options: ['Flying a Kite 🪁', 'Reading in the rain', 'Ice skating on grass', 'Sleeping in snow'], answer: 'Flying a Kite 🪁' }
      ],
      medium: [
        { prompt: 'What instrument measures air temperature? 🌡️', options: ['Thermometer', 'Barometer', 'Anemometer', 'Rain Gauge'], answer: 'Thermometer' },
        { prompt: 'What instrument measures wind speed?', options: ['Anemometer', 'Thermometer', 'Telescope', 'Compass'], answer: 'Anemometer' },
        { prompt: 'What is a cloud on the ground that makes it hard to see?', options: ['Fog 🌫️', 'Hail 🧊', 'Drizzle 🌧️', 'Tornado 🌪️'], answer: 'Fog 🌫️' },
        { prompt: 'Frozen balls of ice that fall during severe thunderstorms are called:', options: ['Hail 🧊', 'Snow ❄️', 'Dew 💧', 'Frost 🧊'], answer: 'Hail 🧊' },
        { prompt: 'What instrument measures the amount of rainfall? 🌧️', options: ['Rain Gauge', 'Speedometer', 'Barometer', 'Microscope'], answer: 'Rain Gauge' }
      ],
      hard: [
        { prompt: 'What instrument measures atmospheric air pressure? 🧭', options: ['Barometer', 'Hydrometer', 'Altimeter', 'Seismograph'], answer: 'Barometer' },
        { prompt: 'Which fluffy white clouds look like floating cotton balls on pleasant days?', options: ['Cumulus clouds', 'Stratus clouds', 'Cirrus clouds', 'Cumulonimbus clouds'], answer: 'Cumulus clouds' },
        { prompt: 'What causes the sound of thunder? ⚡🔊', options: ['Rapid expansion of heated air by lightning', 'Clouds banging together', 'Wind friction', 'Rain hitting ground'], answer: 'Rapid expansion of heated air by lightning' },
        { prompt: 'High-altitude thin, wispy clouds made of ice crystals are called:', options: ['Cirrus clouds', 'Stratus clouds', 'Cumulus clouds', 'Nimbus clouds'], answer: 'Cirrus clouds' },
        { prompt: 'What is a violent rotating column of air extending from thunderstorm to ground?', options: ['Tornado 🌪️', 'Hurricane 🌀', 'Blizzard ❄️', 'Typhoon 🌊'], answer: 'Tornado 🌪️' }
      ]
    }
  },
  {
    id: 'g50',
    title: 'Seasons Match',
    slug: 'seasons-match',
    category: 'science',
    subcategory: 'Seasons',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🍂',
    colorTheme: 'amber',
    description: 'Match festive clothing, blooming plants, and activities to Spring, Summer, Autumn, and Winter!',
    instructions: 'Connect the item or event to its correct season.',
    learningObjectives: ['The 4 seasons', 'Seasonal changes in nature', 'Earth’s revolution cycle'],
    gameType: 'quiz',
    seoTitle: 'Seasons Match — 4 Seasons Educational Game for Kids',
    seoDescription: 'Explore Spring, Summer, Fall, and Winter nature cycles.',
    levels: {
      easy: [
        { prompt: 'In which season do leaves turn golden-orange and fall from trees? 🍁', options: ['Autumn / Fall', 'Spring', 'Summer', 'Winter'], answer: 'Autumn / Fall' },
        { prompt: 'In which season do snowmen, ice, and cold frosty days arrive? ⛄', options: ['Winter', 'Summer', 'Spring', 'Fall'], answer: 'Winter' },
        { prompt: 'In which season do flowers blossom and baby animals are born? 🌸', options: ['Spring', 'Winter', 'Autumn', 'Summer'], answer: 'Spring' },
        { prompt: 'In which season is the weather hottest, great for beach visits? 🏖️', options: ['Summer', 'Winter', 'Autumn', 'Spring'], answer: 'Summer' },
        { prompt: 'How many seasons are in a full year? 📅', options: ['4 Seasons', '2 Seasons', '6 Seasons', '12 Seasons'], answer: '4 Seasons' }
      ],
      medium: [
        { prompt: 'Why do we have four seasons on Earth? 🌍', options: ['Because Earth is tilted on its axis as it orbits the Sun', 'Because the Sun turns on and off', 'Because Earth gets closer and farther in big circle', 'Because of ocean waves'], answer: 'Because Earth is tilted on its axis as it orbits the Sun' },
        { prompt: 'When animals sleep through the cold winter to save energy, it is called: 🐻', options: ['Hibernation', 'Migration', 'Metamorphosis', 'Germination'], answer: 'Hibernation' },
        { prompt: 'When birds fly south to warmer regions before winter arrives, it is called: 🦅', options: ['Migration', 'Hibernation', 'Camouflage', 'Evaporation'], answer: 'Migration' },
        { prompt: 'The two days of the year when day and night are equal length are called: ⚖️', options: ['Equinoxes', 'Solstices', 'Eclipses', 'Aphelions'], answer: 'Equinoxes' },
        { prompt: 'The longest day of the year in the northern hemisphere is the: ☀️', options: ['Summer Solstice', 'Winter Solstice', 'Spring Equinox', 'Autumn Equinox'], answer: 'Summer Solstice' }
      ],
      hard: [
        { prompt: 'When it is Winter in the Northern Hemisphere, what season is it in the Southern Hemisphere (e.g. Australia)? 🇦🇺', options: ['Summer', 'Winter', 'Autumn', 'Spring'], answer: 'Summer' },
        { prompt: 'Trees that lose their leaves annually in autumn are known as: 🍂', options: ['Deciduous trees', 'Coniferous evergreen trees', 'Succulents', 'Bryophytes'], answer: 'Deciduous trees' },
        { prompt: 'What causes the spectacular autumn leaf color changes?', options: ['Breakdown of green chlorophyll revealing carotenoids/anthocyanins', 'Sunlight burning leaves', 'Paint from tree sap', 'Cold wind staining leaves'], answer: 'Breakdown of green chlorophyll revealing carotenoids/anthocyanins' },
        { prompt: 'The shortest day and longest night of the year is called the:', options: ['Winter Solstice', 'Summer Solstice', 'Vernal Equinox', 'Autumnal Equinox'], answer: 'Winter Solstice' },
        { prompt: 'The North and South Poles experience approximately how many months of continuous darkness in their winter?', options: ['6 Months', '1 Month', '3 Months', '12 Months'], answer: '6 Months' }
      ]
    }
  },
  {
    id: 'g51',
    title: 'Water Cycle Puzzle',
    slug: 'water-cycle-puzzle',
    category: 'science',
    subcategory: 'Earth Science',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Medium',
    icon: '💧',
    colorTheme: 'cyan',
    description: 'Assemble Evaporation, Condensation, Precipitation, and Collection in the global water cycle!',
    instructions: 'Sequence the continuous cycle that moves Earth\'s water.',
    learningObjectives: ['The water cycle stages', 'Phase changes of water', 'Earth hydrology'],
    gameType: 'pattern-sequence',
    seoTitle: 'Water Cycle Puzzle — Earth Science Water Cycle Game',
    seoDescription: 'Connect evaporation, clouds condensation, rain precipitation, and rivers collection.',
    levels: {
      easy: [
        { prompt: 'Order the Water Cycle:', items: ['Sun heats water (Evaporation) ♨️', 'Clouds form in sky (Condensation) ☁️', 'Rain falls down (Precipitation) 🌧️', 'Water gathers in oceans/lakes (Collection) 🌊'], correctOrder: ['Sun heats water (Evaporation) ♨️', 'Clouds form in sky (Condensation) ☁️', 'Rain falls down (Precipitation) 🌧️', 'Water gathers in oceans/lakes (Collection) 🌊'] }
      ],
      medium: [
        { prompt: 'Order with transpiration:', items: ['Plant leaves release vapor (Transpiration) 🍃', 'Water vapor cools into clouds (Condensation) ☁️', 'Rain or snow falls (Precipitation) 🌧️', 'Runoff flows into streams (Collection) 🏞️'], correctOrder: ['Plant leaves release vapor (Transpiration) 🍃', 'Water vapor cools into clouds (Condensation) ☁️', 'Rain or snow falls (Precipitation) 🌧️', 'Runoff flows into streams (Collection) 🏞️'] }
      ],
      hard: [
        { prompt: 'Full hydrological cycle:', items: ['Solar heating & Evaporation ☀️', 'Vapor cooling into cloud droplets ☁️', 'Cloud saturation & Precipitation 🌧️', 'Infiltration into groundwater & ocean runoff 🌊'], correctOrder: ['Solar heating & Evaporation ☀️', 'Vapor cooling into cloud droplets ☁️', 'Cloud saturation & Precipitation 🌧️', 'Infiltration into groundwater & ocean runoff 🌊'] }
      ]
    }
  },
  {
    id: 'g52',
    title: 'States of Matter',
    slug: 'states-of-matter',
    category: 'science',
    subcategory: 'Physics & Chemistry',
    ageRange: '6–11',
    minAge: 6,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '🧊',
    colorTheme: 'blue',
    description: 'Classify materials as Solid (rock, ice), Liquid (water, milk), or Gas (steam, oxygen)!',
    instructions: 'Select whether the item is a Solid, Liquid, or Gas.',
    learningObjectives: ['States of matter', 'Molecular arrangement', 'Melting, freezing, boiling points'],
    gameType: 'quiz',
    seoTitle: 'States of Matter — Solid Liquid Gas Game for Kids',
    seoDescription: 'Identify solid, liquid, and gas states with interactive examples.',
    levels: {
      easy: [
        { prompt: 'An Ice Cube 🧊 is a:', options: ['Solid', 'Liquid', 'Gas'], answer: 'Solid' },
        { prompt: 'Water in a swimming pool 🏊 is a:', options: ['Liquid', 'Solid', 'Gas'], answer: 'Liquid' },
        { prompt: 'Helium inside a floating balloon 🎈 is a:', options: ['Gas', 'Solid', 'Liquid'], answer: 'Gas' },
        { prompt: 'A wooden chair 🪑 is a:', options: ['Solid', 'Liquid', 'Gas'], answer: 'Solid' },
        { prompt: 'Orange juice in a glass 🍹 is a:', options: ['Liquid', 'Solid', 'Gas'], answer: 'Liquid' }
      ],
      medium: [
        { prompt: 'Steam rising from a hot kettle 🫖 is water in what state?', options: ['Gas (Water Vapor)', 'Liquid', 'Solid', 'Plasma'], answer: 'Gas (Water Vapor)' },
        { prompt: 'When a solid turns into a liquid (like ice to water), it is called:', options: ['Melting', 'Freezing', 'Evaporating', 'Condensing'], answer: 'Melting' },
        { prompt: 'When a liquid turns into a solid (like water to ice), it is called:', options: ['Freezing', 'Melting', 'Boiling', 'Sublimation'], answer: 'Freezing' },
        { prompt: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 'Solid' },
        { prompt: 'Which state of matter takes the shape of its container but keeps its volume?', options: ['Liquid', 'Solid', 'Gas', 'Vacuum'], answer: 'Liquid' }
      ],
      hard: [
        { prompt: 'When a solid turns directly into a gas without melting (like dry ice), it is called:', options: ['Sublimation', 'Evaporation', 'Deposition', 'Condensation'], answer: 'Sublimation' },
        { prompt: 'The 4th super-hot state of matter found in the Sun and lightning is called: ⚡', options: ['Plasma', 'Gas', 'Super-solid', 'Liquid crystal'], answer: 'Plasma' },
        { prompt: 'At standard pressure, pure water boils at what temperature? 🔥', options: ['100°C (212°F)', '0°C (32°F)', '50°C (122°F)', '200°C'], answer: '100°C (212°F)' },
        { prompt: 'In which state of matter are molecules packed closest together in fixed lattice?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 'Solid' },
        { prompt: 'When water vapor in the air cools and turns into liquid drops on a cold glass:', options: ['Condensation', 'Evaporation', 'Precipitation', 'Transpiration'], answer: 'Condensation' }
      ]
    }
  },
  {
    id: 'g53',
    title: 'Magnet Challenge',
    slug: 'magnet-challenge',
    category: 'science',
    subcategory: 'Physics',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🧲',
    colorTheme: 'rose',
    description: 'Test what magnetic objects stick to magnets and which materials are non-magnetic!',
    instructions: 'Predict whether the item will be Attracted (Magnetic) or Not Attracted (Non-magnetic).',
    learningObjectives: ['Magnetism', 'Magnetic metals (Iron, Nickel, Cobalt)', 'Poles attraction/repulsion'],
    gameType: 'quiz',
    seoTitle: 'Magnet Challenge — Magnetism Science Game for Kids',
    seoDescription: 'Discover magnetic and non-magnetic materials with fun virtual magnet experiments.',
    levels: {
      easy: [
        { prompt: 'Will an Iron Paperclip 📎 stick to a magnet?', options: ['Yes! (Magnetic)', 'No (Non-magnetic)'], answer: 'Yes! (Magnetic)' },
        { prompt: 'Will a Wooden Pencil ✏️ stick to a magnet?', options: ['No (Non-magnetic)', 'Yes! (Magnetic)'], answer: 'No (Non-magnetic)' },
        { prompt: 'Will an Iron Nail 🔩 stick to a magnet?', options: ['Yes! (Magnetic)', 'No (Non-magnetic)'], answer: 'Yes! (Magnetic)' },
        { prompt: 'Will a Plastic Toy Duck 🦆 stick to a magnet?', options: ['No (Non-magnetic)', 'Yes! (Magnetic)'], answer: 'No (Non-magnetic)' },
        { prompt: 'Will a Rubber Eraser stick to a magnet?', options: ['No (Non-magnetic)', 'Yes! (Magnetic)'], answer: 'No (Non-magnetic)' }
      ],
      medium: [
        { prompt: 'What happens when two North poles (N + N) of magnets meet? 🧲⚡🧲', options: ['They Repel (push away)', 'They Attract (stick together)', 'They melt', 'Nothing happens'], answer: 'They Repel (push away)' },
        { prompt: 'What happens when a North pole and South pole (N + S) meet? 🧲❤️🧲', options: ['They Attract (pull together)', 'They Repel (push away)', 'They explode', 'They disappear'], answer: 'They Attract (pull together)' },
        { prompt: 'Which of these common metals is strongly magnetic?', options: ['Iron', 'Pure Gold', 'Pure Silver', 'Aluminum'], answer: 'Iron' },
        { prompt: 'Earth acts like a giant magnet because its core is filled with molten:', options: ['Iron and Nickel', 'Gold and Diamonds', 'Water and Ice', 'Wood and Stone'], answer: 'Iron and Nickel' },
        { prompt: 'Which tool uses Earth\'s magnetic field to help travelers find North? 🧭', options: ['Magnetic Compass', 'Thermometer', 'Barometer', 'Clock'], answer: 'Magnetic Compass' }
      ],
      hard: [
        { prompt: 'Which group of elements are ferromagnetic at room temperature?', options: ['Iron, Cobalt, Nickel', 'Copper, Silver, Gold', 'Helium, Neon, Argon', 'Lead, Tin, Zinc'], answer: 'Iron, Cobalt, Nickel' },
        { prompt: 'The invisible area of magnetic force around a magnet is called its:', options: ['Magnetic Field', 'Gravity Well', 'Electric Current', 'Plasma Ring'], answer: 'Magnetic Field' },
        { prompt: 'A magnet created by running electric current through a coiled wire is an:', options: ['Electromagnet', 'Permanent Magnet', 'Superconductor', 'Battery'], answer: 'Electromagnet' },
        { prompt: 'High-speed trains that float above tracks using magnetism are called:', options: ['Maglev Trains', 'Steam Trains', 'Diesel Locomotives', 'Hyperloop'], answer: 'Maglev Trains' },
        { prompt: 'The colorful dancing lights near Earth\'s poles caused by magnetic solar winds are:', options: ['Auroras (Northern/Southern Lights)', 'Solar Eclipses', 'Rainbows', 'Halos'], answer: 'Auroras (Northern/Southern Lights)' }
      ]
    }
  },
  {
    id: 'g54',
    title: 'Sink or Float',
    slug: 'sink-or-float',
    category: 'science',
    subcategory: 'Buoyancy',
    ageRange: '4–9',
    minAge: 4,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🚢',
    colorTheme: 'cyan',
    description: 'Predict whether objects Sink to the bottom or Float on top of water in our virtual science tank!',
    instructions: 'Select whether the object will Sink or Float.',
    learningObjectives: ['Density and buoyancy', 'Scientific prediction & hypothesis', 'Archimedes principle'],
    gameType: 'quiz',
    seoTitle: 'Sink or Float — Density and Buoyancy Kids Game',
    seoDescription: 'Test which items sink and which float in a fun virtual water tank experiment.',
    levels: {
      easy: [
        { prompt: 'A heavy Stone / Rock 🪨 will:', options: ['Sink to the bottom ⬇️', 'Float on top ⬆️'], answer: 'Sink to the bottom ⬇️' },
        { prompt: 'A Plastic Rubber Duck 🦆 will:', options: ['Float on top ⬆️', 'Sink to the bottom ⬇️'], answer: 'Float on top ⬆️' },
        { prompt: 'An Iron Anchor ⚓ will:', options: ['Sink to the bottom ⬇️', 'Float on top ⬆️'], answer: 'Sink to the bottom ⬇️' },
        { prompt: 'A Dry Wooden Stick 🪵 will:', options: ['Float on top ⬆️', 'Sink to the bottom ⬇️'], answer: 'Float on top ⬆️' },
        { prompt: 'An Apple 🍎 will:', options: ['Float on top ⬆️ (contains air)', 'Sink to the bottom ⬇️'], answer: 'Float on top ⬆️ (contains air)' }
      ],
      medium: [
        { prompt: 'Why does a giant steel ship float on ocean water?', options: ['Its hollow hull holds lots of air, making its average density less than water', 'Steel is lighter than water', 'Fish push it up', 'The ocean has no gravity'], answer: 'Its hollow hull holds lots of air, making its average density less than water' },
        { prompt: 'An unpeeled orange floats, but a peeled orange sinks because:', options: ['The peel has tiny air pockets that act like a life jacket', 'The peel makes it heavy', 'Water hates oranges', 'Peeled oranges absorb all water'], answer: 'The peel has tiny air pockets that act like a life jacket' },
        { prompt: 'An inflated beach ball 🏐 will:', options: ['Float on top ⬆️', 'Sink to the bottom ⬇️'], answer: 'Float on top ⬆️' },
        { prompt: 'A metal coin 🪙 will:', options: ['Sink to the bottom ⬇️', 'Float on top ⬆️'], answer: 'Sink to the bottom ⬇️' },
        { prompt: 'An Ice Cube 🧊 in a glass of water will:', options: ['Float near the surface ⬆️ (ice is less dense than liquid water)', 'Sink directly to bottom ⬇️'], answer: 'Float near the surface ⬆️ (ice is less dense than liquid water)' }
      ],
      hard: [
        { prompt: 'The upward force exerted by a fluid on an object placed in it is called:', options: ['Buoyant Force', 'Gravitational Force', 'Frictional Force', 'Tension Force'], answer: 'Buoyant Force' },
        { prompt: 'According to Archimedes\' Principle, the buoyant force equals:', options: ['The weight of fluid displaced by the object', 'The total weight of ocean', 'The depth of container', 'The temperature of fluid'], answer: 'The weight of fluid displaced by the object' },
        { prompt: 'Why is it easier to float in the Dead Sea compared to a freshwater lake?', options: ['The high salt content increases water density', 'The Dead Sea is warmer', 'The Dead Sea has lower gravity', 'There are no fish'], answer: 'The high salt content increases water density' },
        { prompt: 'How do submarines submerge and resurface? 🌊', options: ['Filling and emptying ballast tanks with water/air', 'Using giant propellers only', 'Changing shape', 'Reversing engine polarity'], answer: 'Filling and emptying ballast tanks with water/air' },
        { prompt: 'If an object\'s density is greater than the density of liquid, it will:', options: ['Sink', 'Float', 'Hover at surface', 'Turn into gas'], answer: 'Sink' }
      ]
    }
  },
  {
    id: 'g55',
    title: 'Science Mystery Lab',
    slug: 'science-mystery-lab',
    category: 'science',
    subcategory: 'Experiments',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🧪',
    colorTheme: 'purple',
    description: 'Solve interactive science experiments, observations, and mysterious lab cases!',
    instructions: 'Analyze the experimental clues and deduce the correct scientific conclusion.',
    learningObjectives: ['Scientific method', 'Hypothesis testing', 'Observation & deduction'],
    gameType: 'quiz',
    seoTitle: 'Science Mystery Lab — Interactive Kids Science Experiments',
    seoDescription: 'Solve exciting laboratory experiments and discover scientific principles.',
    levels: {
      easy: [
        { prompt: 'You place a plant in a dark closet for 2 weeks with water. What happens?', options: ['Its leaves turn yellow/pale without sunlight 🥀', 'It grows giant flowers', 'It turns into a tree', 'Nothing changes'], answer: 'Its leaves turn yellow/pale without sunlight 🥀' },
        { prompt: 'Mixing baking soda and vinegar produces lots of bubbling. What gas is made? 🌋', options: ['Carbon Dioxide Gas', 'Oxygen', 'Helium', 'Steam'], answer: 'Carbon Dioxide Gas' },
        { prompt: 'Why do you see lightning before you hear thunder? ⚡', options: ['Light travels much faster than sound', 'Sound travels faster than light', 'Thunder is created 10 minutes later', 'Your ears are slower than eyes'], answer: 'Light travels much faster than sound' },
        { prompt: 'What happens when you shine white sunlight through a glass prism? 🌈', options: ['It separates into a rainbow spectrum of colors', 'It disappears', 'It turns into laser', 'It turns black'], answer: 'It separates into a rainbow spectrum of colors' },
        { prompt: 'Why do leaves change color in the fall?', options: ['Trees stop making chlorophyll as sunlight decreases', 'Leaves get tired', 'Rain paints the leaves', 'Winter frost adds dye'], answer: 'Trees stop making chlorophyll as sunlight decreases' }
      ],
      medium: [
        { prompt: 'In a closed circuit with a battery, wire, and bulb, what happens if the switch is OPEN?', options: ['The bulb stays OFF (no current flows)', 'The bulb lights up', 'The battery explodes', 'The wire glows blue'], answer: 'The bulb stays OFF (no current flows)' },
        { prompt: 'Why does a balloon stick to a wall after being rubbed against your hair? 🎈', options: ['Static electricity charge', 'Glue on the balloon', 'Air vacuum', 'Magnetic iron inside hair'], answer: 'Static electricity charge' },
        { prompt: 'Which layer of Earth\'s atmosphere contains the ozone layer that blocks UV rays? 🛡️', options: ['Stratosphere', 'Troposphere', 'Mesosphere', 'Thermosphere'], answer: 'Stratosphere' },
        { prompt: 'Why do astronauts float weightlessly aboard the International Space Station?', options: ['They are in continuous free-fall orbit around Earth', 'There is zero gravity in space', 'Space suits are filled with helium', 'The space station has antigravity floor'], answer: 'They are in continuous free-fall orbit around Earth' },
        { prompt: 'What is the powerhouse organelle of a living cell that generates ATP energy? ⚡', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Cell Wall'], answer: 'Mitochondria' }
      ],
      hard: [
        { prompt: 'What law of physics states that for every action, there is an equal and opposite reaction?', options: ['Newton\'s Third Law', 'Newton\'s First Law', 'Law of Conservation of Mass', 'Ohm\'s Law'], answer: 'Newton\'s Third Law' },
        { prompt: 'Which enzyme in human saliva begins breaking down starch into simple sugars in the mouth?', options: ['Amylase', 'Pepsin', 'Lipase', 'Trypsin'], answer: 'Amylase' },
        { prompt: 'What is the speed of light in a vacuum? 🚀', options: ['Approximately 300,000 km per second (186,000 miles/sec)', '3,000 km/s', '1,000,000 km/s', 'Sound speed'], answer: 'Approximately 300,000 km per second (186,000 miles/sec)' },
        { prompt: 'In genetics, the double-helix molecule carrying inherited instructions is called: 🧬', options: ['DNA (Deoxyribonucleic acid)', 'RNA', 'ATP', 'Glucose'], answer: 'DNA (Deoxyribonucleic acid)' },
        { prompt: 'What type of rock is formed from cooled and hardened molten magma or lava? 🌋', options: ['Igneous rock', 'Sedimentary rock', 'Metamorphic rock', 'Fossil rock'], answer: 'Igneous rock' }
      ]
    }
  }
];
