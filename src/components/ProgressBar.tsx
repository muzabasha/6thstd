"use client";

interface ProgressBarProps {
  percent: number;
  label?: string;
  color?: string;
  height?: number;
  showLabel?: boolean;
  animate?: boolean;
}

export default function ProgressBar({
  percent,
  label,
  color = "linear-gradient(90deg,#4f8ef7,#22d3ee)",
  height = 8,
  showLabel = true,
  animate = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs text-[var(--text-secondary)] font-semibold truncate mr-2">{label}</span>
          )}
          {showLabel && (
            <span className="text-xs text-[var(--text-secondary)] font-bold ml-auto shrink-0">{clamped}%</span>
          )}
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden bg-[rgba(255,255,255,0.1)]"
        style={{ height }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${clamped}%`,
            background: color,
            transition: animate ? "width 1s cubic-bezier(0.4,0,0.2,1)" : "none",
          }}
        />
      </div>
    </div>
  );
}
