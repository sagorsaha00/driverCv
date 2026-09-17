"use client";

import { CheckCircle2, MapPin, Star, ArrowRight } from "lucide-react";

import { motion } from "framer-motion";

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
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -3,
      }}
      className="
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            bg-[#E8F0FF]
            text-[11px]
            font-black
            text-[#1677E8]
          "
          >
            {driver.initials}
          </div>

          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-[11px] font-bold text-slate-900">
                {driver.name}
              </h3>

              {driver.verified && (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              )}
            </div>

            <p className="mt-1 text-[9px] text-slate-400">{driver.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-[#F5B93D] text-[#F5B93D]" />

          <span className="text-[9px] font-bold text-slate-700">
            {driver.rating}
          </span>
        </div>
      </div>

      {/* Details */}

      <div className="mt-5 space-y-2 text-[9px] text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-[#1677E8]" />

          {driver.location}
        </div>

        <div>{driver.experience} experience</div>
      </div>

      {/* Availability */}

      <div
        className="
        mt-5
        bg-[#EAF8F1]
        px-3
        py-2.5
        text-[9px]
        font-semibold
        text-emerald-700
      "
      >
        Available · {driver.available}
      </div>

      {/* Button */}

      <button
        className="
        mt-3
        flex
        w-full
        items-center
        justify-center
        gap-2
        border
        border-slate-200
        py-2.5
        text-[9px]
        font-bold
        text-slate-700
        transition-colors
        hover:border-slate-400
      "
      >
        View profile
        <ArrowRight className="h-3 w-3" />
      </button>
    </motion.article>
  );
}
