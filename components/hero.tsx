"use client";

import {
  ArrowRight,
  Building2,
  CarFront,
  CheckCircle2,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import HiringFlow from "./HiringFlow";
import JobSearch from "./JobSearch";

export default function Hero() {
  return (
    <main className="w-full bg-white text-[#111827]">
      <Navbar />

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative min-h-[calc(100vh-76px)] overflow-hidden"
      >
        {/* Subtle vertical grid */}

        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto grid h-full max-w-[1500px] grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="border-r border-slate-100" />

            <div className="hidden border-r border-slate-100 md:block" />

            <div className="hidden border-r border-slate-100 lg:block" />

            <div className="hidden border-r border-slate-100 lg:block" />

            <div />
          </div>
        </div>

        {/* Main Content */}

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] grid-cols-1 lg:grid-cols-2">
          {/* ================= LEFT ================= */}

          <HeroContent />

          {/* ================= RIGHT ================= */}

          <HiringFlow />
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   LEFT HERO CONTENT
============================================================ */

function HeroContent() {
  return (
    <div className="flex items-center border-slate-100 px-6 py-16 sm:px-10 lg:border-r lg:px-16 xl:px-20">
      <div className="w-full max-w-[620px]">
        {/* Small Label */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-7 flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 bg-emerald-500" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Driver hiring marketplace
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            text-[58px]
            font-black
            leading-[0.88]
            tracking-[-0.07em]
            text-[#101820]

            sm:text-[72px]

            lg:text-[78px]

            xl:text-[92px]
          "
        >
          Hiring
          <br />
          <span className="font-light text-[#9AA8B9]">Drivers</span>
          <br />
          <span className="font-light text-[#9AA8B9]">Made Easy</span>
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mt-8
            max-w-[440px]
            text-[14px]
            leading-[1.7]
            text-slate-500

            sm:text-[15px]
          "
        >
          Companies post driver jobs and discover qualified candidates. Drivers
          find real opportunities and connect directly with companies ready to
          hire.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          {/* Find Jobs */}

          <motion.a
            href="#drivers"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              flex
              items-center
              justify-center
              gap-3
              bg-[#1677E8]
              px-7
              rounded-m
              py-3.5
              text-[12px]
              font-bold
              text-white
              rounded-bl-2xl
              rounded-tr-2xl
              shadow-[0_10px_25px_rgba(22,119,232,0.18)]
            "
          >
            Find Driving Jobs
            <motion.span
              initial={{
                x: 0,
              }}
              whileHover={{
                x: 4,
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.a>

          {/* Hire */}

          <motion.a
            href="#post-job"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              border
               rounded-br-2xl
              rounded-tl-2xl
              border-slate-200
              bg-white
              px-7
              py-3.5
              text-[12px]
              font-bold
              text-slate-700
              transition-colors
              hover:border-slate-400
            "
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Hire a Driver
          </motion.a>
        </motion.div>

        {/* Small trust row */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-7"
        >
          <div className="flex -space-x-2">
            <Avatar color="bg-blue-100" />

            <Avatar color="bg-emerald-100" />

            <Avatar color="bg-orange-100" />

            <Avatar color="bg-purple-100" />
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-700">
              Drivers & companies
            </p>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Connecting directly
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   AVATAR
============================================================ */

function Avatar({ color }: { color: string }) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center border-2 border-white ${color}`}
    >
      <UserRound className="h-3.5 w-3.5 text-slate-600" />
    </div>
  );
}
