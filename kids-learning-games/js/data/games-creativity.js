// games-creativity.js - Creativity, Shapes & Early Learning Games (Games 81–90)

window.GAMES_CREATIVITY = [
  {
    id: 'g81',
    title: 'Color Mixing Lab',
    slug: 'color-mixing-lab',
    category: 'creativity',
    subcategory: 'Color Theory',
    ageRange: '4–9',
    minAge: 4,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '🧪',
    colorTheme: 'pink',
    description: 'Mix primary colors (Red, Blue, Yellow) in beakers to discover secondary and tertiary colors!',
    instructions: 'Select which two colors combine to produce the target glowing potion.',
    learningObjectives: ['Primary & secondary color theory', 'Color combinations', 'Art fundamentals'],
    gameType: 'quiz',
    seoTitle: 'Color Mixing Lab — Kids Color Theory & Art Game',
    seoDescription: 'Mix virtual paints and discover what new colors emerge.',
    levels: {
      easy: [
        { prompt: 'What color do you get when you mix RED 🔴 + YELLOW 🟡?', options: ['ORANGE 🟠', 'PURPLE 🟣', 'GREEN 🟢', 'BLACK ⚫'], answer: 'ORANGE 🟠' },
        { prompt: 'What color do you get when you mix BLUE 🔵 + YELLOW 🟡?', options: ['GREEN 🟢', 'ORANGE 🟠', 'PURPLE 🟣', 'RED 🔴'], answer: 'GREEN 🟢' },
        { prompt: 'What color do you get when you mix RED 🔴 + BLUE 🔵?', options: ['PURPLE 🟣', 'GREEN 🟢', 'YELLOW 🟡', 'WHITE ⚪'], answer: 'PURPLE 🟣' },
        { prompt: 'What color do you get when you mix RED 🔴 + WHITE ⚪?', options: ['PINK 🌸', 'PURPLE 🟣', 'GREY 🔘', 'BROWN 🟤'], answer: 'PINK 🌸' },
        { prompt: 'Which 3 colors are the Primary colors in painting?', options: ['Red, Yellow, Blue', 'Green, Orange, Purple', 'Black, White, Grey', 'Pink, Brown, Cyan'], answer: 'Red, Yellow, Blue' }
      ],
      medium: [
        { prompt: 'What color do you get when you mix BLACK ⚫ + WHITE ⚪?', options: ['GREY 🔘', 'BROWN 🟤', 'NAVY 🔷', 'BEIGE 🟨'], answer: 'GREY 🔘' },
        { prompt: 'What color do you get when you mix all 3 primary colors together (Red + Blue + Yellow)?', options: ['BROWN / MUDDY DARK 🟤', 'WHITE ⚪', 'RAINBOW 🌈', 'CLEAR 🫗'], answer: 'BROWN / MUDDY DARK 🟤' },
        { prompt: 'Adding WHITE to any color to make it lighter creates a:', options: ['Tint', 'Shade', 'Tone', 'Hue'], answer: 'Tint' },
        { prompt: 'Adding BLACK to any color to make it darker creates a:', options: ['Shade', 'Tint', 'Tone', 'Pastel'], answer: 'Shade' },
        { prompt: 'Which colors are considered WARM colors on the color wheel? 🔥', options: ['Red, Orange, Yellow', 'Blue, Green, Purple', 'Black, Grey, White', 'Cyan, Indigo, Violet'], answer: 'Red, Orange, Yellow' }
      ],
      hard: [
        { prompt: 'In digital screens (additive RGB color model), mixing RED + GREEN light creates: 💡', options: ['YELLOW Light 🟡', 'MAGENTA', 'CYAN', 'BLACK'], answer: 'YELLOW Light 🟡' },
        { prompt: 'Colors located directly opposite each other on the color wheel are called: 🎨', options: ['Complementary Colors', 'Monochromatic Colors', 'Analogous Colors', 'Warm Colors'], answer: 'Complementary Colors' },
        { prompt: 'What is the complementary color of Blue? 🔵', options: ['Orange 🟠', 'Green 🟢', 'Purple 🟣', 'Red 🔴'], answer: 'Orange 🟠' },
        { prompt: 'What is the complementary color of Yellow? 🟡', options: ['Purple 🟣', 'Green 🟢', 'Blue 🔵', 'Red 🔴'], answer: 'Purple 🟣' },
        { prompt: 'In printing (subtractive CMYK model), what color is produced by Cyan + Magenta?', options: ['Blue / Violet 🔵', 'Yellow', 'Green', 'Orange'], answer: 'Blue / Violet 🔵' }
      ]
    }
  },
  {
    id: 'g82',
    title: 'Color-by-Number',
    slug: 'color-by-number',
    category: 'creativity',
    subcategory: 'Coloring',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🎨',
    colorTheme: 'rose',
    description: 'Tap numbered palette colors to paint and reveal delightful hidden pictures!',
    instructions: 'Select the color that matches each numbered canvas zone to finish the masterpiece.',
    learningObjectives: ['Number-color matching', 'Fine motor control', 'Artistic focus'],
    gameType: 'canvas-art',
    seoTitle: 'Color-by-Number — Kids Online Coloring Game',
    seoDescription: 'Paint beautiful pictures by matching numbers with colors on the palette.',
    levels: {
      easy: { palette: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'], pattern: 'Butterfly', sections: 4 },
      medium: { palette: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'], pattern: 'Rainbow Castle', sections: 6 },
      hard: { palette: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'], pattern: 'Cosmic Galaxy', sections: 8 }
    }
  },
  {
    id: 'g83',
    title: 'Shape Builder',
    slug: 'shape-builder',
    category: 'creativity',
    subcategory: 'Building',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🔷',
    colorTheme: 'teal',
    description: 'Combine circles, squares, and triangles to build rockets, cars, and castles!',
    instructions: 'Pick which basic shapes are needed to assemble the target structure.',
    learningObjectives: ['Spatial composition', 'Shape recognition', 'Architectural creativity'],
    gameType: 'tangram-shape',
    seoTitle: 'Shape Builder — Kids Geometric Building Game',
    seoDescription: 'Construct houses, boats, and robots using simple geometric shapes.',
    levels: {
      easy: [
        { prompt: 'Which shapes build a simple sailboat? ⛵', options: ['1 Triangle (Sail) + 1 Trapezoid (Hull)', '2 Circles', '4 Squares', '3 Stars'], answer: '1 Triangle (Sail) + 1 Trapezoid (Hull)' },
        { prompt: 'Which shapes build a simple house? 🏠', options: ['1 Triangle (Roof) + 1 Square (Body)', '3 Circles', '2 Ovals', '1 Star'], answer: '1 Triangle (Roof) + 1 Square (Body)' },
        { prompt: 'Which shapes build a glowing sun? ☀️', options: ['1 Circle + Triangles around', '4 Squares', '2 Rectangles', '1 Hexagon'], answer: '1 Circle + Triangles around' }
      ],
      medium: [
        { prompt: 'Which shapes build a toy truck? 🚚', options: ['2 Rectangles + 2 Circles (wheels)', '3 Triangles', '4 Ovals', '2 Stars'], answer: '2 Rectangles + 2 Circles (wheels)' },
        { prompt: 'Which shapes construct a space rocket? 🚀', options: ['1 Cylinder/Rectangle + 1 Triangle cone + 2 Fin Triangles', '3 Circles', '4 Squares', '1 Pentagon'], answer: '1 Cylinder/Rectangle + 1 Triangle cone + 2 Fin Triangles' },
        { prompt: 'Which shapes build a snowman? ⛄', options: ['3 Circles stacked + 1 Triangle carrot nose', '3 Squares', '2 Triangles', '1 Rectangle'], answer: '3 Circles stacked + 1 Triangle carrot nose' }
      ],
      hard: [
        { prompt: 'Which shapes construct a Medieval Castle? 🏰', options: ['Rectangles (Walls) + Cylinders (Towers) + Cones (Roofs)', '2 Circles', '1 Triangle', '3 Ovals'], answer: 'Rectangles (Walls) + Cylinders (Towers) + Cones (Roofs)' },
        { prompt: 'Which geometric shapes make up a classic soccer ball? ⚽', options: ['Pentagons (5 sides) and Hexagons (6 sides)', 'Squares and Circles', 'Triangles only', 'Octagons only'], answer: 'Pentagons (5 sides) and Hexagons (6 sides)' },
        { prompt: 'Which shape pattern forms a geodesic dome structure?', options: ['Interlocking Triangles', 'Stacked Squares', 'Concentric Circles', 'Parallel Lines'], answer: 'Interlocking Triangles' }
      ]
    }
  },
  {
    id: 'g84',
    title: 'Shape Sorting',
    slug: 'shape-sorting',
    category: 'creativity',
    subcategory: 'Sorting',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '🟢',
    colorTheme: 'blue',
    description: 'Sort colorful 2D shapes into their matching category boxes!',
    instructions: 'Group shapes by their number of sides and corners.',
    learningObjectives: ['Shape categorization', 'Geometric attributes', 'Fine motor coordination'],
    gameType: 'drag-drop',
    seoTitle: 'Shape Sorting — Early Childhood Shape Sorting Game',
    seoDescription: 'Sort circles, squares, rectangles, and triangles into their matching bins.',
    levels: {
      easy: [
        { prompt: 'Sort into TRIANGLES box (3 sides):', slots: ['🔺 Red Triangle', '🟩 Square', '⚪ Circle'], correct: '🔺 Red Triangle', options: ['🔺 Red Triangle', '🟩 Square', '⚪ Circle'] },
        { prompt: 'Sort into CIRCLES box (round, no corners):', slots: ['⚪ White Circle', '🔺 Triangle', '⭐ Star'], correct: '⚪ White Circle', options: ['⚪ White Circle', '🔺 Triangle', '⭐ Star'] },
        { prompt: 'Sort into SQUARES box (4 equal sides):', slots: ['🟩 Green Square', '⚪ Circle', '🔺 Triangle'], correct: '🟩 Green Square', options: ['🟩 Green Square', '⚪ Circle', '🔺 Triangle'] }
      ],
      medium: [
        { prompt: 'Sort into PENTAGONS box (5 sides):', slots: ['⬟ 5-sided Pentagon', '⬡ 6-sided Hexagon', '🛑 8-sided Octagon'], correct: '⬟ 5-sided Pentagon', options: ['⬟ 5-sided Pentagon', '⬡ 6-sided Hexagon', '🛑 8-sided Octagon'] },
        { prompt: 'Sort into HEXAGONS box (6 sides):', slots: ['⬡ 6-sided Hexagon', '⬟ Pentagon', '🟩 Square'], correct: '⬡ 6-sided Hexagon', options: ['⬡ 6-sided Hexagon', '⬟ Pentagon', '🟩 Square'] },
        { prompt: 'Sort into QUADRILATERALS box (4 sides):', slots: ['▭ Rectangle', '🔺 Triangle', '⚪ Circle'], correct: '▭ Rectangle', options: ['▭ Rectangle', '🔺 Triangle', '⚪ Circle'] }
      ],
      hard: [
        { prompt: 'Which shape has exactly 8 sides and 8 vertices? 🛑', slots: ['Octagon', 'Heptagon', 'Decagon'], correct: 'Octagon', options: ['Octagon', 'Heptagon', 'Decagon'] },
        { prompt: 'Which 3D shape has 6 identical square faces? 🎲', slots: ['Cube', 'Sphere', 'Cone'], correct: 'Cube', options: ['Cube', 'Sphere', 'Cone'] },
        { prompt: 'Which 3D shape has 1 circular base and 1 vertex point? 🍦', slots: ['Cone', 'Cylinder', 'Prism'], correct: 'Cone', options: ['Cone', 'Cylinder', 'Prism'] }
      ]
    }
  },
  {
    id: 'g85',
    title: 'Size Sorting Game',
    slug: 'size-sorting-game',
    category: 'creativity',
    subcategory: 'Measurement',
    ageRange: '4–7',
    minAge: 4,
    maxAge: 7,
    difficulty: 'Easy',
    icon: '📏',
    colorTheme: 'amber',
    description: 'Arrange animals, fruit, and toys from Smallest to Largest!',
    instructions: 'Tap items in sequence from the tiniest to the biggest.',
    learningObjectives: ['Size discrimination', 'Comparative adjectives (small, medium, large)', 'Seriation'],
    gameType: 'pattern-sequence',
    seoTitle: 'Size Sorting Game — Smallest to Largest Game for Kids',
    seoDescription: 'Sort objects by physical size from smallest to largest.',
    levels: {
      easy: [
        { prompt: 'Sort animals from smallest to largest:', items: ['Ant 🐜', 'Cat 🐱', 'Elephant 🐘'], correctOrder: ['Ant 🐜', 'Cat 🐱', 'Elephant 🐘'] },
        { prompt: 'Sort fruits from smallest to largest:', items: ['Blueberry 🫐', 'Apple 🍎', 'Watermelon 🍉'], correctOrder: ['Blueberry 🫐', 'Apple 🍎', 'Watermelon 🍉'] }
      ],
      medium: [
        { prompt: 'Sort vehicles from smallest to largest:', items: ['Skateboard 🛹', 'Bicycle 🚲', 'Car 🚗', 'School Bus 🚌', 'Airplane ✈️'], correctOrder: ['Skateboard 🛹', 'Bicycle 🚲', 'Car 🚗', 'School Bus 🚌', 'Airplane ✈️'] },
        { prompt: 'Sort birds from smallest to largest:', items: ['Hummingbird 🐦', 'Robin 🪶', 'Hawk 🦅', 'Ostrich 🦤'], correctOrder: ['Hummingbird 🐦', 'Robin 🪶', 'Hawk 🦅', 'Ostrich 🦤'] }
      ],
      hard: [
        { prompt: 'Sort celestial bodies from smallest to largest:', items: ['Space Station 🛰️', 'Moon 🌙', 'Earth 🌍', 'Jupiter 🪐', 'Sun ☀️'], correctOrder: ['Space Station 🛰️', 'Moon 🌙', 'Earth 🌍', 'Jupiter 🪐', 'Sun ☀️'] },
        { prompt: 'Sort geographical areas from smallest to largest:', items: ['Village 🏡', 'City 🏙️', 'Country 🗺️', 'Continent 🌐', 'Planet 🪐'], correctOrder: ['Village 🏡', 'City 🏙️', 'Country 🗺️', 'Continent 🌐', 'Planet 🪐'] }
      ]
    }
  },
  {
    id: 'g86',
    title: 'Animal Drawing Game',
    slug: 'animal-drawing-game',
    category: 'creativity',
    subcategory: 'Drawing',
    ageRange: '4–9',
    minAge: 4,
    maxAge: 9,
    difficulty: 'Easy',
    icon: '✏️',
    colorTheme: 'purple',
    description: 'Learn step-by-step how to draw cute cats, puppies, pandas, and birds!',
    instructions: 'Follow guided drawing steps to create your own playful animal art.',
    learningObjectives: ['Guided drawing', 'Fine-motor control', 'Visual proportion'],
    gameType: 'canvas-art',
    seoTitle: 'Animal Drawing Game — Step-by-Step Drawing for Kids',
    seoDescription: 'Learn to draw friendly animals with step-by-step interactive instructions.',
    levels: {
      easy: { animal: 'Cute Cat 🐱', steps: 3, brushSize: 8 },
      medium: { animal: 'Playful Panda 🐼', steps: 5, brushSize: 6 },
      hard: { animal: 'Majestic Eagle 🦅', steps: 7, brushSize: 4 }
    }
  },
  {
    id: 'g87',
    title: 'Dress the Character',
    slug: 'dress-the-character',
    category: 'creativity',
    subcategory: 'Dress-Up',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '👗',
    colorTheme: 'pink',
    description: 'Pick outfits for different seasons: rainy days, beach trips, and snowy winter!',
    instructions: 'Select suitable clothes, hats, and accessories for the chosen scenario.',
    learningObjectives: ['Seasonal clothing awareness', 'Creative expression', 'Contextual reasoning'],
    gameType: 'quiz',
    seoTitle: 'Dress the Character — Kids Dress Up & Seasons Game',
    seoDescription: 'Style and dress your avatar for winter snow, sunny beach, and rainy days.',
    levels: {
      easy: [
        { prompt: 'Heading to the beach on a hot sunny day! 🏖️ What should your avatar wear?', options: ['Swimsuit & Sunhat 👒', 'Heavy Winter Coat 🧥', 'Snow Boots 🥾', 'Wool Scarf 🧣'], answer: 'Swimsuit & Sunhat 👒' },
        { prompt: 'Playing in the winter snow! ❄️ What keeps feet warm and dry?', options: ['Snow Boots 🥾', 'Flip-Flops 🩴', 'Bare feet', 'Sandals'], answer: 'Snow Boots 🥾' },
        { prompt: 'Stepping into pouring rain! 🌧️ What protects your clothes?', options: ['Waterproof Raincoat & Rain Boots ☔', 'T-shirt', 'Sunglasses 🕶️', 'Party Dress 👗'], answer: 'Waterproof Raincoat & Rain Boots ☔' }
      ],
      medium: [
        { prompt: 'Getting ready for bedtime sleep! 🌙 What is the best attire?', options: ['Cozy Pajamas 🛌', 'Heavy Backpack 🎒', 'Winter Gloves 🧤', 'Soccer Cleats 👟'], answer: 'Cozy Pajamas 🛌' },
        { prompt: 'Playing a soccer match on the grass field! ⚽ What footwear provides grip?', options: ['Soccer Cleats (Studs) 👟', 'High Heels 👠', 'Snowshoes', 'Slippers 🩴'], answer: 'Soccer Cleats (Studs) 👟' },
        { prompt: 'Going on a sunny hiking adventure in the mountains! 🥾 What is essential?', options: ['Sturdy Hiking Boots & Sunscreen 🧴', 'Swim flippers 🤿', 'Fancy cape', 'Pajamas'], answer: 'Sturdy Hiking Boots & Sunscreen 🧴' }
      ],
      hard: [
        { prompt: 'Traveling on a scientific expedition to the Antarctic Ice Shelf (-40°C)! 🥶 What clothing system is mandatory?', options: ['Multi-layer Thermal Insulated Parka, Balaclava, & Rated Boots 🧥', 'Standard Cotton Hoodie', 'Single Light Jacket', 'Wool Sweater only'], answer: 'Multi-layer Thermal Insulated Parka, Balaclava, & Rated Boots 🧥' },
        { prompt: 'Going scuba diving in deep coral reefs! 🤿 What equipment provides air and thermal insulation?', options: ['Neoprene Wetsuit, Mask, Fins, and SCUBA Regulator Tank 🤿', 'Life Jacket only', 'Raincoat', 'Snowsuit'], answer: 'Neoprene Wetsuit, Mask, Fins, and SCUBA Regulator Tank 🤿' }
      ]
    }
  },
  {
    id: 'g88',
    title: 'Build a House',
    slug: 'build-a-house',
    category: 'creativity',
    subcategory: 'Architecture',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🏡',
    colorTheme: 'emerald',
    description: 'Construct a house by putting together foundation, walls, roof, doors, and windows!',
    instructions: 'Order the architectural stages of building a sturdy house from ground up.',
    learningObjectives: ['Structural sequencing', 'Basic architecture', 'Cause and effect'],
    gameType: 'pattern-sequence',
    seoTitle: 'Build a House — Kids Architecture & Building Game',
    seoDescription: 'Construct cozy houses by assembling foundation, walls, roof, and windows.',
    levels: {
      easy: [
        { prompt: 'Build a Cozy Cottage:', items: ['Dig and pour Foundation 🪵', 'Erect solid Walls 🧱', 'Install Roof 🏠', 'Add Windows and Front Door 🚪'], correctOrder: ['Dig and pour Foundation 🪵', 'Erect solid Walls 🧱', 'Install Roof 🏠', 'Add Windows and Front Door 🚪'] }
      ],
      medium: [
        { prompt: 'Build with Interior Details:', items: ['Solid Concrete Foundation 🏗️', 'Timber Framing & Walls 🧱', 'Weatherproof Slanted Roof 🏠', 'Plumbing & Electrical Wiring 💡', 'Paint & Furnish Rooms 🛋️'], correctOrder: ['Solid Concrete Foundation 🏗️', 'Timber Framing & Walls 🧱', 'Weatherproof Slanted Roof 🏠', 'Plumbing & Electrical Wiring 💡', 'Paint & Furnish Rooms 🛋️'] }
      ],
      hard: [
        { prompt: 'Eco-Friendly Smart Home Construction:', items: ['Architectural Blueprint Design 📐', 'Reinforced Deep Foundation 🏗️', 'Insulated Timber Structure 🧱', 'Solar Panels on Roof ☀️', 'Smart Energy & Rainwater Harvesting 💧'], correctOrder: ['Architectural Blueprint Design 📐', 'Reinforced Deep Foundation 🏗️', 'Insulated Timber Structure 🧱', 'Solar Panels on Roof ☀️', 'Smart Energy & Rainwater Harvesting 💧'] }
      ]
    }
  },
  {
    id: 'g89',
    title: 'Pixel Art Creator',
    slug: 'pixel-art-creator',
    category: 'creativity',
    subcategory: 'Pixel Art',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '👾',
    colorTheme: 'cyan',
    description: 'Fill grid pixels with vibrant colors to create retro game sprites (Hearts, Swords, Mushrooms)!',
    instructions: 'Tap grid squares with selected color swatches to recreate pixel art designs.',
    learningObjectives: ['Digital grid coordinates', 'Pixel art creation', 'Spatial pattern mapping'],
    gameType: 'canvas-art',
    seoTitle: 'Pixel Art Creator — Kids Online Pixel Art Grid Game',
    seoDescription: 'Create retro pixel art sprites on interactive color grids.',
    levels: {
      easy: { gridSize: 8, targetPattern: 'Red Pixel Heart ❤️', palette: ['#EF4444', '#FFFFFF'] },
      medium: { gridSize: 12, targetPattern: 'Power Mushroom 🍄', palette: ['#EF4444', '#F59E0B', '#10B981', '#FFFFFF', '#000000'] },
      hard: { gridSize: 16, targetPattern: 'Retro Game Hero 🦸', palette: ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#FFFFFF', '#000000'] }
    }
  },
  {
    id: 'g90',
    title: 'Pattern Coloring',
    slug: 'pattern-coloring',
    category: 'creativity',
    subcategory: 'Patterns',
    ageRange: '4–8',
    minAge: 4,
    maxAge: 8,
    difficulty: 'Easy',
    icon: '🏵️',
    colorTheme: 'rose',
    description: 'Complete mesmerizing mandala and geometric tessellation patterns with matching colors!',
    instructions: 'Observe the repeating color symmetry and fill in the missing section.',
    learningObjectives: ['Symmetry recognition', 'Geometric patterns', 'Color balance'],
    gameType: 'quiz',
    seoTitle: 'Pattern Coloring — Mandala & Tessellation Game for Kids',
    seoDescription: 'Complete symmetric color patterns and mandalas with playful choices.',
    levels: {
      easy: [
        { prompt: 'Symmetric Flower: Left petal is 🔴 Red, Top is 🔴 Red, Right is 🔴 Red. What color is the Bottom petal?', options: ['🔴 Red (Maintains symmetry)', '🔵 Blue', '🟢 Green', '⚫ Black'], answer: '🔴 Red (Maintains symmetry)' },
        { prompt: 'Checkerboard pattern: ⬛ ⬜ ⬛ ⬜ ⬛ ?', options: ['⬜ White', '⬛ Black', '🔴 Red', '🟡 Yellow'], answer: '⬜ White' },
        { prompt: 'Alternating border: 🟡 🔵 🟡 🔵 🟡 ?', options: ['🔵 Blue', '🟡 Yellow', '🔴 Red', '🟢 Green'], answer: '🔵 Blue' }
      ],
      medium: [
        { prompt: 'Radial Mandala with 6 segments: Blue, Gold, Blue, Gold, Blue, ?', options: ['Gold 🟡', 'Blue 🔵', 'Red 🔴', 'Green 🟢'], answer: 'Gold 🟡' },
        { prompt: 'Tessellation grid rule: Every even row shifts right by 1 block. This is called:', options: ['Offset / Brick Pattern', 'Random scatter', 'Vertical stripe', 'Diagonal spin'], answer: 'Offset / Brick Pattern' }
      ],
      hard: [
        { prompt: 'A repeating pattern of regular polygons that covers a flat surface without gaps or overlaps is called a:', options: ['Tessellation', 'Fractal', 'Prism', 'Matrix'], answer: 'Tessellation' },
        { prompt: 'Which regular polygon CANNOT tile a 2D plane by itself in a regular tessellation?', options: ['Regular Pentagon (5 sides)', 'Equilateral Triangle (3 sides)', 'Square (4 sides)', 'Regular Hexagon (6 sides)'], answer: 'Regular Pentagon (5 sides)' }
      ]
    }
  }
];
