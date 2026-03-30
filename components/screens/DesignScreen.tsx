"use client";

import { useState } from "react";
import { COLOR_SCHEMES, VIBE_OPTIONS } from "@/lib/constants";
import { DesignSettings } from "@/lib/types";
import BackButton from "@/components/ui/BackButton";
import ProgressSteps from "@/components/ui/ProgressSteps";

interface DesignScreenProps {
  current: DesignSettings;
  onNext: (data: DesignSettings) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function DesignScreen({
  current,
  onNext,
  onBack,
  isFirstPost,
}: DesignScreenProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DesignSettings>({ ...current });

  const steps = [
    {
      question: "お店のイメージカラーを選んでください",
      field: "colorScheme" as keyof DesignSettings,
      type: "color",
    },
    {
      question: "投稿の雰囲気はどちらに近いですか？",
      field: "vibe" as keyof DesignSettings,
      type: "select",
    },
  ];

  const currentStep = steps[step];
  const currentValue = data[currentStep.field];
  const canProceed = !!currentValue;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onNext(data);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="screen fade-in">
      <BackButton onClick={handleBack} />

      {isFirstPost && (
        <div style={{ marginBottom: 8 }}>
          <span className="badge">ステップ 4 / 5</span>
          <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
            デザイン設定（今ここです）
          </div>
        </div>
      )}

      <ProgressSteps current={step + 1} total={2} label={`質問 ${step + 1} / 2`} />

      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title" style={{ fontSize: 22 }}>
          {currentStep.question}
        </h2>
      </div>

      {currentStep.type === "color" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {COLOR_SCHEMES.map((scheme) => (
            <button
              key={scheme.label}
              className={`btn-select ${data.colorScheme === scheme.label ? "selected" : ""}`}
              onClick={() =>
                setData({ ...data, colorScheme: scheme.label })
              }
              style={{
                borderColor:
                  data.colorScheme === scheme.label ? scheme.main : "#e0e0e0",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${scheme.main}, ${scheme.sub})`,
                  flexShrink: 0,
                  border: "2px solid rgba(0,0,0,0.08)",
                }}
              />
              <div>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{scheme.label}</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#999",
                    marginTop: 2,
                  }}
                >
                  サンプル色
                </div>
              </div>
              {/* Color preview */}
              <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: scheme.main,
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: scheme.sub,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {currentStep.type === "select" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {VIBE_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`btn-select ${data.vibe === opt ? "selected" : ""}`}
              onClick={() => setData({ ...data, vibe: opt })}
            >
              <span style={{ fontSize: 17 }}>{opt}</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <button
          className="btn-main"
          onClick={handleNext}
          disabled={!canProceed}
        >
          {step < steps.length - 1 ? "次の質問へ →" : "設定完了 →"}
        </button>
      </div>
    </div>
  );
}
