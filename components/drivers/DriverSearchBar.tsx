import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  onOpenFilters: () => void;
};

export default function DriverSearchBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onOpenFilters,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="mb-6 rounded-xl border border-border bg-surface p-3 shadow-xs sm:p-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by driver name, role, city..."
            className="
              w-full rounded-lg
              border border-border
              bg-surface-subtle
              py-3 pl-10 pr-4
              text-xs font-medium text-text
              outline-none transition
              placeholder:text-text-subtle
              focus:border-primary
              focus:bg-white
              focus:ring-4
              focus:ring-[rgba(106,136,50,0.12)]
            "
          />
        </div>

        {/* Mobile filter */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="
            inline-flex items-center justify-center gap-2
            rounded-lg border border-border
            bg-surface px-4 py-3
            text-xs font-semibold text-text
            transition
            hover:border-primary-200
            hover:bg-primary-50
            hover:text-primary-700
            lg:hidden
          "
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] font-semibold text-text-subtle sm:block">
            Sort by
          </span>

          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                w-full appearance-none
                rounded-lg border border-border
                bg-surface py-3 pl-3 pr-9
                text-xs font-semibold text-text
                outline-none transition
                focus:border-primary
                focus:ring-4
                focus:ring-[rgba(106,136,50,0.12)]
                sm:w-auto
              "
            >
              <option value="rating">Highest Rated</option>

              <option value="experience">Most Experienced</option>

              <option value="salary">Salary: Low to High</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-subtle" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
