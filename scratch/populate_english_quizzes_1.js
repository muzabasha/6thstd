const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const englishUpdates = {
  'eng_pr_1': {
    ...data['eng_pr_1'],
    'qa': [
      { 'q': 'Who is the main character of the story?', 'a': 'Patrick.' },
      { 'q': 'What did Patrick think his cat was playing with?', 'a': 'A little doll.' },
      { 'q': 'What was the doll actually?', 'a': 'A tiny man, an elf.' },
      { 'q': 'What promise did the elf make to Patrick?', 'a': 'To grant him a wish if he saved him from the cat.' },
      { 'q': 'What was Patrick\'s wish?', 'a': 'That the elf do all his homework until the end of the semester (35 days).' },
      { 'q': 'In which subjects did the elf need help?', 'a': 'Math, English, and History.' },
      { 'q': 'How did Patrick help the elf in History?', 'a': 'By reading out information from library books.' },
      { 'q': 'What did the elf call for in English?', 'a': 'A dictionary to look up words.' },
      { 'q': 'Did Patrick\'s grades improve?', 'a': 'Yes, he got A\'s.' },
      { 'q': 'What was the secret at the end?', 'a': 'Patrick had done the homework himself while helping the elf.' }
    ],
    'scenarios': [
      { 'q': 'If you found an elf, what one chore would you ask him to do?', 'a': 'Answers vary (e.g., cleaning the room, washing dishes).' },
      { 'q': 'Patrick started working hard. How did this change his personality?', 'a': 'He became a model boy, cleaned his room, and was cheerful.' },
      { 'q': 'Why do you think the elf kept asking for help?', 'a': 'To trick Patrick into studying and doing the work himself.' },
      { 'q': 'If the elf didn\'t know Math, how did Patrick help?', 'a': 'He had to stay up late, use a dictionary, and guide the elf.' },
      { 'q': 'How many days did the elf have to do the homework?', 'a': '35 days.' },
      { 'q': 'What would have happened if Patrick didn\'t help the elf?', 'a': 'The elf wouldn\'t have been able to finish the homework.' },
      { 'q': 'Is hard work better than magic?', 'a': 'Yes, because Patrick learned the subjects and improved himself.' },
      { 'q': 'How did the teachers feel about Patrick\'s change?', 'a': 'They were amazed and full of praise.' },
      { 'q': 'Why did the elf go away quietly?', 'a': 'Because the semester was over and there was no more homework.' },
      { 'q': 'What is the moral of the story?', 'a': 'Self-help is the best help.' }
    ]
  },
  'eng_pr_2': {
    ...data['eng_pr_2'],
    'qa': [
      { 'q': 'Why was the dog unhappy with his life?', 'a': 'He was tired of wandering alone and being afraid of stronger animals.' },
      { 'q': 'Who was the dog\'s first master?', 'a': 'A big Wolf.' },
      { 'q': 'Why did the dog leave the Wolf?', 'a': 'Because the Wolf was afraid of the Bear.' },
      { 'q': 'Who did the dog serve after the Wolf?', 'a': 'The Bear.' },
      { 'q': 'Why did the dog leave the Bear?', 'a': 'Because the Bear was afraid of the Lion.' },
      { 'q': 'Who is the king of the forest in this story?', 'a': 'The Lion.' },
      { 'q': 'Why did the dog finally leave the Lion?', 'a': 'Because the Lion was afraid of Man.' },
      { 'q': 'Who did the dog find to be the strongest on Earth?', 'a': 'Man.' },
      { 'q': 'Is the dog still man\'s servant?', 'a': 'Yes, he is man\'s most loyal servant.' },
      { 'q': 'What did the Lion do when he smelled a man?', 'a': 'He roared and backed away in fear.' }
    ],
    'scenarios': [
      { 'q': 'If the dog met a tiger, would he follow him? Why?', 'a': 'Only if the tiger was stronger than his current master.' },
      { 'q': 'Why is Man stronger than a Lion?', 'a': 'Because of intelligence and the ability to use tools/fire.' },
      { 'q': 'How does a dog show loyalty to its master?', 'a': 'By protecting them and following their commands.' },
      { 'q': 'Why did the dog want a "master"?', 'a': 'To get food and protection in exchange for service.' },
      { 'q': 'What would the dog do if he found someone stronger than Man?', 'a': 'He would likely try to serve them.' },
      { 'q': 'Why did the Bear run into the forest when he saw the Lion?', 'a': 'Because the Lion is the strongest beast in the forest.' },
      { 'q': 'Is it better to be a leader or a servant in this story?', 'a': 'The dog preferred being a servant to the strongest leader for safety.' },
      { 'q': 'How do wolves live today compared to dogs?', 'a': 'Wolves are wild and hunt, while dogs live with humans.' },
      { 'q': 'What does "loyal" mean in the context of the dog?', 'a': 'Faithful and devoted to his master.' },
      { 'q': 'Which animal did the dog think was strongest first?', 'a': 'The Wolf.' }
    ]
  },
  'eng_pr_3': {
    ...data['eng_pr_3'],
    'qa': [
      { 'q': 'What was Taro\'s profession?', 'a': 'Woodcutter.' },
      { 'q': 'Why did Taro want to earn more money?', 'a': 'To buy expensive sake for his shivering old father.' },
      { 'q': 'What did Taro find in the forest?', 'a': 'A beautiful, magical waterfall.' },
      { 'q': 'What did the waterfall liquid taste like?', 'a': 'Delicious sake.' },
      { 'q': 'Why did the villagers go to the waterfall?', 'a': 'They heard about the sake and wanted some for themselves.' },
      { 'q': 'What did the villagers get from the waterfall?', 'a': 'Nothing but cold water.' },
      { 'q': 'Why did Taro get sake while others got water?', 'a': 'Because he was a thoughtful and kind son.' },
      { 'q': 'Who rewarded Taro for his goodness?', 'a': 'The Emperor of Japan.' },
      { 'q': 'How many pieces of gold did the Emperor give Taro?', 'a': 'Twenty.' },
      { 'q': 'What was named after Taro in the city?', 'a': 'A beautiful fountain.' }
    ],
    'scenarios': [
      { 'q': 'If you found a magical waterfall, what would you want it to give?', 'a': 'Answers vary (e.g., juice, chocolate milk).' },
      { 'q': 'Why were the villagers angry at the waterfall?', 'a': 'Because they felt tricked when they only got plain water.' },
      { 'q': 'Taro worked harder the next day. What does this show?', 'a': 'His dedication to his parents.' },
      { 'q': 'Is greed good or bad? Use the story to explain.', 'a': 'Bad, because the greedy villagers got nothing while Taro got a reward.' },
      { 'q': 'How did the sake affect Taro\'s father?', 'a': 'It made him warm and he did a little dance in the middle of the floor.' },
      { 'q': 'Why did the Emperor reward Taro?', 'a': 'To encourage all children to honor and obey their parents.' },
      { 'q': 'What would you do if you were one of the villagers?', 'a': 'Answers vary (e.g., try to be kind like Taro).' },
      { 'q': 'How did the story of Taro spread?', 'a': 'Through a neighbor who drank the sake and told the whole village.' },
      { 'q': 'Was the waterfall really magical?', 'a': 'Yes, it responded to the quality of a person\'s heart.' },
      { 'q': 'What is the most important lesson from Taro\'s story?', 'a': 'Kindness and devotion to parents are great virtues.' }
    ]
  }
};

Object.assign(data, englishUpdates);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('English Prose 1-3 Quiz updated.');
