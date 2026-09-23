"use client";

import { ArrowLeft, Check, FileText, ShieldCheck } from "lucide-react";

import type { DriverFormData } from "./DriverStepBasic";

interface Props {
  data: DriverFormData;
  setData: <K extends keyof DriverFormData>(
    key: K,
    value: DriverFormData[K],
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const inputClass =
  "h-11 w-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary-400)] focus:ring-3 focus:ring-[var(--focus-ring)]";

export default function DriverStepVerification({
  data,
  setData,
  onBack,
  onSubmit,
  loading,
}: Props) {
  const canSubmit =
    data.personalIdentityNumber.trim() && data.drivingLicenseNumber.trim();

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Verification details
        </h2>

        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
          Add the information needed to complete your professional driver
          profile.
        </p>
      </div>

      <div className="flex gap-3 border border-[var(--info)]/20 bg-[var(--info-bg)] p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--info)]" />

        <div>
          <p className="text-sm font-semibold text-[var(--text)]">
            Your information is handled securely
          </p>

          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
            Only provide information required by your registration process.
            Sensitive documents should not be uploaded to a public profile.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-medium text-[var(--text)]">
            Personal identity number
          </span>

          <input
            type="text"
            value={data.personalIdentityNumber}
            onChange={(e) => setData("personalIdentityNumber", e.target.value)}
            placeholder="YYYYMMDD-XXXX"
            className={inputClass}
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-[var(--text)]">
            Driving license number
          </span>

          <input
            type="text"
            value={data.drivingLicenseNumber}
            onChange={(e) => setData("drivingLicenseNumber", e.target.value)}
            placeholder="License number"
            className={inputClass}
          />
        </label>
      </div>

      <section className="border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center bg-[var(--primary-50)]">
            <FileText className="h-4 w-4 text-[var(--primary)]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">
              Certifications
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--text-subtle)]">
              Tell employers about your additional qualifications.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-between border border-[var(--border)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">
                YKB certification
              </p>

              <p className="text-xs text-[var(--text-subtle)]">
                Professional driver qualification
              </p>
            </div>

            <input
              type="checkbox"
              checked={data.hasYKB}
              onChange={(e) => setData("hasYKB", e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between border border-[var(--border)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">
                Digital tachograph
              </p>

              <p className="text-xs text-[var(--text-subtle)]">
                Digital tachograph card
              </p>
            </div>

            <input
              type="checkbox"
              checked={data.hasDigitalTacho}
              onChange={(e) => setData("hasDigitalTacho", e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
          </label>
        </div>
      </section>

      <label>
        <span className="mb-2 block text-sm font-medium text-[var(--text)]">
          Additional certificates
        </span>

        <textarea
          value={data.certificates}
          onChange={(e) => setData("certificates", e.target.value)}
          rows={4}
          placeholder="ADR, forklift, crane, first aid..."
          className="w-full resize-none border border-[var(--border)] bg-[var(--surface)] p-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary-400)] focus:ring-3 focus:ring-[var(--focus-ring)]"
        />
      </label>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
        <button
          type="button"
          disabled={loading}
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 px-3 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="button"
          disabled={!canSubmit || loading}
          onClick={onSubmit}
          className="inline-flex h-11 items-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Creating account...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Create driver account
            </>
          )}
        </button>
      </div>
    </div>
  );
}
