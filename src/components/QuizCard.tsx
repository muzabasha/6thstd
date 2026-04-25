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
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

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

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <div className="glass rounded-[20px] p-6 sm:p-10 text-center">
        <div className="text-5xl sm:text-7xl mb-4 animate-float">🧠</div>
        <h3 className="font-black text-xl sm:text-2xl mb-2">Practice Quiz</h3>
        <p className="text-[var(--text-muted)] text-sm sm:text-base mb-8 max-w-[400px] mx-auto leading-relaxed">
          Test your knowledge on <span className="text-[var(--text-primary)] font-bold">{topic}</span>.
          <br className="hidden sm:block" /> 10 feedback-based questions await!
        </p>
        <button className="btn-primary w-full sm:w-auto px-8 py-4 text-lg shadow-xl" onClick={() => void startQuiz()}>
          🚀 Start Quiz
        </button>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="glass rounded-[20px] p-8 sm:p-12 text-center">
        <div className="text-4xl sm:text-6xl mb-6 animate-spin-slow">⚙️</div>
        <p className="text-[var(--text-secondary)] font-black text-lg sm:text-xl">Generating your quiz…</p>
        <p className="text-[var(--text-muted)] text-xs sm:text-sm mt-3">Sadiya is crafting questions just for you!</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (phase === "error") {
    return (
      <div className="glass rounded-[20px] p-8 sm:p-10 text-center">
        <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
        <p className="text-[#f87171] font-black text-base sm:text-lg mb-8">{errorMsg}</p>
        <button className="btn-secondary w-full sm:w-auto px-6 py-3" onClick={() => setPhase("idle")}>Try Again</button>
      </div>
    );
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  if (phase === "done") {
    const passed = pct >= 60;
    return (
      <div className="glass rounded-[20px] p-8 sm:p-12 text-center relative overflow-hidden">
        <div className={`absolute top-0 inset-x-0 h-2 ${passed ? 'bg-green-500' : 'bg-orange-500'}`} />
        <div className="text-5xl sm:text-7xl mb-6">{passed ? "🎉" : "💪"}</div>
        <h3 className="font-black text-2xl sm:text-3xl mb-2">
          {passed ? "Excellent work!" : "Keep practicing!"}
        </h3>
        <div className={`text-6xl sm:text-8xl font-black mb-4 bg-clip-text text-transparent ${passed ? 'bg-gradient-to-br from-[#34d399] to-[#22d3ee]' : 'bg-gradient-to-br from-[#fb923c] to-[#f59e0b]'}`}>
          {score}/{questions.length}
        </div>
        <p className="text-[var(--text-muted)] text-sm sm:text-base mb-8 max-w-[400px] mx-auto leading-relaxed">
          You scored <span className="text-[var(--text-primary)] font-bold">{pct}%</span> — {passed ? "topic marked complete! ✅" : "score 60% to unlock completion."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn-primary w-full sm:w-auto px-8 py-3" onClick={() => void startQuiz()}>🔄 Retry Quiz</button>
          <button className="btn-secondary w-full sm:w-auto px-8 py-3" onClick={() => setPhase("idle")}>Back to Topic</button>
        </div>
      </div>
    );
  }

  // ── Active ─────────────────────────────────────────────────────────────────
  if (!q) return null;
  const typeLabel: Record<string, string> = { mcq: "Multiple Choice", short: "Short Answer", application: "Case Study" };
  const typeIcon: Record<string, string> = { mcq: "🔘", short: "✍️", application: "💡" };

  return (
    <div className="glass rounded-[24px] p-5 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <span className="text-[10px] sm:text-xs font-black px-3 py-1 rounded-full bg-[rgba(79,142,247,0.15)] text-[#4f8ef7] uppercase tracking-wider">
          {typeIcon[q.type]} {typeLabel[q.type]}
        </span>
        <span className="text-xs sm:text-sm font-bold text-[var(--text-muted)] whitespace-nowrap">
          Question {current + 1} of {questions.length}
        </span>
      </div>

      {/* Progress track */}
      <div className="h-1.5 w-full bg-[rgba(255,255,255,0.08)] rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#4f8ef7] to-[#22d3ee] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="font-black text-lg sm:text-xl md:text-2xl leading-snug mb-8 text-[var(--text-primary)]">
        {q.question}
      </h4>

      {/* MCQ options */}
      {q.type === "mcq" && q.options && (
        <div className="grid grid-cols-1 gap-3 mb-8">
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
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-sm sm:text-base flex items-start gap-4 ${isCorrect ? "border-green-500/50 bg-green-500/10 text-white font-bold"
                  : isWrong ? "border-red-500/50 bg-red-500/10 text-white font-bold"
                    : isSelected ? "border-[var(--blue)]/50 bg-[var(--blue)]/10 text-white font-bold"
                      : "border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.06)]"
                  } ${revealed ? 'cursor-default' : 'cursor-pointer hover:-translate-y-1'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] sm:text-xs ${isCorrect ? 'bg-green-500 text-white' :
                  isWrong ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-[var(--blue)] text-white' : 'bg-white/10 text-white/40'
                  }`}>
                  {isCorrect ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt.replace(/^[abcd]\)\s*/i, "")}</span>
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
          className="w-full p-5 rounded-2xl border border-[var(--glass-border)] bg-white/5 text-[var(--text-primary)] text-sm sm:text-base mb-8 min-h-[120px] focus:outline-none focus:border-[var(--blue)]/50 transition-colors placeholder:text-white/20 resize-none"
        />
      )}

      {/* Explanation after reveal */}
      {revealed && (
        <div className="p-5 sm:p-7 rounded-2xl bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#4f8ef7]/20 flex items-center justify-center text-sm">💡</span>
            <span className="text-[13px] font-black uppercase tracking-widest text-[#4f8ef7]">Explanation</span>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4">
            {q.explanation}
          </p>
          <div className="pt-4 border-t border-white/5">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1">Correct Answer</p>
            <p className="text-sm sm:text-base font-bold text-white">{q.answer}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {!revealed ? (
          <button
            className={`btn-primary flex-1 py-4 text-base font-black shadow-lg transition-all ${(q.type === "mcq" ? !selected : !shortAnswer.trim()) ? "opacity-30 cursor-not-allowed scale-95" : "hover:scale-[1.02]"
              }`}
            disabled={q.type === "mcq" ? !selected : !shortAnswer.trim()}
            onClick={checkAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn-primary flex-1 py-4 text-base font-black shadow-lg hover:scale-[1.02] transition-all" onClick={next}>
            {current + 1 >= questions.length ? "Finish & See Results 🏁" : "Next Question →"}
          </button>
        )}
      </div>
    </div>

  );
}
