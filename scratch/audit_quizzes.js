const fs = require('fs');
const lessonsPath = 'src/data/lessons.json';
const curriculumPath = 'src/data/curriculum.json';

const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

const report = [];

curriculum.subjects.forEach(subject => {
  subject.chapters.forEach(chapter => {
    chapter.topics.forEach(topic => {
      const lesson = lessons[topic.id] || {};
      const qaCount = (lesson.qa || []).length;
      const scenarioCount = (lesson.scenarios || []).length;
      const total = qaCount + scenarioCount;
      
      if (total < 10) {
        report.push({
          id: topic.id,
          subject: subject.name,
          chapter: chapter.title,
          title: topic.title,
          qa: qaCount,
          scenarios: scenarioCount,
          total: total
        });
      }
    });
  });
});

console.log(JSON.stringify(report, null, 2));
