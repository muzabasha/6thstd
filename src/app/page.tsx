"use client";

import { useEffect, useState } from "react";
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

function loadDashboardData(subjects: SubjectData[]) {
  const allTopics = subjects.reduce(
    (acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0), 0
  );
  const prog: Record<string, number> = {};
  let done = 0;
  subjects.forEach((s) => {
    const t = s.chapters.reduce((a, c) => a + c.topics.length, 0);
    const p = getSubjectCompletionPercent(s.name, t);
    prog[s.name] = p;
    done += Math.round((p / 100) * t);
  });
  return { allTopics, prog, done };
}

const TIPS = [
  { icon: "🤖", title: "AI Tutor", body: "Ask any question — get real-life explanations instantly." },
  { icon: "🎤", title: "Voice Input", body: "Speak your questions hands-free with the mic button." },
  { icon: "🧠", title: "Quiz Mode", body: "10 questions per topic with instant feedback." },
  { icon: "📈", title: "Progress", body: "Your progress saves automatically — pick up anytime." },
];

export default function Dashboard() {
  const subjects = curriculumData.subjects as SubjectData[];

  const [dash, setDash] = useState({
    allTopics: 0,
    prog: {} as Record<string, number>,
    done: 0,
  });

  useEffect(() => {
    setDash(loadDashboardData(subjects));
  }, [subjects]);

  const { allTopics: totalTopics, prog: progress, done: totalDone } = dash;
  const overallPct = totalTopics > 0 ? Math.round((totalDone / totalTopics) * 100) : 0;

  // "Continue" deep-link
  const allProg = typeof window !== "undefined" ? getProgress() : {};
  let continueHref = `/learn/${slugify(subjects[0].name)}/${subjects[0].chapters[0].topics[0].id}`;
  for (const s of subjects) {
    const sp = allProg[s.name];
    if (sp) {
      const last = Object.keys(sp).at(-1);
      if (last) { continueHref = `/learn/${slugify(s.name)}/${last}`; break; }
    }
  }

  return (
    <div className="page-wrapper">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center mb-12">
        <div
          className="animate-float inline-block"
          style={{ fontSize: "clamp(3rem, 10vw, 5rem)", marginBottom: "1.25rem" }}
          aria-hidden="true"
        >
          🌟
        </div>

        <h1
          className="shimmer-text font-['Poppins'] font-extrabold leading-tight mb-3"
          style={{ fontSize: "clamp(1.75rem, 6vw, 3.2rem)" }}
        >
          Sadiya&apos;s Learning Hub
        </h1>

        <p
          className="text-[var(--text-secondary)] mb-8 mx-auto"
          style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)", maxWidth: 460 }}
        >
          Class 6 CBSE · NEP 2020 · All Subjects 🚀
        </p>

        {/* Stats row */}
        <div
          className="glass inline-grid rounded-2xl mb-8 overflow-hidden"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            borderRadius: "1rem",
            maxWidth: "100%",
          }}
        >
          {[
            { value: totalDone, label: "Done", color: "#22d3ee" },
            { value: totalTopics, label: "Topics", color: "#a78bfa" },
            { value: `${overallPct}%`, label: "Complete", color: "#34d399" },
          ].map(({ value, label, color }, i) => (
            <div
              key={label}
              className="text-center"
              style={{
                padding: "clamp(0.75rem, 3vw, 1.25rem) clamp(1rem, 4vw, 1.75rem)",
                borderRight: i < 2 ? "1px solid var(--glass-border)" : "none",
              }}
            >
              <p
                className="font-black"
                style={{ fontSize: "clamp(1.4rem, 5vw, 2.25rem)", color, lineHeight: 1 }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "0.25rem",
                  fontWeight: 700,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div style={{ maxWidth: 380, margin: "0 auto 2rem" }}>
          <ProgressBar percent={overallPct} showLabel={false} height={6} />
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={continueHref} className="btn-primary no-underline" style={{ width: "100%", maxWidth: 280 }}>
            ▶&nbsp; Continue Learning
          </Link>
          <Link href="/quiz" className="btn-secondary no-underline" style={{ width: "100%", maxWidth: 280 }}>
            🧠&nbsp; Random Quiz
          </Link>
        </div>

        {/* Responsive CTA: side-by-side on sm+ */}
        <style>{`
          @media (min-width: 480px) {
            .hero-ctas { flex-direction: row !important; }
            .hero-ctas a { width: auto !important; max-width: none !important; }
          }
        `}</style>
      </section>

      {/* ── Subject Grid ─────────────────────────────────────── */}
      <section className="mb-14">
        <h2
          className="font-['Poppins'] font-bold mb-6 flex items-center gap-2"
          style={{ fontSize: "clamp(1rem, 3vw, 1.35rem)" }}
        >
          📚 Choose a Subject
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(0.75rem, 2vw, 1.25rem)",
          }}
        >
          {subjects.map((subject, idx) => {
            const color = getSubjectColor(subject.name);
            const topicCnt = subject.chapters.reduce((a, c) => a + c.topics.length, 0);
            const pct = progress[subject.name] ?? 0;

            return (
              <Link
                key={subject.name}
                href={`/subject/${slugify(subject.name)}`}
                className="no-underline block group"
              >
                <div
                  className="glass glass-hover rounded-2xl relative overflow-hidden flex flex-col opacity-0 h-full"
                  style={{
                    padding: "clamp(1rem, 3vw, 1.35rem)",
                    gap: "1rem",
                    animation: `fadeInUp 0.5s ease forwards ${idx * 0.07}s`,
                  }}
                >
                  {/* Colour sweep */}
                  <div
                    className="absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] opacity-[0.08] pointer-events-none"
                    style={{ background: color.bg }}
                  />

                  {/* Header row */}
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        width: "clamp(2.5rem, 8vw, 3rem)",
                        height: "clamp(2.5rem, 8vw, 3rem)",
                        background: color.bg,
                        boxShadow: `0 6px 20px ${color.glow}`,
                        fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                      }}
                    >
                      {ICONS[subject.icon] ?? "📖"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-base text-[var(--text-primary)] truncate">
                        {subject.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5">
                        {subject.chapters.length} chapters · {topicCnt} topics
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto">
                    <ProgressBar percent={pct} color={color.bg} height={6} showLabel />
                  </div>

                  {/* Footer row */}
                  <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[70%] font-medium">
                      {subject.chapters[0].title}
                    </span>
                    <span className="text-xs font-black shrink-0" style={{ color: color.text }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Learning Tips ─────────────────────────────────────── */}
      <section>
        <h2
          className="font-['Poppins'] font-bold mb-5 flex items-center gap-2"
          style={{ fontSize: "clamp(1rem, 3vw, 1.35rem)" }}
        >
          💡 How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(0.75rem, 2vw, 1rem)",
          }}
        >
          {TIPS.map((t, idx) => (
            <div
              key={t.title}
              className="glass rounded-2xl flex gap-4 items-start opacity-0"
              style={{
                padding: "clamp(1rem, 3vw, 1.25rem)",
                transition: "background 0.2s",
                animation: `fadeInUp 0.5s ease forwards ${idx * 0.08 + 0.3}s`,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
            >
              <span className="shrink-0 mt-0.5" style={{ fontSize: "clamp(1.5rem, 5vw, 1.875rem)" }}>
                {t.icon}
              </span>
              <div>
                <p className="font-black text-sm text-[var(--text-primary)] mb-1">{t.title}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
