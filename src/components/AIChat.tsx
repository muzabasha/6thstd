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
      const history = messages.slice(-10);
      const answer = await askTutor(subject, topic, history, question);
      const aiMsg: ChatMessage = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, subject, topic]);

  const suggestions = [
    `Explain ${topic} simply`,
    `Give me an example of ${topic}`,
    "Can you ask me a question?",
    "What's the most important thing to remember?",
  ];

  return (
    <div className="flex flex-col h-full" style={{ minHeight: "420px" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          style={{
            width: 40, height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4f8ef7,#a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem",
            boxShadow: "0 0 20px rgba(79,142,247,0.4)",
          }}
        >
          🤖
        </div>
        <div>
          <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem" }}>AI Tutor</p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Ask me anything about {topic}</p>
        </div>
        <div style={{
          marginLeft: "auto",
          padding: "4px 12px",
          borderRadius: 99,
          background: "rgba(52,211,153,0.15)",
          color: "#34d399",
          fontSize: "0.72rem",
          fontWeight: 700,
          border: "1px solid rgba(52,211,153,0.3)",
        }}>
          ● Online
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          padding: "12px",
          borderRadius: 12,
          background: "rgba(0,0,0,0.2)",
          border: "1px solid var(--glass-border)",
          marginBottom: 12,
          maxHeight: "380px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>💬</div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Start a conversation!</p>
            <p style={{ fontSize: "0.82rem" }}>Ask anything about {topic}</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "var(--text-primary)",
              }}
            >
              {msg.role === "user" ? (
                <p>{msg.content}</p>
              ) : (
                <div className="prose" style={{ color: "var(--text-primary)" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div className="chat-bubble-ai" style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8, height: 8,
                      borderRadius: "50%",
                      background: "var(--blue)",
                      animation: `pulse-ring 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(248,113,113,0.12)",
            border: "1px solid rgba(248,113,113,0.3)",
            color: "#f87171",
            fontSize: "0.82rem",
          }}>
            ⚠️ {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 99,
                border: "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                color: "var(--text-secondary)",
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "var(--glass-bg)"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); void sendMessage(); }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid var(--glass-border)",
            background: "rgba(255,255,255,0.06)",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{ padding: "12px 18px", opacity: loading || !input.trim() ? 0.5 : 1 }}
        >
          ➤
        </button>
      </form>
    </div>
  );
}
