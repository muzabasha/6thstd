const fs = require('fs');
const lessonsPath = 'src/data/lessons.json';
const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

const englishExpansion = {
  'eng_cw_1': {
    what: "Notice Writing is a formal way of communicating important information to a group of people, usually in a school or organization.",
    example: "A notice for a lost water bottle or an upcoming school trip.",
    points: [
      "Keep it brief and to the point.",
      "Include the name of the organization.",
      "Write 'NOTICE' in bold letters.",
      "Include Date, Heading, and the main Message.",
      "Add the name and designation of the person issuing the notice."
    ],
    tip: "Always put your notice in a box!",
    qa: [
      { q: "What is a notice?", a: "A formal written or printed announcement." },
      { q: "Where is a notice usually placed?", a: "On a notice board." },
      { q: "What should be at the top of a notice?", a: "The name of the institution." },
      { q: "Should a notice be long?", a: "No, it should be concise and clear." },
      { q: "What is the word limit for a notice usually?", a: "About 50 words." },
      { q: "Is a box necessary for a notice?", a: "Yes, it is standard format." },
      { q: "What details should a notice include?", a: "Event, Date, Time, Venue." },
      { q: "Who signs a notice?", a: "The person issuing it." },
      { q: "Can a notice be informal?", a: "Usually it is formal." },
      { q: "What is the purpose of a notice?", a: "To inform people about an upcoming event or information." }
    ],
    scenarios: [
      { q: "You lost your library card. Write a notice for the school board.", a: "Heading: LOST LIBRARY CARD, Content: Details of card, contact info." },
      { q: "Your school is organizing a trek. What info goes in the notice?", a: "Date of trek, fee, destination, items to bring." },
      { q: "Why is the date important in a notice?", a: "So people know when the information was issued." },
      { q: "Is a notice written in the first person (I/Me)?", a: "No, usually in the third person." },
      { q: "If you find a watch, what title would you use?", a: "FOUND: GOLD WATCH." },
      { q: "Where would you put the name of the school?", a: "At the very top, centered." },
      { q: "How do you make a notice catchy?", a: "Use a clear, bold heading." },
      { q: "Who should you contact if you find a lost item?", a: "The person mentioned in the notice." },
      { q: "Can we use colors in a notice?", a: "In school, yes, but keep it readable." },
      { q: "What if the venue is missing in an event notice?", a: "People won't know where to go!" }
    ]
  },
  'eng_cw_2': {
    what: "Diary Entry is a personal form of writing where an individual records their thoughts, feelings, and events of the day.",
    example: "Writing about your first day at a new school.",
    points: [
      "Write in the first person ('I').",
      "Include the Date and Day at the top.",
      "Use an informal, personal tone.",
      "Start with 'Dear Diary'.",
      "Be honest about your feelings."
    ],
    tip: "A diary is your best friend who never tells secrets!",
    qa: [
      { q: "What is a diary entry?", a: "A personal record of daily events and feelings." },
      { q: "Is a diary entry formal or informal?", a: "Informal and personal." },
      { q: "What pronoun is used in a diary?", a: "First person 'I'." },
      { q: "What is the usual salutation in a diary?", a: "Dear Diary." },
      { q: "Why do people write diaries?", a: "To reflect on their day and express emotions." },
      { q: "Should a diary entry have a heading?", a: "Optional, but date and day are essential." },
      { q: "Can you use slang in a diary?", a: "Yes, it's your personal space." },
      { q: "How does a diary entry usually end?", a: "With a signature or just your name." },
      { q: "Is the time important in a diary entry?", a: "Yes, it shows when you were writing (e.g., Night)." },
      { q: "What is the main theme of a diary?", a: "Personal reflection." }
    ],
    scenarios: [
      { q: "You won a prize today. How would you start your diary entry?", a: "Dear Diary, I can't believe I won!" },
      { q: "Why is it good to write a diary before bed?", a: "It helps clear your mind after the day." },
      { q: "If you are sad, can you write it in your diary?", a: "Yes, it helps you feel better." },
      { q: "What details about the weather might you include?", a: "If it matched your mood (e.g., Sunny day)." },
      { q: "Is it okay to draw in a diary?", a: "Absolutely!" },
      { q: "Why do we write the date?", a: "To remember exactly when those feelings happened." },
      { q: "What if you forget to write for a day?", a: "You can just continue the next day." },
      { q: "How long should a diary entry be?", a: "As long or short as you want." },
      { q: "Can a diary entry be about a future plan?", a: "Yes, expressing excitement for tomorrow." },
      { q: "Who reads your diary?", a: "Ideally, only you!" }
    ]
  }
};

const ictExpansion = {
  'comp_ai_1': {
    what: "Artificial Intelligence (AI) is the ability of a machine to perform tasks that typically require human intelligence, like learning and problem-solving.",
    example: "Google Assistant, Siri, or a chess-playing computer.",
    points: [
      "AI uses data to make decisions.",
      "It can learn from its mistakes (Machine Learning).",
      "AI is used in cars, hospitals, and phones.",
      "It helps humans do things faster and better.",
      "AI cannot think like humans but can follow complex rules."
    ],
    tip: "AI is a tool to help us, not replace us!",
    qa: [
      { q: "What does AI stand for?", a: "Artificial Intelligence." },
      { q: "Can AI think for itself?", a: "No, it follows algorithms and data." },
      { q: "Name one AI assistant.", a: "Siri, Alexa, or Google Assistant." },
      { q: "Is a calculator AI?", a: "Usually no, it just follows simple math rules." },
      { q: "What is Machine Learning?", a: "A part of AI where machines learn from data." },
      { q: "Can AI recognize faces?", a: "Yes, through computer vision." },
      { q: "Is AI used in medicine?", a: "Yes, to help doctors diagnose diseases." },
      { q: "Can AI write a story?", a: "Yes, using Generative AI." },
      { q: "Is a robot the same as AI?", a: "A robot is the body; AI is the brain." },
      { q: "Why is data important for AI?", a: "It's what the AI learns from." }
    ],
    scenarios: [
      { q: "Your phone suggests the next word while typing. Is this AI?", a: "Yes, it's predicting your next move." },
      { q: "How can AI help a farmer?", a: "By predicting weather or checking plant health." },
      { q: "If an AI makes a mistake, who is responsible?", a: "Usually the humans who built or use it." },
      { q: "Can AI feel happy or sad?", a: "No, it doesn't have real emotions." },
      { q: "Why do we need to be careful with AI?", a: "Because it might give wrong info if data is bad." },
      { q: "How does YouTube know what videos you like?", a: "Using an AI recommendation algorithm." },
      { q: "Can AI play video games?", a: "Yes, it can even beat pro players!" },
      { q: "Will AI take over the world?", a: "In movies yes, but in reality it's just software." },
      { q: "What is a chatbot?", a: "An AI program you can talk to." },
      { q: "Can AI help translate languages?", a: "Yes, like Google Translate." }
    ]
  }
};

Object.assign(lessons, englishExpansion, ictExpansion);
fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2));
console.log('Subject Agents expansion complete.');
