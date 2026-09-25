"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import DriverCard from "./DriverCard";
import { useDrivers } from "@/lib/hook/useDrivers";
import { useAuthStore } from "@/store/authStore";

export default function DriverGridSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Check authenticated role from authStore
  const authRole = useAuthStore(
    (state) => state.role || (state.user as any)?.role?.toLowerCase()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch live dynamic drivers from backend API
  const { drivers, allDrivers, filterOptions, pagination, isLoading } = useDrivers({
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    limit: 6,
  });

  // Extract dynamic categories from live backend data
  const dynamicCategories = useMemo(() => {
    const cats = ["All"];
    if (filterOptions.categories && filterOptions.categories.length > 0) {
      filterOptions.categories.forEach((c) => {
        if (!cats.includes(c)) cats.push(c);
      });
    }
    return cats;
  }, [filterOptions.categories]);

  // Hide "Featured Drivers Available Now" section if logged in user role is driver
  if (mounted && authRole === "driver") {
    return null;
  }

  // Display drivers (up to 6 featured on homepage)
  const displayDrivers = drivers.slice(0, 6);

  return (
    <section className="bg-[var(--bg)] py-16 sm:py-20 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>Verified Professionals</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-[var(--text)] sm:text-3xl">
              Featured Drivers Available Now
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
              Live commercial drivers with pre-screened licenses and clean driving records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/ExploreDrivers")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:underline transition-colors cursor-pointer"
          >
            <span>Browse All {pagination.total > 0 ? pagination.total : allDrivers.length}+ Drivers</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category Filter Chips - 100% Dynamic */}
        {dynamicCategories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-xs"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && displayDrivers.length === 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--surface-muted)]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-[var(--surface-muted)]" />
                    <div className="h-3 w-1/3 rounded bg-[var(--surface-muted)]" />
                  </div>
                </div>
                <div className="mt-6 h-10 rounded-xl bg-[var(--surface-muted)]" />
                <div className="mt-4 h-10 rounded-xl bg-[var(--surface-muted)]" />
              </div>
            ))}
          </div>
        )}

        {/* Drivers 3-column Grid - 100% Dynamic */}
        {displayDrivers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayDrivers.map((driver, index) => (
              <DriverCard key={driver.id} driver={driver} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}