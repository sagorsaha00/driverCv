"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import DriverCard from "./DriverCard";

const initialDrivers = [
  {
    id: 1,
    name: "Arman Hassan",
    initials: "AH",
    role: "Taxi & Rideshare Driver",
    location: "Stockholm",
    experience: "5 yrs",
    rating: "4.9",
    available: "Available Now",
    verified: true,
  },
  {
    id: 2,
    name: "Emma Lindqvist",
    initials: "EL",
    role: "Heavy Truck Driver (CE)",
    location: "Gothenburg",
    experience: "8 yrs",
    rating: "5.0",
    available: "Available in 2 days",
    verified: true,
  },
  {
    id: 3,
    name: "Johan Berg",
    initials: "JB",
    role: "Coach & Bus Driver (D)",
    location: "Malmö",
    experience: "10 yrs",
    rating: "4.8",
    available: "Weekends & Shift",
    verified: true,
  },
  {
    id: 4,
    name: "Sofia Karlsson",
    initials: "SK",
    role: "Delivery Van Driver (B)",
    location: "Uppsala",
    experience: "4 yrs",
    rating: "4.9",
    available: "Available Now",
    verified: true,
  },
  {
    id: 5,
    name: "Mikael Lind",
    initials: "ML",
    role: "Long-Haul Freight (CE)",
    location: "Jönköping",
    experience: "12 yrs",
    rating: "4.9",
    available: "Full-time Only",
    verified: true,
  },
  {
    id: 6,
    name: "Elin Andersson",
    initials: "EA",
    role: "Executive Chauffeur",
    location: "Stockholm",
    experience: "6 yrs",
    rating: "5.0",
    available: "Flexible Hours",
    verified: true,
  },
];

export default function DriverGridSection() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Heavy Truck (CE)",
    "Delivery Van (B)",
    "Bus (D)",
    "Taxi",
  ];

  const filteredDrivers = initialDrivers.filter((driver) => {
    if (filter === "All") return true;
    if (filter.includes("Heavy") && driver.role.includes("CE")) return true;
    if (filter.includes("Delivery") && driver.role.includes("Delivery"))
      return true;
    if (filter.includes("Bus") && driver.role.includes("Bus")) return true;
    if (
      filter.includes("Taxi") &&
      (driver.role.includes("Taxi") || driver.role.includes("Chauffeur"))
    )
      return true;
    return true;
  });

  return (
    <section className="bg-zinc-50/70 py-16 sm:py-20 border-b border-zinc-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900">
              <ShieldCheck className="h-3.5 w-3.5 text-black" />
              <span>Verified Professionals</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-black sm:text-3xl">
              Featured Drivers Available Now
            </h2>
            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Pre-screened licenses, background checks, and clean driving
              records.
            </p>
          </div>

          <button
            onClick={() => router.push("/ExploreDrivers")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <span>Browse All 4,500+ Drivers</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Drivers 3-column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDrivers.map((driver, index) => (
            <DriverCard key={driver.id} driver={driver} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
