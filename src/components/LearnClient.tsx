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
  { marker: "🛠️", icon: "🛠️", label: "Hands-On Activity", bg: "rgba(251,146,60,0.10)", border: "rgba(251,146,60,0.35)", color: "#fb923c" },
  { marker: "🎯", icon: "🎯", label: "Try It Yourself", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.35)", color: "#34d399" },
  { marker: "💬", icon: "💬", label: "Think & Discuss", bg: "rgba(167,139,250,0.10)", border: "rgba(167,139,250,0.35)", color: "#a78bfa" },
  { marker: "🌟", icon: "🌟", label: "Scenario-Based", bg: "rgba(250,204,21,0.10)", border: "rgba(250,204,21,0.35)", color: "#facc15" },
  { marker: "📚", icon: "📚", label: "Practice Examples", bg: "rgba(79,142,247,0.10)", border: "rgba(79,142,247,0.35)", color: "#4f8ef7" },
  { marker: "❓", icon: "❓", label: "Q & A", bg: "rgba(34,211,238,0.10)", border: "rgba(34,211,238,0.35)", color: "#22d3ee" },
];

function splitIntoSections(md: string): { sectionKey: string | null; content: string }[] {
  const lines = md.split('\n');
  const result: { sectionKey: string | null; content: string }[] = [];
  let currentKey: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length) {
      result.push({ sectionKey: currentKey, content: buffer.join('\n').trim() });
      buffer = [];
    }
  };

  for (const line of lines) {
    const match = NEP_SECTIONS.find(s => line.startsWith(s.marker));
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
  nextTopic
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

      // Clean up text for screen reading
      // Language detection
      const isHindi = /[\u0900-\u097F]/.test(text);
      const isKannada = /[\u0C80-\u0CFF]/.test(text);

      let speechFriendly = text;

      // Localized labels for AI Voice
      if (isKannada) {
        speechFriendly = speechFriendly
          .replace(/📌/g, "ಪರಿಕಲ್ಪನೆ:")
          .replace(/🌍/g, "ಉದಾಹರಣೆ:")
          .replace(/📖/g, "ಪಠ್ಯಪುಸ್ತಕದ ಸಾರಾಂಶ:")
          .replace(/📚/g, "ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು:")
          .replace(/❓/g, "ಪ್ರಶ್ನೆ ಮತ್ತು ಉತ್ತರಗಳು:")
          .replace(/🌟/g, "ಕಲಿಕೆಯ ಸನ್ನಿವೇಶ:")
          .replace(/🔑/g, "ನೆನಪಿಡಬೇಕಾದ ಅಂಶಗಳು:")
          .replace(/✅/g, "ಕಲಿಕೆಯ ಸಲಹೆ:");
      } else if (isHindi) {
        speechFriendly = speechFriendly
          .replace(/📌/g, "अवधारणा:")
          .replace(/🌍/g, "उदाहरण:")
          .replace(/📖/g, "पाठ्यपुस्तक सारांश:")
          .replace(/📚/g, "अभ್ಯಾಸ ಪ್ರಶ್ನೋತ್ತರ:") // wait, this is mixing. 
          .replace(/📚/g, "अभ್ಯಾಸ ಪ್ರಶ್ನೆಗಳು:") // let's fix hindi
          .replace(/📚/g, "अभ्यास प्रश्न:")
          .replace(/❓/g, "प्रश्न और उत्तर:")
          .replace(/🌟/g, "सीखने का परिदृश्य:")
          .replace(/🔑/g, "याದ रखने योग्य बातें:")
          .replace(/✅/g, "सीखने की युक्ति:");
      } else {
        speechFriendly = speechFriendly
          .replace(/📌/g, "Concept:")
          .replace(/🌍/g, "Example:")
          .replace(/📖/g, "Textbook Summary:")
          .replace(/📚/g, "Practice Questions:")
          .replace(/❓/g, "Test your knowledge:")
          .replace(/🌟/g, "Learning Scenario:")
          .replace(/🔑/g, "Points to remember:")
          .replace(/✅/g, "Learning tip:");
      }

      speechFriendly = speechFriendly
        .replace(/[#*`]/g, "")
        .replace(/---+/g, "Next item.")
        .slice(0, 6500);

      let langCode = "en-IN";
      if (isHindi) langCode = "hi-IN";
      else if (isKannada) langCode = "kn-IN";

      setSpeakText(speechFriendly);

      // Auto-speak on first load with correct language
      setTimeout(() => {
        window.speechSynthesis?.cancel();
        const utt = new SpeechSynthesisUtterance(speechFriendly);
        utt.lang = langCode;
        utt.rate = 0.9;
        window.speechSynthesis?.speak(utt);
      }, 500);
    } catch (e: unknown) {
      setExplainError(e instanceof Error ? e.message : "Failed to load explanation.");
    } finally {
      setLoadingExplain(false);
    }
  }, [subjectName, topic.title, topic.description]);

  useEffect(() => {
    if (tab === "learn" && !explanation) {
      void fetchExplanation();
    }
  }, [tab, explanation, fetchExplanation]);

  const handleMarkDone = () => {
    markTopicComplete(subjectName, topic.id);
    setCompleted(true);
  };

  const handleVoiceTranscript = (text: string) => {
    setVoiceInput(text);
    setTab("chat");
  };

  return (
    <main className="max-w-[960px] mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[11px] sm:text-[13px] text-[var(--text-muted)] flex-wrap">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors no-underline">Home</Link>
        <span className="opacity-50">›</span>
        <Link href={`/subject/${subjectSlug}`} className="font-bold hover:opacity-80 transition-opacity no-underline" style={{ color: color.text }}>
          {subjectName}
        </Link>
        <span className="opacity-50">›</span>
        <span className="text-[var(--text-secondary)]">{chapter.title}</span>
        <span className="opacity-50 hidden sm:inline">›</span>
        <span className="text-[var(--text-primary)] font-black hidden sm:inline">{topic.title}</span>
      </div>

      {/* Topic header */}
      <div className="glass rounded-[20px] p-5 sm:p-8 mb-6 relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 opacity-[0.07] rounded-bl-[100px]" 
          style={{ background: color.bg }} 
        />
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
          <div className="flex-1">
            <span 
              className="text-[10px] sm:text-xs font-black px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider"
              style={{ color: color.text, background: color.badge }}
            >
              {chapter.title}
            </span>
            <h1 className="font-['Poppins'] font-black text-xl sm:text-3xl md:text-4xl leading-tight mb-3">
              {topic.title}
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-[600px] font-medium leading-relaxed">
              {topic.description}
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-3 items-center md:items-end w-full md:w-auto">
            {completed ? (
              <div className="flex-1 md:flex-none text-center px-4 py-2 rounded-full bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.35)] text-[#34d399] text-xs sm:text-sm font-black whitespace-nowrap">
                ✓ Completed
              </div>
            ) : (
              <button
                className="flex-1 md:flex-none btn-secondary text-xs sm:text-sm px-4 py-2 whitespace-nowrap"
                onClick={handleMarkDone}
              >
                Mark as Done ✓
              </button>
            )}
            <div className="flex-1 md:flex-none">
              <VoiceAssistant
                onTranscript={handleVoiceTranscript}
                speakText={tab === "learn" ? speakText : undefined}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-6 bg-[rgba(255,255,255,0.04)] rounded-2xl p-1.5 sm:p-2 border border-[rgba(255,255,255,0.05)]">
        {(["learn", "chat", "quiz"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3.5 rounded-xl border-none font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
              tab === t ? 'text-white' : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
            style={{
              background: tab === t ? color.bg : "transparent",
              boxShadow: tab === t ? `0 8px 24px ${color.glow}` : "none",
            }}
          >
            {t === "learn" ? "📖 Learn" : t === "chat" ? "🤖 Ask AI" : "🧠 Quiz"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {tab === "learn" && (
          <div className="glass rounded-[20px] p-6 sm:p-10">
            {loadingExplain && (
              <div className="text-center py-16">
                <div className="text-4xl sm:text-6xl animate-float mb-6">🤖</div>
                <p className="text-[var(--text-secondary)] font-bold text-lg">Building your lesson…</p>
              </div>
            )}
            {explainError && (
              <div className="text-center py-12">
                <p className="text-[#f87171] mb-6 font-bold">⚠️ {explainError}</p>
                <button className="btn-primary" onClick={() => void fetchExplanation()}>Retry</button>
              </div>
            )}
            {explanation && !loadingExplain && (
              <div className="leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg text-[var(--text-secondary)]">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => {
                      window.speechSynthesis?.cancel();
                      const utt = new SpeechSynthesisUtterance(speakText);
                      utt.lang = "en-IN";
                      utt.rate = 0.9;
                      window.speechSynthesis?.speak(utt);
                    }}
                    className="btn-secondary text-xs px-4 py-2 flex items-center gap-2"
                  >
                    🔊 Read Lesson Aloud
                  </button>
                </div>
                {splitIntoSections(explanation).map((sec, idx) => {
                  const nepCfg = NEP_SECTIONS.find(s => s.marker === sec.sectionKey);
                  if (nepCfg) {
                    return (
                      <div key={idx} className="my-6 sm:my-8 rounded-2xl border p-5 sm:p-8" style={{
                        borderColor: nepCfg.border,
                        background: nepCfg.bg,
                      }}>
                        <div className="font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] mb-4 flex items-center gap-2" style={{ color: nepCfg.color }}>
                          {nepCfg.icon} {nepCfg.label}
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="prose prose-invert max-w-none mb-6">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{sec.content}</ReactMarkdown>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "chat" && (
          <div className="glass rounded-[20px] p-5 sm:p-8">
            <AIChat
              subject={subjectName}
              topic={topic.title}
              initialMessage={voiceInput}
            />
          </div>
        )}

        {tab === "quiz" && (
          <QuizCard subject={subjectName} topic={topic.title} topicId={topic.id} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch mt-10 gap-4">
        {prevTopic ? (
          <Link href={`/learn/${subjectSlug}/${prevTopic.id}`} className="no-underline flex-1">
            <div className="glass glass-hover rounded-2xl p-5 h-full">
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mb-2">← Previous</p>
              <p className="font-black text-sm sm:text-base text-[var(--text-primary)]">{prevTopic.title}</p>
            </div>
          </Link>
        ) : <div className="hidden sm:block flex-1" />}

        {nextTopic ? (
          <Link href={`/learn/${subjectSlug}/${nextTopic.id}`} className="no-underline flex-1">
            <div className="glass glass-hover rounded-2xl p-5 h-full text-right border-r-4" style={{ borderColor: color.bg }}>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mb-2">Next Topic →</p>
              <p className="font-black text-sm sm:text-base text-[var(--text-primary)]">{nextTopic.title}</p>
            </div>
          </Link>
        ) : <div className="hidden sm:block flex-1" />}
      </div>
    </main>

  );
}
