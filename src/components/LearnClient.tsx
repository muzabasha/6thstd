"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AIChat from "@/components/AIChat";
import VoiceAssistant from "@/components/VoiceAssistant";
import QuizCard from "@/components/QuizCard";
import { getSubjectColor } from "@/lib/utils";
import { explainTopic } from "@/lib/openai";
import { markTopicComplete, getSubjectProgress } from "@/lib/storage";

// NEP 2020 section markers and their visual config
const ModelViewer = "model-viewer" as any;

const NEP_SECTIONS: { marker: string; icon: string; label: string; bg: string; border: string; color: string }[] = [
  { marker: "\u{1F6E0}\uFE0F", icon: "\u{1F6E0}\uFE0F", label: "Hands-On Activity", bg: "rgba(251,146,60,0.10)", border: "rgba(251,146,60,0.35)", color: "#fb923c" },
  { marker: "\u{1F3AF}", icon: "\u{1F3AF}", label: "Try It Yourself", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.35)", color: "#34d399" },
  { marker: "\u{1F4AC}", icon: "\u{1F4AC}", label: "Think & Discuss", bg: "rgba(167,139,250,0.10)", border: "rgba(167,139,250,0.35)", color: "#a78bfa" },
  { marker: "\u{1F31F}", icon: "\u{1F31F}", label: "Scenario-Based", bg: "rgba(250,204,21,0.10)", border: "rgba(250,204,21,0.35)", color: "#facc15" },
  { marker: "\u{1F4DA}", icon: "\u{1F4DA}", label: "Practice Examples", bg: "rgba(79,142,247,0.10)", border: "rgba(79,142,247,0.35)", color: "#4f8ef7" },
  { marker: "\u2753", icon: "\u2753", label: "Q & A", bg: "rgba(34,211,238,0.10)", border: "rgba(34,211,238,0.35)", color: "#22d3ee" },
];

function splitIntoSections(md: string): { sectionKey: string | null; content: string }[] {
  const lines = md.split("\n");
  const result: { sectionKey: string | null; content: string }[] = [];
  let currentKey: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length) {
      result.push({ sectionKey: currentKey, content: buffer.join("\n").trim() });
      buffer = [];
    }
  };

  for (const line of lines) {
    const match = NEP_SECTIONS.find((s) => line.startsWith(s.marker));
    if (match) {
      flush();
      currentKey = match.marker;
      buffer.push(line);
    } else {
      buffer.push(line);
    }
  }
  flush();
  return result;
}

type Topic = { id: string; title: string; description: string; modelUrl?: string };
type Chapter = { title: string; topics: Topic[] };
type Tab = "learn" | "lab" | "chat" | "quiz";

const TAB_META: Record<Tab, { icon: string; label: string }> = {
  learn: { icon: "📖", label: "Learn" },
  lab:   { icon: "🔬", label: "3D Lab" },
  chat:  { icon: "🤖", label: "Ask AI" },
  quiz:  { icon: "🧠", label: "Quiz" },
};

export default function LearnClient({
  subjectName,
  subjectSlug,
  topic,
  chapter,
  prevTopic,
  nextTopic,
}: {
  subjectName: string;
  subjectSlug: string;
  topic: Topic;
  chapter: Chapter;
  prevTopic: Topic | null;
  nextTopic: Topic | null;
}) {
  const color = getSubjectColor(subjectName);
  const [tab, setTab] = useState<Tab>("learn");
  const [explanation, setExplanation] = useState("");
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [explainError, setExplainError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");
  const [speakText, setSpeakText] = useState("");

  useEffect(() => {
    const prog = getSubjectProgress(subjectName);
    setCompleted(prog[topic.id]?.completed ?? false);
  }, [subjectName, topic.id]);

  const fetchExplanation = useCallback(async () => {
    setLoadingExplain(true);
    setExplainError("");
    try {
      const text = await explainTopic(subjectName, topic.title, topic.description, topic.id);
      setExplanation(text);

      const isHindi   = /[\u0900-\u097F]/.test(text);
      const isKannada = /[\u0C80-\u0CFF]/.test(text);

      let sf = text;
      if (isKannada) {
        sf = sf
          .replace(/\u{1F4CC}/gu, "\u0CAA\u0CB0\u0CBF\u0C95\u0CB2\u0CCD\u0CAA\u0CA8\u0CC6:")
          .replace(/\u{1F30D}/gu, "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6:")
          .replace(/\u{1F4D6}/gu, "\u0CAA\u0CA0\u0CCD\u0CAF\u0CAA\u0CC1\u0CB8\u0CCD\u0CA4\u0C95\u0CA6 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6:")
          .replace(/\u{1F4DA}/gu, "\u0C85\u0CAD\u0CCD\u0CAF\u0CBE\u0CB8 \u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6\u0C97\u0CB3\u0CC1:")
          .replace(/\u2753/gu,    "\u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CB0\u0C97\u0CB3\u0CC1:")
          .replace(/\u{1F31F}/gu, "\u0C95\u0CB2\u0CBF\u0C95\u0CC6\u0CAF \u0CB8\u0CA8\u0CCD\u0CA8\u0CBF\u0CB5\u0CC7\u0CB6:")
          .replace(/\u{1F511}/gu, "\u0CA8\u0CC6\u0CA8\u0CAA\u0CBF\u0CA1\u0CAC\u0CC7\u0C95\u0CBE\u0CA6 \u0C85\u0C82\u0CB6\u0C97\u0CB3\u0CC1:")
          .replace(/\u2705/gu,    "\u0C95\u0CB2\u0CBF\u0C95\u0CC6\u0CAF \u0CB8\u0CB2\u0CB9\u0CC6:");
      } else if (isHindi) {
        sf = sf
          .replace(/\u{1F4CC}/gu, "\u0905\u0935\u0927\u093E\u0930\u0923\u093E:")
          .replace(/\u{1F30D}/gu, "\u0909\u0926\u093E\u0939\u0930\u0923:")
          .replace(/\u{1F4D6}/gu, "\u092A\u093E\u0920\u094D\u092F\u092A\u0941\u0938\u094D\u0924\u0915 \u0938\u093E\u0930\u093E\u0902\u0936:")
          .replace(/\u{1F4DA}/gu, "\u0905\u092D\u094D\u092F\u093E\u0938 \u092A\u094D\u0930\u0936\u094D\u0928:")
          .replace(/\u2753/gu,    "\u092A\u094D\u0930\u0936\u094D\u0928 \u0914\u0930 \u0909\u0924\u094D\u0924\u0930:")
          .replace(/\u{1F31F}/gu, "\u0938\u0940\u0916\u0928\u0947 \u0915\u093E \u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F:")
          .replace(/\u{1F511}/gu, "\u092F\u093E\u0926 \u0930\u0916\u0928\u0947 \u092F\u094B\u0917\u094D\u092F \u092C\u093E\u0924\u0947\u0902:")
          .replace(/\u2705/gu,    "\u0938\u0940\u0916\u0928\u0947 \u0915\u0940 \u092F\u0941\u0915\u094D\u0924\u093F:");
      } else {
        sf = sf
          .replace(/\u{1F4CC}/gu, "Concept:")
          .replace(/\u{1F30D}/gu, "Example:")
          .replace(/\u{1F4D6}/gu, "Textbook Summary:")
          .replace(/\u{1F4DA}/gu, "Practice Questions:")
          .replace(/\u2753/gu,    "Test your knowledge:")
          .replace(/\u{1F31F}/gu, "Learning Scenario:")
          .replace(/\u{1F511}/gu, "Points to remember:")
          .replace(/\u2705/gu,    "Learning tip:");
      }

      sf = sf.replace(/[#*`]/g, "").replace(/---+/g, "Next item.").slice(0, 6500);

      const langCode = isHindi ? "hi-IN" : isKannada ? "kn-IN" : "en-IN";
      setSpeakText(sf);

      setTimeout(() => {
        window.speechSynthesis?.cancel();
        const utt = new SpeechSynthesisUtterance(sf);
        utt.lang = langCode;
        utt.rate = 0.9;
        window.speechSynthesis?.speak(utt);
      }, 500);
    } catch (e: unknown) {
      setExplainError(e instanceof Error ? e.message : "Failed to load explanation.");
    } finally {
      setLoadingExplain(false);
    }
  }, [subjectName, topic.title, topic.description, topic.id]);

  useEffect(() => {
    if (tab === "learn" && !explanation) void fetchExplanation();
  }, [tab, explanation, fetchExplanation]);

  const handleMarkDone    = () => { markTopicComplete(subjectName, topic.id); setCompleted(true); };
  const handleVoiceInput  = (text: string) => { setVoiceInput(text); setTab("chat"); };

  return (
    <div className="page-wrapper-md">

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav
        className="flex items-center flex-wrap gap-x-1.5 gap-y-1 mb-5"
        aria-label="breadcrumb"
        style={{ fontSize: "clamp(0.7rem, 2vw, 0.8125rem)", color: "var(--text-muted)" }}
      >
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors no-underline leading-none">
          Home
        </Link>
        <span className="opacity-40">›</span>
        <Link
          href={`/subject/${subjectSlug}`}
          className="font-bold hover:opacity-80 transition-opacity no-underline leading-none"
          style={{ color: color.text }}
        >
          {subjectName}
        </Link>
        <span className="opacity-40">›</span>
        <span
          className="leading-none"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "clamp(100px, 30vw, 200px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {chapter.title}
        </span>
        <span className="opacity-40 hidden sm:inline">›</span>
        <span
          className="text-[var(--text-primary)] font-black hidden sm:inline leading-none"
          style={{
            maxWidth: "clamp(120px, 35vw, 280px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {topic.title}
        </span>
      </nav>

      {/* ── Topic header ────────────────────────────────────────── */}
      <div
        className="glass rounded-[20px] relative overflow-hidden mb-5"
        style={{ padding: "clamp(1rem, 4vw, 2rem)" }}
      >
        {/* Color accent sweep */}
        <div
          className="absolute top-0 right-0 opacity-[0.07] rounded-bl-[100px] pointer-events-none"
          style={{
            width: "clamp(80px, 18vw, 192px)",
            height: "clamp(80px, 18vw, 192px)",
            background: color.bg,
          }}
        />

        <div
          className="relative z-10"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Title + description */}
          <div>
            <span
              className="font-black uppercase inline-block mb-3"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                padding: "0.25rem 0.75rem",
                borderRadius: 99,
                color: color.text,
                background: color.badge,
              }}
            >
              {chapter.title}
            </span>
            <h1
              className="font-['Poppins'] font-black leading-tight mb-2"
              style={{ fontSize: "clamp(1.2rem, 4.5vw, 2.25rem)" }}
            >
              {topic.title}
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.825rem, 2.5vw, 1rem)",
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              {topic.description}
            </p>
          </div>

          {/* Actions row — stacks on mobile, row on md+ */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.625rem",
              alignItems: "center",
            }}
          >
            {completed ? (
              <div
                className="font-black whitespace-nowrap"
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: 99,
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.35)",
                  color: "#34d399",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                }}
              >
                ✓ Completed
              </div>
            ) : (
              <button
                className="btn-secondary whitespace-nowrap"
                style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", padding: "0.4rem 1rem" }}
                onClick={handleMarkDone}
              >
                Mark as Done ✓
              </button>
            )}
            <VoiceAssistant
              onTranscript={handleVoiceInput}
              speakText={tab === "learn" ? speakText : undefined}
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div
        className="flex gap-1.5 mb-5 rounded-2xl border"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.05)",
          padding: "0.375rem",
        }}
      >
        {(["learn", "lab", "chat", "quiz"] as Tab[]).map((t) => {
          const meta = TAB_META[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 flex items-center justify-center font-bold border-none cursor-pointer transition-all duration-300"
              style={{
                gap: "clamp(0.25rem, 1.5vw, 0.5rem)",
                padding: "clamp(0.5rem, 2vw, 0.875rem) 0.5rem",
                borderRadius: "0.75rem",
                fontSize: "clamp(0.72rem, 2.5vw, 0.875rem)",
                background: tab === t ? color.bg : "transparent",
                color: tab === t ? "#fff" : "var(--text-muted)",
                boxShadow: tab === t ? `0 8px 24px ${color.glow}` : "none",
              }}
              aria-current={tab === t ? "page" : undefined}
            >
              <span aria-hidden="true">{meta.icon}</span>
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ─────────────────────────────────────────── */}
      <div style={{ minHeight: "clamp(320px, 55vh, 520px)" }}>

        {/* Learn */}
        {tab === "learn" && (
          <div
            className="glass rounded-[20px]"
            style={{ padding: "clamp(1rem, 4vw, 2.5rem)" }}
          >
            {loadingExplain && (
              <div className="text-center" style={{ padding: "4rem 1rem" }}>
                <div
                  className="animate-float inline-block"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "1.5rem" }}
                >
                  🤖
                </div>
                <p
                  className="font-bold"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "clamp(0.925rem, 3vw, 1.1rem)",
                  }}
                >
                  Building your lesson…
                </p>
              </div>
            )}

            {explainError && (
              <div className="text-center" style={{ padding: "3rem 1rem" }}>
                <p
                  className="font-bold mb-6"
                  style={{ color: "#f87171", fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}
                >
                  ⚠️ {explainError}
                </p>
                <button className="btn-primary" onClick={() => void fetchExplanation()}>
                  Retry
                </button>
              </div>
            )}

            {explanation && !loadingExplain && (
              <div>
                {/* Read aloud */}
                <div className="flex justify-end mb-5">
                  <button
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      const utt = new SpeechSynthesisUtterance(speakText);
                      utt.lang = "en-IN";
                      utt.rate = 0.9;
                      window.speechSynthesis?.speak(utt);
                    }}
                    className="btn-secondary flex items-center gap-2"
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.875rem" }}
                  >
                    🔊 <span className="hidden sm:inline">Read Lesson Aloud</span>
                    <span className="sm:hidden">Read Aloud</span>
                  </button>
                </div>

                {/* Content sections */}
                {splitIntoSections(explanation).map((sec, idx) => {
                  const nepCfg = NEP_SECTIONS.find((s) => s.marker === sec.sectionKey);
                  if (nepCfg) {
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border animate-fade-in-up"
                        style={{
                          borderColor: nepCfg.border,
                          background: nepCfg.bg,
                          padding: "clamp(1rem, 3vw, 2rem)",
                          marginBottom: "clamp(1rem, 3vw, 2rem)",
                        }}
                      >
                        <div
                          className="font-black uppercase flex items-center gap-2"
                          style={{
                            fontSize: "clamp(0.625rem, 1.8vw, 0.75rem)",
                            letterSpacing: "0.1em",
                            color: nepCfg.color,
                            marginBottom: "clamp(0.625rem, 2vw, 1rem)",
                          }}
                        >
                          <span>{nepCfg.icon}</span>
                          <span>{nepCfg.label}</span>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="prose prose-invert max-w-none"
                      style={{ marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3D Lab */}
        {tab === "lab" && (
          <div
            className="glass rounded-[20px] overflow-hidden flex flex-col"
            style={{ height: "clamp(400px, 60vh, 600px)" }}
          >
            <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Interactive 3D Model</h3>
                <p className="text-xs text-[var(--text-muted)]">Rotate, zoom and explore in 3D</p>
              </div>
              <div className="flex gap-2">
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono border border-white/10 uppercase">
                  {topic.id}
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative bg-black/20">
              <ModelViewer
                src={topic.modelUrl}
                alt={`3D model of ${topic.title}`}
                auto-rotate=""
                camera-controls=""
                shadow-intensity="1"
                environment-image="neutral"
                exposure="1"
                style={{ width: "100%", height: "100%", "--poster-color": "transparent" } as any}
                ar=""
                ar-modes="webxr scene-viewer quick-look"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="animate-pulse text-4xl">⏳</div>
                </div>
              </ModelViewer>
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-[var(--glass-border)] text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">
                Powered by Interactive 3D Engine
              </p>
            </div>
          </div>
        )}

        {/* Chat */}
        {tab === "chat" && (
          <div
            className="glass rounded-[20px]"
            style={{ padding: "clamp(1rem, 3vw, 2rem)" }}
          >
            <AIChat subject={subjectName} topic={topic.title} initialMessage={voiceInput} />
          </div>
        )}

        {/* Quiz */}
        {tab === "quiz" && (
          <QuizCard subject={subjectName} topic={topic.title} topicId={topic.id} />
        )}
      </div>

      {/* ── Prev / Next navigation ──────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: prevTopic && nextTopic ? "1fr 1fr" : prevTopic ? "1fr auto" : "auto 1fr",
          gap: "clamp(0.625rem, 2vw, 1rem)",
          marginTop: "clamp(2rem, 5vw, 2.5rem)",
        }}
      >
        {prevTopic ? (
          <Link href={`/learn/${subjectSlug}/${prevTopic.id}`} className="no-underline">
            <div className="glass glass-hover rounded-2xl h-full" style={{ padding: "clamp(0.875rem, 3vw, 1.25rem)" }}>
              <p
                className="font-bold uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.375rem" }}
              >
                ← Previous
              </p>
              <p
                className="font-black text-[var(--text-primary)]"
                style={{
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9375rem)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {prevTopic.title}
              </p>
            </div>
          </Link>
        ) : (
          /* Empty spacer when no prev */
          <div />
        )}

        {nextTopic ? (
          <Link href={`/learn/${subjectSlug}/${nextTopic.id}`} className="no-underline">
            <div
              className="glass glass-hover rounded-2xl h-full text-right border-r-4"
              style={{
                padding: "clamp(0.875rem, 3vw, 1.25rem)",
                borderColor: color.bg,
              }}
            >
              <p
                className="font-bold uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.375rem" }}
              >
                Next Topic →
              </p>
              <p
                className="font-black text-[var(--text-primary)]"
                style={{
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9375rem)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {nextTopic.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
