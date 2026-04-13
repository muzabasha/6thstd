const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ss_ex = {
  'ss_his_1': {
    ...data['ss_his_1'],
    'examples': [
      { 'question': 'If you found an old inscription on a stone, how would a historian try to identify its age?', 'steps': ['Look for dates or names of kings mentioned in the text.', 'Analyze the script or language used (e.g., Brahmi script is ancient).', 'Use scientific methods like carbon dating if organic material is nearby.'], 'illustration': 'Stone with carved symbols = Inscription' },
      { 'question': 'Why do we study history using timelines like BC and AD?', 'steps': ['BC/BCE stands for years before the birth of Christ (counts backwards).', 'AD/CE stands for years after his birth (counts forwards).', 'It helps organize events in the correct order of time.'] }
    ]
  },
  'ss_his_2': {
    ...data['ss_his_2'],
    'examples': [
      { 'question': 'Describe how early humans accidental discovery of fire changed their lives.', 'steps': ['Used fire to cook meat, making it easier to digest.', 'Used fire as a light source in dark caves.', 'Used it to scare away dangerous wild animals.'], 'illustration': 'Fire = Light, Heat, and Protection' },
      { 'question': 'Why did early humans settle near rivers?', 'steps': ['Rivers provided plenty of water for drinking and daily use.', 'The soil near rivers was very fertile for growing crops.', 'River routes could be used for simple transportation.'] }
    ]
  },
  'ss_his_3': {
    ...data['ss_his_3'],
    'examples': [
      { 'question': 'What was so special about the Harappan house planning?', 'steps': ['Houses were built in a grid system with straight streets.', 'Most houses had separate bathing areas and their own wells.', 'Windows were usually small and placed high for privacy.'], 'illustration': 'Grid-like streets with covered drains' },
      { 'question': 'How do we know the Indus Valley people traded with distant lands?', 'steps': ['Archeologists found seals from Indus Valley in Mesopotamia (Iraq).', 'Precious stones like Lapis Lazuli found in cities came from far-off mountains.'] }
    ]
  },
  'ss_his_4': {
    ...data['ss_his_4'],
    'examples': [
      { 'question': 'How were the Vedas passed down before being written?', 'steps': ['Teachers recited the hymns clearly and slowly.', 'Students listened, memorized, and repeated them repeatedly.', 'This oral tradition kept the knowledge alive for centuries.'], 'illustration': 'Guru speaking -> Shishya listening and repeating' },
      { 'question': 'What can we learn from a Megalith burial site?', 'steps': ['Items found with the body tell us about the person\'s occupation or wealth.', 'Circle of stones on top indicates it was a burial marker.'] }
    ]
  },
  'ss_his_5': {
    ...data['ss_his_5'],
    'examples': [
      { 'question': 'Why was Magadha more successful than other Mahajanapadas?', 'steps': ['It was surrounded by the Ganga and Son rivers (transport and water).', 'It had iron ore mines to make strong weapons and tools.', 'It had thick forests nearby providing timber and elephants for the army.'], 'illustration': 'River + Iron Mines + Forest = Power' },
      { 'question': 'What was the role of Rajagriha in Magadha\'s history?', 'steps': ['It was the first capital of Magadha.', 'It was surrounded by five hills making it very safe from enemies.'] }
    ]
  },
  'ss_his_6': {
    ...data['ss_his_6'],
    'examples': [
      { 'question': 'Why did Buddhism become popular among common people?', 'steps': ['Buddha taught in Prakrit, the language of the common people.', 'He preached equality and rejected the strict caste system.', 'He focused on kindness (Ahimsa) and simple living.'], 'illustration': 'Buddha teaching thousands of people under a tree' },
      { 'question': 'What is the meaning of "Upanishad"?', 'steps': ['Actually means "sitting near" a teacher to learn.', 'It recording discussions between teachers and students about the soul.'] }
    ]
  },
  'ss_his_7': {
    ...data['ss_his_7'],
    'examples': [
      { 'question': 'Why did Ashoka stop fighting after the Kalinga war?', 'steps': ['He saw thousands of deaths and suffering on both sides.', 'He felt deep sorrow and realized that victory through force is not true victory.', 'He decided to conquer people\'s hearts through "Dhamma".'], 'illustration': 'Ashoka looking at a battlefield with sadness' },
      { 'question': 'Give an example of Ashoka\'s Dhamma message.', 'steps': ['"Respect your parents and elders."', '"Be kind to your servants and animals."', '"Do not criticize other people\'s religions."'] }
    ]
  },
  'ss_his_8': {
    ...data['ss_his_8'],
    'examples': [
      { 'question': 'How did the use of iron tools change farming?', 'steps': ['Iron ploughshares could dig deeper than wooden ones.', 'Farmers could prepare tough soil for better crops.', 'It led to more food production and the growth of towns.'], 'illustration': 'Iron plough = More food = Bigger towns' },
      { 'question': 'What would a traveling merchant carry along the Silk Route?', 'steps': ['Silk from China, cotton from India, spices and precious stones.', 'They also carried new ideas and religions back and forth.'] }
    ]
  },
  'ss_his_9': {
    ...data['ss_his_9'],
    'examples': [
      { 'question': 'What is a Prashasti? Give an example.', 'steps': ['It means "In Praise Of".', 'Samudragupta\'s prashasti on the Allahabad Pillar is a famous example.', 'It lists his bravery and how he defeated many kings.'], 'illustration': 'Tall pillar with carved Sanskrit poems' },
      { 'question': 'How did Samudragupta treat kings of South India?', 'steps': ['He defeated them in war but allowed them to rule again.', 'They had to pay him tribute and accept his authority.'] }
    ]
  },
  'ss_his_10': {
    ...data['ss_his_10'],
    'examples': [
      { 'question': 'Describe a Stupa.', 'steps': ['It is a mound-like structure (Anda) built over sacred relics.', 'It has a walkway (Pradakshina patha) for people to go around it.', 'The Sanchi Stupa is one of the most famous examples.'], 'illustration': 'Round dome structure = Stupa' },
      { 'question': 'Why is the Mehrauli Iron Pillar a wonder of science?', 'steps': ['It is over 1500 years old but has not rusted at all.', 'It shows that ancient Indians were masters of metallurgy (working with metal).'] }
    ]
  },
  'ss_geo_1': {
    ...data['ss_geo_1'],
    'examples': [
      { 'question': 'Why is life possible only on Earth in our solar system?', 'steps': ['Earth has the right distance from the sun (not too hot or cold).', 'It has air with oxygen to breathe.', 'It has precious water in liquid form.'], 'illustration': 'Earth = Blue Marble with clouds and oceans' },
      { 'question': 'Identify the inner and outer planets.', 'steps': ['Inner (rocky): Mercury, Venus, Earth, Mars.', 'Outer (gaseous/big): Jupiter, Saturn, Uranus, Neptune.'] }
    ]
  },
  'ss_geo_2': {
    ...data['ss_geo_2'],
    'examples': [
      { 'question': 'Find the time difference if you move 15 degrees east of Greenwich.', 'steps': ['Earth rotates 1 degree in 4 minutes.', '15 degrees x 4 = 60 minutes.', 'So, the time would be 1 hour ahead of Greenwich.'], 'illustration': '15 deg movement = 1 hour shift' },
      { 'question': 'Where is the Torrid Zone located?', 'steps': ['It is the area between the Tropic of Cancer (23.5° N) and the Tropic of Capricorn (23.5° S).', 'It receives direct sunlight and is the hottest zone.'] }
    ]
  },
  'ss_geo_3': {
    ...data['ss_geo_3'],
    'examples': [
      { 'question': 'Why do we have different seasons?', 'steps': ['Earth revolves around the sun on a tilted axis.', 'When the North Pole tilts toward the sun, it is summer there.', 'When it tilts away, it is winter.'], 'illustration': 'Tilt + Orbit = Changing Seasons' },
      { 'question': 'What is an Equinox?', 'steps': ['Happens on March 21 and Sep 23.', 'The whole world has equal length of day and night because sunlight falls directly on the equator.'] }
    ]
  },
  'ss_geo_4': {
    ...data['ss_geo_4'],
    'examples': [
      { 'question': 'How to calculate distance on a map using a scale?', 'steps': ['Find the scale (e.g., 1 cm = 100 km).', 'Measure distance between two cities on map (e.g., 5 cm).', 'Multiply: 5 x 100 = 500 km.'], 'illustration': 'Ruler measure x Scale = Real distance' },
      { 'question': 'What do the colors Blue, Brown, and Green represent on a map?', 'steps': ['Blue: Water bodies.', 'Brown: Mountains/Highlands.', 'Green: Plains/Vegetation.'] }
    ]
  },
  'ss_geo_5': {
    ...data['ss_geo_5'],
    'examples': [
      { 'question': 'Identify the highest peak and the deepest ocean point.', 'steps': ['Highest: Mt. Everest (Lithosphere) - 8848m.', 'Deepest: Mariana Trench (Hydrosphere) - over 11,000m.'], 'illustration': 'Mt. Everest vs Mariana Trench' },
      { 'question': 'Name the gas that helps traps heat and keeps Earth warm.', 'steps': ['Carbon Dioxide (CO2).', 'In small amounts, it is essential but too much causes Global Warming.'] }
    ]
  },
  'ss_geo_6': {
    ...data['ss_geo_6'],
    'examples': [
      { 'question': 'Difference between a Fold Mountain and a Block Mountain.', 'steps': ['Fold: Formed by wrinkling of Earth\'s surface (Himalayas).', 'Block: Formed when large areas break and lift up (Vindhyas).'], 'illustration': 'Crush = Fold; Crack & Lift = Block' },
      { 'question': 'Why are plateaus called "storehouses of minerals"?', 'steps': ['The Deccan Plateau in India is rich in iron, coal, and manganese deposits.', 'The African plateau is famous for gold and diamonds.'] }
    ]
  },
  'ss_geo_7': {
    ...data['ss_geo_7'],
    'examples': [
      { 'question': 'Identify India\'s neighbors to the North and South.', 'steps': ['North: China, Nepal, Bhutan.', 'South: Sri Lanka and Maldives.'], 'illustration': 'Map of India with surrounding countries' },
      { 'question': 'What are the three main ranges of the Himalayas?', 'steps': ['Himadri (Great Himalayas) - highest.', 'Himachal (Middle Himalayas).', 'Shivalik (Outer Himalayas) - lowest.'] }
    ]
  },
  'ss_geo_8': {
    ...data['ss_geo_8'],
    'examples': [
      { 'question': 'Contrast Evergreen and Deciduous forests.', 'steps': ['Evergreen: Trees shed leaves at different times, so never appear bare.', 'Deciduous: Trees shed leaves all at once in a specific dry season.'], 'illustration': 'Green year-round vs Seasonal shedding' },
      { 'question': 'Why is the lion "Project Tiger" important?', 'steps': ['It was launched to save the declining population of tigers in India.', 'It helps protect the whole forest ecosystem.'] }
    ]
  },
  'ss_civ_1': {
    ...data['ss_civ_1'],
    'examples': [
      { 'question': 'How does diversity help in a sports team?', 'steps': ['Players from different backgrounds bring different strengths and strategies.', 'It teaches teammates to respect and welcome new ideas.'], 'illustration': 'Team of diverse players working together' },
      { 'question': 'How did historical factors lead to diversity in Ladakh?', 'steps': ['Being on a trade route, it welcomed people from Tibet and Central Asia.', 'It became a place where Buddhism and Islam coexist peacefully.'] }
    ]
  },
  'ss_civ_2': {
    ...data['ss_civ_2'],
    'examples': [
      { 'question': 'What is the main difference between a stereotype and a prejudice?', 'steps': ['Prejudice is a negative opinion about someone before knowing them.', 'Stereotype is fitting a whole group into one fixed image (e.g., "girls are weak").'], 'illustration': 'Prejudice = "I don\'t like them" ; Stereotype = "They are all like this"' },
      { 'question': 'Mention a constitutional right that promotes equality.', 'steps': ['Untouchability is an offense and has been abolished by law.', 'Every citizen has equal opportunity for jobs and education.'] }
    ]
  },
  'ss_civ_3': {
    ...data['ss_civ_3'],
    'examples': [
      { 'question': 'Why is the voting age 18 in India?', 'steps': ['By 18, citizens are considered mature enough to understand their choices.', 'It ensures that the government is chosen by adults who are responsible for their actions.'], 'illustration': 'Adult citizen casting a vote' },
      { 'question': 'Identify two main types of government.', 'steps': ['Democracy: People choose their leaders.', 'Monarchy: One family rules through generations.'] }
    ]
  },
  'ss_civ_4': {
    ...data['ss_civ_4'],
    'examples': [
      { 'question': 'How do people participate in a democracy other than voting?', 'steps': ['By joining peaceful protests or rallies.', 'By writing letters to ministers or signing petitions.', 'By taking part in television debates and discussions.'], 'illustration': 'Peaceful march for a cause' },
      { 'question': 'How are river water disputes solved?', 'steps': ['The Central government steps in to settle disputes between two states.', 'Courts might be involved to find a fair sharing system.'] }
    ]
  },
  'ss_civ_5': {
    ...data['ss_civ_5'],
    'examples': [
      { 'question': 'Who can be a member of the Gram Sabha?', 'steps': ['Any adult (18+) who has the right to vote.', 'They must live in the area covered by the Panchayat.'], 'illustration': 'Village meeting under a large tree' },
      { 'question': 'How does the Gram Panchayat get its money?', 'steps': ['Taxes on houses, marketplaces, and fairs.', 'Government grants from the district and state.'] }
    ]
  },
  'ss_civ_6': {
    ...data['ss_civ_6'],
    'examples': [
      { 'question': 'If a farmer wants to see his land map, whom should he go to?', 'steps': ['He should visit the local Patwari.', 'The Patwari maintains records of all land holdings in the area.'], 'illustration': 'Map showing farmer\'s field boundaries' },
      { 'question': 'What can you do if there is a theft in your house in a village?', 'steps': ['Go to the nearest police station.', 'Ask the SHO to register an FIR (First Information Report).'] }
    ]
  },
  'ss_civ_7': {
    ...data['ss_civ_7'],
    'examples': [
      { 'question': 'Why are cities divided into wards?', 'steps': ['Cities are too big for one person to manage.', 'Division into wards makes it easy to attend to local problems like street lights or drainage.'], 'illustration': 'City map divided into color-coded Wards' },
      { 'question': 'Where does the Municipal Corporation get money from?', 'steps': ['Property tax, water tax, and fees for building permissions.', 'State government fund support.'] }
    ]
  },
  'ss_civ_8': {
    ...data['ss_civ_8'],
    'examples': [
      { 'question': 'What are the main causes of debt for small farmers?', 'steps': ['High cost of seeds and fertilizers.', 'Failure of crops due to lack of rain or pests.', 'Taking loans at very high interest rates from moneylenders.'], 'illustration': 'Loan cycle = Seeds -> No Rain -> Debt' },
      { 'question': 'Identify a non-farming occupation in rural areas.', 'steps': ['Pottery, basket weaving, or working in a local sugar mill.'] }
    ]
  },
  'ss_civ_9': {
    ...data['ss_civ_9'],
    'examples': [
      { 'question': 'Difference between a self-employed person and a salaried person.', 'steps': ['Self-employed: Owns the business, no fixed income (e.g., tailor).', 'Salaried: Works for a company, gets fixed monthly pay and benefits.'], 'illustration': 'Shopkeeper vs Office worker' },
      { 'question': 'Mention a challenge faced by street vendors.', 'steps': ['They have no permanent space to work.', 'Police might ask them to move their stalls at any time.'] }
    ]
  }
};

Object.assign(data, ss_ex);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Social Science with examples updated.');
