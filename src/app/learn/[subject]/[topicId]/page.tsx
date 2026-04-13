import { notFound } from "next/navigation";
import curriculumData from "@/data/curriculum.json";
import { slugify } from "@/lib/utils";
import LearnClient from "@/components/LearnClient";

type Topic = { id: string; title: string; description: string };
type Chapter = { title: string; topics: Topic[] };
type SubjectData = { name: string; icon: string; chapters: Chapter[] };

export async function generateStaticParams() {
  const subjects = curriculumData.subjects as SubjectData[];
  const paths: { subject: string; topicId: string }[] = [];

  subjects.forEach((subject) => {
    const subjectSlug = slugify(subject.name);
    subject.chapters.forEach((chapter) => {
      chapter.topics.forEach((topic) => {
        paths.push({
          subject: subjectSlug,
          topicId: topic.id,
        });
      });
    });
  });

  return paths;
}

export default async function LearnPage({ params }: { params: Promise<{ subject: string; topicId: string }> }) {
  const { subject: subjectSlug, topicId } = await params;
  const subjects = curriculumData.subjects as SubjectData[];

  const subject = subjects.find((s) => slugify(s.name) === subjectSlug);
  if (!subject) notFound();

  let foundTopic: Topic | null = null;
  let foundChapter: Chapter | null = null;
  for (const ch of subject.chapters) {
    const t = ch.topics.find((tp) => tp.id === topicId);
    if (t) { foundTopic = t; foundChapter = ch; break; }
  }
  if (!foundTopic || !foundChapter) notFound();

  const allTopics = subject.chapters.flatMap((c) => c.topics);
  const currentIdx = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  return (
    <LearnClient 
      subjectName={subject.name}
      subjectSlug={subjectSlug}
      topic={foundTopic}
      chapter={foundChapter}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
    />
  );
}
