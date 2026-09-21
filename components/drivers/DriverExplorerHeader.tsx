import { ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  count: number;
};

export default function DriverExplorerHeader({ count }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-7 sm:mb-8"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Driver Network
          </div>

          <h1 className="max-w-3xl text-2xl font-bold tracking-[-0.035em] text-text sm:text-3xl lg:text-4xl">
            Explore & Hire Verified Drivers
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
            Discover pre-screened commercial drivers available for immediate
            hiring across Sweden.
          </p>
        </div>

        {/* Available drivers */}
        <div className="hidden shrink-0 rounded-xl border border-border bg-surface px-5 py-4 shadow-xs sm:block">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
              <Users className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-text-subtle">
                Available Drivers
              </p>

              <p className="mt-0.5 text-lg font-bold tracking-tight text-text">
                {count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
