const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const math_segmented = {
  'math_num_1': {
    ...data['math_num_1'],
    'examples': [
      {
        'question': 'Write 73,75,307 in words using the Indian system.',
        'steps': [
          'Identify the periods: 73 (Lakhs), 75 (Thousands), 307 (Ones).',
          'Read the number in each period: Seventy-three Lakh Seventy-five Thousand Three Hundred Seven.'
        ],
        'illustration': '[73] , [75] , [307] -> Seventy-three lakh, seventy-five thousand, three hundred and seven.'
      },
      {
        'question': 'Write 58,423,202 in words using the International system.',
        'steps': [
          'Identify the periods: 58 (Millions), 423 (Thousands), 202 (Ones).',
          'Read: Fifty-eight million, four hundred twenty-three thousand, two hundred and two.'
        ],
        'illustration': '[58] Million [423] Thousand [202] -> Fifty-eight million...'
      }
    ]
  },
  'math_num_2': {
    ...data['math_num_2'],
    'examples': [
      {
        'question': 'Round 789 to the nearest hundred.',
        'steps': [
          'Identify the digit in tens place (8).',
          'Since 8 >= 5, add 1 to the hundreds digit (7+1=8).',
          'Change remaining digits to zero. Result: 800.'
        ],
        'illustration': '7|8|9 -> 8 is more than 5 -> Round up -> 800'
      },
      {
        'question': 'Estimate the sum of 5290 and 17986 to the nearest thousand.',
        'steps': [
          'Round 5290 to 5000.',
          'Round 17986 to 18000.',
          'Add: 5000 + 18000 = 23000.'
        ]
      }
    ]
  },
  'math_num_3': {
    ...data['math_num_3'],
    'examples': [
      {
        'question': 'Convert 45 to Roman Numerals.',
        'steps': [
          'Break it down: 40 + 5.',
          '40 is XL (10 before 50).',
          '5 is V.',
          'Result: XLV.'
        ],
        'illustration': '40(XL) + 5(V) = XLV'
      },
      {
        'question': 'Convert XCIX to a Hindu-Arabic number.',
        'steps': [
          'XC = 100 - 10 = 90.',
          'IX = 10 - 1 = 9.',
          'Add them: 90 + 9 = 99.'
        ]
      }
    ]
  },
  'math_wn_1': {
    ...data['math_wn_1'],
    'examples': [
      {
        'question': 'Are all whole numbers natural numbers? Why?',
        'steps': [
          'Natural numbers: 1, 2, 3, ...',
          'Whole numbers: 0, 1, 2, 3, ...',
          'Check 0: It is a whole number but not a natural number. So the answer is No.'
        ]
      },
      {
        'question': 'Find the successor and predecessor of 1 in the set of whole numbers.',
        'steps': [
          'Successor: 1 + 1 = 2.',
          'Predecessor: 1 - 1 = 0.'
        ]
      }
    ]
  },
  'math_wn_2': {
    ...data['math_wn_2'],
    'examples': [
      {
        'question': 'Show 2 + 5 on a number line.',
        'steps': [
          'Start at 2.',
          'Move 5 steps to the right.',
          'You arrive at 7.'
        ],
        'illustration': '0---1---2---3---4---5---6---7; (Start at 2) +5 -> land on 7'
      },
      {
        'question': 'Show 6 - 4 on a number line.',
        'steps': [
          'Start at 6.',
          'Move 4 steps to the left.',
          'You arrive at 2.'
        ]
      }
    ]
  },
  'math_wn_3': {
    ...data['math_wn_3'],
    'examples': [
      {
        'question': 'Solve using distributive property: 12 x (35 + 8)',
        'steps': [
          'Apply rule: (12 x 35) + (12 x 8).',
          'Multiply: 420 + 96.',
          'Add: 516.'
        ]
      },
      {
        'question': 'Is subtraction commutative for whole numbers? (Example: 8 - 5 vs 5 - 8)',
        'steps': [
          '8 - 5 = 3 (a whole number).',
          '5 - 8 = -3 (not a whole number).',
          'Since results differ and -3 isn\'t a whole number, Subtraction is NOT commutative.'
        ]
      }
    ]
  }
};

Object.assign(data, math_segmented);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Math (1-6) with examples updated.');
