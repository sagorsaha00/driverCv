"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Briefcase, RefreshCw, X } from "lucide-react";

import { useDebounce } from "@/lib/hook/useDebounce";
import { Driver } from "@/type/driver";
import { useDrivers } from "@/lib/hook/useDrivers";
import { useAuthStore } from "@/store/authStore";
import DriverExplorerHeader from "@/components/drivers/DriverExplorerHeader";
import DriverSearchBar from "@/components/drivers/DriverSearchBar";
import DriverFilters from "@/components/drivers/DriverFilters";
import DriverGrid from "@/components/drivers/DriverGrid";
import DriverPagination from "@/components/drivers/DriverPagination";
import EmptyDriverState from "@/components/drivers/EmptyDriverState";
import MessageDriverModal from "@/components/drivers/MessageDriverModal";
import HireDriverModal from "@/components/drivers/HireDriverModal";

export default function DriverExplorer() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Check authenticated role
  const authRole = useAuthStore(
    (state) => state.role || (state.user as any)?.role?.toLowerCase()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDriver = mounted && authRole === "driver";

  useEffect(() => {
    if (isDriver) {
      router.replace("/EmployerJobFeed");
    }
  }, [isDriver, router]);

  // Query parameters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedWorkingHours, setSelectedWorkingHours] = useState("All Hours");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  // Debounced search for smooth real-time typing feedback
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 350);
  const isDebouncing = searchQuery.trim() !== debouncedSearchQuery;

  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [messageDriver, setMessageDriver] = useState<Driver | null>(null);

  // TanStack Query to fetch live dynamic driver data from backend API
  const {
    drivers,
    allDrivers,
    pagination,
    filterOptions,
    categoryCounts,
    regionCounts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useDrivers({
    search: debouncedSearchQuery,
    region: selectedRegion,
    category: selectedCategory,
    workingHours: selectedWorkingHours,
    minSalary: salaryRange[0] > 0 ? salaryRange[0] : undefined,
    maxSalary: salaryRange[1] < 100000 ? salaryRange[1] : undefined,
    sortBy: sortBy as any,
    page,
    limit,
  });

  // Calculate active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedRegion !== "All Regions") count++;
    if (selectedCategory !== "All Categories") count++;
    if (selectedWorkingHours !== "All Hours") count++;
    if (salaryRange[0] > 0 || salaryRange[1] < 100000) count++;
    return count;
  }, [searchQuery, selectedRegion, selectedCategory, selectedWorkingHours, salaryRange]);

  const hasActiveFilters = activeFiltersCount > 0;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All Regions");
    setSelectedCategory("All Categories");
    setSelectedWorkingHours("All Hours");
    setSalaryRange([0, 100000]);
    setSortBy("default");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (isDriver) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4 py-16 text-center">
        <div className="max-w-md rounded-3xl border border-border bg-surface p-8 shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Briefcase className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-base font-bold text-text">Driver Portal Active</h2>
          <p className="mt-2 text-xs text-text-muted">
            As a registered driver, you cannot browse or hire other drivers. Redirecting you to driving job opportunities...
          </p>
          <button
            type="button"
            onClick={() => router.push("/EmployerJobFeed")}
            className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover"
          >
            Go to Driving Jobs
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <DriverExplorerHeader count={pagination.total} />

        {/* SEARCH AND CONTROL BAR */}
        <DriverSearchBar
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            setPage(1);
          }}
          isSearching={isDebouncing || isFetching}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedRegion={selectedRegion}
          setSelectedRegion={(reg) => {
            setSelectedRegion(reg);
            setPage(1);
          }}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setPage(1);
          }}
          filterOptions={filterOptions}
          activeFiltersCount={activeFiltersCount}
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          onOpenFilters={() => setIsFilterOpen(true)}
        />

        {/* ERROR STATE */}
        {isError && (
          <div className="mb-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 sm:flex-row">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="text-xs font-bold">Failed to connect to backend server</p>
                <p className="text-[11px] text-red-600">
                  {error instanceof Error ? error.message : "Please ensure http://localhost:5000 is active."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-red-700"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Connection
            </button>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* DESKTOP FILTER ASIDE */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-6 rounded-2xl border border-border bg-surface p-5 shadow-xs">
              <DriverFilters
                filterOptions={filterOptions}
                categoryCounts={categoryCounts}
                regionCounts={regionCounts}
                totalAvailable={allDrivers.length}
                selectedRegion={selectedRegion}
                setSelectedRegion={(val) => {
                  setSelectedRegion(val);
                  setPage(1);
                }}
                selectedCategory={selectedCategory}
                setSelectedCategory={(val) => {
                  setSelectedCategory(val);
                  setPage(1);
                }}
                selectedWorkingHours={selectedWorkingHours}
                setSelectedWorkingHours={(val) => {
                  setSelectedWorkingHours(val);
                  setPage(1);
                }}
                salaryRange={salaryRange}
                setSalaryRange={(range) => {
                  setSalaryRange(range);
                  setPage(1);
                }}
                resetFilters={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </aside>

          {/* DRIVERS GRID / LIST */}
          <div className="lg:col-span-9">
            {drivers.length > 0 || isLoading ? (
              <>
                <DriverGrid
                  drivers={drivers}
                  isLoading={isLoading || isFetching}
                  layoutMode={layoutMode}
                  hasActiveFilters={hasActiveFilters}
                  totalCount={pagination.total}
                  resetFilters={resetFilters}
                  onMessage={setMessageDriver}
                  onHire={setSelectedDriver}
                />

                {/* PAGINATION FOR LARGE-SCALE DATA */}
                <DriverPagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              </>
            ) : (
              <EmptyDriverState resetFilters={resetFilters} />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-surface p-5 shadow-2xl sm:p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-4">
                <div>
                  <h2 className="text-sm font-bold text-text">Filter Drivers</h2>
                  <p className="mt-0.5 text-[10px] text-text-subtle">
                    Refine results by region, skills & hours
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-lg p-2 text-text-subtle transition hover:bg-surface-muted hover:text-text"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <DriverFilters
                filterOptions={filterOptions}
                categoryCounts={categoryCounts}
                regionCounts={regionCounts}
                totalAvailable={allDrivers.length}
                selectedRegion={selectedRegion}
                setSelectedRegion={(val) => {
                  setSelectedRegion(val);
                  setPage(1);
                }}
                selectedCategory={selectedCategory}
                setSelectedCategory={(val) => {
                  setSelectedCategory(val);
                  setPage(1);
                }}
                selectedWorkingHours={selectedWorkingHours}
                setSelectedWorkingHours={(val) => {
                  setSelectedWorkingHours(val);
                  setPage(1);
                }}
                salaryRange={salaryRange}
                setSalaryRange={(range) => {
                  setSalaryRange(range);
                  setPage(1);
                }}
                resetFilters={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover"
              >
                Show {pagination.total} Drivers
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* HIRE MODAL */}
      <AnimatePresence>
        {selectedDriver && (
          <HireDriverModal
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        )}
      </AnimatePresence>

      {/* MESSAGE MODAL */}
      <AnimatePresence>
        {messageDriver && (
          <MessageDriverModal
            driver={messageDriver}
            onClose={() => setMessageDriver(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
