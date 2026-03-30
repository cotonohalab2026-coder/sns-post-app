"use client";

import BackButton from "@/components/ui/BackButton";

interface InstagramGuideScreenProps {
  onDone: () => void;
  onBack: () => void;
}

const STEPS = [
  {
    step: 1,
    icon: "📋",
    title: "文章をコピーする",
    desc: "「投稿文をコピー」ボタンを押して、文章とハッシュタグをコピーします",
  },
  {
    step: 2,
    icon: "📷",
    title: "Instagramアプリを開く",
    desc: "スマホのInstagramアプリを開いてください",
  },
  {
    step: 3,
    icon: "➕",
    title: "新規投稿ボタンをタップ",
    desc: "画面下の「＋」ボタンをタップします",
  },
  {
    step: 4,
    icon: "🖼️",
    title: "写真を選ぶ",
    desc: "投稿したい写真を選択します",
  },
  {
    step: 5,
    icon: "✏️",
    title: "文章を貼り付ける",
    desc: "「キャプションを書く」欄も長押しして「貼り付け」を選びます",
  },
  {
    step: 6,
    icon: "✅",
    title: "投稿する",
    desc: "右上の「シェア」ボタンをタップして完了！",
  },
];

export default function InstagramGuideScreen({
  onDone,
  onBack,
}: InstagramGuideScreenProps) {
  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📱</div>
        <h2 className="page-title">Instagram投稿の手順</h2>
        <p className="page-subtitle">
          以下の手順でInstagramに投稿できます
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {STEPS.map((s) => (
          <div
            key={s.step}
            className="card"
            style={{ padding: "16px 20px" }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-main)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {s.step}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#222", marginBottom: 4 }}>
                  {s.icon} {s.title}
                </div>
                <div style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="card"
        style={{
          marginTop: 16,
          backgroundColor: "var(--color-sub)",
          border: "none",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
          🎉 投稿できたら素晴らしい！
        </div>
        <p style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.7 }}>
          継続することがSNS運用の一番のコツです。
          <br />
          次の投稿もお手伝いします！
        </p>
      </div>

      <button
        className="btn-main"
        onClick={onDone}
        style={{ marginTop: 24 }}
      >
        ホームに戻る 🏠
      </button>
    </div>
  );
}
