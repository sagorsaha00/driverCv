"use client";

import { motion } from "framer-motion";
import { Search, Users, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Describe Your Needs",
    description:
      "Select vehicle type, location, working hours, pay rate, and whether a vehicle is provided.",
  },
  {
    number: "02",
    icon: Users,
    title: "Match the Right Driver",
    description:
      "Receive applications from verified drivers with the exact license class and availability.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Contact & Choose",
    description:
      "Review profiles, chat directly, and agree on terms with your selected driver hassle-free.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">
            — HOW IT WORKS
          </span>
          <h2 className="mt-2 font-display text-2xl font-black text-slate-900 sm:text-4xl">
            Easier for Both Sides
          </h2>
        </motion.div>

        {/* 3 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                {/* Step Number Backdrop */}
                <span className="absolute right-5 top-4 font-display text-2xl font-black text-slate-200/80">
                  {step.number}
                </span>

                {/* Icon Box */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-sm font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
