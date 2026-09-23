"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import type { UserRole } from "@/type/auth";

interface RegisterSidebarProps {
  role: UserRole;
}

const driverFeatures = [
  {
    icon: BadgeCheck,
    title: "Professional profile",
    text: "Show your experience, licenses and qualifications.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Discover opportunities",
    text: "Find driving jobs that match your preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Build trust",
    text: "Create a verified and professional driver presence.",
  },
];

const employerFeatures = [
  {
    icon: Users,
    title: "Find qualified drivers",
    text: "Discover drivers based on skills and experience.",
  },
  {
    icon: ShieldCheck,
    title: "Professional profiles",
    text: "Review driver qualifications before reaching out.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Hire efficiently",
    text: "Connect with drivers who fit your requirements.",
  },
];

export default function RegisterSidebar({ role }: RegisterSidebarProps) {
  const features = role === "driver" ? driverFeatures : employerFeatures;

  return (
    <aside className="relative hidden w-[390px] shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--primary-800)] lg:flex xl:w-[440px]">
      {/* <div className="absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--primary-500)]/20" />
        <div className="absolute -bottom-32 -left-28 h-96 w-96 rounded-full bg-[var(--primary-700)]/70" />
      </div> */}

      <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-8 xl:p-11">
        <div>
          <div className="mb-14 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-white text-lg font-bold text-[var(--primary-700)] shadow-[var(--shadow-sm)]">
              H
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-white">
                HireDriver
              </p>

              <p className="text-xs text-white/50">Driver marketplace</p>
            </div>
          </div>

          <motion.div
            key={role}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/10">
                {role === "driver" ? (
                  <Truck className="h-5 w-5 text-white" />
                ) : (
                  <Building2 className="h-5 w-5 text-white" />
                )}
              </div>

              <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white xl:text-[38px]">
                {role === "driver"
                  ? "Your next driving opportunity starts here."
                  : "Find the right driver for your business."}
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                {role === "driver"
                  ? "Create your professional profile and connect with companies looking for experienced drivers."
                  : "Create your company profile and connect with qualified drivers across different regions."}
              </p>
            </div>

            <div className="space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.3,
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] border border-white/10 bg-white/5">
                      <Icon className="h-4 w-4 text-white" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <CheckCircle2 className="h-4 w-4" />
            Professional driver & employer network
          </div>
        </div>
      </div>
    </aside>
  );
}
