"use client";

import {
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";

interface Props {
  onReset: () => void;
}

export default function JobEmptyState({
  onReset,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-2xl
        border
        border-dashed
        border-[var(--border,_#cbd5e1)]
        bg-[var(--card,_#ffffff)]
        px-6
        py-14
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14 w-14
          items-center
          justify-center
          rounded-2xl
          bg-[var(--muted,_#f1f5f9)]
          text-[var(--muted-foreground,_#94a3b8)]
        "
      >
        <Briefcase className="h-7 w-7" />
      </div>

      <h3
        className="
          mt-4
          text-sm
          font-black
          text-[var(--foreground,_#0f172a)]
        "
      >
        No driving jobs found
      </h3>

      <p
        className="
          mx-auto
          mt-1.5
          max-w-sm
          text-xs
          leading-5
          text-[var(--muted-foreground,_#64748b)]
        "
      >
        Try changing your search term,
        location or license type to
        discover more vacancies.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="
          mt-5
          cursor-pointer
          rounded-xl
          bg-[var(--primary,_#2563eb)]
          px-4
          py-2.5
          text-xs
          font-bold
          text-[var(--primary-foreground,_#ffffff)]
          shadow-lg
          transition
          hover:opacity-90
        "
      >
        Reset Filters
      </button>
    </motion.div>
  );
}