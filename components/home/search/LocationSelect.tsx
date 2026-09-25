"use client";

import { MapPin } from "lucide-react";

interface Props {
  value: string;
  locations: string[];
  loading?: boolean;

  onChange: (value: string) => void;
}

export default function LocationSelect({
  value,
  locations,
  loading = false,
  onChange,
}: Props) {
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
      <MapPin
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
          Location
        </label>

        <select
          value={value}
          disabled={loading}
          onChange={(e) => onChange(e.target.value)}
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
          <option value="">{loading ? "Loading..." : "All Sweden"}</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
