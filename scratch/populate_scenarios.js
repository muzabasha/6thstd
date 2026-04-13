const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const scenario_qa = {
  'sci_food_1': {
    ...data['sci_food_1'],
    'scenarios': [
      { 'q': 'You are making a fruit salad. What are the ingredients you use?', 'a': 'Fruits like apples, bananas, and grapes, plus honey or lemon juice as additional ingredients.' },
      { 'q': 'Suhail observes a squirrel eating a nut. What category does the squirrel belong to?', 'a': 'Herbivore, because it is eating a plant product (nut).' },
      { 'q': 'A chef is making Dal. They need water, pulses, and salt. Which of these is an animal product?', 'a': 'None. All these are plant or mineral products.' },
      { 'q': 'Riya finds a beehive in her garden. How do the bees help her garden while making honey?', 'a': 'They pollinate the flowers, which helps more fruits and seeds grow.' },
      { 'q': 'You see a bird eating both grains and small insects. What is it?', 'a': 'An Omnivore.' },
      { 'q': 'If a plant\'s roots are edible, give an example of what you might pull from the soil.', 'a': 'Carrots, Radishes, or Beetroots.' },
      { 'q': 'A farmer grows mustard. He wants to make oil. Which part of the plant will he use?', 'a': 'The seeds of the mustard plant.' },
      { 'q': 'You drink a glass of milk every morning. Trace this milk back to its source.', 'a': 'Milk comes from an animal (cow/buffalo) which eats grass (plant) to produce it.' },
      { 'q': 'Why do we wash vegetables before cooking them?', 'a': 'To remove dirt, chemicals, and tiny insects from the ingredients.' },
      { 'q': 'In a forest, a tiger hunts a deer. Why is the tiger a carnivore?', 'a': 'Because its diet consists entirely of other animals (meat).' }
    ]
  },
  'math_num_1': {
    ...data['math_num_1'],
    'scenarios': [
      { 'q': 'You are counting the population of a small town which is 75,307. Write this in the Indian system.', 'a': 'Seventy-five thousand three hundred and seven.' },
      { 'q': 'An international athlete wins 1,500,000 dollars. How many millions is this?', 'a': 'One point five million dollars.' },
      { 'q': 'A school library has 9,999 books. If they buy 1 more, what is the new total?', 'a': '10,000 (The smallest 5-digit number).' },
      { 'q': 'You have digits 4, 0, 7. What is the smallest 3-digit number you can make?', 'a': '407. (Zero cannot be at the start).' },
      { 'q': 'A truck carries 5,000 kg of wheat. How many grams is this?', 'a': '5,000,000 grams (5 million grams).' },
      { 'q': 'A runner covers 2 km. Their friend covers 2,000 m. Who ran further?', 'a': 'Both ran the same distance (2 km = 2,000 m).' },
      { 'q': 'You are reading a price tag of 4,50,000. Is this Indian or International system?', 'a': 'Indian system, because of the comma at the ten-thousand place (Lakhs).' },
      { 'q': 'Round your bill of 789 rupees to the nearest hundred for a quick estimate.', 'a': '800 rupees.' },
      { 'q': 'If a map uses 1cm = 100km, and the distance between two cities is 5cm, what is the real distance?', 'a': '500 km.' },
      { 'q': 'A company produces 58,423,202 pens. Write this in word form for an international report.', 'a': 'Fifty-eight million four hundred twenty-three thousand two hundred and two.' }
    ]
  }
};

Object.assign(data, scenario_qa);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Scenario-Based Q&A (10 per topic) for Science and Math updated.');
