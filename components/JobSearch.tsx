"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock3,
  ArrowRight,
  X,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { driverJobs } from "@/data/dummyData";

export default function JobSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Jobs based on input
  const filteredJobs = driverJobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = selectedLocation
      ? job.location.toLowerCase() === selectedLocation.toLowerCase()
      : true;

    return matchesQuery && matchesLocation;
  });

  return (
    <>
      {/* ================= BACKDROP BLUR OVERLAY ================= */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-md transition-all duration-300"
          />
        )}
      </AnimatePresence>

      {/* ================= SEARCH CONTAINER ================= */}
      <section className="relative z-50 ml-26 -mt-30 px-4 sm:mr-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[960px]" ref={searchRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-2xl bg-white p-2 border transition-all duration-300 ${
              isFocused
                ? "border-[#1677E8] shadow-[0_20px_60px_rgba(22,119,232,0.25)] ring-4 ring-[#1677E8]/10"
                : "border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:border-slate-300"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_0.8fr_auto]">
              {/* Query Field */}
              <SearchFieldInput
                icon={<Search className="h-4 w-4" />}
                label="Job Title or Category"
                placeholder="Truck, delivery, bus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onClear={() => setSearchQuery("")}
              />

              {/* Location Select */}
              <LocationSelectField
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />

              {/* Time Posted Select */}
              <TimeSelectField
                icon={<Clock3 className="h-4 w-4" />}
                label="Posted"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFocused(true)}
                className="flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-[#1677E8] px-7 text-[13px] font-bold text-white shadow-lg shadow-[#1677E8]/25 transition-colors hover:bg-[#0967D6]"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>

            {/* ================= LIVE SEARCH RESULTS DROPDOWN ================= */}
            <AnimatePresence>
              {isFocused && (
                <SearchResultsDropdown
                  jobs={filteredJobs}
                  onClose={() => setIsFocused(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   DESTRUCTURED INPUT FIELD
============================================================ */

interface SearchFieldInputProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClear: () => void;
}

function SearchFieldInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onClear,
}: SearchFieldInputProps) {
  return (
    <div className="flex min-h-[58px] items-center gap-3 border-b border-slate-100 px-4 md:border-b-0 md:border-r">
      <div className="text-[#1677E8]">{icon}</div>
      <div className="flex-1">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            className="w-full border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          {value && (
            <button
              onClick={onClear}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DESTRUCTURED LOCATION SELECT FIELD
============================================================ */

interface LocationSelectProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus: () => void;
}

function LocationSelectField({
  icon,
  label,
  value,
  onChange,
  onFocus,
}: LocationSelectProps) {
  return (
    <div className="flex min-h-[58px] items-center gap-3 border-b border-slate-100 px-4 md:border-b-0 md:border-r">
      <div className="text-[#1677E8]">{icon}</div>
      <div className="flex-1">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 focus:outline-none focus:ring-0"
        >
          <option value="">All Sweden</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Gothenburg">Gothenburg</option>
          <option value="Malmö">Malmö</option>
          <option value="Uppsala">Uppsala</option>
          <option value="Lund">Lund</option>
        </select>
      </div>
    </div>
  );
}

/* ============================================================
   DESTRUCTURED TIME SELECT FIELD
============================================================ */

function TimeSelectField({
  icon,
  label,
  value,
  onChange,
  onFocus,
}: LocationSelectProps) {
  return (
    <div className="flex min-h-[58px] items-center gap-3 border-b border-slate-100 px-4 md:border-b-0 md:border-r">
      <div className="text-[#1677E8]">{icon}</div>
      <div className="flex-1">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 focus:outline-none focus:ring-0"
        >
          <option value="">Any time</option>
          <option value="24h">Past 24 hours</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
        </select>
      </div>
    </div>
  );
}

/* ============================================================
   DESTRUCTURED DROPDOWN SEARCH RESULTS
============================================================ */

interface SearchResultsDropdownProps {
  jobs: typeof driverJobs;
  onClose: () => void;
}

function SearchResultsDropdown({ jobs, onClose }: SearchResultsDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between px-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Matching Driver Jobs ({jobs.length})
        </span>
        <button
          onClick={onClose}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600"
        >
          Esc to close
        </button>
      </div>

      <div className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:border-[#1677E8]/30 hover:bg-[#1677E8]/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#1677E8]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1677E8]">
                      {job.title}
                    </h4>
                    {job.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 border border-emerald-100">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {job.company} • {job.location}, Sweden
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[12px] font-bold text-slate-900">
                  {job.salary}
                </span>
                <span className="text-[10px] text-slate-400">{job.type}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-slate-400">
            <p className="text-xs font-semibold">
              No driver jobs found in Sweden for this search.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
