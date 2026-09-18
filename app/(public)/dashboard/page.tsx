"use client";

import { useState } from "react";
import {
  Briefcase,
  Users,
  Search,
  MapPin,
  Clock,
  PlusCircle,
  FileCheck2,
  ChevronRight,
  LogOut,
  BadgeCheck,
} from "lucide-react";

/**
 * Design notes
 * -------------------------------------------------------------
 * Palette:
 *   ink        #14213D  primary surfaces (sidebar), primary text, primary buttons
 *   paper      #F6F5F1  app background
 *   surface    #FFFFFF  cards / inputs
 *   border     #E3E1DA  hairline dividers
 *   muted      #6B6F76  secondary text
 *   brass      #A9812F  the one accent — verification, active states, emphasis
 *   moss       #3F6B52  status-positive (YKB valid), used sparingly
 *
 * Type: a serif (swap in "Fraunces" via next/font for the full effect —
 * falls back to the system serif stack below) carries the brand mark and
 * page titles; Inter/system-sans carries everything functional. Figures
 * use tabular-nums so salary and counts sit still in a scanning table.
 * -------------------------------------------------------------
 */

const serif = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };
const tabular = { fontVariantNumeric: "tabular-nums" as const };

export default function DashboardLayout() {
  const [role, setRole] = useState<"driver" | "company">("company");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-[#F6F5F1] text-[#14213D]">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col justify-between bg-[#14213D] px-5 py-6">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3 px-1">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#A9812F]/40 bg-[#A9812F]/10 text-[#A9812F] text-base"
              style={serif}
            >
              S
            </div>
            <div>
              <h2
                className="text-[15px] leading-tight text-[#F6F5F1]"
                style={serif}
              >
                Sverige Drive
              </h2>
              <p className="text-[10px] font-medium tracking-wide text-[#8A93A8]">
                Nordic Logistics Network
              </p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex rounded-[6px] border border-white/10 p-0.5">
            <button
              onClick={() => setRole("company")}
              className={`flex-1 rounded-[4px] py-2 text-[11px] font-semibold transition-colors ${
                role === "company"
                  ? "bg-white/10 text-[#F6F5F1]"
                  : "text-[#8A93A8] hover:text-[#C7CCDA]"
              }`}
            >
              Company
            </button>
            <button
              onClick={() => setRole("driver")}
              className={`flex-1 rounded-[4px] py-2 text-[11px] font-semibold transition-colors ${
                role === "driver"
                  ? "bg-white/10 text-[#F6F5F1]"
                  : "text-[#8A93A8] hover:text-[#C7CCDA]"
              }`}
            >
              Driver
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-0.5">
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
                  icon={<FileCheck2 className="h-4 w-4" />}
                  label="YKB &amp; Compliance"
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
                  label="My Certifications"
                  active={activeTab === "certs"}
                  onClick={() => setActiveTab("certs")}
                />
              </>
            )}
          </nav>
        </div>

        {/* Account */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 px-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-white/10 text-[11px] font-semibold text-[#F6F5F1]">
              {role === "company" ? "NL" : "JA"}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-[#F6F5F1]">
                {role === "company" ? "Nordic Logi AB" : "Johan A."}
              </p>
              <p className="text-[10px] text-[#8A93A8]">
                {role === "company" ? "Org. 556000-0000" : "Category CE Driver"}
              </p>
            </div>
          </div>
          <button className="text-[#8A93A8] hover:text-[#F6F5F1] transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 text-[11px] font-medium text-[#A9812F]">
              {role === "company" ? "Recruitment" : "Job search"}
            </p>
            <h1
              className="text-[28px] leading-tight text-[#14213D]"
              style={serif}
            >
              {role === "company"
                ? "Recruitment management"
                : "Driver job portal"}
            </h1>
            <p className="mt-1.5 max-w-md text-[13px] text-[#6B6F76]">
              {role === "company"
                ? "Manage driver vacancies and applicant verification across Sweden."
                : "Search routes, apply for positions, and keep your YKB qualifications current."}
            </p>
          </div>

          {role === "company" ? (
            <button className="flex items-center justify-center gap-2 rounded-[6px] bg-[#14213D] px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1E2E52]">
              <PlusCircle className="h-4 w-4" />
              Post driver vacancy
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-[6px] border border-[#3F6B52]/25 bg-[#3F6B52]/[0.06] px-3.5 py-2.5 text-[12px] font-semibold text-[#3F6B52]">
              <BadgeCheck className="h-4 w-4" />
              YKB valid — expires 2028
            </div>
          )}
        </header>

        {role === "company" ? <CompanyMainView /> : <DriverMainView />}
      </main>
    </div>
  );
}

/* ============================================================
   COMPANY VIEW
   ============================================================ */
function CompanyMainView() {
  const postings = [
    {
      title: "CE-Chaufför Fjärrtransport",
      location: "Jönköping – Norrland",
      applicants: 12,
      type: "Full-time",
      salary: "36,000 SEK",
      license: "Class CE",
    },
    {
      title: "C-Chaufför för Distribution",
      location: "Stockholm Region",
      applicants: 8,
      type: "Day shift",
      salary: "32,000 SEK",
      license: "Class C",
    },
    {
      title: "Taxiförare Helgtrafik",
      location: "Malmö / Lund",
      applicants: 5,
      type: "Part-time",
      salary: "180 SEK / hr",
      license: "Taxi (TKT)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search & filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A6A9AE]" />
          <input
            type="text"
            placeholder="Search candidates, routes, or license classes"
            className="w-full rounded-[6px] border border-[#E3E1DA] bg-white py-2.5 pl-10 pr-3.5 text-[13px] text-[#14213D] placeholder:text-[#A6A9AE] focus:border-[#14213D] focus:outline-none"
          />
        </div>
        <select className="rounded-[6px] border border-[#E3E1DA] bg-white px-3 py-2.5 text-[13px] font-medium text-[#33363D] focus:border-[#14213D] focus:outline-none">
          <option>All regions (län)</option>
          <option>Stockholm</option>
          <option>Göteborg</option>
          <option>Jönköping</option>
        </select>
        <select className="rounded-[6px] border border-[#E3E1DA] bg-white px-3 py-2.5 text-[13px] font-medium text-[#33363D] focus:border-[#14213D] focus:outline-none">
          <option>All licenses</option>
          <option>Class C — Heavy truck</option>
          <option>Class CE — Truck &amp; trailer</option>
          <option>Class D — Bus</option>
        </select>
      </div>

      {/* Listings */}
      <div className="rounded-[8px] border border-[#E3E1DA] bg-white">
        <div className="flex items-baseline justify-between border-b border-[#E3E1DA] px-5 py-4">
          <h3 className="text-[14px] text-[#14213D]" style={serif}>
            Active job openings
          </h3>
          <span className="text-[12px] text-[#6B6F76]">3 posts</span>
        </div>

        <div className="divide-y divide-[#EDEBE4]">
          {postings.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-[#FAFAF8] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-[14px] font-semibold text-[#14213D]">
                    {item.title}
                  </h4>
                  <span className="rounded-[4px] border border-[#A9812F]/30 px-1.5 py-0.5 text-[10px] font-semibold text-[#A9812F]">
                    {item.license}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#6B6F76]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#A6A9AE]" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#A6A9AE]" />
                    {item.type}
                  </span>
                  <span
                    className="font-semibold text-[#14213D]"
                    style={tabular}
                  >
                    {item.salary}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 border-t border-[#EDEBE4] pt-3 sm:justify-end sm:border-0 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] font-medium text-[#A6A9AE]">
                    Applicants
                  </span>
                  <span
                    className="text-[13px] font-semibold text-[#14213D]"
                    style={tabular}
                  >
                    {item.applicants} verified
                  </span>
                </div>
                <button className="flex items-center gap-1 rounded-[6px] border border-[#E3E1DA] px-3 py-1.5 text-[12px] font-semibold text-[#14213D] transition-colors hover:border-[#14213D] hover:bg-[#14213D] hover:text-white">
                  Manage
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DRIVER VIEW
   ============================================================ */
function DriverMainView() {
  const jobs = [
    {
      title: "CE-Driver Long-Haul Transport",
      company: "ScanLogistics AB",
      location: "Jönköping",
      salary: "36,000 SEK / mo",
      tags: ["YKB required", "Collective agreement"],
    },
    {
      title: "Distribution Driver (Class C)",
      company: "Nordic Transport AB",
      location: "Stockholm",
      salary: "32,000 SEK / mo",
      tags: ["Local routes", "Daytime"],
    },
  ];

  return (
    <div className="rounded-[8px] border border-[#E3E1DA] bg-white">
      <div className="flex items-baseline justify-between border-b border-[#E3E1DA] px-5 py-4">
        <h3 className="text-[14px] text-[#14213D]" style={serif}>
          Matching openings in Sweden
        </h3>
        <span className="text-[12px] font-medium text-[#3F6B52]">
          Based on Class CE &amp; YKB
        </span>
      </div>

      <div className="divide-y divide-[#EDEBE4]">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-[#FAFAF8] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold text-[#14213D]">
                {job.title}
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6B6F76]">
                <span className="font-semibold text-[#14213D]">
                  {job.company}
                </span>
                <span className="text-[#D8D5CC]">·</span>
                <span>{job.location}</span>
                <span className="text-[#D8D5CC]">·</span>
                <span className="font-semibold text-[#14213D]" style={tabular}>
                  {job.salary}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-[4px] border border-[#E3E1DA] px-2 py-0.5 text-[10px] font-medium text-[#6B6F76]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button className="self-start rounded-[6px] bg-[#14213D] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1E2E52] sm:self-center">
              Quick apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Sidebar item
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
      onClick={onClick}
      className={`relative flex w-full items-center justify-between rounded-[4px] py-2.5 pl-3.5 pr-2.5 text-[12.5px] font-medium transition-colors ${
        active ? "text-[#F6F5F1]" : "text-[#8A93A8] hover:text-[#C7CCDA]"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-[#A9812F]" />
      )}
      <span className="flex items-center gap-2.5">
        <span className={active ? "text-[#A9812F]" : "text-[#5B6478]"}>
          {icon}
        </span>
        {label}
      </span>
      {count && (
        <span
          className={`rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold ${
            active
              ? "bg-[#A9812F]/15 text-[#A9812F]"
              : "bg-white/5 text-[#8A93A8]"
          }`}
          style={tabular}
        >
          {count}
        </span>
      )}
    </button>
  );
}
