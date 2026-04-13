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
  const [key, setKey] = useState(0); // force remount on new quiz

  const startRandom = () => {
    setTarget(pickRandom());
    setKey((k) => k + 1);
  };

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 60px" }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <button className="btn-secondary" style={{ marginBottom: 24, fontSize: "0.85rem" }}>
          ← Back to Dashboard
        </button>
      </Link>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: "3rem", marginBottom: 8 }} className="animate-float">🧠</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.8rem", marginBottom: 8 }}>
          Quiz Arena
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Pick a subject and topic — or let AI surprise you!
        </p>
      </div>

      {/* Random Quiz Button */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <button className="btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }} onClick={startRandom}>
          🎲 Random Quiz
        </button>
        {target && (
          <p style={{ marginTop: 10, color: "var(--text-muted)", fontSize: "0.82rem" }}>
            Topic: <strong style={{ color: "var(--text-primary)" }}>{target.topic.title}</strong> · {target.subject}
          </p>
        )}
      </div>

      {/* Quiz by subject/topic selector */}
      {!target && (
        <div>
          <h2 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 16, textAlign: "center" }}>
            Or pick a specific topic:
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {subjects.map((s) => {
              const color = getSubjectColor(s.name);
              return (
                <div key={s.name} className="glass" style={{ borderRadius: 16, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: color.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }}>
                      {ICONS[s.icon] ?? "📖"}
                    </div>
                    <strong style={{ fontSize: "0.9rem" }}>{s.name}</strong>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
                    {s.chapters.flatMap((ch) =>
                      ch.topics.map((tp) => (
                        <button
                          key={tp.id}
                          onClick={() => { setTarget({ subject: s.name, topic: tp }); setKey((k) => k + 1); }}
                          style={{
                            textAlign: "left",
                            padding: "6px 10px",
                            borderRadius: 8,
                            border: "1px solid var(--glass-border)",
                            background: "transparent",
                            color: "var(--text-secondary)",
                            fontSize: "0.78rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "var(--bg-card-hover)"; (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
                        >
                          {tp.title}
                        </button>
                      ))
                    )}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Link
                      href={`/subject/${slugify(s.name)}`}
                      style={{ fontSize: "0.75rem", color: color.text, textDecoration: "none", fontWeight: 600 }}
                    >
                      Study first →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Quiz */}
      {target && (
        <div key={key}>
          <QuizCard subject={target.subject} topic={target.topic.title} topicId={target.topic.id} />
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button className="btn-secondary" style={{ fontSize: "0.85rem" }} onClick={() => setTarget(null)}>
              Choose Different Topic
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
