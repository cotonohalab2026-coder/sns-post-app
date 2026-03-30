"use client";

import { useState } from "react";
import { JOB_TYPES } from "@/lib/constants";
import { JobType } from "@/lib/types";

interface JobTypeScreenProps {
  current: JobType | null;
  currentCustom: string;
  onNext: (jobType: JobType, custom: string) => void;
}

export default function JobTypeScreen({
  current,
  currentCustom,
  onNext,
}: JobTypeScreenProps) {
  const [selected, setSelected] = useState<JobType | null>(current);
  const [customValue, setCustomValue] = useState(currentCustom);

  const handleSelect = (id: JobType) => {
    setSelected(id);
    if (id !== "other") {
      onNext(id, "");
    }
  };

  return (
    <div className="screen fade-in">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
        <h1 className="page-title">あな�のお仕事は？</h1>
        <p className="page-subtitle">
          お仕事の種類を選んでください
          <br />
          <span style={{ fontSize: 14, color: "#999" }}>
            これにより、投稿内容が最適化されます
          </span>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {JOB_TYPES.map((job) => (
          <button
            key={job.id}
            className={`btn-select ${selected === job.id ? "selected" : ""}`}
            onClick={() => handleSelect(job.id)}
          >
            <span style={{ fontSize: 24 }}>{job.emoji}</span>
            <span style={{ fontSize: 18 }}>{job.label}</span>
          </button>
        ))}
      </div>

      {selected === "other" && (
        <div style={{ marginTop: 16 }} className="fade-in">
          <label className="label">おさざしお仕事の内容を教えてください</label>
          <input
            className="input-field"
            type="text"
            placeholder="例：ヨガインストラクター、占い師..."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            maxLength={30}
          />
          <button
            className="btn-main"
            style={{ marginTop: 16 }}
            onClick={() => onNext("other", customValue)}
            disabled={!customValue.trim()}
          >
            次へ →
          </button>
        </div>
      )}

      <div className="trust-badge" style={{ marginTop: 32 }}>
        <span>🔒</span>
        <span>入力され�フ報は外部に保存されません</span>
      </div>
    </div>
  );
}
