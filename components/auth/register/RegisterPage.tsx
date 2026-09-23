"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import type { UserRole } from "@/type/auth";
import RegisterSidebar from "./RegisterSidebar";
import RegisterRoleSwitcher from "./RegisterRoleSwitcher";
import RegisterProgress from "./RegisterProgress";
import DriverRegisterForm from "./DriverRegisterForm";
import HRRegisterForm from "./HRRegisterForm";

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("driver");
  const [step, setStep] = useState(1);

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    setStep(1);
  };

  return (
    <main className="bg-[var(--bg)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        {/* <RegisterSidebar role={role} /> */}

        <section className="flex min-w-0 flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
          <div className="w-full max-w-[720px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/"
                className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div className="mb-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                  HireDriver
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                  Create your account
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                  Join the HireDriver network and connect with the right
                  opportunities.
                </p>
              </div>

              <RegisterRoleSwitcher role={role} onChange={handleRoleChange} />

              {role === "driver" ? (
                <>
                  <RegisterProgress currentStep={step} totalSteps={3} />

                  <DriverRegisterForm step={step} setStep={setStep} />
                </>
              ) : (
                <HRRegisterForm />
              )}

              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[var(--primary)] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
