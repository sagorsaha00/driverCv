"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Car,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState<"driver" | "employer">("driver");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${role}:`, formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">
              Welcome Back
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Sign in to manage your hiring and jobs
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setRole("driver")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === "driver"
                  ? "bg-white text-[#2563EB] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>Driver Portal</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === "employer"
                  ? "bg-white text-[#2563EB] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Employer Portal</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-900">
                {role === "driver" ? "Driver Email / Phone" : "Company Email"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={
                    role === "driver"
                      ? "driver@example.com"
                      : "company@domain.com"
                  }
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-bold text-[#2563EB] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
            >
              <span>
                Sign In as {role === "driver" ? "Driver" : "Employer"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-medium text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#2563EB] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
