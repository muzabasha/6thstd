"use client";

import { useState, useCallback } from "react";
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
  const [phase, setPhase]           = useState<Phase>("idle");
  const [questions, setQuestions]   = useState<QuizQuestion[]>([]);
  const [current, setCurrent]       = useState(0);
  const [selected, setSelected]     = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [revealed, setRevealed]     = useState(false);
  const [score, setScore]           = useState(0);
  const [errorMsg, setErrorMsg]     = useState("");

  const startQuiz = useCallback(async () => {
    setPhase("loading");
    setScore(0);
    setCurrent(0);
    setSelected(null);
    setShortAnswer("");
    setRevealed(false);
    try {
      const qs = await generateQuiz(subject, topic, topicId);
      if (!qs || qs.length === 0) throw new Error("No questions returned.");
      setQuestions(qs);
      setPhase("active");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to generate quiz.");
      setPhase("error");
    }
  }, [subject, topic, topicId]);

  const q = questions[current];

  const checkAnswer = useCallback(() => {
    if (!q) return;
    const userAns = q.type === "mcq" ? selected : shortAnswer;
    const correct = userAns
      ? q.answer.toLowerCase().includes(userAns.toLowerCase().replace(/^[abcd]\)\s*/i, "").slice(0, 10))
      : false;
    setRevealed(true);
    if (correct) setScore((s) => s + 1);
  }, [q, selected, shortAnswer]);

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
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
  }, [current, questions.length, score, subject, topicId]);

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  // ── Idle ───────────────────────────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <div
        className="glass rounded-[20px] text-center"
        style={{ padding: "clamp(1.5rem, 5vw, 3rem)" }}
      >
        <div
          className="animate-float inline-block"
          style={{ fontSize: "clamp(3rem, 10vw, 5rem)", marginBottom: "1rem" }}
        >
          🧠
        </div>
        <h3
          className="font-black"
          style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.5rem" }}
        >
          Practice Quiz
        </h3>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(0.825rem, 2.5vw, 0.975rem)",
            marginBottom: "2rem",
            maxWidth: 380,
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          Test your knowledge on{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{topic}</span>.
          <br />
          10 feedback-based questions await!
        </p>
        <button
          className="btn-primary"
          style={{
            width: "100%",
            maxWidth: 280,
            padding: "0.875rem 2rem",
            fontSize: "clamp(1rem, 3vw, 1.125rem)",
            boxShadow: "0 8px 32px rgba(79,142,247,0.4)",
          }}
          onClick={() => void startQuiz()}
        >
          🚀 Start Quiz
        </button>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div
        className="glass rounded-[20px] text-center"
        style={{ padding: "clamp(2rem, 6vw, 4rem)" }}
      >
        <div
          className="animate-spin-slow inline-block"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "1.5rem" }}
        >
          ⚙️
        </div>
        <p
          className="font-black"
          style={{ color: "var(--text-secondary)", fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
        >
          Generating your quiz…
        </p>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            marginTop: "0.75rem",
          }}
        >
          Sadiya is crafting questions just for you!
        </p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (phase === "error") {
    return (
      <div
        className="glass rounded-[20px] text-center"
        style={{ padding: "clamp(2rem, 6vw, 3rem)" }}
      >
        <div style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "1rem" }}>⚠️</div>
        <p
          className="font-black mb-8"
          style={{ color: "#f87171", fontSize: "clamp(0.875rem, 2.5vw, 1.1rem)" }}
        >
          {errorMsg}
        </p>
        <button
          className="btn-secondary"
          style={{ padding: "0.625rem 1.5rem" }}
          onClick={() => setPhase("idle")}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  if (phase === "done") {
    const passed = pct >= 60;
    return (
      <div
        className="glass rounded-[20px] text-center relative overflow-hidden"
        style={{ padding: "clamp(2rem, 6vw, 3.5rem)" }}
      >
        {/* Top status bar */}
        <div
          className="absolute top-0 inset-x-0"
          style={{
            height: 4,
            background: passed ? "linear-gradient(90deg,#34d399,#22d3ee)" : "linear-gradient(90deg,#fb923c,#f59e0b)",
          }}
        />

        <div style={{ fontSize: "clamp(3rem, 10vw, 5rem)", marginBottom: "1.25rem" }}>
          {passed ? "🎉" : "💪"}
        </div>
        <h3
          className="font-black"
          style={{ fontSize: "clamp(1.35rem, 4.5vw, 1.875rem)", marginBottom: "0.5rem" }}
        >
          {passed ? "Excellent work!" : "Keep practicing!"}
        </h3>

        {/* Score display */}
        <div
          className="font-black bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(3rem, 14vw, 5.5rem)",
            marginBottom: "1rem",
            background: passed
              ? "linear-gradient(135deg, #34d399, #22d3ee)"
              : "linear-gradient(135deg, #fb923c, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          {score}/{questions.length}
        </div>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(0.825rem, 2.5vw, 0.975rem)",
            marginBottom: "2rem",
            maxWidth: 380,
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          You scored{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{pct}%</span>
          {" — "}
          {passed ? "topic marked complete! ✅" : "score 60% to unlock completion."}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <button
            className="btn-primary"
            style={{ width: "100%", maxWidth: 260 }}
            onClick={() => void startQuiz()}
          >
            🔄 Retry Quiz
          </button>
          <button
            className="btn-secondary"
            style={{ width: "100%", maxWidth: 260 }}
            onClick={() => setPhase("idle")}
          >
            Back to Topic
          </button>
        </div>
      </div>
    );
  }

  // ── Active ─────────────────────────────────────────────────────────────────
  if (!q) return null;

  const typeLabel: Record<string, string> = { mcq: "Multiple Choice", short: "Short Answer", application: "Case Study" };
  const typeIcon: Record<string, string>  = { mcq: "🔘", short: "✍️", application: "💡" };

  return (
    <div className="glass rounded-[24px]" style={{ padding: "clamp(1.25rem, 4vw, 2.5rem)" }}>

      {/* Header row */}
      <div className="flex justify-between items-center gap-3 mb-5">
        <span
          className="font-black uppercase"
          style={{
            fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
            letterSpacing: "0.08em",
            padding: "0.25rem 0.75rem",
            borderRadius: 99,
            background: "rgba(79,142,247,0.15)",
            color: "#4f8ef7",
            whiteSpace: "nowrap",
          }}
        >
          {typeIcon[q.type]} {typeLabel[q.type]}
        </span>
        <span
          className="font-bold whitespace-nowrap"
          style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "var(--text-muted)" }}
        >
          Q {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: 5,
          background: "rgba(255,255,255,0.08)",
          marginBottom: "clamp(1.25rem, 4vw, 2rem)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${(current / questions.length) * 100}%`,
            background: "linear-gradient(90deg, #4f8ef7, #22d3ee)",
          }}
        />
      </div>

      {/* Question */}
      <h4
        className="font-black text-[var(--text-primary)] leading-snug"
        style={{
          fontSize: "clamp(1rem, 3.5vw, 1.375rem)",
          marginBottom: "clamp(1.25rem, 4vw, 2rem)",
        }}
      >
        {q.question}
      </h4>

      {/* MCQ options */}
      {q.type === "mcq" && q.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "clamp(1.25rem, 4vw, 2rem)" }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect  = revealed && opt.toLowerCase().replace(/^[abcd]\)\s*/i, "").includes(
              q.answer.toLowerCase().replace(/^[abcd]\)\s*/i, "").slice(0, 8)
            );
            const isWrong    = revealed && isSelected && !isCorrect;

            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setSelected(opt)}
                className="text-left flex items-start gap-3 transition-all duration-300"
                style={{
                  padding: "clamp(0.75rem, 2.5vw, 1.25rem)",
                  borderRadius: 16,
                  border: `1px solid ${isCorrect ? "rgba(52,211,153,0.5)" : isWrong ? "rgba(248,113,113,0.5)" : isSelected ? "rgba(79,142,247,0.5)" : "var(--glass-border)"}`,
                  background: isCorrect ? "rgba(52,211,153,0.1)" : isWrong ? "rgba(248,113,113,0.1)" : isSelected ? "rgba(79,142,247,0.1)" : "rgba(255,255,255,0.03)",
                  fontSize: "clamp(0.825rem, 2.5vw, 1rem)",
                  color: "var(--text-primary)",
                  fontWeight: isSelected || revealed ? 700 : 400,
                  cursor: revealed ? "default" : "pointer",
                  transform: !revealed && isSelected ? "translateY(-1px)" : "none",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!revealed) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { if (!revealed && !isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                {/* Option letter circle */}
                <span
                  className="flex items-center justify-center shrink-0 font-black"
                  style={{
                    width: "clamp(1.4rem, 5vw, 1.75rem)",
                    height: "clamp(1.4rem, 5vw, 1.75rem)",
                    borderRadius: "50%",
                    fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
                    background: isCorrect ? "#34d399" : isWrong ? "#f87171" : isSelected ? "#4f8ef7" : "rgba(255,255,255,0.1)",
                    color: "#fff",
                    marginTop: "0.1rem",
                  }}
                >
                  {isCorrect ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <span style={{ flex: 1 }}>{opt.replace(/^[abcd]\)\s*/i, "")}</span>
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
          placeholder="Enter your detailed answer here..."
          className="w-full rounded-2xl border focus:outline-none transition-colors resize-none"
          style={{
            padding: "clamp(0.875rem, 3vw, 1.25rem)",
            borderColor: "var(--glass-border)",
            background: "rgba(255,255,255,0.05)",
            color: "var(--text-primary)",
            fontSize: "clamp(0.825rem, 2.5vw, 1rem)",
            marginBottom: "clamp(1.25rem, 4vw, 2rem)",
            minHeight: "clamp(100px, 20vw, 140px)",
            fontFamily: "inherit",
          }}
          onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(79,142,247,0.5)"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
          onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "var(--glass-border)"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
        />
      )}

      {/* Explanation after reveal */}
      {revealed && (
        <div
          className="animate-fade-in-up rounded-2xl border"
          style={{
            padding: "clamp(1rem, 3vw, 1.75rem)",
            background: "rgba(79,142,247,0.08)",
            borderColor: "rgba(79,142,247,0.2)",
            marginBottom: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          <div
            className="flex items-center gap-2 font-black uppercase"
            style={{
              fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
              letterSpacing: "0.1em",
              color: "#4f8ef7",
              marginBottom: "0.75rem",
            }}
          >
            <span
              className="flex items-center justify-center"
              style={{
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "50%",
                background: "rgba(79,142,247,0.2)",
                fontSize: "0.875rem",
              }}
            >
              💡
            </span>
            <span>Explanation</span>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(0.825rem, 2.5vw, 0.975rem)",
              lineHeight: 1.65,
              marginBottom: "1rem",
            }}
          >
            {q.explanation}
          </p>
          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="font-bold uppercase"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                marginBottom: "0.25rem",
              }}
            >
              Correct Answer
            </p>
            <p className="font-bold text-white" style={{ fontSize: "clamp(0.825rem, 2.5vw, 1rem)" }}>
              {q.answer}
            </p>
          </div>
        </div>
      )}

      {/* Action button */}
      <div>
        {!revealed ? (
          <button
            className="btn-primary w-full font-black transition-all"
            style={{
              padding: "clamp(0.75rem, 3vw, 1rem)",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
              opacity: (q.type === "mcq" ? !selected : !shortAnswer.trim()) ? 0.3 : 1,
              cursor: (q.type === "mcq" ? !selected : !shortAnswer.trim()) ? "not-allowed" : "pointer",
              transform: (q.type === "mcq" ? !selected : !shortAnswer.trim()) ? "scale(0.97)" : "scale(1)",
            }}
            disabled={q.type === "mcq" ? !selected : !shortAnswer.trim()}
            onClick={checkAnswer}
          >
            ✓ Check Answer
          </button>
        ) : (
          <button
            className="btn-primary w-full font-black"
            style={{
              padding: "clamp(0.75rem, 3vw, 1rem)",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            }}
            onClick={next}
          >
            {current + 1 >= questions.length ? "Finish & See Results 🏁" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
