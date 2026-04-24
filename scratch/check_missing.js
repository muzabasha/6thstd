const curriculum = require('../src/data/curriculum.json');
const lessons = require('../src/data/lessons.json');
const allIds = [];
curriculum.subjects.forEach(s => s.chapters.forEach(c => c.topics.forEach(t => allIds.push({ id: t.id, title: t.title, subject: s.name }))));
const missing = allIds.filter(item => !lessons[item.id]);
console.log('Total curriculum topics:', allIds.length);
console.log('Missing from lessons.json:', missing.length);
missing.forEach(m => console.log(m.subject + ' | ' + m.id + ' | ' + m.title));
