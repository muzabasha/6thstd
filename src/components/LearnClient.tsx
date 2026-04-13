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
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px 60px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: "0.82rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
        <span>›</span>
        <Link href={`/subject/${subjectSlug}`} style={{ color: color.text, textDecoration: "none", fontWeight: 600 }}>
          {subjectName}
        </Link>
        <span>›</span>
        <span style={{ color: "var(--text-secondary)" }}>{chapter.title}</span>
        <span>›</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{topic.title}</span>
      </div>

      {/* Topic header */}
      <div className="glass" style={{ borderRadius: 20, padding: "22px 26px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, background: color.bg, opacity: 0.07, borderRadius: "0 20px 0 100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "0.72rem", color: color.text, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: color.badge, marginBottom: 8, display: "inline-block" }}>
              {chapter.title}
            </span>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "clamp(1.2rem,4vw,1.6rem)", lineHeight: 1.25, marginBottom: 6 }}>
              {topic.title}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{topic.description}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            {completed ? (
              <div style={{ padding: "6px 14px", borderRadius: 99, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399", fontSize: "0.8rem", fontWeight: 700 }}>
                ✓ Completed
              </div>
            ) : (
              <button
                className="btn-secondary"
                style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                onClick={handleMarkDone}
              >
                Mark as Done ✓
              </button>
            )}
            <VoiceAssistant
              onTranscript={handleVoiceTranscript}
              speakText={tab === "learn" ? speakText : undefined}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
        {(["learn", "chat", "quiz"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 9,
              border: "none",
              background: tab === t ? color.bg : "transparent",
              color: tab === t ? "white" : "var(--text-muted)",
              fontWeight: tab === t ? 700 : 500,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: tab === t ? `0 4px 16px ${color.glow}` : "none",
              textTransform: "capitalize",
            }}
          >
            {t === "learn" ? "📖 Learn" : t === "chat" ? "🤖 Ask AI" : "🧠 Quiz"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {tab === "learn" && (
          <div className="glass" style={{ borderRadius: 20, padding: 28 }}>
            {loadingExplain && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "2.5rem", animation: "float 2s infinite", marginBottom: 12 }}>🤖</div>
                <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Building your lesson…</p>
              </div>
            )}
            {explainError && (
              <div style={{ textAlign: "center", padding: 24 }}>
                <p style={{ color: "#f87171", marginBottom: 16 }}>⚠️ {explainError}</p>
                <button className="btn-primary" onClick={() => void fetchExplanation()}>Retry</button>
              </div>
            )}
            {explanation && !loadingExplain && (
              <div style={{ lineHeight: 1.75, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
                  <button 
                    onClick={() => {
                        window.speechSynthesis?.cancel();
                        const utt = new SpeechSynthesisUtterance(speakText);
                        utt.lang = "en-IN";
                        utt.rate = 0.9;
                        window.speechSynthesis?.speak(utt);
                    }}
                    className="btn-secondary"
                    style={{ fontSize: "0.78rem", padding: "5px 12px", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    🔊 Read Lesson Aloud
                  </button>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation}</ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {tab === "chat" && (
          <div className="glass" style={{ borderRadius: 20, padding: 24 }}>
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
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
        {prevTopic ? (
          <Link href={`/learn/${subjectSlug}/${prevTopic.id}`} style={{ textDecoration: "none", flex: 1 }}>
            <div className="glass glass-hover" style={{ borderRadius: 14, padding: "14px 18px" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>← Previous</p>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>{prevTopic.title}</p>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}

        {nextTopic ? (
          <Link href={`/learn/${subjectSlug}/${nextTopic.id}`} style={{ textDecoration: "none", flex: 1 }}>
            <div className="glass glass-hover" style={{ borderRadius: 14, padding: "14px 18px", textAlign: "right" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>Next →</p>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>{nextTopic.title}</p>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}
      </div>
    </main>
  );
}
