"use client";

import { useDriverJob } from "@/lib/api/apiCall";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  Car,
  Clock,
  MapPin,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { EmployerContactCard } from "./EmployerContactCard";

interface Props {
  jobId: number;
}

export default function JobDetails({ jobId }: Props) {
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useDriverJob(jobId);

  // LOADING
  if (isLoading) {
    return (
      <main
        className="
          min-h-screen
          bg-[var(--background,_#f8fafc)]
          px-4
          py-8
        "
      >
        <div
          className="
            mx-auto
            max-w-6xl
            animate-pulse
          "
        >
          <div className="h-5 w-32 rounded bg-slate-200" />

          <div
            className="
              mt-6
              grid
              gap-5
              lg:grid-cols-[1fr_330px]
            "
          >
            <div className="h-[500px] rounded-2xl bg-slate-200" />

            <div className="h-[420px] rounded-2xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  // ERROR
  if (isError || !data?.job) {
    return (
      <main
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <Briefcase
            className="
              mx-auto
              h-10
              w-10
              text-slate-400
            "
          />

          <h2
            className="
              mt-3
              text-lg
              font-black
            "
          >
            Job not found
          </h2>

          <button
            type="button"
            onClick={() => refetch()}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--primary,_#2563eb)]
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
      </main>
    );
  }

  const job = data.job;

  return (
    <main
      className="
        min-h-screen
        bg-[var(--background,_#f8fafc)]
        px-4
        py-8

        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
        "
      >
        {/* BACK */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            mb-5
            inline-flex
            cursor-pointer
            items-center
            gap-2
            text-xs
            font-bold
            text-[var(--muted-foreground,_#64748b)]
            transition

            hover:text-[var(--foreground,_#0f172a)]
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </button>

        <div
          className="
            grid
            items-start
            gap-5

            lg:grid-cols-[minmax(0,1fr)_330px]
          "
        >
          {/* ================================================
              JOB
          ================================================ */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-white
              shadow-sm
            "
          >
            {/* HERO */}

            <div
              className="
                border-b
                border-[var(--border,_#e2e8f0)]
                p-5

                sm:p-7
              "
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-lg
                    bg-[var(--primary,_#2563eb)]/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-[var(--primary,_#2563eb)]
                  "
                >
                  <Car className="h-3 w-3" />

                  {job.vehicleRequired}
                </span>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-lg
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-emerald-700
                  "
                >
                  <ShieldCheck className="h-3 w-3" />
                  Verified Employer
                </span>
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
                {job.jobTitle}
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  font-bold
                  text-[var(--muted-foreground,_#64748b)]
                "
              >
                {job.companyName}
              </p>

              {/* META */}

              <div
                className="
                  mt-5
                  grid
                  gap-3

                  sm:grid-cols-2
                "
              >
                <InfoItem icon={MapPin} label="Location" value={job.location} />

                <InfoItem
                  icon={Briefcase}
                  label="Employment"
                  value={job.employmentType}
                />

                <InfoItem
                  icon={Clock}
                  label="Working Hours"
                  value={job.workingHours}
                />

                <InfoItem
                  icon={Banknote}
                  label="Salary"
                  value={`${job.salaryAmount} SEK`}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Start Date"
                  value={
                    job.startDate
                      ? new Date(job.startDate).toLocaleDateString("en-SE")
                      : "Not specified"
                  }
                />

                <InfoItem
                  icon={Car}
                  label="Vehicle / License"
                  value={job.vehicleRequired}
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <section
              className="
                border-b
                border-[var(--border,_#e2e8f0)]
                p-5

                sm:p-7
              "
            >
              <h2
                className="
                  text-sm
                  font-black
                  text-[var(--foreground,_#0f172a)]
                "
              >
                Job Description
              </h2>

              <p
                className="
                  mt-3
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-[var(--muted-foreground,_#64748b)]
                "
              >
                {job.jobDescription}
              </p>
            </section>

            {/* REQUIREMENTS */}

            <section
              className="
                p-5

                sm:p-7
              "
            >
              <h2
                className="
                  text-sm
                  font-black
                  text-[var(--foreground,_#0f172a)]
                "
              >
                Requirements
              </h2>

              {job.requirements ? (
                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {job.requirements.split(",").map((requirement) => (
                    <span
                      key={requirement}
                      className="
                            rounded-lg
                            bg-[var(--muted,_#f1f5f9)]
                            px-3
                            py-2
                            text-[11px]
                            font-bold
                            text-[var(--foreground,_#0f172a)]
                          "
                    >
                      {requirement.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p
                  className="
                    mt-2
                    text-xs
                    text-[var(--muted-foreground,_#64748b)]
                  "
                >
                  No additional requirements specified.
                </p>
              )}

              {job.requiresTKT && (
                <div
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-amber-200
                    bg-amber-50
                    p-3
                    text-xs
                    font-bold
                    text-amber-800
                  "
                >
                  TKT certification is required for this position.
                </div>
              )}
            </section>
          </div>

          {/* ================================================
              EMPLOYER CONTACT
          ================================================ */}

          <div
            className="
              lg:sticky
              lg:top-24
            "
          >
            <EmployerContactCard employer={job.hr} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// INFO ITEM
// ============================================================

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        bg-[var(--muted,_#f8fafc)]
        p-3
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white
          text-[var(--primary,_#2563eb)]
          shadow-sm
        "
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-[var(--muted-foreground,_#94a3b8)]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-xs
            font-bold
            text-[var(--foreground,_#0f172a)]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}
