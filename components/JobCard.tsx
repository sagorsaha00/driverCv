"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";

interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  posted: string;
  verified: boolean;
}

export default function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        border
        border-slate-200
        bg-white
        p-5
        transition-shadow
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]
      "
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Company Icon */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            bg-[#EEF4FF]
            text-[#1677E8]
          "
        >
          <BriefcaseBusiness className="h-5 w-5" />
        </div>

        {/* Main */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className="
              text-[13px]
              font-bold
              text-[#111827]
            "
            >
              {job.title}
            </h3>

            {job.verified && (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            )}
          </div>

          <p className="mt-1 text-[10px] font-medium text-slate-500">
            {job.company}
          </p>

          <div
            className="
            mt-3
            flex
            flex-wrap
            gap-x-4
            gap-y-2
            text-[9px]
            text-slate-400
          "
          >
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>

            <span>{job.type}</span>

            <span>{job.experience}</span>

            <span className="font-semibold text-slate-600">{job.salary}</span>
          </div>
        </div>

        {/* Right */}

        <div
          className="
          flex
          items-center
          justify-between
          gap-5
          border-t
          border-slate-100
          pt-4

          sm:block
          sm:border-t-0
          sm:pt-0
        "
        >
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <Clock3 className="h-3 w-3" />

            {job.posted}
          </div>

          <button
            className="
              mt-2
              flex
              items-center
              gap-1
              text-[10px]
              font-bold
              text-[#1677E8]
            "
          >
            View job
            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
