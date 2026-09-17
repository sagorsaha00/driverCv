"use client";

import { motion } from "framer-motion";

export default function FlowLine() {
  return (
    <svg
      viewBox="0 0 500 440"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Main connection line */}

      <motion.path
        d="
          M250 12

          C250 60
          250 70
          250 100

          C250 150
          80 145
          80 205

          C80 275
          420 250
          420 315

          C420 360
          250 350
          250 425
        "
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        strokeLinecap="round"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        animate={{
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          duration: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Animated travelling point */}

      <motion.circle
        r="4"
        fill="#2563EB"
        initial={{
          opacity: 0,
          offsetDistance: "0%",
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 2.2,
          delay: 0.2,
          ease: "easeInOut",
        }}
        style={{
          offsetPath: `path("M250 12 C250 60 250 70 250 100 C250 150 80 145 80 205 C80 275 420 250 420 315 C420 360 250 350 250 425")`,
        }}
      />
    </svg>
  );
}
