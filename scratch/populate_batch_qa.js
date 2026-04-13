const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const batch_qa = {
  'sci_plt_1': { ...data['sci_plt_1'], 'qa': [
    {'q': 'What are herbs?', 'a': 'Green, tender-stemmed plants, usually short.'},
    {'q': 'What are shrubs?', 'a': 'Plants with hard stems branching near the base.'},
    {'q': 'What are trees?', 'a': 'Tall plants with thick, hard brown trunks.'},
    {'q': 'What are creepers?', 'a': 'Plants with weak stems that spread on ground.'},
    {'q': 'What are climbers?', 'a': 'Plants that take support to climb up.'},
    {'q': 'Function of a stem?', 'a': 'Transports water and minerals to all parts.'},
    {'q': 'What is reticulate venation?', 'a': 'Net-like design of veins on a leaf.'},
    {'q': 'What is parallel venation?', 'a': 'Veins running parallel to each other.'},
    {'q': 'What is transpiration?', 'a': 'Process of water loss from leaves as vapor.'},
    {'q': 'What are the main parts of a flower?', 'a': 'Sepals, Petals, Stamens, and Pistil.'}
  ]},
  'math_num_1': { ...data['math_num_1'], 'qa': [
    {'q': 'Smallest 5-digit number?', 'a': '10,000.'},
    {'q': 'Greatest 5-digit number?', 'a': '99,999.'},
    {'q': '1 million = ? lakhs', 'a': '10 lakhs.'},
    {'q': '1 crore = ? millions', 'a': '10 millions.'},
    {'q': '1 km = ? metres', 'a': '1,000 metres.'},
    {'q': '1 kg = ? grams', 'a': '1,000 grams.'},
    {'q': '1 gram = ? milligrams', 'a': '1,000 milligrams.'},
    {'q': 'Place value of 4 in 4,56,789?', 'a': '4,00,000 (Four lakhs).'},
    {'q': 'What is expanded form?', 'a': 'Expressing a number as the sum of its place values.'},
    {'q': 'Which is larger: 700 or 070?', 'a': '700 is larger.'}
  ]},
  'math_wn_1': { ...data['math_wn_1'], 'qa': [
    {'q': 'Smallest whole number?', 'a': '0.'},
    {'q': 'Smallest natural number?', 'a': '1.'},
    {'q': 'Successor of 1099?', 'a': '1100.'},
    {'q': 'Predecessor of 2000?', 'a': '1999.'},
    {'q': 'What is a whole number?', 'a': 'Natural numbers along with 0.'},
    {'q': 'Are all natural numbers whole numbers?', 'a': 'Yes.'},
    {'q': 'Are all whole numbers natural numbers?', 'a': 'No, 0 is not a natural number.'},
    {'q': 'What is a number line?', 'a': 'A straight line where numbers are marked at equal intervals.'},
    {'q': 'Property of 1 for multiplication?', 'a': 'Identity property (any number times 1 is itself).'},
    {'q': 'Property of 0 for addition?', 'a': 'Additive identity (any number plus 0 is itself).'}
  ]}
};

Object.assign(data, batch_qa);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Batch Q&A (10 per topic) updated.');
