"use client";

import {
  Banknote,
  Briefcase,
  Check,
  Clock,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import FilterGroup from "./FilterGroup";
import { DriverFilterOptions } from "@/type/driver";

type Props = {
  filterOptions: DriverFilterOptions;
  categoryCounts?: Record<string, number>;
  regionCounts?: Record<string, number>;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedWorkingHours: string;
  setSelectedWorkingHours: (value: string) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  totalAvailable?: number;
};

export default function DriverFilters({
  filterOptions,
  categoryCounts = {},
  regionCounts = {},
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  selectedWorkingHours,
  setSelectedWorkingHours,
  salaryRange,
  setSalaryRange,
  resetFilters,
  hasActiveFilters,
  totalAvailable,
}: Props) {
  const { regions, categories, workingHoursList, minSalary, maxSalary } = filterOptions;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[var(--primary)]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text)]">
            Filter Drivers
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] transition hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* DYNAMIC REGIONS / LOCATIONS */}
      <FilterGroup title="Regions & Locations">
        <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setSelectedRegion("All Regions")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
              selectedRegion === "All Regions"
                ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span>All Regions</span>
            {totalAvailable !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  selectedRegion === "All Regions"
                    ? "bg-white/20 text-white"
                    : "bg-[var(--surface-muted)] text-[var(--text-subtle)]"
                }`}
              >
                {totalAvailable}
              </span>
            )}
          </button>

          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            const count = regionCounts[region];

            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                    : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{region}</span>
                </span>
                {count !== undefined ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[var(--surface-muted)] text-[var(--text-subtle)]"
                    }`}
                  >
                    {count}
                  </span>
                ) : isSelected ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* DYNAMIC LICENSE CATEGORIES */}
      <FilterGroup title="License Categories">
        <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("All Categories")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
              selectedCategory === "All Categories"
                ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === "All Categories" && <Check className="h-3.5 w-3.5" />}
          </button>

          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                    : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{category}</span>
                </span>
                {count !== undefined && count > 0 ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[var(--surface-muted)] text-[var(--text-subtle)]"
                    }`}
                  >
                    {count}
                  </span>
                ) : isSelected ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* WORKING HOURS */}
      {workingHoursList.length > 0 && (
        <FilterGroup title="Working Hours">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setSelectedWorkingHours("All Hours")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                selectedWorkingHours === "All Hours"
                  ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                  : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>All Hours</span>
              {selectedWorkingHours === "All Hours" && <Check className="h-3.5 w-3.5" />}
            </button>

            {workingHoursList.map((hours) => {
              const isSelected = selectedWorkingHours === hours;
              return (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setSelectedWorkingHours(hours)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                    isSelected
                      ? "bg-[var(--primary)] text-[var(--on-primary)] font-bold shadow-xs"
                      : "font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{hours}</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {/* TARGET SALARY RANGE */}
      <FilterGroup title="Target Monthly Salary">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text)]">
            <span>Min: ৳{salaryRange[0].toLocaleString()}</span>
            <span>Max: ৳{salaryRange[1].toLocaleString()}</span>
          </div>

          <input
            type="range"
            min={minSalary}
            max={maxSalary > minSalary ? maxSalary : 100000}
            step={1000}
            value={salaryRange[1]}
            onChange={(e) => setSalaryRange([salaryRange[0], Number(e.target.value)])}
            className="w-full accent-[var(--primary)] cursor-pointer"
          />

          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-subtle)]">
            <Banknote className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Driver budget expectation</span>
          </div>
        </div>
      </FilterGroup>
    </div>
  );
}
