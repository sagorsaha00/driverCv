"use client";

import {
  Briefcase,
  ChevronDown,
  Grid,
  List,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { DriverFilterOptions } from "@/type/driver";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearching?: boolean;
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  filterOptions: DriverFilterOptions;
  activeFiltersCount: number;
  layoutMode: "grid" | "list";
  setLayoutMode: (mode: "grid" | "list") => void;
  onOpenFilters: () => void;
};

export default function DriverSearchBar({
  searchQuery,
  setSearchQuery,
  isSearching = false,
  sortBy,
  setSortBy,
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
  filterOptions,
  activeFiltersCount,
  layoutMode,
  setLayoutMode,
  onOpenFilters,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-7 rounded-3xl border border-[var(--border)] bg-[var(--surface-subtle)] p-2.5 shadow-[var(--shadow-sm)] sm:p-3"
    >
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-12 lg:items-center">
        {/* KEYWORD / DRIVER SEARCH INPUT */}
        <div className="lg:col-span-5">
          <div className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 transition-all focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--focus-ring)]">
            {isSearching ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[var(--primary)]" />
            ) : (
              <Search className="h-4 w-4 shrink-0 text-[var(--primary)]" />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Driver Keyword
                </label>
                {isSearching && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-[var(--primary)] animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]"></span>
                    Searching...
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, phone, license, skills..."
                  className="w-full border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] outline-none placeholder:text-[var(--text-subtle)]"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="ml-2 cursor-pointer text-[var(--text-subtle)] hover:text-[var(--text)]"
                    title="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC LOCATION / REGION SELECTOR */}
        <div className="lg:col-span-3">
          <div className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 transition-all focus-within:border-[var(--primary)]">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--primary)]" />
            <div className="min-w-0 flex-1">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Location
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] outline-none truncate"
              >
                <option value="All Regions">All Regions</option>
                {filterOptions.regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* DYNAMIC CATEGORY SELECTOR */}
        <div className="lg:col-span-2">
          <div className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 transition-all focus-within:border-[var(--primary)]">
            <Briefcase className="h-4 w-4 shrink-0 text-[var(--primary)]" />
            <div className="min-w-0 flex-1">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-[var(--text)] outline-none truncate"
              >
                <option value="All Categories">All Categories</option>
                {filterOptions.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CONTROLS: SORT, VIEW SWITCH & MOBILE FILTERS */}
        <div className="flex items-center justify-between gap-2 lg:col-span-2 lg:justify-end">
          {/* SORT */}
          <div className="relative flex-1 lg:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-3.5 pl-3 pr-8 text-xs font-semibold text-[var(--text)] outline-none transition hover:border-[var(--primary)] focus:border-[var(--primary)] lg:w-auto"
            >
              <option value="default">Sort: Default</option>
              <option value="salary_asc">Salary: Low to High</option>
              <option value="salary_desc">Salary: High to Low</option>
              <option value="name_asc">Name: A–Z</option>
              <option value="name_desc">Name: Z–A</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-subtle)]" />
          </div>

          {/* VIEW SWITCH */}
          <div className="flex items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1">
            <button
              type="button"
              onClick={() => setLayoutMode("grid")}
              className={`rounded-xl p-2 transition cursor-pointer ${
                layoutMode === "grid"
                  ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("list")}
              className={`rounded-xl p-2 transition cursor-pointer ${
                layoutMode === "list"
                  ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* MOBILE FILTER DRAWER BUTTON */}
          <button
            type="button"
            onClick={onOpenFilters}
            className="relative flex items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] lg:hidden"
            title="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[var(--primary)] text-[9px] font-bold text-[var(--on-primary)]">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
