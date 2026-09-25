"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  FileCheck,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSingleDriver } from "@/lib/hook/useDrivers";
import HireDriverModal from "@/components/drivers/HireDriverModal";
import MessageDriverModal from "@/components/drivers/MessageDriverModal";

export default function DriverProfileView() {
  const router = useRouter();
  const params = useParams();
  const driverId = params?.id as string;

  const [copied, setCopied] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Live dynamic fetch from http://localhost:5000/api/driver/driverSingleData/:id
  const {
    data: driver,
    isLoading,
    isError,
    error,
    refetch,
  } = useSingleDriver(driverId);

  const handleCopyPhone = () => {
    if (driver?.phonenumber) {
      navigator.clipboard.writeText(driver.phonenumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-6 w-32 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
          <div className="h-48 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (isError || !driver) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-base font-bold text-[var(--text)]">
            Driver Profile Not Found
          </h2>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {error instanceof Error
              ? error.message
              : "Unable to load driver data from http://localhost:5000/api/driver/driverSingleData"}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/ExploreDrivers")}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Drivers
            </button>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-[var(--on-primary)] shadow-xs transition hover:bg-[var(--primary-hover)]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formattedSalary = Number(driver.targetMonthlySalary || 0).toLocaleString();

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 font-sans text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* --- NAVIGATION / BREADCRUMB --- */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/ExploreDrivers")}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[var(--text-muted)] transition hover:text-[var(--primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Driver Marketplace</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[var(--text-subtle)]">
            <span>Driver ID:</span>
            <span className="font-mono font-bold text-[var(--text)]">#{driver.id}</span>
          </div>
        </div>

        {/* --- MAIN PROFILE BANNER CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Identity Group */}
            <div className="flex items-start gap-4 sm:items-center sm:gap-5">
              {/* Profile Avatar */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl border-2 border-[var(--primary-200)] bg-[var(--primary-50)] text-xl font-bold text-[var(--primary)] sm:h-24 sm:w-24 sm:text-2xl">
                {driver.ProfileImage ? (
                  <img
                    src={driver.ProfileImage}
                    alt={driver.fullname}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {getInitials(driver.fullname)}
                  </div>
                )}
                <span
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--surface)] bg-[var(--primary)] text-white"
                  title="Verified Commercial Driver"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Text Info */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="truncate text-xl font-extrabold tracking-tight text-[var(--text)] sm:text-2xl">
                    {driver.fullname}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Driver
                  </span>
                </div>

                <p className="mt-1 text-xs font-semibold capitalize text-[var(--text-muted)] sm:text-sm">
                  {driver.role || "Professional Driver"}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[var(--text-subtle)]">
                  <span className="flex items-center gap-1 font-medium text-[var(--text)]">
                    <MapPin className="h-3.5 w-3.5 text-[var(--primary)] shrink-0" />
                    {driver.regions?.join(", ") || "Nationwide"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[var(--primary)] shrink-0" />
                    {driver.workingHours || "8 Hours / Day"}
                  </span>
                  {driver.drivingLicenseNumber && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[11px] font-semibold text-[var(--text)]">
                        Lic: {driver.drivingLicenseNumber}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* QUICK HR ACTIONS (CALL & HIRE) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[var(--border-subtle)] lg:border-t-0 lg:pt-0">
              {/* PRIMARY PHONE CALL BUTTON */}
              <div className="relative inline-flex items-center">
                <a
                  href={`tel:${driver.phonenumber}`}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-success px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-success/90 active:scale-95"
                  title="Click to dial phone number immediately"
                >
                  <PhoneCall className="h-4 w-4 animate-pulse" />
                  <span>Call: {driver.phonenumber}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="ml-1.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                  title="Copy Phone Number"
                >
                  <Copy className="h-4 w-4" />
                </button>

                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-[var(--text)] px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
                    Copied!
                  </span>
                )}
              </div>

              {/* MESSAGE BUTTON */}
              <button
                type="button"
                onClick={() => setShowMessageModal(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-bold text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </button>

              {/* HIRE BUTTON */}
              <button
                type="button"
                onClick={() => setShowHireModal(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[var(--primary)] px-5 py-3 text-xs font-bold text-[var(--on-primary)] shadow-xs transition hover:bg-[var(--primary-hover)] active:scale-95"
              >
                <UserCheck className="h-4 w-4" />
                <span>Hire Driver</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- KEY STATS 4-COLUMN GRID --- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Target Salary */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Expected Salary
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Banknote className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black text-[var(--text)]">
              ৳{formattedSalary}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Per month target</p>
          </div>

          {/* Working Hours */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Shift / Hours
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black text-[var(--text)]">
              {driver.workingHours || "8 Hours"}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Daily schedule</p>
          </div>

          {/* License Verified */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Driving License
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 truncate font-mono text-sm font-bold text-[var(--text)]">
              {driver.drivingLicenseNumber || "Verified Commercial"}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3 w-3" />
              Active & Valid
            </p>
          </div>

          {/* National ID / NID */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Personal Identity
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 truncate font-mono text-xs font-bold text-[var(--text)]">
              {driver.personalIdentityNumber || "Verified NID"}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Identity check passed</p>
          </div>
        </div>

        {/* --- DETAILS & VERIFICATION SECTION --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT 2 COLUMNS: SKILLS & COMPLIANCE */}
          <div className="space-y-6 lg:col-span-2">
            {/* License Categories */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]">
              <h2 className="text-sm font-bold text-[var(--text)]">
                Authorized License Categories
              </h2>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                Vehicles this driver is legally certified and permitted to drive
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {driver.licenseCategories?.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-2 rounded-2xl border border-[var(--primary-200)] bg-[var(--primary-50)] px-4 py-2.5 text-xs font-bold text-[var(--primary)]"
                  >
                    <Briefcase className="h-4 w-4 shrink-0" />
                    <span>{category}</span>
                  </div>
                ))}
                {(!driver.licenseCategories || driver.licenseCategories.length === 0) && (
                  <p className="text-xs text-[var(--text-subtle)]">Commercial Grade Driver</p>
                )}
              </div>
            </div>

            {/* Operating Regions */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]">
              <h2 className="text-sm font-bold text-[var(--text)]">
                Operating Regions & Coverage
              </h2>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                Locations where driver is available for immediate routes
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {driver.regions?.map((region) => (
                  <div
                    key={region}
                    className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs font-bold text-[var(--text)]"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents & Certificates */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)]">
              <h2 className="text-sm font-bold text-[var(--text)]">
                Verified Documents & Compliance
              </h2>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                Official certificates uploaded and verified by admin
              </p>

              <div className="mt-4 space-y-3">
                {/* Driving License Document */}
                <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text)]">
                        Driving License ({driver.drivingLicenseNumber || "Active"})
                      </p>
                      <p className="text-[11px] text-[var(--text-subtle)]">
                        Identity & license authenticated
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-[10px] font-bold text-success border border-success/30">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Professional Certificate */}
                {driver.certificates && (
                  <div className="flex flex-col gap-3 rounded-2xl border border-[var(--primary-200)] bg-[var(--primary-50)]/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[var(--primary-200)] text-[var(--primary)]">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--text)]">
                          Professional Driving Certificate
                        </p>
                        <p className="text-[11px] text-[var(--text-subtle)]">
                          Commercial vehicle qualification
                        </p>
                      </div>
                    </div>

                    <a
                      href={driver.certificates}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-bold text-[var(--on-primary)] shadow-xs transition hover:bg-[var(--primary-hover)]"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT & CALL CARD */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xs)] space-y-5">
              <h2 className="text-sm font-bold text-[var(--text)]">
                Direct Contact Information
              </h2>

              <div className="space-y-3.5 text-xs">
                {/* Phone */}
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3">
                  <Phone className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                      Phone Number
                    </p>
                    <a
                      href={`tel:${driver.phonenumber}`}
                      className="cursor-pointer font-mono font-bold text-[var(--text)] transition hover:text-[var(--primary)]"
                    >
                      {driver.phonenumber}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${driver.email}`}
                      className="cursor-pointer truncate font-medium text-[var(--text)] transition hover:text-[var(--primary)]"
                    >
                      {driver.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Call and Email CTA */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <a
                  href={`tel:${driver.phonenumber}`}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-success py-3 text-xs font-bold text-white shadow-xs transition hover:bg-success/90 active:scale-95"
                >
                  <PhoneCall className="h-4 w-4 animate-pulse" />
                  <span>Call {driver.phonenumber}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowHireModal(true)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] py-3 text-xs font-bold text-[var(--on-primary)] shadow-xs transition hover:bg-[var(--primary-hover)] active:scale-95"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Send Hiring Offer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIRE DRIVER MODAL */}
      <AnimatePresence>
        {showHireModal && (
          <HireDriverModal
            driver={driver}
            onClose={() => setShowHireModal(false)}
          />
        )}
      </AnimatePresence>

      {/* MESSAGE DRIVER MODAL */}
      <AnimatePresence>
        {showMessageModal && (
          <MessageDriverModal
            driver={driver}
            onClose={() => setShowMessageModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
