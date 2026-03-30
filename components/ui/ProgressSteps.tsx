"use client";

interface ProgressStepsProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressSteps({ current, total, label }: ProgressStepsProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: i < current ? "var(--color-main)" : "#e0e0e0",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
      {label && (
        <div style={{ fontSize: 13, color: "#888888", textAlign: "center" }}>
          {label}
        </div>
      )}
    </div>
  );
}
