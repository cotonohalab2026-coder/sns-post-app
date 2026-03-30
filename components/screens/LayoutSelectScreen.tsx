"use client";

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";

type Layout = "A" | "B" | "C";

interface LayoutSelectScreenProps {
  photo: string | null;
  current: Layout;
  onNext: (layout: Layout) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

const LAYOUTS: { id: Layout; name: string; desc: string; icon: string }[] = [
  { id: "A", name: "写真メイン", desc: "写真を大きく・文字は少なめ", icon: "🖼️" },
  { id: "B", name: "写真＋テキスト", desc: "写真と文章を並べる", icon: "📄" },
  { id: "C", name: "文字入り写真", desc: "写真の上に文字を重ねる", icon: "✍️" },
];

export default function LayoutSelectScreen({
  photo,
  current,
  onNext,
  onBack,
  isFirstPost,
}: LayoutSelectScreenProps) {
  const [selected, setSelected] = useState<Layout>(current || "A");

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
            📍 今ここです：レイアウトを選ぶ
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h2 className="page-title">レイアウトを選んでください</h2>
        <p className="page-subtitle">投稿の見せ方を選びます</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            className={`btn-select ${selected === layout.id ? "selected" : ""}`}
            onClick={() => setSelected(layout.id)}
            style={{ padding: "16px 20px" }}
          >
            <span style={{ fontSize: 28 }}>{layout.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                パターン {layout.id}：{layout.name}
              </div>
              <div style={{ fontSize: 14, color: "#888", marginTop: 2 }}>
                {layout.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {photo && (
        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
            選択した写真のプレビュー
          </div>
          <img
            src={photo}
            alt="プレビュー"
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <button className="btn-main" onClick={() => onNext(selected)}>
          このレイアウトで続ける →
        </button>
      </div>
    </div>
  );
}
