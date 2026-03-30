"use client";

import { useEffect } from "react";

interface SplashScreenProps {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onNext, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

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
      <div style={{ fontSize: 72, marginBottom: 24 }}>📸</div>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        Instagram投稿
        <br />
        アシスタント
      </h1>
      <p style={{ fontSize: 17, color: "#666666", lineHeight: 1.7 }}>
        写真を選ぶだけで
        <br />
        プロらしい投稿が完成！
      </p>
      <div style={{ marginTop: 48, display: "flex", gap: 8 }}>
        <span
          className="loading-dot"
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "var(--color-main)",
          }}
        />
        <span
          className="loading-dot"
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "var(--color-main)",
          }}
        />
        <span
          className="loading-dot"
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "var(--color-main)",
          }}
        />
      </div>
    </div>
  );
}
