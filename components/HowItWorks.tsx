"use client";

import { Search, UsersRound, MessageCircle } from "lucide-react";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Describe your need",
    text: "Tell us the driver, location, experience and requirements.",
    icon: Search,
  },

  {
    number: "02",
    title: "Match the right driver",
    text: "Browse profiles that match your job requirements.",
    icon: UsersRound,
  },

  {
    number: "03",
    title: "Connect and hire",
    text: "Talk directly, review details and make your hire.",
    icon: MessageCircle,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#F5F8FC] px-5 py-16 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[900px]">
        <div className="text-center">
          <p
            className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-[#1677E8]
          "
          >
            Simple for everyone
          </p>

          <h2
            className="
            mt-2
            text-[27px]
            font-black
            tracking-[-0.04em]
            text-[#101828]
          "
          >
            Hiring made simpler
          </h2>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
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
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="
                  relative
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >
                <div className="flex items-start justify-between">
                  <div
                    className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    bg-[#EEF4FF]
                    text-[#1677E8]
                  "
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span
                    className="
                    text-[20px]
                    font-black
                    text-slate-200
                  "
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  className="
                  mt-7
                  text-[12px]
                  font-bold
                  text-slate-900
                "
                >
                  {step.title}
                </h3>

                <p
                  className="
                  mt-2
                  text-[10px]
                  leading-5
                  text-slate-400
                "
                >
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
