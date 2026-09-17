"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HiringCTA() {
  return (
    <section
      id="post-job"
      className="relative overflow-hidden bg-[#071A35] px-5 py-20 sm:px-8 lg:px-10"
    >
      {/* Background Accent Blur Glows */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-[#F8C94A] border border-amber-400/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FOR COMPANIES</span>
          </div>

          <h2 className="mt-4 max-w-md text-3xl font-black tracking-tight text-white sm:text-4xl sm:leading-tight">
            Your route. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              Your driver.
            </span>{" "}
            <br />
            Your choice.
          </h2>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
            Post your driver vacancy in minutes and connect directly with
            verified, qualified drivers ready to hit the road.
          </p>

          {/* Quick Perks List */}
          <div className="mt-6 space-y-2.5">
            {[
              "Instant driver matching",
              "Verified license check",
              "Zero hidden fees",
            ].map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-2 text-xs font-semibold text-slate-200"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <motion.a
            href="#post-job"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F8C94A] px-7 py-3.5 text-xs font-bold text-[#071A35] shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-300"
          >
            Post a driver job
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Right — Job Form Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative rounded-3xl border border-slate-700/50 bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-2xl"
        >
          {/* Top Card Bar Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#1677E8]">
                Quick Post
              </span>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                Post a driver vacancy
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#1677E8]">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
          </div>

          {/* Fake Input Fields */}
          <div className="mt-5 space-y-3">
            <FakeInput
              label="What driver do you need?"
              value="Truck Driver (Heavy Vehicle)"
            />

            <div className="grid grid-cols-2 gap-3">
              <FakeInput label="Location" value="Dhaka, Bangladesh" />
              <FakeInput label="Experience" value="3+ years minimum" />
            </div>

            <FakeInput
              label="Requirements"
              value="Valid professional heavy driving license"
            />
          </div>

          {/* Action Button */}
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677E8] py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600">
            <span>Continue to Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FakeInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 transition-colors hover:border-slate-300">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-slate-800">{value}</p>
    </div>
  );
}
