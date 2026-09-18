"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Car,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"driver" | "employer">("driver");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both your email address and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "driver") {
        router.push("/EmployerJobFeed");
      } else {
        router.push("/ExploreDrivers");
      }
    }, 700);
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-zinc-50">
      {/* Left Feature Column (Visible on lg screens) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between border-r border-zinc-900">
        {/* Top Branding Pill */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg">
              <Car className="h-5 w-5 text-black" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Driver<span className="text-zinc-500">CVs</span>
            </span>
          </Link>
        </div>

        {/* Center Marketing Copy */}
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-300">
            <Sparkles className="h-3 w-3 text-white" />
            <span>Transportstyrelsen Verified</span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-white xl:text-4xl">
            Sweden&apos;s Premier Commercial Driver Marketplace
          </h2>

          <p className="mt-4 text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
            Access pre-vetted, licensed truck and chauffeur drivers across
            Stockholm, Gothenburg, Malmö, and nationwide.
          </p>

          <div className="mt-8 space-y-3.5">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <span>Instant YKB, CE &amp; Tachograph Verification</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <span>Direct Messaging &amp; Zero Agency Surcharges</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <span>Secured Digital Contracts &amp; Dispatch Ready</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Quote */}
        <div className="relative z-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs text-zinc-300 italic">
            &ldquo;DriverCVs allowed our logistics firm to onboard 4 verified CE
            drivers in less than 48 hours for our Nordic routes.&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="font-bold text-white">
              Nordic Cargo Logistics AB
            </span>
            <span className="text-zinc-400">Verified Fleet Client</span>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-xl shadow-zinc-200/40">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-black">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-black text-black">
                Welcome Back
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Sign in to manage your driver shifts or post new vacancies
              </p>
            </div>

            {/* Role Switcher Tab */}
            <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-xl bg-zinc-100 p-1 border border-zinc-200">
              <button
                type="button"
                onClick={() => {
                  setRole("driver");
                  setErrorMsg("");
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  role === "driver"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                <Car className="h-4 w-4" />
                <span>Driver Account</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole("employer");
                  setErrorMsg("");
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  role === "employer"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Company / Fleet</span>
              </button>
            </div>

            {/* Error banner if any */}
            {errorMsg && (
              <div className="mt-4 rounded-xl border border-zinc-300 bg-zinc-100 p-3 text-xs text-black">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-black">
                  {role === "driver"
                    ? "Driver Email / Phone"
                    : "Company Email Address"}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={
                      role === "driver"
                        ? "driver@example.com"
                        : "fleet.manager@transport.se"
                    }
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black transition-colors placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-bold text-black">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Password reset instructions will be dispatched to your registered email.",
                      )
                    }
                    className="text-[11px] font-bold text-zinc-600 hover:text-black transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-10 text-xs font-medium text-black transition-colors placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 transition-all hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Sign In as {role === "driver" ? "Driver" : "Employer"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Switch to Register */}
            <div className="mt-6 border-t border-zinc-100 pt-5 text-center text-xs font-medium text-zinc-500">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-bold text-black hover:underline"
              >
                Create an Account Free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
