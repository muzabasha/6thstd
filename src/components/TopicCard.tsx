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
    <Link href={href} className="no-underline block group">
      <div
        className={`glass glass-hover rounded-2xl p-4 sm:p-5 cursor-pointer relative overflow-hidden opacity-0 h-full transition-all duration-300 ${
          completed ? "border-[rgba(52,211,153,0.35)]" : "border-[var(--glass-border)]"
        }`}
        style={{
          animation: `fadeInUp 0.5s ease forwards ${index * 0.06}s`,
        }}
      >
        {/* Glow accent */}
        <div 
          className="absolute top-0 left-0 w-1 h-full rounded-l-2xl transition-all group-hover:w-2" 
          style={{ background: color.bg }} 
        />

        <div className="pl-3">
          <div className="flex justify-between items-start gap-3">
            <p className="font-bold text-sm sm:text-[15px] text-[var(--text-primary)] leading-snug flex-1 group-hover:text-white transition-colors">
              {topicTitle}
            </p>
            {completed && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center text-[10px] text-white shrink-0 shadow-lg shadow-green-900/20">
                ✓
              </div>
            )}
          </div>

          <p className="text-[11px] sm:text-[13px] text-[var(--text-muted)] mt-2 leading-relaxed line-clamp-2">
            {topicDescription}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span 
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider" 
              style={{ color: color.text, background: color.badge }}
            >
              {chapterTitle}
            </span>
            {quizScore !== undefined && quizTotal !== undefined && (
              <span className={`text-[11px] font-black ${quizScore / quizTotal >= 0.6 ? "text-[#34d399]" : "text-[#fb923c]"}`}>
                Score: {quizScore}/{quizTotal}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>

  );
}
