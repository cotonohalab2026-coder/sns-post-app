"use client";

import { useState } from "react";
import {
  JOB_TYPE_PERSONA_OPTIONS,
  DESIRED_EMOTION_OPTIONS,
  VISIT_OCCASION_OPTIONS,
} from "@/lib/constants";
import { PersonaSettings, JobType } from "@/lib/types";
import BackButton from "@/components/ui/BackButton";
import ProgressSteps from "@/components/ui/ProgressSteps";

interface PersonaScreenProps {
  current: PersonaSettings;
  jobType: JobType | null;
  onNext: (data: PersonaSettings) => void;
  onBack: () => void;
  isFirstPost?: boolean;
}

export default function PersonaScreen({
  current,
  jobType,
  onNext,
  onBack,
  isFirstPost,
}: PersonaScreenProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<PersonaSettings>({ ...current });

  const jt = (jobType || "other") as JobType;
  const personaOptions = JOB_TYPE_PERSONA_OPTIONS[jt] || JOB_TYPE_PERSONA_OPTIONS.other;
  const visitOptions = VISIT_OCCASION_OPTIONS[jt] || VISIT_OCCASION_OPTIONS.other;

  const steps = [
    {
      question: "よく来てくれるお客様はどんな人ですか？",
      hint: "あてはまるものを選んでください",
      field: "customerType" as keyof PersonaSettings,
      type: "select",
      options: personaOptions,
    },
    {
      question: "どんなときに来てくれますか？",
      hint: "あてはまるものを選んでください",
      field: "visitOccasion" as keyof PersonaSettings,
      type: "select",
      options: visitOptions,
    },
    {
      question: "お客様にどんな気持ちになってほしいですか？",
      hint: "あてはまるものを選んでください",
      field: "desiredEmotion" as keyof PersonaSettings,
      type: "select",
      options: DESIRED_EMOTION_OPTIONS,
    },
    {
      question: "よく喜ばれることは何ですか？",
      hint: "例：丁寧な対応、こだわりの素材、アフターフォロー",
      field: "popularThings" as keyof PersonaSettings,
      type: "text",
      placeholder: "よく喜ばれることを入力してください",
    },
  ];

  const currentStep = steps[step];
  const currentValue = data[currentStep.field];
  const canProceed =
    currentStep.type === "select"
      ? !!currentValue
      : !!(currentValue as string).trim();

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
          <span className="badge">ステップ 3 / 5</span>
          <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
            お客様設定（今ここです）
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

      {currentStep.type === "text" && (
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
