const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ict_eng_scenarios = {
  'eng_gr_1': {
    ...data['eng_gr_1'],
    'scenarios': [
      { 'q': 'You are introducing your friends, Rahul and Priya, to your teacher. What nouns are you using?', 'a': 'Rahul and Priya are Proper Nouns; "Friends" and "Teacher" are Common Nouns.' },
      { 'q': 'Instead of repeatedly saying "The dog is big. The dog is brown. The dog is playing.", how can you use a pronoun?', 'a': 'Use "It": "The dog is big. It is brown and it is playing."' },
      { 'q': 'You see a group of birds flying together. What collective noun can you use?', 'a': 'A "flock" of birds.' },
      { 'q': 'Your sister\'s name is Ananya. If you are talking to her, which pronoun do you use?', 'a': 'You use "You". If talking *about* her, you use "She".' },
      { 'q': 'You found a bunch of keys on the floor. Identify the noun and its type.', 'a': '"Keys" is a common noun; "Bunch" is a collective noun.' },
      { 'q': 'You are writing about yourself. Which pronoun is always used?', 'a': 'The pronoun "I".' },
      { 'q': 'Someone left "their" bag in the classroom. What kind of pronoun is "their"?', 'a': 'A possessive pronoun, showing who the bag belongs to.' },
      { 'q': 'You want to name a specific ocean. What kind of noun is "Indian Ocean"?', 'a': 'A Proper Noun.' },
      { 'q': 'A cat is chasing "its" tail. Why did we use "its" instead of "his" or "her"?', 'a': 'We use "its" for animals when the gender is not specific or important.' },
      { 'q': 'You feel a "happiness" when you see your gift. What type of noun is happiness?', 'a': 'An Abstract Noun, because you can feel it but not touch it.' }
    ]
  },
  'comp_1': {
    ...data['comp_1'],
    'scenarios': [
      { 'q': 'You type "2+2" into your calculator. What part of the IPO cycle is this?', 'a': 'This is Input.' },
      { 'q': 'You are waiting for a video to load on your tablet. What is the computer doing right now?', 'a': 'It is Processing data from the internet.' },
      { 'q': 'Your printed homework comes out of the machine. What part of the cycle is this?', 'a': 'This is Output.' },
      { 'q': 'A computer never gets "bored" of doing the same math 1000 times. What characteristic is this?', 'a': 'Diligence (Computer doesn\'t get tired or bored).' },
      { 'q': 'You are playing a heavy 3D game. Why does the computer get warm?', 'a': 'The CPU is working very hard (Processing) and generating heat.' },
      { 'q': 'If you turn off a computer while you are typing but before you save, where was that text stored?', 'a': 'It was in the RAM (Temporary memory).' },
      { 'q': 'You want to keep your photos forever. Where should you store them?', 'a': 'On a Hard Disk or SSD (Permanent storage).' },
      { 'q': 'Why is a computer considered "Garbage In, Garbage Out"?', 'a': 'Because if you give wrong input, the computer will give wrong output.' },
      { 'q': 'You are using a mouse to click a button. Is the mouse hardware or software?', 'a': 'Hardware.' },
      { 'q': 'The game you are playing is "Subway Surfers". Is this hardware or software?', 'a': 'Software.' }
    ]
  },
  'comp_net_3': {
    ...data['comp_net_3'],
    'scenarios': [
      { 'q': 'You receive an email saying you won 1 crore rupees and should click a link. What do you do?', 'a': 'Ignore it and tell an adult; it is likely a scam or "Phishing" attempt.' },
      { 'q': 'A stranger on a gaming app asks for your home address to send you a gift. What do you do?', 'a': 'Never share personal details like address or school name with strangers online.' },
      { 'q': 'Your friend wants to use "password123" for their account. Is this safe?', 'a': 'No, it is very weak. Suggest a mix of letters, numbers, and symbols.' },
      { 'q': 'You see someone posting mean comments about a classmate on a group chat. What is this called?', 'a': 'Cyberbullying.' },
      { 'q': 'You want to download a "free" movie from an unknown website. What is the risk?', 'a': 'It could contain a Virus or Malware that could damage your computer.' },
      { 'q': 'You are using a public computer at a library. What should you do before leaving?', 'a': 'Log out of all accounts and clear the browsing history.' },
      { 'q': 'Should you post your vacation photos on social media while you are still away?', 'a': 'It is safer to wait until you return so people don\'t know your house is empty.' },
      { 'q': 'An app asks for permission to access your camera and location. What should you check?', 'a': 'Check if the app actually needs them (e.g., a calculator app shouldn\'t need your location).' },
      { 'q': 'You accidentally clicked on a pop-up that redirected you to a strange site. What is the first thing to do?', 'a': 'Close the browser tab immediately and run a virus scan if possible.' },
      { 'q': 'Why should you use "Private" or "Incognito" mode sometimes?', 'a': 'So the computer doesn\'t save your search history or cookies on that session.' }
    ]
  }
};

Object.assign(data, ict_eng_scenarios);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('ICT and English Scenarios updated.');
