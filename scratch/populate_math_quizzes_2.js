const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mathBatch2 = {
  'math_wn_1': {
    ...data['math_wn_1'],
    'qa': [
      { 'q': 'What is the smallest whole number?', 'a': '0.' },
      { 'q': 'What is the smallest natural number?', 'a': '1.' },
      { 'q': 'Successor of 100?', 'a': '101.' },
      { 'q': 'Predecessor of 100?', 'a': '99.' },
      { 'q': 'Does 0 have a predecessor in whole numbers?', 'a': 'No.' },
      { 'q': 'Are all natural numbers also whole numbers?', 'a': 'Yes.' },
      { 'q': 'Are all whole numbers also natural numbers?', 'a': 'No, 0 is a whole number but not natural.' },
      { 'q': 'What is the sum of first two whole numbers?', 'a': '0 + 1 = 1.' },
      { 'q': 'How many whole numbers are between 32 and 53?', 'a': '20 (53 - 32 - 1).' },
      { 'q': 'What is the predecessor of 1 in natural numbers?', 'a': 'Does not exist.' }
    ],
    'scenarios': [
      { 'q': 'You have 0 apples. Is 0 a whole number?', 'a': 'Yes.' },
      { 'q': 'If you add 1 to any whole number, what do you get?', 'a': 'Its successor.' },
      { 'q': 'If you subtract 1 from a whole number (other than 0), what do you get?', 'a': 'Its predecessor.' },
      { 'q': 'A collection of counting numbers starting from 1 is called?', 'a': 'Natural numbers.' },
      { 'q': 'A collection of numbers starting from 0 is called?', 'a': 'Whole numbers.' },
      { 'q': 'Why is 0 important in whole numbers?', 'a': 'It represents the absence of quantity and is the starting point.' },
      { 'q': 'Can you find the largest whole number?', 'a': 'No, whole numbers are infinite.' },
      { 'q': 'Is 1,23,456 a whole number?', 'a': 'Yes.' },
      { 'q': 'What is the successor of the greatest 3-digit number?', 'a': '1000 (Smallest 4-digit number).' },
      { 'q': 'What is the predecessor of the smallest 5-digit number?', 'a': '9999 (Greatest 4-digit number).' }
    ]
  },
  'math_pn_1': {
    ...data['math_pn_1'],
    'qa': [
      { 'q': 'What is a factor?', 'a': 'A number that divides another number exactly without leaving a remainder.' },
      { 'q': 'What is a multiple?', 'a': 'A number obtained by multiplying a given number by an integer.' },
      { 'q': 'Is 1 a factor of every number?', 'a': 'Yes.' },
      { 'q': 'Is every number a factor of itself?', 'a': 'Yes.' },
      { 'q': 'How many factors does a prime number have?', 'a': 'Exactly two (1 and itself).' },
      { 'q': 'Name the first five multiples of 4.', 'a': '4, 8, 12, 16, 20.' },
      { 'q': 'What are the factors of 6?', 'a': '1, 2, 3, 6.' },
      { 'q': 'What is a perfect number?', 'a': 'A number whose factors (excluding the number itself) sum up to the number.' },
      { 'q': 'Name a perfect number.', 'a': '6 (1+2+3=6).' },
      { 'q': 'Can a factor be greater than the number?', 'a': 'No, it is always less than or equal to the number.' }
    ],
    'scenarios': [
      { 'q': 'You have 12 chocolates. Can you share them equally among 5 friends?', 'a': 'No, because 5 is not a factor of 12.' },
      { 'q': 'A bell rings every 4 minutes. At what times will it ring (first 5 times)?', 'a': '4, 8, 12, 16, 20 minutes (multiples of 4).' },
      { 'q': 'If a number is divisible by 10, is it also divisible by 2 and 5?', 'a': 'Yes, because 2 and 5 are factors of 10.' },
      { 'q': 'You want to arrange 24 chairs in equal rows. What are the possible row sizes?', 'a': 'Any factor of 24: 1, 2, 3, 4, 6, 8, 12, 24.' },
      { 'q': 'Is 15 a multiple of 3?', 'a': 'Yes, because 3 x 5 = 15.' },
      { 'q': 'Is 7 a factor of 45?', 'a': 'No, because 45/7 leaves a remainder.' },
      { 'q': 'Find a number that is a multiple of both 2 and 3.', 'a': 'Any multiple of 6 (e.g., 6, 12, 18).' },
      { 'q': 'Why are multiples infinite?', 'a': 'Because we can multiply a number by any natural number, and natural numbers are infinite.' },
      { 'q': 'What is the only even prime number?', 'a': '2.' },
      { 'q': 'Which number is neither prime nor composite?', 'a': '1.' }
    ]
  }
};

Object.assign(data, mathBatch2);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Math Batch 2 Quiz updated.');
