"use client";

import { ArrowRight, Eye, EyeOff, Mail, Phone, UserRound } from "lucide-react";
import { useState } from "react";

import DriverImageUpload from "./DriverImageUpload";

export interface DriverFormData {
  fullname: string;
  email: string;
  phonenumber: string;
  password: string;
  ProfileImage: string;
  workingHours: string;
  licenseCategories: string[];
  targetMonthlySalary: string;
  regions: string[];
  personalIdentityNumber: string;
  drivingLicenseNumber: string;
  certificates: string;
  vehicleTypes: string[];
  weekendAvailable: boolean;
  hasYKB: boolean;
  hasDigitalTacho: boolean;
}

interface DriverStepBasicProps {
  data: DriverFormData;
  setData: <K extends keyof DriverFormData>(
    key: K,
    value: DriverFormData[K],
  ) => void;
  onNext: () => void;
}

function Field({
  label,
  icon,
  children,
  required = false,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text)]">
        {icon}
        {label}
        {required && <span className="text-[var(--danger)]">*</span>}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary-400)] focus:ring-3 focus:ring-[var(--focus-ring)]";

export default function DriverStepBasic({
  data,
  setData,
  onNext,
}: DriverStepBasicProps) {
  const [showPassword, setShowPassword] = useState(false);

  const canContinue =
    data.fullname.trim() &&
    data.email.trim() &&
    data.phonenumber.trim() &&
    data.password.length >= 8;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Tell us about yourself
        </h2>

        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
          Add your basic information so companies can identify your professional
          profile.
        </p>
      </div>

      <div className="border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="mb-5">
          <p className="text-sm font-semibold text-[var(--text)]">
            Profile photo
          </p>

          <p className="mt-1 text-xs text-[var(--text-subtle)]">
            A professional photo helps companies recognize your profile.
          </p>
        </div>

        <DriverImageUpload
          value={data.ProfileImage}
          onChange={(url) => setData("ProfileImage", url)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          icon={<UserRound className="h-4 w-4 text-[var(--text-subtle)]" />}
        >
          <input
            type="text"
            value={data.fullname}
            onChange={(e) => setData("fullname", e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </Field>

        <Field
          label="Phone number"
          required
          icon={<Phone className="h-4 w-4 text-[var(--text-subtle)]" />}
        >
          <input
            type="tel"
            value={data.phonenumber}
            onChange={(e) => setData("phonenumber", e.target.value)}
            placeholder="+46 70 123 45 67"
            className={inputClass}
          />
        </Field>

        <Field
          label="Email address"
          required
          icon={<Mail className="h-4 w-4 text-[var(--text-subtle)]" />}
        >
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Password" required>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Minimum 8 characters"
              className={`${inputClass} pr-11`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[var(--text-subtle)] hover:text-[var(--text)]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>
      </div>

      <div className="flex justify-end border-t border-[var(--border-subtle)] pt-6">
        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="inline-flex h-11 items-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--on-primary)] transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
