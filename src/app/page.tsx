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
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="text-center mb-12">
        <div className="text-6xl mb-5 animate-float inline-block">🌟</div>

        <h1 className="shimmer-text font-['Poppins'] font-extrabold leading-tight mb-3"
          style={{ fontSize: "clamp(1.9rem, 6vw, 3.2rem)" }}>
          Sadiya&apos;s Learning Hub
        </h1>

        <p className="text-[var(--text-secondary)] mb-8 mx-auto"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", maxWidth: 480 }}>
          Class 6 CBSE · NEP 2020 · All Subjects 🚀
        </p>

        {/* Stats row */}
        <div className="glass inline-grid grid-cols-3 divide-x divide-[var(--glass-border)] rounded-2xl mb-8 overflow-hidden">
          {[
            { value: totalDone, label: "Done", color: "#22d3ee" },
            { value: totalTopics, label: "Topics", color: "#a78bfa" },
            { value: `${overallPct}%`, label: "Complete", color: "#34d399" },
          ].map(({ value, label, color }) => (
            <div key={label} className="px-6 py-4 text-center">
              <p className="font-black text-2xl sm:text-3xl" style={{ color }}>{value}</p>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-widest mt-0.5 font-bold">{label}</p>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="max-w-sm mx-auto mb-8">
          <ProgressBar percent={overallPct} showLabel={false} height={6} />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={continueHref} className="btn-primary no-underline">
            ▶&nbsp; Continue Learning
          </Link>
          <Link href="/quiz" className="btn-secondary no-underline">
            🧠&nbsp; Random Quiz
          </Link>
        </div>
      </section>

      {/* ── Subject Grid ─────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="font-['Poppins'] font-bold mb-6 flex items-center gap-2"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}>
          📚 Choose a Subject
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                  className="glass glass-hover rounded-2xl p-5 relative overflow-hidden flex flex-col gap-4 opacity-0 h-full"
                  style={{ animation: `fadeInUp 0.5s ease forwards ${idx * 0.07}s` }}
                >
                  {/* Colour sweep */}
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] opacity-[0.08] pointer-events-none"
                    style={{ background: color.bg }} />

                  {/* Header row */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: color.bg, boxShadow: `0 6px 20px ${color.glow}` }}
                    >
                      {ICONS[subject.icon] ?? "📖"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-base text-[var(--text-primary)] truncate">{subject.name}</h3>
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
        <h2 className="font-['Poppins'] font-bold mb-5 flex items-center gap-2"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)" }}>
          💡 How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIPS.map((t) => (
            <div key={t.title}
              className="glass rounded-2xl p-5 flex gap-4 items-start hover:bg-[rgba(255,255,255,0.08)] transition-colors">
              <span className="text-3xl shrink-0 mt-0.5">{t.icon}</span>
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
