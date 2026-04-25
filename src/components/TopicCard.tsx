"use client";

import Link from "next/link";
import { slugify, getSubjectColor } from "@/lib/utils";

interface TopicCardProps {
  subjectName: string;
  chapterTitle: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string;
  completed?: boolean;
  quizScore?: number;
  quizTotal?: number;
  index?: number;
}

export default function TopicCard({
  subjectName,
  chapterTitle,
  topicId,
  topicTitle,
  topicDescription,
  completed = false,
  quizScore,
  quizTotal,
  index = 0,
}: TopicCardProps) {
  const color = getSubjectColor(subjectName);
  const href = `/learn/${slugify(subjectName)}/${topicId}`;
  const quizPassed = quizScore !== undefined && quizTotal !== undefined && quizScore / quizTotal >= 0.6;

  return (
    <Link href={href} className="no-underline block group" style={{ height: "100%" }}>
      <div
        className={`glass glass-hover rounded-2xl cursor-pointer relative overflow-hidden opacity-0 h-full transition-all duration-300 ${
          completed ? "border-[rgba(52,211,153,0.35)]" : ""
        }`}
        style={{
          padding: "clamp(0.875rem, 3vw, 1.25rem)",
          animation: `fadeInUp 0.5s ease forwards ${index * 0.055}s`,
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
          /* Completed glow accent */
          boxShadow: completed
            ? "0 0 0 1px rgba(52,211,153,0.3), 0 8px 32px rgba(0,0,0,0.4)"
            : undefined,
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute top-0 left-0 h-full rounded-l-2xl transition-all group-hover:w-2"
          style={{ width: 3, background: color.bg }}
        />

        <div style={{ paddingLeft: "0.75rem" }}>
          {/* Title row */}
          <div className="flex justify-between items-start gap-3">
            <p
              className="font-bold text-[var(--text-primary)] leading-snug flex-1 group-hover:text-white transition-colors"
              style={{ fontSize: "clamp(0.825rem, 2.5vw, 0.9375rem)" }}
            >
              {topicTitle}
            </p>
            {completed && (
              <div
                className="flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-900/20"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #34d399, #059669)",
                  fontSize: "0.6rem",
                  fontWeight: 900,
                }}
              >
                ✓
              </div>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(0.7rem, 2vw, 0.8125rem)",
              color: "var(--text-muted)",
              marginTop: "0.375rem",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {topicDescription}
          </p>

          {/* Footer row */}
          <div
            className="flex items-center justify-between"
            style={{ marginTop: "0.875rem" }}
          >
            {/* Chapter badge */}
            <span
              className="font-bold uppercase"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.06em",
                padding: "0.2rem 0.6rem",
                borderRadius: 99,
                color: color.text,
                background: color.badge,
                maxWidth: "60%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {chapterTitle}
            </span>

            {/* Quiz score OR arrow */}
            {quizScore !== undefined && quizTotal !== undefined ? (
              <span
                className="font-black"
                style={{
                  fontSize: "0.6875rem",
                  color: quizPassed ? "#34d399" : "#fb923c",
                  whiteSpace: "nowrap",
                }}
              >
                {quizPassed ? "✓" : ""} {quizScore}/{quizTotal}
              </span>
            ) : (
              <span
                className="font-black transition-transform group-hover:translate-x-1"
                style={{ fontSize: "0.75rem", color: color.text }}
              >
                →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
