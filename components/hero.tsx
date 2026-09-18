"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Professional Drivers
          </span>

          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Right Drivers. <br />
            <span className="text-[#2563EB]">On Your Terms.</span>
          </h1>

          <p className="mt-4 text-xs font-medium leading-relaxed text-slate-500 sm:text-sm md:text-base">
            Need a driver for a day, or looking for a full-time driving job?
            DriverCVs seamlessly connects verified drivers with top companies.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                router.push("/ExploreDrivers");
              }}
              className="rounded-full cursor-pointer bg-[#2563EB] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
            >
              I Need a Driver →
            </button>
            <button
              onClick={() => {
                router.push("/EmployerJobFeed");
              }}
              className="rounded-full cursor-pointer border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
            >
              I Am a Driver
            </button>
          </div>
        </motion.div>

        {/* Floating Search Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200/80 bg-white/90 p-3 sm:p-4 shadow-xl shadow-slate-200/50 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 border border-slate-100 sm:col-span-5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Title, license type, skill..."
                className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 border border-slate-100 sm:col-span-4">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Stockholm, Sweden"
                className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 sm:col-span-3">
              <span>Search Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Popular License Categories */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-slate-100">
            {[
              "Class CE Heavy Truck",
              "Delivery Van",
              "Personal Chauffeur",
              "Bus Driver (Class D)",
            ].map((cat, i) => (
              <span
                key={i}
                className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#2563EB]"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
