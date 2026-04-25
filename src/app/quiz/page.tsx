"use client";

import { useState } from "react";
import Link from "next/link";
import curriculumData from "@/data/curriculum.json";
import QuizCard from "@/components/QuizCard";
import { getSubjectColor, slugify } from "@/lib/utils";

type Topic = { id: string; title: string; description: string };
type SubjectData = {
  name: string;
  icon: string;
  chapters: { title: string; topics: Topic[] }[];
};

const subjects = curriculumData.subjects as SubjectData[];

const ICONS: Record<string, string> = {
  BookOpen: "📗", Calculator: "📙", FlaskConical: "📕",
  Globe: "📒", Languages: "📘", Monitor: "💻", Lightbulb: "🔦",
};

interface QuizTarget { subject: string; topic: Topic }

function pickRandom(): QuizTarget {
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  const ch = s.chapters[Math.floor(Math.random() * s.chapters.length)];
  const tp = ch.topics[Math.floor(Math.random() * ch.topics.length)];
  return { subject: s.name, topic: tp };
}

export default function QuizPage() {
  const [target, setTarget] = useState<QuizTarget | null>(null);
  const [key, setKey] = useState(0);

  const startRandom = () => {
    setTarget(pickRandom());
    setKey((k) => k + 1);
  };

  return (
    <div className="page-wrapper-md" style={{ maxWidth: 800 }}>

      {/* Back link */}
      <Link href="/" className="no-underline">
        <button className="btn-secondary" style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
          ← Back to Dashboard
        </button>
      </Link>

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="text-center" style={{ marginBottom: "2.25rem" }}>
        <div className="animate-float inline-block" style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🧠</div>
        <h1
          className="font-['Poppins']"
          style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 2rem)", marginBottom: "0.5rem" }}
        >
          Quiz Arena
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.82rem, 2.5vw, 0.95rem)" }}>
          Pick a subject and topic — or let AI surprise you!
        </p>
      </div>

      {/* ── Random quiz CTA ───────────────────────────────────── */}
      <div className="text-center" style={{ marginBottom: "2rem" }}>
        <button
          className="btn-primary"
          style={{ fontSize: "1rem", padding: "14px 36px" }}
          onClick={startRandom}
        >
          🎲 Random Quiz
        </button>
        {target && (
          <p
            style={{
              marginTop: "0.625rem",
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              lineHeight: 1.5,
            }}
          >
            Topic:{" "}
            <strong style={{ color: "var(--text-primary)" }}>{target.topic.title}</strong>
            {" · "}
            {target.subject}
          </p>
        )}
      </div>

      {/* ── Active Quiz ───────────────────────────────────────── */}
      {target && (
        <div key={key} className="animate-fade-in-up">
          <QuizCard subject={target.subject} topic={target.topic.title} topicId={target.topic.id} />
          <div className="text-center" style={{ marginTop: "1rem" }}>
            <button
              className="btn-secondary"
              style={{ fontSize: "0.85rem" }}
              onClick={() => setTarget(null)}
            >
              Choose Different Topic
            </button>
          </div>
        </div>
      )}

      {/* ── Subject/topic selector (shown when no active quiz) ── */}
      {!target && (
        <div className="animate-fade-in-up">
          <h2
            className="font-['Poppins']"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 1.15rem)",
              marginBottom: "1rem",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            Or pick a specific topic:
          </h2>

          <div className="quiz-subject-grid">
            {subjects.map((s, idx) => {
              const color = getSubjectColor(s.name);
              return (
                <div
                  key={s.name}
                  className="glass rounded-2xl opacity-0"
                  style={{
                    padding: "1rem",
                    animation: `fadeInUp 0.45s ease forwards ${idx * 0.06}s`,
                  }}
                >
                  {/* Subject header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: color.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.1rem",
                        boxShadow: `0 4px 12px ${color.glow}`,
                        flexShrink: 0,
                      }}
                    >
                      {ICONS[s.icon] ?? "📖"}
                    </div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      {s.name}
                    </strong>
                  </div>

                  {/* Topic list */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      maxHeight: 210,
                      overflowY: "auto",
                      marginBottom: 10,
                    }}
                  >
                    {s.chapters.flatMap((ch) =>
                      ch.topics.map((tp) => (
                        <button
                          key={tp.id}
                          className="quiz-topic-btn"
                          onClick={() => { setTarget({ subject: s.name, topic: tp }); setKey((k) => k + 1); }}
                        >
                          {tp.title}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Study first link */}
                  <Link
                    href={`/subject/${slugify(s.name)}`}
                    className="no-underline"
                    style={{ fontSize: "0.75rem", color: color.text, fontWeight: 700 }}
                  >
                    📖 Study first →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
