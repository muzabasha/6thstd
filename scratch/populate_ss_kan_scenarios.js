const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ss_kan_scenarios = {
  'ss_his_1': { ...data['ss_his_1'], 'scenarios': [
    {'q': 'You find a very old palm leaf with writing in your attic. What historical source is this?', 'a': 'A manuscript.'},
    {'q': 'If you are archeologist digging in a field and find a gold coin, what does it tell you about the people who lived there?', 'a': 'They were likely wealthy and used a system of trade or currency.'},
    {'q': 'A river changes its course over 1000 years. How does this affect people living on its banks?', 'a': 'They might have to move their village (migration) to stay near water.'},
    {'q': 'You see a stone pillar with carved messages. Is this a manuscript or an inscription?', 'a': 'An inscription.'},
    {'q': 'Why would a king choose Prakrit for his inscriptions instead of Sanskrit?', 'a': 'So that common people who didn\'t know Sanskrit could understand his message.'},
    {'q': 'While traveling in Egypt, you see strange symbols on a wall. What is the process of reading these called?', 'a': 'Decipherment.'},
    {'q': 'You find burnt grain in an ancient kitchen. What does this prove?', 'a': 'That the people used fire and knew how to cook or process grain.'},
    {'q': 'A map shows "Sindhu" river. Which modern country is this mostly in?', 'a': 'Pakistan (The Indus river).'},
    {'q': 'You are reading a book written in 2026. Will this be a primary source for people in the year 3000?', 'a': 'Yes, it will be a source from the past for them.'},
    {'q': 'If you want to know what happened 100 years ago in your family, whom would you ask?', 'a': 'Ancestors or elders (Oral history).'}
  ]},
  'kan_lit_1': { ...data['kan_lit_1'], 'scenarios': [
    {'q': 'ನೀವು ಹಲ್ಮಿಡಿ ಗ್ರಾಮಕ್ಕೆ ಭೇಟಿ ನೀಡಿದ್ದೀರಿ. ಅಲ್ಲಿ ನೀವು ನೋಡುವ ಅತಿ ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ವಸ್ತು ಯಾವುದು?', 'a': 'ಹಲ್ಮಿಡಿ ಶಾಸನ (ಕನ್ನಡದ ಮೊದಲ ಶಾಸನ).'},
    {'q': 'ಒಬ್ಬ ಬಾಲಕ ಕುವೆಂಪು ಅವರ ಮನೆಗೆ ಹೋಗಿದ್ದಾನೆ. ಅವನು ನೋಡಬಹುದಾದ ಪ್ರಮುಖ ವಸ್ತು ಯಾವುದು?', 'a': 'ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಫಲಕ.'},
    {'q': 'ಒಬ್ಬ ಪ್ರವಾಸಿ ಕರ್ನಾಟಕಕ್ಕೆ ಬಂದಾಗ ಮೊದಲು ಯಾವ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಲು ಪ್ರಯತ್ನಿಸಬೇಕು?', 'a': 'ಕನ್ನಡದಲ್ಲಿ.'},
    {'q': 'ಶಾಲೆಯಲ್ಲಿ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ಆಚರಿಸುವಾಗ ಯಾವ ಹಾಡು ಕಡ್ಡಾಯ?', 'a': 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ.'},
    {'q': 'ಒಬ್ಬ ಕವಿ ಬೆಟ್ಟದ ಮೇಲೆ ಕುಳಿತು ಪ್ರಕೃತಿಯ ಬಗ್ಗೆ ಬರೆಯುತ್ತಾನೆ. ಇದು ಯಾವ ತರಹದ ಸಾಹಿತ್ಯ?', 'a': 'ಭಾವಗೀತೆ ಅಥವಾ ನಿಸರ್ಗ ಕವನ.'},
    {'q': 'ನೀವು ಹಳೆಯ ಓಲೆಗರಿಗಳನ್ನು ನೋಡಿದಾಗ ಅದನ್ನು ಏನನ್ನುತ್ತೀರಿ?', 'a': 'ಹಸ್ತಪ್ರತಿ ಅಥವಾ ತಾಳೆಗರಿ.'},
    {'q': 'ಒಬ್ಬ ವಿದೇಶಿ ಗೆಳೆಯನಿಗೆ ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿಯ ಬಗ್ಗೆ ತಿಳಿಸಲು ನೀವು ಯಾವ ಕಲೆಯ ಬಗ್ಗೆ ಹೇಳುತ್ತೀರಿ?', 'a': 'ಯಕ್ಷಗಾನ ಅಥವಾ ವೀರಗಾಸೆ.'},
    {'q': 'ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯಲ್ಲಿ ೪೯ ಅಕ್ಷರಗಳಿವೆ ಎಂದು ನಿಮ್ಮ ಗೆಳೆಯನಿಗೆ ಹೇಗೆ ವಿವರಿಸುತ್ತೀರಿ?', 'a': 'ಸ್ವರಗಳು, ವ್ಯಂಜನಗಳು ಮತ್ತು ಯೋಗವಾಹಗಳ ಮೊತ್ತವೇ ೪೯.'},
    {'q': 'ವಚನಗಳನ್ನು ಓದುವಾಗ ನೀವು ಗಮನಿಸುವ ಮುಖ್ಯ ಅಂಶ ಯಾವುದು?', 'a': 'ಸರಳ ಭಾಷೆ ಮತ್ತು ಸಮಾಜದ ಸುಧಾರಣೆಯ ಸಂದೇಶ.'},
    {'q': 'ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ವಿಜೇತರ ಸಾಲಿನಲ್ಲಿ ನೀವು ಯಾರ ಹೆಸರನ್ನು ಮೊದಲು ನೆನಪಿಸಿಕೊಳ್ಳುತ್ತೀರಿ?', 'a': 'ಕುವೆಂಪು ಅಥವಾ ದ.ರಾ. ಬೇಂದ್ರೆ.'}
  ]}
};

Object.assign(data, ss_kan_scenarios);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('SS and Kannada Scenarios updated.');
