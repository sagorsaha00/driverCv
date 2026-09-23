"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  Truck,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  FileText,
  Send,
  Zap,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import type { DriverTab, JobPostingItem, ApplicationItem } from "./types";
import { INITIAL_HR_POSTINGS, DRIVER_APPLICATIONS } from "./types";
import QuickApplyModal from "./QuickApplyModal";

interface DriverDashboardProps {
  activeTab: DriverTab;
  onTabChange: (tab: DriverTab) => void;
  onShowToast: (msg: string) => void;
  driverName?: string;
}

export default function DriverDashboard({
  activeTab,
  onTabChange,
  onShowToast,
  driverName = "Lars Lindqvist",
}: DriverDashboardProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [applications, setApplications] = useState<ApplicationItem[]>(DRIVER_APPLICATIONS);
  const [jobs, setJobs] = useState<JobPostingItem[]>(INITIAL_HR_POSTINGS);

  // Job Search / Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRouteType, setSelectedRouteType] = useState("all");

  // Selected job for apply modal
  const [selectedJob, setSelectedJob] = useState<JobPostingItem | null>(null);

  // Invitation state
  const [invitationAccepted, setInvitationAccepted] = useState(false);

  const toggleAvailability = () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    onShowToast(
      nextState
        ? "You are now marked Available for immediate shift dispatches across Sweden."
        : "You are now marked Off-Duty. Verified fleet operators will not contact you."
    );
  };

  const handleApplySubmit = (jobTitle: string, company: string) => {
    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobTitle,
      companyName: company,
      location: "Stockholm Region",
      salary: "39,500 SEK / mo",
      appliedDate: "Just now",
      status: "submitted",
      nextStep: "Awaiting Fleet Manager screening",
      notes: "Application submitted with verified Transportstyrelsen CE credentials.",
    };

    setApplications([newApp, ...applications]);
    onShowToast(`Application for ${jobTitle} transmitted successfully to fleet manager!`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.routeLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.licenseRequired.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoute =
      selectedRouteType === "all" ||
      job.employmentType.toLowerCase().includes(selectedRouteType.toLowerCase());

    return matchesSearch && matchesRoute;
  });

  return (
    <div className="space-y-8">
      {/* ========================================================
          DRIVER STATUS & AVAILABILITY BANNER
         ======================================================== */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-on-primary shadow-sm">
              LL
            </div>
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-surface ${
                isAvailable ? "bg-success" : "bg-text-muted"
              }`}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-extrabold text-text sm:text-lg">
                {driverName}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success">
                <ShieldCheck className="h-3 w-3" />
                Transportstyrelsen Verified
              </span>
            </div>

            <p className="text-xs text-text-secondary">
              Heavy Truck Class CE • YKB Active (Valid 2028) • Stockholm Hub
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-3 sm:border-0 sm:pt-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
              Dispatch Status
            </span>
            <span
              className={`text-xs font-bold ${
                isAvailable ? "text-success" : "text-text-muted"
              }`}
            >
              {isAvailable ? "● Ready for Shifts" : "○ Off-Duty"}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleAvailability}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm ${
              isAvailable
                ? "bg-surface-subtle text-text hover:bg-surface-muted border border-border"
                : "bg-primary text-on-primary hover:bg-primary-hover"
            }`}
          >
            {isAvailable ? "Go Off-Duty" : "Activate Available"}
          </button>
        </div>
      </div>

      {/* ========================================================
          SUB-NAVIGATION TABS
         ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-3 scrollbar-none">
        <DriverTabButton
          active={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
          icon={<TrendingUp className="h-4 w-4" />}
          label="Overview"
        />
        <DriverTabButton
          active={activeTab === "jobs"}
          onClick={() => onTabChange("jobs")}
          icon={<Search className="h-4 w-4" />}
          label="Find Shifts & Jobs"
          count={jobs.length.toString()}
        />
        <DriverTabButton
          active={activeTab === "applications"}
          onClick={() => onTabChange("applications")}
          icon={<Briefcase className="h-4 w-4" />}
          label="My Applications"
          count={applications.length.toString()}
        />
        <DriverTabButton
          active={activeTab === "credentials"}
          onClick={() => onTabChange("credentials")}
          icon={<FileCheck2 className="h-4 w-4" />}
          label="Digital License & Cards"
        />
        <DriverTabButton
          active={activeTab === "earnings"}
          onClick={() => onTabChange("earnings")}
          icon={<DollarSign className="h-4 w-4" />}
          label="Earnings & OB Rates"
        />
      </div>

      {/* ========================================================
          TAB CONTENT: OVERVIEW
         ======================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Driver Metric Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DriverStatCard
              title="Profile Inquiries"
              value="8"
              change="+3 this week"
              subtitle="From verified fleet managers"
              icon={<Radio className="h-5 w-5 text-primary" />}
            />

            <DriverStatCard
              title="Employer Views"
              value="54"
              change="+28% view rate"
              subtitle="Appeared in 19 searches"
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
            />

            <DriverStatCard
              title="Active Applications"
              value={applications.length.toString()}
              change="1 Interview Set"
              subtitle="In Swedish logistics network"
              icon={<Briefcase className="h-5 w-5 text-success" />}
            />

            <DriverStatCard
              title="Driver Rating"
              value="4.95 ★"
              change="Top 5% in Sweden"
              subtitle="Clean tachograph records"
              icon={<Award className="h-5 w-5 text-primary" />}
            />
          </div>

          {/* Direct Shift Offer / Invitation Alert */}
          {!invitationAccepted ? (
            <div className="rounded-2xl border border-primary/20 bg-primary-50/50 p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      Direct Shift Invitation
                    </span>
                    <h4 className="text-sm font-extrabold text-text">
                      ScanLogistics AB wants to book you for Stockholm – Jönköping Combi
                    </h4>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      Departure tonight 21:30 • Vehicle: Scania 500S Semi (25.25m) • Compensation:{" "}
                      <strong>4,200 SEK + OB</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setInvitationAccepted(true);
                      onShowToast("Shift invitation accepted! Fleet dispatch details sent to your SMS.");
                    }}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-sm hover:bg-primary-hover"
                  >
                    Accept Shift
                  </button>
                  <button
                    type="button"
                    onClick={() => onShowToast("Shift invitation declined.")}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text hover:bg-surface-muted"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-success-border bg-success-bg p-4 text-xs font-bold text-success">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Shift confirmed with ScanLogistics AB for tonight. Waybill sent to your driver app.
              </span>
            </div>
          )}

          {/* Active Application Progress Tracker */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Live Recruitment Stage
                </span>
                <h3 className="font-display text-base font-extrabold text-text sm:text-lg">
                  {applications[0]?.jobTitle || "CE-Chaufför Fjärrtransporter"}
                </h3>
                <p className="text-xs text-text-muted">
                  {applications[0]?.companyName} • {applications[0]?.location}
                </p>
              </div>

              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary w-fit">
                {applications[0]?.interviewDate || "Interview Thursday 10:00"}
              </span>
            </div>

            {/* Stepper */}
            <div className="pt-2">
              <div className="grid grid-cols-4 gap-2">
                <StepItem step="1" title="Submitted" done />
                <StepItem step="2" title="Screening" done />
                <StepItem step="3" title="Interview" active />
                <StepItem step="4" title="Contract Offer" />
              </div>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3 text-xs text-text-secondary flex items-center justify-between">
              <span>
                <strong>Next Step:</strong> {applications[0]?.nextStep}
              </span>
              <button
                type="button"
                onClick={() => onTabChange("applications")}
                className="text-xs font-bold text-primary hover:underline"
              >
                View timeline &rarr;
              </button>
            </div>
          </div>

          {/* Recommended Commercial Shifts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-extrabold text-text sm:text-lg">
                  Recommended Shifts Matching Class CE & YKB
                </h3>
                <p className="text-xs text-text-muted">
                  Pre-matched with Swedish collective agreement pay
                </p>
              </div>

              <button
                type="button"
                onClick={() => onTabChange("jobs")}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                Browse all ({jobs.length})
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 3).map((job) => (
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
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {job.routeLocation}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-text-muted" />
                        {job.employmentType}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-text">{job.salary}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm transition hover:bg-primary-hover"
                  >
                    Quick Apply
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: FIND JOBS & SHIFTS
         ======================================================== */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text">
                Swedish Commercial Driver Jobs
              </h3>
              <p className="text-xs text-text-muted">
                Direct applications with pre-attached Transportstyrelsen verification
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search routes, vehicles, licenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-xs text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <select
                value={selectedRouteType}
                onChange={(e) => setSelectedRouteType(e.target.value)}
                className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text outline-none focus:border-primary"
              >
                <option value="all">All Shift Types</option>
                <option value="full-time">Full-Time Line Haul</option>
                <option value="day shift">Day Shift Urban</option>
                <option value="rotation">Shift Rotation</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-border-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-extrabold text-text">
                      {job.title}
                    </h4>
                    <span className="rounded-md bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {job.licenseRequired}
                    </span>
                    <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
                      {job.vehicleType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {job.routeLocation}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-text-muted" />
                      {job.employmentType}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-text">{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm hover:bg-primary-hover"
                  >
                    Apply with Verified CV
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: MY APPLICATIONS
         ======================================================== */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-extrabold text-text">
              My Job Applications
            </h3>
            <p className="text-xs text-text-muted">
              Live status from Swedish fleet managers and HR teams
            </p>
          </div>

          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Applied {app.appliedDate}
                    </span>
                    <h4 className="text-base font-extrabold text-text">
                      {app.jobTitle}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {app.companyName} • {app.location} •{" "}
                      <span className="font-bold text-text">{app.salary}</span>
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize w-fit ${
                      app.status === "interview_scheduled"
                        ? "bg-primary-50 text-primary border border-primary/20"
                        : app.status === "offer_received"
                        ? "bg-success-bg text-success border border-success-border"
                        : "bg-surface-muted text-text-secondary"
                    }`}
                  >
                    {app.status.replace("_", " ")}
                  </span>
                </div>

                <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3.5 text-xs text-text-secondary space-y-1">
                  <p>
                    <strong>Next Action:</strong> {app.nextStep}
                  </p>
                  {app.interviewDate && (
                    <p className="text-primary font-bold">
                      📅 Scheduled: {app.interviewDate}
                    </p>
                  )}
                  {app.notes && (
                    <p className="text-[11px] text-text-muted italic">
                      &ldquo;{app.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast(`Message thread opened with ${app.companyName}.`)
                    }
                    className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-text hover:bg-surface-muted"
                  >
                    Message Fleet Manager
                  </button>

                  {app.status === "offer_received" && (
                    <button
                      type="button"
                      onClick={() =>
                        onShowToast("Offer accepted! Employment contract dispatched.")
                      }
                      className="rounded-xl bg-success px-3.5 py-1.5 text-xs font-bold text-white hover:bg-success/90 shadow-sm"
                    >
                      Accept Contract Offer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: DIGITAL LICENSE & CREDENTIALS CARDS
         ======================================================== */}
      {activeTab === "credentials" && (
        <div className="space-y-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-extrabold text-text">
                Swedish Commercial Driver License & Cards
              </h3>
              <p className="text-xs text-text-muted">
                Transportstyrelsen verified digital credentials and periodic training credits
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onShowToast("Document scanner opened. Upload new certificate or renewal.")
              }
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-sm hover:bg-primary-hover"
            >
              <FileCheck2 className="h-4 w-4" />
              Upload Card Renewal
            </button>
          </div>

          {/* Physical / Digital Swedish Driving License Presentation */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Card 1: Körkort Sverige (Class CE / C / B) */}
            <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-surface to-surface-subtle p-6 shadow-lg">
              {/* Hologram / Flag Indicator */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-9 items-center justify-center rounded bg-[#006AA7] text-[10px] font-black text-[#FECC00]">
                    S
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-text">
                      KÖRKORT SVERIGE
                    </h5>
                    <span className="text-[10px] text-text-muted">
                      DRIVING LICENCE • TRANSPORTSTYRELSEN
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success border border-success-border">
                  VERIFIED ACTIVE
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                    LL
                  </div>
                  <span className="mt-1 text-[10px] font-bold text-text">L. Lindqvist</span>
                </div>

                <div className="col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-text-muted">
                      License Number
                    </span>
                    <p className="font-mono font-bold text-text">SE-19880412-4412</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-text-muted">
                      Valid License Categories
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-black text-white">
                        CE
                      </span>
                      <span className="rounded bg-primary-100 px-2 py-0.5 text-[10px] font-black text-primary-900">
                        C
                      </span>
                      <span className="rounded bg-primary-100 px-2 py-0.5 text-[10px] font-black text-primary-900">
                        B
                      </span>
                      <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-text-secondary">
                        BE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-text-muted block">Issue Date</span>
                      <span className="font-bold text-text">2012-04-12</span>
                    </div>
                    <div>
                      <span className="text-text-muted block">Expires</span>
                      <span className="font-bold text-success">2032-04-12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: YKB (Yrkeskompetensbevis) Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-surface to-surface-subtle p-6 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-9 items-center justify-center rounded bg-primary text-[10px] font-black text-white">
                    YKB
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-text">
                      YRKESKOMPETENSBEVIS
                    </h5>
                    <span className="text-[10px] text-text-muted">
                      DIRECTIVE 2003/59/EC • DRIVER CPC
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success border border-success-border">
                  VALID UNTIL 2028
                </span>
              </div>

              {/* Progress 35h periodic training */}
              <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text">35h Periodic Training Status</span>
                  <span className="font-black text-success">35 / 35 Hours (100%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full w-full bg-success rounded-full" />
                </div>
                <p className="text-[11px] text-text-muted">
                  All 5 mandatory modules completed at accredited Swedish training facility.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-border-subtle bg-surface p-2.5">
                  <span className="text-[10px] text-text-muted uppercase font-bold block">
                    Card Number
                  </span>
                  <span className="font-mono font-bold text-text">95.01.19880412</span>
                </div>
                <div className="rounded-lg border border-border-subtle bg-surface p-2.5">
                  <span className="text-[10px] text-text-muted uppercase font-bold block">
                    EU Code 95
                  </span>
                  <span className="font-bold text-success">Active & Endorsed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Permits: ADR & Digital Tacho */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-extrabold text-text">
                  Digital Tachograph Card (Gen 2 Smart Tacho)
                </h5>
                <p className="text-xs text-text-secondary">
                  Card ID: SE000000008492000 • Valid until Aug 2027
                </p>
                <span className="inline-block text-[11px] font-bold text-success">
                  ✓ Ready for international cross-border Cabotage
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning-bg text-warning">
                <Award className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-extrabold text-text">
                  ADR Dangerous Goods Certificate
                </h5>
                <p className="text-xs text-text-secondary">
                  Classes: Bulk Tank + Package • Valid until Nov 2026
                </p>
                <span className="inline-block text-[11px] font-bold text-primary">
                  ✓ Certified for chemical and flammable logistics
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB CONTENT: EARNINGS & OB RATES
         ======================================================== */}
      {activeTab === "earnings" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-extrabold text-text">
              Earnings & Swedish Collective Agreement Rates
            </h3>
            <p className="text-xs text-text-muted">
              Compensation based on Transportarbetareförbundet agreement standards
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Estimated Month Payout
              </span>
              <p className="text-2xl font-black text-text">42,800 SEK</p>
              <span className="text-[11px] text-success font-semibold">
                +4,200 SEK scheduled tonight
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                OB Night Allowance (22:00 – 06:00)
              </span>
              <p className="text-2xl font-black text-primary">+48.50 SEK / hr</p>
              <span className="text-[11px] text-text-muted">Standard Swedish freight tier</span>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Weekend / Holiday OB
              </span>
              <p className="text-2xl font-black text-text">+102.20 SEK / hr</p>
              <span className="text-[11px] text-text-muted">From Friday 18:00</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-text">
              Recent Completed Shift Dispatches
            </h4>

            <div className="divide-y divide-border">
              <div className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-text block">
                    Stockholm Syd → Jönköping Combi
                  </span>
                  <span className="text-text-muted">Sep 20 • 8.5 hrs (Scania 500S)</span>
                </div>
                <span className="font-extrabold text-success">+3,950 SEK</span>
              </div>

              <div className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-text block">
                    Gothenburg Arendal → Malmö Express
                  </span>
                  <span className="text-text-muted">Sep 17 • 7.0 hrs (Volvo FH16)</span>
                </div>
                <span className="font-extrabold text-success">+3,400 SEK</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Quick Apply */}
      {selectedJob && (
        <QuickApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmit={handleApplySubmit}
        />
      )}
    </div>
  );
}

/* ============================================================
   HELPER SUBCOMPONENTS
   ============================================================ */

function DriverTabButton({
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

function DriverStatCard({
  title,
  value,
  change,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  change: string;
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

function StepItem({
  step,
  title,
  done,
  active,
}: {
  step: string;
  title: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-2.5 text-center transition-all ${
        active
          ? "border-primary bg-primary-50 text-primary"
          : done
          ? "border-success-border bg-success-bg text-success"
          : "border-border-subtle bg-surface text-text-muted"
      }`}
    >
      <span className="block text-[10px] font-bold uppercase">Step {step}</span>
      <span className="text-xs font-bold">{title}</span>
    </div>
  );
}
