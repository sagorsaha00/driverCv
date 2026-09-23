"use client";

import { Building2, Truck } from "lucide-react";
import { motion } from "framer-motion";

import type { UserRole } from "@/type/auth";

interface RegisterRoleSwitcherProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

export default function RegisterRoleSwitcher({
  role,
  onChange,
}: RegisterRoleSwitcherProps) {
  return (
    <div className="mb-7">
      <div className="grid grid-cols-2 border border-[var(--border)] bg-[var(--surface-muted)] p-1">
        <button
          type="button"
          onClick={() => onChange("driver")}
          className={`relative flex h-11 items-center justify-center gap-2 text-sm font-medium transition-colors ${
            role === "driver"
              ? "text-[var(--primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          {role === "driver" && (
            <motion.div
              layoutId="register-role"
              className="absolute inset-0 border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xs)]"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          <Truck className="relative z-10 h-4 w-4" />

          <span className="relative z-10">Driver</span>
        </button>

        <button
          type="button"
          onClick={() => onChange("employer")}
          className={`relative flex h-11 items-center justify-center gap-2 text-sm font-medium transition-colors ${
            role === "employer"
              ? "text-[var(--primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          {role === "employer" && (
            <motion.div
              layoutId="register-role"
              className="absolute inset-0 border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xs)]"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          <Building2 className="relative z-10 h-4 w-4" />

          <span className="relative z-10">Employer</span>
        </button>
      </div>
    </div>
  );
}
