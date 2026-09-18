"use client";

import {
  CheckCircle2,
  MapPin,
  Star,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Driver {
  id: number;
  name: string;
  initials: string;
  role: string;
  location: string;
  experience: string;
  rating: string;
  available: string;
  verified: boolean;
}

export default function DriverCard({
  driver,
  index,
}: {
  driver: Driver;
  index: number;
}) {
  const router = useRouter();
  const handleViewProfile = () => {
    router.push(`/driverProfile/3434`)
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="
        group relative flex flex-col justify-between
        rounded-2xl border border-slate-200/80 bg-white p-4
        shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-200
        hover:border-slate-300 hover:shadow-[0_12px_25px_rgba(15,23,42,0.06)]
      "
    >
      <div>
        {/* Top Header: Profile Info & Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Pill */}
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-2xl bg-blue-50 text-xs font-extrabold text-[#1677E8]
                transition-transform duration-200 group-hover:scale-105
              "
            >
              {driver.initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="truncate text-xs font-bold text-slate-900 group-hover:text-[#1677E8] transition-colors">
                  {driver.name}
                </h3>

                {driver.verified && (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                )}
              </div>

              <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                {driver.role}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 border border-amber-200/60">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-extrabold text-amber-700">
              {driver.rating}
            </span>
          </div>
        </div>

        {/* Information Meta */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="h-3 w-3 shrink-0 text-[#1677E8]" />
            <span className="truncate">{driver.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <Briefcase className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="truncate">{driver.experience} exp</span>
          </div>
        </div>

        {/* Availability Badge */}
        <div
          className="
            mt-3 flex items-center justify-between rounded-xl bg-emerald-50/80 px-3 py-1.5
            text-[10px] font-semibold text-emerald-700 border border-emerald-100
          "
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Available</span>
          </div>
          <span className="font-bold">{driver.available}</span>
        </div>
      </div>

      {/* View Profile Action Button */}
      <button
        onClick={handleViewProfile}
        className="
          mt-4 flex w-full  cursor-pointer items-center justify-center gap-1.5
          rounded-xl border border-slate-200 bg-slate-50 py-2.5
          text-[11px] font-bold text-slate-700  
          group-hover:border-[#7393B3] group-hover:bg-[#6082B6] group-hover:text-white
        "
      >
        <span>View Profile</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.article>
  );
}
