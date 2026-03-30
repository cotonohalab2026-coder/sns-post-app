"use client";

import { useState } from "react";
import { ATMOSPHERE_OPTIONS } from "@/lib/constants";
import { BrandingSettings } from "@/lib/types";
import BackButton from "@/components/ui/BackButton";
import ProgressSteps from "@/components/ui/ProgressSteps";

interface BrandingScreenProps {
  current: BrandingSettings;
  onNext: (data: BrandingSettings) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function BrandingScreen({
  current,
  onNext,
  onBack,
  isFirstPost,
}: BrandingScreenProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BrandingSettings>({ ...current });

  const steps = [
    {
      question: "お店の名前は何ですか？",
      hint: "例：花工房 ひまわり、Nail Studio Mimi",
      field: "shopName" as keyof BrandingSettings,
      type: "text",
      placeholder: "お店の名前を入力してください",
    },
    {
      question: "どんなサービスを提供していますか？",
      hint: "例：手作りケーキの販売・バルーン装飾・ネイルアート",
      field: "services" as keyof BrandingSettings,
      type: "text",
      placeholder: "サービス内容を入力してください",
    },
    {
      question: "お店の雰囲気を一言で表すと？",
      hint: "あてはまるものを選んでください",
      field: "atmosphere" as keyof BrandingSettings,
      type: "select",
      options: ATMOSPHERE_OPTIONS,
    },
    {
      question: "お店で大切にしていることは何ですか？",
      hint: "例：お客様一人ひとりに向き合うこと、品質へのこだわり",
      field: "values" as keyof BrandingSettings,
      type: "text",
      placeholder: "大切にしていることを入力してください",
    },
  ];

  const currentStep = steps[step];

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

  const currentValue = data[currentStep.field];
  const canProceed =
    currentStep.type === "select"
      ? !!currentValue
      : !!(currentValue as string).trim();

  return (
    <div className="screen fade-in">
      <BackButton onClick={handleBack} />

      {isFirstPost && (
        <div style={{ marginBottom: 8 }}>
          <span className="badge">ステップ 2 / 5</span>
          <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
            ブランディング設定（今ここです）
          </div>
        </div>
      )}

      <ProgressSteps current={step + 1} total={4} label={`質問 ${step + 1} / 4`} />

      <div style={{ marginBottom: 32 }}>
        <h2 className="page-title" style={{ fontSize: 22 }}>
          {currentStep.question}
        </h2>
        <p style={{ fontSize: 15, color: "#888", marginTop: 4 }}>
          {currentStep.hint}
        </p>
      </div>

      {currentStep.type === "text" && (
        <div>
          <input
            className="input-field"
            type="text"
            placeholder={currentStep.placeholder}
            value={currentValue as string}
            onChange={(e) =>
              setData({ ...data, [currentStep.field]: e.target.value })
            }
            autoFocus
            maxLength={100}
          />
        </div>
      )}

      {currentStep.type === "select" && currentStep.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {currentStep.options.map((opt) => (
            <button
              key={opt}
              className={`btn-select ${currentValue === opt ? "selected" : ""}`}
              onClick={() => setData({ ...data, [currentStep.field]: opt })}
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
