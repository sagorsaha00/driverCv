"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RotateCcw,
  Search,
  Star,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  ChevronDown,
  Check,
  MessageSquare,
  UserCheck,
  X,
  ShieldCheck,
  Users,
  Clock,
  Banknote,
} from "lucide-react";

type Driver = {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: number;
  rating: number;
  salary: string;
  status: string;
  available: string;
  verified: boolean;
  initials: string;
};

const driverRoles = [
  "All Roles",
  "Heavy Truck Driver (CE)",
  "Heavy Truck Driver (C)",
  "Delivery Van Driver",
  "Personal Chauffeur",
  "Bus & Coach Driver (D)",
  "Taxi & Rideshare",
  "Ambulance Driver",
  "Private Car Driver",
];

const swedishCities = [
  "All Cities",
  "Stockholm",
  "Gothenburg",
  "Malmö",
  "Uppsala",
  "Jönköping",
];

const experienceLevels = [
  "All Experience",
  "1-3 Years",
  "3-5 Years",
  "5-8 Years",
  "8+ Years",
];

const initialDrivers: Driver[] = [
  {
    id: 1,
    name: "Lars Lindqvist",
    role: "Heavy Truck Driver (CE)",
    location: "Stockholm",
    experience: 8,
    rating: 4.9,
    salary: "38,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "LL",
  },
  {
    id: 2,
    name: "Elin Andersson",
    role: "Personal Chauffeur",
    location: "Gothenburg",
    experience: 5,
    rating: 4.8,
    salary: "31,000 SEK/mo",
    status: "Part-time",
    available: "Flexible Hours",
    verified: true,
    initials: "EA",
  },
  {
    id: 3,
    name: "Sven Nilsson",
    role: "Delivery Van Driver",
    location: "Malmö",
    experience: 3,
    rating: 4.7,
    salary: "27,500 SEK/mo",
    status: "Full-time",
    available: "Available in 2 days",
    verified: true,
    initials: "SN",
  },
  {
    id: 4,
    name: "Astrid Berg",
    role: "Bus & Coach Driver (D)",
    location: "Uppsala",
    experience: 10,
    rating: 5.0,
    salary: "34,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "AB",
  },
  {
    id: 5,
    name: "Mikael Lind",
    role: "Heavy Truck Driver (CE)",
    location: "Jönköping",
    experience: 12,
    rating: 4.9,
    salary: "39,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "ML",
  },
  {
    id: 6,
    name: "Johan Berg",
    role: "Taxi & Rideshare",
    location: "Stockholm",
    experience: 6,
    rating: 4.8,
    salary: "29,000 SEK/mo",
    status: "Flexible",
    available: "Weekends & Evenings",
    verified: true,
    initials: "JB",
  },
];

type FilterSectionProps = {
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedExperience: string;
  setSelectedExperience: (value: string) => void;
  resetFilters: () => void;
};

export default function DriverExplorer() {
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedExperience, setSelectedExperience] =
    useState("All Experience");

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [messageDriver, setMessageDriver] = useState<Driver | null>(null);

  const resetFilters = () => {
    setSelectedRole("All Roles");
    setSelectedCity("All Cities");
    setSelectedExperience("All Experience");
    setSearchQuery("");
  };

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
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-6 text-[#0a0a0a] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 sm:mb-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dcdcdc] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#262626]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Driver Network
              </div>

              <h1 className="max-w-3xl text-2xl font-black tracking-[-0.04em] text-[#0a0a0a] sm:text-3xl lg:text-4xl">
                Explore & Hire Verified Drivers
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#737373]">
                Discover pre-screened commercial drivers available for immediate
                hiring across Sweden.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-[#e5e5e5] bg-white px-5 py-4 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a0a0a] text-white">
                  <Users className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#8a8a8a]">
                    Available Drivers
                  </p>

                  <p className="mt-0.5 text-lg font-black tracking-tight text-[#0a0a0a]">
                    {filteredDrivers.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SEARCH + SORT */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-6 rounded-2xl border border-[#e5e5e5] bg-white p-3 shadow-sm sm:p-4"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by driver name, role, city..."
                className="w-full rounded-xl border border-[#e5e5e5] bg-[#fafafa] py-3 pl-10 pr-4 text-xs font-medium text-[#0a0a0a] outline-none transition placeholder:text-[#a3a3a3] focus:border-[#0a0a0a] focus:bg-white focus:ring-4 focus:ring-black/5"
              />
            </div>

            {/* MOBILE FILTER */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-xs font-bold text-[#262626] transition hover:bg-[#f5f5f5] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* SORT */}
            <div className="flex items-center gap-2">
              <span className="hidden text-[11px] font-bold text-[#999] sm:block">
                Sort by
              </span>

              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#e5e5e5] bg-white py-3 pl-3 pr-9 text-xs font-bold text-[#262626] outline-none transition focus:border-[#0a0a0a] focus:ring-4 focus:ring-black/5 sm:w-auto"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="salary">Salary: Low to High</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#888]" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* MAIN */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* DESKTOP FILTER */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-6 rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm">
              <FilterSection
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
                  transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 220,
                  }}
                  className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-5 shadow-2xl sm:p-6 lg:hidden"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-[#eeeeee] pb-4">
                    <div>
                      <h2 className="text-sm font-black text-[#0a0a0a]">
                        Filter Drivers
                      </h2>

                      <p className="mt-1 text-[10px] text-[#999]">
                        Refine your driver search
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="rounded-full bg-[#f3f3f3] p-2 text-[#666] transition hover:bg-[#e9e9e9]"
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <FilterSection
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
                    className="mt-8 w-full rounded-xl bg-[#0a0a0a] py-3.5 text-xs font-bold text-white transition hover:bg-[#262626]"
                  >
                    Show {filteredDrivers.length} Drivers
                  </button>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* DRIVER GRID */}
          <section className="lg:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#999]">
                  Driver Marketplace
                </p>

                <h2 className="mt-1 text-sm font-black text-[#0a0a0a]">
                  {filteredDrivers.length}{" "}
                  {filteredDrivers.length === 1 ? "Driver" : "Drivers"} Found
                </h2>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#444] transition hover:text-black"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            {filteredDrivers.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredDrivers.map((driver, index) => (
                    <DriverCard
                      key={driver.id}
                      driver={driver}
                      index={index}
                      onMessage={() => setMessageDriver(driver)}
                      onHire={() => setSelectedDriver(driver)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState resetFilters={resetFilters} />
            )}
          </section>
        </div>
      </div>

      {/* HIRE MODAL */}
      <AnimatePresence>
        {selectedDriver && (
          <HireModal
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        )}
      </AnimatePresence>

      {/* MESSAGE MODAL */}
      <AnimatePresence>
        {messageDriver && (
          <MessageModal
            driver={messageDriver}
            onClose={() => setMessageDriver(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ============================================================
   FILTER SECTION
============================================================ */

function FilterSection({
  selectedRole,
  setSelectedRole,
  selectedCity,
  setSelectedCity,
  selectedExperience,
  setSelectedExperience,
  resetFilters,
}: FilterSectionProps) {
  return (
    <div className="space-y-7">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#eeeeee] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#0a0a0a]" />

          <h2 className="text-xs font-black uppercase tracking-[0.12em] text-[#0a0a0a]">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-[10px] font-bold text-[#777] transition hover:text-black"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* ROLE */}
      <FilterGroup title="Driver Role">
        <div className="space-y-1">
          {driverRoles.map((role) => {
            const selected = selectedRole === role;

            return (
              <button
                type="button"
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-[#0a0a0a] font-bold text-white"
                    : "font-medium text-[#555] hover:bg-[#f5f5f5]"
                }`}
              >
                <span>{role}</span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* LOCATION */}
      <FilterGroup title="Location">
        <div className="space-y-1">
          {swedishCities.map((city) => {
            const selected = selectedCity === city;

            return (
              <button
                type="button"
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-[#0a0a0a] font-bold text-white"
                    : "font-medium text-[#555] hover:bg-[#f5f5f5]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {city}
                </span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* EXPERIENCE */}
      <FilterGroup title="Experience">
        <div className="space-y-1">
          {experienceLevels.map((level) => {
            const selected = selectedExperience === level;

            return (
              <button
                type="button"
                key={level}
                onClick={() => setSelectedExperience(level)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-[#0a0a0a] font-bold text-white"
                    : "font-medium text-[#555] hover:bg-[#f5f5f5]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  {level}
                </span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* TRUST BOX */}
      <div className="rounded-2xl border border-[#dedede] bg-[#f7f7f7] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0a0a0a]" />

          <div>
            <p className="text-xs font-black text-[#0a0a0a]">
              Verified Driver Network
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[#666]">
              Driver profiles are reviewed before appearing in the hiring
              marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FILTER GROUP
============================================================ */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-black text-[#0a0a0a]">{title}</h3>

      {children}
    </div>
  );
}

/* ============================================================
   DRIVER CARD
============================================================ */

function DriverCard({
  driver,
  index,
  onMessage,
  onHire,
}: {
  driver: Driver;
  index: number;
  onMessage: () => void;
  onHire: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
      }}
      whileHover={{
        y: -4,
      }}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-sm transition-shadow hover:border-[#cfcfcf] hover:shadow-xl hover:shadow-black/5"
    >
      <div className="p-5">
        {/* PROFILE */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0a0a0a] text-xs font-black text-white">
              {driver.initials}

              {driver.verified && (
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-white text-[#0a0a0a] shadow-sm">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-black text-[#0a0a0a] transition-colors group-hover:text-[#444]">
                {driver.name}
              </h3>

              <p className="mt-0.5 truncate text-[10px] font-medium text-[#8a8a8a]">
                {driver.role}
              </p>
            </div>
          </div>

          {/* RATING */}
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#dedede] bg-[#f7f7f7] px-2 py-1">
            <Star className="h-3 w-3 fill-[#0a0a0a] text-[#0a0a0a]" />

            <span className="text-[10px] font-black text-[#0a0a0a]">
              {driver.rating}
            </span>
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#f1f1f1] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />

          <span className="text-[10px] font-bold text-[#333]">
            {driver.available}
          </span>
        </div>

        {/* DETAILS */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#eeeeee] pt-4">
          <div className="rounded-xl bg-[#f7f7f7] p-2.5">
            <div className="flex items-center gap-1.5 text-[#999]">
              <MapPin className="h-3.5 w-3.5" />

              <span className="text-[9px] font-bold uppercase tracking-wide">
                Location
              </span>
            </div>

            <p className="mt-1 truncate text-[11px] font-bold text-[#333]">
              {driver.location}
            </p>
          </div>

          <div className="rounded-xl bg-[#f7f7f7] p-2.5">
            <div className="flex items-center gap-1.5 text-[#999]">
              <Briefcase className="h-3.5 w-3.5" />

              <span className="text-[9px] font-bold uppercase tracking-wide">
                Experience
              </span>
            </div>

            <p className="mt-1 text-[11px] font-bold text-[#333]">
              {driver.experience} years
            </p>
          </div>
        </div>

        {/* SALARY */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-[#dedede] bg-[#f7f7f7] px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <Banknote className="h-3.5 w-3.5 text-[#555]" />

            <span className="text-[9px] font-bold uppercase tracking-wide text-[#999]">
              Expected
            </span>
          </div>

          <span className="text-[11px] font-black text-[#0a0a0a]">
            {driver.salary}
          </span>
        </div>

        {/* STATUS */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-[#888]">
          <Clock className="h-3.5 w-3.5" />

          {driver.status}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-2 border-t border-[#eeeeee] bg-[#fafafa] p-4">
        <button
          type="button"
          onClick={onMessage}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#dedede] bg-white py-2.5 text-[10px] font-bold text-[#333] transition hover:border-[#999] hover:bg-[#f5f5f5]"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Message
        </button>

        <button
          type="button"
          onClick={onHire}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0a0a0a] py-2.5 text-[10px] font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#262626] active:scale-[0.98]"
        >
          <UserCheck className="h-3.5 w-3.5" />
          Hire Now
        </button>
      </div>
    </motion.article>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({ resetFilters }: { resetFilters: () => void }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-2xl border border-dashed border-[#cfcfcf] bg-white px-6 py-16 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f1f1] text-[#888]">
        <Users className="h-7 w-7" />
      </div>

      <h3 className="mt-4 text-sm font-black text-[#0a0a0a]">
        No Verified Drivers Found
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#737373]">
        We could not find drivers matching your current search and filter
        criteria.
      </p>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0a0a0a] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#262626]"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset All Filters
      </button>
    </motion.div>
  );
}

/* ============================================================
   HIRE MODAL
============================================================ */

function HireModal({
  driver,
  onClose,
}: {
  driver: Driver;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-[#e5e5e5] bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#eeeeee] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a0a0a] text-xs font-black text-white">
              {driver.initials}
            </div>

            <div>
              <h3 className="text-sm font-black text-[#0a0a0a]">
                Hire {driver.name}
              </h3>

              <p className="mt-0.5 text-[10px] text-[#888]">{driver.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#888] transition hover:bg-[#f1f1f1] hover:text-black"
            aria-label="Close hire modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          <div className="rounded-2xl bg-[#f7f7f7] p-4">
            <div className="grid grid-cols-2 gap-4">
              <ModalInfo label="Location" value={driver.location} />

              <ModalInfo
                label="Experience"
                value={`${driver.experience} years`}
              />

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wide text-[#999]">
                  Rating
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#222]">
                  <Star className="h-3 w-3 fill-black text-black" />
                  {driver.rating}
                </p>
              </div>

              <ModalInfo label="Salary" value={driver.salary} strong />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#dedede] bg-[#f7f7f7] p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0a0a0a]" />

            <p className="text-[10px] leading-5 text-[#555]">
              This driver has a verified marketplace profile. You can continue
              the hiring conversation through the platform.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              alert(`Hiring request started for ${driver.name}`);
              onClose();
            }}
            className="mt-5 w-full rounded-xl bg-[#0a0a0a] py-3.5 text-xs font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#262626]"
          >
            Continue Hiring Request
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   MODAL INFO
============================================================ */

function ModalInfo({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-wide text-[#999]">
        {label}
      </p>

      <p
        className={`mt-1 text-xs ${
          strong ? "font-black text-[#0a0a0a]" : "font-bold text-[#222]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   MESSAGE MODAL
============================================================ */

function MessageModal({
  driver,
  onClose,
}: {
  driver: Driver;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    alert(`Message sent to ${driver.name}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 15,
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-[#e5e5e5] bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#eeeeee] p-5">
          <div>
            <h3 className="text-sm font-black text-[#0a0a0a]">
              Message Driver
            </h3>

            <p className="mt-1 text-[10px] text-[#888]">
              Start a conversation with {driver.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#888] transition hover:bg-[#f1f1f1]"
            aria-label="Close message modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-[#f7f7f7] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a0a0a] text-xs font-black text-white">
              {driver.initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-black text-[#0a0a0a]">
                {driver.name}
              </p>

              <p className="mt-0.5 truncate text-[10px] text-[#888]">
                {driver.role} • {driver.location}
              </p>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Write your message..."
            className="w-full resize-none rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-4 text-xs font-medium leading-5 text-[#0a0a0a] outline-none transition placeholder:text-[#999] focus:border-[#0a0a0a] focus:bg-white focus:ring-4 focus:ring-black/5"
          />

          <button
            type="button"
            disabled={!message.trim()}
            onClick={handleSend}
            className="mt-4 w-full rounded-xl bg-[#0a0a0a] py-3.5 text-xs font-bold text-white transition hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Message
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
