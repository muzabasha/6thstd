const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const grammarUpdates = {
  'eng_gr_1': {
    ...data['eng_gr_1'],
    'qa': [
      { 'q': 'What is a Noun?', 'a': 'A name of a person, place, animal, or thing.' },
      { 'q': 'What is a Proper Noun?', 'a': 'A specific name given to a person or place (e.g., Rahul, India).' },
      { 'q': 'What is a Pronoun?', 'a': 'A word used in place of a noun (e.g., he, she, it, they).' },
      { 'q': 'Name three types of nouns.', 'a': 'Common, Proper, Abstract, Collective.' },
      { 'q': 'What is a Collective Noun?', 'a': 'A name for a group of people or things (e.g., a bunch of keys, a team of players).' },
      { 'q': 'Which pronoun is used for a boy?', 'a': 'He.' },
      { 'q': 'Which pronoun is used for a group including yourself?', 'a': 'We.' },
      { 'q': 'What is an Abstract Noun?', 'a': 'A name for an idea, quality, or state (e.g., honesty, love, happiness).' },
      { 'q': 'Identify the noun in: "The cat is sleeping."', 'a': 'Cat.' },
      { 'q': 'Identify the pronoun in: "They are playing cricket."', 'a': 'They.' }
    ],
    'scenarios': [
      { 'q': 'You are talking about your sister. Which pronoun do you use?', 'a': 'She.' },
      { 'q': 'Is "Taj Mahal" a common or proper noun?', 'a': 'Proper noun.' },
      { 'q': 'What is the collective noun for a group of fish?', 'a': 'A school of fish.' },
      { 'q': 'Instead of "The table is broken", say it using a pronoun.', 'a': '"It is broken."' },
      { 'q': 'Is "Happiness" a noun? What type?', 'a': 'Yes, an Abstract noun.' },
      { 'q': 'Identify the proper noun: "I live in Bengaluru."', 'a': 'Bengaluru.' },
      { 'q': 'Change "The boys are running" using a pronoun.', 'a': '"They are running."' },
      { 'q': 'What is the noun in "Honesty is the best policy"?', 'a': 'Honesty.' },
      { 'q': 'Is "Student" a common or proper noun?', 'a': 'Common noun.' },
      { 'q': 'What pronoun do you use for your pet dog if you don\'t know the gender?', 'a': 'It.' }
    ]
  },
  'eng_gr_2': {
    ...data['eng_gr_2'],
    'qa': [
      { 'q': 'What is a Verb?', 'a': 'An action word or a word that shows a state of being.' },
      { 'q': 'Identify the verb: "Sadiya reads a book."', 'a': 'Reads.' },
      { 'q': 'What are Helping Verbs?', 'a': 'Verbs that help the main verb (e.g., is, are, was, were, has, have).' },
      { 'q': 'What is the main verb in "He is jumping"?', 'a': 'Jumping.' },
      { 'q': 'What is the helping verb in "They are singing"?', 'a': 'Are.' },
      { 'q': 'Name three action verbs.', 'a': 'Run, Eat, Sleep.' },
      { 'q': 'Name three helping verbs.', 'a': 'Am, Is, Are.' },
      { 'q': 'Identify the verb: "The sun shines brightly."', 'a': 'Shines.' },
      { 'q': 'Can a sentence exist without a verb?', 'a': 'No, every sentence must have a verb.' },
      { 'q': 'What is the verb in "I am a student"?', 'a': 'Am (state of being).' }
    ],
    'scenarios': [
      { 'q': 'What are you doing right now? (Identify the verb in your answer)', 'a': 'Answers vary (e.g., "I am *studying*").' },
      { 'q': 'Identify the action: "The birds fly in the sky."', 'a': 'Fly.' },
      { 'q': 'Is "is" a verb?', 'a': 'Yes, it is a helping verb or a linking verb.' },
      { 'q': 'Complete the sentence with a verb: "The baby ______."', 'a': 'Cries, sleeps, plays, etc.' },
      { 'q': 'Identify the helping verb: "We have finished our work."', 'a': 'Have.' },
      { 'q': 'Identify the main verb: "She will dance tomorrow."', 'a': 'Dance.' },
      { 'q': 'Is "beautiful" a verb?', 'a': 'No, it is an adjective.' },
      { 'q': 'What is the verb in "Stop!"?', 'a': 'Stop.' },
      { 'q': 'Identify the verb: "They were happy."', 'a': 'Were.' },
      { 'q': 'What is the verb in "Open the door"?', 'a': 'Open.' }
    ]
  }
};

Object.assign(data, grammarUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Grammar Batch 1 Quiz updated.');
