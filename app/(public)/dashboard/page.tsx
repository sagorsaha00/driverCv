"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  LogIn,
  LogOut,
  UserCheck,
  Building2,
  CheckCircle2,
  X,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import HRDashboard from "@/components/dashboard/HRDashboard";
import DriverDashboard from "@/components/dashboard/DriverDashboard";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const { user, role, isAuthenticated, logout } = useAuthStore();

  // Toast feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // ========================================================
  // NOT LOGGED IN SCREEN (SO SIMPLE & NORMAL LIKE 80 YEAR OLD CAN UNDERSTAND)
  // ========================================================
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center p-6 bg-surface-subtle">
        <div className="max-w-md w-full bg-surface p-8 sm:p-10 rounded-3xl border-2 border-border shadow-xl text-center space-y-6">
          <div className="h-20 w-20 mx-auto rounded-3xl bg-primary-50 text-primary flex items-center justify-center shadow-sm">
            <LogIn className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-text">
              Please Log In
            </h1>
            <p className="text-base text-text-muted leading-relaxed">
              You must be logged in to view your dashboard, check messages, and see job offers.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary py-4 text-base font-black text-white shadow-md hover:bg-primary-hover transition cursor-pointer"
            >
              <LogIn className="h-5 w-5" />
              <span>Log In to My Account</span>
            </Link>

            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-border bg-surface py-3.5 text-sm font-bold text-text hover:bg-surface-muted transition cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>Create a New Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // LOGGED IN USER DATA
  // ========================================================
  const isDriver = role === "driver";
  const userObj = user as any;
  const displayName = userObj?.fullname || userObj?.name || userObj?.companyName || "My Account";

  return (
    <div className="min-h-[calc(100vh-68px)] bg-bg text-text py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Welcome Header */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-surface p-6 rounded-3xl border-2 border-border shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text">
              Welcome, {displayName}!
            </h1>
            <p className="text-xs font-semibold text-text-muted flex items-center gap-1.5 mt-0.5">
              <span>{isDriver ? "Driver Account" : "Employer / Company Account"}</span>
              <span>•</span>
              <span className="text-green-600 font-bold">● Active</span>
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-surface px-4 py-2.5 text-xs font-black text-red-600 hover:bg-red-50 transition cursor-pointer w-fit"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Dashboard (Simple Driver or Simple HR) */}
      <main>
        {isDriver ? (
          <DriverDashboard onShowToast={showToast} />
        ) : (
          <HRDashboard onShowToast={showToast} />
        )}
      </main>

      {/* Simple Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border-2 border-primary bg-surface p-4 text-sm font-bold text-text shadow-2xl sm:max-w-md"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="flex-1 leading-snug">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-text-muted hover:text-text cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
