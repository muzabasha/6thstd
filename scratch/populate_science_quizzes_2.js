const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const scienceBatch2 = {
  'sci_mat_1': {
    ...data['sci_mat_1'],
    'qa': [
      { 'q': 'What is grouping of objects called?', 'a': 'Classification.' },
      { 'q': 'Name a material that is hard.', 'a': 'Iron or Stone.' },
      { 'q': 'Name a material that is soft.', 'a': 'Cotton or Sponge.' },
      { 'q': 'What are transparent materials?', 'a': 'Materials through which we can see clearly (e.g., Glass).' },
      { 'q': 'What are opaque materials?', 'a': 'Materials through which we cannot see at all (e.g., Wood, Metal).' },
      { 'q': 'What are translucent materials?', 'a': 'Materials through which we can see but not clearly (e.g., Oiled paper).' },
      { 'q': 'What is lustre?', 'a': 'The shine on the surface of a material (usually metals).' },
      { 'q': 'Is sugar soluble in water?', 'a': 'Yes.' },
      { 'q': 'Is sand soluble in water?', 'a': 'No, it is insoluble.' },
      { 'q': 'Why do some objects float on water?', 'a': 'Because they are less dense than water.' }
    ],
    'scenarios': [
      { 'q': 'You want to make a window. Which material property is most important?', 'a': 'Transparency.' },
      { 'q': 'Why is a tumbler not made with a piece of cloth?', 'a': 'Because cloth cannot hold water; it will leak out.' },
      { 'q': 'You have a wooden box, a glass bowl, and a plastic mug. Which is transparent?', 'a': 'The glass bowl.' },
      { 'q': 'Why do metals lose their shine after some time?', 'a': 'Due to the action of air and moisture on them (oxidation).' },
      { 'q': 'Is salt soluble or insoluble?', 'a': 'Soluble.' },
      { 'q': 'A shopkeeper keeps biscuits in a glass jar. Why?', 'a': 'So that buyers can easily see the items (Transparency).' },
      { 'q': 'Why are cooking pans made of metal but their handles of plastic?', 'a': 'Metal conducts heat well, while plastic is an insulator and stays cool.' },
      { 'q': 'You find a piece of stone that is very smooth. Is it a natural property?', 'a': 'It could be due to the action of water or polishing.' },
      { 'q': 'Which material would you use to make a raincoat?', 'a': 'Waterproof material like plastic or rubber.' },
      { 'q': 'Is oil soluble in water?', 'a': 'No, it forms a separate layer on top.' }
    ]
  },
  'sci_elec_1': {
    ...data['sci_elec_1'],
    'qa': [
      { 'q': 'What is an electric cell?', 'a': 'A source of electricity.' },
      { 'q': 'How many terminals does a cell have?', 'a': 'Two: Positive (+) and Negative (-).' },
      { 'q': 'What is inside a bulb that glows?', 'a': 'Filament.' },
      { 'q': 'What is a closed circuit?', 'a': 'A complete path for electricity to flow.' },
      { 'q': 'What is an open circuit?', 'a': 'A path that is broken, so electricity cannot flow.' },
      { 'q': 'What does a switch do?', 'a': 'It either breaks or completes the circuit.' },
      { 'q': 'What are conductors?', 'a': 'Materials that allow electric current to pass through them.' },
      { 'q': 'What are insulators?', 'a': 'Materials that do not allow electric current to pass through them.' },
      { 'q': 'Name a good conductor.', 'a': 'Copper, Iron, or Aluminum.' },
      { 'q': 'Name a good insulator.', 'a': 'Rubber, Plastic, or Wood.' }
    ],
    'scenarios': [
      { 'q': 'Your torch is not working. What is the first thing you check?', 'a': 'The batteries (cells) and the bulb.' },
      { 'q': 'Why are electric wires covered with plastic?', 'a': 'Plastic is an insulator and protects us from getting an electric shock.' },
      { 'q': 'You connect a bulb to a cell but it doesn\'t glow. Give one reason.', 'a': 'The circuit might be broken or the bulb might be fused.' },
      { 'q': 'Can you use a cotton thread instead of copper wire in a circuit?', 'a': 'No, because cotton is an insulator.' },
      { 'q': 'Why should you never touch a switch with wet hands?', 'a': 'Water is a conductor of electricity, and you could get a shock.' },
      { 'q': 'What is the metal part of a bulb called?', 'a': 'The base (one of the terminals).' },
      { 'q': 'If a bulb\'s filament is broken, what is it called?', 'a': 'A fused bulb.' },
      { 'q': 'Which terminal of a cell is usually a metal cap?', 'a': 'Positive terminal.' },
      { 'q': 'Which terminal of a cell is a metal disc?', 'a': 'Negative terminal.' },
      { 'q': 'Is our body a conductor or insulator?', 'a': 'A conductor.' }
    ]
  }
};

Object.assign(data, scienceBatch2);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Science Batch 2 Quiz updated.');
