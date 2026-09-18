"use client";

import { useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Briefcase,
  Car,
  ChevronRight,
  Clock,
  FileCheck2,
  LogOut,
  MapPin,
  PlusCircle,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const serif = {
  fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
};

const tabular = {
  fontVariantNumeric: "tabular-nums" as const,
};

type Role = "company" | "driver";

type ActiveTab =
  | "overview"
  | "candidates"
  | "compliance"
  | "applications"
  | "certs";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  count?: string;
}

/* ============================================================
   MAIN DASHBOARD
   ============================================================ */

export default function DashboardLayout() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("company");
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    setActiveTab("overview");
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F6F5F1] text-[#14213D]">
      {/* ========================================================
          DESKTOP SIDEBAR
         ======================================================== */}

      <aside className="hidden w-64 shrink-0 flex-col justify-between bg-[#0A1628] px-5 py-6 text-white md:flex">
        <div className="space-y-7">
          {/* Brand */}

          <Link href="/" className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Car className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="text-[15px] leading-tight text-white"
                style={serif}
              >
                Sverige Drive
              </h2>

              <p className="mt-0.5 text-[10px] font-medium tracking-wide text-[#8A93A8]">
                Nordic Logistics Network
              </p>
            </div>
          </Link>

          {/* Role Switcher */}

          <div className="flex rounded-xl border border-white/10 bg-slate-900/40 p-1">
            <button
              type="button"
              onClick={() => handleRoleChange("company")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                role === "company"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Employer
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("driver")}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                role === "driver"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Driver
            </button>
          </div>

          {/* Navigation */}

          <nav className="space-y-1">
            {role === "company" ? (
              <>
                <SidebarItem
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Active Vacancies"
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  count="6"
                />

                <SidebarItem
                  icon={<Users className="h-4 w-4" />}
                  label="Driver Candidates"
                  active={activeTab === "candidates"}
                  onClick={() => setActiveTab("candidates")}
                  count="18"
                />

                <SidebarItem
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Fleet Compliance"
                  active={activeTab === "compliance"}
                  onClick={() => setActiveTab("compliance")}
                />
              </>
            ) : (
              <>
                <SidebarItem
                  icon={<Search className="h-4 w-4" />}
                  label="Find Driver Jobs"
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                />

                <SidebarItem
                  icon={<Briefcase className="h-4 w-4" />}
                  label="My Applications"
                  active={activeTab === "applications"}
                  onClick={() => setActiveTab("applications")}
                  count="3"
                />

                <SidebarItem
                  icon={<FileCheck2 className="h-4 w-4" />}
                  label="My License Cards"
                  active={activeTab === "certs"}
                  onClick={() => setActiveTab("certs")}
                />
              </>
            )}
          </nav>
        </div>

        {/* Account */}

        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
                {role === "company" ? "NL" : "LL"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  {role === "company" ? "Nordic Cargo AB" : "Lars Lindqvist"}
                </p>

                <p className="truncate text-[10px] text-slate-400">
                  {role === "company" ? "Fleet Manager" : "Class CE Driver"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="shrink-0 text-slate-400 transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN CONTENT
         ======================================================== */}

      <main className="min-w-0 flex-1 px-4 py-7 sm:px-8 lg:px-10 lg:py-10">
        {/* Mobile Role Switcher */}

        <div className="mb-6 flex rounded-xl bg-slate-200/80 p-1 md:hidden">
          <button
            type="button"
            onClick={() => handleRoleChange("company")}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
              role === "company"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600"
            }`}
          >
            Employer View
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("driver")}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
              role === "driver"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600"
            }`}
          >
            Driver View
          </button>
        </div>

        {/* Header */}

        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#A9812F]">
              {role === "company" ? "Recruitment" : "Job Search"}
            </p>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />

              <span>
                {role === "company"
                  ? "Fleet Dispatch Management"
                  : "Driver Portal"}
              </span>
            </div>

            <h1
              className="text-3xl leading-tight text-[#14213D] sm:text-[36px]"
              style={serif}
            >
              {role === "company"
                ? "Recruitment & Fleet Dispatch"
                : "Driver Career Dashboard"}
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-5 text-[#6B6F76] sm:text-sm">
              {role === "company"
                ? "Manage driver vacancies, review verified applicants, and dispatch shifts across Sweden."
                : "Search driving opportunities, manage applications, and keep your professional qualifications current."}
            </p>
          </div>

          {/* Header Action */}

          {role === "company" ? (
            <Link
              href="/PostDriverJob"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4" />
              Post New Vacancy
            </Link>
          ) : (
            <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-800">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              YKB Active • Valid until 2028
            </div>
          )}
        </header>

        {/* Dashboard Content */}

        {role === "company" ? <CompanyDashboard /> : <DriverDashboard />}
      </main>
    </div>
  );
}

/* ============================================================
   COMPANY DASHBOARD
   ============================================================ */

function CompanyDashboard() {
  const postings = [
    {
      title: "CE-Driver Long-Haul Freight",
      location: "Jönköping – Norrland",
      applicants: 12,
      type: "Full-time",
      salary: "37,500 SEK / mo",
      license: "Class CE + YKB",
    },
    {
      title: "C-Driver for Regional Distribution",
      location: "Stockholm Area",
      applicants: 8,
      type: "Day shift",
      salary: "33,500 SEK / mo",
      license: "Class C",
    },
    {
      title: "Bus & Coach Transit Chauffeur",
      location: "Gothenburg",
      applicants: 6,
      type: "Shift work",
      salary: "31,800 SEK / mo",
      license: "Class D",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search candidates, routes, or license classes"
            className="w-full rounded-xl border border-[#E3E1DA] bg-white py-3 pl-10 pr-4 text-xs text-[#14213D] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:text-sm"
          />
        </div>

        <select className="rounded-xl border border-[#E3E1DA] bg-white px-3.5 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 sm:text-sm">
          <option>All regions</option>
          <option>Stockholm</option>
          <option>Göteborg</option>
          <option>Jönköping</option>
          <option>Malmö</option>
        </select>

        <select className="rounded-xl border border-[#E3E1DA] bg-white px-3.5 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 sm:text-sm">
          <option>All licenses</option>
          <option>Class C</option>
          <option>Class CE</option>
          <option>Class D</option>
          <option>Taxi TKT</option>
        </select>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Active Posts"
          value="3"
          footer="100% Verified Feed"
          valueClass="text-slate-900"
          footerClass="text-emerald-600"
        />

        <StatCard
          label="New Applicants"
          value="26"
          footer="14 passed background check"
          valueClass="text-blue-600"
          footerClass="text-slate-500"
        />

        <StatCard
          label="Dispatch Match Rate"
          value="98%"
          footer="Average response < 2 hours"
          valueClass="text-emerald-600"
          footerClass="text-slate-500"
        />
      </div>

      {/* Listings */}

      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-[16px] text-[#14213D]" style={serif}>
              Your Active Vacancy Listings
            </h3>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Manage your current recruitment campaigns
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            3 Published
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {postings.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h4>

                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {item.license}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {item.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {item.type}
                  </span>

                  <span className="font-bold text-slate-900" style={tabular}>
                    {item.salary}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:shrink-0 sm:justify-end sm:border-0 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Candidates
                  </span>

                  <span
                    className="text-xs font-bold text-blue-600"
                    style={tabular}
                  >
                    {item.applicants} Verified
                  </span>
                </div>

                <Link
                  href="/ExploreDrivers"
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-600"
                >
                  Review
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   DRIVER DASHBOARD
   ============================================================ */

function DriverDashboard() {
  const jobs = [
    {
      title: "CE-Driver Long-Haul Freight",
      company: "ScanLogistics AB",
      location: "Jönköping",
      salary: "37,500 SEK / mo",
      tags: ["YKB required", "Digital Tacho", "Night allowance"],
    },
    {
      title: "Distribution Driver — Class C",
      company: "Nordic Transport AB",
      location: "Stockholm",
      salary: "33,500 SEK / mo",
      tags: ["Fixed daytime", "Volvo FH", "Collective agreement"],
    },
    {
      title: "Bus & Coach Transit Chauffeur",
      company: "Sverige Transit AB",
      location: "Gothenburg",
      salary: "31,800 SEK / mo",
      tags: ["Class D", "Shift work", "YKB required"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Driver Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Profile Status"
          value="Active"
          footer="Transportstyrelsen verified"
          valueClass="text-emerald-600"
          footerClass="text-slate-500"
        />

        <StatCard
          label="Employer Views"
          value="42"
          footer="+18% this week"
          valueClass="text-blue-600"
          footerClass="text-emerald-600"
        />

        <StatCard
          label="Direct Invitations"
          value="3"
          footer="From verified fleet managers"
          valueClass="text-slate-900"
          footerClass="text-slate-500"
        />
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search jobs, companies, locations..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:text-sm"
        />
      </div>

      {/* Matching Jobs */}

      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recommended Commercial Shifts
            </h3>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Based on your Class CE and YKB profile
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Class CE & YKB Match
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="min-w-0 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">
                  {job.title}
                </h4>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="font-bold text-slate-800">
                    {job.company}
                  </span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {job.location}
                  </span>

                  <span>•</span>

                  <span className="font-bold text-blue-600" style={tabular}>
                    {job.salary}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/EmployerJobFeed"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Apply Direct
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Driver Profile CTA */}

      <section className="rounded-2xl bg-[#14213D] p-6 text-white sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-blue-300">
              <ShieldCheck className="h-4 w-4" />

              <span className="text-[10px] font-bold uppercase tracking-wider">
                Verified Driver Profile
              </span>
            </div>

            <h3 className="text-xl" style={serif}>
              Make your profile visible to Swedish fleets
            </h3>

            <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-300">
              Keep your qualifications, availability and driving experience
              updated so verified employers can contact you directly.
            </p>
          </div>

          <Link
            href="/DriverProfile"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#14213D] transition hover:bg-slate-100"
          >
            View Profile
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */

interface StatCardProps {
  label: string;
  value: string;
  footer: string;
  valueClass?: string;
  footerClass?: string;
}

function StatCard({
  label,
  value,
  footer,
  valueClass = "text-slate-900",
  footerClass = "text-slate-500",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <p
        className={`mt-1.5 text-2xl font-black tracking-tight ${valueClass}`}
        style={tabular}
      >
        {value}
      </p>

      <span className={`text-[10px] font-semibold ${footerClass}`}>
        {footer}
      </span>
    </div>
  );
}

/* ============================================================
   SIDEBAR ITEM
   ============================================================ */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
  count,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>

        {label}
      </span>

      {count && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
          }`}
          style={tabular}
        >
          {count}
        </span>
      )}
    </button>
  );
}
