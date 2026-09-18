"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  FileCheck,
  CalendarCheck,
  CheckCircle2,
  Car,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const employerSteps = [
  {
    number: "01",
    icon: Search,
    title: "Post Your Requirement",
    description:
      "Specify license class (B, C, CE, D, TKT), shift requirements, location, vehicle ownership, and salary range.",
  },
  {
    number: "02",
    icon: Users,
    title: "Review Verified Matches",
    description:
      "Our system instantly checks license validity, YKB qualification, and criminal background checks on every applicant.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Direct Hire & Dispatch",
    description:
      "Message drivers directly, arrange trial days, and onboard your driver with clear compliance protection.",
  },
];

const driverSteps = [
  {
    number: "01",
    icon: FileCheck,
    title: "Create Driver Profile",
    description:
      "Upload your driving license, digital tachograph card, and YKB certificates to receive verified badge status.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Direct Jobs",
    description:
      "Filter jobs by region, vehicle type, hourly rate, or guaranteed monthly contract terms.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get Hired Faster",
    description:
      "Connect directly with logistics managers and vehicle fleet owners with prompt, secure payments.",
  },
];

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"employers" | "drivers">(
    "employers",
  );
  const steps = activeTab === "employers" ? employerSteps : driverSteps;

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            SIMPLE, TRANSPARENT WORKFLOW
          </span>
          <h2 className="mt-2 font-display text-2xl font-black text-black sm:text-4xl">
            How DriverCVs Works
          </h2>
          <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
            Whether you are expanding your commercial fleet or seeking your next
            driving role, we make the process friction-free.
          </p>

          {/* Toggle Switch */}
          <div className="mt-6 inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200">
            <button
              onClick={() => setActiveTab("employers")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "employers"
                  ? "bg-black text-white shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>For Employers &amp; Fleets</span>
            </button>
            <button
              onClick={() => setActiveTab("drivers")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "drivers"
                  ? "bg-black text-white shadow-xs"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>For Professional Drivers</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Step Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.number}
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-7 shadow-xs transition-all hover:bg-white hover:border-black hover:shadow-lg"
                >
                  {/* Step Number in Top Right */}
                  <span className="absolute right-5 top-5 font-display text-3xl font-black text-zinc-200 select-none">
                    {step.number}
                  </span>

                  {/* Icon Badge */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-md shadow-black/10">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Text Content */}
                  <h3 className="mt-5 font-display text-base font-bold text-black">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs font-normal leading-relaxed text-zinc-600">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Link
            href={
              activeTab === "employers" ? "/PostDriverJob" : "/EmployerJobFeed"
            }
            className="inline-flex items-center gap-2 text-xs font-bold text-black hover:text-zinc-600 transition-colors"
          >
            <span>
              {activeTab === "employers"
                ? "Start posting a driver vacancy now"
                : "Explore open driving vacancies"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
