"use client";

import { JobSearchResult } from "@/type/search";
import { Clock3, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  job: JobSearchResult;
}

export default function JobSearchCard({ job }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/EmployerJobFeed/${job.id}`)}
      className="
        w-full
        cursor-pointer
        rounded-xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-3
        text-left
        transition-all
        hover:border-[var(--primary)]
        hover:bg-[var(--surface-muted)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <p
            className="
              truncate
              text-[13px]
              font-bold
              text-[var(--text)]
            "
          >
            {job.jobTitle}
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[11px]
              font-medium
              text-[var(--text-muted)]
            "
          >
            {job.companyName}
          </p>
        </div>

        <span
          className="
            shrink-0
            rounded-md
            bg-[var(--primary)]/10
            px-2
            py-1
            text-[9px]
            font-bold
            text-[var(--primary)]
          "
        >
          {job.employmentType}
        </span>
      </div>

      <div
        className="
          mt-2
          flex
          flex-wrap
          items-center
          gap-x-3
          gap-y-1.5
          text-[10px]
          text-[var(--text-muted)]
        "
      >
        <span
          className="
            flex
            items-center
            gap-1
          "
        >
          <MapPin className="h-3 w-3" />
          {job.location}
        </span>

        <span
          className="
            flex
            items-center
            gap-1
          "
        >
          <Clock3 className="h-3 w-3" />
          {job.workingHours}
        </span>

        <span
          className="
            font-bold
            text-[var(--primary)]
          "
        >
          {job.salaryAmount}
        </span>
      </div>
    </button>
  );
}
