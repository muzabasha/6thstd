const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const math_bulk = {
  'math_pn_2': { ...data['math_pn_2'], 'textbookContent': 'Focus on Prime and Composite numbers. Explains the Sieve of Eratosthenes.', 'qa': [{'q': 'Smallest prime?', 'a': '2'}, {'q': 'Is 1 prime?', 'a': 'No'}], 'scenarios': [{'q': 'You have 7 chocolates. Can you share them exactly equally between two people?', 'a': 'No, because 7 is a prime number.'}] },
  'math_pn_3': { ...data['math_pn_3'], 'textbookContent': 'HCF and LCM concepts.', 'qa': [{'q': 'HCF of 4, 8?', 'a': '4'}], 'scenarios': [{'q': 'A bell rings every 10 mins, another every 15 mins. When do they ring together?', 'a': 'After 30 mins (LCM).'}] },
  'math_int_1': { ...data['math_int_1'], 'textbookContent': 'Negative numbers and their representation.', 'qa': [{'q': 'Is -5 > -1?', 'a': 'No'}], 'scenarios': [{'q': 'Temperature is -5 and drops by 2. What is it now?', 'a': '-7'}] }
};

// ... more math topics
Object.assign(data, math_bulk);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Math Bulk Update finished.');
