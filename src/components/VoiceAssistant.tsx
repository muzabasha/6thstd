"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Web Speech API types (not in default TS lib)
interface SpeechRecognitionResult {
  readonly 0: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionResultList {
  readonly 0: SpeechRecognitionResult;
  readonly length: number;
}
interface SpeechRecognitionEventInit {
  results: SpeechRecognitionResultList;
}
interface WebSpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}
interface WebSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((e: WebSpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition?: new () => WebSpeechRecognition;
    webkitSpeechRecognition?: new () => WebSpeechRecognition;
  }
}

// Silence TS about unused type
type _Init = SpeechRecognitionEventInit;

interface VoiceAssistantProps {
  onTranscript: (text: string) => void;
  speakText?: string;
  disabled?: boolean;
}

export default function VoiceAssistant({ onTranscript, speakText, disabled }: VoiceAssistantProps) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSupported(false);
      return;
    }
    const rec = new SpeechRecognitionAPI();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";
    rec.onresult = (e: WebSpeechRecognitionEvent) => {
      const t = e.results[0][0].transcript;
      onTranscript(t);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [onTranscript]);

  // Speak text when speakText changes
  useEffect(() => {
    if (!speakText || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(speakText);
    utt.lang = "en-IN";
    utt.rate = 0.92;
    utt.pitch = 1.05;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
    return () => { window.speechSynthesis.cancel(); };
  }, [speakText]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  }, [listening]);

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  if (!supported) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={toggleListening}
        disabled={disabled}
        title={listening ? "Stop listening" : "Speak your question"}
        style={{
          position: "relative",
          width: 44, height: 44,
          borderRadius: "50%",
          border: "none",
          background: listening
            ? "linear-gradient(135deg,#f87171,#e11d48)"
            : "linear-gradient(135deg,#4f8ef7,#7c3aed)",
          color: "white",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: listening ? "0 0 0 0 rgba(248,113,113,0.4)" : "0 4px 15px rgba(79,142,247,0.4)",
          animation: listening ? "pulse-ring 1.5s ease-out infinite" : "none",
          transition: "all 0.3s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {listening ? "⏹" : "🎤"}
      </button>

      {speaking && (
        <button
          onClick={stopSpeaking}
          title="Stop speaking"
          style={{
            width: 44, height: 44,
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg,#34d399,#059669)",
            color: "white",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(52,211,153,0.4)",
          }}
        >
          🔊
        </button>
      )}

      {listening && (
        <span style={{ fontSize: "0.78rem", color: "#f87171", fontWeight: 700 }}>
          Listening…
        </span>
      )}
    </div>
  );
}
