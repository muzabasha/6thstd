"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type ChatMessage, askTutor } from "@/lib/openai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIChatProps {
  subject: string;
  topic: string;
  initialMessage?: string;
}

export default function AIChat({ subject, topic, initialMessage }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const didSendInitial = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-send voice transcription if provided
  useEffect(() => {
    if (initialMessage && !didSendInitial.current) {
      didSendInitial.current = true;
      setInput(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = useCallback(async (text?: string) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    const userMsg: ChatMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const answer = await askTutor(subject, topic);
      const aiMsg: ChatMessage = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [input, loading, subject, topic]);

  const suggestions = [
    `Explain ${topic} simply`,
    `Give me an example of ${topic}`,
    "Can you ask me a question?",
    "What's the most important thing to remember?",
  ];

  return (
    <div className="flex flex-col h-full min-h-[420px] sm:min-h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#a78bfa] flex items-center justify-center text-xl sm:text-2xl shadow-[0_0_20px_rgba(79,142,247,0.4)]">
          🤖
        </div>
        <div>
          <p className="font-black text-[var(--text-primary)] text-sm sm:text-base">AI Tutor</p>
          <p className="text-[10px] sm:text-xs text-[var(--text-muted)] font-medium">Asking about {topic}</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest hidden sm:block">
          ● AI Active
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 sm:p-5 rounded-2xl bg-black/30 border border-[var(--glass-border)] mb-4 min-h-[300px] flex flex-col gap-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <div className="text-4xl sm:text-5xl mb-4 opacity-50">💬</div>
            <p className="font-bold text-base sm:text-lg mb-1 text-[var(--text-secondary)]">Ask me anything!</p>
            <p className="text-xs sm:text-sm">I&apos;m here to help you understand {topic.toLowerCase()} better.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"} max-w-[90%] sm:max-w-[85%] px-4 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-base leading-relaxed text-[var(--text-primary)] shadow-lg`}
            >
              {msg.role === "user" ? (
                <p className="font-medium">{msg.content}</p>
              ) : (
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai px-5 py-4">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--blue)] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] text-[11px] sm:text-xs text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); void sendMessage(); }}
        className="flex gap-2 sm:gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={loading}
          className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[var(--glass-border)] bg-white/5 text-[var(--text-primary)] text-sm sm:text-base outline-none focus:border-[var(--blue)]/50 focus:bg-white/10 transition-all placeholder:text-white/20"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`btn-primary px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all ${loading || !input.trim() ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
        >
          <span className="text-xl">➤</span>
        </button>
      </form>
    </div>

  );
}
