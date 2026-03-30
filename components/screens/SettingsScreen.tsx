"use client";

import { AppSettings } from "@/lib/types";
import { JOB_TYPE_LABELS } from "@/lib/constants";
import BackButton from "@/components/ui/BackButton";

interface SettingsScreenProps {
  settings: AppSettings;
  onBack: () => void;
  onResetOnboarding: () => void;
  onEditSection: (section: "branding" | "persona" | "design" | "frequency") => void;
}

export default function SettingsScreen({
  settings,
  onBack,
  onResetOnboarding,
  onEditSection,
}: SettingsScreenProps) {
  const { jobType, jobTypeCustom, branding, persona, design, frequency } = settings;
  const jobLabel =
    jobType === "other"
      ? jobTypeCustom || "その他"
      : jobType
      ? JOB_TYPE_LABELS[jobType]
      : "未設定";

  const FREQ_LABELS: Record<string, string> = {
    weekly1: "週1回",
    weekly2: "週2回",
    weekly3: "週3回",
    daily: "毎日",
  };

  return (
    <div className="screen fade-in">
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: 24 }}>
        <h2 className="page-title">⚙️ 設定</h2>
      </div>

      {/* Current settings summary */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#444", marginBottom: 12 }}>
          現在の設定
        </div>
        <SettingRow label="職種" value={jobLabel} />
        <SettingRow label="お店の名前" value={branding.shopName || "未設定"} />
        <SettingRow label="サービス" value={branding.services || "未設定"} />
        <SettingRow label="雰囲気" value={branding.atmosphere || "未設定"} />
        <SettingRow label="カラー" value={design.colorScheme || "未設定"} />
        <SettingRow label="投稿スタイル" value={design.vibe || "未設定"} />
        <SettingRow label="投稿頻度" value={FREQ_LABELS[frequency] || "未設定"} />
      </div>

      {/* Edit sections */}
      <div style={{ fontSize: 15, fontWeight: 700, color: "#444", marginBottom: 12 }}>
        設定を変更する
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="btn-select"
          onClick={() => onEditSection("branding")}
        >
          <span style={{ fontSize: 20 }}>🏪</span>
          <span>お店の情報を変更する</span>
          <span style={{ marginLeft: "auto", color: "#bbb" }}>→</span>
        </button>
        <button
          className="btn-select"
          onClick={() => onEditSection("persona")}
        >
          <span style={{ fontSize: 20 }}>👥</span>
          <span>お客様の設定を変更する</span>
          <span style={{ marginLeft: "auto", color: "#bbb" }}>→</span>
        </button>
        <button
          className="btn-select"
          onClick={() => onEditSection("design")}
        >
          <span style={{ fontSize: 20 }}>🎨</span>
          <span>デザイン設定を変更する</span>
          <span style={{ marginLeft: "auto", color: "#bbb" }}>→</span>
        </button>
        <button
          className="btn-select"
          onClick={() => onEditSection("frequency")}
        >
          <span style={{ fontSize: 20 }}>📅</span>
          <span>投稿頻度を変更する</span>
          <span style={{ marginLeft: "auto", color: "#bbb" }}>→</span>
        </button>
      </div>

      {/* Privacy */}
      <div className="card" style={{ marginTop: 24, backgroundColor: "#f9f9f9" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#444", marginBottom: 8 }}>
          🔒 プライバシーについて
        </div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
          このアプリに入力されたお店の情報は、
          あなたのスマートフォン内にのみ保存されます。
          外部のサーバーには送信・保存されません。
          AI投稿文の生成時のみ、Anthropic社のAPIに
          情報が送信されます。
        </p>
      </div>

      {/* Reset */}
      <div style={{ marginTop: 24 }}>
        <button
          onClick={onResetOnboarding}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "1px solid #ffaaaa",
            backgroundColor: "#fff8f8",
            color: "#cc4444",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          初期設定をやり直す
        </button>
      </div>

      <div style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "#ccc" }}>
        Instagram投稿アシスタント v1.0
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <span style={{ fontSize: 14, color: "#888" }}>{label}</span>
      <span style={{ fontSize: 14, color: "#333", fontWeight: 500, maxWidth: "60%", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
