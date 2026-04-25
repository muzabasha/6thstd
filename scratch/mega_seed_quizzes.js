const fs = require('fs');
const lessonsPath = 'src/data/lessons.json';
const curriculumPath = 'src/data/curriculum.json';

const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

let updatedCount = 0;

curriculum.subjects.forEach(subject => {
  subject.chapters.forEach(chapter => {
    chapter.topics.forEach(topic => {
      if (!lessons[topic.id]) {
        lessons[topic.id] = { what: topic.description, points: [], tip: 'Keep learning!', question: 'What did you learn today?' };
      }
      
      const lesson = lessons[topic.id];
      
      if (!lesson.qa || lesson.qa.length < 5) {
        lesson.qa = [
          { q: `What is the main idea of "${topic.title}"?`, a: topic.description },
          { q: `Why is "${topic.title}" important to study?`, a: `It helps us understand more about ${subject.name}.` },
          { q: `Can you name one key term from "${topic.title}"?`, a: `One key term is ${topic.title.split(' ')[0]}.` },
          { q: `What is a real-life application of "${topic.title}"?`, a: `We can see this in our daily interactions with ${subject.name}.` },
          { q: `How does "${topic.title}" connect to the previous chapter?`, a: `It builds upon our basic knowledge of ${chapter.title}.` },
          { q: `What is the most interesting fact about "${topic.title}"?`, a: `That it explains ${topic.description.toLowerCase()}.` },
          { q: `Who would find "${topic.title}" most useful?`, a: `Students and experts in ${subject.name}.` },
          { q: `Is "${topic.title}" easy to understand?`, a: `Yes, with practice and reading!` },
          { q: `Where can we find more information about "${topic.title}"?`, a: `In our textbooks and online resources.` },
          { q: `What is the summary of "${topic.title}"?`, a: topic.description }
        ];
        updatedCount++;
      }

      if (!lesson.scenarios || lesson.scenarios.length < 5) {
        lesson.scenarios = [
          { q: `Imagine you are explaining "${topic.title}" to a friend. What would you say?`, a: `I would tell them that it is about ${topic.description}.` },
          { q: `If you were a teacher, how would you test someone on "${topic.title}"?`, a: `I would ask them to define the main concepts and give examples.` },
          { q: `How would you use the knowledge of "${topic.title}" in a project?`, a: `I would include it as a key section in my report.` },
          { q: `What would happen if we didn't know about "${topic.title}"?`, a: `We would lack understanding of this part of ${subject.name}.` },
          { q: `Find an object in your house related to "${topic.title}". What is it?`, a: `Answers depend on the topic!` },
          { q: `Why do you think "${topic.title}" is in the 6th grade syllabus?`, a: `To provide a strong foundation for future learning.` },
          { q: `How has your thinking changed after learning about "${topic.title}"?`, a: `I now understand ${topic.description.split(' — ')[0]} better.` },
          { q: `If "${topic.title}" was a movie, what would the title be?`, a: `Maybe "The Secrets of ${topic.title}".` },
          { q: `Draw a simple diagram representing "${topic.title}". What would it include?`, a: `It would show the main components mentioned in the description.` },
          { q: `What is one question you still have about "${topic.title}"?`, a: `Answers vary - keep exploring!` }
        ];
        updatedCount++;
      }
    });
  });
});

fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2));
console.log(`Mega population complete. Updated ${updatedCount} topics with base questions.`);
