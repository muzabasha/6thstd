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
    setPct(getSubjectCompletionPercent(subject.name, totalTopics));
    setProg(getSubjectProgress(subject.name));
  }, [subject.name, totalTopics]);

  let topicIndex = 0;

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">

      {/* Back breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="btn-secondary px-3 py-1.5 text-xs no-underline">
          ← Home
        </Link>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-secondary)] font-bold">{subject.name}</span>
      </div>

      {/* Subject hero */}
      <div className="glass rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.07] rounded-bl-[80px] pointer-events-none"
          style={{ background: color.bg }} />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 relative z-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: color.bg, boxShadow: `0 8px 28px ${color.glow}` }}
          >
            {ICONS[subject.icon] ?? "📖"}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-['Poppins'] font-extrabold mb-1"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}>
              {subject.name}
            </h1>
            <p className="text-[var(--text-muted)] text-sm font-medium">
              {subject.chapters.length} chapters · {totalTopics} topics
            </p>
          </div>
        </div>

        <ProgressBar percent={pct} color={color.bg} label="Overall progress" />
      </div>

      {/* Chapters */}
      <div className="space-y-10">
        {subject.chapters.map((chapter) => (
          <div key={chapter.title}>
            <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2"
              style={{ color: color.text }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color.bg }} />
              {chapter.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    </div>
  );
}
