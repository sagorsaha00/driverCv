"use client";

import {
  Truck,
  BusFront,
  PackageCheck,
  CarFront,
  ArrowRight,
  Car,
  HardHat,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

// আপনার ওয়েবসাইটের থিম অনুযায়ী ৪টি কালার ভ্যারিয়েন্ট
const cardVariants = [
  {
    // Blue Variant
    leftBorder: "bg-blue-500",
    iconBg: "bg-blue-50 text-blue-600",
    hoverShadow: "hover:shadow-[0_10px_25px_rgba(37,99,235,0.08)]",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    // Green Variant
    leftBorder: "bg-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-600",
    hoverShadow: "hover:shadow-[0_10px_25px_rgba(16,185,129,0.08)]",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    // Amber / Gold Variant
    leftBorder: "bg-amber-500",
    iconBg: "bg-amber-50 text-amber-600",
    hoverShadow: "hover:shadow-[0_10px_25px_rgba(245,158,11,0.08)]",
    badge: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    // Indigo / Violet Variant
    leftBorder: "bg-indigo-500",
    iconBg: "bg-indigo-50 text-indigo-600",
    hoverShadow: "hover:shadow-[0_10px_25px_rgba(99,102,241,0.08)]",
    badge: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
];

const categories = [
  {
    title: "Truck Driving",
    subtitle: "Long haul & freight",
    icon: Truck,
    count: "120+ Jobs",
    badge: "POPULAR",
  },
  {
    title: "Delivery & Courier",
    subtitle: "Parcel & food delivery",
    icon: PackageCheck,
    count: "85+ Jobs",
    badge: "HOT",
  },
  {
    title: "Bus & Transport",
    subtitle: "City & private coach",
    icon: BusFront,
    count: "40+ Jobs",
  },
  {
    title: "Van & Passenger",
    subtitle: "Shuttle & corporate",
    icon: CarFront,
    count: "60+ Jobs",
  },
  {
    title: "Taxi & Rideshare",
    subtitle: "Personal VIP transport",
    icon: Car,
    count: "95+ Jobs",
  },
  {
    title: "Heavy Equipment",
    subtitle: "Construction machinery",
    icon: HardHat,
    count: "30+ Jobs",
    badge: "HIGH PAY",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#1677E8]">
              <Sparkles className="h-3 w-3" />
              <span>Categories</span>
            </div>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900">
              Popular Roles
            </h2>
          </div>

          <a
            href="#jobs"
            className="group flex items-center gap-1 text-xs font-bold text-[#1677E8] transition-colors hover:text-blue-700"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const style = cardVariants[index % cardVariants.length];

            return (
              <motion.a
                href="#jobs"
                key={category.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                whileHover={{ y: -2 }}
                className={`
                  group relative flex items-center justify-between overflow-hidden
                  rounded-bl-2xl rounded-tr-xl border border-slate-200/90 bg-white p-2.5 pl-3
                  shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-200
                  hover:border-slate-300 ${style.hoverShadow}
                `}
              >
                {/* Content Left */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon with Rounded Left Border/Pill Effect */}
                  <div
                    className={`
                      relative flex h-10 w-11 shrink-0 items-center justify-center
                      rounded-l-2xl rounded-r-xl transition-transform duration-200
                      group-hover:scale-105 ${style.iconBg}
                    `}
                  >
                    {/* Color Bar Pill on Left Edge */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${style.leftBorder}`}
                    />
                    <Icon className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-xs font-bold text-slate-900">
                        {category.title}
                      </h3>

                      {category.badge && (
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider border ${style.badge}`}
                        >
                          {category.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="flex shrink-0 items-center gap-1.5 pl-2">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {category.count}
                  </span>

                  <div className="flex h-5 w-5 items-center justify-center rounded-full text-slate-300 transition-colors group-hover:bg-slate-100 group-hover:text-slate-600">
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
