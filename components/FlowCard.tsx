"use client";

import { motion } from "framer-motion";

interface FlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FlowCard({
  children,
  className = "",
  delay = 0,
}: FlowCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: "easeOut",
      }}
      className={`
        border
        border-slate-100
        bg-white
        px-4
        py-3
        shadow-[0_10px_30px_rgba(15,23,42,0.07)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
