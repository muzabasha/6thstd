const fs = require('fs');
const path = require('path');

const lessonsPath = 'src/data/lessons.json';
const curriculumPath = 'src/data/curriculum.json';

const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

const audit = {
  summary: {
    totalTopics: 0,
    topicsInLessons: 0,
    topicsMissing: 0,
    topicsWithFewQA: 0, // < 10
    topicsWithFewScenarios: 0, // < 10
  },
  bySubject: {},
  missingTopicIds: []
};

curriculum.subjects.forEach(subject => {
  audit.bySubject[subject.name] = { total: 0, missing: 0, thinQA: 0, thinScenarios: 0 };
  
  subject.chapters.forEach(chapter => {
    chapter.topics.forEach(topic => {
      audit.summary.totalTopics++;
      audit.bySubject[subject.name].total++;
      
      const lesson = lessons[topic.id];
      if (!lesson) {
        audit.summary.topicsMissing++;
        audit.bySubject[subject.name].missing++;
        audit.missingTopicIds.push(topic.id);
      } else {
        audit.summary.topicsInLessons++;
        
        if (!lesson.qa || lesson.qa.length < 10) {
          audit.summary.topicsWithFewQA++;
          audit.bySubject[subject.name].thinQA++;
        }
        
        if (!lesson.scenarios || lesson.scenarios.length < 10) {
          audit.summary.topicsWithFewScenarios++;
          audit.bySubject[subject.name].thinScenarios++;
        }
      }
    });
  });
});

console.log('--- CURRICULUM AUDIT REPORT ---');
console.log(JSON.stringify(audit.summary, null, 2));
console.log('\n--- BY SUBJECT ---');
console.table(audit.bySubject);

if (audit.missingTopicIds.length > 0) {
  console.log('\n--- MISSING TOPIC IDs ---');
  console.log(audit.missingTopicIds.join(', '));
}

fs.writeFileSync('scratch/audit_report.json', JSON.stringify(audit, null, 2));
