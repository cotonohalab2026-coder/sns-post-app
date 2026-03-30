"use client";

import { AppSettings } from "@/lib/types";
import { getNextPostDate } from "@/lib/utils";
import { JOB_TYPE_LABELS, FREQUENCY_OPTIONS } from "@/lib/constants";

interface HomeScreenProps {
  settings: AppSettings;
  onCreatePost: () => void;
  onPastPosts: () => void;
  onSettings: () => void;
}

export default function HomeScreen({
  settings,
  onCreatePost,
  onPastPosts,
  onSettings,
}: HomeScreenProps) {
  const { branding, jobType, frequency, lastPostDate } = settings;
  const nextPostDate = getNextPostDate(frequency, lastPostDate);
  const freq = FREQUENCY_OPTIONS.find((f) => f.value === frequency);
  const jobLabel =
    jobType === "other"
      ? settings.jobTypeCustom || "個人事業主"
      : jobType
      ? JOB_TYPE_LABELS[jobType]
      : "";

  return (
    <div className="screen fade-in">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "#999", marginBottom: 2 }}>
            📸 Instagram投稿アシスタント
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#222" }}>
            {branding.shopName || "ホーム"}
          </h1>
          {jobLabel && (
            <span className="badge" style={{ marginTop: 4 }}>
              {jobLabel}
            </span>
          )}
        </div>
        <button
          onClick={onSettings}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 28,
            padding: "4px 8px",
          }}
          title="設定"
        >
          ⚙️
        </button>
      </div>

      {/* Next post date card */}
      <div
        className="card"
        style={{ borderLeft: "4px solid var(--color-main)" }}
      >
        <div style={{ fontSize: 14, color: "#888", marginBottom: 6 }}>
          📅 次の投稿予定日
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)" }}>
          {nextPostDate}
        </div>
        {freq && (
          <div style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>
            {freq.label}のペースで投稿中
          </div>
        )}
      </div>

      {/* Main action button */}
      <div style={{ marginTop: 24, marginBottom: 16 }}>
        <button
          className="btn-main"
          onClick={onCreatePost}
          style={{ fontSize: 20, padding: "20px 24px" }}
        >
          ✏️ 投稿を作る
        </button>
      </div>

      {/* Secondary button */}
      <button className="btn-secondary" onClick={onPastPosts}>
        📂 過去の投稿を見る
      </button>

      {/* Tips */}
      <div className="card" style={{ marginTop: 24, backgroundColor: "#f9f9f9" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 8 }}>
          💡 上手な投稿のヒント
        </div>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>
          写真は明るく撮ると反応がアップします。
          窓際の自然光を使うのがおすきめです！
        </p>
      </div>

      {/* Trust badge */}
      <div className="trust-badge" style={{ marginTop: 24 }}>
        <span>🔒</span>
        <span>入力された情報は外部に保存されません</span>
      </div>
    </div>
  );
}
