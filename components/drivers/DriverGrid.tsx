import { AnimatePresence, motion } from "framer-motion";

import DriverCard from "./DriverCard";
import { Driver } from "../constant/driverData";

type Props = {
  drivers: Driver[];
  hasActiveFilters: boolean;
  resetFilters: () => void;
  onMessage: (driver: Driver) => void;
  onHire: (driver: Driver) => void;
};

export default function DriverGrid({
  drivers,
  hasActiveFilters,
  resetFilters,
  onMessage,
  onHire,
}: Props) {
  return (
    <section className="lg:col-span-9">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-600">
            Driver Marketplace
          </p>

          <h2 className="mt-1 text-sm font-bold text-text">
            {drivers.length} {drivers.length === 1 ? "Driver" : "Drivers"} Found
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="
              flex items-center gap-1.5
              text-[11px] font-semibold
              text-text-muted
              transition
              hover:text-primary
            "
          >
            Reset
          </button>
        )}
      </div>

      {drivers.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {drivers.map((driver, index) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                index={index}
                onMessage={() => onMessage(driver)}
                onHire={() => onHire(driver)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </section>
  );
}
