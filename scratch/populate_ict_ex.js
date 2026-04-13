const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const ict_ex = {
  'comp_1': {
    ...data['comp_1'],
    'examples': [
      { 'question': 'Describe the Input-Process-Output (IPO) cycle for solving a math problem on a calculator.', 'steps': ['Input: You type numbers and signs like 5 + 3.', 'Process: The CPU calculates the sum internally.', 'Output: The number 8 appears on the screen.'], 'illustration': 'Numbers -> CPU -> Result' },
      { 'question': 'Why is a computer called a "fast" machine?', 'steps': ['It can perform millions of calculations in one second.', 'Humans take minutes to solve complex math; computers do it instantly.'] }
    ]
  },
  'comp_2': {
    ...data['comp_2'],
    'examples': [
      { 'question': 'If you want to put your paper photograph inside the computer, which device will you use?', 'steps': ['You will use a Scanner.', 'Place photo on the glass, press Scan, and it becomes a digital file.'], 'illustration': 'Scanner taking photo into the binary world' },
      { 'question': 'Identify the output device needed to hear music.', 'steps': ['Speakers or Headphones.', 'They take digital signals and turn them into sound waves you can hear.'] }
    ]
  },
  'comp_3': {
    ...data['comp_3'],
    'examples': [
      { 'question': 'Why is RAM called "Volatile" memory?', 'steps': ['RAM holds data only as long as the computer is ON.', 'If you turn off the computer without saving, data in RAM is deleted.', 'That\'s why we need Hard Disks for permanent storage.'], 'illustration': 'RAM = Temporary workbench; Disk = Permanent cupboard' },
      { 'question': 'What is the function of the Motherboard?', 'steps': ['It is the main circuit board that connects CPU, RAM, and all other parts.', 'It acts like the nervous system of the computer.'] }
    ]
  },
  'comp_prog_1': {
    ...data['comp_prog_1'],
    'examples': [
      { 'question': 'How do you make a cat sprite move 50 steps in Scratch?', 'steps': ['Drag the "Move 10 steps" block.', 'Change the number 10 to 50.', 'Click the block or add an event block above it.'], 'illustration': 'Move block with [50] in the center' },
      { 'question': 'How to change the background of your project?', 'steps': ['Go to the "Backdrops" section on the right.', 'Click "Choose a Backdrop" and select a new image.'] }
    ]
  },
  'comp_net_3': {
    ...data['comp_net_3'],
    'examples': [
      { 'question': 'Identify if this password is secure: "123456"', 'steps': ['No, it is very weak and easy for hackers to guess.', 'A strong password should be like: "@StUdEnT#2026".'], 'illustration': 'Weak (❌) vs Strong (✅) passwords' },
      { 'question': 'What should you do if you receive a message from a stranger online?', 'steps': ['Do not reply or click any links.', 'Immediately tell your parents or a trusted adult.'] }
    ]
  }
};

Object.assign(data, ict_ex);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('ICT with examples updated.');
