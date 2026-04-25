"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface WebSpeechRecognitionEvent extends Event {
  readonly results: {
    readonly 0: { readonly 0: { readonly transcript: string }; readonly isFinal: boolean };
    readonly length: number;
  };
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

interface VoiceAssistantProps {
  onTranscript: (text: string) => void;
  speakText?: string;
  disabled?: boolean;
}

export default function VoiceAssistant({ onTranscript, speakText, disabled }: VoiceAssistantProps) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  // Initialise supported synchronously so the effect never needs to call setState
  const [supported] = useState(() =>
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);

  // Set up recognition once on mount
  useEffect(() => {
    if (!supported) return;
    const API = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!API) return;
    const rec = new API();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";
    rec.onresult = (e: WebSpeechRecognitionEvent) => {
      onTranscript(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [supported, onTranscript]);

  // Speak text whenever it changes
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
      try { recognitionRef.current.start(); setListening(true); }
      catch { setListening(false); }
    }
  }, [listening]);

  const stopSpeaking = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={toggleListening}
        disabled={disabled}
        title={listening ? "Stop listening" : "Speak your question"}
        className={[
          "relative w-11 h-11 rounded-full border-none flex items-center justify-center text-xl text-white transition-all duration-300 shrink-0",
          listening
            ? "bg-gradient-to-br from-[#f87171] to-[#e11d48] shadow-[0_0_0_0_rgba(248,113,113,0.4)] animate-[pulse-ring_1.5s_ease-out_infinite]"
            : "bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed] shadow-[0_4px_15px_rgba(79,142,247,0.4)]",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95",
        ].join(" ")}
      >
        {listening ? "⏹" : "🎤"}
      </button>

      {speaking && (
        <button
          onClick={stopSpeaking}
          title="Stop speaking"
          className="w-11 h-11 rounded-full border-none bg-gradient-to-br from-[#34d399] to-[#059669] text-white text-xl flex items-center justify-center shadow-[0_4px_15px_rgba(52,211,153,0.4)] cursor-pointer hover:scale-110 active:scale-95 transition-all shrink-0"
        >
          🔊
        </button>
      )}

      {listening && (
        <span className="text-[11px] sm:text-xs text-[#f87171] font-black animate-pulse">
          Listening…
        </span>
      )}
    </div>
  );
}
