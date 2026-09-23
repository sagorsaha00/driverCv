"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Briefcase,
  Users,
  ShieldCheck,
  Search,
  FileCheck2,
  DollarSign,
  TrendingUp,
  Truck,
  LogOut,
  Menu,
  X,
  Bell,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  Building2,
  UserCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import type { DashboardRole, HRTab, DriverTab } from "@/components/dashboard/types";
import HRDashboard from "@/components/dashboard/HRDashboard";
import DriverDashboard from "@/components/dashboard/DriverDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, role: authRole, logout } = useAuthStore();

  // Role: "hr" | "driver"
  const [role, setRole] = useState<DashboardRole>("hr");
  const [hrTab, setHrTab] = useState<HRTab>("overview");
  const [driverTab, setDriverTab] = useState<DriverTab>("overview");

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with auth store role on mount
  useEffect(() => {
    if (authRole === "driver") {
      setRole("driver");
    } else if (authRole === "hr") {
      setRole("hr");
    }
  }, [authRole]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleRoleChange = (nextRole: DashboardRole) => {
    setRole(nextRole);
    if (nextRole === "hr") setHrTab("overview");
    if (nextRole === "driver") setDriverTab("overview");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // User display name
  const hrCompanyName =
    user && "companyName" in user ? user.companyName : "Nordic Cargo Logistics AB";
  const driverFullName =
    user && "fullname" in user ? user.fullname : "Lars Lindqvist";

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-bg text-text selection:bg-primary selection:text-on-primary">
      {/* ========================================================
          DESKTOP SIDEBAR
         ======================================================== */}
      <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-border bg-surface px-5 py-6 md:flex">
        <div className="space-y-6">
          {/* Brand & Portal Type */}
          <div className="flex items-center justify-between px-1">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display text-[15px] font-extrabold tracking-tight text-text">
                  Driver<span className="text-primary">CVs</span>
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Command Center
                </p>
              </div>
            </Link>

            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
              Nordic Hub
            </span>
          </div>

          {/* Role Switcher (HR / Driver) */}
          <div className="rounded-xl border border-border bg-surface-subtle p-1">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleRoleChange("hr")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  role === "hr"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-surface"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                HR & Fleet
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("driver")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  role === "driver"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-surface"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                Driver
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {role === "hr" ? "Fleet Recruiter" : "Driver Portal"}
            </div>

            {role === "hr" ? (
              <>
                <SidebarItem
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Overview"
                  active={hrTab === "overview"}
                  onClick={() => setHrTab("overview")}
                />
                <SidebarItem
                  icon={<Users className="h-4 w-4" />}
                  label="Driver Candidates"
                  active={hrTab === "candidates"}
                  onClick={() => setHrTab("candidates")}
                  count="18"
                />
                <SidebarItem
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Fleet Compliance"
                  active={hrTab === "compliance"}
                  onClick={() => setHrTab("compliance")}
                />
                <SidebarItem
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Active Vacancies"
                  active={hrTab === "postings"}
                  onClick={() => setHrTab("postings")}
                  count="4"
                />
                <SidebarItem
                  icon={<Truck className="h-4 w-4" />}
                  label="Dispatch Shifts"
                  active={hrTab === "shifts"}
                  onClick={() => setHrTab("shifts")}
                />
              </>
            ) : (
              <>
                <SidebarItem
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Overview"
                  active={driverTab === "overview"}
                  onClick={() => setDriverTab("overview")}
                />
                <SidebarItem
                  icon={<Search className="h-4 w-4" />}
                  label="Find Shifts & Jobs"
                  active={driverTab === "jobs"}
                  onClick={() => setDriverTab("jobs")}
                  count="6"
                />
                <SidebarItem
                  icon={<Briefcase className="h-4 w-4" />}
                  label="My Applications"
                  active={driverTab === "applications"}
                  onClick={() => setDriverTab("applications")}
                  count="3"
                />
                <SidebarItem
                  icon={<FileCheck2 className="h-4 w-4" />}
                  label="Digital License Cards"
                  active={driverTab === "credentials"}
                  onClick={() => setDriverTab("credentials")}
                />
                <SidebarItem
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Earnings & OB Rates"
                  active={driverTab === "earnings"}
                  onClick={() => setDriverTab("earnings")}
                />
              </>
            )}
          </nav>
        </div>

        {/* Footer Account & Logout */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-bold text-on-primary">
                {role === "hr" ? "NC" : "LL"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-extrabold text-text">
                  {role === "hr" ? hrCompanyName : driverFullName}
                </p>
                <p className="truncate text-[10px] text-text-muted">
                  {role === "hr"
                    ? "Fleet Employer • Sweden"
                    : "Class CE • YKB Verified"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:border-border-strong hover:text-text"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN CONTENT AREA
         ======================================================== */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
        {/* Mobile Header Bar & Switcher */}
        <div className="mb-6 flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
                <Car className="h-4 w-4" />
              </div>
              <div>
                <span className="font-display text-sm font-extrabold text-text">
                  Driver<span className="text-primary">CVs</span>
                </span>
                <span className="ml-2 text-[10px] font-bold text-primary">
                  {role === "hr" ? "HR Portal" : "Driver Portal"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-lg space-y-4"
              >
                {/* Mobile Role Switch */}
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-subtle p-1 border border-border">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("hr")}
                    className={`py-2 text-xs font-bold rounded-lg ${
                      role === "hr"
                        ? "bg-primary text-white"
                        : "text-text-muted"
                    }`}
                  >
                    HR & Fleet
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("driver")}
                    className={`py-2 text-xs font-bold rounded-lg ${
                      role === "driver"
                        ? "bg-primary text-white"
                        : "text-text-muted"
                    }`}
                  >
                    Driver
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-1">
                  {role === "hr" ? (
                    <>
                      <MobileNavItem
                        label="Overview"
                        active={hrTab === "overview"}
                        onClick={() => {
                          setHrTab("overview");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Driver Candidates (18)"
                        active={hrTab === "candidates"}
                        onClick={() => {
                          setHrTab("candidates");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Fleet Compliance"
                        active={hrTab === "compliance"}
                        onClick={() => {
                          setHrTab("compliance");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Active Vacancies (4)"
                        active={hrTab === "postings"}
                        onClick={() => {
                          setHrTab("postings");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Dispatch Shifts"
                        active={hrTab === "shifts"}
                        onClick={() => {
                          setHrTab("shifts");
                          setMobileMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MobileNavItem
                        label="Overview"
                        active={driverTab === "overview"}
                        onClick={() => {
                          setDriverTab("overview");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Find Shifts & Jobs"
                        active={driverTab === "jobs"}
                        onClick={() => {
                          setDriverTab("jobs");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="My Applications (3)"
                        active={driverTab === "applications"}
                        onClick={() => {
                          setDriverTab("applications");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Digital License Cards"
                        active={driverTab === "credentials"}
                        onClick={() => {
                          setDriverTab("credentials");
                          setMobileMenuOpen(false);
                        }}
                      />
                      <MobileNavItem
                        label="Earnings & OB Rates"
                        active={driverTab === "earnings"}
                        onClick={() => {
                          setDriverTab("earnings");
                          setMobileMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Header Banner */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3 w-3" />
                {role === "hr"
                  ? "Swedish Fleet Dispatch Operations"
                  : "Verified Driver Portal"}
              </span>

              {role === "driver" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success border border-success-border">
                  YKB Active • Transportstyrelsen Checked
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl font-black tracking-tight text-text sm:text-3xl lg:text-4xl">
              {role === "hr"
                ? "Recruitment & Fleet Dispatch"
                : "Driver Career Dashboard"}
            </h1>

            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-text-secondary sm:text-sm">
              {role === "hr"
                ? "Manage verified commercial driver vacancies, review screened candidates, and coordinate freight routes across Sweden."
                : "Search high-paying Swedish commercial driving opportunities, manage applications, and keep your Transportstyrelsen qualifications verified."}
            </p>
          </div>

          {/* Quick Header CTA */}
          <div className="flex items-center gap-3">
            {role === "hr" ? (
              <Link
                href="/PostDriverJob"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover hover:shadow-md"
              >
                <PlusCircle className="h-4 w-4" />
                Post New Vacancy
              </Link>
            ) : (
              <Link
                href="/EmployerJobFeed"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover hover:shadow-md"
              >
                <Search className="h-4 w-4" />
                Browse All Shifts
              </Link>
            )}
          </div>
        </header>

        {/* Main Role Dashboard View */}
        {role === "hr" ? (
          <HRDashboard
            activeTab={hrTab}
            onTabChange={setHrTab}
            onShowToast={showToast}
          />
        ) : (
          <DriverDashboard
            activeTab={driverTab}
            onTabChange={setDriverTab}
            onShowToast={showToast}
            driverName={driverFullName}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-primary/20 bg-surface p-4 text-xs font-bold text-text shadow-xl sm:max-w-md"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="flex-1 leading-snug">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-text-muted hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   SIDEBAR & NAV HELPERS
   ============================================================ */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  count?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
        active
          ? "bg-primary text-on-primary shadow-sm"
          : "text-text-secondary hover:bg-surface-subtle hover:text-text"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`transition-colors ${
            active ? "text-on-primary" : "text-text-muted group-hover:text-primary"
          }`}
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>

      {count && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
            active
              ? "bg-white/20 text-white"
              : "bg-surface-muted text-text-muted"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function MobileNavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2 text-left text-xs font-bold transition-colors ${
        active
          ? "bg-primary text-on-primary"
          : "text-text-secondary hover:bg-surface-subtle"
      }`}
    >
      {label}
    </button>
  );
}
