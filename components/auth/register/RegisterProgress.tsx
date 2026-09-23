"use client";

import { Check } from "lucide-react";

interface RegisterProgressProps {
  currentStep: number;
  totalSteps: number;
}

const labels = [
  "Basic information",
  "Work preferences",
  "Verification",
];

export default function RegisterProgress({
  currentStep,
  totalSteps,
}: RegisterProgressProps) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
            Registration
          </p>

          <p className="mt-1 text-sm font-semibold text-[var(--text)]">
            {labels[currentStep - 1] ?? `Step ${currentStep}`}
          </p>
        </div>

        <span className="text-xs font-medium text-[var(--text-muted)]">
          {currentStep} / {totalSteps}
        </span>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const completed = step < currentStep;
          const active = step === currentStep;

          return (
            <div key={step} className="flex flex-1 gap-2">
              <div
                className={`h-1.5 w-full transition-colors ${
                  completed || active
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--border)]"
                }`}
              />

              {step === currentStep && (
                <span className="hidden">
                  {completed && <Check />}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}