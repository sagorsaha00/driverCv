"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:px-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="
          mx-auto
          flex
          max-w-[900px]
          flex-col
          gap-5
          border
          border-blue-100
          bg-[#EEF5FF]
          px-6
          py-7

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2
            className="
            text-[17px]
            font-black
            tracking-[-0.03em]
            text-[#101828]
          "
          >
            Need a driver?
          </h2>

          <p className="mt-1 text-[10px] text-slate-500">
            Post your first driver job and start connecting.
          </p>
        </div>

        <motion.a
          href="#post-job"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-[#1677E8]
            px-6
            py-3
            text-[10px]
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(22,119,232,0.16)]
          "
        >
          Post a driver job
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
