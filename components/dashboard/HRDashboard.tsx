"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  PlusCircle,
  Search,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  UserCheck,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import MessageDriverModal from "@/components/drivers/MessageDriverModal";
import HireDriverModal from "@/components/drivers/HireDriverModal";
import { useAuthStore } from "@/store/authStore";
import { useDrivers } from "@/lib/hook/useDrivers";
import { useHrJobs, useHrMessages } from "@/lib/hook/useDashboard";
import { useDriverJobs } from "@/lib/api/apiCall";
import { Driver } from "@/type/driver";
import { DriverJob } from "@/type/job";

interface HRDashboardProps {
  onShowToast: (msg: string) => void;
}

type SimpleHRTab = "drivers" | "post" | "sent";

export default function HRDashboard({ onShowToast }: HRDashboardProps) {
  const { user } = useAuthStore();
  const hrId = user && "id" in user ? Number(user.id) : undefined;
  const companyName = user && "companyName" in user ? String(user.companyName) : "Employer";

  const [activeTab, setActiveTab] = useState<SimpleHRTab>("drivers");

  // Real backend queries
  const { drivers: liveDrivers = [], isLoading: loadingDrivers } = useDrivers({ limit: 50 });
  const { data: hrJobs = [], isLoading: loadingHrJobs } = useHrJobs(hrId);
  const { data: allLiveJobsResponse } = useDriverJobs();
  const allLiveJobs: DriverJob[] = (
    Array.isArray(allLiveJobsResponse)
      ? (allLiveJobsResponse as DriverJob[])
      : Array.isArray(allLiveJobsResponse?.jobs)
      ? (allLiveJobsResponse.jobs as DriverJob[])
      : []
  ).filter((j: any) => !j.isDirectOffer && !j.assignedDriverId);
  const { data: sentMessages = [], isLoading: loadingMessages } = useHrMessages(hrId);

  const displayedJobs: DriverJob[] = hrJobs.length > 0 ? hrJobs : allLiveJobs;

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedDriverForMessage, setSelectedDriverForMessage] = useState<Driver | null>(null);
  const [selectedDriverForHire, setSelectedDriverForHire] = useState<Driver | null>(null);

  // Filter drivers
  const filteredDrivers = liveDrivers.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.fullname.toLowerCase().includes(q) ||
      (d.regions && d.regions.some((r) => r.toLowerCase().includes(q))) ||
      (d.licenseCategories && d.licenseCategories.some((l) => l.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ========================================================
          1. COMPANY BANNER (BIG & CLEAR)
         ======================================================== */}
      <div className="rounded-3xl border-2 border-border bg-surface p-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary text-white text-2xl font-black flex items-center justify-center shadow-md">
            {companyName.charAt(0).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-text sm:text-2xl">
                {companyName}
              </h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                Verified Fleet Employer
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">
              Find drivers, send job offers, or call drivers directly on their phone.
            </p>
          </div>
        </div>

        <Link
          href="/PostDriverJob"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-black text-white shadow-md hover:bg-primary-hover transition cursor-pointer"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Post a New Vacancy</span>
        </Link>
      </div>

      {/* ========================================================
          2. SIMPLE 3 TABS (BIG & EASY TO CLICK)
         ======================================================== */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setActiveTab("drivers")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "drivers"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="text-base font-black">Find Drivers</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "drivers"
                ? "bg-white/30 text-white"
                : "bg-primary-50 text-primary"
            }`}
          >
            {liveDrivers.length} verified drivers ready
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("post")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "post"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6" />
            <span className="text-base font-black">Post a Job / Offer</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "post"
                ? "bg-white/30 text-white"
                : "bg-surface-muted text-text-muted"
            }`}
          >
            Public or Personal Offer
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sent")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "sent"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <span className="text-base font-black">Messages & My Jobs</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "sent"
                ? "bg-white/30 text-white"
                : "bg-primary-50 text-primary"
            }`}
          >
            {sentMessages.length} messages • {displayedJobs.length} jobs
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: FIND DRIVERS (BIG DRIVER CARDS & EASY CALL/MESSAGE)
         ======================================================== */}
      {activeTab === "drivers" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-black text-text">
              Verified Drivers Ready to Hire ({liveDrivers.length})
            </h3>

            {/* Simple Search */}
            <div className="relative min-w-[260px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search driver name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredDrivers.map((driver) => {
              const initials = driver.fullname
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={driver.id}
                  className="rounded-3xl border-2 border-border bg-surface p-6 shadow-sm flex flex-col justify-between gap-5 hover:border-primary/50 transition"
                >
                  <div className="space-y-3">
                    {/* Header: Photo + Name + Badge */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 rounded-2xl bg-primary text-white text-lg font-black flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        {driver.ProfileImage ? (
                          <img
                            src={driver.ProfileImage}
                            alt={driver.fullname}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-base font-black text-text truncate">
                          {driver.fullname}
                        </h4>
                        <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{driver.regions?.join(", ") || "Sweden"}</span>
                        </p>
                      </div>
                    </div>

                    {/* License categories */}
                    <div className="flex flex-wrap gap-1.5">
                      {(driver.licenseCategories || []).map((lic) => (
                        <span
                          key={lic}
                          className="rounded-xl border border-primary/20 bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary"
                        >
                          {lic}
                        </span>
                      ))}
                    </div>

                    {/* Salary & hours */}
                    <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-3 text-xs flex items-center justify-between">
                      <span>
                        Salary:{" "}
                        <strong className="text-text text-sm">
                          {driver.targetMonthlySalary ? `${driver.targetMonthlySalary} SEK/mo` : "Negotiable"}
                        </strong>
                      </span>
                      <span>
                        Hours: <strong>{driver.workingHours || "8 Hours"}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions: Big Call & Message buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
                    {driver.phonenumber ? (
                      <a
                        href={`tel:${driver.phonenumber}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 text-xs font-black text-white hover:bg-green-700 shadow-sm transition cursor-pointer"
                      >
                        <PhoneCall className="h-4 w-4" />
                        <span>Call Driver</span>
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setSelectedDriverForMessage(driver)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-black text-white hover:bg-primary-hover shadow-sm transition cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Message / Offer</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDrivers.length === 0 && (
            <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center bg-surface">
              <Users className="h-12 w-12 text-text-muted mx-auto" />
              <h4 className="text-base font-black text-text mt-3">
                No Drivers Found
              </h4>
              <p className="text-sm text-text-muted mt-1">
                Try clearing your search query.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: POST A JOB OR DIRECT OFFER (SIMPLE)
         ======================================================== */}
      {activeTab === "post" && (
        <div className="rounded-3xl border-2 border-border bg-surface p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-text">
              Post a Driving Job or Personal Offer
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Choose how you want to hire: post for everyone in Sweden, or send a direct offer to one driver.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/PostDriverJob"
              className="p-6 rounded-3xl border-2 border-primary bg-primary-50/50 hover:bg-primary-50 transition cursor-pointer space-y-3 block no-underline"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                <Briefcase className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-black text-text">
                1. Post a Public Vacancy
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Publish a route or job opening that all commercial drivers across Sweden can view and apply for.
              </p>
              <div className="text-sm font-bold text-primary flex items-center gap-1 pt-2">
                <span>Open Job Posting Form &rarr;</span>
              </div>
            </Link>

            <div
              onClick={() => setActiveTab("drivers")}
              className="p-6 rounded-3xl border-2 border-border bg-surface hover:border-primary transition cursor-pointer space-y-3"
            >
              <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                <UserCheck className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-black text-text">
                2. Send a Direct Personal Offer
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Browse our driver list, click on any driver, and send them an exclusive offer with salary and start date.
              </p>
              <div className="text-sm font-bold text-primary flex items-center gap-1 pt-2">
                <span>Pick a Driver to Offer &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: MESSAGES & MY JOBS (SIMPLE LIST)
         ======================================================== */}
      {activeTab === "sent" && (
        <div className="space-y-6">
          {/* Sent messages */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-text">
              Messages & Inquiries You Sent ({sentMessages.length})
            </h3>

            {sentMessages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-3xl border-2 border-border bg-surface p-5 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-text">
                    {msg.subject}
                  </h4>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      msg.isRead
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {msg.isRead ? "✓ Read by Driver" : "Delivered"}
                  </span>
                </div>
                <p className="text-sm text-text-secondary whitespace-pre-wrap">
                  {msg.content}
                </p>
                <span className="text-xs text-text-muted block">
                  Sent on {new Date(msg.createdAt).toLocaleDateString()} to Driver #{msg.receiverDriverId}
                </span>
              </div>
            ))}

            {sentMessages.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-border p-8 text-center text-sm text-text-muted bg-surface">
                You haven&apos;t sent any driver messages yet. Click on any driver to message them!
              </div>
            )}
          </div>

          {/* Published jobs */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-lg font-black text-text">
              Your Published Jobs ({displayedJobs.length})
            </h3>

            {displayedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border-2 border-border bg-surface p-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="text-base font-black text-text">
                    {job.jobTitle}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    📍 {job.location} • 💰 {job.salaryAmount} ({job.salaryType}) • {job.employmentType}
                  </p>
                </div>

                <span className="rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-bold w-fit">
                  {job.isDirectOffer ? "Personal Offer" : "Public Vacancy"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Modal */}
      {selectedDriverForMessage && (
        <MessageDriverModal
          driver={selectedDriverForMessage}
          onClose={() => setSelectedDriverForMessage(null)}
        />
      )}

      {/* Hire Modal */}
      {selectedDriverForHire && (
        <HireDriverModal
          driver={selectedDriverForHire}
          onClose={() => setSelectedDriverForHire(null)}
        />
      )}
    </div>
  );
}
