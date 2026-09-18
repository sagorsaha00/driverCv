"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/90 p-8 sm:p-12 shadow-sm"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            {/* Text Area */}
            <div>
              <h2 className="font-display text-xl font-black text-slate-900 sm:text-3xl">
                Need a Driver Today?
              </h2>
              <p className="mt-1.5 text-xs font-medium text-slate-600 sm:text-sm">
                Post your first job requirement and connect with verified
                drivers instantly.
              </p>
            </div>

            {/* Action Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#post-job"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
              >
                <span>Post a Driving Job</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
