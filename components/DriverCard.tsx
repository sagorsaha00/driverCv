"use client";

import {
  CheckCircle2,
  MapPin,
  Star,
  ArrowRight,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export interface Driver {
  id: number;
  name: string;
  initials: string;
  role: string;
  location: string;
  experience: string;
  rating: string;
  available: string;
  verified: boolean;
  rate?: string;
}

export default function DriverCard({
  driver,
  index = 0,
}: {
  driver: Driver;
  index?: number;
}) {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/driverProfile/${driver.id}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs transition-all duration-200 hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--shadow-xs)]"
    >
      <div>
        {/* Top Header: Avatar, Name, Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar with Status Pulse */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] font-display text-sm font-black text-[var(--on-primary)] shadow-xs transition-transform duration-200 group-hover:scale-105">
              {driver.initials}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-display text-xs font-bold text-[var(--text)] transition-colors group-hover:text-[var(--primary)] sm:text-sm">
                  {driver.name}
                </h3>
                {driver.verified && (
                  <span title="Transportstyrelsen Verified Driver">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                  </span>
                )}
              </div>

              <p className="mt-0.5 truncate text-[11px] font-medium text-[var(--text-muted)]">
                {driver.role}
              </p>
            </div>
          </div>

          {/* Rating Pill */}
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 shadow-2xs">
            <Star className="h-3 w-3 fill-[var(--primary)] text-[var(--primary)]" />
            <span className="text-[10px] font-bold text-[var(--text)]">
              {driver.rating}
            </span>
          </div>
        </div>

        {/* Info Strip */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" />
            <span className="truncate">{driver.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-[var(--text-subtle)]" />
            <span className="truncate">{driver.experience} experience</span>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text)]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Availability</span>
          </div>
          <span className="font-bold text-[var(--text)]">
            {driver.available}
          </span>
        </div>
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
