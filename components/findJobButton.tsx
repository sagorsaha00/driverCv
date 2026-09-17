"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CustomButton() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.a
        href="#drivers"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="
          group
          relative
          flex
          items-center
          justify-center
          gap-3
          bg-[#1677E8]
          px-8
          py-3.5
          text-[13px]
          font-bold
          text-white
          shadow-[0_10px_25px_rgba(22,119,232,0.25)]
          transition-all
          duration-300
        "
        style={{
          clipPath:
            "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%, 0% 12px)",
        }}
      >
        <span className="absolute left-0 top-0 h-3 w-3 bg-[#0d4ea3] opacity-80" />

        <span className="absolute right-0 top-0 h-3 w-3 bg-[#0d4ea3] opacity-80" />

        <span className="relative z-10 tracking-wide">Find Driving Jobs</span>

        <motion.span
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.span>
      </motion.a>
    </div>
  );
}
