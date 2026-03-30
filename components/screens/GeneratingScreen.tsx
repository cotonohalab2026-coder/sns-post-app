"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "お店の情報を確認しています...",
  "お客様に合わせた文章を考えています...",
  "3つの投稿案を作成しています...",
  "ハッシュタグを選んでいます...",
  "もう少しで完成です...",
];

export default function GeneratingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i < MESSAGES.length - 1 ? i + 1 : i));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="screen"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 60, marginBottom: 24, animation: "spin 2s linear infinite" }}>
        ✨
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#222", marginBottom: 16 }}>
        投稿文を作成中...
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#888",
          minHeight: 24,
          transition: "opacity 0.5s",
        }}
      >
        {MESSAGES[msgIndex]}
      </p>

      <div style={{ marginTop: 32, display: "flex", gap: 10 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="loading-dot"
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "var(--color-main)",
              display: "inline-block",
            }}
          />
        ))}
      </div>

      <div
        className="card"
        style={{
          marginTop: 48,
          width: "100%",
          backgroundColor: "var(--color-sub)",
          border: "none",
        }}
      >
        <p style={{ fontSize: 15, color: "var(--color-text)", lineHeight: 1.7, margin: 0 }}>
          AIがあなたお店の雰囲気・お客様の特徴を
          <br />
          分析して文章を作っています 🤖
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
