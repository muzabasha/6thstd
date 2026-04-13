const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const science_textbook = {
  'sci_food_1': {
    ...data['sci_food_1'],
    'textbookContent': 'NCERT Class 6 Science Chapter 1 focuses on the diversity of food. It explains that food items like boiled rice are made of just two ingredients (rice and water), while a vegetable curry needs many. It introduces the sources of food: Plants provide grains, cereals, and vegetables, while animals give us milk, meat, and eggs.',
    'qa': [
      { 'q': 'Define ingredients.', 'a': 'Ingredients are the materials needed to prepare a particular food dish.' },
      { 'q': 'What are the main sources of our food?', 'a': 'The two main sources are Plants and Animals.' },
      { 'q': 'Why do we need food?', 'a': 'Food provides energy for work, helps in growth, and protects our body from diseases.' }
    ]
  },
  'sci_food_2': {
    ...data['sci_food_2'],
    'textbookContent': 'This chapter discusses the components of food: Carbohydrates, Proteins, Fats, Vitamins, and Minerals. It states that Carbohydrates mainly provide energy. Fats also give energy, actually much more compared to the same amount of carbohydrates. Proteins are needed for growth and repair. Vitamins help in protecting our body against diseases.',
    'qa': [
      { 'q': 'What is roughage?', 'a': 'Roughage is dietary fiber found in plant foods that helps our body get rid of undigested food.' },
      { 'q': 'Which nutrient is known as energy-giving food?', 'a': 'Carbohydrates and Fats are energy-giving foods.' },
      { 'q': 'Name the vitamin that keeps our eyes and skin healthy.', 'a': 'Vitamin A is essential for healthy eyes and skin.' }
    ]
  },
  'sci_plt_1': {
    ...data['sci_plt_1'],
    'textbookContent': 'Plants are classified into Herbs, Shrubs, and Trees based on their size and stem nature. Herbs have green, tender stems and are usually short. Shrubs have branches arising near the base with a hard but not very thick stem. Trees have a very hard, thick brown stem called a trunk.',
    'qa': [
      { 'q': 'How do creepers differ from climbers?', 'a': 'Creepers spread on the ground, while climbers take support of neighboring structures to climb up.' },
      { 'q': 'Give an example of a shrub.', 'a': 'Rose and Lemon are common examples of shrubs.' }
    ]
  }
};

Object.assign(data, science_textbook);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Science Textbook and Q&A (1-3) updated.');
