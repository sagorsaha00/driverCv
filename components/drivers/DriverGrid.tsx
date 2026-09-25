"use client";

import { AnimatePresence, motion } from "framer-motion";
import DriverCard from "./DriverCard";
import { Driver } from "@/type/driver";

type Props = {
  drivers: Driver[];
  isLoading?: boolean;
  layoutMode?: "grid" | "list";
  hasActiveFilters: boolean;
  totalCount: number;
  resetFilters: () => void;
  onMessage: (driver: Driver) => void;
  onHire: (driver: Driver) => void;
};

export default function DriverGrid({
  drivers,
  isLoading = false,
  layoutMode = "grid",
  hasActiveFilters,
  totalCount,
  resetFilters,
  onMessage,
  onHire,
}: Props) {
  // Skeleton loader when querying
  if (isLoading && drivers.length === 0) {
    return (
      <section className="lg:col-span-9">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-surface-muted" />
        </div>

        <div
          className={
            layoutMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "space-y-3"
          }
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl border border-border bg-surface-subtle p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-surface-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-surface-muted" />
                  <div className="h-3 w-1/2 rounded bg-surface-muted" />
                </div>
              </div>
              <div className="mt-6 h-10 rounded-xl bg-surface-muted" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-xl bg-surface-muted" />
                <div className="h-12 rounded-xl bg-surface-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="lg:col-span-9">
      {/* SECTION HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            Live Driver Directory
          </p>

          <h2 className="mt-0.5 text-sm font-bold text-text">
            {totalCount} {totalCount === 1 ? "Driver" : "Drivers"} Available
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* DRIVERS CARDS */}
      {drivers.length > 0 && (
        <motion.div
          layout
          className={
            layoutMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "space-y-3"
          }
        >
          <AnimatePresence mode="popLayout">
            {drivers.map((driver, index) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                index={index}
                layoutMode={layoutMode}
                onMessage={() => onMessage(driver)}
                onHire={() => onHire(driver)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
