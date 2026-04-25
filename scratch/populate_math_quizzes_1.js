const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mathUpdates = {
  'math_num_1': {
    ...data['math_num_1'],
    'qa': [
      { 'q': 'Smallest 6-digit number?', 'a': '1,00,000.' },
      { 'q': 'Greatest 7-digit number?', 'a': '99,99,999.' },
      { 'q': '1 Crore = how many Lakhs?', 'a': '100 Lakhs.' },
      { 'q': '1 Million = how many Lakhs?', 'a': '10 Lakhs.' },
      { 'q': '1 Billion = how many Millions?', 'a': '1000 Millions.' },
      { 'q': 'Place value of 5 in 75,432?', 'a': '5,000.' },
      { 'q': 'How many zeros are in one Lakh?', 'a': 'Five (5).' },
      { 'q': 'How many zeros are in one Crore?', 'a': 'Seven (7).' },
      { 'q': 'Write 50,00,000 + 4,000 + 20 in short form.', 'a': '50,04,020.' },
      { 'q': 'Which is larger: 100001 or 99999?', 'a': '100001.' }
    ],
    'scenarios': [
      { 'q': 'A city has a population of 5,43,210. Write this in the International system.', 'a': '543,210 (Five hundred forty-three thousand two hundred ten).' },
      { 'q': 'You buy a car for 8,50,000. How many lakhs is this?', 'a': '8.5 Lakhs.' },
      { 'q': 'A company earns 10 million dollars. How many crores is this roughly (1 crore = 10 million)?', 'a': '1 Crore.' },
      { 'q': 'You have digits 1, 2, 0, 4. What is the greatest 4-digit number you can make?', 'a': '4210.' },
      { 'q': 'What is the smallest 4-digit number using 1, 2, 0, 4?', 'a': '1024.' },
      { 'q': 'A distance is 5000 meters. How many kilometers is it?', 'a': '5 km.' },
      { 'q': 'If a packet weighs 250g, how many packets make 1kg?', 'a': '4 packets.' },
      { 'q': 'You are reading a bank balance: 1,23,456. Name the place of the digit 2.', 'a': 'Ten-thousands.' },
      { 'q': 'A movie earns 100 crores. Write this in numerals.', 'a': '1,00,00,00,000.' },
      { 'q': 'Round 12,345 to the nearest thousand.', 'a': '12,000.' }
    ]
  },
  'math_num_2': {
    ...data['math_num_2'],
    'qa': [
      { 'q': 'Round 48 to the nearest ten.', 'a': '50.' },
      { 'q': 'Round 153 to the nearest hundred.', 'a': '200.' },
      { 'q': 'Round 449 to the nearest hundred.', 'a': '400.' },
      { 'q': 'Estimate the sum: 52 + 37.', 'a': '50 + 40 = 90.' },
      { 'q': 'Estimate the difference: 98 - 42.', 'a': '100 - 40 = 60.' },
      { 'q': 'Estimate the product: 19 x 21.', 'a': '20 x 20 = 400.' },
      { 'q': 'When do we round down?', 'a': 'When the digit is 4, 3, 2, 1, or 0.' },
      { 'q': 'When do we round up?', 'a': 'When the digit is 5, 6, 7, 8, or 9.' },
      { 'q': 'Estimate 5290 + 17986 by rounding to thousands.', 'a': '5000 + 18000 = 23000.' },
      { 'q': 'Is estimation always exact?', 'a': 'No, it is an approximate value.' }
    ],
    'scenarios': [
      { 'q': 'You have 482 rupees and buy a toy for 119. Estimate how much you have left.', 'a': '500 - 100 = 400 (roughly).' },
      { 'q': 'A stadium has 45,678 seats. Round this to the nearest ten thousand.', 'a': '50,000.' },
      { 'q': 'You need to buy 12 pens at 9 rupees each. Estimate the total cost.', 'a': '10 x 10 = 100 rupees.' },
      { 'q': 'A journey is 392 km. Round to the nearest hundred.', 'a': '400 km.' },
      { 'q': 'You are planning a party for 95 people. How many chairs should you order (round to nearest 10)?', 'a': '100 chairs.' },
      { 'q': 'A book has 243 pages. Estimate how many pages 5 such books would have.', 'a': '250 x 5 = 1250 pages.' },
      { 'q': 'Your bill is 789. The shopkeeper rounds it to the nearest hundred. How much do you pay?', 'a': '800.' },
      { 'q': 'A water tank holds 4980 liters. Round to the nearest thousand.', 'a': '5000 liters.' },
      { 'q': 'You spend 12 minutes on math and 18 minutes on science. Estimate total time.', 'a': '10 + 20 = 30 minutes.' },
      { 'q': 'A bag of rice is 24.5 kg. Round to the nearest whole kg.', 'a': '25 kg.' }
    ]
  },
  'math_num_3': {
    ...data['math_num_3'],
    'qa': [
      { 'q': 'What is X in Hindu-Arabic?', 'a': '10.' },
      { 'q': 'What is V in Hindu-Arabic?', 'a': '5.' },
      { 'q': 'What is L in Hindu-Arabic?', 'a': '50.' },
      { 'q': 'What is C in Hindu-Arabic?', 'a': '100.' },
      { 'q': 'What is D in Hindu-Arabic?', 'a': '500.' },
      { 'q': 'What is M in Hindu-Arabic?', 'a': '1000.' },
      { 'q': 'Write 9 in Roman numerals.', 'a': 'IX.' },
      { 'q': 'Write 14 in Roman numerals.', 'a': 'XIV.' },
      { 'q': 'Write 40 in Roman numerals.', 'a': 'XL.' },
      { 'q': 'Can "V" be repeated?', 'a': 'No, V, L, and D are never repeated.' }
    ],
    'scenarios': [
      { 'q': 'A clock uses Roman numerals. What is at the 6 o\'clock position?', 'a': 'VI.' },
      { 'q': 'You are reading Chapter 29. How is it written in Roman numerals?', 'a': 'XXIX.' },
      { 'q': 'A building was made in 1990. How is 90 written?', 'a': 'XC.' },
      { 'q': 'Convert 73 into Roman numerals.', 'a': 'LXXIII.' },
      { 'q': 'Convert XXXVIII to Hindu-Arabic.', 'a': '38.' },
      { 'q': 'Is IIII a correct way to write 4?', 'a': 'No, it should be IV.' },
      { 'q': 'Write 99 in Roman numerals.', 'a': 'XCIX.' },
      { 'q': 'What does "XCI" represent?', 'a': '91.' },
      { 'q': 'You see a king named Henry VIII. What number is VIII?', 'a': '8.' },
      { 'q': 'Write your age in Roman numerals (assume 11 or 12).', 'a': 'XI or XII.' }
    ]
  }
};

Object.assign(data, mathUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Math Topics 1-3 Quiz updated.');
