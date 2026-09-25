"use client";

import { DriverSearchResult } from "@/type/search";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  driver: DriverSearchResult;
}

export default function DriverSearchCard({ driver }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/driverProfile/${driver.id}`)}
      className="
        flex w-full
        cursor-pointer
        items-center
        gap-3
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
      {driver.ProfileImage ? (
        <img
          src={driver.ProfileImage}
          alt={driver.fullname}
          className="
            h-11 w-11
            shrink-0
            rounded-xl
            object-cover
          "
        />
      ) : (
        <div
          className="
            flex h-11 w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--primary)]/10
            text-sm
            font-bold
            text-[var(--primary)]
          "
        >
          {driver.fullname.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p
          className="
            truncate
            text-[13px]
            font-bold
            text-[var(--text)]
          "
        >
          {driver.fullname}
        </p>

        <div
          className="
            mt-1
            flex
            flex-wrap
            gap-1
          "
        >
          {driver.licenseCategories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="
                    rounded-md
                    bg-[var(--surface-muted)]
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-semibold
                    text-[var(--text-muted)]
                  "
            >
              {category}
            </span>
          ))}
        </div>

        <div
          className="
            mt-1.5
            flex
            items-center
            gap-1
            text-[10px]
            text-[var(--text-muted)]
          "
        >
          <MapPin className="h-3 w-3" />

          <span className="truncate">{driver.regions.join(", ")}</span>
        </div>
      </div>

      <div
        className="
          shrink-0
          text-right
        "
      >
        <p
          className="
            text-[11px]
            font-bold
            text-[var(--primary)]
          "
        >
          {driver.targetMonthlySalary.toLocaleString()}
        </p>

        <p
          className="
            text-[9px]
            text-[var(--text-muted)]
          "
        >
          SEK/month
        </p>
      </div>
    </button>
  );
}
