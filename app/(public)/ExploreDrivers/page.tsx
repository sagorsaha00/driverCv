"use client";

import { useState } from "react";
import {
  RotateCcw,
  Search,
  Star,
  MapPin,
  Briefcase,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  Check,
  MessageSquare,
  UserCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const driverTypes = [
  "Personal Chauffeur",
  "Heavy Truck Driver",
  "Delivery & Van Driver",
  "Bus & Coaster Driver",
  "Ambulance Driver",
  "Private Car Driver",
];

const locations = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];
const experienceLevels = ["1-3 Years", "3-5 Years", "5-8 Years", "8+ Years"];

const driversData = [
  {
    id: 1,
    name: "Lars Lindqvist",
    role: "Heavy Truck Driver (CE)",
    location: "Stockholm",
    exp: "8 Yrs",
    rating: "4.9",
    salary: "38,000 SEK/mo",
    status: "Full-time",
    verified: true,
    initials: "LL",
  },
  {
    id: 2,
    name: "Elin Andersson",
    role: "Personal Chauffeur",
    location: "Gothenburg",
    exp: "5 Yrs",
    rating: "4.8",
    salary: "31,000 SEK/mo",
    status: "Part-time",
    verified: true,
    initials: "EA",
  },
  {
    id: 3,
    name: "Sven Nilsson",
    role: "Delivery & Van Driver",
    location: "Malmö",
    exp: "3 Yrs",
    rating: "4.7",
    salary: "27,500 SEK/mo",
    status: "Full-time",
    verified: false,
    initials: "SN",
  },
  {
    id: 4,
    name: "Astrid Berg",
    role: "Bus & Coach Driver (D)",
    location: "Uppsala",
    exp: "10 Yrs",
    rating: "5.0",
    salary: "34,000 SEK/mo",
    status: "Full-time",
    verified: true,
    initials: "AB",
  },
];

export default function DriverExplorer() {
  const [selectedRole, setSelectedRole] = useState("Personal Chauffeur");
  const [selectedLocation, setSelectedLocation] = useState("Dhaka");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile Toggle State

  const resetFilters = () => {
    setSelectedRole("");
    setSelectedLocation("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Header Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#36454F]">
              Find & Hire Drivers
            </h1>
            <p className="text-xs text-slate-500">
              Verified drivers ready for immediate hiring
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#36454F] shadow-sm hover:border-[#6082B6] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#6082B6]" />
              <span>Filters</span>
            </button>

            <span className="hidden text-xs font-semibold text-slate-500 sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-bold text-[#36454F] shadow-sm focus:border-[#6082B6] focus:outline-none">
                <option>Highest Rated</option>
                <option>Most Experienced</option>
                <option>Salary: Low to High</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <FilterContent
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                />

                {/* Sliding Modal Drawer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-sm font-extrabold text-[#36454F]">
                      Filter Drivers
                    </h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="rounded-full bg-slate-100 p-1 text-slate-500 hover:bg-slate-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <FilterContent
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    resetFilters={resetFilters}
                  />

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="mt-6 w-full rounded-xl bg-[#6082B6] py-3 text-xs font-bold text-white shadow-sm"
                  >
                    Apply Filters
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ================= DRIVER CARDS SECTION ================= */}
          <main className="lg:col-span-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {driversData.map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

{
  /* Reusable Filter Controls */
}
function FilterContent({
  selectedRole,
  setSelectedRole,
  selectedLocation,
  setSelectedLocation,
  resetFilters,
}: any) {
  return (
    <div>
      <div className="flex items-center justify-between pb-3.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#6082B6]" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#36454F]">
            Filters
          </h2>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-bold text-rose-500 hover:text-rose-600"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Driver Types */}
      <div className="mt-4">
        <h3 className="mb-2.5 text-xs font-bold text-[#36454F]">
          Vehicle & Driver Type
        </h3>
        <div className="space-y-1">
          {driverTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedRole(type)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                selectedRole === type
                  ? "bg-[#6082B6]/10 font-bold text-[#6082B6]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{type}</span>
              {selectedRole === type && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="mb-2.5 text-xs font-bold text-[#36454F]">Location</h3>
        <div className="space-y-2">
          {locations.map((loc) => (
            <label
              key={loc}
              className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-600 hover:text-[#36454F]"
            >
              <input
                type="checkbox"
                checked={selectedLocation === loc}
                onChange={() => setSelectedLocation(loc)}
                className="h-4 w-4 rounded border-slate-300 text-[#6082B6] focus:ring-[#6082B6]"
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* Driver Card */
}
function DriverCard({ driver }: { driver: any }) {
  return (
    <div
      className="
      group relative flex flex-col justify-between
      rounded-bl-2xl rounded-tr-3xl rounded-tl-xl rounded-br-xl
      border border-slate-200/80 bg-white p-4
      shadow-sm transition-all duration-200 hover:border-[#6082B6]/50 hover:shadow-md
    "
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#6082B6]/10 text-xs font-black text-[#6082B6]">
              {driver.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="truncate text-xs font-bold text-[#36454F] group-hover:text-[#6082B6]">
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
          <div className="flex items-center gap-1 rounded-full border border-amber-200/60 bg-amber-50 px-2 py-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-700">
              {driver.rating}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-[#6082B6]" />
            <span className="truncate">{driver.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{driver.exp} exp</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2 text-[10px] font-bold text-slate-700 hover:bg-slate-50">
          <MessageSquare className="h-3 w-3 text-slate-400" />
          <span>Message</span>
        </button>
        <button className="flex items-center justify-center gap-1 rounded-bl-xl rounded-tr-2xl rounded-tl-md rounded-br-md bg-[#6082B6] py-2 text-[10px] font-bold text-white shadow-sm hover:bg-[#4F71A5]">
          <UserCheck className="h-3 w-3" />
          <span>Hire Now</span>
        </button>
      </div>
    </div>
  );
}
