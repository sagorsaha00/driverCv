"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CheckCircle2, MapPin, ShieldCheck, X } from "lucide-react";

import { DriverJob } from "@/type/driverJob";

interface Props {
  job: DriverJob | null;
  onClose: () => void;
}

export default function JobApplicationModal({ job, onClose }: Props) {
  return (
    <AnimatePresence>
      {job && (
        <motion.div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-[var(--card,_#ffffff)]
              shadow-2xl
            "
          >
            {/* HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-[var(--border,_#e2e8f0)]
                p-5
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                  "
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <h3
                    className="
                      text-sm
                      font-black
                      text-[var(--foreground,_#0f172a)]
                    "
                  >
                    Ready to Apply
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[var(--muted-foreground,_#64748b)]
                    "
                  >
                    Review the selected position.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="
                  cursor-pointer
                  rounded-full
                  p-2
                  text-[var(--muted-foreground,_#94a3b8)]
                  transition

                  hover:bg-[var(--muted,_#f1f5f9)]
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* BODY */}

            <div className="p-5">
              <div
                className="
                  rounded-2xl
                  bg-[var(--muted,_#f1f5f9)]
                  p-4
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--muted-foreground,_#94a3b8)]
                  "
                >
                  Selected Position
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-black
                    text-[var(--foreground,_#0f172a)]
                  "
                >
                  {job.jobTitle}
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    font-semibold
                    text-[var(--muted-foreground,_#64748b)]
                  "
                >
                  {job.companyName}
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-1.5
                    text-[11px]
                    text-[var(--muted-foreground,_#64748b)]
                  "
                >
                  <MapPin className="h-3 w-3" />

                  {job.location}
                </div>
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-2
                  rounded-xl
                  border
                  border-[var(--primary,_#2563eb)]/20
                  bg-[var(--primary,_#2563eb)]/10
                  p-3
                "
              >
                <ShieldCheck
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-[var(--primary,_#2563eb)]
                  "
                />

                <p
                  className="
                    text-[10px]
                    leading-5
                    text-[var(--primary,_#2563eb)]
                  "
                >
                  Your verified driver profile will be used when applying for
                  this vacancy.
                </p>
              </div>
            </div>

            {/* FOOTER */}

            <div
              className="
                border-t
                border-[var(--border,_#e2e8f0)]
                bg-[var(--muted,_#f8fafc)]/50
                p-5
              "
            >
              <button
                type="button"
                className="
                  w-full
                  cursor-pointer
                  rounded-xl
                  bg-[var(--primary,_#2563eb)]
                  py-3
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:opacity-90
                "
              >
                Continue Application
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
