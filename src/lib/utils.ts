// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SUBJECT_COLORS: Record<string, { bg: string; text: string; glow: string; badge: string }> = {
  Mathematics: {
    bg: "linear-gradient(135deg,#4f8ef7 0%,#7c3aed 100%)",
    text: "#4f8ef7",
    glow: "rgba(79,142,247,0.4)",
    badge: "rgba(79,142,247,0.18)",
  },
  Science: {
    bg: "linear-gradient(135deg,#34d399 0%,#059669 100%)",
    text: "#34d399",
    glow: "rgba(52,211,153,0.4)",
    badge: "rgba(52,211,153,0.18)",
  },
  English: {
    bg: "linear-gradient(135deg,#a78bfa 0%,#ec4899 100%)",
    text: "#a78bfa",
    glow: "rgba(167,139,250,0.4)",
    badge: "rgba(167,139,250,0.18)",
  },
  "Social Science": {
    bg: "linear-gradient(135deg,#fb923c 0%,#f59e0b 100%)",
    text: "#fb923c",
    glow: "rgba(251,146,60,0.4)",
    badge: "rgba(251,146,60,0.18)",
  },
  Hindi: {
    bg: "linear-gradient(135deg,#f87171 0%,#e11d48 100%)",
    text: "#f87171",
    glow: "rgba(248,113,113,0.4)",
    badge: "rgba(248,113,113,0.18)",
  },
  "Computer / ICT": {
    bg: "linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)",
    text: "#22d3ee",
    glow: "rgba(34,211,238,0.4)",
    badge: "rgba(34,211,238,0.18)",
  },
  "General Knowledge": {
    bg: "linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)",
    text: "#fbbf24",
    glow: "rgba(251,191,36,0.4)",
    badge: "rgba(251,191,36,0.18)",
  },
};

export function getSubjectColor(name: string) {
  return (
    SUBJECT_COLORS[name] ?? {
      bg: "linear-gradient(135deg,#6b7280,#374151)",
      text: "#9ca3af",
      glow: "rgba(107,114,128,0.4)",
      badge: "rgba(107,114,128,0.18)",
    }
  );
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
