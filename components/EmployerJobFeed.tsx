"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Banknote,
  Car,
  Building2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  licenseRequired: string;
  employmentType: string;
  salary: string;
  postedDate: string;
  description: string;
  tags: string[];
}

const mockJobs: JobPost[] = [
  {
    id: "1",
    title: "C-Driver for Regional Distribution",
    company: "Nordic Transport AB",
    location: "Stockholm",
    licenseRequired: "Heavy Truck (C)",
    employmentType: "Full-time (Heltid)",
    salary: "33,500 SEK / month",
    postedDate: "2 days ago",
    description:
      "Seeking an experienced distribution driver for fixed daytime delivery routes across greater Stockholm. Clean fleet, Scania & Volvo trucks provided.",
    tags: ["YKB Required", "Day Shift", "Digital Tacho", "Direct Employer"],
  },
  {
    id: "2",
    title: "Public Transit & Charter Bus Driver",
    company: "Sverige Buss & Travel",
    location: "Gothenburg",
    licenseRequired: "Bus (D)",
    employmentType: "Full-time / Shift",
    salary: "31,800 SEK / month",
    postedDate: "Today",
    description:
      "Looking for certified Class D bus drivers for scheduled urban and regional coach lines in Gothenburg. Collective agreement guaranteed.",
    tags: ["D License", "Kollektivavtal", "Shift Work", "Pension Scheme"],
  },
  {
    id: "3",
    title: "VIP Chauffeur / Executive Taxi",
    company: "City Cab Sweden",
    location: "Malmö",
    licenseRequired: "Taxi (TKT)",
    employmentType: "Part-time / Flexible",
    salary: "210 SEK / hour",
    postedDate: "3 days ago",
    description:
      "Seeking drivers with a valid Taxi Driver Badge (TKT) for executive transfers and weekend airport services between Malmö and Copenhagen.",
    tags: ["TKT Required", "Premium Sedan", "Flexible Hours", "Weekend Bonus"],
  },
  {
    id: "4",
    title: "CE-Driver Long-Haul Freight",
    company: "ScanLogistics AB",
    location: "Jönköping",
    licenseRequired: "Truck & Trailer (CE)",
    employmentType: "Full-time (Heltid)",
    salary: "37,500 SEK / month",
    postedDate: "1 week ago",
    description:
      "Long-distance freight transport with heavy truck and semi-trailer between Jönköping logistics hubs and northern Sweden.",
    tags: ["CE License", "YKB Required", "Night Allowance", "Modern Rig"],
  },
  {
    id: "5",
    title: "Delivery Van Courier",
    company: "FastCargo Nordic",
    location: "Stockholm",
    licenseRequired: "Car / Van (B)",
    employmentType: "Full-time (Heltid)",
    salary: "27,000 SEK / month",
    postedDate: "Yesterday",
    description:
      "Seeking energetic parcel delivery drivers for e-commerce routes in southern Stockholm. Mercedes Sprinter provided.",
    tags: ["Class B", "Vehicle Provided", "Smart Route App", "Team Bonus"],
  },
];

const locations = ["All", "Stockholm", "Gothenburg", "Malmö", "Jönköping"];

const licenseTypes = ["All", "B", "C", "CE", "D", "Taxi"];

export default function EmployerJobFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState("All");
  const [appliedJob, setAppliedJob] = useState<JobPost | null>(null);

  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return mockJobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search) ||
        job.licenseRequired.toLowerCase().includes(search) ||
        job.employmentType.toLowerCase().includes(search) ||
        job.tags.some((tag) => tag.toLowerCase().includes(search));

      const matchesLocation =
        selectedLocation === "All" || job.location === selectedLocation;

      const matchesLicense =
        selectedLicense === "All" ||
        job.licenseRequired
          .toLowerCase()
          .includes(selectedLicense.toLowerCase());

      return matchesSearch && matchesLocation && matchesLicense;
    });
  }, [searchTerm, selectedLocation, selectedLicense]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedLicense("All");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Direct Transport Fleets
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Available Driver Jobs in Sweden
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Explore open driving positions posted directly by verified
                transport companies across Sweden.
              </p>
            </div>

            <Link
              href="/PostDriverJob"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Briefcase className="h-4 w-4" />
              Post a Vacancy
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />

            <span className="text-xs font-black uppercase tracking-wide text-slate-700">
              Find your next driving job
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search role, company, location or keyword..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-4 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "All" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>

            {/* License */}
            <div className="relative">
              <Car className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-4 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              >
                {licenseTypes.map((license) => (
                  <option key={license} value={license}>
                    {license === "All"
                      ? "All License Types"
                      : license === "B"
                        ? "B - Van / Car"
                        : license === "C"
                          ? "C - Heavy Truck"
                          : license === "CE"
                            ? "CE - Truck & Trailer"
                            : license === "D"
                              ? "D - Bus"
                              : "Taxi (TKT)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters */}
          {(searchTerm ||
            selectedLocation !== "All" ||
            selectedLicense !== "All") && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <span className="text-[11px] font-semibold text-slate-400">
                Active filters:
              </span>

              {searchTerm && (
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                  Search: {searchTerm}
                </span>
              )}

              {selectedLocation !== "All" && (
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  {selectedLocation}
                </span>
              )}

              {selectedLicense !== "All" && (
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  License: {selectedLicense}
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-[11px] font-bold text-blue-600 transition hover:text-blue-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Result Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500">
            <span className="text-slate-900">{filteredJobs.length}</span>{" "}
            {filteredJobs.length === 1 ? "vacancy" : "vacancies"} available
          </p>

          <div className="hidden items-center gap-1.5 text-[10px] font-semibold text-slate-400 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified employers
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.article
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  whileHover={{ y: -2 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Main Info */}
                    <div className="min-w-0 flex-1">
                      {/* Top badges */}
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                          {job.licenseRequired}
                        </span>

                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {job.postedDate}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                          <ShieldCheck className="h-3 w-3" />
                          Verified Employer
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                        {job.title}
                      </h2>

                      {/* Meta */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          {job.company}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {job.employmentType}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-500">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Salary + Action */}
                    <div className="flex shrink-0 items-center justify-between gap-5 border-t border-slate-100 pt-4 lg:min-w-[190px] lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                      <div className="text-left lg:text-right">
                        <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:justify-end">
                          <Banknote className="h-3 w-3" />
                          Compensation
                        </span>

                        <p className="text-base font-black text-blue-600">
                          {job.salary}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAppliedJob(job)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/15 transition-all hover:bg-blue-700 hover:shadow-blue-600/25 active:scale-[0.97]"
                      >
                        Apply Now
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Briefcase className="h-7 w-7" />
                </div>

                <h3 className="mt-4 text-sm font-black text-slate-900">
                  No driving jobs found
                </h3>

                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
                  Try changing your search term or removing one of the filters
                  to discover more vacancies.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {appliedJob && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAppliedJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      Application Submitted
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Your driver profile has been shared.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAppliedJob(null)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Applied Position
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    {appliedJob.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
                    <span>{appliedJob.company}</span>
                    <span>•</span>
                    <span>{appliedJob.location}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Your profile and verified credentials have been transmitted
                  directly to{" "}
                  <strong className="text-slate-800">
                    {appliedJob.company}
                  </strong>
                  . Their recruitment or fleet team can contact you through the
                  platform.
                </p>

                <div className="mt-5 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                  <p className="text-[10px] leading-5 text-blue-700">
                    Keep your driver profile and license information updated to
                    improve your chances of being contacted by employers.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-100 bg-slate-50/70 p-5">
                <button
                  type="button"
                  onClick={() => setAppliedJob(null)}
                  className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
