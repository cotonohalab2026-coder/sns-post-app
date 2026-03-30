"use client";

import { PURPOSE_OPTIONS } from "@/lib/constants";
import BackButton from "@/components/ui/BackButton";

interface PurposeScreenProps {
  onSelect: (purpose: string) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function PurposeScreen({
  onSelect,
  onBack,
  isFirstPost,
}: PurposeScreenProps) {
  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      {isFirstPost && (
        <div
          className="card"
          style={{
            backgroundColor: "var(--color-sub)",
            marginBottom: 20,
            border: "none",
          }}
        >
          <div style={{ fontSize: 14, color: "var(--color-text)", fontWeight: 600 }}>
            📍 今ここです：投稿の目的を選ぶ
          </div>
          <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>
            今日はどんな投稿をしますか？
          </div>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title">今日の投稿は？</h2>
        <p className="page-subtitle">目的を選んでください</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PURPOSE_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            className="btn-select"
            onClick={() => onSelect(opt.label)}
            style={{ padding: "18px 20px" }}
          >
            <span style={{ fontSize: 28 }}>{opt.emoji}</span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
