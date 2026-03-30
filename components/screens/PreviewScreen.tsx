"use client";

import { useState } from "react";
import { GeneratedPost } from "@/lib/types";
import BackButton from "@/components/ui/BackButton";

type Layout = "A" | "B" | "C";

interface PreviewScreenProps {
  post: GeneratedPost;
  hashtags: string[];
  photo: string | null;
  layout: Layout;
  shopName: string;
  colorMain: string;
  colorSub: string;
  onSaveDraft: () => void;
  onGoToInstagram: () => void;
  onBack: () => void;
}

export default function PreviewScreen({
  post,
  hashtags,
  photo,
  layout,
  shopName,
  colorMain,
  colorSub,
  onSaveDraft,
  onGoToInstagram,
  onBack,
}: PreviewScreenProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSaveDraft();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderPreview = () => {
    const textContent = (
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.8,
          color: "#333",
          whiteSpace: "pre-line",
        }}
      >
        {post.text}
        <br />
        <br />
        <span style={{ color: "#0095f6", fontSize: 14 }}>
          {hashtags.join(" ")}
        </span>
      </div>
    );

    if (layout === "A") {
      return (
        <div>
          {photo && (
            <img
              src={photo}
              alt="投稿画像"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "12px 12px 0 0",
              }}
            />
          )}
          <div style={{ padding: "16px" }}>{textContent}</div>
        </div>
      );
    }

    if (layout === "B") {
      return (
        <div>
          {photo && (
            <img
              src={photo}
              alt="投稿画像"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                borderRadius: "12px 12px 0 0",
              }}
            />
          )}
          <div
            style={{
              padding: "16px",
              backgroundColor: colorSub,
              borderRadius: "0 0 12px 12px",
            }}
          >
            {textContent}
          </div>
        </div>
      );
    }

    // Layout C: text overlay on photo
    return (
      <div style={{ position: "relative" }}>
        {photo ? (
          <>
            <img
              src={photo}
              alt="投稿画像"
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
                padding: "48px 16px 16px",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <div style={{ fontSize: 14, color: "#fff", lineHeight: 1.6 }}>
                {post.text.slice(0, 80)}...
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: 16 }}>{textContent}</div>
        )}
      </div>
    );
  };

  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: 20 }}>
        <h2 className="page-title">プレビュー</h2>
        <p className="page-subtitle">Instagramでの見え方のイメージです</p>
      </div>

      {/* Instagram-like preview */}
      <div
        style={{
          border: "1px solid #dbdbdb",
          borderRadius: 12,
          backgroundColor: "#fff",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: colorMain,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {shopName.charAt(0) || "S"}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>
              {shopName || "あなたのお店"}
            </div>
            <div style={{ fontSize: 12, color: "#999" }}>たった今</div>
          </div>
        </div>

        {renderPreview()}

        {/* Actions */}
        <div style={{ padding: "12px 16px" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
            <span style={{ fontSize: 22 }}>🤍</span>
            <span style={{ fontSize: 22 }}>💬</span>
            <span style={{ fontSize: 22 }}>✈️</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <button
        className="btn-main"
        onClick={onGoToInstagram}
        style={{ fontSize: 18 }}
      >
        📱 Instagramに投稿する
      </button>
      <button
        className="btn-secondary"
        onClick={handleSave}
        style={{ marginTop: 12 }}
      >
        {saved ? "✓ 下書きに保存しました！" : "📂 下書きとして保存する"}
      </button>
    </div>
  );
}
