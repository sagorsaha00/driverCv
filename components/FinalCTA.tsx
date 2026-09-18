"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="  px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{ duration: 0.4 }}
          className="
            relative overflow-hidden
            bg-[#808080]
             rounded-tr-2xl rounded-bl-2xl
            border border-blue-200/80 bg-gradient-to-r from-[#EEF5FF] via-[#EBF3FF] to-[#E3EFFF]
            p-6 sm:p-10 shadow-[0_10px_30px_rgba(22,119,232,0.08)]
            flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between
          "
        >
          {/* Subtle Background Decorative Shapes */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />

          {/* Left Content */}
          <div className="relative z-10 min-w-0">
            <div className="inline-flex items-center gap-1 rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-extrabold text-[#1677E8] mb-2 border border-blue-200/60">
              <Sparkles className="h-3 w-3" />
              <span>Get Started Today</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#101828]">
              Need a qualified driver?
            </h2>

            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
              Post your first driver job in under 2 minutes and start connecting
              immediately.
            </p>
          </div>

          {/* Right Action Button with custom rounded corners */}
          <div className="relative z-10 shrink-0">
            <motion.a
              href="#post-job"
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group inline-flex items-center justify-center gap-2.5
                rounded-bl-2xl rounded-tr-3xl rounded-tl-lg rounded-br-lg
                bg-[#6082B6] px-7 py-3.5
                text-xs font-bold text-white
                 hover:bg-[#7393B3]  
              "
            >
              <span>Post a driver job</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
