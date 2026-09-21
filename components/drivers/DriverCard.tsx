import {
  Banknote,
  Briefcase,
  Check,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Driver } from "../constant/driverData";

type Props = {
  driver: Driver;
  index: number;
  onMessage: () => void;
  onHire: () => void;
};

export default function DriverCard({
  driver,
  index,
  onMessage,
  onHire,
}: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
      }}
      whileHover={{ y: -4 }}
      className="
        group flex h-full flex-col justify-between
        overflow-hidden rounded-xl
        border border-border
        bg-surface
        shadow-xs
        transition-all
        hover:border-primary-200
        hover:shadow-md
      "
    >
      <div className="p-5">
        {/* PROFILE */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
              relative flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              bg-primary-50
              text-xs font-bold
              text-primary-700
            "
            >
              {driver.initials}

              {driver.verified && (
                <div
                  className="
                  absolute -bottom-1 -right-1
                  flex h-5 w-5
                  items-center justify-center
                  rounded-full
                  border-2 border-white
                  bg-primary
                  text-white
                "
                >
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3
                className="
                truncate text-sm font-bold
                text-text
                transition-colors
                group-hover:text-primary-700
              "
              >
                {driver.name}
              </h3>

              <p className="mt-0.5 truncate text-[10px] font-medium text-text-subtle">
                {driver.role}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div
            className="
            flex shrink-0 items-center gap-1
            rounded-md
            border border-primary-100
            bg-primary-50
            px-2 py-1
          "
          >
            <Star className="h-3 w-3 fill-primary text-primary" />

            <span className="text-[10px] font-bold text-primary-800">
              {driver.rating}
            </span>
          </div>
        </div>

        {/* AVAILABLE */}
        <div
          className="
          mt-4 inline-flex items-center gap-1.5
          rounded-md
          bg-success-bg
          px-2.5 py-1.5
        "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="text-[10px] font-semibold text-success">
            {driver.available}
          </span>
        </div>

        {/* DETAILS */}
        <div
          className="
          mt-4 grid grid-cols-2 gap-2
          border-t border-border-subtle
          pt-4
        "
        >
          <div className="rounded-lg bg-surface-muted p-2.5">
            <div className="flex items-center gap-1.5 text-text-subtle">
              <MapPin className="h-3.5 w-3.5" />

              <span className="text-[9px] font-bold uppercase tracking-wide">
                Location
              </span>
            </div>

            <p className="mt-1 truncate text-[11px] font-semibold text-text">
              {driver.location}
            </p>
          </div>

          <div className="rounded-lg bg-surface-muted p-2.5">
            <div className="flex items-center gap-1.5 text-text-subtle">
              <Briefcase className="h-3.5 w-3.5" />

              <span className="text-[9px] font-bold uppercase tracking-wide">
                Experience
              </span>
            </div>

            <p className="mt-1 text-[11px] font-semibold text-text">
              {driver.experience} years
            </p>
          </div>
        </div>

        {/* SALARY */}
        <div
          className="
          mt-3 flex items-center justify-between
          rounded-lg
          border border-border
          bg-surface-subtle
          px-3 py-2.5
        "
        >
          <div className="flex items-center gap-1.5">
            <Banknote className="h-3.5 w-3.5 text-primary" />

            <span className="text-[9px] font-bold uppercase tracking-wide text-text-subtle">
              Expected
            </span>
          </div>

          <span className="text-[11px] font-bold text-text">
            {driver.salary}
          </span>
        </div>

        {/* STATUS */}
        <div
          className="
          mt-3 flex items-center gap-1.5
          text-[10px] font-semibold
          text-text-muted
        "
        >
          <Clock className="h-3.5 w-3.5" />
          {driver.status}
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
        grid grid-cols-2 gap-2
        border-t border-border-subtle
        bg-surface-subtle
        p-4
      "
      >
        <button
          type="button"
          onClick={onMessage}
          className="
            flex items-center justify-center gap-1.5
            rounded-lg
            border border-border
            bg-surface
            py-2.5
            text-[10px] font-semibold
            text-text-muted
            transition
            hover:border-primary-200
            hover:bg-primary-50
            hover:text-primary-700
          "
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Message
        </button>

        <button
          type="button"
          onClick={onHire}
          className="
            flex items-center justify-center gap-1.5
            rounded-lg
            bg-primary
            py-2.5
            text-[10px] font-bold
            text-white
            shadow-sm
            transition
            hover:bg-primary-hover
            active:scale-[0.98]
          "
        >
          <UserCheck className="h-3.5 w-3.5" />
          Hire Now
        </button>
      </div>
    </motion.article>
  );
}
