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

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        className="glass glass-hover"
        style={{
          borderRadius: 16,
          padding: "16px 18px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          animationDelay: `${index * 0.06}s`,
          opacity: 0,
          animation: `fadeInUp 0.5s ease forwards ${index * 0.06}s`,
          border: completed
            ? "1px solid rgba(52,211,153,0.35)"
            : "1px solid var(--glass-border)",
        }}
      >
        {/* Glow accent */}
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: "4px",
          height: "100%",
          background: color.bg,
          borderRadius: "4px 0 0 4px",
        }} />

        <div style={{ paddingLeft: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <p style={{
              fontWeight: 700,
              fontSize: "0.92rem",
              color: "var(--text-primary)",
              lineHeight: 1.35,
              flex: 1,
            }}>
              {topicTitle}
            </p>
            {completed && (
              <div style={{
                width: 22, height: 22,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#34d399,#059669)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem",
                flexShrink: 0,
              }}>
                ✓
              </div>
            )}
          </div>

          <p style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            marginTop: 4,
            lineHeight: 1.45,
          }}>
            {topicDescription}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{
              fontSize: "0.7rem",
              color: color.text,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 99,
              background: color.badge,
            }}>
              {chapterTitle}
            </span>
            {quizScore !== undefined && quizTotal !== undefined && (
              <span style={{
                fontSize: "0.7rem",
                color: quizScore / quizTotal >= 0.6 ? "#34d399" : "#fb923c",
                fontWeight: 700,
              }}>
                Quiz: {quizScore}/{quizTotal}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
