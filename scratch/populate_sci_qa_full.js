const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const sci_qa = {
  'sci_food_1': {
    ...data['sci_food_1'],
    'qa': [
      { 'q': 'What are ingredients?', 'a': 'Materials needed to prepare a dish, like rice and water for boiled rice.' },
      { 'q': 'Name two plant parts used as food.', 'a': 'Fruits (apple) and Seeds (pulses).' },
      { 'q': 'What are herbivores?', 'a': 'Animals that eat only plants or plant products.' },
      { 'q': 'What are carnivores?', 'a': 'Animals that eat only other animals.' },
      { 'q': 'What are omnivores?', 'a': 'Animals that eat both plants and animals.' },
      { 'q': 'Where do bees collect nectar from?', 'a': 'Bees collect nectar from flowers.' },
      { 'q': 'What do bees turn nectar into?', 'a': 'They turn it into honey and store it in their beehive.' },
      { 'q': 'Are all animals herbivores?', 'a': 'No, animals are classified as herbivores, carnivores, or omnivores based on food habits.' },
      { 'q': 'Which part of the mustard plant is used as food?', 'a': 'Leaves (vegetable) and Seeds (oil).' },
      { 'q': 'Is milk a plant or animal product?', 'a': 'Milk is an animal product obtained from cows, goats, and buffaloes.' }
    ]
  },
  'sci_food_2': {
    ...data['sci_food_2'],
    'qa': [
      { 'q': 'What are nutrients?', 'a': 'Chemical substances in food that our body needs to grow and stay healthy.' },
      { 'q': 'Name the major nutrients in our food.', 'a': 'Carbohydrates, Proteins, Fats, Vitamins, and Minerals.' },
      { 'q': 'Which nutrient provides more energy than carbohydrates?', 'a': 'Fats provide much more energy than the same amount of carbohydrates.' },
      { 'q': 'Why are proteins called body-building foods?', 'a': 'Because they are needed for the growth and repair of our body.' },
      { 'q': 'Which vitamin is essential for good eyesight?', 'a': 'Vitamin A.' },
      { 'q': 'Which vitamin helps our body use calcium for bones and teeth?', 'a': 'Vitamin D.' },
      { 'q': 'What is a balanced diet?', 'a': 'A diet that contains all required nutrients in the right proportion along with roughage and water.' },
      { 'q': 'What are deficiency diseases?', 'a': 'Diseases caused by the lack of certain nutrients over a long period.' },
      { 'q': 'Name the disease caused by Vitamin C deficiency.', 'a': 'Scurvy (bleeding gums).' },
      { 'q': 'Which mineral is needed for making red blood cells?', 'a': 'Iron.' }
    ]
  }
};

Object.assign(data, sci_qa);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Science Q&A (Topic 1-2) with 10 questions each updated.');
