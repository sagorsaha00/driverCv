"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DarkFeatureSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-black py-16 text-white sm:py-24 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Text Box */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              <Sparkles className="h-3 w-3 text-white" />
              <span>Smart Verification &amp; Matching</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Vehicle. Your Schedule. <br />
              <span className="text-zinc-400">The Verified Driver.</span>
            </h2>

            <p className="mt-4 text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm max-w-lg">
              Hire vetted, background-checked professional drivers seamlessly
              without agency markups, long waiting periods, or complicated
              paperwork.
            </p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-zinc-300 font-medium">
                  Verified Swedish Transport Agency (Transportstyrelsen)
                  credentials
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-zinc-300 font-medium">
                  YKB certification, digital tachograph card, and criminal
                  record clearance
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-zinc-300 font-medium">
                  Flexible hiring: hourly on-call, daily freight shifts, or
                  permanent contracts
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/PostDriverJob")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-black shadow-lg shadow-white/5 transition-all hover:bg-zinc-200 cursor-pointer"
              >
                <span>Post a Driver Requirement</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <button
                onClick={() => router.push("/ExploreDrivers")}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <span>Browse Candidates</span>
              </button>
            </div>
          </motion.div>

          {/* Right Preview Card UI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white border border-zinc-800">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    Live Driver Match Simulation
                  </h3>
                  <p className="text-[10px] text-zinc-500">
                    Stockholm Region • Ready to Dispatch
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-bold text-white border border-zinc-700">
                Active Match
              </span>
            </div>

            <div className="mt-5 space-y-3.5 text-xs">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5">
                <span className="block text-[10px] font-semibold text-zinc-400">
                  Target License Category
                </span>
                <p className="mt-1 font-bold text-white">
                  Heavy Freight Truck (CE License) + YKB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5">
                  <span className="block text-[10px] font-semibold text-zinc-400">
                    Duration &amp; Shift
                  </span>
                  <p className="mt-1 font-bold text-white">
                    Flexible Shift / Full-time
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5">
                  <span className="block text-[10px] font-semibold text-zinc-400">
                    Est. Market Rate
                  </span>
                  <p className="mt-1 font-bold text-white">32,500 SEK / mo</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
                  <ShieldCheck className="h-4 w-4 text-white" />
                  <span>3 Candidates Passed Transportstyrelsen Checks</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-300">
                  98% Match
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/ExploreDrivers")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-bold text-black shadow-md transition-all hover:bg-zinc-200 cursor-pointer"
            >
              <span>Explore Matched Drivers Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
