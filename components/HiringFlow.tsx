"use client";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  MapPin,
  UserRound,
  UsersRound,
} from "lucide-react";

import { motion } from "framer-motion";
import FlowLine from "./FlowLine";
import FlowCard from "./FlowCard";
import IconBox from "./IconBox";
import MatchItem from "./MatchItem";

export default function HiringFlow() {
  return (
    <div className="flex items-center px-5 py-12 sm:px-10 lg:px-12 xl:px-16">
      <motion.div
        initial={{
          opacity: 0,
          x: 25,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative mx-auto w-full max-w-[650px]"
      >
        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <div
          className="
          relative
          min-h-[570px]
          overflow-hidden
          border
          border-slate-200
          bg-[#F5F6F8]
          p-5

          sm:p-8

          lg:p-9
        "
        >
          {/* ================= HEADER ================= */}

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p
                className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-slate-400
              "
              >
                Driver marketplace
              </p>

              <h2
                className="
                mt-2
                text-[20px]
                font-black
                tracking-[-0.04em]
                text-[#111827]

                sm:text-[24px]
              "
              >
                Find the right driver
              </h2>
            </div>

            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-slate-200
              bg-white
            "
            >
              <Building2 className="h-4 w-4 text-[#2563EB]" />
            </div>
          </div>

          {/* =================================================
              FLOW
          ================================================== */}

          <div className="relative mt-8 h-[440px]">
            {/* Animated SVG */}

            <FlowLine />

            {/* ================= JOB POST ================= */}

            <FlowCard
              delay={0.55}
              className="
                absolute
                left-1/2
                top-0
                rounded-br-2xl
                -translate-x-1/2
                w-[230px]
                -translate-x-1/2
              "
            >
              <div
                className="flex    items-center  rounded-bl-2xl
              rounded-tr-2xl gap-3"
              >
                <IconBox color="bg-[#111827]">
                  <BriefcaseBusiness className="h-4 w-4 text-white" />
                </IconBox>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    Company posts a job
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Driver required
                  </p>
                </div>
              </div>
            </FlowCard>

            {/* ================= DRIVER AVAILABLE ================= */}

            <FlowCard
              delay={0.9}
              className="
                absolute
                left-[2%]
                top-[15%]
                 rounded-br-2xl
              rounded-tl-2xl
                w-[185px]
              "
            >
              <div className="flex items-center gap-3">
                <IconBox color="bg-[#EEF4FF]">
                  <UserRound className="h-4 w-4 text-[#2563EB]" />
                </IconBox>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    Driver Available
                  </p>
                </div>
              </div>
            </FlowCard>

            {/* ================= MATCHING CARD ================= */}

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
                duration: 0.55,
                delay: 1.05,
              }}
              className="
                absolute
                left-1/2
                top-[28%]
                w-[96%]
                -translate-x-1/2
                border
                border-slate-200
                bg-white
                p-4

                sm:w-[90%]
                sm:p-5
              "
            >
              {/* Matching title */}

              <div className="mb-4  flex items-center justify-between">
                <div>
                  <p
                    className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-[#111827]
                  "
                  >
                    Smart driver matching
                  </p>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-1.5
                  text-[8px]
                  font-bold
                  text-emerald-600
                "
                >
                  <span className="h-1.5 w-1.5 bg-emerald-500" />
                  Matching
                </div>
              </div>

              {/* Color cards */}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <MatchItem
                  label="License Verified"
                  bg="bg-[#EAF9F2]"
                  icon="green"
                />

                <MatchItem
                  label="Identity Checked"
                  bg="bg-[#EEF4FF]"
                  icon="blue"
                />

                <MatchItem label="Experience" bg="bg-[#FFF5E8]" icon="orange" />

                <MatchItem
                  label="Location Match"
                  bg="bg-[#F5EDFF]"
                  icon="purple"
                />

                <MatchItem
                  label="Availability"
                  bg="bg-[#FFF9E8]"
                  icon="yellow"
                />

                <MatchItem
                  label="Profile Verified"
                  bg="bg-[#F0F3F7]"
                  icon="slate"
                />
              </div>
            </motion.div>

            {/* ================= COMPANY INTEREST ================= */}

            <FlowCard
              delay={1.45}
              className="
                absolute
                bottom-[16%]
                right-[2%]
                rounded-tl-2xl
                w-[205px]
              "
            >
              <div className="flex    items-center gap-3">
                <IconBox color="bg-[#F5EDFF]">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </IconBox>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    Company Interested
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Profile reviewed
                  </p>
                </div>
              </div>
            </FlowCard>

            {/* ================= DRIVER SELECTED ================= */}

            <FlowCard
              delay={1.6}
              className="
                absolute
                bottom-[17%]
                rounded-tr-2xl
                rounded-bl-2xl
                left-[2%]
                w-[190px]
              "
            >
              <div className="flex items-center gap-3">
                <IconBox color="bg-[#EAF9F2]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </IconBox>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    Driver Selected
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Ready to hire
                  </p>
                </div>
              </div>
            </FlowCard>

            {/* ================= FINAL ================= */}

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
                duration: 0.5,
                delay: 1.9,
              }}
              className="
                absolute
                bottom-0
                left-1/2
                -translate-x-1/2
               
              "
            >
              <div
                className="
                flex
                items-center
                gap-2
                bg-[#111827]
                px-7
                py-3.5
                text-white
                 rounded-bl-2xl
                 rounded-tr-2xl
                 cursor-pointer
                shadow-[0_12px_30px_rgba(15,23,42,0.16)]
              "
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                <span className="text-[10px] font-bold">Driver Hired</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
