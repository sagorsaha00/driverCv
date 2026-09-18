"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="bg-zinc-50 py-16 sm:py-20 border-b border-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black p-8 sm:p-12 lg:p-14 shadow-2xl text-white"
        >
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            {/* Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1 text-[11px] font-bold text-zinc-300 border border-zinc-800">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
                <span>Zero Risk • Instant Dispatch Match</span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-white sm:text-4xl">
                Ready to Hire Verified Drivers or Find Your Next Shift?
              </h2>

              <p className="mt-3 text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
                Join over 1,200 logistics providers, transport firms, and
                certified drivers using DriverCVs across Sweden. Start your
                search in under 2 minutes.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  Free Job Posting
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                  Verified Driver Identities
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-white" />
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-black shadow-lg transition-all hover:bg-zinc-200"
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-zinc-800"
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
