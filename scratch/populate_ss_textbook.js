const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ss_textbook = {
  'ss_his_1': {
    ...data['ss_his_1'],
    'textbookContent': 'Chapter 1: "What, Where, How and When?" introduces historical sources. It explains that people lived along river banks centuries ago. It discusses the use of manuscripts (palm leaf/birch bark) and inscriptions (hard surfaces) as primary evidence for reconstructing the past.',
    'qa': [
      { 'q': 'Who are archeologists?', 'a': 'Archeologists are scientists who study the remains of buildings, objects, and bones to understand the past.' },
      { 'q': 'What was the language used in ancient manuscripts?', 'a': 'Most manuscripts were written in Sanskrit, Prakrit, or Tamil.' }
    ]
  },
  'ss_geo_1': {
    ...data['ss_geo_1'],
    'textbookContent': 'Chapter 1 in Geography covers "The Earth in the Solar System". It explains celestial bodies like the sun, moon, and stars. It distinguishes between Planets (no heat/light of their own) and Stars (Luminous). It also defines the "Full Moon" (Purnima) and "New Moon" (Amavasya).',
    'qa': [
      { 'q': 'Why is Venus called Earth\'s twin?', 'a': 'Because its size and shape are very similar to those of the Earth.' },
      { 'q': 'What is an orbit?', 'a': 'An orbit is the fixed, elliptical path along which planets revolve around the sun.' }
    ]
  }
};

Object.assign(data, ss_textbook);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('SS Textbook and Q&A updated.');
