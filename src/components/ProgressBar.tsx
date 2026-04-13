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
    <div>
      {(label || showLabel) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          {label && (
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {label}
            </span>
          )}
          {showLabel && (
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 700 }}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: animate ? `${clamped}%` : `${clamped}%`,
            background: color,
            transition: animate ? "width 1s cubic-bezier(0.4,0,0.2,1)" : "none",
          }}
        />
      </div>
    </div>
  );
}
