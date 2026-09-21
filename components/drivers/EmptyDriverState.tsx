import { RotateCcw, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyDriverState({
  resetFilters,
}: {
  resetFilters: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-xl
        border border-dashed border-border-strong
        bg-surface
        px-6 py-16
        text-center
      "
    >
      <div
        className="
        mx-auto flex h-14 w-14
        items-center justify-center
        rounded-xl
        bg-primary-50
        text-primary
      "
      >
        <Users className="h-7 w-7" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-text">
        No Verified Drivers Found
      </h3>

      <p
        className="
        mx-auto mt-2 max-w-sm
        text-xs leading-5
        text-text-muted
      "
      >
        We could not find drivers matching your current search and filter
        criteria.
      </p>

      <button
        type="button"
        onClick={resetFilters}
        className="
          mt-5 inline-flex items-center gap-2
          rounded-lg
          bg-primary
          px-5 py-2.5
          text-xs font-bold
          text-white
          transition
          hover:bg-primary-hover
        "
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset All Filters
      </button>
    </motion.div>
  );
}
