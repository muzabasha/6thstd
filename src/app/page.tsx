"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import curriculumData from "@/data/curriculum.json";
import ProgressBar from "@/components/ProgressBar";
import { getSubjectColor, slugify } from "@/lib/utils";
import { getSubjectCompletionPercent, getProgress } from "@/lib/storage";

const ICONS: Record<string, string> = {
  BookOpen: "📗",
  Calculator: "📙",
  FlaskConical: "📕",
  Globe: "📒",
  Languages: "📘",
  Monitor: "💻",
  Lightbulb: "🔦",
};

type SubjectData = {
  name: string;
  icon: string;
  chapters: { title: string; topics: { id: string; title: string; description: string }[] }[];
};

export default function Dashboard() {
  const subjects = curriculumData.subjects as SubjectData[];

  const [progress, setProgress] = useState<Record<string, number>>({});
  const [totalDone, setTotalDone] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);

  useEffect(() => {
    const allTopics = subjects.reduce((acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0), 0);
    setTotalTopics(allTopics);

    const prog: Record<string, number> = {};
    let done = 0;
    subjects.forEach((s) => {
      const t = s.chapters.reduce((a, c) => a + c.topics.length, 0);
      const p = getSubjectCompletionPercent(s.name, t);
      prog[s.name] = p;
      done += Math.round((p / 100) * t);
    });
    setProgress(prog);
    setTotalDone(done);
  }, [subjects]);

  // Find last subject with progress for "continue" button
  const allProg = typeof window !== "undefined" ? getProgress() : {};
  let continueHref = `/learn/${slugify(subjects[0].name)}/${subjects[0].chapters[0].topics[0].id}`;
  for (const s of subjects) {
    const sp = allProg[s.name];
    if (sp) {
      const lastTopic = Object.keys(sp).at(-1);
      if (lastTopic) {
        continueHref = `/learn/${slugify(s.name)}/${lastTopic}`;
        break;
      }
    }
  }

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 60px" }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: "center", padding: "48px 0 40px" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: 12 }} className="animate-float">🌟</div>
        <h1 className="shimmer-text" style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem,5vw,3rem)",
          lineHeight: 1.15,
          marginBottom: 12,
        }}>
          Sadiya's Learning Hub
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 28px" }}>
          Class 6 CBSE · AI-Powered Learning · All Subjects 🚀
        </p>

        {/* Overall progress pill */}
        <div className="glass" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 28px",
          borderRadius: 99,
          marginBottom: 28,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#22d3ee" }}>{totalDone}</p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Topics Done</p>
          </div>
          <div style={{ width: 1, height: 36, background: "var(--glass-border)" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#a78bfa" }}>{totalTopics}</p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Total Topics</p>
          </div>
          <div style={{ width: 1, height: 36, background: "var(--glass-border)" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#34d399" }}>
              {totalTopics > 0 ? Math.round((totalDone / totalTopics) * 100) : 0}%
            </p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Complete</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={continueHref} className="btn-primary" style={{ textDecoration: "none" }}>
            ▶ Continue Learning
          </Link>
          <Link href="/quiz" className="btn-secondary" style={{ textDecoration: "none" }}>
            🧠 Random Quiz
          </Link>
        </div>
      </section>



      {/* ── Subject Cards ── */}
      <section>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.4rem", marginBottom: 20 }}>
          📚 Choose a Subject
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {subjects.map((subject, idx) => {
            const color = getSubjectColor(subject.name);
            const topicCount = subject.chapters.reduce((a, c) => a + c.topics.length, 0);
            const pct = progress[subject.name] ?? 0;

            return (
              <Link
                key={subject.name}
                href={`/subject/${slugify(subject.name)}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="glass glass-hover"
                  style={{
                    borderRadius: 20,
                    padding: 24,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    opacity: 0,
                    animation: `fadeInUp 0.55s ease forwards ${idx * 0.08}s`,
                  }}
                >
                  {/* Gradient sweep */}
                  <div style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: 120, height: 120,
                    background: color.bg,
                    opacity: 0.08,
                    borderRadius: "0 20px 0 100%",
                  }} />

                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 52, height: 52,
                      borderRadius: 14,
                      background: color.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.6rem",
                      boxShadow: `0 4px 20px ${color.glow}`,
                    }}>
                      {ICONS[subject.icon] ?? "📖"}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                        {subject.name}
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                        {subject.chapters.length} chapters · {topicCount} topics
                      </p>
                    </div>
                  </div>

                  <ProgressBar
                    percent={pct}
                    color={color.bg}
                    height={7}
                    showLabel={true}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                    <span style={{
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "var(--text-muted)",
                      maxWidth: "75%",
                    }}>
                      {subject.chapters[0].title}…
                    </span>
                    <span style={{
                      fontSize: "0.78rem",
                      color: color.text,
                      fontWeight: 700,
                    }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Quick Tips ── */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.4rem", marginBottom: 20 }}>
          💡 Learning Tips
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {[
            { icon: "🤖", tip: "Ask the AI tutor any question — it explains with real-life examples!" },
            { icon: "🎤", tip: "Use the voice button to speak your questions hands-free." },
            { icon: "🧠", tip: "Take quizzes after studying to remember topics longer." },
            { icon: "📈", tip: "Your progress is saved automatically — pick up where you left off!" },
          ].map((t, i) => (
            <div key={i} className="glass" style={{ borderRadius: 16, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem" }}>{t.icon}</span>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{t.tip}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
