"use client";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = "戻る" }: BackButtonProps) {
  return (
    <button className="back-btn" onClick={onClick}>
      <span style={{ fontSize: 20 }}>←</span>
      <span>{label}</span>
    </button>
  );
}
