"use client";

import { Briefcase, Car, SearchX, ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

import DriverSearchCard from "./DriverSearchCard";
import JobSearchCard from "./JobSearchCard";

import {
  DriverSearchResult,
  JobSearchResult,
  SearchCounts,
} from "@/type/search";

interface Props {
  drivers: DriverSearchResult[];
  jobs: JobSearchResult[];
  counts: SearchCounts;
  loading: boolean;
}

const MAX_PREVIEW_RESULTS = 3;

export default function SearchResults({
  drivers,
  jobs,
  counts,
  loading,
}: Props) {
  const router = useRouter();

  // Only show maximum 3 in Hero search preview
  const previewDrivers = drivers.slice(0, MAX_PREVIEW_RESULTS);

  const previewJobs = jobs.slice(0, MAX_PREVIEW_RESULTS);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="mt-4 space-y-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              h-[75px]
              animate-pulse
              rounded-xl
              bg-[var(--surface-muted)]
            "
          />
        ))}
      </div>
    );
  }

  // ============================================================
  // EMPTY
  // ============================================================

  if (counts.total === 0) {
    return (
      <div
        className="
          mt-4
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border border-[var(--border)]
          py-8
          text-center
        "
      >
        <SearchX
          className="
            mb-2
            h-6 w-6
            text-[var(--text-muted)]
          "
        />

        <p
          className="
            text-sm
            font-bold
            text-[var(--text)]
          "
        >
          No results found
        </p>

        <p
          className="
            mt-1
            text-[11px]
            text-[var(--text-muted)]
          "
        >
          Try another keyword or location.
        </p>
      </div>
    );
  }

  // ============================================================
  // RESULTS
  // ============================================================

  return (
    <div className="mt-4">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-between
          px-1
        "
      >
        <p
          className="
            text-xs
            font-bold
            text-[var(--text)]
          "
        >
          Search Results
        </p>

        <span
          className="
            rounded-full
            bg-[var(--surface-muted)]
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-[var(--text-muted)]
          "
        >
          {counts.total} found
        </span>
      </div>

      <div className="space-y-5">
        {/* ======================================================
            DRIVERS
        ====================================================== */}

        {previewDrivers.length > 0 && (
          <div>
            {/* Driver Header */}

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                px-1
              "
            >
              <div className="flex items-center gap-2">
                <Car
                  className="
                    h-3.5 w-3.5
                    text-[var(--primary)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--text-muted)]
                  "
                >
                  Drivers
                </span>

                <span
                  className="
                    text-[10px]
                    text-[var(--text-subtle)]
                  "
                >
                  {counts.drivers}
                </span>
              </div>

              {/* Show only if more than 3 */}

              {counts.drivers > MAX_PREVIEW_RESULTS && (
                <button
                  type="button"
                  onClick={() => router.push("/ExploreDrivers")}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-1
                    text-[10px]
                    font-bold
                    text-[var(--primary)]
                    transition-opacity
                    hover:opacity-70
                  "
                >
                  View all
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Only 3 Driver Cards */}

            <div className="space-y-2">
              {previewDrivers.map((driver) => (
                <DriverSearchCard key={driver.id} driver={driver} />
              ))}
            </div>

            {/* More Result Information */}

            {counts.drivers > MAX_PREVIEW_RESULTS && (
              <p
                className="
                  mt-2
                  px-1
                  text-[9px]
                  text-[var(--text-muted)]
                "
              >
                Showing {previewDrivers.length} of {counts.drivers} drivers
              </p>
            )}
          </div>
        )}

        {/* ======================================================
            JOBS
        ====================================================== */}

        {previewJobs.length > 0 && (
          <div>
            {/* Job Header */}

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
                px-1
              "
            >
              <div className="flex items-center gap-2">
                <Briefcase
                  className="
                    h-3.5 w-3.5
                    text-[var(--primary)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--text-muted)]
                  "
                >
                  Driving Jobs
                </span>

                <span
                  className="
                    text-[10px]
                    text-[var(--text-subtle)]
                  "
                >
                  {counts.jobs}
                </span>
              </div>

              {/* Show only if more than 3 */}

              {counts.jobs > MAX_PREVIEW_RESULTS && (
                <button
                  type="button"
                  onClick={() => router.push("/EmployerJobFeed")}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-1
                    text-[10px]
                    font-bold
                    text-[var(--primary)]
                    transition-opacity
                    hover:opacity-70
                  "
                >
                  View all
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Only 3 Job Cards */}

            <div className="space-y-2">
              {previewJobs.map((job) => (
                <JobSearchCard key={job.id} job={job} />
              ))}
            </div>

            {/* More Result Information */}

            {counts.jobs > MAX_PREVIEW_RESULTS && (
              <p
                className="
                  mt-2
                  px-1
                  text-[9px]
                  text-[var(--text-muted)]
                "
              >
                Showing {previewJobs.length} of {counts.jobs} jobs
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
