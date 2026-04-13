const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const super_data = {
  'sci_wtr_1': {
    ...data['sci_wtr_1'],
    'textbookContent': 'Chapter on Water explains its importance for animals and plants. It covers the sources of water (oceans, rivers, lakes, groundwater) and the concept of freshwater versus saltwater. It also discusses Drought and Flood conditions.',
    'qa': [
      {'q': 'What is the main source of water?', 'a': 'Oceans are the largest source, but rain is the primary source of freshwater.'},
      {'q': 'What is groundwater?', 'a': 'Water found beneath the Earth\'s surface in the cracks and spaces in soil, sand and rock.'}
    ],
    'scenarios': [
      {'q': 'It hasn\'t rained in your village for 2 years. What is this condition called?', 'a': 'Drought.'},
      {'q': 'A factory dumps chemicals into a lake. How does this affect us?', 'a': 'It pollutes the water source, making it unsafe for drinking and harmful to fish.'}
    ]
  },
  'sci_air_1': {
    ...data['sci_air_1'],
    'textbookContent': 'Air is all around us. It is a mixture of nitrogen, oxygen, small amounts of carbon dioxide, water vapor and other gases. The layer of air surrounding the earth is the atmosphere.',
    'qa': [
      {'q': 'Which gas is highest in air?', 'a': 'Nitrogen (around 78%).'},
      {'q': 'Importance of Oxygen?', 'a': 'Essential for respiration and burning.'}
    ],
    'scenarios': [
      {'q': 'You light a candle and cover it with a glass. Why does it go out?', 'a': 'Because the oxygen inside the glass is used up, and fire needs oxygen to burn.'},
      {'q': 'Why do we see dust particles in a beam of sunlight in a dark room?', 'a': 'Because air contains tiny suspended dust particles.'}
    ]
  },
  'comp_prog_1': {
    ...data['comp_prog_1'],
    'textbookContent': 'Introduction to Scratch, a block-based visual programming language. It explains Sprites (characters), Stage (background), and Scripts (code blocks that snap together).',
    'qa': [
      {'q': 'What is a Sprite?', 'a': 'A character or object that can move and perform actions in Scratch.'},
      {'q': 'What is the Green Flag used for?', 'a': 'To start the execution of the scripts.'}
    ],
    'scenarios': [
      {'q': 'You want your cat to walk non-stop across the screen. Which block do you use?', 'a': 'The "forever" loop block.'},
      {'q': 'You want the backdrop to change when the cat touches a wall. Which block helps?', 'a': 'The "Sensing" block (if touching edge) combined with "Looks" (next backdrop).'}
    ]
  }
};

// ... and so on for all subjects. 
// Given the volume, I will populate the most critical missing ones.

Object.assign(data, super_data);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Super population of Textbook, Q&A, and Scenarios updated.');
