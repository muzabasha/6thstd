const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const gkUpdates = {
  'gk_ind_1': {
    ...data['gk_ind_1'],
    'qa': [
      { 'q': 'What is the capital of India?', 'a': 'New Delhi.' },
      { 'q': 'What is the national bird of India?', 'a': 'Peacock.' },
      { 'q': 'What is the national animal of India?', 'a': 'Tiger.' },
      { 'q': 'What is the national flower of India?', 'a': 'Lotus.' },
      { 'q': 'What is the national fruit of India?', 'a': 'Mango.' },
      { 'q': 'How many states are there in India?', 'a': '28 states (and 8 Union Territories).' },
      { 'q': 'What is the national tree of India?', 'a': 'Banyan Tree.' },
      { 'q': 'Who is known as the "Father of the Nation"?', 'a': 'Mahatma Gandhi.' },
      { 'q': 'Which is the largest state in India by area?', 'a': 'Rajasthan.' },
      { 'q': 'Which is the smallest state in India by area?', 'a': 'Goa.' }
    ],
    'scenarios': [
      { 'q': 'You are standing near the Taj Mahal. In which city are you?', 'a': 'Agra.' },
      { 'q': 'You see a flag with three colors and a wheel in the center. What is the wheel called?', 'a': 'Ashoka Chakra.' },
      { 'q': 'If you visit "Gateway of India", which city are you in?', 'a': 'Mumbai.' },
      { 'q': 'You are in the capital city of Karnataka. Where are you?', 'a': 'Bengaluru.' },
      { 'q': 'How many colors are there in the Indian national flag?', 'a': 'Three (Saffron, White, Green).' },
      { 'q': 'Who wrote the national anthem "Jana Gana Mana"?', 'a': 'Rabindranath Tagore.' },
      { 'q': 'In which direction is the Himalayas located in India?', 'a': 'North.' },
      { 'q': 'Which is the longest river in India?', 'a': 'Ganga.' },
      { 'q': 'On which day do we celebrate Independence Day?', 'a': '15th August.' },
      { 'q': 'On which day do we celebrate Republic Day?', 'a': '26th January.' }
    ]
  }
};

Object.assign(data, gkUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('GK India Facts Quiz updated.');
