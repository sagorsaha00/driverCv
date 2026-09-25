"use client";

import {
  CheckCircle2,
  MapPin,
  Star,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  PhoneCall,
  Clock,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Driver as RealDriver } from "@/type/driver";

export interface DriverCompat {
  id: number;
  fullname?: string;
  name?: string;
  initials?: string;
  role?: string;
  location?: string;
  regions?: string[];
  phonenumber?: string;
  phone?: string;
  ProfileImage?: string | null;
  experience?: string | number;
  rating?: string | number;
  available?: string;
  workingHours?: string;
  targetMonthlySalary?: number;
  licenseCategories?: string[];
  drivingLicenseNumber?: string;
  verified?: boolean;
}

export default function DriverCard({
  driver,
  index = 0,
}: {
  driver: RealDriver | DriverCompat;
  index?: number;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const displayName = driver.fullname || (driver as DriverCompat).name || "Verified Driver";
  const displayLocation =
    (driver.regions && driver.regions.length > 0 ? driver.regions.join(", ") : null) ||
    (driver as DriverCompat).location ||
    "Nationwide";
  const displayRole =
    driver.role ||
    (driver.licenseCategories && driver.licenseCategories.length > 0
      ? driver.licenseCategories.join(" & ")
      : "Commercial Driver");
  const displayPhone = driver.phonenumber || (driver as DriverCompat).phone || "";
  const displayHours = driver.workingHours || "8 Hours / Day";
  const displaySalary = driver.targetMonthlySalary
    ? `৳${Number(driver.targetMonthlySalary).toLocaleString()}/mo`
    : null;

  const initials =
    (driver as DriverCompat).initials ||
    displayName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (displayPhone) {
      navigator.clipboard.writeText(displayPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewProfile = () => {
    router.push(`/driverProfile/${driver.id}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs transition-all duration-200 hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--shadow-xs)]"
    >
      <div>
        {/* Top Header: Avatar, Name, Verified */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--primary-200)] bg-[var(--primary-50)] font-display text-sm font-black text-[var(--primary)] shadow-xs transition-transform duration-200 group-hover:scale-105">
              {driver.ProfileImage ? (
                <img
                  src={driver.ProfileImage}
                  alt={displayName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <span>{initials}</span>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-display text-xs font-bold text-[var(--text)] transition-colors group-hover:text-[var(--primary)] sm:text-sm">
                  {displayName}
                </h3>
                <span title="Verified Professional Driver">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                </span>
              </div>

              <p className="mt-0.5 truncate text-[11px] font-medium text-[var(--text-muted)]">
                {displayRole}
              </p>
            </div>
          </div>

          {/* Rating or Salary Pill */}
          {displaySalary ? (
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--primary-200)] bg-[var(--primary-50)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--primary)]">
              {displaySalary}
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 shadow-2xs">
              <Star className="h-3 w-3 fill-[var(--primary)] text-[var(--primary)]" />
              <span className="text-[10px] font-bold text-[var(--text)]">4.9</span>
            </div>
          )}
        </div>

        {/* HR CLICK TO CALL BUTTON */}
        {displayPhone && (
          <div className="relative mt-3.5">
            <div className="flex items-center justify-between gap-1.5 rounded-xl border border-success/30 bg-success-bg p-2 text-success transition hover:border-success">
              <a
                href={`tel:${displayPhone}`}
                className="flex items-center gap-2 text-xs font-bold text-success hover:text-success/80"
                title="Click to dial driver"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-success text-white">
                  <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-success/80">
                    Call Driver
                  </p>
                  <p className="font-mono text-xs font-bold text-success">{displayPhone}</p>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-lg p-1 text-success/70 hover:bg-success/10 hover:text-success cursor-pointer"
                title="Copy phone"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            {copied && (
              <span className="absolute -top-6 right-3 rounded bg-text px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md">
                Copied!
              </span>
            )}
          </div>
        )}

        {/* Info Strip */}
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" />
            <span className="truncate">{displayLocation}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" />
            <span className="truncate">{displayHours}</span>
          </div>
        </div>

        {/* License Categories badges */}
        {driver.licenseCategories && driver.licenseCategories.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {driver.licenseCategories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--text-muted)]"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          onClick={handleViewProfile}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] py-2.5 text-xs font-bold text-[var(--text)] transition-all group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--on-primary)] group-hover:shadow-sm"
        >
          <span>View Verified Profile</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}
