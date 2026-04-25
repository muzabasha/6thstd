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
    <div className="page-wrapper-md">

      {/* ── Back breadcrumb ─────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-6" style={{ fontSize: "0.875rem" }}>
        <Link href="/" className="btn-secondary no-underline" style={{ padding: "0.35rem 0.875rem", fontSize: "0.8rem" }}>
          ← Home
        </Link>
        <span style={{ color: "var(--text-muted)" }}>/</span>
        <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>{subject.name}</span>
      </div>

      {/* ── Subject hero ─────────────────────────────────────── */}
      <div className="glass rounded-2xl relative overflow-hidden mb-8" style={{ padding: "clamp(1.25rem, 4vw, 2rem)" }}>
        {/* Color sweep */}
        <div
          className="absolute top-0 right-0 opacity-[0.07] rounded-bl-[80px] pointer-events-none"
          style={{ width: "clamp(100px, 20vw, 160px)", height: "clamp(100px, 20vw, 160px)", background: color.bg }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 relative z-10">
          <div
            className="rounded-2xl flex items-center justify-center shrink-0"
            style={{
              width: "clamp(3.5rem, 12vw, 4.5rem)",
              height: "clamp(3.5rem, 12vw, 4.5rem)",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              background: color.bg,
              boxShadow: `0 8px 28px ${color.glow}`,
            }}
          >
            {ICONS[subject.icon] ?? "📖"}
          </div>
          <div className="text-center sm:text-left">
            <h1
              className="font-['Poppins'] font-extrabold mb-1"
              style={{ fontSize: "clamp(1.4rem, 5vw, 2.2rem)" }}
            >
              {subject.name}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 600 }}>
              {subject.chapters.length} chapters · {totalTopics} topics
            </p>
          </div>
        </div>

        <ProgressBar percent={pct} color={color.bg} label="Overall progress" />
      </div>

      {/* ── Chapters ─────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {subject.chapters.map((chapter, chIdx) => (
          <div key={chapter.title}>
            {/* Chapter heading */}
            <div className="chapter-heading" style={{ color: color.text }}>
              {/* Chapter number badge */}
              <span
                className="flex items-center justify-center font-black shrink-0"
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "50%",
                  background: color.bg,
                  color: "#fff",
                  fontSize: "0.7rem",
                  boxShadow: `0 4px 12px ${color.glow}`,
                }}
              >
                {chIdx + 1}
              </span>
              <span className="truncate">{chapter.title}</span>
              <span
                className="ml-auto shrink-0 font-bold"
                style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}
              >
                {chapter.topics.length} topic{chapter.topics.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Topic cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: "clamp(0.625rem, 2vw, 0.875rem)",
              }}
            >
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
