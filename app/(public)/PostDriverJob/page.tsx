"use client";

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Banknote,
  ShieldCheck,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PostDriverJob() {
  const [formData, setFormData] = useState({
    title: "",
    driverType: "Personal Chauffeur",
    location: "Stockholm",
    jobType: "Full-time",
    salaryMin: "",
    salaryMax: "",
    licenseRequired: "B Class",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6082B6]/20 bg-[#6082B6]/10 px-3.5 py-1.5 text-xs font-bold text-[#6082B6]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hire Verified Professional Drivers</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-[#36454F] sm:text-3xl">
            Post a Driver Job Offer
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Fill in the details below to connect with qualified drivers across
            Sweden.
          </p>
        </div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative overflow-hidden
            rounded-bl-3xl rounded-tr-3xl rounded-tl-xl rounded-br-xl
            border border-slate-200/80 bg-white p-6 sm:p-10
            shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          "
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#36454F]">
                Job Posted Successfully!
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Your offer is now live. Qualified drivers will start applying
                soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="mb-2 block text-xs font-bold text-[#36454F]">
                  Job Title
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Senior Heavy Truck Driver needed for intercity routes"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-[#36454F] placeholder:text-slate-400 focus:border-[#6082B6] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6082B6]"
                  />
                </div>
              </div>

              {/* Grid 1: Driver Type & Location */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-[#36454F]">
                    Driver Type
                  </label>
                  <select
                    value={formData.driverType}
                    onChange={(e) =>
                      setFormData({ ...formData, driverType: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-3.5 text-xs font-bold text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                  >
                    <option>Personal Chauffeur</option>
                    <option>Heavy Truck Driver (CE)</option>
                    <option>Delivery & Van Driver</option>
                    <option>Bus & Coach Driver (D)</option>
                    <option>Private Car Driver</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-[#36454F]">
                    Location / City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                    >
                      <option>Stockholm</option>
                      <option>Gothenburg</option>
                      <option>Malmö</option>
                      <option>Uppsala</option>
                      <option>Västerås</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid 2: License & Work Schedule */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-[#36454F]">
                    Required Driving License
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.licenseRequired}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          licenseRequired: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                    >
                      <option>Class B (Car / Light Van)</option>
                      <option>Class C (Medium/Heavy Truck)</option>
                      <option>Class CE (Heavy Truck + Trailer)</option>
                      <option>Class D (Bus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-[#36454F]">
                    Job Type
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.jobType}
                      onChange={(e) =>
                        setFormData({ ...formData, jobType: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contractual</option>
                      <option>Weekend Shift</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Expectation */}
              <div>
                <label className="mb-2 block text-xs font-bold text-[#36454F]">
                  Monthly Salary Range (SEK)
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <Banknote className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      placeholder="Min (e.g. 28000)"
                      value={formData.salaryMin}
                      onChange={(e) =>
                        setFormData({ ...formData, salaryMin: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <span className="text-slate-300 font-bold">-</span>
                  <div className="relative w-full">
                    <Banknote className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      placeholder="Max (e.g. 38000)"
                      value={formData.salaryMax}
                      onChange={(e) =>
                        setFormData({ ...formData, salaryMax: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-medium text-[#36454F] focus:border-[#6082B6] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="mb-2 block text-xs font-bold text-[#36454F]">
                  Job Description & Specific Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Mention working hours, route details, and any required background checks..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs font-medium text-[#36454F] placeholder:text-slate-400 focus:border-[#6082B6] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6082B6]"
                />
              </div>

              {/* Notice Box */}
              <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200/60 text-[11px] text-amber-800">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <p>
                  All driver job posts undergo background verification to ensure
                  security standards for both employers and drivers.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-bl-xl rounded-tr-2xl rounded-tl-md rounded-br-md
                    bg-[#6082B6] py-3.5
                    text-xs font-bold text-white shadow-md transition-all duration-200
                    hover:bg-[#4F71A5] hover:shadow-lg active:scale-[0.99]
                  "
                >
                  <Send className="h-4 w-4" />
                  <span>Publish Job Requirement</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
