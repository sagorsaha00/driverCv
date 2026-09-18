"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import DriverCard from "./DriverCard";
import { nearbyDrivers } from "@/data/dummyData";
import Link from "next/link";

export default function NearbyDrivers() {
  return (
    <section id="drivers" className="bg-[#F8FAFC] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#1677E8]">
              <Sparkles className="h-3 w-3" />
              <span>Ready To Work</span>
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#101828] sm:text-3xl">
              Drivers in your area
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Verified & experienced drivers ready for new opportunities.
            </p>
          </div>

          <Link
            href="/ExploreDrivers"
            className="group flex items-center gap-1.5 text-xs font-bold text-[#1677E8] transition-colors hover:text-blue-700"
          >
            Explore drivers
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Driver Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearbyDrivers.map((driver, index) => (
            <DriverCard key={driver.id} driver={driver} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
