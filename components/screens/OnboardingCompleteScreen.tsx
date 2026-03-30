"use client";

interface OnboardingCompleteScreenProps {
  shopName: string;
  onNext: () => void;
}

export default function OnboardingCompleteScreen({
  shopName,
  onNext,
}: OnboardingCompleteScreenProps) {
  return (
    <div
      className="screen fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
      <h1
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#222",
          marginBottom: 16,
          lineHeight: 1.4,
        }}
      >
        {shopName ? `${shopName}の` : ""}
        <br />
        設定が完了しました！
      </h1>
      <p
        style={{
          fontSize: 17,
          color: "#666",
          lineHeight: 1.8,
          marginBottom: 40,
        }}
      >
        これで投稿の準備が整いました。
        <br />
        さっそく最初の投稿を
        <br />
        作ってみましょう！
      </p>

      <div
        className="card"
        style={{
          width: "100%",
          textAlign: "left",
          borderLeft: "4px solid var(--color-main)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 12 }}>
          📋 投稿の作り方（かんたん4ステップ）
        </div>
        {[
          "投稿の目的を選ぶ",
          "写真を選ぶ",
          "AIが文章を作る",
          "コピーしてInstagramに貼る",
        ].map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span style={{ fontSize: 16, color: "#333" }}>{step}</span>
          </div>
        ))}
      </div>

      <button
        className="btn-main"
        style={{ marginTop: 32, fontSize: 20 }}
        onClick={onNext}
      >
        最初の投稿を作る 📸
      </button>
    </div>
  );
}
