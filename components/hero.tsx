"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = new URLSearchParams();
    if (keyword.trim()) query.set("q", keyword.trim());
    if (location.trim()) query.set("loc", location.trim());
    router.push(`/ExploreDrivers?${query.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    router.push(`/ExploreDrivers?role=${encodeURIComponent(cat)}`);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading & Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-zinc-900 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-black animate-pulse" />
            <ShieldCheck className="h-3.5 w-3.5 text-black" />
            <span>Over 4,500+ Verified Professional Drivers</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
            Hire Trusted Drivers. <br />
            <span className="text-zinc-500">Verified, Fast, Reliable.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-xs font-normal leading-relaxed text-zinc-600 sm:text-sm md:text-base">
            Whether you need a heavy freight operator (CE), delivery van driver,
            or executive chauffeur — connect directly with verified candidates
            across Sweden.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/ExploreDrivers")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-zinc-800 cursor-pointer"
            >
              <span>Explore Verified Drivers</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/EmployerJobFeed")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-xs font-bold text-zinc-900 shadow-2xs transition-all hover:bg-zinc-100 hover:border-zinc-400 cursor-pointer"
            >
              <span>I Am Looking for Driving Jobs</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Search Console */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 sm:p-4 shadow-xl shadow-zinc-200/50 backdrop-blur-md"
        >
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-12"
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-3 transition-colors focus-within:border-black sm:col-span-5">
              <Search className="h-4 w-4 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Role, license type (CE, D, Taxi)..."
                className="w-full bg-transparent text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-3 transition-colors focus-within:border-black sm:col-span-4">
              <MapPin className="h-4 w-4 shrink-0 text-zinc-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Stockholm, Gothenburg, Malmö..."
                className="w-full bg-transparent text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 transition-all hover:bg-zinc-800 active:scale-[0.99] sm:col-span-3 cursor-pointer"
            >
              <span>Search Drivers</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Popular Categories Shortcut */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-zinc-200 sm:justify-start">
            <span className="text-[11px] font-semibold text-zinc-500 mr-1">
              Popular:
            </span>
            {[
              "Heavy Truck (CE)",
              "Delivery Van (B)",
              "Bus Chauffeur (D)",
              "Taxi (TKT)",
              "Personal Driver",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:border-black hover:text-black cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Value Prop Proof Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">100% Verified</p>
              <p className="text-[10px] text-zinc-500">
                Licenses & background check
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">Immediate Match</p>
              <p className="text-[10px] text-zinc-500">
                Average hire in &lt; 24 hrs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <Star className="h-5 w-5 fill-zinc-900 text-zinc-900" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">4.9/5 Rating</p>
              <p className="text-[10px] text-zinc-500">From 1,200+ employers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">Direct Contact</p>
              <p className="text-[10px] text-zinc-500">
                Zero middleman friction
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
