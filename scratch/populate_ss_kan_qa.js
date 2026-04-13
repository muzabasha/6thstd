const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ss_kan_qa = {
  'ss_his_1': { ...data['ss_his_1'], 'qa': [
    {'q': 'What are manuscripts?', 'a': 'Hand-written books on palm leaves or birch bark.'},
    {'q': 'What are inscriptions?', 'a': 'Writings carved on hard surfaces like stone or metal.'},
    {'q': 'Where did people first live in India?', 'a': 'Banks of the river Narmada.'},
    {'q': 'What does BCE stand for?', 'a': 'Before Common Era.'},
    {'q': 'What is the river Indus called in Sanskrit?', 'a': 'Sindhu.'},
    {'q': 'What are tributaries?', 'a': 'Smaller rivers that flow into a larger river.'},
    {'q': 'Who found the first traces of wheat and barley?', 'a': 'People of the Sulaiman and Kirthar hills.'},
    {'q': 'What objects do archeologists study?', 'a': 'Tools, weapons, pots, pans, and coins.'},
    {'q': 'Origin of the name "India"?', 'a': 'Comes from the Indus (Sindhu).'},
    {'q': 'What do historians call the past?', 'a': 'A collection of stories based on sources.'}
  ]},
  'kan_lit_1': { ...data['kan_lit_1'], 'qa': [
    {'q': 'ಕನ್ನಡ ಅತಿ ಪ್ರಾಚೀನ ಭಾಷೆ ಎಂದು ಹೇಗೆ ಹೇಳುತ್ತಾರೆ?', 'a': 'ಕ್ರಿ.ಶ. ೪೫೦ರ ಹಲ್ಮಿಡಿ ಶಾಸನವು ಕನ್ನಡದ ಪ್ರಾಚೀನತೆಗೆ ಸಾಕ್ಷಿಯಾಗಿದೆ.'},
    {'q': 'ಕನ್ನಡದ ಮೊದಲ ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ವಿಜೇತ ಯಾರು?', 'a': 'ಕುವೆಂಪು (ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ ಕೃತಿಗೆ).'},
    {'q': 'ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಘೋಷವಾಕ್ಯ ಯಾವುದು?', 'a': '"ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ".'},
    {'q': 'ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು ಎಲ್ಲಿಯಲ್ಲಿದೆ?', 'a': 'ಬೆಂಗಳೂರಿನಲ್ಲಿದೆ.'},
    {'q': 'ಆದಿಕವಿ ಎಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?', 'a': 'ಪಂಪ ಕವಿಯನ್ನು.'},
    {'q': 'ಕನ್ನಡದ ಮೊದಲ ನಾಟಕ ಯಾವುದು?', 'a': 'ಮಿತ್ರವಿಂದಾ ಗೋವಿಂದ.'},
    {'q': 'ವಚನ ಸಾಹಿತ್ಯದ ಪಿತಾಮಹ ಯಾರು?', 'a': 'ಬಸವಣ್ಣನವರು.'},
    {'q': 'ಕರ್ನಾಟಕ ದಿನಾಚರಣೆ ಎಂದು?', 'a': 'ನವೆಂಬರ್ ೧.'},
    {'q': 'ಕನ್ನಡದ ಮೊದಲ ಶಾಸನ ಯಾವುದು?', 'a': 'ಹಲ್ಮಿಡಿ ಶಾಸನ.'},
    {'q': 'ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಪಡೆದ ಮೊದಲ ಮಹಿಳೆ ಯಾರು?', 'a': 'ಕನ್ನಡದಲ್ಲಿ ಇನ್ನೂ ಮಹಿಳೆಯರು ಜ್ಞಾನಪೀಠ ಪಡೆದಿಲ್ಲ (Ashapurna Devi was first in India).'}
  ]}
};

Object.assign(data, ss_kan_qa);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('SS and Kannada Q&A (10 per topic) updated.');
