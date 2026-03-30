"use client";

import { useRef, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import { compressImage } from "@/lib/utils";

interface PhotoUploadScreenProps {
  purpose: string;
  currentPhoto: string | null;
  onNext: (photo: string | null) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function PhotoUploadScreen({
  purpose,
  currentPhoto,
  onNext,
  onBack,
  isFirstPost,
}: PhotoUploadScreenProps) {
  const [photo, setPhoto] = useState<string | null>(currentPhoto);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      const compressed = await compressImage(base64);
      setPhoto(compressed);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

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
            📍 今ここです：写真を選ぶ
          </div>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <span className="badge">{purpose}</span>
        <h2 className="page-title" style={{ marginTop: 12 }}>
          写真を選んでください
        </h2>
        <p className="page-subtitle">
          投稿に使いたい写真を1枚選びます
        </p>
      </div>

      {/* Photo upload area */}
      {!photo ? (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed var(--color-main)",
            borderRadius: 20,
            padding: "48px 24px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "var(--color-bg)",
            transition: "background 0.2s",
          }}
        >
          {loading ? (
            <div>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
              <div style={{ color: "#888", fontSize: 16 }}>読み込み中...</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 52, marginBottom: 16 }}>📷</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#333", marginBottom: 8 }}>
                ここをタップして写真を選ぶ
              </div>
              <div style={{ fontSize: 14, color: "#999" }}>
                スマホの写真アルバムから選べます
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <img
            src={photo}
            alt="選択した写真"
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: 20,
              border: "2px solid var(--color-main)",
            }}
          />
          <button
            onClick={() => {
              setPhoto(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {photo && (
        <button
          onClick={() => inputRef.current?.click()}
          className="btn-secondary"
          style={{ marginTop: 12 }}
        >
          別の写真を選ぶ
        </button>
      )}

      <div style={{ marginTop: 24 }}>
        <button
          className="btn-main"
          onClick={() => onNext(photo)}
          disabled={!photo}
        >
          この写真で続ける →
        </button>
        <button
          onClick={() => onNext(null)}
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
          写真なしで続ける
        </button>
      </div>
    </div>
  );
}
