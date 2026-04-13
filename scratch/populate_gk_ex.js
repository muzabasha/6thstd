const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const gk_ex = {
  'gk_ind_1': {
    ...data['gk_ind_1'],
    'examples': [
      { 'question': 'Identify the colors in the Indian National Flag and their meanings.', 'steps': ['Saffron: Courage and Sacrifice.', 'White: Peace and Truth.', 'Green: Fertility and Growth.', 'The wheel (Chakra): Progress.'], 'illustration': 'Tricolor flag with 24-spoke wheel' },
      { 'question': 'Who wrote our national song "Vande Mataram"?', 'steps': ['It was written by Bankim Chandra Chattopadhyay in his book "Anandamath".'] }
    ]
  },
  'gk_sci_1': {
    ...data['gk_sci_1'],
    'examples': [
      { 'question': 'How did the invention of the steam engine change history?', 'steps': ['It allowed trains and ships to travel much faster without needing wind or horses.', 'It led to the growth of factories and modern industries.'], 'illustration': 'Old steam engine puffing smoke' },
      { 'question': 'Identify the inventor of the Computer.', 'steps': ['Charles Babbage is known as the inventor, though Ada Lovelace wrote the first program for it.'] }
    ]
  }
};

Object.assign(data, gk_ex);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('GK with examples updated.');
