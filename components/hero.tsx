"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock3,
  ArrowRight,
  X,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { driverJobs } from "@/data/dummyData";

export default function HeroSection() {
  const router = useRouter();
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

  const handleCategoryClick = (cat: string) => {
    router.push(`/ExploreDrivers?role=${encodeURIComponent(cat)}`);
  };

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
            className="fixed inset-0 z-50 bg-[var(--text)]/30 backdrop-blur-md transition-all"
          />
        )}
      </AnimatePresence>

      <section className="relative overflow-hidden bg-[var(--bg)] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[var(--border)]">
        {/* Decorative Background Glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[380px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-[var(--primary-100)]/40 via-[var(--surface-muted)]/20 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Grid Layout: Left Content & Right Search Card */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-[var(--text)] shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>Over 4,500+ Verified Professional Drivers</span>
              </div>

              <h1 className="mt-5 font-sans text-4xl font-black tracking-tight text-[var(--text)] sm:text-5xl lg:text-5xl xl:text-6xl">
                Hire Trusted Drivers. <br />
                <span className="text-[var(--primary)]">Verified, Fast, Reliable.</span>
              </h1>

              <p className="mt-4 max-w-xl text-xs font-normal leading-relaxed text-[var(--text-muted)] sm:text-sm md:text-base mx-auto lg:mx-0">
                Whether you need a heavy freight operator (CE), delivery van driver,
                or executive chauffeur — connect directly with verified candidates
                across Sweden.
              </p>

              {/* Action CTAs */}
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/ExploreDrivers")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-xs font-bold text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/20 transition-all hover:bg-[var(--primary-hover)] cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Explore Verified Drivers</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/EmployerJobFeed")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 text-xs font-bold text-[var(--text)] shadow-xs transition-all hover:bg-[var(--surface-muted)] hover:border-[var(--primary)] cursor-pointer"
                >
                  <span>Find Driving Jobs</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Side: Floating Interactive Job Search Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto"
            >
              {!isFocused && (
                <div
                  onClick={() => setIsFocused(true)}
                  className="group cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 shadow-md transition-all hover:border-[var(--primary)] hover:shadow-lg"
                >
                  <div className="flex flex-col gap-2.5">
                    <SearchFieldInput
                      icon={<Search className="h-4 w-4" />}
                      label="Job Title or Category"
                      placeholder="Truck, delivery, bus..."
                      value={searchQuery}
                      readOnly
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    </div>
                    <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 text-xs font-bold text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/20 transition-all group-hover:bg-[var(--primary-hover)]">
                      <span>Search Marketplace</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Popular Categories Shortcut */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                    <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1">
                      Popular:
                    </span>
                    {[
                      "Heavy Truck (CE)",
                      "Delivery Van (B)",
                      "Bus (D)",
                      "Taxi (TKT)",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(cat);
                        }}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--surface-muted)] cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

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
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--primary)]/30 bg-[var(--surface)] p-4 sm:p-6 shadow-2xl ring-4 ring-[var(--focus-ring)]"
                >
                  {/* Modal Header */}
                  <div className="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 px-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Search Drivers & Jobs
                    </span>
                    <button
                      onClick={() => setIsFocused(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Search Input Fields Container */}
                  <div className="flex flex-col gap-2 rounded-2xl bg-[var(--surface-subtle)] p-2 border border-[var(--border)]">
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
                    onClick={() => {
                      setIsFocused(false);
                      const query = new URLSearchParams();
                      if (searchQuery) query.set("q", searchQuery);
                      if (selectedLocation) query.set("loc", selectedLocation);
                      router.push(`/ExploreDrivers?${query.toString()}`);
                    }}
                    className="mt-3 flex w-full min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 text-[14px] font-bold text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/20 transition-colors hover:bg-[var(--primary-hover)] cursor-pointer"
                  >
                    <span>Search Jobs & Drivers</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>

                  {/* Live Search Results */}
                  <SearchResultsDropdown jobs={filteredJobs} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Value Prop Proof Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text)]">100% Verified</p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Licenses & background check
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text)]">Immediate Match</p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Average hire in &lt; 24 hrs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Star className="h-5 w-5 fill-[var(--primary)] text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text)]">4.9/5 Rating</p>
                <p className="text-[10px] text-[var(--text-muted)]">From 1,200+ employers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text)]">Direct Contact</p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  Zero middleman friction
                </p>
              </div>
            </div>
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
    <div className="flex min-h-[50px] items-center gap-3 rounded-xl bg-[var(--surface)] px-3.5 border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
      <div className="text-[var(--primary)] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
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
            className="w-full border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-0"
          />
          {value && !readOnly && onClear && (
            <button
              onClick={onClear}
              className="text-[var(--text-subtle)] hover:text-[var(--text)] shrink-0 ml-1"
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
   DESTRUCTURED SELECT FIELDS
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
    <div className="flex min-h-[50px] items-center gap-3 rounded-xl bg-[var(--surface)] px-3.5 border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
      <div className="text-[var(--primary)] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </label>
        <select
          disabled={readOnly}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] focus:outline-none focus:ring-0 disabled:opacity-100"
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
    <div className="flex min-h-[50px] items-center gap-3 rounded-xl bg-[var(--surface)] px-3.5 border border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
      <div className="text-[var(--primary)] shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </label>
        <select
          disabled={readOnly}
          value={value}
          onChange={onChange}
          className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] focus:outline-none focus:ring-0 disabled:opacity-100"
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
      <p className="text-xs text-[var(--text-muted)] px-1 mb-2 font-medium">
        Matching Results: {jobs.length}
      </p>
    </div>
  );
}