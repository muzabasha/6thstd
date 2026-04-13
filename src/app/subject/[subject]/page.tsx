"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import curriculumData from "@/data/curriculum.json";
import TopicCard from "@/components/TopicCard";
import ProgressBar from "@/components/ProgressBar";
import { getSubjectColor, slugify } from "@/lib/utils";
import { getSubjectProgress, getSubjectCompletionPercent } from "@/lib/storage";


type SubjectData = {
  name: string;
  icon: string;
  chapters: { title: string; topics: { id: string; title: string; description: string }[] }[];
};

const ICONS: Record<string, string> = {
  BookOpen: "📗", Calculator: "📙", FlaskConical: "📕",
  Globe: "📒", Languages: "📘", Monitor: "💻", Lightbulb: "🔦",
};

export default function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = use(params);
  const subjects = curriculumData.subjects as SubjectData[];
  const subject = subjects.find((s) => slugify(s.name) === subjectSlug);
  if (!subject) notFound();

  const color = getSubjectColor(subject.name);
  const totalTopics = subject.chapters.reduce((a, c) => a + c.topics.length, 0);
  const pct = getSubjectCompletionPercent(subject.name, totalTopics);
  const prog = getSubjectProgress(subject.name);

  let topicIndex = 0;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>
      {/* Back */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <button className="btn-secondary" style={{ marginBottom: 24, fontSize: "0.85rem" }}>
          ← Back to Dashboard
        </button>
      </Link>

      {/* Hero */}
      <div className="glass" style={{ borderRadius: 24, padding: "28px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 200, height: 200,
          background: color.bg, opacity: 0.07,
          borderRadius: "0 24px 0 100%",
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 60, height: 60,
            borderRadius: 16,
            background: color.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.8rem",
            boxShadow: `0 6px 24px ${color.glow}`,
          }}>
            {ICONS[subject.icon] ?? "📖"}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.6rem" }}>
              {subject.name}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              {subject.chapters.length} chapters · {totalTopics} topics
            </p>
          </div>
        </div>
        <ProgressBar percent={pct} color={color.bg} label="Overall progress" />
      </div>

      {/* Chapters */}
      {subject.chapters.map((chapter) => (
        <div key={chapter.title} style={{ marginBottom: 32 }}>
          <h2 style={{
            fontWeight: 700, fontSize: "1.05rem",
            marginBottom: 12,
            color: color.text,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{
              display: "inline-block",
              width: 8, height: 8, borderRadius: "50%",
              background: color.bg,
            }} />
            {chapter.title}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {chapter.topics.map((t) => {
              const tp = prog[t.id];
              topicIndex++;
              return (
                <TopicCard
                  key={t.id}
                  subjectName={subject.name}
                  chapterTitle={chapter.title}
                  topicId={t.id}
                  topicTitle={t.title}
                  topicDescription={t.description}
                  completed={tp?.completed}
                  quizScore={tp?.quizScore}
                  quizTotal={tp?.quizTotal}
                  index={topicIndex}
                />
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
