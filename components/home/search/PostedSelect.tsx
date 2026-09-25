"use client";

import { PostedFilter } from "@/type/search";
import { Clock3 } from "lucide-react";

interface Props {
  value: PostedFilter;
  onChange: (value: PostedFilter) => void;
}

export default function PostedSelect({ value, onChange }: Props) {
  return (
    <div
      className="
        flex min-h-[52px]
        items-center gap-3
        rounded-xl
        border border-[var(--border)]
        bg-[var(--surface)]
        px-3.5
        focus-within:border-[var(--primary)]
      "
    >
      <Clock3
        className="
          h-4 w-4
          shrink-0
          text-[var(--primary)]
        "
      />

      <div className="min-w-0 flex-1">
        <label
          className="
            block
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-[var(--text-muted)]
          "
        >
          Posted
        </label>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PostedFilter)}
          className="
            w-full
            cursor-pointer
            border-none
            bg-transparent
            p-0
            text-[13px]
            font-semibold
            text-[var(--text)]
            outline-none
          "
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
