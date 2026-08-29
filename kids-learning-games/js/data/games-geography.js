// games-geography.js - Geography & General Knowledge Games (Games 71–80)

window.GAMES_GEOGRAPHY = [
  {
    id: 'g71',
    title: 'World Map Explorer',
    slug: 'world-map-explorer',
    category: 'geography',
    subcategory: 'Maps',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🗺️',
    colorTheme: 'cyan',
    description: 'Explore the world globe and locate continents, countries, and oceans on the map!',
    instructions: 'Look at the requested territory or geographic feature and tap its location on the map.',
    learningObjectives: ['World geography', 'Map reading skills', 'Global locations'],
    gameType: 'map-geography',
    seoTitle: 'World Map Explorer — Kids Online Geography Map Game',
    seoDescription: 'Locate world continents and countries on interactive vector maps.',
    levels: {
      easy: [
        { prompt: 'Which continent is home to the Amazon Rainforest? 🌴', options: ['South America', 'Europe', 'Australia', 'Antarctica'], answer: 'South America' },
        { prompt: 'Which is the largest continent by land area and population?', options: ['Asia', 'Africa', 'North America', 'Europe'], answer: 'Asia' },
        { prompt: 'Which icy continent is at the South Pole and covered in ice? 🐧', options: ['Antarctica', 'Arctic', 'Europe', 'Australia'], answer: 'Antarctica' },
        { prompt: 'Which country is shaped like a boot in Europe? 👢', options: ['Italy', 'France', 'Spain', 'Germany'], answer: 'Italy' },
        { prompt: 'Which continent is also a single country island? 🦘', options: ['Australia', 'Africa', 'Asia', 'South America'], answer: 'Australia' }
      ],
      medium: [
        { prompt: 'Which country is home to the Great Pyramids of Giza? 🏜️', options: ['Egypt (Africa)', 'Mexico', 'India', 'Greece'], answer: 'Egypt (Africa)' },
        { prompt: 'Which ocean lies between North America and Europe? 🌊', options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 'Atlantic Ocean' },
        { prompt: 'Which is the longest river in the world? 🏞️', options: ['Nile River', 'Amazon River', 'Yangtze River', 'Mississippi River'], answer: 'Nile River' },
        { prompt: 'Which is the highest mountain peak on Earth above sea level? 🏔️', options: ['Mount Everest', 'K2', 'Mount Kilimanjaro', 'Mount Fuji'], answer: 'Mount Everest' },
        { prompt: 'Which country has the largest land area in the world?', options: ['Russia', 'Canada', 'China', 'United States'], answer: 'Russia' }
      ],
      hard: [
        { prompt: 'Which strait connects the Mediterranean Sea to the Atlantic Ocean?', options: ['Strait of Gibraltar', 'Bering Strait', 'Strait of Malacca', 'Bosphorus'], answer: 'Strait of Gibraltar' },
        { prompt: 'Which desert is the largest hot desert in the world? 🐪', options: ['Sahara Desert', 'Gobi Desert', 'Kalahari Desert', 'Atacama Desert'], answer: 'Sahara Desert' },
        { prompt: 'Which mountain range separates Europe from Asia?', options: ['Ural Mountains', 'Alps', 'Himalayas', 'Andes'], answer: 'Ural Mountains' },
        { prompt: 'The deepest point in the world\'s oceans is the:', options: ['Mariana Trench (Challenger Deep)', 'Puerto Rico Trench', 'Java Trench', 'Tonga Trench'], answer: 'Mariana Trench (Challenger Deep)' },
        { prompt: 'Which country contains the most natural lakes in the world? 🍁', options: ['Canada', 'Finland', 'Sweden', 'Russia'], answer: 'Canada' }
      ]
    }
  },
  {
    id: 'g72',
    title: 'Country Flag Match',
    slug: 'country-flag-match',
    category: 'geography',
    subcategory: 'Flags',
    ageRange: '5–12',
    minAge: 5,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🚩',
    colorTheme: 'blue',
    description: 'Match national flags from around the globe to their countries!',
    instructions: 'Tap the matching pairs of country names and their colorful flags.',
    learningObjectives: ['National flag recognition', 'International symbols', 'Visual memory'],
    gameType: 'memory',
    seoTitle: 'Country Flag Match — World Flags Matching Game for Kids',
    seoDescription: 'Match flags of the USA, UK, India, Japan, France, Canada, and more.',
    levels: {
      easy: { pairs: [['🇺🇸 USA', 'USA 🇺🇸'], ['🇬🇧 UK', 'UK 🇬🇧'], ['🇮🇳 India', 'India 🇮🇳'], ['🇯🇵 Japan', 'Japan 🇯🇵']] },
      medium: { pairs: [['🇨🇦 Canada', 'Canada 🇨🇦'], ['🇫🇷 France', 'France 🇫🇷'], ['🇩🇪 Germany', 'Germany 🇩🇪'], ['🇧🇷 Brazil', 'Brazil 🇧🇷'], ['🇦🇺 Australia', 'Australia 🇦🇺'], ['🇮🇹 Italy', 'Italy 🇮🇹']] },
      hard: { pairs: [['🇿🇦 South Africa', 'South Africa 🇿🇦'], ['🇰🇷 South Korea', 'South Korea 🇰🇷'], ['🇪🇸 Spain', 'Spain 🇪🇸'], ['🇲🇽 Mexico', 'Mexico 🇲🇽'], ['🇪🇬 Egypt', 'Egypt 🇪🇬'], ['🇦🇷 Argentina', 'Argentina 🇦🇷'], ['🇳🇱 Netherlands', 'Netherlands 🇳🇱'], ['🇸🇪 Sweden', 'Sweden 🇸🇪']] }
    }
  },
  {
    id: 'g73',
    title: 'Capital City Match',
    slug: 'capital-city-match',
    category: 'geography',
    subcategory: 'Capitals',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🏛️',
    colorTheme: 'indigo',
    description: 'Connect countries with their famous world capital cities!',
    instructions: 'Choose the correct capital city for each nation.',
    learningObjectives: ['World capitals', 'Civic geography', 'Global knowledge'],
    gameType: 'quiz',
    seoTitle: 'Capital City Match — World Capitals Quiz Game for Kids',
    seoDescription: 'Test your knowledge of world capital cities from Tokyo to London.',
    levels: {
      easy: [
        { prompt: 'What is the capital of France? 🇫🇷', options: ['Paris', 'Rome', 'Madrid', 'Berlin'], answer: 'Paris' },
        { prompt: 'What is the capital of Japan? 🇯🇵', options: ['Tokyo', 'Kyoto', 'Osaka', 'Seoul'], answer: 'Tokyo' },
        { prompt: 'What is the capital of the United Kingdom? 🇬🇧', options: ['London', 'Edinburgh', 'Manchester', 'Dublin'], answer: 'London' },
        { prompt: 'What is the capital of India? 🇮🇳', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], answer: 'New Delhi' },
        { prompt: 'What is the capital of the USA? 🇺🇸', options: ['Washington, D.C.', 'New York', 'Los Angeles', 'Chicago'], answer: 'Washington, D.C.' }
      ],
      medium: [
        { prompt: 'What is the capital of Australia? 🇦🇺', options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'], answer: 'Canberra' },
        { prompt: 'What is the capital of Canada? 🇨🇦', options: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'], answer: 'Ottawa' },
        { prompt: 'What is the capital of Germany? 🇩🇪', options: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'], answer: 'Berlin' },
        { prompt: 'What is the capital of Italy? 🇮🇹', options: ['Rome', 'Venice', 'Milan', 'Florence'], answer: 'Rome' },
        { prompt: 'What is the capital of Brazil? 🇧🇷', options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'], answer: 'Brasília' }
      ],
      hard: [
        { prompt: 'What is the capital of Egypt? 🇪🇬', options: ['Cairo', 'Alexandria', 'Giza', 'Luxor'], answer: 'Cairo' },
        { prompt: 'What is the capital of South Africa? (Administrative)', options: ['Pretoria', 'Cape Town', 'Johannesburg', 'Durban'], answer: 'Pretoria' },
        { prompt: 'What is the capital of Argentina? 🇦🇷', options: ['Buenos Aires', 'Santiago', 'Lima', 'Bogota'], answer: 'Buenos Aires' },
        { prompt: 'What is the capital of Turkey? 🇹🇷', options: ['Ankara', 'Istanbul', 'Izmir', 'Antalya'], answer: 'Ankara' },
        { prompt: 'What is the capital of New Zealand? 🇳🇿', options: ['Wellington', 'Auckland', 'Christchurch', 'Hamilton'], answer: 'Wellington' }
      ]
    }
  },
  {
    id: 'g74',
    title: 'Continent Sort',
    slug: 'continent-sort',
    category: 'geography',
    subcategory: 'Continents',
    ageRange: '5–10',
    minAge: 5,
    maxAge: 10,
    difficulty: 'Easy',
    icon: '🌐',
    colorTheme: 'teal',
    description: 'Sort countries and iconic landmarks into the 7 world continents!',
    instructions: 'Drag or place each country/landmark into its matching continent bucket.',
    learningObjectives: ['The 7 continents', 'Continental classification', 'Global spatial organization'],
    gameType: 'drag-drop',
    seoTitle: 'Continent Sort — 7 Continents Sorting Game for Children',
    seoDescription: 'Sort countries, animals, and landmarks into the 7 world continents.',
    levels: {
      easy: [
        { prompt: 'Which continent does the Kangaroo 🦘 belong to?', slots: ['Australia', 'Europe', 'Africa'], correct: 'Australia', options: ['Australia', 'Europe', 'Africa'] },
        { prompt: 'Which continent does the Eiffel Tower 🗼 belong to?', slots: ['Europe', 'Asia', 'South America'], correct: 'Europe', options: ['Europe', 'Asia', 'South America'] },
        { prompt: 'Which continent is the Sahara Desert 🏜️ in?', slots: ['Africa', 'North America', 'Australia'], correct: 'Africa', options: ['Africa', 'North America', 'Australia'] },
        { prompt: 'Which continent is the Great Wall of China 🏯 in?', slots: ['Asia', 'Europe', 'Africa'], correct: 'Asia', options: ['Asia', 'Europe', 'Africa'] }
      ],
      medium: [
        { prompt: 'Which continent contains the Amazon Rainforest? 🌿', slots: ['South America', 'North America', 'Africa'], correct: 'South America', options: ['South America', 'North America', 'Africa'] },
        { prompt: 'Which continent contains Canada and Mexico? 🍁', slots: ['North America', 'Europe', 'Asia'], correct: 'North America', options: ['North America', 'Europe', 'Asia'] },
        { prompt: 'Which continent is the Taj Mahal 🕌 in?', slots: ['Asia', 'Europe', 'Africa'], correct: 'Asia', options: ['Asia', 'Europe', 'Africa'] },
        { prompt: 'Which continent contains the South Pole? ❄️', slots: ['Antarctica', 'Arctic', 'Europe'], correct: 'Antarctica', options: ['Antarctica', 'Arctic', 'Europe'] }
      ],
      hard: [
        { prompt: 'Which continent contains the Alps mountain range? 🏔️', slots: ['Europe', 'Asia', 'South America'], correct: 'Europe', options: ['Europe', 'Asia', 'South America'] },
        { prompt: 'Which continent contains the Andes mountain range? ⛰️', slots: ['South America', 'Africa', 'North America'], correct: 'South America', options: ['South America', 'Africa', 'North America'] },
        { prompt: 'Which continent contains the Serengeti grasslands and Mount Kilimanjaro? 🦁', slots: ['Africa', 'Asia', 'Australia'], correct: 'Africa', options: ['Africa', 'Asia', 'Australia'] }
      ]
    }
  },
  {
    id: 'g75',
    title: 'Ocean Explorer',
    slug: 'ocean-explorer',
    category: 'geography',
    subcategory: 'Oceans',
    ageRange: '5–11',
    minAge: 5,
    maxAge: 11,
    difficulty: 'Easy',
    icon: '🌊',
    colorTheme: 'blue',
    description: 'Dive deep into Earth\'s 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic!',
    instructions: 'Answer questions about ocean life, ocean size, and marine geography.',
    learningObjectives: ['5 world oceans', 'Marine ecosystems', 'Ocean currents & tides'],
    gameType: 'quiz',
    seoTitle: 'Ocean Explorer — 5 Oceans Geography Game for Kids',
    seoDescription: 'Explore the Pacific, Atlantic, Indian, Arctic, and Southern Oceans.',
    levels: {
      easy: [
        { prompt: 'Which is the largest and deepest ocean on Earth? 🌊', options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 'Pacific Ocean' },
        { prompt: 'Which ocean is the coldest and covered in sea ice at the North Pole? 🧊', options: ['Arctic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean'], answer: 'Arctic Ocean' },
        { prompt: 'Which ocean is named after a large South Asian country? 🇮🇳', options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Southern Ocean'], answer: 'Indian Ocean' },
        { prompt: 'How many main oceans cover planet Earth? 🌍', options: ['5 Oceans', '3 Oceans', '7 Oceans', '10 Oceans'], answer: '5 Oceans' },
        { prompt: 'About how much of Earth\'s surface is covered by ocean water?', options: ['About 71%', 'About 25%', 'About 50%', 'About 95%'], answer: 'About 71%' }
      ],
      medium: [
        { prompt: 'Which ocean surrounds the icy continent of Antarctica? 🐧', options: ['Southern (Antarctic) Ocean', 'Arctic Ocean', 'Indian Ocean', 'Atlantic Ocean'], answer: 'Southern (Antarctic) Ocean' },
        { prompt: 'What is the name of the largest living structure on Earth, located in the Pacific? 🪸', options: ['Great Barrier Reef', 'Mariana Trench', 'Mid-Atlantic Ridge', 'Bermuda Triangle'], answer: 'Great Barrier Reef' },
        { prompt: 'Which ocean separates the Americas from Europe and Africa?', options: ['Atlantic Ocean', 'Pacific Ocean', 'Arctic Ocean', 'Indian Ocean'], answer: 'Atlantic Ocean' },
        { prompt: 'What is the largest animal ever known to live in Earth\'s oceans? 🐋', options: ['Blue Whale', 'Megalodon', 'Giant Squid', 'Great White Shark'], answer: 'Blue Whale' },
        { prompt: 'Regular rising and falling of ocean water caused by the Moon\'s gravity are:', options: ['Tides', 'Tsunamis', 'Hurricanes', 'Whirlpools'], answer: 'Tides' }
      ],
      hard: [
        { prompt: 'What is the underwater mountain system that runs through the Atlantic Ocean called?', options: ['Mid-Atlantic Ridge', 'Mariana Ridge', 'Himalayan Ridge', 'Pacific Ring'], answer: 'Mid-Atlantic Ridge' },
        { prompt: 'The horseshoe-shaped zone around the Pacific Ocean with intense earthquakes and volcanoes is:', options: ['The Ring of Fire', 'The Hot Belt', 'The Trench Line', 'The Crust Circle'], answer: 'The Ring of Fire' },
        { prompt: 'Which warm ocean current originates in the Gulf of Mexico and warms Western Europe? ♨️', options: ['The Gulf Stream', 'Humboldt Current', 'Kuroshio Current', 'California Current'], answer: 'The Gulf Stream' },
        { prompt: 'What percentage of the planet\'s oxygen is produced by marine phytoplankton? 🌿', options: ['Over 50%', 'About 10%', 'About 20%', 'About 5%'], answer: 'Over 50%' },
        { prompt: 'The deepest surveyed spot on the ocean floor is the Mariana Trench reaching about:', options: ['11,000 meters (36,000 ft)', '5,000 meters', '2,000 meters', '25,000 meters'], answer: '11,000 meters (36,000 ft)' }
      ]
    }
  },
  {
    id: 'g76',
    title: 'Famous Landmark Match',
    slug: 'famous-landmark-match',
    category: 'gk',
    subcategory: 'Landmarks',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🗽',
    colorTheme: 'amber',
    description: 'Match iconic world landmarks (Statue of Liberty, Taj Mahal, Colosseum) to their countries!',
    instructions: 'Select the country where each famous monument is located.',
    learningObjectives: ['World architecture', 'Historical monuments', 'Global heritage'],
    gameType: 'quiz',
    seoTitle: 'Famous Landmark Match — World Monuments Game for Kids',
    seoDescription: 'Explore the world’s most iconic landmarks and historic monuments.',
    levels: {
      easy: [
        { prompt: 'Where is the Statue of Liberty? 🗽', options: ['USA (New York)', 'France', 'UK', 'Canada'], answer: 'USA (New York)' },
        { prompt: 'Where is the Eiffel Tower? 🗼', options: ['France (Paris)', 'Italy', 'Germany', 'Spain'], answer: 'France (Paris)' },
        { prompt: 'Where is the Taj Mahal? 🕌', options: ['India (Agra)', 'Egypt', 'China', 'Turkey'], answer: 'India (Agra)' },
        { prompt: 'Where are the Great Pyramids of Giza? 🏜️', options: ['Egypt', 'Mexico', 'Greece', 'Morocco'], answer: 'Egypt' },
        { prompt: 'Where is the Great Wall? 🏯', options: ['China', 'Japan', 'Korea', 'Mongolia'], answer: 'China' }
      ],
      medium: [
        { prompt: 'Where is the ancient Colosseum arena? 🏛️', options: ['Italy (Rome)', 'Greece (Athens)', 'France', 'Egypt'], answer: 'Italy (Rome)' },
        { prompt: 'Where is Big Ben and the Houses of Parliament? 🕰️', options: ['United Kingdom (London)', 'USA', 'Australia', 'Ireland'], answer: 'United Kingdom (London)' },
        { prompt: 'Where is the Sydney Opera House? ⛵', options: ['Australia', 'New Zealand', 'Singapore', 'Canada'], answer: 'Australia' },
        { prompt: 'Where is Machu Picchu, the ancient Incan citadel in the Andes? 🏔️', options: ['Peru', 'Brazil', 'Chile', 'Colombia'], answer: 'Peru' },
        { prompt: 'Where is Christ the Redeemer statue overlooking the sea? 🇧🇷', options: ['Brazil (Rio de Janeiro)', 'Portugal', 'Spain', 'Argentina'], answer: 'Brazil (Rio de Janeiro)' }
      ],
      hard: [
        { prompt: 'Where is the ancient city of Petra carved into pink sandstone cliffs? 🏛️', options: ['Jordan', 'Saudi Arabia', 'Iran', 'Israel'], answer: 'Jordan' },
        { prompt: 'Where is the monumental temple complex of Angkor Wat? 🛕', options: ['Cambodia', 'Thailand', 'Vietnam', 'Indonesia'], answer: 'Cambodia' },
        { prompt: 'Where is the leaning Tower of Pisa? 🇮🇹', options: ['Italy (Pisa)', 'France', 'Spain', 'Austria'], answer: 'Italy (Pisa)' },
        { prompt: 'Where is the Parthenon temple atop the Acropolis? 🏛️', options: ['Greece (Athens)', 'Italy (Rome)', 'Turkey', 'Cyprus'], answer: 'Greece (Athens)' },
        { prompt: 'Where is the giant prehistoric stone circle of Stonehenge? 🪨', options: ['England (United Kingdom)', 'Scotland', 'Ireland', 'Wales'], answer: 'England (United Kingdom)' }
      ]
    }
  },
  {
    id: 'g77',
    title: 'India States Puzzle',
    slug: 'india-states-puzzle',
    category: 'geography',
    subcategory: 'India',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🇮🇳',
    colorTheme: 'orange',
    description: 'Assemble and identify Indian states on the map of India!',
    instructions: 'Locate the requested Indian state or match its cultural and geographic clue.',
    learningObjectives: ['Indian geography', 'States and Union Territories', 'Cultural literacy'],
    gameType: 'quiz',
    seoTitle: 'India States Puzzle — Map of India Learning Game',
    seoDescription: 'Learn all 28 states and 8 union territories of India on an interactive map.',
    levels: {
      easy: [
        { prompt: 'Which state is famous for backwaters, houseboats, and coconut trees? 🌴', options: ['Kerala', 'Punjab', 'Rajasthan', 'Gujarat'], answer: 'Kerala' },
        { prompt: 'Which state is famous for the Thar Desert, palaces, and camels? 🐪', options: ['Rajasthan', 'Goa', 'Assam', 'Odisha'], answer: 'Rajasthan' },
        { prompt: 'Which smallest Indian state is famous for sunny beaches? 🏖️', options: ['Goa', 'Sikkim', 'Kerala', 'Tripura'], answer: 'Goa' },
        { prompt: 'Which state is known as the "Land of Five Rivers"? 🌾', options: ['Punjab', 'Haryana', 'Bihar', 'Uttar Pradesh'], answer: 'Punjab' },
        { prompt: 'Which northern region is celebrated as the "Paradise on Earth" with Dal Lake? 🏔️', options: ['Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Ladakh'], answer: 'Jammu and Kashmir' }
      ],
      medium: [
        { prompt: 'Which state is famous worldwide for its lush green tea gardens? 🫖', options: ['Assam', 'Kerala', 'Gujarat', 'Karnataka'], answer: 'Assam' },
        { prompt: 'Which state is home to the tech capital Bangalore (Bengaluru)? 💻', options: ['Karnataka', 'Tamil Nadu', 'Maharashtra', 'Telangana'], answer: 'Karnataka' },
        { prompt: 'In which state is the ancient Taj Mahal located in Agra? 🕌', options: ['Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Haryana'], answer: 'Uttar Pradesh' },
        { prompt: 'Which state is home to Mumbai, the financial capital and Bollywood? 🎬', options: ['Maharashtra', 'Gujarat', 'Goa', 'Madhya Pradesh'], answer: 'Maharashtra' },
        { prompt: 'Which state is famous for classical dance Bharatanatyam and Meenakshi Temple? 🛕', options: ['Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Odisha'], answer: 'Tamil Nadu' }
      ],
      hard: [
        { prompt: 'Which state is home to the Kaziranga National Park with one-horned rhinos? 🦏', options: ['Assam', 'West Bengal', 'Odisha', 'Meghalaya'], answer: 'Assam' },
        { prompt: 'Which northeastern state is known as the "Abode of Clouds" with wettest Cherrapunji? 🌧️', options: ['Meghalaya', 'Mizoram', 'Nagaland', 'Arunachal Pradesh'], answer: 'Meghalaya' },
        { prompt: 'In which state is the famous Konark Sun Temple (Chariot temple) located? ☀️', options: ['Odisha', 'West Bengal', 'Andhra Pradesh', 'Bihar'], answer: 'Odisha' },
        { prompt: 'Which state was formed as India\'s 29th state in 2014 with capital Hyderabad?', options: ['Telangana', 'Chhattisgarh', 'Jharkhand', 'Uttarakhand'], answer: 'Telangana' },
        { prompt: 'Which state has the longest coastline in mainland India? 🌊', options: ['Gujarat', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra'], answer: 'Gujarat' }
      ]
    }
  },
  {
    id: 'g78',
    title: 'India State Capitals',
    slug: 'india-state-capitals',
    category: 'geography',
    subcategory: 'India',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🏛️',
    colorTheme: 'emerald',
    description: 'Match Indian states with their official capital cities!',
    instructions: 'Choose the correct capital city for each Indian state.',
    learningObjectives: ['Indian state capitals', 'Civics', 'General knowledge'],
    gameType: 'quiz',
    seoTitle: 'India State Capitals — Quiz Game for Indian Geography',
    seoDescription: 'Master all state capitals of India from Chennai to Chandigarh.',
    levels: {
      easy: [
        { prompt: 'What is the capital of Tamil Nadu? 🛕', options: ['Chennai', 'Madurai', 'Coimbatore', 'Bengaluru'], answer: 'Chennai' },
        { prompt: 'What is the capital of Maharashtra? 🏙️', options: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'], answer: 'Mumbai' },
        { prompt: 'What is the capital of Karnataka? 💻', options: ['Bengaluru (Bangalore)', 'Mysuru', 'Mangalore', 'Hubli'], answer: 'Bengaluru (Bangalore)' },
        { prompt: 'What is the capital of Rajasthan? (The Pink City) 🏰', options: ['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner'], answer: 'Jaipur' },
        { prompt: 'What is the capital of West Bengal? 📚', options: ['Kolkata', 'Darjeeling', 'Siliguri', 'Howrah'], answer: 'Kolkata' }
      ],
      medium: [
        { prompt: 'What is the capital of Kerala? 🌴', options: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'], answer: 'Thiruvananthapuram' },
        { prompt: 'What is the capital of Gujarat? 🦁', options: ['Gandhinagar', 'Ahmedabad', 'Surat', 'Vadodara'], answer: 'Gandhinagar' },
        { prompt: 'What is the shared capital of Punjab and Haryana? 🌾', options: ['Chandigarh', 'Amritsar', 'Ludhiana', 'Gurugram'], answer: 'Chandigarh' },
        { prompt: 'What is the capital of Uttar Pradesh? 🕌', options: ['Lucknow', 'Varanasi', 'Kanpur', 'Agra'], answer: 'Lucknow' },
        { prompt: 'What is the capital of Madhya Pradesh? 🐅', options: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'], answer: 'Bhopal' }
      ],
      hard: [
        { prompt: 'What is the capital of Assam? 🫖', options: ['Dispur', 'Guwahati', 'Silchar', 'Dibrugarh'], answer: 'Dispur' },
        { prompt: 'What is the capital of Meghalaya? 🌧️', options: ['Shillong', 'Imphal', 'Aizawl', 'Kohima'], answer: 'Shillong' },
        { prompt: 'What is the capital of Nagaland? 🪶', options: ['Kohima', 'Dimapur', 'Imphal', 'Itanagar'], answer: 'Kohima' },
        { prompt: 'What is the capital of Arunachal Pradesh? 🏔️', options: ['Itanagar', 'Tawang', 'Pasighat', 'Ziro'], answer: 'Itanagar' },
        { prompt: 'What is the capital of Sikkim? 🌺', options: ['Gangtok', 'Namchi', 'Pelling', 'Darjeeling'], answer: 'Gangtok' }
      ]
    }
  },
  {
    id: 'g79',
    title: 'World Currency Match',
    slug: 'world-currency-match',
    category: 'gk',
    subcategory: 'Economics',
    ageRange: '7–12',
    minAge: 7,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '💱',
    colorTheme: 'teal',
    description: 'Match global currencies (Dollar, Rupee, Yen, Euro, Pound) to their countries!',
    instructions: 'Select the national currency used in each country.',
    learningObjectives: ['World currencies & symbols', 'Global trade basics', 'Financial literacy'],
    gameType: 'quiz',
    seoTitle: 'World Currency Match — Money & Currencies Game for Kids',
    seoDescription: 'Match currencies from around the world in this fun economic trivia quiz.',
    levels: {
      easy: [
        { prompt: 'What is the currency of the United States? 🇺🇸', options: ['US Dollar ($)', 'Euro (€)', 'Pound (£)', 'Rupee (₹)'], answer: 'US Dollar ($)' },
        { prompt: 'What is the currency of India? 🇮🇳', options: ['Indian Rupee (₹)', 'Dollar ($)', 'Yen (¥)', 'Dinar'], answer: 'Indian Rupee (₹)' },
        { prompt: 'What is the currency of the United Kingdom? 🇬🇧', options: ['British Pound (£)', 'Euro (€)', 'Dollar ($)', 'Franc'], answer: 'British Pound (£)' },
        { prompt: 'What is the currency of Japan? 🇯🇵', options: ['Japanese Yen (¥)', 'Won (₩)', 'Yuan (¥)', 'Dollar ($)'], answer: 'Japanese Yen (¥)' },
        { prompt: 'What common currency is used by many European Union nations? 🇪🇺', options: ['Euro (€)', 'Pound (£)', 'Dollar ($)', 'Ruble'], answer: 'Euro (€)' }
      ],
      medium: [
        { prompt: 'What is the currency of China? 🇨🇳', options: ['Chinese Yuan / Renminbi (¥)', 'Yen (¥)', 'Won (₩)', 'Ringgit'], answer: 'Chinese Yuan / Renminbi (¥)' },
        { prompt: 'What is the currency of South Korea? 🇰🇷', options: ['Korean Won (₩)', 'Yen (¥)', 'Yuan (¥)', 'Baht'], answer: 'Korean Won (₩)' },
        { prompt: 'What is the currency of Russia? 🇷🇺', options: ['Russian Ruble (₽)', 'Euro (€)', 'Pound (£)', 'Dinar'], answer: 'Russian Ruble (₽)' },
        { prompt: 'What is the currency of Australia? 🇦🇺', options: ['Australian Dollar (A$)', 'Pound (£)', 'Euro (€)', 'Rupee (₹)'], answer: 'Australian Dollar (A$)' },
        { prompt: 'What is the currency of Canada? 🇨🇦', options: ['Canadian Dollar (C$)', 'US Dollar ($)', 'Pound (£)', 'Euro (€)'], answer: 'Canadian Dollar (C$)' }
      ],
      hard: [
        { prompt: 'What is the currency of Switzerland? 🇨🇭', options: ['Swiss Franc (CHF)', 'Euro (€)', 'Krona', 'Pound (£)'], answer: 'Swiss Franc (CHF)' },
        { prompt: 'What is the currency of South Africa? 🇿🇦', options: ['South African Rand (ZAR)', 'Dinar', 'Dollar', 'Pound'], answer: 'South African Rand (ZAR)' },
        { prompt: 'What is the currency of Mexico? 🇲🇽', options: ['Mexican Peso ($)', 'Real (R$)', 'Sol', 'Bolivar'], answer: 'Mexican Peso ($)' },
        { prompt: 'What is the currency of the United Arab Emirates (UAE)? 🇦🇪', options: ['UAE Dirham (AED)', 'Riyal (SAR)', 'Dinar (KWD)', 'Lira'], answer: 'UAE Dirham (AED)' },
        { prompt: 'What is the currency of Thailand? 🇹🇭', options: ['Thai Baht (฿)', 'Dong (₫)', 'Ringgit (RM)', 'Rupiah (Rp)'], answer: 'Thai Baht (฿)' }
      ]
    }
  },
  {
    id: 'g80',
    title: 'Famous Places Quiz',
    slug: 'famous-places-quiz',
    category: 'gk',
    subcategory: 'Places',
    ageRange: '6–12',
    minAge: 6,
    maxAge: 12,
    difficulty: 'Medium',
    icon: '🏰',
    colorTheme: 'purple',
    description: 'Identify famous natural and historical wonders from images and intriguing clues!',
    instructions: 'Read the clue and choose the famous place name.',
    learningObjectives: ['World heritage wonders', 'Natural wonders', 'Cultural exploration'],
    gameType: 'quiz',
    seoTitle: 'Famous Places Quiz — World Wonders Trivia Game',
    seoDescription: 'Identify the Grand Canyon, Niagara Falls, Mount Fuji, and world wonders.',
    levels: {
      easy: [
        { prompt: 'A massive red rock canyon carved over millions of years by the Colorado River in the USA: 🏞️', options: ['Grand Canyon', 'Death Valley', 'Monument Valley', 'Yellowstone'], answer: 'Grand Canyon' },
        { prompt: 'Famous snow-capped volcanic mountain and cultural symbol of Japan: 🗻', options: ['Mount Fuji', 'Mount Everest', 'Mount Kilimanjaro', 'Mount Olympus'], answer: 'Mount Fuji' },
        { prompt: 'Massive group of three waterfalls on the border of USA and Canada: 🌊', options: ['Niagara Falls', 'Victoria Falls', 'Angel Falls', 'Iguazu Falls'], answer: 'Niagara Falls' },
        { prompt: 'The tallest structure in Paris, made of wrought-iron lattice: 🗼', options: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'], answer: 'Eiffel Tower' },
        { prompt: 'Ancient white marble mausoleum built in Agra, India: 🕌', options: ['Taj Mahal', 'Red Fort', 'Qutub Minar', 'Hawa Mahal'], answer: 'Taj Mahal' }
      ],
      medium: [
        { prompt: 'World\'s highest uninterrupted waterfall, located in Venezuela (979 meters high): 🏞️', options: ['Angel Falls', 'Niagara Falls', 'Victoria Falls', 'Iguazu Falls'], answer: 'Angel Falls' },
        { prompt: 'A giant submerged sinkhole off the coast of Belize with crystal clear blue water: 🌊', options: ['The Great Blue Hole', 'Mariana Trench', 'Bermuda Triangle', 'Dead Sea'], answer: 'The Great Blue Hole' },
        { prompt: 'Historic volcanic mountain in Italy that buried the ancient city of Pompeii in 79 AD: 🌋', options: ['Mount Vesuvius', 'Mount Etna', 'Stromboli', 'Mount Saint Helens'], answer: 'Mount Vesuvius' },
        { prompt: 'Ancient citadel on a rocky outcrop above the city of Athens, Greece: 🏛️', options: ['The Acropolis (Parthenon)', 'Colosseum', 'Alhambra', 'Petra'], answer: 'The Acropolis (Parthenon)' },
        { prompt: 'Vast white salt flat in Bolivia that acts like a giant natural sky mirror after rain: 🪞', options: ['Salar de Uyuni', 'Bonneville Salt Flats', 'Atacama Desert', 'Death Valley'], answer: 'Salar de Uyuni' }
      ],
      hard: [
        { prompt: 'Spectacular limestone pillar karst landscape in China inspiring floating mountains: ⛰️', options: ['Zhangjiajie National Forest', 'Guilin Karst', 'Huangshan', 'Mount Tai'], answer: 'Zhangjiajie National Forest' },
        { prompt: 'Gigantic ancient mysterious stone monolith figures (Moai) carved on a remote Pacific island: 🗿', options: ['Easter Island (Rapa Nui)', 'Galapagos Islands', 'Tahiti', 'Fiji'], answer: 'Easter Island (Rapa Nui)' },
        { prompt: 'Enormous geothermal spring in Yellowstone National Park with vibrant rainbow colored rings: 🌈', options: ['Grand Prismatic Spring', 'Old Faithful', 'Morning Glory Pool', 'Mammoth Hot Springs'], answer: 'Grand Prismatic Spring' },
        { prompt: 'Intricate Moorish palace and fortress complex in Granada, Andalusia, Spain: 🏰', options: ['The Alhambra', 'Sagrada Familia', 'Alcázar of Seville', 'Mezquita'], answer: 'The Alhambra' },
        { prompt: 'Immense underground multi-level cave system in Kentucky, USA (world\'s longest known): 🦇', options: ['Mammoth Cave', 'Carlsbad Caverns', 'Son Doong Cave', 'Waitomo Caves'], answer: 'Mammoth Cave' }
      ]
    }
  }
];
