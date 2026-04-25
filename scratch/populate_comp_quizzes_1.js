const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const compUpdates = {
  'comp_1': {
    ...data['comp_1'],
    'qa': [
      { 'q': 'What is a computer?', 'a': 'An electronic device that processes data to give information.' },
      { 'q': 'What is the full form of CPU?', 'a': 'Central Processing Unit.' },
      { 'q': 'Which part is the "Brain" of the computer?', 'a': 'CPU.' },
      { 'q': 'Name the first generation of computers.', 'a': 'Vacuum Tubes.' },
      { 'q': 'What is a Supercomputer?', 'a': 'A very powerful computer used for complex tasks like weather forecasting.' },
      { 'q': 'What is hardware?', 'a': 'Physical parts of a computer that you can touch.' },
      { 'q': 'What is software?', 'a': 'A set of instructions that tells the hardware what to do.' },
      { 'q': 'What is an Input device?', 'a': 'A device used to enter data into the computer (e.g., Keyboard).' },
      { 'q': 'What is an Output device?', 'a': 'A device that shows the results (e.g., Monitor).' },
      { 'q': 'Name a portable computer.', 'a': 'Laptop or Tablet.' }
    ],
    'scenarios': [
      { 'q': 'You want to type a letter. Which device do you use?', 'a': 'Keyboard.' },
      { 'q': 'You want to hear music. Which device do you use?', 'a': 'Speakers or Headphones.' },
      { 'q': 'You want to see the movie you are playing. Which device do you use?', 'a': 'Monitor or Screen.' },
      { 'q': 'A computer can do millions of calculations without getting tired. What is this quality called?', 'a': 'Diligence.' },
      { 'q': 'Why is a computer called "electronic"?', 'a': 'Because it runs on electricity.' },
      { 'q': 'Can a computer think like a human?', 'a': 'No, it only follows instructions given by humans.' },
      { 'q': 'What happens if you give wrong instructions to a computer?', 'a': 'It will give a wrong output (GIGO - Garbage In, Garbage Out).' },
      { 'q': 'You want to print your drawing on paper. Which device do you use?', 'a': 'Printer.' },
      { 'q': 'Which generation uses Transistors?', 'a': 'Second Generation.' },
      { 'q': 'Which generation are we in now (AI)?', 'a': 'Fifth Generation.' }
    ]
  }
};

Object.assign(data, compUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Computer Basics Quiz updated.');
