"use client";

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";

interface MemoScreenProps {
  current: string;
  purpose: string;
  onNext: (memo: string) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function MemoScreen({
  current,
  purpose,
  onNext,
  onBack,
  isFirstPost,
}: MemoScreenProps) {
  const [memo, setMemo] = useState(current);

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
            📍 今ここです：メモを入力する（任意）
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <span className="badge">{purpose}</span>
        <h2 className="page-title" style={{ marginTop: 12 }}>
          一言メモ（任意）
        </h2>
        <p className="page-subtitle">
          AIへの補足メモがあれば入力してください。
          <br />
          書かなくても大丈夫です！
        </p>
      </div>

      <div>
        <textarea
          className="input-field"
          style={{
            minHeight: 120,
            resize: "none",
            lineHeight: 1.6,
          }}
          placeholder="例：今日は春の新作を公開しました！パステルカラーがポイントです。"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={200}
        />
        <div
          style={{
            textAlign: "right",
            fontSize: 13,
            color: "#aaa",
            marginTop: 4,
          }}
        >
          {memo.length} / 200文字
        </div>
      </div>

      <div
        className="card"
        style={{ backgroundColor: "#f9f9f9", marginTop: 16 }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 6 }}>
          💡 メモの例
        </div>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            color: "#666",
            lineHeight: 2,
          }}
        >
          <li>新作の説明や特徴</li>
          <li>キャンペーン・特典情報</li>
          <li>撮影場所・季節について</li>
        </ul>
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="btn-main" onClick={() => onNext(memo)}>
          投稿文を作成する ✨
        </button>
        {!memo && (
          <button
            onClick={() => onNext("")}
            style={{
              marginTop: 12,
              width: "100%",
              background: "none",
              border: "none",
              color: "#999",
              fontSize: 15,
              cursor: "pointer",
              padding: "8px",
              textDecoration: "underline",
            }}
          >
            メモなしで続ける
          </button>
        )}
      </div>
    </div>
  );
}
