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

type Topic = { id: string; title: string; description: string };
type Chapter = { title: string; topics: Topic[] };
type Tab = "learn" | "chat" | "quiz";

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

      const isHindi = /[\u0900-\u097F]/.test(text);
      const isKannada = /[\u0C80-\u0CFF]/.test(text);

      let sf = text;
      if (isKannada) {
        sf = sf
          .replace(/\u{1F4CC}/gu, "\u0CAA\u0CB0\u0CBF\u0C95\u0CB2\u0CCD\u0CAA\u0CA8\u0CC6:")
          .replace(/\u{1F30D}/gu, "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6:")
          .replace(/\u{1F4D6}/gu, "\u0CAA\u0CA0\u0CCD\u0CAF\u0CAA\u0CC1\u0CB8\u0CCD\u0CA4\u0C95\u0CA6 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6:")
          .replace(/\u{1F4DA}/gu, "\u0C85\u0CAD\u0CCD\u0CAF\u0CBE\u0CB8 \u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6\u0C97\u0CB3\u0CC1:")
          .replace(/\u2753/gu, "\u0CAA\u0CCD\u0CB0\u0CB6\u0CCD\u0CA8\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CB0\u0C97\u0CB3\u0CC1:")
          .replace(/\u{1F31F}/gu, "\u0C95\u0CB2\u0CBF\u0C95\u0CC6\u0CAF \u0CB8\u0CA8\u0CCD\u0CA8\u0CBF\u0CB5\u0CC7\u0CB6:")
          .replace(/\u{1F511}/gu, "\u0CA8\u0CC6\u0CA8\u0CAA\u0CBF\u0CA1\u0CAC\u0CC7\u0C95\u0CBE\u0CA6 \u0C85\u0C82\u0CB6\u0C97\u0CB3\u0CC1:")
          .replace(/\u2705/gu, "\u0C95\u0CB2\u0CBF\u0C95\u0CC6\u0CAF \u0CB8\u0CB2\u0CB9\u0CC6:");
      } else if (isHindi) {
        sf = sf
          .replace(/\u{1F4CC}/gu, "\u0905\u0935\u0927\u093E\u0930\u0923\u093E:")
          .replace(/\u{1F30D}/gu, "\u0909\u0926\u093E\u0939\u0930\u0923:")
          .replace(/\u{1F4D6}/gu, "\u092A\u093E\u0920\u094D\u092F\u092A\u0941\u0938\u094D\u0924\u0915 \u0938\u093E\u0930\u093E\u0902\u0936:")
          .replace(/\u{1F4DA}/gu, "\u0905\u092D\u094D\u092F\u093E\u0938 \u092A\u094D\u0930\u0936\u094D\u0928:")
          .replace(/\u2753/gu, "\u092A\u094D\u0930\u0936\u094D\u0928 \u0914\u0930 \u0909\u0924\u094D\u0924\u0930:")
          .replace(/\u{1F31F}/gu, "\u0938\u0940\u0916\u0928\u0947 \u0915\u093E \u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F:")
          .replace(/\u{1F511}/gu, "\u092F\u093E\u0926 \u0930\u0916\u0928\u0947 \u092F\u094B\u0917\u094D\u092F \u092C\u093E\u0924\u0947\u0902:")
          .replace(/\u2705/gu, "\u0938\u0940\u0916\u0928\u0947 \u0915\u0940 \u092F\u0941\u0915\u094D\u0924\u093F:");
      } else {
        sf = sf
          .replace(/\u{1F4CC}/gu, "Concept:")
          .replace(/\u{1F30D}/gu, "Example:")
          .replace(/\u{1F4D6}/gu, "Textbook Summary:")
          .replace(/\u{1F4DA}/gu, "Practice Questions:")
          .replace(/\u2753/gu, "Test your knowledge:")
          .replace(/\u{1F31F}/gu, "Learning Scenario:")
          .replace(/\u{1F511}/gu, "Points to remember:")
          .replace(/\u2705/gu, "Learning tip:");
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

  const handleMarkDone = () => { markTopicComplete(subjectName, topic.id); setCompleted(true); };
  const handleVoiceTranscript = (text: string) => { setVoiceInput(text); setTab("chat"); };

  return (
    <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 text-[11px] sm:text-[13px] text-[var(--text-muted)] flex-wrap">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors no-underline min-h-0">Home</Link>
        <span className="opacity-40">›</span>
        <Link href={`/subject/${subjectSlug}`} className="font-bold hover:opacity-80 transition-opacity no-underline min-h-0" style={{ color: color.text }}>
          {subjectName}
        </Link>
        <span className="opacity-40">›</span>
        <span className="text-[var(--text-secondary)] truncate max-w-[120px] sm:max-w-none">{chapter.title}</span>
        <span className="opacity-40 hidden sm:inline">›</span>
        <span className="text-[var(--text-primary)] font-black hidden sm:inline truncate max-w-[200px]">{topic.title}</span>
      </nav>

      {/* Topic header */}
      <div className="glass rounded-[20px] p-5 sm:p-8 mb-5 sm:mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 sm:w-48 sm:h-48 opacity-[0.07] rounded-bl-[100px]" style={{ background: color.bg }} />
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6 relative z-10">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] sm:text-xs font-black px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider" style={{ color: color.text, background: color.badge }}>
              {chapter.title}
            </span>
            <h1 className="font-['Poppins'] font-black text-xl sm:text-3xl md:text-4xl leading-tight mb-2 sm:mb-3">
              {topic.title}
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base font-medium leading-relaxed">
              {topic.description}
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-3 items-center md:items-end w-full md:w-auto shrink-0">
            {completed ? (
              <div className="flex-1 md:flex-none text-center px-4 py-2 rounded-full bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.35)] text-[#34d399] text-xs sm:text-sm font-black whitespace-nowrap">
                ✓ Completed
              </div>
            ) : (
              <button className="flex-1 md:flex-none btn-secondary text-xs sm:text-sm px-4 py-2 whitespace-nowrap" onClick={handleMarkDone}>
                Mark as Done ✓
              </button>
            )}
            <VoiceAssistant onTranscript={handleVoiceTranscript} speakText={tab === "learn" ? speakText : undefined} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-5 sm:mb-6 bg-[rgba(255,255,255,0.04)] rounded-2xl p-1.5 border border-[rgba(255,255,255,0.05)]">
        {(["learn", "chat", "quiz"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3.5 rounded-xl border-none font-bold text-[11px] sm:text-sm transition-all duration-300 cursor-pointer ${tab === t ? "text-white" : "text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.03)]"
              }`}
            style={{ background: tab === t ? color.bg : "transparent", boxShadow: tab === t ? `0 8px 24px ${color.glow}` : "none" }}
          >
            <span className="hidden xs:inline sm:inline">{t === "learn" ? "📖" : t === "chat" ? "🤖" : "🧠"}</span>
            <span>{t === "learn" ? "Learn" : t === "chat" ? "Ask AI" : "Quiz"}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {tab === "learn" && (
          <div className="glass rounded-[20px] p-5 sm:p-8 md:p-10">
            {loadingExplain && (
              <div className="text-center py-16">
                <div className="text-4xl sm:text-6xl animate-float mb-6">🤖</div>
                <p className="text-[var(--text-secondary)] font-bold text-base sm:text-lg">Building your lesson…</p>
              </div>
            )}
            {explainError && (
              <div className="text-center py-12">
                <p className="text-[#f87171] mb-6 font-bold text-sm sm:text-base">⚠️ {explainError}</p>
                <button className="btn-primary" onClick={() => void fetchExplanation()}>Retry</button>
              </div>
            )}
            {explanation && !loadingExplain && (
              <div>
                <div className="flex justify-end mb-5 sm:mb-6">
                  <button
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      const utt = new SpeechSynthesisUtterance(speakText);
                      utt.lang = "en-IN"; utt.rate = 0.9;
                      window.speechSynthesis?.speak(utt);
                    }}
                    className="btn-secondary text-xs px-3 sm:px-4 py-2 flex items-center gap-2"
                  >
                    🔊 <span className="hidden sm:inline">Read Lesson Aloud</span><span className="sm:hidden">Read Aloud</span>
                  </button>
                </div>
                {splitIntoSections(explanation).map((sec, idx) => {
                  const nepCfg = NEP_SECTIONS.find((s) => s.marker === sec.sectionKey);
                  if (nepCfg) {
                    return (
                      <div key={idx} className="my-5 sm:my-8 rounded-2xl border p-4 sm:p-6 md:p-8" style={{ borderColor: nepCfg.border, background: nepCfg.bg }}>
                        <div className="font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] mb-3 sm:mb-4 flex items-center gap-2" style={{ color: nepCfg.color }}>
                          {nepCfg.icon} {nepCfg.label}
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="prose prose-invert max-w-none mb-5 sm:mb-6">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "chat" && (
          <div className="glass rounded-[20px] p-4 sm:p-6 md:p-8">
            <AIChat subject={subjectName} topic={topic.title} initialMessage={voiceInput} />
          </div>
        )}

        {tab === "quiz" && (
          <QuizCard subject={subjectName} topic={topic.title} topicId={topic.id} />
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch mt-8 sm:mt-10 gap-3 sm:gap-4">
        {prevTopic ? (
          <Link href={`/learn/${subjectSlug}/${prevTopic.id}`} className="no-underline flex-1">
            <div className="glass glass-hover rounded-2xl p-4 sm:p-5 h-full">
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mb-1.5">← Previous</p>
              <p className="font-black text-sm sm:text-base text-[var(--text-primary)] line-clamp-2">{prevTopic.title}</p>
            </div>
          </Link>
        ) : <div className="hidden sm:block flex-1" />}

        {nextTopic ? (
          <Link href={`/learn/${subjectSlug}/${nextTopic.id}`} className="no-underline flex-1">
            <div className="glass glass-hover rounded-2xl p-4 sm:p-5 h-full text-right border-r-4" style={{ borderColor: color.bg }}>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mb-1.5">Next Topic →</p>
              <p className="font-black text-sm sm:text-base text-[var(--text-primary)] line-clamp-2">{nextTopic.title}</p>
            </div>
          </Link>
        ) : <div className="hidden sm:block flex-1" />}
      </div>
    </main>
  );
}
