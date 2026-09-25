"use client";

import { Search, MapPin, Car, SlidersHorizontal, X } from "lucide-react";

interface Props {
  searchTerm: string;
  selectedLocation: string;
  selectedLicense: string;

  locations: string[];
  licenseTypes: string[];

  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onLicenseChange: (value: string) => void;

  onReset: () => void;
}

export default function JobFilters({
  searchTerm,
  selectedLocation,
  selectedLicense,
  locations,
  licenseTypes,
  onSearchChange,
  onLocationChange,
  onLicenseChange,
  onReset,
}: Props) {
  const hasFilters =
    searchTerm.trim() !== "" ||
    selectedLocation !== "All" ||
    selectedLicense !== "All";

  return (
    <div
      className="
        mb-6
        rounded-2xl
        border
        border-[var(--border,_#e2e8f0)]
        bg-[var(--card,_#ffffff)]
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="
              h-4 w-4
              text-[var(--primary,_#2563eb)]
            "
          />

          <span
            className="
              text-xs
              font-black
              uppercase
              tracking-wide
              text-[var(--foreground,_#0f172a)]
            "
          >
            Find your next driving job
          </span>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="
              hidden
              cursor-pointer
              items-center
              gap-1
              text-[10px]
              font-bold
              text-[var(--primary,_#2563eb)]
              sm:flex
            "
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-3
          md:grid-cols-[1.5fr_1fr_1fr]
        "
      >
        {/* SEARCH */}

        <div className="relative">
          <Search
            className="
              absolute
              left-3.5
              top-1/2
              h-4 w-4
              -translate-y-1/2
              text-[var(--muted-foreground,_#94a3b8)]
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search role, company, location or keyword..."
            className="
              w-full
              rounded-xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-[var(--muted,_#f1f5f9)]
              py-3
              pl-10
              pr-4
              text-xs
              font-medium
              text-[var(--foreground,_#0f172a)]
              outline-none
              transition

              placeholder:text-[var(--muted-foreground,_#94a3b8)]

              focus:border-[var(--primary,_#2563eb)]
              focus:bg-[var(--card,_#ffffff)]
              focus:ring-4
              focus:ring-[var(--primary,_#2563eb)]/10
            "
          />
        </div>

        {/* LOCATION */}

        <div className="relative">
          <MapPin
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              z-10
              h-4 w-4
              -translate-y-1/2
              text-[var(--muted-foreground,_#94a3b8)]
            "
          />

          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-[var(--muted,_#f1f5f9)]
              py-3
              pl-10
              pr-4
              text-xs
              font-bold
              text-[var(--foreground,_#0f172a)]
              outline-none
              transition

              focus:border-[var(--primary,_#2563eb)]
              focus:bg-[var(--card,_#ffffff)]
              focus:ring-4
              focus:ring-[var(--primary,_#2563eb)]/10
            "
          >
            <option value="All">All Locations</option>

            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* LICENSE */}

        <div className="relative">
          <Car
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              z-10
              h-4 w-4
              -translate-y-1/2
              text-[var(--muted-foreground,_#94a3b8)]
            "
          />

          <select
            value={selectedLicense}
            onChange={(e) => onLicenseChange(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-[var(--muted,_#f1f5f9)]
              py-3
              pl-10
              pr-4
              text-xs
              font-bold
              text-[var(--foreground,_#0f172a)]
              outline-none
              transition

              focus:border-[var(--primary,_#2563eb)]
              focus:bg-[var(--card,_#ffffff)]
              focus:ring-4
              focus:ring-[var(--primary,_#2563eb)]/10
            "
          >
            <option value="All">All License Types</option>

            {licenseTypes.map((license) => (
              <option key={license} value={license}>
                {license}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ACTIVE FILTERS */}

      {hasFilters && (
        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            gap-2
            border-t
            border-[var(--border,_#e2e8f0)]
            pt-4
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
              text-[var(--muted-foreground,_#64748b)]
            "
          >
            Active filters:
          </span>

          {searchTerm && (
            <span
              className="
                rounded-lg
                bg-[var(--muted,_#f1f5f9)]
                px-2.5
                py-1
                text-[10px]
                font-bold
                text-[var(--foreground,_#0f172a)]
              "
            >
              Search: {searchTerm}
            </span>
          )}

          {selectedLocation !== "All" && (
            <span
              className="
                rounded-lg
                bg-[var(--primary,_#2563eb)]/10
                px-2.5
                py-1
                text-[10px]
                font-bold
                text-[var(--primary,_#2563eb)]
              "
            >
              {selectedLocation}
            </span>
          )}

          {selectedLicense !== "All" && (
            <span
              className="
                rounded-lg
                bg-[var(--primary,_#2563eb)]/10
                px-2.5
                py-1
                text-[10px]
                font-bold
                text-[var(--primary,_#2563eb)]
              "
            >
              License: {selectedLicense}
            </span>
          )}

          <button
            type="button"
            onClick={onReset}
            className="
              ml-auto
              cursor-pointer
              text-[11px]
              font-bold
              text-[var(--primary,_#2563eb)]
              hover:underline
            "
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
