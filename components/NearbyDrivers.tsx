"use client";

import { ArrowRight } from "lucide-react";
import DriverCard from "./DriverCard";
import { nearbyDrivers } from "@/data/dummyData";

export default function NearbyDrivers() {
  return (
    <section id="drivers" className="bg-white px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[900px]">
        {/* Header */}

        <div className="mb-7 flex items-end justify-between">
          <div>
            <p
              className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#1677E8]
            "
            >
              Ready to work
            </p>

            <h2
              className="
              mt-2
              text-[27px]
              font-black
              tracking-[-0.04em]
              text-[#101828]
            "
            >
              Drivers in your area
            </h2>

            <p className="mt-2 text-[11px] text-slate-400">
              Experienced drivers ready for new opportunities.
            </p>
          </div>

          <a
            href="#all-drivers"
            className="
              hidden
              items-center
              gap-2
              text-[10px]
              font-bold
              text-[#1677E8]
              sm:flex
            "
          >
            Explore drivers
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Cards */}

        <div className="grid gap-3 md:grid-cols-3">
          {nearbyDrivers.map((driver, index) => (
            <DriverCard key={driver.id} driver={driver} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
