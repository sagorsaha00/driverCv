"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  FileCheck,
  MapPin,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Driver } from "@/type/driver";

type Props = {
  driver: Driver;
  index: number;
  layoutMode?: "grid" | "list";
  onMessage: () => void;
  onHire: () => void;
};

export default function DriverCard({
  driver,
  index,
  layoutMode = "grid",
  onMessage,
  onHire,
}: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (driver.phonenumber) {
      navigator.clipboard.writeText(driver.phonenumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewProfile = () => {
    router.push(`/driverProfile/${driver.id}`);
  };

  const formattedSalary = Number(driver.targetMonthlySalary || 0).toLocaleString();

  // LIST VIEW LAYOUT
  if (layoutMode === "list") {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
        className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all hover:border-primary-300 hover:shadow-md md:flex-row md:items-center"
      >
        <div className="flex min-w-0 items-start gap-4">
          {/* Driver Avatar */}
          <div
            onClick={handleViewProfile}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 cursor-pointer"
          >
            {driver.ProfileImage ? (
              <img
                src={driver.ProfileImage}
                alt={driver.fullname}
                className="h-full w-full object-cover transition group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-bold text-primary-700">
                {getInitials(driver.fullname)}
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-white"
              title="Verified License"
            >
              <CheckCircle2 className="h-3 w-3" />
            </span>
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                onClick={handleViewProfile}
                className="truncate text-base font-bold text-text transition group-hover:text-primary-700 cursor-pointer"
              >
                {driver.fullname}
              </h3>
              {driver.drivingLicenseNumber && (
                <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[10px] font-semibold text-text-muted">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  {driver.drivingLicenseNumber}
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1 text-text">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {driver.regions?.join(", ") || "Available Nationally"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-text-subtle" />
                {driver.workingHours || "Full-time"}
              </span>
              <span>•</span>
              <span className="font-semibold text-primary">
                ৳{formattedSalary}/mo
              </span>
            </div>

            {/* License categories tags */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {driver.licenseCategories?.map((category) => (
                <span
                  key={category}
                  className="rounded-lg border border-primary-100 bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-800"
                >
                  {category}
                </span>
              ))}
              {driver.certificates && (
                <a
                  href={driver.certificates}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold text-text-muted transition hover:border-primary hover:text-primary"
                >
                  <FileCheck className="h-3 w-3 text-primary" />
                  Certificate
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* HR Call & Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border-subtle pt-3 md:border-t-0 md:pt-0">
          {/* PHONE DIAL CALL BUTTON */}
          <div className="relative inline-flex items-center">
            <a
              href={`tel:${driver.phonenumber}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-success px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-success/90 active:scale-95"
              title="Click to dial driver"
            >
              <PhoneCall className="h-4 w-4 animate-pulse" />
              <span>{driver.phonenumber}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition hover:bg-surface-muted hover:text-text"
              title="Copy phone number"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-text px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md">
                Copied!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleViewProfile}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text transition hover:border-primary hover:bg-primary-50 hover:text-primary"
            title="View full driver info"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Info</span>
          </button>

          <button
            type="button"
            onClick={onMessage}
            className="flex cursor-pointer items-center justify-center rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-text-muted transition hover:border-primary hover:bg-primary-50 hover:text-primary"
            title="Send Message"
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onHire}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-95"
          >
            <UserCheck className="h-4 w-4" />
            Hire Driver
          </button>
        </div>
      </motion.article>
    );
  }

  // GRID VIEW LAYOUT (DEFAULT)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.35) }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className="p-5">
        {/* DRIVER IDENTITY HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              onClick={handleViewProfile}
              className="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 cursor-pointer"
            >
              {driver.ProfileImage ? (
                <img
                  src={driver.ProfileImage}
                  alt={driver.fullname}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary-700">
                  {getInitials(driver.fullname)}
                </div>
              )}
              <span
                className="absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-white bg-primary text-white"
                title="Verified Commercial Driver"
              >
                <CheckCircle2 className="h-3 w-3" />
              </span>
            </div>

            <div className="min-w-0">
              <h3
                onClick={handleViewProfile}
                className="truncate text-sm font-bold text-text transition group-hover:text-primary-700 cursor-pointer"
              >
                {driver.fullname}
              </h3>
              <p className="mt-0.5 truncate text-[11px] font-medium capitalize text-text-subtle">
                {driver.role || "Professional Driver"}
              </p>
            </div>
          </div>

          {/* VERIFIED BADGE */}
          <div className="flex shrink-0 items-center gap-1 rounded-md border border-primary-100 bg-primary-50 px-2 py-1 text-[10px] font-bold text-primary-800">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Verified</span>
          </div>
        </div>

        {/* HR PHONE DIAL BUTTON - PRIMARY FOCUS */}
        <div className="relative mt-4">
          <div className="flex items-center gap-1.5 rounded-xl border border-success/30 bg-success-bg p-2 text-success transition hover:border-success">
            <a
              href={`tel:${driver.phonenumber}`}
              className="flex flex-1 cursor-pointer items-center gap-2 text-xs font-bold text-success transition hover:text-success/80"
              title="Click to dial driver"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success text-white">
                <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[9px] font-bold uppercase tracking-wider text-success/80">
                  Click to Call
                </p>
                <p className="font-mono text-xs font-bold text-success">
                  {driver.phonenumber}
                </p>
              </div>
            </a>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="rounded-lg p-1.5 text-success/70 transition hover:bg-success/10 hover:text-success cursor-pointer"
              title="Copy phone number"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          {copied && (
            <span className="absolute -top-7 right-4 rounded bg-text px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
              Copied!
            </span>
          )}
        </div>

        {/* REGION & WORKING HOURS GRID */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-border-subtle pt-3">
          <div className="rounded-xl bg-surface-muted p-2.5">
            <div className="flex items-center gap-1 text-text-subtle">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-wide">
                Regions
              </span>
            </div>
            <p className="mt-1 truncate text-xs font-bold text-text">
              {driver.regions?.join(", ") || "Nationwide"}
            </p>
          </div>

          <div className="rounded-xl bg-surface-muted p-2.5">
            <div className="flex items-center gap-1 text-text-subtle">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-wide">
                Hours
              </span>
            </div>
            <p className="mt-1 truncate text-xs font-bold text-text">
              {driver.workingHours || "8 Hours / Day"}
            </p>
          </div>
        </div>

        {/* LICENSE CATEGORIES */}
        <div className="mt-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-text-subtle">
            License Categories
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {driver.licenseCategories?.map((cat) => (
              <span
                key={cat}
                className="rounded-md border border-primary-100 bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-800"
              >
                {cat}
              </span>
            ))}
            {(!driver.licenseCategories || driver.licenseCategories.length === 0) && (
              <span className="text-[10px] text-text-subtle">Commercial Grade</span>
            )}
          </div>
        </div>

        {/* TARGET SALARY */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-border bg-surface-subtle px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <Banknote className="h-4 w-4 text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-text-subtle">
              Target Salary
            </span>
          </div>
          <span className="text-xs font-bold text-text">
            ৳{formattedSalary}{" "}
            <span className="text-[10px] font-normal text-text-subtle">/ mo</span>
          </span>
        </div>

        {/* LICENSE & CERTIFICATE INFO */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-text-subtle">
          {driver.drivingLicenseNumber ? (
            <span className="font-mono font-medium">
              Lic: {driver.drivingLicenseNumber}
            </span>
          ) : (
            <span className="font-medium">Active Commercial</span>
          )}

          {driver.certificates && (
            <a
              href={driver.certificates}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 font-semibold text-primary transition hover:underline"
            >
              <FileCheck className="h-3 w-3" />
              Certificate
            </a>
          )}
        </div>
      </div>

      {/* ACTIONS FOOTER: VIEW INFO, MESSAGE, HIRE */}
      <div className="grid grid-cols-3 gap-1.5 border-t border-border-subtle bg-surface-subtle p-3">
        <button
          type="button"
          onClick={handleViewProfile}
          className="flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-border bg-surface py-2.5 text-[11px] font-semibold text-text transition hover:border-primary hover:bg-primary-50 hover:text-primary"
          title="View full driver profile"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Info</span>
        </button>

        <button
          type="button"
          onClick={onMessage}
          className="flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-border bg-surface py-2.5 text-[11px] font-semibold text-text-muted transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Message</span>
        </button>

        <button
          type="button"
          onClick={onHire}
          className="flex cursor-pointer items-center justify-center gap-1 rounded-xl bg-primary py-2.5 text-[11px] font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-[0.98]"
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>Hire</span>
        </button>
      </div>
    </motion.article>
  );
}
