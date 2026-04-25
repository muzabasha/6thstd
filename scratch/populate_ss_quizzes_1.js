const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const ssUpdates = {
  'ss_his_1': {
    ...data['ss_his_1'],
    'qa': [
      { 'q': 'What does History mean?', 'a': 'The study of the past.' },
      { 'q': 'What are manuscripts?', 'a': 'Handwritten records of the past, often on palm leaves or birch bark.' },
      { 'q': 'What are inscriptions?', 'a': 'Writings engraved on hard surfaces like stone or metal.' },
      { 'q': 'What does BCE stand for?', 'a': 'Before Common Era.' },
      { 'q': 'What does CE stand for?', 'a': 'Common Era.' },
      { 'q': 'Who are archaeologists?', 'a': 'People who study the remains of buildings, objects, and bones to learn about the past.' },
      { 'q': 'Where did people first live in India?', 'a': 'Along the banks of the Narmada River.' },
      { 'q': 'What is the "Source" in history?', 'a': 'Clues like coins, pots, and books that tell us about the past.' },
      { 'q': 'What were the earliest crops grown by men and women?', 'a': 'Wheat and Barley.' },
      { 'q': 'Which river is the Indus tributary to?', 'a': 'The Indus itself has tributaries like Jhelum, Chenab, Ravi, Beas, and Sutlej.' }
    ],
    'scenarios': [
      { 'q': 'You find an old coin in your garden. How can it help you learn history?', 'a': 'It can tell you about the ruler, the time period, and the metal used then.' },
      { 'q': 'Why did early people live near rivers?', 'a': 'For easy access to water, food (fish), and fertile land for farming.' },
      { 'q': 'If a book was written on palm leaves, why is it hard to find today?', 'a': 'Because insects might have eaten it or it might have decayed over time.' },
      { 'q': 'You see a date "2000 BCE". How many years ago was that from today (2024)?', 'a': '2000 + 2024 = 4024 years ago.' },
      { 'q': 'Why do historians study bones of animals?', 'a': 'To find out what people in the past used to eat.' },
      { 'q': 'If you found a stone pillar with writing, is it a manuscript or an inscription?', 'a': 'An inscription.' },
      { 'q': 'Why is history important for us today?', 'a': 'It helps us understand our roots and how our society evolved.' },
      { 'q': 'Where are the Sulaiman and Kirthar hills located?', 'a': 'In the Northwest of India (present-day Pakistan).' },
      { 'q': 'What was the language of common people in ancient India?', 'a': 'Prakrit.' },
      { 'q': 'Who was the first to use the name "India" for our land?', 'a': 'The Iranians and the Greeks.' }
    ]
  }
};

Object.assign(data, ssUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Social Science History 1 Quiz updated.');
