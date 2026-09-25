"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Banknote,
  Building2,
  Calendar,
  Car,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { DriverJob } from "@/type/driverJob";

interface Props {
  job: DriverJob;
  index: number;
  onApply?: (job: DriverJob) => void;
}

function formatPostedDate(date: string) {
  const created = new Date(date);
  const now = new Date();

  const difference = now.getTime() - created.getTime();

  const minutes = Math.floor(difference / 60000);

  const hours = Math.floor(difference / 3600000);

  const days = Math.floor(difference / 86400000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return created.toLocaleDateString("en-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getSalaryLabel(job: DriverJob) {
  const amount = job.salaryAmount;
  const type = job.salaryType.toLowerCase();

  if (type.includes("hour") || type.includes("timlön")) {
    return `${amount} SEK / hour`;
  }

  if (type.includes("month") || type.includes("månad")) {
    return `${amount} SEK / month`;
  }

  return `${amount} SEK`;
}

export default function JobCard({ job, index }: Props) {
  const router = useRouter();

  const tags = [
    job.vehicleRequired,
    job.workingHours,

    ...(job.requirements
      ? job.requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : []),

    ...(job.requiresTKT ? ["TKT Required"] : []),
  ];

  const openJobDetails = () => {
    router.push(`/EmployerJobFeed/${job.id}`);
  };

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.04, 0.2),
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        rounded-2xl
        border
        border-[var(--border,_#e2e8f0)]
        bg-[var(--card,_#ffffff)]
        p-5
        shadow-sm
        transition-all

        hover:border-[var(--primary,_#2563eb)]/40
        hover:shadow-xl

        sm:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="min-w-0 flex-1">
          {/* BADGES */}

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-[var(--primary,_#2563eb)]/20
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
                flex
                items-center
                gap-1
                text-[10px]
                font-semibold
                text-[var(--muted-foreground,_#94a3b8)]
              "
            >
              <Calendar className="h-3 w-3" />

              {formatPostedDate(job.createdAt)}
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
                px-2
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

          {/* TITLE */}

          <button
            type="button"
            onClick={openJobDetails}
            className="
              block
              cursor-pointer
              text-left
            "
          >
            <h2
              className="
                text-lg
                font-black
                tracking-tight
                text-[var(--card-foreground,_#0f172a)]
                transition-colors

                group-hover:text-[var(--primary,_#2563eb)]
              "
            >
              {job.jobTitle}
            </h2>
          </button>

          {/* META */}

          <div
            className="
              mt-2.5
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-xs
              font-semibold
              text-[var(--muted-foreground,_#64748b)]
            "
          >
            <span className="flex items-center gap-1.5">
              <Building2
                className="
                  h-3.5
                  w-3.5
                  text-[var(--muted-foreground,_#94a3b8)]
                "
              />

              {job.companyName}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin
                className="
                  h-3.5
                  w-3.5
                  text-[var(--muted-foreground,_#94a3b8)]
                "
              />

              {job.location}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock
                className="
                  h-3.5
                  w-3.5
                  text-[var(--muted-foreground,_#94a3b8)]
                "
              />

              {job.employmentType}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock
                className="
                  h-3.5
                  w-3.5
                  text-[var(--muted-foreground,_#94a3b8)]
                "
              />

              {job.workingHours}
            </span>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              max-w-3xl
              text-xs
              leading-6
              text-[var(--muted-foreground,_#64748b)]
            "
          >
            {job.jobDescription}
          </p>

          {/* TAGS */}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag, tagIndex) => (
              <span
                key={`${tag}-${tagIndex}`}
                className="
                  rounded-md
                  bg-[var(--muted,_#f1f5f9)]
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-[var(--foreground,_#0f172a)]
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* =====================================================
            SALARY + ACTION
        ===================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-5
            border-t
            border-[var(--border,_#e2e8f0)]
            pt-4

            lg:min-w-[200px]
            lg:flex-col
            lg:items-end
            lg:border-t-0
            lg:pt-0
          "
        >
          {/* SALARY */}

          <div className="text-left lg:text-right">
            <span
              className="
                mb-1
                flex
                items-center
                gap-1
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--muted-foreground,_#94a3b8)]

                lg:justify-end
              "
            >
              <Banknote className="h-3 w-3" />
              Compensation
            </span>

            <p
              className="
                text-base
                font-black
                text-[var(--primary,_#2563eb)]
              "
            >
              {getSalaryLabel(job)}
            </p>

            <p
              className="
                mt-1
                text-[9px]
                font-semibold
                text-[var(--muted-foreground,_#94a3b8)]
              "
            >
              {job.salaryType}
            </p>
          </div>

          {/* VIEW DETAILS */}

          <button
            type="button"
            onClick={openJobDetails}
            className="
              inline-flex
              cursor-pointer
              items-center
              justify-center
              gap-1.5
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
              active:scale-[0.97]

              lg:min-w-[140px]
            "
          >
            View Details
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
