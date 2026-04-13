"use client";

import { useState, useEffect, useCallback } from "react";
import { type QuizQuestion, generateQuiz } from "@/lib/openai";
import { saveQuizScore } from "@/lib/storage";
import confetti from "canvas-confetti";

interface QuizCardProps {
  subject: string;
  topic: string;
  topicId: string;
}

type Phase = "idle" | "loading" | "active" | "done" | "error";

export default function QuizCard({ subject, topic, topicId }: QuizCardProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [answers, setAnswers] = useState<boolean[]>([]);

  const startQuiz = useCallback(async () => {
    setPhase("loading");
    setScore(0);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShortAnswer("");
    setRevealed(false);
    try {
      const qs = await generateQuiz(subject, topic);
      if (!qs || qs.length === 0) throw new Error("No questions returned.");
      setQuestions(qs);
      setPhase("active");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to generate quiz.");
      setPhase("error");
    }
  }, [subject, topic]);

  const q = questions[current];

  const checkAnswer = useCallback(() => {
    if (!q) return;
    const userAns = q.type === "mcq" ? selected : shortAnswer;
    const correct = userAns
      ? q.answer.toLowerCase().includes(userAns.toLowerCase().replace(/^[abcd]\)\s*/i, "").slice(0, 10))
      : false;
    setRevealed(true);
    setAnswers((prev) => [...prev, correct]);
    if (correct) setScore((s) => s + 1);
  }, [q, selected, shortAnswer]);

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      const finalScore = score + (answers[current] === undefined && revealed ? 0 : 0);
      saveQuizScore(subject, topicId, score, questions.length);
      setPhase("done");
      if (score / questions.length >= 0.6) {
        void confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShortAnswer("");
      setRevealed(false);
    }
  }, [current, questions.length, score, answers, revealed, subject, topicId]);

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <div className="glass" style={{ borderRadius: 20, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🧠</div>
        <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 8 }}>Practice Quiz</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 20 }}>
          Test your knowledge on <strong>{topic}</strong>
          <br />8 AI-generated questions await!
        </p>
        <button className="btn-primary" onClick={() => void startQuiz()}>
          🚀 Start Quiz
        </button>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="glass" style={{ borderRadius: 20, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 16, animation: "float 2s infinite" }}>⚙️</div>
        <p style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Generating your quiz…</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 6 }}>AI is crafting questions just for you!</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (phase === "error") {
    return (
      <div className="glass" style={{ borderRadius: 20, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
        <p style={{ color: "#f87171", fontWeight: 700, marginBottom: 16 }}>{errorMsg}</p>
        <button className="btn-secondary" onClick={() => setPhase("idle")}>Try Again</button>
      </div>
    );
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  if (phase === "done") {
    const passed = pct >= 60;
    return (
      <div className="glass" style={{ borderRadius: 20, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>{passed ? "🎉" : "💪"}</div>
        <h3 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: 8 }}>
          {passed ? "Excellent work!" : "Keep practising!"}
        </h3>
        <div style={{
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: 8,
          background: passed ? "linear-gradient(135deg,#34d399,#22d3ee)" : "linear-gradient(135deg,#fb923c,#f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {score}/{questions.length}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 20 }}>
          You scored <strong>{pct}%</strong> — {passed ? "topic marked complete! ✅" : "score 60% to unlock completion."}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => void startQuiz()}>🔄 Retry</button>
          <button className="btn-secondary" onClick={() => setPhase("idle")}>Back</button>
        </div>
      </div>
    );
  }

  // ── Active ─────────────────────────────────────────────────────────────────
  if (!q) return null;
  const typeLabel: Record<string, string> = { mcq: "MCQ", short: "Short Answer", application: "Apply It!" };
  const typeIcon: Record<string, string> = { mcq: "🔘", short: "✍️", application: "💡" };

  return (
    <div className="glass" style={{ borderRadius: 20, padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 99,
          background: "rgba(79,142,247,0.15)",
          color: "#4f8ef7",
        }}>
          {typeIcon[q.type]} {typeLabel[q.type]}
        </span>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Q {current + 1} / {questions.length} &nbsp;·&nbsp; ✅ {score}
        </span>
      </div>

      {/* Progress track */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, marginBottom: 20 }}>
        <div style={{
          height: "100%",
          width: `${((current) / questions.length) * 100}%`,
          background: "linear-gradient(90deg,#4f8ef7,#22d3ee)",
          borderRadius: 99,
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Question */}
      <p style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.5, marginBottom: 18, color: "var(--text-primary)" }}>
        {q.question}
      </p>

      {/* MCQ options */}
      {q.type === "mcq" && q.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = revealed && opt.toLowerCase().replace(/^[abcd]\)\s*/i, "").includes(
              q.answer.toLowerCase().replace(/^[abcd]\)\s*/i, "").slice(0, 8)
            );
            const isWrong = revealed && isSelected && !isCorrect;

            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setSelected(opt)}
                style={{
                  textAlign: "left",
                  padding: "11px 16px",
                  borderRadius: 12,
                  border: `1px solid ${
                    isCorrect ? "rgba(52,211,153,0.6)"
                    : isWrong ? "rgba(248,113,113,0.6)"
                    : isSelected ? "rgba(79,142,247,0.6)"
                    : "var(--glass-border)"
                  }`,
                  background: isCorrect ? "rgba(52,211,153,0.12)"
                    : isWrong ? "rgba(248,113,113,0.12)"
                    : isSelected ? "rgba(79,142,247,0.12)"
                    : "var(--glass-bg)",
                  color: "var(--text-primary)",
                  cursor: revealed ? "default" : "pointer",
                  fontSize: "0.88rem",
                  fontWeight: isSelected ? 700 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {isCorrect && "✓ "}{isWrong && "✗ "}{opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Short / Application input */}
      {(q.type === "short" || q.type === "application") && (
        <textarea
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          disabled={revealed}
          placeholder="Type your answer here…"
          rows={3}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid var(--glass-border)",
            background: "rgba(255,255,255,0.05)",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            marginBottom: 16,
            resize: "vertical",
            outline: "none",
          }}
        />
      )}

      {/* Explanation after reveal */}
      {revealed && (
        <div style={{
          padding: "12px 16px",
          borderRadius: 12,
          background: "rgba(79,142,247,0.1)",
          border: "1px solid rgba(79,142,247,0.25)",
          marginBottom: 16,
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "#4f8ef7" }}>✏️ Correct answer:</strong> {q.answer}
          <br /><strong>💬</strong> {q.explanation}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        {!revealed ? (
          <button
            className="btn-primary"
            disabled={q.type === "mcq" ? !selected : !shortAnswer.trim()}
            style={{ flex: 1, opacity: (q.type === "mcq" ? !selected : !shortAnswer.trim()) ? 0.45 : 1 }}
            onClick={checkAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn-primary" style={{ flex: 1 }} onClick={next}>
            {current + 1 >= questions.length ? "See Results 🏁" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
