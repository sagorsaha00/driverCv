"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Driver, initialDrivers } from "@/components/constant/driverData";
import DriverExplorerHeader from "@/components/drivers/DriverExplorerHeader";
import DriverSearchBar from "@/components/drivers/DriverSearchBar";
import DriverFilters from "@/components/drivers/DriverFilters";
import DriverGrid from "@/components/drivers/DriverGrid";
import EmptyDriverState from "@/components/drivers/EmptyDriverState";
import MessageDriverModal from "@/components/drivers/MessageDriverModal";
import HireDriverModal from "@/components/drivers/HireDriverModal";

export default function DriverExplorer() {
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const [selectedCity, setSelectedCity] = useState("All Cities");

  const [selectedExperience, setSelectedExperience] =
    useState("All Experience");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("rating");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const [messageDriver, setMessageDriver] = useState<Driver | null>(null);

  const resetFilters = () => {
    setSelectedRole("All Roles");
    setSelectedCity("All Cities");
    setSelectedExperience("All Experience");
    setSearchQuery("");
  };

  /* ========================================
     FILTER + SEARCH + SORT
  ======================================== */

  const filteredDrivers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...initialDrivers]
      .filter((driver) => {
        const matchesRole =
          selectedRole === "All Roles" || driver.role === selectedRole;

        const matchesCity =
          selectedCity === "All Cities" || driver.location === selectedCity;

        const matchesExperience =
          selectedExperience === "All Experience" ||
          (() => {
            switch (selectedExperience) {
              case "1-3 Years":
                return driver.experience >= 1 && driver.experience <= 3;

              case "3-5 Years":
                return driver.experience >= 3 && driver.experience <= 5;

              case "5-8 Years":
                return driver.experience >= 5 && driver.experience <= 8;

              case "8+ Years":
                return driver.experience >= 8;

              default:
                return true;
            }
          })();

        const matchesSearch =
          !query ||
          driver.name.toLowerCase().includes(query) ||
          driver.role.toLowerCase().includes(query) ||
          driver.location.toLowerCase().includes(query) ||
          driver.salary.toLowerCase().includes(query);

        return matchesRole && matchesCity && matchesExperience && matchesSearch;
      })

      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        if (sortBy === "experience") {
          return b.experience - a.experience;
        }

        if (sortBy === "salary") {
          const salaryA = Number(a.salary.replace(/\D/g, ""));

          const salaryB = Number(b.salary.replace(/\D/g, ""));

          return salaryA - salaryB;
        }

        return 0;
      });
  }, [selectedRole, selectedCity, selectedExperience, searchQuery, sortBy]);

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedRole !== "All Roles" ||
    selectedCity !== "All Cities" ||
    selectedExperience !== "All Experience";

  return (
    <main
      className="
      min-h-screen
      bg-background
      px-4 py-6
      text-text
      sm:px-6 sm:py-8
      lg:px-8
    "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <DriverExplorerHeader count={filteredDrivers.length} />

        {/* SEARCH */}
        <DriverSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onOpenFilters={() => setIsFilterOpen(true)}
        />

        {/* MAIN */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* DESKTOP FILTER */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div
              className="
              sticky top-6
              rounded-xl
              border border-border
              bg-surface
              p-5
              shadow-xs
            "
            >
              <DriverFilters
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedExperience={selectedExperience}
                setSelectedExperience={setSelectedExperience}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          {/* DRIVER RESULTS */}
          {filteredDrivers.length > 0 ? (
            <DriverGrid
              drivers={filteredDrivers}
              hasActiveFilters={hasActiveFilters}
              resetFilters={resetFilters}
              onMessage={setMessageDriver}
              onHire={setSelectedDriver}
            />
          ) : (
            <section className="lg:col-span-9">
              <EmptyDriverState resetFilters={resetFilters} />
            </section>
          )}
        </div>
      </div>

      {/* MOBILE FILTER */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="
                fixed inset-0 z-40
                bg-text/30
                backdrop-blur-sm
                lg:hidden
              "
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 220,
              }}
              className="
                fixed inset-y-0 left-0 z-50
                w-full max-w-sm
                overflow-y-auto
                bg-surface
                p-5 shadow-lg
                sm:p-6
                lg:hidden
              "
            >
              <div
                className="
                mb-6 flex items-center justify-between
                border-b border-border-subtle
                pb-4
              "
              >
                <div>
                  <h2 className="text-sm font-bold text-text">
                    Filter Drivers
                  </h2>

                  <p className="mt-1 text-[10px] text-text-subtle">
                    Refine your driver search
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="
                    rounded-lg
                    bg-surface-muted
                    p-2
                    text-text-muted
                    transition
                    hover:bg-primary-50
                    hover:text-primary
                  "
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <DriverFilters
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedExperience={selectedExperience}
                setSelectedExperience={setSelectedExperience}
                resetFilters={resetFilters}
              />

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="
                  mt-8 w-full
                  rounded-lg
                  bg-primary
                  py-3.5
                  text-xs font-bold
                  text-white
                  transition
                  hover:bg-primary-hover
                "
              >
                Show {filteredDrivers.length} Drivers
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
