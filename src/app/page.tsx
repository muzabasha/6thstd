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
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-12 pb-20">

      {/* ── Hero ── */}
      <section className="text-center py-8 sm:py-16">
        <div className="text-5xl sm:text-7xl mb-4 animate-float">🌟</div>
        <h1 className="shimmer-text font-['Poppins'] font-extrabold text-[clamp(1.8rem,8vw,3.5rem)] leading-[1.1] mb-4">
          Sadiya's Learning Hub
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-[520px] mx-auto mb-8">
          Class 6 CBSE · AI-Powered Learning · All Subjects 🚀
        </p>

        {/* Overall progress pill */}
        <div className="glass inline-flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-4 sm:py-6 rounded-full mb-8 flex-wrap justify-center">
          <div className="text-center min-w-[70px]">
            <p className="text-2xl sm:text-3xl font-black text-[#22d3ee]">{totalDone}</p>
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">Topics Done</p>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-[var(--glass-border)]" />
          <div className="text-center min-w-[70px]">
            <p className="text-2xl sm:text-3xl font-black text-[#a78bfa]">{totalTopics}</p>
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Topics</p>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-[var(--glass-border)]" />
          <div className="text-center min-w-[70px]">
            <p className="text-2xl sm:text-3xl font-black text-[#34d399]">
              {totalTopics > 0 ? Math.round((totalDone / totalTopics) * 100) : 0}%
            </p>
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider">Complete</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href={continueHref} className="btn-primary w-full sm:w-auto no-underline">
            ▶ Continue Learning
          </Link>
          <Link href="/quiz" className="btn-secondary w-full sm:w-auto no-underline">
            🧠 Random Quiz
          </Link>
        </div>
      </section>

      {/* ── Subject Cards ── */}
      <section>
        <h2 className="font-['Poppins'] font-bold text-xl sm:text-2xl mb-6 flex items-center gap-2">
          📚 Choose a Subject
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, idx) => {
            const color = getSubjectColor(subject.name);
            const topicCount = subject.chapters.reduce((a, c) => a + c.topics.length, 0);
            const pct = progress[subject.name] ?? 0;

            return (
              <Link
                key={subject.name}
                href={`/subject/${slugify(subject.name)}`}
                className="no-underline block group"
              >
                <div
                  className="glass glass-hover rounded-[20px] p-6 cursor-pointer relative overflow-hidden opacity-0 h-full flex flex-col"
                  style={{
                    animation: `fadeInUp 0.55s ease forwards ${idx * 0.08}s`,
                  }}
                >
                  {/* Gradient sweep */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.08] rounded-bl-[100px]" style={{ background: color.bg }} />

                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110" 
                      style={{ 
                        background: color.bg,
                        boxShadow: `0 8px 24px ${color.glow}`
                      }}
                    >
                      {ICONS[subject.icon] ?? "📖"}
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-[var(--text-primary)]">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                        {subject.chapters.length} chapters · {topicCount} topics
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <ProgressBar
                      percent={pct}
                      color={color.bg}
                      height={8}
                      showLabel={true}
                    />

                    <div className="flex justify-between items-center mt-4 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                      <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[65%] font-medium">
                        {subject.chapters[0].title}…
                      </span>
                      <span className="text-[13px] font-bold" style={{ color: color.text }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Quick Tips ── */}
      <section className="mt-16">
        <h2 className="font-['Poppins'] font-bold text-xl sm:text-2xl mb-6">
          💡 Learning Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: "🤖", tip: "Ask the AI tutor any question — it explains with real-life examples!" },
            { icon: "🎤", tip: "Use the voice button to speak your questions hands-free." },
            { icon: "🧠", tip: "Take quizzes after studying to remember topics longer." },
            { icon: "📈", tip: "Your progress is saved automatically — pick up where you left off!" },
          ].map((t, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex gap-4 items-start transition-all hover:bg-[rgba(255,255,255,0.08)]">
              <span className="text-2xl shrink-0">{t.icon}</span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">{t.tip}</p>
            </div>
          ))}
        </div>
      </section>
    </main>

  );
}
