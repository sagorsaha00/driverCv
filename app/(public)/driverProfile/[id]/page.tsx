"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Download,
  CheckCircle2,
  Award,
  CalendarCheck,
  Truck,
  BadgeCheck,
  TrendingUp,
  MessageSquare,
  Bookmark,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface License {
  name: string;
  status: string;
}

interface Experience {
  id: number;
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
}

interface Driver {
  id?: number | string;
  name: string;
  role: string;
  location: string;
  exp: string;
  rating: string;
  reviewCount: number;
  salary: string;
  verified: boolean;
  initials: string;
  phone: string;
  email: string;
  responseTime: string;
  availability: string;
  safetyScore: string;
  vehicleTypes: string[];
  languages: string[];
  about: string;
  licenses: License[];
  experience: Experience[];
  education: Education[];
}

interface DriverProfileProps {
  driver?: Partial<Driver>;
  onBack?: () => void;
}

const defaultDriver: Driver = {
  name: "Lars Lindqvist",
  role: "Heavy Truck Driver (CE) + YKB",
  location: "Stockholm, Sweden",
  exp: "8 Years",
  rating: "4.9",
  reviewCount: 24,
  salary: "38,000 SEK/mo",
  verified: true,
  initials: "LL",
  phone: "+46 70 123 4567",
  email: "lars.lindqvist@drivercvs.se",
  responseTime: "Usually replies in under 1 hour",
  availability: "Available Immediately",
  safetyScore: "Zero traffic violations / 8 yrs",

  vehicleTypes: [
    "Semi-trailer (Sveatruck)",
    "Refrigerated (Kyltransport)",
    "Tautliner",
    "ADR Tanker",
  ],

  languages: ["Swedish (Native)", "English (Fluent)", "Finnish"],

  about:
    "Professional commercial driver with over 8 years of heavy transport experience covering Nordic freight corridors. Clean safety record, valid digital tachograph driver card, updated YKB certification, and proficient with modern Volvo and Scania fleet telematics.",

  licenses: [
    {
      name: "Class CE (Heavy Freight & Trailer)",
      status: "Verified by Transportstyrelsen",
    },
    {
      name: "Class C (Heavy Rigid Truck)",
      status: "Verified",
    },
    {
      name: "YKB (Yrkeskompetensbevis)",
      status: "Valid until 2028",
    },
    {
      name: "Digital Tachograph Card (Förarkort)",
      status: "Active",
    },
    {
      name: "ADR General Cargo (Farligt gods)",
      status: "Verified",
    },
  ],

  experience: [
    {
      id: 1,
      company: "Nordic Logistics AB",
      location: "Stockholm",
      role: "Senior Freight Driver (CE)",
      period: "2021 - Present",
      type: "Full-time",
      highlights: [
        "Operated regular night freight corridors connecting Stockholm, Jönköping, and Gothenburg.",
        "Maintained a 99.8% on-time delivery metric with zero safety incidents across 350,000+ km.",
        "Handled daily vehicle safety logs and digital tachograph compliance.",
        "Ensured full compliance with EU driver hours and rest regulations.",
      ],
    },

    {
      id: 2,
      company: "Svea Cold Chain Distribution",
      location: "Uppsala",
      role: "Regional Temperature-Controlled Driver",
      period: "2018 - 2021",
      type: "Full-time",
      highlights: [
        "Operated refrigerated delivery trucks under strict temperature monitoring.",
        "Handled pharmaceutical and fresh grocery distribution to retail terminals.",
        "Managed automated reefers and digital temperature logging.",
        "Maintained accurate delivery documentation and vehicle inspection records.",
      ],
    },
  ],

  education: [
    {
      id: 1,
      institution: "Stockholm Transport Academy (Transportgymnasiet)",
      degree: "Commercial Vehicle Transport & Heavy Logistics",
      year: "2018",
    },
  ],
};

export default function DriverProfileView({
  driver,
  onBack,
}: DriverProfileProps) {
  const router = useRouter();

  const [interviewRequested, setInterviewRequested] = useState(false);
  const [saved, setSaved] = useState(false);

  const data: Driver = {
    ...defaultDriver,
    ...driver,
    vehicleTypes: driver?.vehicleTypes ?? defaultDriver.vehicleTypes,
    languages: driver?.languages ?? defaultDriver.languages,
    licenses: driver?.licenses ?? defaultDriver.licenses,
    experience: driver?.experience ?? defaultDriver.experience,
    education: driver?.education ?? defaultDriver.education,
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/ExploreDrivers");
    }
  };

  const handleDownloadCV = () => {
    alert("Downloading verified driver CV...");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-bold text-[#404040] shadow-sm transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Drivers
        </motion.button>

        {/* =====================================================
            PROFILE HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Decorative Background */}

          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#F1F1F1] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Driver Information */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}

              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#DADADA] bg-[#111111] text-2xl font-black text-white">
                {data.initials}

                {data.verified && (
                  <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#111111] ring-2 ring-white">
                    <BadgeCheck className="h-4 w-4 fill-[#111111]" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-[#111111] sm:text-2xl">
                    {data.name}
                  </h1>

                  {data.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#111111] px-2.5 py-1 text-[10px] font-bold text-white">
                      <ShieldCheck className="h-3 w-3" />
                      Verified Driver
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs font-bold text-[#111111] sm:text-sm">
                  {data.role}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#737373]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#737373]" />
                    {data.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-[#111111] text-[#111111]" />
                    <b className="text-[#111111]">{data.rating}</b>(
                    {data.reviewCount} employer reviews)
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {/* Availability */}

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DADADA] bg-[#F3F3F3] px-3 py-1 text-[10px] font-bold text-[#111111]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#111111]" />
                    {data.availability}
                  </span>

                  {/* Response */}

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F3F3] px-3 py-1 text-[10px] font-medium text-[#666666]">
                    <MessageSquare className="h-3 w-3 text-[#737373]" />
                    {data.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                QUICK ACTIONS
            ================================================== */}

            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-52">
              <button
                onClick={() => setInterviewRequested(true)}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#2A2A2A]"
              >
                <CalendarCheck className="h-4 w-4" />
                Contact & Hire
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${data.email}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] px-3 py-2.5 text-xs font-bold text-[#404040] transition-colors hover:bg-[#111111] hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>

                <button
                  aria-label="Save driver"
                  onClick={() => setSaved((prev) => !prev)}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 transition-colors ${
                    saved
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#E5E5E5] bg-[#F7F7F7] text-[#737373] hover:bg-[#111111] hover:text-white"
                  }`}
                >
                  <Bookmark
                    className={`h-3.5 w-3.5 ${saved ? "fill-white" : ""}`}
                  />
                </button>
              </div>

              <button
                onClick={handleDownloadCV}
                className="flex cursor-pointer items-center justify-center gap-1.5 pt-1 text-xs font-bold text-[#111111] transition-colors hover:text-[#666666]"
              >
                <Download className="h-3.5 w-3.5" />
                Download Verified CV
              </button>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* =================================================
              LEFT COLUMN
          ================================================== */}

          <div className="space-y-6 lg:col-span-8">
            {/* =================================================
                ABOUT
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                Driver Background & Summary
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-[#666666] sm:text-sm">
                {data.about}
              </p>

              {/* Vehicle Types */}

              <div className="mt-5">
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#999999]">
                  Vehicle Experience
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {data.vehicleTypes.map((vehicle) => (
                    <span
                      key={vehicle}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-1.5 text-xs font-medium text-[#404040]"
                    >
                      <Truck className="h-3.5 w-3.5 text-[#111111]" />
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* =================================================
                EXPERIENCE
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-[#EEEEEE] pb-3.5">
                <Briefcase className="h-4 w-4 text-[#111111]" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Driving Experience
                </h2>
              </div>

              <div className="mt-5 space-y-6">
                {data.experience.map((item) => (
                  <div
                    key={item.id}
                    className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-full before:w-[2px] before:bg-[#E5E5E5] last:before:hidden"
                  >
                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#111111]" />

                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h3 className="text-xs font-bold text-[#111111] sm:text-sm">
                        {item.role}
                      </h3>

                      <span className="text-[11px] font-semibold text-[#999999]">
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs font-semibold text-[#111111]">
                      {item.company}

                      <span className="font-normal text-[#999999]">
                        {" "}
                        • {item.location}
                      </span>
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-[#F1F1F1] px-2 py-0.5 text-[9px] font-semibold text-[#666666]">
                      {item.type}
                    </span>

                    <ul className="mt-3 space-y-1.5 text-xs text-[#666666]">
                      {item.highlights.map((point, idx) => (
                        <li
                          key={`${item.id}-${idx}`}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#737373]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* =================================================
                EDUCATION
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-[#EEEEEE] pb-3.5">
                <GraduationCap className="h-4 w-4 text-[#111111]" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Transport Certifications & Education
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] p-3.5"
                  >
                    <div>
                      <h3 className="text-xs font-bold text-[#111111]">
                        {edu.degree}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-[#737373]">
                        {edu.institution}
                      </p>
                    </div>

                    <span className="shrink-0 text-[11px] font-bold text-[#999999]">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div className="space-y-6 lg:col-span-4">
            {/* =================================================
                COMPLIANCE
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#DADADA] bg-[#111111] p-5 text-white"
            >
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-white" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                  Compliance Status
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/70">
                    Transportstyrelsen Validated
                  </span>

                  <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/70">
                    Background Record Cleared
                  </span>

                  <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/70">Safety Incident History</span>

                  <span className="font-bold text-white">0 Infractions</span>
                </div>
              </div>
            </motion.section>

            {/* =================================================
                QUICK OVERVIEW
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#111111]" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Quick Overview
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between gap-4 border-b border-[#EEEEEE] pb-2">
                  <span className="text-[#999999]">Commercial Experience</span>

                  <span className="font-bold text-[#111111]">{data.exp}</span>
                </div>

                <div className="flex justify-between gap-4 border-b border-[#EEEEEE] pb-2">
                  <span className="text-[#999999]">Expected Compensation</span>

                  <span className="font-bold text-[#111111]">
                    {data.salary}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-[#EEEEEE] pb-2">
                  <span className="text-[#999999]">Employment Type</span>

                  <span className="font-bold text-[#111111]">Full-time</span>
                </div>

                <div className="flex justify-between gap-4 border-b border-[#EEEEEE] pb-2">
                  <span className="text-[#999999]">Languages</span>

                  <span className="max-w-[60%] text-right font-bold text-[#111111]">
                    {data.languages.join(", ")}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#999999]">Dispatch Status</span>

                  <span className="font-bold text-[#111111]">Available</span>
                </div>
              </div>
            </motion.section>

            {/* =================================================
                LICENSES
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#111111]" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  License Endorsements
                </h2>
              </div>

              <div className="space-y-2">
                {data.licenses.map((license, index) => {
                  const verified =
                    license.status.toLowerCase().includes("verified") ||
                    license.status.toLowerCase().includes("active") ||
                    license.status.toLowerCase().includes("valid");

                  return (
                    <div
                      key={`${license.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] px-3 py-2.5"
                    >
                      <span className="text-xs font-semibold text-[#404040]">
                        {license.name}
                      </span>

                      <span
                        className={`shrink-0 text-[9px] font-bold ${
                          verified ? "text-[#111111]" : "text-[#737373]"
                        }`}
                      >
                        {license.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* =================================================
                DIRECT CONTACT
            ================================================== */}

            <motion.section
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm"
            >
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#111111]">
                Direct Contact
              </h2>

              <div className="space-y-3 text-xs text-[#404040]">
                <a
                  href={`tel:${data.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-[#111111]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#111111]" />
                  <span>{data.phone}</span>
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-[#111111]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#111111]" />

                  <span className="truncate">{data.email}</span>
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTACT / HIRE MODAL
      ====================================================== */}

      <AnimatePresence>
        {interviewRequested && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setInterviewRequested(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              {/* Modal Header */}

              <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111]">
                    <CalendarCheck className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#111111]">
                      Contact Driver
                    </h3>

                    <p className="text-[10px] text-[#999999]">
                      Start a hiring conversation
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInterviewRequested(false)}
                  className="cursor-pointer rounded-full p-2 text-[#999999] transition-colors hover:bg-[#F3F3F3] hover:text-[#111111]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Content */}

              <div className="mt-5">
                <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111111] font-bold text-white shadow-sm">
                      {data.initials}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#111111]">
                        {data.name}
                      </p>

                      <p className="text-xs text-[#737373]">{data.role}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#666666]">
                  Your hiring request will be sent to{" "}
                  <strong className="text-[#111111]">{data.name}</strong>. The
                  driver can respond through phone or your in-app messaging
                  system.
                </p>

                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E5E5] px-4 py-2.5 text-xs font-bold text-[#404040] transition-colors hover:bg-[#F7F7F7]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Driver
                  </a>

                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#2A2A2A]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Send Hiring Email
                  </a>
                </div>
              </div>

              {/* Modal Footer */}

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setInterviewRequested(false)}
                  className="cursor-pointer rounded-xl px-4 py-2 text-xs font-bold text-[#737373] transition-colors hover:bg-[#F3F3F3] hover:text-[#111111]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
