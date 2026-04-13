// lib/storage.ts
// LocalStorage-based progress tracking — no database needed

export interface TopicProgress {
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  quizTotal?: number;
}

export interface SubjectProgress {
  [topicId: string]: TopicProgress;
}

export interface AllProgress {
  [subjectName: string]: SubjectProgress;
}

const KEY = "sadiya_progress_v1";

function load(): AllProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as AllProgress;
  } catch {
    return {};
  }
}

function save(data: AllProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function markTopicComplete(subjectName: string, topicId: string) {
  const data = load();
  if (!data[subjectName]) data[subjectName] = {};
  data[subjectName][topicId] = {
    ...data[subjectName][topicId],
    completed: true,
    completedAt: new Date().toISOString(),
  };
  save(data);
}

export function saveQuizScore(
  subjectName: string,
  topicId: string,
  score: number,
  total: number
) {
  const data = load();
  if (!data[subjectName]) data[subjectName] = {};
  if (!data[subjectName][topicId]) data[subjectName][topicId] = { completed: false };
  data[subjectName][topicId].quizScore = score;
  data[subjectName][topicId].quizTotal = total;
  if (score / total >= 0.6) {
    data[subjectName][topicId].completed = true;
    data[subjectName][topicId].completedAt = new Date().toISOString();
  }
  save(data);
}

export function getProgress(): AllProgress {
  return load();
}

export function getSubjectProgress(subjectName: string): SubjectProgress {
  return load()[subjectName] ?? {};
}

export function getSubjectCompletionPercent(
  subjectName: string,
  totalTopics: number
): number {
  if (totalTopics === 0) return 0;
  const prog = getSubjectProgress(subjectName);
  const done = Object.values(prog).filter((t) => t.completed).length;
  return Math.round((done / totalTopics) * 100);
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
