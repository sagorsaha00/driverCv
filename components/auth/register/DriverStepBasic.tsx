"use client";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  UserRound,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

import DriverImageUpload from "./DriverImageUpload";
import { isValidEmail, isValidSwedishPhone } from "@/lib/utils/validation";

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
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const isPhoneValid = isValidSwedishPhone(data.phonenumber);
  const isEmailValid = isValidEmail(data.email);

  const canContinue =
    data.fullname.trim().length >= 2 &&
    isEmailValid &&
    isPhoneValid &&
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

        <div>
          <Field
            label="Phone number (Sweden)"
            required
            icon={<Phone className="h-4 w-4 text-[var(--text-subtle)]" />}
          >
            <input
              type="tel"
              value={data.phonenumber}
              onBlur={() => setPhoneTouched(true)}
              onChange={(e) => {
                setData("phonenumber", e.target.value);
                setPhoneTouched(true);
              }}
              placeholder="+46 70 123 45 67 or 070 123 45 67"
              className={`${inputClass} ${
                phoneTouched && !isPhoneValid
                  ? "border-red-400 focus:border-red-500"
                  : isPhoneValid
                  ? "border-green-500 focus:border-green-600"
                  : ""
              }`}
            />
          </Field>
          {phoneTouched && !isPhoneValid && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-600">
              <AlertCircle className="h-3 w-3 shrink-0" />
              Must be a valid Swedish phone number (+46 7X... or 07X...)
            </p>
          )}
          {data.phonenumber && isPhoneValid && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <CheckCircle2 className="h-3 w-3 shrink-0" />
              Valid Swedish phone format
            </p>
          )}
        </div>

        <div>
          <Field
            label="Email address"
            required
            icon={<Mail className="h-4 w-4 text-[var(--text-subtle)]" />}
          >
            <input
              type="email"
              value={data.email}
              onBlur={() => setEmailTouched(true)}
              onChange={(e) => {
                setData("email", e.target.value);
                setEmailTouched(true);
              }}
              placeholder="driver@gmail.com"
              className={`${inputClass} ${
                emailTouched && !isEmailValid
                  ? "border-red-400 focus:border-red-500"
                  : isEmailValid
                  ? "border-green-500 focus:border-green-600"
                  : ""
              }`}
            />
          </Field>
          {emailTouched && !isEmailValid && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-red-600">
              <AlertCircle className="h-3 w-3 shrink-0" />
              Please enter a valid email address (e.g. driver@gmail.com)
            </p>
          )}
          {data.email && isEmailValid && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <CheckCircle2 className="h-3 w-3 shrink-0" />
              Valid email format
            </p>
          )}
        </div>

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
