const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const eng_ex = {
  'eng_pr_1': {
    ...data['eng_pr_1'],
    'examples': [
      { 'question': 'Describe why the elf needed Patrick\'s help despite promising to do his homework.', 'steps': ['The elf was tiny and knew nothing about human subjects like history or math.', 'He needed Patrick to read the dictionary and guide him through every step.', 'This forced Patrick to study harder than he ever had before.'], 'illustration': 'Little elf sitting on a pile of books, confused' },
      { 'question': 'What was Patrick\'s "new habit" at the end of the story?', 'steps': ['He cleaned his own room and did all his chores.', 'He was always cheerful and never rude to anyone.', 'He realized that he had developed his own self-discipline.'] }
    ]
  },
  'eng_pr_2': {
    ...data['eng_pr_2'],
    'examples': [
      { 'question': 'Why did the dog decide to serve the Lion after the Bear?', 'steps': ['The Bear was afraid of the Lion.', 'The dog thought the Lion was the strongest beast in the forest.', 'He served the Lion for a long time until he saw the Lion was afraid of Man.'], 'illustration': 'Dog standing proudly next to a large lion' },
      { 'question': 'Why is Man considered the best master by the dog?', 'steps': ['Unlike wild animals, Man is intelligent and provides safety and love.', 'The dog realized that no wild beast could truly overpower a humans brain.'] }
    ]
  },
  'eng_pr_3': {
    ...data['eng_pr_3'],
    'examples': [
      { 'question': 'Why was the waterfall "magical" for Taro but just cold water for others?', 'steps': ['The waterfall rewarded Taro for being a thoughtful and kind son.', 'Others were greedy and only wanted the sake for themselves.', 'It shows that goodness is acknowledged by nature itself.'], 'illustration': 'Taro filling his pitcher with golden liquid' },
      { 'question': 'How did the Emperor reward Taro\'s kind heart?', 'steps': ['Given him twenty pieces of gold.', 'Named the most beautiful fountain in the city after him.'] }
    ]
  },
  'eng_pr_4': {
    ...data['eng_pr_4'],
    'examples': [
      { 'question': 'Mention two major achievements of Kalpana Chawla.', 'steps': ['Became the first Indian-origin woman to go into space.', 'Spent over 372 hours in space across her missions.'], 'illustration': 'Kalpana Chawla in a blue space suit' },
      { 'question': 'What was her message for students in India?', 'steps': ['"The path from dreams to success does exist. May you have the vision to find it."'] }
    ]
  },
  'eng_pr_5': {
    ...data['eng_pr_5'],
    'examples': [
      { 'question': 'Why did the children have a "lame day" or a "blind day"?', 'steps': ['To experience the difficulties faced by differently-abled people.', 'To learn how to help others with kindness and patience.', 'The system builds deep empathy and human values.'], 'illustration': 'Child with a bandage over eyes, guided by a friend' },
      { 'question': 'What did the narrator learn after his visit to Miss Beam\'s school?', 'steps': ['He realized that he was ten times more thoughtful than before.', 'He understood that true education is about learning to be kind.'] }
    ]
  },
  'eng_gr_1': {
    ...data['eng_gr_1'],
    'examples': [
      { 'question': 'Identify nouns in: "Sadiya drove her car to the park in Bangalore."', 'steps': ['Names of people: Sadiya.', 'Things: car, park.', 'Places: Bangalore.', 'All these are nouns.'], 'illustration': 'Sadiya(N) -> Car(N) -> Park(N)' },
      { 'question': 'Replace the noun with a pronoun: "The boy is eating a sandwich because the boy is hungry."', 'steps': ['Identify the repeated noun: "the boy".', 'Use "He" for the second part.', 'Result: "The boy is eating a sandwich because he is hungry."'] }
    ]
  },
  'eng_gr_2': {
    ...data['eng_gr_2'],
    'examples': [
      { 'question': 'Find the verb in: "The birds are flying southward for winter."', 'steps': ['What are the birds doing? They "are flying".', '"Flying" is the main action verb.'], 'illustration': 'Birds in sky = Flying (Verb)' },
      { 'question': 'Identify the helping verb in: "I have finished my homework."', 'steps': ['Main action is "finished".', '"Have" is helping the main action.'] }
    ]
  },
  'eng_gr_3': {
    ...data['eng_gr_3'],
    'examples': [
      { 'question': 'Add an adjective and an adverb to this: "The dog barked."', 'steps': ['Adjective describes dog: "The *angry* dog".', 'Adverb describes barking: "barked *loudly*".', 'Result: "The angry dog barked loudly."'], 'illustration': 'Angry(Adj) -> Dog -> Loudly(Adv)' },
      { 'question': 'Find the adverb in: "She solved the difficult puzzle easily."', 'steps': ['How did she solve it? "Easily".', '"Easily" is the adverb.'] }
    ]
  },
  'eng_gr_4': {
    ...data['eng_gr_4'],
    'examples': [
      { 'question': 'Change "They sing a song" into Past Tense.', 'steps': ['Identify verb: "sing".', 'Past form of sing is "sang".', 'Result: "They sang a song."'], 'illustration': 'Sing (Present) -> Sang (Past)' },
      { 'question': 'Write "We play cricket" in Future Tense.', 'steps': ['Add "will" before the verb.', 'Result: "We will play cricket."'] }
    ]
  },
  'eng_gr_5': {
    ...data['eng_gr_5'],
    'examples': [
      { 'question': 'Fill in the blanks: "___ elephant is standing ___ the tree."', 'steps': ['Elephant starts with vowel sound (e), so use "An".', 'Standing next to or under? Use "under".', 'Result: "An elephant is standing under the tree."'], 'illustration': 'An(Article) Elephant under(Preposition) Tree' },
      { 'question': 'Explain use of "a" vs "an" with "university" and "hour".', 'steps': ['University starts with "y" sound (consonant) -> Use "a university".', 'Hour starts with "o" sound (vowel) -> Use "an hour".'] }
    ]
  },
  'eng_gr_6': {
    ...data['eng_gr_6'],
    'examples': [
      { 'question': 'Split this sentence into subject and predicate: "The large cat slept on the mat."', 'steps': ['Who is it about? "The large cat" (Subject).', 'What happened? "slept on the mat" (Predicate).'], 'illustration': '[Subject] + [Predicate]' },
      { 'question': 'Identify the type of sentence: "Please close the door."', 'steps': ['It gives an order or request.', 'Therefore, it is an Imperative sentence.'] }
    ]
  },
  'eng_gr_7': {
    ...data['eng_gr_7'],
    'examples': [
      { 'question': 'Change to Passive: "Rahul painted the fence."', 'steps': ['Object "the fence" comes first.', 'Add "was painted by".', 'Result: "The fence was painted by Rahul."'], 'illustration': 'Actor -> Action -> Target (Active)' },
      { 'question': 'Change to Active: "The cake was eaten by the dog."', 'steps': ['The dog (doer) comes first.', 'Result: "The dog ate the cake."'] }
    ]
  },
  'eng_gr_10': {
    ...data['eng_gr_10'],
    'examples': [
      { 'question': 'Suggest a title and a moral for a story about an honest woodcutter.', 'steps': ['Title: "The Honest Woodcutter".', 'Moral: "Honesty is the best policy."'], 'illustration': 'Woodcutter with a golden axe' },
      { 'question': 'Write a beginning sentence for a story about a dragon.', 'steps': ['"Far beyond the misty mountains, in a cave made of blue ice, lived a dragon who was afraid of fire."'] }
    ]
  }
};

Object.assign(data, eng_ex);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('English with examples updated.');
