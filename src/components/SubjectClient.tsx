"use client";

import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import ProgressBar from "@/components/ProgressBar";
import { getSubjectColor } from "@/lib/utils";
import { getSubjectProgress, getSubjectCompletionPercent } from "@/lib/storage";
import { useEffect, useState } from "react";
import type { SubjectProgress } from "@/lib/storage";

type SubjectData = {
  name: string;
  icon: string;
  chapters: { title: string; topics: { id: string; title: string; description: string }[] }[];
};

const ICONS: Record<string, string> = {
  BookOpen: "📗", Calculator: "📙", FlaskConical: "📕",
  Globe: "📒", Languages: "📘", Monitor: "💻", Lightbulb: "🔦",
};

export default function SubjectClient({ subject }: { subject: SubjectData; subjectSlug: string }) {
  const color = getSubjectColor(subject.name);
  const totalTopics = subject.chapters.reduce((a, c) => a + c.topics.length, 0);

  const [pct, setPct] = useState(0);
  const [prog, setProg] = useState<SubjectProgress>({});

  useEffect(() => {
    // Batch both state updates to avoid cascading renders
    const nextPct = getSubjectCompletionPercent(subject.name, totalTopics);
    const nextProg = getSubjectProgress(subject.name);
    setPct(nextPct);
    setProg(nextProg);
  }, [subject.name, totalTopics]);

  let topicIndex = 0;

  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20">
      {/* Back */}
      <Link href="/" className="no-underline block mb-6">
        <button className="btn-secondary text-[13px] sm:text-sm px-4 py-2 flex items-center gap-2">
          ← Back to Dashboard
        </button>
      </Link>

      {/* Hero */}
      <div className="glass rounded-[24px] p-6 sm:p-10 mb-8 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-40 h-40 sm:w-56 sm:h-56 opacity-[0.07] rounded-bl-[100px]"
          style={{ background: color.bg }}
        />
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 relative z-10 text-center sm:text-left">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0"
            style={{ background: color.bg, boxShadow: `0 8px 32px ${color.glow}` }}
          >
            {ICONS[subject.icon] ?? "📖"}
          </div>
          <div>
            <h1 className="font-['Poppins'] font-extrabold text-2xl sm:text-4xl mb-2">{subject.name}</h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base font-medium">
              {subject.chapters.length} chapters · {totalTopics} topics
            </p>
          </div>
        </div>
        <div className="max-w-[600px]">
          <ProgressBar percent={pct} color={color.bg} label="Overall progress" />
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-10">
        {subject.chapters.map((chapter) => (
          <div key={chapter.title}>
            <h2 className="font-bold text-lg sm:text-xl mb-4 flex items-center gap-3" style={{ color: color.text }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color.bg }} />
              {chapter.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
      </div>
    </main>
  );
}
