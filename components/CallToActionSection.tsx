"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="bg-[var(--bg)] mb-4 ">
      <div className="mx-auto max-w-7xl px-4  ">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-tl-2xl rounded-br-3xl border border-lime-500/20 bg-lime-950/30 p-8 sm:p-12 lg:p-14   shadow-black/80 backdrop-blur-xl text-white"
        >
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-white sm:text-4xl leading-tight">
                Ready to Hire Verified Drivers or Find Your Next Shift?
              </h2>

              <p className="mt-3 text-xs font-normal leading-relaxed text-gray sm:text-sm">
                Join over 1,200 logistics providers, transport firms, and
                certified drivers using DriverCVs across Sweden. Start your
                search in under 2 minutes.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-black">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-lime-400" />
                  Free Job Posting
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-lime-400" />
                  Verified Driver Identities
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-lime-400" />
                  Direct Employer Communication
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/PostDriverJob"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-xs font-bold text-black    transition-all   active:translate-y-px"
                >
                  <span>Post a Driving Job</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-lime-900/60 bg-lime-950/40 px-6 py-3.5 text-xs font-bold text-lime-100 transition-all hover:bg-lime-900/50 backdrop-blur-md"
                >
                  <span>Register as Driver</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
