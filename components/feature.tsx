"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DarkFeatureSection() {
  return (
    <section className="bg-[#0F172A] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Text Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              — QUICK & EASY MATCHING
            </span>
            <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl lg:text-5xl">
              Your Vehicle. Your Schedule. <br />
              <span className="text-blue-400">The Right Driver.</span>
            </h2>
            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-400 sm:text-sm max-w-md">
              Hire vetted background-checked drivers seamlessly without hidden
              overheads or complicated recruitment processes.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Instant driver verification & license check</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Flexible hourly, daily, or full-time contracts</span>
              </li>
            </ul>

            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs font-extrabold text-slate-900 transition-all hover:bg-amber-300">
              <span>Post a Job Request</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Right Card UI Component */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-200">
                Create Job Post
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                Step 1 of 3
              </span>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="mb-1 block text-[10px] font-medium text-slate-400">
                  Driver License Category
                </label>
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-3 text-slate-200">
                  Heavy Freight Truck (CE License)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-3 text-slate-200">
                  <span className="block text-[9px] text-slate-400">
                    Duration
                  </span>
                  <b>Flexible Daily</b>
                </div>
                <div className="rounded-xl border border-slate-700/60 bg-slate-800/80 p-3 text-slate-200">
                  <span className="block text-[9px] text-slate-400">
                    Est. Pay Rate
                  </span>
                  <b className="text-emerald-400">€220 / day</b>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-600">
              Continue to Match Drivers →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
