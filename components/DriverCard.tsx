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
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-black hover:shadow-xl hover:shadow-black/5"
    >
      <div>
        {/* Top Header: Avatar, Name, Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar with Status Pulse */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black font-display text-sm font-black text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              {driver.initials}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-black" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-display text-xs font-bold text-zinc-950 transition-colors group-hover:text-black sm:text-sm">
                  {driver.name}
                </h3>
                {driver.verified && (
                  <span title="Transportstyrelsen Verified Driver">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-black" />
                  </span>
                )}
              </div>

              <p className="mt-0.5 truncate text-[11px] font-medium text-zinc-500">
                {driver.role}
              </p>
            </div>
          </div>

          {/* Rating Pill */}
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 shadow-2xs">
            <Star className="h-3 w-3 fill-black text-black" />
            <span className="text-[10px] font-bold text-zinc-900">
              {driver.rating}
            </span>
          </div>
        </div>

        {/* Info Strip */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-900" />
            <span className="truncate">{driver.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-600">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            <span className="truncate">{driver.experience} experience</span>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-semibold text-zinc-900">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-black" />
            <span>Availability</span>
          </div>
          <span className="font-bold">{driver.available}</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          onClick={handleViewProfile}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-bold text-zinc-900 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white group-hover:shadow-sm"
        >
          <span>View Verified Profile</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}
