"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  Truck,
} from "lucide-react";

import type { DriverFormData } from "./DriverStepBasic";

interface Props {
  data: DriverFormData;
  setData: <K extends keyof DriverFormData>(
    key: K,
    value: DriverFormData[K],
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

const vehicleOptions = [
  "Heavy Truck",
  "Trailer",
  "Tanker",
  "Refrigerated",
  "Tautliner",
  "Van",
  "Delivery Truck",
  "ADR Transport",
];

const regions = [
  "Stockholm",
  "Gothenburg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
];

const inputClass =
  "h-11 w-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary-400)] focus:ring-3 focus:ring-[var(--focus-ring)]";

export default function DriverStepCapabilities({
  data,
  setData,
  onNext,
  onBack,
}: Props) {
  const toggleArrayValue = (key: "vehicleTypes" | "regions", value: string) => {
    const current = data[key];

    setData(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const toggleLicense = (value: string) => {
    const current = data.licenseCategories;

    setData(
      "licenseCategories",
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const canContinue =
    data.vehicleTypes.length > 0 &&
    data.regions.length > 0 &&
    data.workingHours &&
    data.targetMonthlySalary;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Your work preferences
        </h2>

        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
          Tell companies what type of work you are looking for.
        </p>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Truck className="h-4 w-4 text-[var(--primary)]" />

          <h3 className="text-sm font-semibold text-[var(--text)]">
            Vehicle types
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {vehicleOptions.map((vehicle) => {
            const selected = data.vehicleTypes.includes(vehicle);

            return (
              <button
                key={vehicle}
                type="button"
                onClick={() => toggleArrayValue("vehicleTypes", vehicle)}
                className={`flex min-h-[52px] items-center justify-between border px-3 text-left text-xs font-medium transition ${
                  selected
                    ? "border-[var(--primary-400)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                }`}
              >
                <span>{vehicle}</span>

                {selected && (
                  <Check className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[var(--primary)]" />

          <h3 className="text-sm font-semibold text-[var(--text)]">
            Preferred regions
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {regions.map((region) => {
            const selected = data.regions.includes(region);

            return (
              <button
                key={region}
                type="button"
                onClick={() => toggleArrayValue("regions", region)}
                className={`border px-3 py-3 text-left text-xs font-medium transition ${
                  selected
                    ? "border-[var(--primary-400)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
                }`}
              >
                <span className="flex items-center justify-between">
                  {region}

                  {selected && (
                    <Check className="h-3.5 w-3.5 text-[var(--primary)]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text)]">
            <Clock3 className="h-4 w-4 text-[var(--text-subtle)]" />
            Working hours
          </span>

          <select
            value={data.workingHours}
            onChange={(e) => setData("workingHours", e.target.value)}
            className={inputClass}
          >
            <option value="">Select availability</option>
            <option value="full-time">Full time</option>
            <option value="part-time">Part time</option>
            <option value="flexible">Flexible</option>
            <option value="weekends">Weekends</option>
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-[var(--text)]">
            Target monthly salary
          </span>

          <div className="relative">
            <input
              type="number"
              value={data.targetMonthlySalary}
              onChange={(e) => setData("targetMonthlySalary", e.target.value)}
              placeholder="38000"
              className={`${inputClass} pr-16`}
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-subtle)]">
              SEK
            </span>
          </div>
        </label>
      </section>

      <section className="border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--text)]">
              Weekend availability
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Let employers know if you can work weekends.
            </p>
          </div>

          <input
            type="checkbox"
            checked={data.weekendAvailable}
            onChange={(e) => setData("weekendAvailable", e.target.checked)}
            className="h-4 w-4 accent-[var(--primary)]"
          />
        </label>
      </section>

      <section>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-[var(--text)]">
            License categories
          </h3>

          <p className="mt-1 text-xs text-[var(--text-subtle)]">
            Select the licenses you currently hold.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["B", "C", "CE", "C1", "C1E", "D", "DE"].map((license) => {
            const selected = data.licenseCategories.includes(license);

            return (
              <button
                key={license}
                type="button"
                onClick={() => toggleLicense(license)}
                className={`min-w-14 border px-4 py-2.5 text-sm font-semibold transition ${
                  selected
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary-300)]"
                }`}
              >
                {license}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 px-3 text-sm font-semibold text-[var(--text-muted)] transition hover:text-[var(--text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="inline-flex h-11 items-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
