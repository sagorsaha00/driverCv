"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ArrowRight, MapPin, Search, X } from "lucide-react";

import SearchInput from "./SearchInput";
import LocationSelect from "./LocationSelect";
import PostedSelect from "./PostedSelect";
import SearchResults from "./SearchResults";
import { PostedFilter } from "@/type/search";
import { useDebounce } from "@/lib/hook/useDebounce";
import {
  useLocations,
  useMarketplaceSearch,
} from "@/lib/hook/useMarketplaceSearch";

export default function MarketplaceSearch() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");

  const [selectedPosted, setSelectedPosted] = useState<PostedFilter>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // DEBOUNCE
  // ============================================================

  const debouncedQuery = useDebounce(query.trim(), 400);

  // ============================================================
  // LOCATIONS QUERY
  // ============================================================

  const { data: locationsResponse, isLoading: locationsLoading } =
    useLocations();

  const locations = locationsResponse?.data ?? [];

  // ============================================================
  // MARKETPLACE QUERY
  // ============================================================

  const { data, isLoading, isFetching, isError } = useMarketplaceSearch({
    q: debouncedQuery,
    location: selectedLocation,
    posted: selectedPosted,
    type: "all",
    enabled: open,
  });

  const drivers = data?.data.drivers ?? [];

  const jobs = data?.data.jobs ?? [];

  const counts = data?.data.counts ?? {
    drivers: 0,
    jobs: 0,
    total: 0,
  };

  // ============================================================
  // AUTO FOCUS
  // ============================================================

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

  // ============================================================
  // ESC + OUTSIDE CLICK
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ============================================================
  // UI
  // ============================================================

  return (
    <>
      {/* ========================================================
          CLOSED SEARCH CARD
      ========================================================= */}

      <div
        onClick={() => setOpen(true)}
        className="
          group
          cursor-pointer
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--surface-subtle)]
          p-3.5
          shadow-md
          transition-all
          hover:border-[var(--primary)]
          hover:shadow-lg
        "
      >
        {/* Search */}

        <div
          className="
            flex min-h-[50px]
            items-center
            gap-3
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            px-3.5
          "
        >
          <Search
            className="
              h-4 w-4
              text-[var(--primary)]
            "
          />

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--text-muted)]
              "
            >
              Search Marketplace
            </p>

            <p
              className="
                text-[13px]
                font-semibold
                text-[var(--text)]
              "
            >
              {query || "Truck, delivery, bus..."}
            </p>
          </div>
        </div>

        {/* Filters */}

        <div
          className="
            mt-2
            grid
            grid-cols-2
            gap-2
          "
        >
          <div
            className="
              flex min-h-[48px]
              items-center
              gap-2
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface)]
              px-3
            "
          >
            <MapPin
              className="
                h-4 w-4
                text-[var(--primary)]
              "
            />

            <span
              className="
                truncate
                text-[12px]
                font-semibold
                text-[var(--text)]
              "
            >
              {selectedLocation || "All Sweden"}
            </span>
          </div>

          <div
            className="
              flex min-h-[48px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[var(--primary)]
              px-4
              text-[12px]
              font-bold
              text-[var(--on-primary)]
            "
          >
            Search
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* ========================================================
          OVERLAY
      ========================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0
              z-50
              bg-[var(--text)]/30
              backdrop-blur-md
            "
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ========================================================
          SEARCH MODAL
      ========================================================= */}

      <AnimatePresence>
        {open && (
          <div
            className="
              fixed inset-0
              z-50
              flex
              items-center
              justify-center
              p-3
              sm:p-6
            "
          >
            <motion.div
              ref={modalRef}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-3xl
                border
                border-[var(--primary)]/30
                bg-[var(--surface)]
                p-4
                shadow-2xl
                sm:p-6
              "
            >
              {/* Header */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--border-subtle)]
                  pb-3
                "
              >
                <div>
                  <p
                    className="
                      text-[13px]
                      font-bold
                      text-[var(--text)]
                    "
                  >
                    Search Marketplace
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-[var(--text-muted)]
                    "
                  >
                    Find drivers and driving jobs
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    flex h-8 w-8
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--surface-muted)]
                    text-[var(--text-muted)]
                    hover:text-[var(--text)]
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search Fields */}

              <div
                className="
                  rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--surface-subtle)]
                  p-2
                "
              >
                <SearchInput
                  value={query}
                  onChange={setQuery}
                  inputRef={inputRef}
                />

                <div
                  className="
                    mt-2
                    grid
                    grid-cols-1
                    gap-2
                    sm:grid-cols-2
                  "
                >
                  <LocationSelect
                    value={selectedLocation}
                    locations={locations}
                    loading={locationsLoading}
                    onChange={setSelectedLocation}
                  />

                  <PostedSelect
                    value={selectedPosted}
                    onChange={setSelectedPosted}
                  />
                </div>
              </div>

              {/* Query status */}

              {isFetching && !isLoading && (
                <div
                  className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      px-1
                      text-[10px]
                      font-medium
                      text-[var(--text-muted)]
                    "
                >
                  <span
                    className="
                        h-2 w-2
                        animate-pulse
                        rounded-full
                        bg-[var(--primary)]
                      "
                  />
                  Updating results...
                </div>
              )}

              {/* Error */}

              {isError ? (
                <div
                  className="
                    mt-4
                    rounded-xl
                    border border-red-200
                    bg-red-50
                    p-4
                    text-center
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-red-600
                    "
                  >
                    Unable to load search results.
                  </p>
                </div>
              ) : (
                <SearchResults
                  drivers={drivers}
                  jobs={jobs}
                  counts={counts}
                  loading={isLoading}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
