const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const engPoemUpdates = {
  'eng_po_1': {
    ...data['eng_po_1'],
    'qa': [
      { 'q': 'What is a house made of?', 'a': 'Bricks, stone, and wood.' },
      { 'q': 'What is a home made of?', 'a': 'Love, family, and caring.' },
      { 'q': 'What are eaves?', 'a': 'The edges of a roof that hang over the walls.' },
      { 'q': 'Who are the members of a home mentioned in the poem?', 'a': 'Brothers, sisters, fathers, and mothers.' },
      { 'q': 'What does a home have that a house doesn\'t?', 'a': 'Unselfish acts and kindly sharing.' },
      { 'q': 'What is stucco?', 'a': 'A type of plaster used for coating walls.' },
      { 'q': 'Is a house a living thing?', 'a': 'No, it is a physical structure.' },
      { 'q': 'Why is a home special?', 'a': 'Because of the people who live in it and their love for each other.' },
      { 'q': 'What is the main theme of the poem?', 'a': 'The difference between a physical building and a loving family space.' },
      { 'q': 'Who is the poet?', 'a': 'Lorraine M. Halli.' }
    ],
    'scenarios': [
      { 'q': 'You are building a house. What materials do you need?', 'a': 'Bricks, cement, wood, glass.' },
      { 'q': 'You are making a home. What do you need?', 'a': 'Love, care, and family members.' },
      { 'q': 'Is a hotel a home? Why or why not?', 'a': 'No, usually it is a building (house) because it lacks your own family and personal love.' },
      { 'q': 'How can you help turn your house into a home?', 'a': 'By sharing, helping your parents, and being kind to siblings.' },
      { 'q': 'What part of a house protects you from rain?', 'a': 'The roof.' },
      { 'q': 'What part of a home protects you from sadness?', 'a': 'The love and support of family.' },
      { 'q': 'Describe your "home" in one word.', 'a': 'Answers vary (e.g., Safe, Happy, Warm).' },
      { 'q': 'Why does the poet use the word "unselfish"?', 'a': 'To show that putting others before yourself is what makes a home.' },
      { 'q': 'Are windows part of a house or a home?', 'a': 'House (physical part).' },
      { 'q': 'Can you have a home without a house?', 'a': 'Yes, a family can be a home even if they move between buildings.' }
    ]
  },
  'eng_po_2': {
    ...data['eng_po_2'],
    'qa': [
      { 'q': 'How does a new kite look in the sky?', 'a': 'Bright and beautiful.' },
      { 'q': 'What does the kite do when it "dips and dives"?', 'a': 'It moves up and down in the wind.' },
      { 'q': 'What is the kite compared to?', 'a': 'A ship with a sail.' },
      { 'q': 'When does the kite "rest"?', 'a': 'When the wind falls or stops.' },
      { 'q': 'What makes the kite fly high again?', 'a': 'A new breeze (wind).' },
      { 'q': 'What happens when a kite gets caught in a tree?', 'a': 'It becomes a tattered, ragged thing.' },
      { 'q': 'What is a "raggeder" thing?', 'a': 'Something that is torn and messy.' },
      { 'q': 'What pulls the kite string?', 'a': 'The wind and the person flying it.' },
      { 'q': 'What color is the sky in the poem?', 'a': 'Blue.' },
      { 'q': 'Who is the poet?', 'a': 'Harry Behn.' }
    ],
    'scenarios': [
      { 'q': 'You are flying a kite and the wind stops. What happens to the kite?', 'a': 'It starts to fall down.' },
      { 'q': 'Why does a kite look like a ship on waves?', 'a': 'Because it sways and moves up and down in the air like a ship on water.' },
      { 'q': 'Your kite gets stuck in a tall tree. How do you feel?', 'a': 'Sad, because it might get torn (raggeder).' },
      { 'q': 'What is the best time to fly a kite?', 'a': 'When there is a steady breeze and a clear blue sky.' },
      { 'q': 'Why do you need a string for a kite?', 'a': 'To control it and keep it from flying away.' },
      { 'q': 'If the sky is grey and cloudy, will the kite look as bright?', 'a': 'No, it looks brightest against a blue sky.' },
      { 'q': 'What "flaps" on a string in the tree?', 'a': 'The torn kite.' },
      { 'q': 'How do you make a kite go higher?', 'a': 'By letting out more string and running with the wind.' },
      { 'q': 'Is a kite a living bird?', 'a': 'No, but it moves like one.' },
      { 'q': 'What part of the kite catches the wind?', 'a': 'The sail/body of the kite.' }
    ]
  }
};

Object.assign(data, engPoemUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('English Poems Quiz updated.');
