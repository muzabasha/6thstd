const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const scienceUpdates = {
  'sci_food_1': {
    ...data['sci_food_1'],
    'qa': [
      { 'q': 'What are nutrients?', 'a': 'Chemical substances in food that our body needs to grow and stay healthy.' },
      { 'q': 'Name the five main nutrients.', 'a': 'Carbohydrates, Proteins, Fats, Vitamins, and Minerals.' },
      { 'q': 'Which nutrient gives us energy?', 'a': 'Carbohydrates and Fats.' },
      { 'q': 'What are bodybuilding foods?', 'a': 'Foods rich in proteins.' },
      { 'q': 'Name two sources of carbohydrates.', 'a': 'Rice and Wheat.' },
      { 'q': 'Name two sources of protein.', 'a': 'Pulses and Milk.' },
      { 'q': 'Why is roughage important?', 'a': 'It helps in the easy passage of food through the digestive system and prevents constipation.' },
      { 'q': 'Is water a nutrient?', 'a': 'It is not a nutrient but essential for all life processes.' },
      { 'q': 'Which vitamin is good for eyesight?', 'a': 'Vitamin A.' },
      { 'q': 'Which mineral is needed for strong bones?', 'a': 'Calcium.' }
    ],
    'scenarios': [
      { 'q': 'You feel very weak and tired. Which nutrient might you need more of for energy?', 'a': 'Carbohydrates.' },
      { 'q': 'A child has weak bones. Which food should they eat?', 'a': 'Milk and dairy products (rich in Calcium).' },
      { 'q': 'You are growing tall. Which nutrient is helping you build new cells?', 'a': 'Proteins.' },
      { 'q': 'Why do we feel thirsty after eating salty food?', 'a': 'Because salt draws water out of cells, and our body needs to maintain balance.' },
      { 'q': 'If you only eat polished rice, which vitamin might you miss?', 'a': 'Vitamin B1.' },
      { 'q': 'A sailor has bleeding gums. What should he eat?', 'a': 'Citrus fruits like lemons and oranges (Vitamin C).' },
      { 'q': 'Why do athletes eat bananas before a race?', 'a': 'For instant energy from carbohydrates.' },
      { 'q': 'You cut your finger. Which nutrient helps in blood clotting?', 'a': 'Vitamin K.' },
      { 'q': 'Why is it better to eat whole fruit than just juice?', 'a': 'Whole fruit provides roughage (fiber).' },
      { 'q': 'Which nutrient provides more energy: 1g of fat or 1g of carbohydrate?', 'a': '1g of fat provides about twice as much energy.' }
    ]
  },
  'sci_plt_1': {
    ...data['sci_plt_1'],
    'qa': [
      { 'q': 'What are herbs?', 'a': 'Small plants with green and tender stems.' },
      { 'q': 'What are shrubs?', 'a': 'Medium-sized plants with hard stems branching near the base.' },
      { 'q': 'What are trees?', 'a': 'Tall plants with a thick, hard, brown stem called a trunk.' },
      { 'q': 'What are climbers?', 'a': 'Plants that take support on neighboring structures to climb up.' },
      { 'q': 'What are creepers?', 'a': 'Plants with weak stems that spread on the ground.' },
      { 'q': 'Name an example of a tree.', 'a': 'Mango or Banyan.' },
      { 'q': 'Name an example of a shrub.', 'a': 'Rose or Lemon.' },
      { 'q': 'Name an example of a climber.', 'a': 'Money plant or Pea plant.' },
      { 'q': 'What is the function of the stem?', 'a': 'It conducts water and minerals to the leaves and supports branches.' },
      { 'q': 'Do herbs have many branches?', 'a': 'Usually they have few or no branches.' }
    ],
    'scenarios': [
      { 'q': 'You see a plant with a thin green stem. Is it a tree or a herb?', 'a': 'A herb.' },
      { 'q': 'A pumpkin plant grows along the ground. What category does it belong to?', 'a': 'Creeper.' },
      { 'q': 'You want to plant a hedge. Should you use trees or shrubs?', 'a': 'Shrubs, as they branch near the base.' },
      { 'q': 'Why do climbers need a stick or wall?', 'a': 'Because their stems are too weak to stand upright.' },
      { 'q': 'Which part of the plant is like a straw?', 'a': 'The stem (it sucks up water).' },
      { 'q': 'You see a plant with a very thick, rough brown skin. What is this part called?', 'a': 'Bark of the trunk.' },
      { 'q': 'Why are most herbs small?', 'a': 'Because their soft stems cannot support a lot of weight or height.' },
      { 'q': 'Can a shrub grow as tall as a building?', 'a': 'Generally no, they stay medium-sized.' },
      { 'q': 'Which plant type is the Rose?', 'a': 'Shrub.' },
      { 'q': 'Is grass a herb or a shrub?', 'a': 'Herb.' }
    ]
  }
};

Object.assign(data, scienceUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Science Food and Plants Quiz updated.');
