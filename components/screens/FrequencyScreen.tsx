"use client";

import { useState } from "react";
import { FREQUENCY_OPTIONS } from "@/lib/constants";
import BackButton from "@/components/ui/BackButton";

interface FrequencyScreenProps {
  current: string;
  onNext: (frequency: string) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function FrequencyScreen({
  current,
  onNext,
  onBack,
  isFirstPost,
}: FrequencyScreenProps) {
  const [selected, setSelected] = useState(current || "weekly1");

  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      {isFirstPost && (
        <div style={{ marginBottom: 16 }}>
          <span className="badge">ステップ 5 / 5</span>
          <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
            投稿頻度設定（今ここです）
          </div>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
        <h2 className="page-title">週に何回投稿しますお���</h2>
        <p className="page-subtitle">
          決めた回数に合わせて、
          <br />
          次の投稿日をお知らせします
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FREQUENCY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`btn-select ${selected === opt.value ? "selected" : ""}`}
            onClick={() => setSelected(opt.value)}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <span style={{ fontSize: 20, fontWeight: 700 }}>{opt.label}</span>
            <span style={{ fontSize: 14, color: "#999" }}>
              {opt.days === 1
                ? "毎日更新"
                : `${opt.days}日ごとに更新`}
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <button
          className="btn-main"
          onClick={() => onNext(selected)}
        >
          この設定で始める ✨
        </button>
      </div>
    </div>
  );
}
