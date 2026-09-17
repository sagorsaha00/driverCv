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
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto focus input when modal expands
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isFocused]);

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
            onClick={() => setIsFocused(false)}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md transition-all"
          />
        )}
      </AnimatePresence>

      {/* ================= MAIN SEARCH CONTAINER ================= */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        {/* NORMAL INLINE SEARCH BAR (Default State) */}
        {!isFocused && (
          <div
            onClick={() => setIsFocused(true)}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all hover:border-slate-300"
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.3fr_1fr_0.8fr_auto] md:gap-0">
              <SearchFieldInput
                icon={<Search className="h-4 w-4" />}
                label="Job Title or Category"
                placeholder="Truck, delivery, bus..."
                value={searchQuery}
                readOnly
              />
              <LocationSelectField
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={selectedLocation}
                readOnly
              />
              <TimeSelectField
                icon={<Clock3 className="h-4 w-4" />}
                label="Posted"
                value={selectedTime}
                readOnly
              />
              <div className="flex min-h-[52px] md:min-h-[58px] items-center justify-center gap-2 rounded-xl bg-[#1677E8] px-7 text-[13px] font-bold text-white shadow-lg shadow-[#1677E8]/25">
                Search
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}

        {/* CENTERED POPUP MODAL (Active Clicked State) */}
        <AnimatePresence>
          {isFocused && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#1677E8]/30 bg-white p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.3)] ring-4 ring-[#1677E8]/10"
              >
                {/* Modal Header / Close */}
                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Search Drivers & Jobs
                  </span>
                  <button
                    onClick={() => setIsFocused(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Search Input Fields Container */}
                <div className="flex flex-col gap-2 rounded-2xl bg-slate-50/80 p-2 border border-slate-100">
                  <SearchFieldInput
                    icon={<Search className="h-4 w-4" />}
                    label="Job Title or Category"
                    placeholder="Truck, delivery, bus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    inputRef={inputRef}
                    onClear={() => setSearchQuery("")}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <LocationSelectField
                      icon={<MapPin className="h-4 w-4" />}
                      label="Location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    />

                    <TimeSelectField
                      icon={<Clock3 className="h-4 w-4" />}
                      label="Posted"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="mt-3 flex w-full min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#1677E8] px-7 text-[14px] font-bold text-white shadow-lg shadow-[#1677E8]/25 transition-colors hover:bg-[#0967D6]"
                >
                  Search Jobs
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                {/* Live Search Results */}
                <SearchResultsDropdown jobs={filteredJobs} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ============================================================
   DESTRUCTURED INPUT FIELD
============================================================ */

interface SearchFieldInputProps {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  readOnly?: boolean;
}

function SearchFieldInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
  onClear,
  inputRef,
  readOnly = false,
}: SearchFieldInputProps) {
  return (
    <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-white px-3 border border-slate-100 md:border-none">
      <div className="text-[#1677E8] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            readOnly={readOnly}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          {value && !readOnly && onClear && (
            <button
              onClick={onClear}
              className="text-slate-400 hover:text-slate-600 shrink-0 ml-1"
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

interface SelectProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
}

function LocationSelectField({
  icon,
  label,
  value,
  onChange,
  readOnly = false,
}: SelectProps) {
  return (
    <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-white px-3 border border-slate-100 md:border-none">
      <div className="text-[#1677E8] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <select
          disabled={readOnly}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 focus:outline-none focus:ring-0 disabled:opacity-100"
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

function TimeSelectField({
  icon,
  label,
  value,
  onChange,
  readOnly = false,
}: SelectProps) {
  return (
    <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-white px-3 border border-slate-100 md:border-none">
      <div className="text-[#1677E8] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <select
          disabled={readOnly}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-slate-900 focus:outline-none focus:ring-0 disabled:opacity-100"
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

interface SearchResultsDropdownProps {
  jobs: typeof driverJobs;
}

function SearchResultsDropdown({ jobs }: SearchResultsDropdownProps) {
  return (
    <div className="mt-3">
      <p className="text-xs text-slate-400 px-1 mb-2 font-medium">
        Matching Results: {jobs.length}
      </p>
    </div>
  );
}
