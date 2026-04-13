const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const kan_textbook = {
  'kan_lit_1': {
    ...data['kan_lit_1'],
    'textbookContent': 'ಸಿರಿ ಕನ್ನಡ ಪಠ್ಯಪುಸ್ತಕದ ಮೊದಲ ಪಾಠ "ಕನ್ನಡ ನಾಡು ನುಡಿ" ಕರ್ನಾಟಕದ ಇತಿಹಾಸ ಮತ್ತು ಸಾಹಿತ್ಯ ಸೌರಭವನ್ನು ಪರಿಚಯಿಸುತ್ತದೆ. ಇದು ಕನ್ನಡ ಕವಿಗಳ ಕೊಡುಗೆ ಮತ್ತು ಭಾಷೆಯ ಪ್ರಾಚೀನತೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ.',
    'qa': [
      { 'q': 'ಕನ್ನಡ ಅತಿ ಪ್ರಾಚೀನ ಭಾಷೆ ಎಂದು ಹೇಗೆ ಹೇಳುವಿರಿ?', 'a': 'ಕನ್ನಡವು ೨೦೦೦ ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ಉಳಿದುಬಂದಿರುವ ಶಾಸನಗಳು ಮತ್ತು ಸಾಹಿತ್ಯವನ್ನು ಹೊಂದಿದೆ.' },
      { 'q': 'ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಎಂದರೇನು?', 'a': 'ಇದು ಭಾರತೀಯ ಸಾಹಿತ್ಯ ಕ್ಷೇತ್ರದಲ್ಲಿ ನೀಡಲಾಗುವ ಅತ್ಯುನ್ನತ ರಾಷ್ಟ್ರೀಯ ಪ್ರಶಸ್ತಿಯಾಗಿದೆ.' }
    ]
  }
};

Object.assign(data, kan_textbook);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Kannada Textbook and Q&A updated.');
