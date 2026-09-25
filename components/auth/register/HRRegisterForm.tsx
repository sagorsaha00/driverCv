"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
  Lock,
} from "lucide-react";

import type { HRFormData } from "./types";
import { useAuthStore } from "@/store/authStore";
import { useRegisterHR } from "@/lib/api/apiCall";
import {
  isValidEmail,
  isValidSwedishPhone,
  isValidSwedishOrgNumber,
} from "@/lib/utils/validation";

const initialData: HRFormData = {
  name: "",
  companyName: "",
  organizationNumber: "",
  email: "",
  phoneNumber: "",
  password: "",
};

export default function HRRegisterForm() {
  const router = useRouter();

  const [data, setData] = useState<HRFormData>(initialData);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [orgTouched, setOrgTouched] = useState(false);

  const mutation = useRegisterHR();

  const isEmailValid = isValidEmail(data.email);
  const isPhoneValid = isValidSwedishPhone(data.phoneNumber);
  const isOrgValid = isValidSwedishOrgNumber(data.organizationNumber);

  const isFormValid =
    data.name.trim().length >= 2 &&
    data.companyName.trim().length >= 2 &&
    isOrgValid &&
    isEmailValid &&
    isPhoneValid &&
    data.password.length >= 8;

  const update = (key: keyof HRFormData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    mutation.mutate(
      {
        name: data.name.trim(),
        companyName: data.companyName.trim(),
        organizationNumber: data.organizationNumber.trim(),
        email: data.email.trim(),
        phoneNumber: data.phoneNumber.trim(),
        password: data.password,
      },
      {
        onSuccess: (hr: any) => {
          useAuthStore.getState().setAuth(hr, "hr");

          router.push("/ExploreDrivers");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-lg font-bold">Company Account</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Create an employer account to hire professional drivers.
        </p>
      </div>

      <Field
        icon={<User />}
        label="Contact Person"
        placeholder="Maria Eriksson"
        value={data.name}
        onChange={(value) => update("name", value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          icon={<Building2 />}
          label="Company Name"
          placeholder="ScanLogistics AB"
          value={data.companyName}
          onChange={(value) => update("companyName", value)}
        />

        <div>
          <Field
            label="Organization Number (Sweden)"
            placeholder="556123-4567"
            value={data.organizationNumber}
            onChange={(value) => {
              update("organizationNumber", value);
              setOrgTouched(true);
            }}
          />
          {orgTouched && !isOrgValid && (
            <p className="mt-1 text-[11px] font-medium text-red-600">
              Must be a valid 10-digit Swedish org number (e.g. 556123-4567)
            </p>
          )}
          {data.organizationNumber && isOrgValid && (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              ✓ Valid Swedish org number
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Field
            icon={<Mail />}
            label="Company Email"
            type="email"
            placeholder="hr@company.se"
            value={data.email}
            onChange={(value) => {
              update("email", value);
              setEmailTouched(true);
            }}
          />
          {emailTouched && !isEmailValid && (
            <p className="mt-1 text-[11px] font-medium text-red-600">
              Please enter a valid email address (e.g. hr@company.se)
            </p>
          )}
          {data.email && isEmailValid && (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              ✓ Valid email format
            </p>
          )}
        </div>

        <div>
          <Field
            icon={<Phone />}
            label="Phone (Sweden)"
            type="tel"
            placeholder="+46 8 123 45 67 or 070 123 45 67"
            value={data.phoneNumber}
            onChange={(value) => {
              update("phoneNumber", value);
              setPhoneTouched(true);
            }}
          />
          {phoneTouched && !isPhoneValid && (
            <p className="mt-1 text-[11px] font-medium text-red-600">
              Must be a valid Swedish phone (+46... or 07X...)
            </p>
          )}
          {data.phoneNumber && isPhoneValid && (
            <p className="mt-1 text-[11px] font-medium text-emerald-600">
              ✓ Valid Swedish phone format
            </p>
          )}
        </div>
      </div>

      <Field
        icon={<Lock />}
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        value={data.password}
        onChange={(value) => update("password", value)}
      />

      {mutation.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Registration failed"}
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending || !isFormValid}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating company account...
          </>
        ) : (
          <>
            Create Employer Account
            <CheckCircle2 className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold">{label}</label>

      <div className="relative">
        <input
          type={type}
          required
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border border-border bg-background py-3 text-sm outline-none focus:border-primary ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />

        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
