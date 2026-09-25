"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  AlertCircle,
  Briefcase,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { DriverJob } from "@/type/driverJob";
import { useDriverJobs } from "@/lib/api/apiCall";
import JobFilters from "./job/JobFilters";
import JobCard from "./job/JobCard";
import JobApplicationModal from "./job/JobApplicationModal";
import JobCardSkeleton from "./job/JobCardSkeleton";
import JobEmptyState from "./job/JobEmptyState";

export default function EmployerJobFeed() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("All");

  const [selectedLicense, setSelectedLicense] = useState("All");

  const [appliedJob, setAppliedJob] = useState<DriverJob | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useDriverJobs();

  const jobs = data?.jobs ?? [];

  const locations = useMemo(() => {
    return Array.from(
      new Set(jobs.map((job) => job.location.trim()).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const licenseTypes = useMemo(() => {
    return Array.from(
      new Set(jobs.map((job) => job.vehicleRequired.trim()).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const requirements = job.requirements?.toLowerCase() ?? "";

      const matchesSearch =
        !search ||
        job.jobTitle.toLowerCase().includes(search) ||
        job.companyName.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search) ||
        job.vehicleRequired.toLowerCase().includes(search) ||
        job.employmentType.toLowerCase().includes(search) ||
        job.workingHours.toLowerCase().includes(search) ||
        job.jobDescription.toLowerCase().includes(search) ||
        requirements.includes(search) ||
        job.hr.name.toLowerCase().includes(search) ||
        job.hr.companyName.toLowerCase().includes(search);

      const matchesLocation =
        selectedLocation === "All" || job.location === selectedLocation;

      const matchesLicense =
        selectedLicense === "All" || job.vehicleRequired === selectedLicense;

      return matchesSearch && matchesLocation && matchesLicense;
    });
  }, [jobs, searchTerm, selectedLocation, selectedLicense]);

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedLicense("All");
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <main
      className="
        min-h-screen
        bg-[var(--background,_#f8fafc)]
        px-4
        py-8
        text-[var(--foreground,_#0f172a)]

        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-8"
        >
          <div
            className="
              flex
              flex-col
              justify-between
              gap-5

              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--primary,_#2563eb)]/20
                  bg-[var(--primary,_#2563eb)]/10
                  px-3
                  py-1.5
                  text-[11px]
                  font-bold
                  text-[var(--primary,_#2563eb)]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                Direct Transport Fleets
              </div>

              <h1
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-[var(--foreground,_#0f172a)]

                  sm:text-3xl
                "
              >
                Available Driver Jobs in Sweden
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[var(--muted-foreground,_#64748b)]
                "
              >
                Explore open driving positions posted directly by verified
                transport companies across Sweden.
              </p>
            </div>

            <Link
              href="/PostDriverJob"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                bg-[var(--primary,_#2563eb)]
                px-4
                py-2.5
                text-xs
                font-bold
                text-[var(--primary-foreground,_#ffffff)]
                shadow-lg
                shadow-[var(--primary,_#2563eb)]/20
                transition

                hover:opacity-90
                active:scale-[0.98]
              "
            >
              <Briefcase className="h-4 w-4" />
              Post a Vacancy
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {!isError && (
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.08,
            }}
          >
            {/* <JobFilters
              searchTerm={searchTerm}
              selectedLocation={selectedLocation}
              selectedLicense={selectedLicense}
              locations={locations}
              licenseTypes={licenseTypes}
              onSearchChange={setSearchTerm}
              onLocationChange={setSelectedLocation}
              onLicenseChange={setSelectedLicense}
              onReset={resetFilters}
            /> */}
          </motion.div>
        )}

        {isError && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-6
              py-12
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-100
                text-red-600
              "
            >
              <AlertCircle className="h-6 w-6" />
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-black
                text-red-900
              "
            >
              Unable to load jobs
            </h3>

            <p
              className="
                mx-auto
                mt-1
                max-w-md
                text-xs
                leading-5
                text-red-600
              "
            >
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading jobs."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="
                mt-5
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
              "
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>
          </div>
        )}

        {isLoading && (
          <>
            <div
              className="
                mb-4
                h-4
                w-32
                animate-pulse
                rounded
                bg-slate-200
              "
            />

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <JobCardSkeleton key={item} />
              ))}
            </div>
          </>
        )}

        {!isLoading && !isError && (
          <>
            {/* RESULT COUNT */}

            <div
              className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
            >
              <div>
                <p
                  className="
                      text-xs
                      font-bold
                      text-[var(--muted-foreground,_#64748b)]
                    "
                >
                  <span
                    className="
                        text-[var(--foreground,_#0f172a)]
                      "
                  >
                    {filteredJobs.length}
                  </span>{" "}
                  {filteredJobs.length === 1 ? "vacancy" : "vacancies"}{" "}
                  available
                </p>

                {filteredJobs.length !== jobs.length && (
                  <p
                    className="
                        mt-1
                        text-[10px]
                        text-[var(--muted-foreground,_#94a3b8)]
                      "
                  >
                    Filtered from {jobs.length} total jobs
                  </p>
                )}
              </div>

              <div
                className="
                    hidden
                    items-center
                    gap-3

                    sm:flex
                  "
              >
                {isFetching && (
                  <span
                    className="
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-semibold
                        text-[var(--muted-foreground,_#64748b)]
                      "
                  >
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    Updating
                  </span>
                )}

                <span
                  className="
                      flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-semibold
                      text-[var(--muted-foreground,_#64748b)]
                    "
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Verified employers
                </span>
              </div>
            </div>

            {/* JOB CARDS */}

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      index={index}
                      onApply={setAppliedJob}
                    />
                  ))
                ) : (
                  <JobEmptyState key="empty" onReset={resetFilters} />
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <JobApplicationModal
        job={appliedJob}
        onClose={() => setAppliedJob(null)}
      />
    </main>
  );
}
