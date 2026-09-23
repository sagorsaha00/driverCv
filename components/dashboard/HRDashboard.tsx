"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  Search,
  Filter,
  MapPin,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Award,
  Calendar,
  Truck,
  CheckCircle2,
  FileCheck2,
  Send,
  Eye,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import type {
  HRTab,
  CandidateItem,
  JobPostingItem,
  ComplianceItem,
  ShiftItem,
} from "./types";
import {
  INITIAL_HR_POSTINGS,
  INITIAL_CANDIDATES,
  INITIAL_COMPLIANCE,
  INITIAL_SHIFTS,
} from "./types";
import CandidateModal from "./CandidateModal";

interface HRDashboardProps {
  activeTab: HRTab;
  onTabChange: (tab: HRTab) => void;
  onShowToast: (msg: string) => void;
}

export default function HRDashboard({
  activeTab,
  onTabChange,
  onShowToast,
}: HRDashboardProps) {
  const [candidates, setCandidates] = useState<CandidateItem[]>(INITIAL_CANDIDATES);
  const [postings, setPostings] = useState<JobPostingItem[]>(INITIAL_HR_POSTINGS);
  const [complianceList] = useState<ComplianceItem[]>(INITIAL_COMPLIANCE);
  const [shifts, setShifts] = useState<ShiftItem[]>(INITIAL_SHIFTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Selected candidate for modal view
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);

  // Filter candidates logic
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.licenseClasses.some((l) =>
        l.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLicense =
      selectedLicense === "all" ||
      cand.licenseClasses.some((l) =>
        l.toLowerCase().includes(selectedLicense.toLowerCase())
      );

    const matchesRegion =
      selectedRegion === "all" ||
      cand.location.toLowerCase().includes(selectedRegion.toLowerCase());

    return matchesSearch && matchesLicense && matchesRegion;
  });

  const handleInviteCandidate = (candidateName: string, role: string) => {
    onShowToast(`Interview invitation dispatched to ${candidateName} for ${role}.`);
  };

  const handleAssignShift = (shiftId: string) => {
    setShifts((prev) =>
      prev.map((sh) =>
        sh.id === shiftId
          ? {
              ...sh,
              assignedDriver: "Lars Lindqvist",
              driverInitials: "LL",
              status: "confirmed",
            }
          : sh
      )
    );
    onShowToast("Driver assigned to shift route. Dispatch notification sent via SMS.");
  };

  return (
    <div className="space-y-8">
      {/* ========================================================
          SUB-NAVIGATION TABS (Mobile scrollable)
         ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-3 scrollbar-none">
        <TabButton
          active={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
          icon={<TrendingUp className="h-4 w-4" />}
          label="Overview"
        />
        <TabButton
          active={activeTab === "candidates"}
          onClick={() => onTabChange("candidates")}
          icon={<Users className="h-4 w-4" />}
          label="Driver Candidates"
          count={candidates.length.toString()}
        />
        <TabButton
          active={activeTab === "compliance"}
          onClick={() => onTabChange("compliance")}
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Fleet Compliance"
        />
        <TabButton
          active={activeTab === "postings"}
          onClick={() => onTabChange("postings")}
          icon={<Briefcase className="h-4 w-4" />}
          label="Active Vacancies"
          count={postings.length.toString()}
        />
        <TabButton
          active={activeTab === "shifts"}
          onClick={() => onTabChange("shifts")}
          icon={<Truck className="h-4 w-4" />}
          label="Dispatch Shifts"
        />
      </div>

      {/* ========================================================
          TAB CONTENT: OVERVIEW
         ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Vacancies"
              value={postings.filter((p) => p.status === "published").length.toString()}
              change="+2 this week"
              trend="up"
              subtitle="All verified Swedish routes"
              icon={<Briefcase className="h-5 w-5 text-primary" />}
            />

            <StatCard
              title="Verified Applicants"
              value={candidates.length.toString()}
              change="5 new today"
              trend="up"
              subtitle="Transportstyrelsen checked"
              icon={<Users className="h-5 w-5 text-primary" />}
            />

            <StatCard
              title="Compliance Score"
              value="98.5%"
              change="Audit Ready"
              trend="up"
              subtitle="YKB & Tacho Validations"
              icon={<ShieldCheck className="h-5 w-5 text-success" />}
            />

            <StatCard
              title="Shift Match Rate"
              value="100%"
              change="< 45 min avg"
              trend="up"
              subtitle="Direct response rate"
              icon={<Truck className="h-5 w-5 text-primary" />}
            />
          </div>

          {/* Quick Action Shortcuts Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary-50 via-surface to-surface-subtle p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Fleet Recruitment Operations
                </span>
                <h3 className="font-display text-lg font-extrabold text-text sm:text-xl">
                  Quick Commercial Fleet Actions
                </h3>
                <p className="max-w-xl text-xs text-text-secondary sm:text-sm">
                  Publish immediate routes across Sweden, invite pre-screened Class CE drivers, or run automatic compliance checks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/PostDriverJob"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
                >
                  <PlusCircle className="h-4 w-4" />
                  Post New Vacancy
                </Link>

                <button
                  type="button"
                  onClick={() => onTabChange("candidates")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-text transition-colors hover:bg-surface-muted"
                >
                  <Search className="h-4 w-4 text-primary" />
                  Explore Drivers
                </button>
              </div>
            </div>
          </div>

          {/* Grid Layout: Active Vacancies + Dispatch Shifts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Active Postings (2 cols) */}
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-extrabold text-text sm:text-lg">
                    Active Recruitment Campaigns
                  </h3>
                  <p className="text-xs text-text-muted">
                    Manage current vacancy listings and monitor incoming talent
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTabChange("postings")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  View all ({postings.length})
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {postings.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border-strong hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-text">
                          {job.title}
                        </h4>
                        <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {job.licenseRequired}
                        </span>
                        {job.urgent && (
                          <span className="rounded-md bg-danger-bg px-2 py-0.5 text-[10px] font-bold text-danger">
                            Urgent Dispatch
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {job.routeLocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-text-muted" />
                          {job.employmentType}
                        </span>
                        <span className="font-bold text-text">
                          {job.salary}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-3 sm:border-0 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">
                          Candidates
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {job.applicantsCount} Verified
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTabChange("candidates")}
                        className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text transition-colors hover:border-primary hover:text-primary"
                      >
                        Review
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Dispatch Schedule (1 col) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-extrabold text-text">
                    Immediate Shifts
                  </h3>
                  <p className="text-xs text-text-muted">
                    Upcoming freight departures
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTabChange("shifts")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Roster
                </button>
              </div>

              <div className="space-y-3">
                {shifts.slice(0, 3).map((shift) => (
                  <div
                    key={shift.id}
                    className="rounded-2xl border border-border bg-surface p-4 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                          {shift.date} • {shift.startTime}
                        </span>
                        <h5 className="text-xs font-bold text-text">
                          {shift.route}
                        </h5>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          shift.status === "confirmed"
                            ? "bg-success-bg text-success"
                            : "bg-warning-bg text-warning"
                        }`}
                      >
                        {shift.status === "confirmed" ? "Assigned" : "Unfilled"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-secondary pt-1 border-t border-border-subtle">
                      <span>{shift.vehicle}</span>
                      <span className="font-bold text-text">{shift.rate}</span>
                    </div>

                    {shift.status === "pending_assignment" && (
                      <button
                        type="button"
                        onClick={() => handleAssignShift(shift.id)}
                        className="w-full rounded-lg bg-primary-50 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary-100"
                      >
                        Auto-Dispatch Nearest Driver
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Candidate Applications Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-extrabold text-text sm:text-lg">
                  Recent Verified Applicants
                </h3>
                <p className="text-xs text-text-muted">
                  Screened commercial chauffeurs ready for deployment
                </p>
              </div>

              <button
                type="button"
                onClick={() => onTabChange("candidates")}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                View all candidates
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="divide-y divide-border">
                {candidates.slice(0, 4).map((cand) => (
                  <div
                    key={cand.id}
                    className="flex flex-col gap-4 p-5 transition-colors hover:bg-surface-subtle/70 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3.5 sm:items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-on-primary">
                        {cand.initials}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-text">
                            {cand.name}
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-bold text-success">
                            <ShieldCheck className="h-3 w-3" />
                            Transportstyrelsen
                          </span>
                          <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
                            ★ {cand.rating}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
                          <span>{cand.location}</span>
                          <span>•</span>
                          <span>{cand.experienceYears} Years Exp</span>
                          <span>•</span>
                          <span className="font-bold text-text">
                            YKB: {cand.ykbValidUntil}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                      {cand.licenseClasses.map((lic) => (
                        <span
                          key={lic}
                          className="rounded-md border border-primary/20 bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary"
                        >
                          {lic}
                        </span>
                      ))}

                      <button
                        type="button"
                        onClick={() => setSelectedCandidate(cand)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-text transition hover:border-primary hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Full Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleInviteCandidate(cand.name, cand.appliedFor || "Commercial Shift");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Quick Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: CANDIDATES
         ======================================================== */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          {/* Header & Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text">
                Driver Candidate Pipeline
              </h3>
              <p className="text-xs text-text-muted">
                Pre-screened commercial drivers with verified Swedish qualifications
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search by name, license, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-xs text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text outline-none focus:border-primary"
              >
                <option value="all">All Licenses</option>
                <option value="class ce">Class CE (Heavy Combo)</option>
                <option value="class c">Class C (Truck)</option>
                <option value="class d">Class D (Bus)</option>
                <option value="adr">ADR Dangerous Goods</option>
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text outline-none focus:border-primary"
              >
                <option value="all">All Regions</option>
                <option value="stockholm">Stockholm</option>
                <option value="gothenburg">Gothenburg</option>
                <option value="malmö">Malmö</option>
                <option value="jönköping">Jönköping</option>
                <option value="uppsala">Uppsala</option>
              </select>
            </div>
          </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border-strong hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-extrabold text-on-primary">
                        {cand.initials}
                      </div>

                      <div>
                        <h4 className="text-sm font-extrabold text-text">
                          {cand.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-text-muted">
                          <MapPin className="h-3 w-3 text-primary" />
                          <span>{cand.location}</span>
                        </div>
                      </div>
                    </div>

                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {cand.matchScore}% Match
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cand.licenseClasses.map((lic) => (
                      <span
                        key={lic}
                        className="rounded-md border border-primary/20 bg-primary-50/60 px-2 py-0.5 text-[10px] font-bold text-primary"
                      >
                        {lic}
                      </span>
                    ))}
                    {cand.adrCert && (
                      <span className="rounded-md bg-warning-bg px-2 py-0.5 text-[10px] font-bold text-warning">
                        ADR
                      </span>
                    )}
                    {cand.tachoCard && (
                      <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-bold text-text-secondary">
                        Tacho Gen 2
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
                    {cand.summary}
                  </p>

                  {/* Details Row */}
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-border-subtle bg-surface-subtle p-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-text-muted">
                        Salary Need
                      </span>
                      <p className="font-bold text-text">
                        {cand.salaryExpectation.split("/")[0]}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-text-muted">
                        YKB Expiry
                      </span>
                      <p className="font-bold text-success">
                        {cand.ykbValidUntil}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 flex items-center gap-2 border-t border-border-subtle pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCandidate(cand)}
                    className="flex-1 rounded-xl border border-border bg-surface py-2 text-center text-xs font-bold text-text transition-colors hover:bg-surface-muted"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleInviteCandidate(cand.name, cand.appliedFor || "Commercial Fleet");
                    }}
                    className="flex-1 rounded-xl bg-primary py-2 text-center text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover"
                  >
                    Invite to Job
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <Users className="mx-auto h-8 w-8 text-text-muted" />
              <h4 className="mt-3 text-sm font-bold text-text">
                No matching drivers found
              </h4>
              <p className="mt-1 text-xs text-text-muted">
                Try clearing your search query or license filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: FLEET COMPLIANCE
         ======================================================== */}
      {activeTab === "compliance" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-extrabold text-text">
              Fleet Driver Compliance & YKB Tracker
            </h3>
            <p className="text-xs text-text-muted">
              Live validation connected to Transportstyrelsen driving license and qualification registers
            </p>
          </div>

          {/* Compliance Alerts */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-success-border bg-success-bg/40 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">
                  Transportstyrelsen YKB
                </h5>
                <p className="text-[11px] text-text-secondary">
                  3 of 4 active drivers fully compliant until 2027+
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-warning-border bg-warning-bg/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">
                  Upcoming Renewals
                </h5>
                <p className="text-[11px] text-text-secondary">
                  1 driver YKB renewal required within 90 days (Mikael Lind)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-info-border bg-info-bg/40 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info text-white">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-text">
                  Digital Tachograph Cards
                </h5>
                <p className="text-[11px] text-text-secondary">
                  All active gen-2 company driver cards verified
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-surface-subtle font-bold uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3.5">Driver & Role</th>
                  <th className="px-5 py-3.5">Swedish License No</th>
                  <th className="px-5 py-3.5">YKB Validity</th>
                  <th className="px-5 py-3.5">Tacho Card</th>
                  <th className="px-5 py-3.5">Medical Exam</th>
                  <th className="px-5 py-3.5">Health Score</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {complianceList.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-surface-subtle/60">
                    <td className="px-5 py-4">
                      <span className="font-bold text-text block">{item.driverName}</span>
                      <span className="text-[11px] text-text-muted">{item.role}</span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-text-secondary">
                      {item.licenseNumber}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          item.ykbStatus === "valid"
                            ? "bg-success-bg text-success"
                            : "bg-warning-bg text-warning"
                        }`}
                      >
                        {item.ykbExpires}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {item.tachoExpires}
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {item.medicalCheckupDate}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text">{item.complianceScore}%</span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-muted">
                          <div
                            className={`h-full rounded-full ${
                              item.complianceScore >= 95 ? "bg-success" : "bg-warning"
                            }`}
                            style={{ width: `${item.complianceScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onShowToast(`Audit certificate generated for ${item.driverName}.`)
                        }
                        className="rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] font-bold text-text hover:border-primary hover:text-primary"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: POSTINGS
         ======================================================== */}
      {activeTab === "postings" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text">
                Your Published Job Vacancies
              </h3>
              <p className="text-xs text-text-muted">
                Manage commercial listings and dispatch assignments
              </p>
            </div>

            <Link
              href="/PostDriverJob"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover"
            >
              <PlusCircle className="h-4 w-4" />
              Post New Vacancy
            </Link>
          </div>

          <div className="space-y-3">
            {postings.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-extrabold text-text">
                      {job.title}
                    </h4>
                    <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {job.licenseRequired}
                    </span>
                    <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success capitalize">
                      {job.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {job.routeLocation}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-text">{job.salary}</span>
                    <span>•</span>
                    <span className="text-text-muted">Posted {job.postedDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Applications
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {job.applicantsCount} Total ({job.shortlistedCount} Shortlisted)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onTabChange("candidates")}
                    className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text transition hover:border-primary hover:text-primary"
                  >
                    View Applicants
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: SHIFTS
         ======================================================== */}
      {activeTab === "shifts" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text">
                Fleet Shift Dispatch Schedule
              </h3>
              <p className="text-xs text-text-muted">
                Track assigned and upcoming commercial freight routes
              </p>
            </div>

            <button
              type="button"
              onClick={() => onShowToast("New shift roster added to calendar.")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm hover:bg-primary-hover"
            >
              <PlusCircle className="h-4 w-4" />
              Schedule Route Shift
            </button>
          </div>

          <div className="space-y-3">
            {shifts.map((shift) => (
              <div
                key={shift.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-text text-sm">
                      {shift.route}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        shift.status === "confirmed"
                          ? "bg-success-bg text-success"
                          : "bg-warning-bg text-warning"
                      }`}
                    >
                      {shift.status === "confirmed" ? "Assigned" : "Pending Driver"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1 text-text-secondary font-medium">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {shift.date} • {shift.startTime} – {shift.endTime}
                    </span>
                    <span>•</span>
                    <span>{shift.vehicle}</span>
                    <span>•</span>
                    <span className="font-bold text-text">{shift.rate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {shift.assignedDriver ? (
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-on-primary">
                        {shift.driverInitials}
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold uppercase text-text-muted block">
                          Assigned Chauffeur
                        </span>
                        <span className="text-xs font-bold text-text">
                          {shift.assignedDriver}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAssignShift(shift.id)}
                      className="rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-on-primary transition hover:bg-primary-hover shadow-sm"
                    >
                      Assign Driver Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Candidate Details */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onInvite={handleInviteCandidate}
        />
      )}
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
        active
          ? "bg-primary text-on-primary shadow-sm"
          : "border border-border bg-surface text-text-secondary hover:bg-surface-subtle hover:text-text"
      }`}
    >
      {icon}
      <span>{label}</span>
      {count && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
            active ? "bg-white/20 text-white" : "bg-surface-muted text-text-muted"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function StatCard({
  title,
  value,
  change,
  trend,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "neutral";
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          {title}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-subtle">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black tracking-tight text-text">
          {value}
        </span>
        <span className="inline-flex items-center text-[11px] font-bold text-success">
          {change}
        </span>
      </div>

      <p className="text-[11px] text-text-muted">{subtitle}</p>
    </div>
  );
}
