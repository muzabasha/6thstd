const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const math_textbook = {
  'math_num_1': {
    ...data['math_num_1'],
    'textbookContent': 'Textbook Chapter 1 introduces large numbers and their comparison. It covers the Indian System of Numeration (using lakhs and crores) and the International System (using millions and billions). It also teaches the use of commas to separate periods for easier reading.',
    'qa': [
      { 'q': 'How many lakhs make one million?', 'a': '10 lakhs make one million.' },
      { 'q': 'What is the place value of 5 in 75,307?', 'a': 'The place value is 5,000 (Five thousand).' },
      { 'q': 'Write the greatest 4-digit number using 5, 0, 8, 2 without repetition.', 'a': 'The greatest number is 8520.' }
    ]
  },
  'math_wn_1': {
    ...data['math_wn_1'],
    'textbookContent': 'Chapter 2 deals with Whole Numbers (0, 1, 2, 3...). It defines the successor of a number (n+1) and predecessor (n-1). It highlights that zero is the smallest whole number and there is no largest whole number.',
    'qa': [
      { 'q': 'Which is the smallest natural number?', 'a': '1 is the smallest natural number.' },
      { 'q': 'Does the whole number 0 have a predecessor?', 'a': 'In the set of whole numbers, 0 does not have a predecessor.' }
    ]
  }
};

Object.assign(data, math_textbook);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Math Textbook and Q&A (1-2) updated.');
