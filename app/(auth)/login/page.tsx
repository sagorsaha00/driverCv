"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Car,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

import type { UserRole } from "@/type/auth";
import { useLoginDriver, useLoginHR } from "@/lib/api/apiCall";

export default function LoginPage() {
  const router = useRouter();

  // ============================================
  // STATE
  // ============================================

  const [role, setRole] = useState<UserRole>("driver");

  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const setAuth = useAuthStore((state) => state.setAuth);

  const driverLogin = useLoginDriver();
  const hrLogin = useLoginHR();

  const isLoggingIn = driverLogin.isPending || hrLogin.isPending;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMsg("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setErrorMsg("Please enter both your email address and password.");

      return;
    }

    try {
      const payload = {
        email,
        password,
      };

      if (role === "driver") {
        const response = await driverLogin.mutateAsync(payload);

        setAuth(response.driver, "driver");

        router.replace("/EmployerJobFeed");

        return;
      }

      const response = await hrLogin.mutateAsync(payload);

      setAuth(response.hr, "hr");

      router.replace("/ExploreDrivers");
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error;

        setErrorMsg(
          typeof message === "string" ? message : "Invalid email or password.",
        );

        return;
      }

      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    if (isLoggingIn) return;

    setRole(newRole);

    setErrorMsg("");

    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  return (
    <main className="bg-[#FAFBF8]">
      <div className="flex min-h-[calc(100vh-68px)]">
        <section
          className="
            flex
            flex-1
            items-center
            justify-center
            px-4
            py-10
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="w-full max-w-md"
          >
            {/* =====================================
                LOGIN CARD
            ====================================== */}

            <div
              className="
                rounded-[16px]
                border
                border-[#E1E6DA]
                bg-white
                p-6
                shadow-[0_12px_40px_rgba(23,32,18,0.07)]
                sm:p-8
              "
            >
              {/* ===================================
                  HEADER
              ==================================== */}

              <div className="text-center">
                <div
                  className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#F5F7EF]
                    text-[#6A8832]
                  "
                >
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h2
                  className="
                    mt-5
                    font-display
                    text-2xl
                    font-black
                    tracking-[-0.03em]
                    text-[#172012]
                  "
                >
                  Welcome back
                </h2>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-[#66705F]
                  "
                >
                  Sign in to manage your driver profile, applications or hiring
                  activity.
                </p>
              </div>

              {/* ===================================
                  ROLE SWITCHER
              ==================================== */}

              <div
                className="
                  mt-7
                  grid
                  grid-cols-2
                  gap-1
                  rounded-[10px]
                  border
                  border-[#E1E6DA]
                  bg-[#F5F7EF]
                  p-1
                "
              >
                <RoleButton
                  active={role === "driver"}
                  disabled={isLoggingIn}
                  onClick={() => handleRoleChange("driver")}
                  icon={Car}
                  label="Driver"
                />

                <RoleButton
                  active={role === "hr"}
                  disabled={isLoggingIn}
                  onClick={() => handleRoleChange("hr")}
                  icon={Building2}
                  label="Company / Fleet"
                />
              </div>

              {/* ===================================
                  ERROR
              ==================================== */}

              {errorMsg && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-4
                    rounded-[9px]
                    border
                    border-[#F1CACA]
                    bg-[#FDECEC]
                    p-3
                    text-xs
                    font-medium
                    text-[#C24141]
                  "
                >
                  {errorMsg}
                </motion.div>
              )}

              {/* ===================================
                  LOGIN FORM
              ==================================== */}

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-1.5
                      block
                      text-xs
                      font-bold
                      text-[#172012]
                    "
                  >
                    {role === "driver" ? "Driver Email" : "Company Email"}
                  </label>

                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isLoggingIn}
                      placeholder={
                        role === "driver"
                          ? "driver@example.com"
                          : "fleet.manager@company.se"
                      }
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));

                        if (errorMsg) {
                          setErrorMsg("");
                        }
                      }}
                      className="
                        h-11
                        w-full
                        rounded-[8px]
                        border
                        border-[#E1E6DA]
                        bg-white
                        py-2.5
                        pl-9
                        pr-3.5
                        text-xs
                        font-medium
                        text-[#172012]
                        outline-none
                        transition-all
                        placeholder:text-[#8A9384]
                        focus:border-[#6A8832]
                        focus:ring-2
                        focus:ring-[rgba(106,136,50,0.14)]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />

                    <Mail
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-[#8A9384]
                      "
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <div
                    className="
                      mb-1.5
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <label
                      htmlFor="password"
                      className="
                        text-xs
                        font-bold
                        text-[#172012]
                      "
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      disabled={isLoggingIn}
                      onClick={() => {
                        alert(
                          "Password reset instructions will be dispatched to your registered email.",
                        );
                      }}
                      className="
                        cursor-pointer
                        text-[11px]
                        font-bold
                        text-[#6A8832]
                        transition-colors
                        hover:text-[#587229]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      disabled={isLoggingIn}
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));

                        if (errorMsg) {
                          setErrorMsg("");
                        }
                      }}
                      className="
                        h-11
                        w-full
                        rounded-[8px]
                        border
                        border-[#E1E6DA]
                        bg-white
                        py-2.5
                        pl-9
                        pr-10
                        text-xs
                        font-medium
                        text-[#172012]
                        outline-none
                        transition-all
                        placeholder:text-[#8A9384]
                        focus:border-[#6A8832]
                        focus:ring-2
                        focus:ring-[rgba(106,136,50,0.14)]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />

                    <Lock
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-[#8A9384]
                      "
                    />

                    <button
                      type="button"
                      disabled={isLoggingIn}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        cursor-pointer
                        text-[#8A9384]
                        transition-colors
                        hover:text-[#6A8832]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* =================================
                    SUBMIT
                ================================== */}

                <motion.button
                  type="submit"
                  disabled={isLoggingIn}
                  whileTap={
                    isLoggingIn
                      ? undefined
                      : {
                          scale: 0.99,
                        }
                  }
                  className="
                    mt-2
                    flex
                    h-11
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    bg-[#6A8832]
                    text-xs
                    font-bold
                    text-white
                    shadow-[0_4px_12px_rgba(106,136,50,0.18)]
                    transition-all
                    hover:bg-[#587229]
                    hover:shadow-[0_6px_16px_rgba(106,136,50,0.24)]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />

                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Sign in as {role === "driver" ? "Driver" : "Employer"}
                      </span>

                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* ===================================
                  REGISTER
              ==================================== */}

              <div
                className="
                  mt-6
                  border-t
                  border-[#EDF0E9]
                  pt-5
                  text-center
                  text-xs
                  font-medium
                  text-[#66705F]
                "
              >
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="
                    font-bold
                    text-[#6A8832]
                    no-underline
                    transition-colors
                    hover:text-[#587229]
                  "
                >
                  Create an account
                </Link>
              </div>
            </div>

            {/* SECURITY */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-1.5
                text-[10px]
                font-medium
                text-[#8A9384]
              "
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#6A8832]" />
              Secure access for drivers and employers
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function RoleButton({
  active,
  disabled,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        h-9
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-[7px]
        text-xs
        font-bold
        transition-all

        ${
          active
            ? "bg-[#6A8832] text-white shadow-sm"
            : "text-[#66705F] hover:bg-white hover:text-[#172012]"
        }

        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      <Icon className="h-3.5 w-3.5" />

      {label}
    </button>
  );
}
