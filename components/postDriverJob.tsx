"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  Car,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  ShieldCheck,
} from "lucide-react";

// Sweden-specific dropdown options
const vehicleCategories = [
  "Personbil / Private Car (B)",
  "Lätt Lastbil / Light Truck (B)",
  "Tung Lastbil / Heavy Truck (C)",
  "Lastbil med Släp / Truck with Trailer (CE)",
  "Buss / Bus (D)",
  "Taxi (Taxiförarlegitimation)",
];

const swedenRegions = [
  "Stockholm",
  "Göteborg (Västra Götaland)",
  "Malmö (Skåne)",
  "Uppsala",
  "Östergötland",
  "Jönköping",
  "Halland",
  "Västmanland",
  "Gävleborg",
  "Hela Sverige / Nationwide",
];

const employmentTypes = [
  "Heltid (Full-time)",
  "Deltid (Part-time)",
  "Behovsanställning (On-demand / Hourly)",
  "Säsongsanställning (Seasonal)",
];

export default function PostDriverJob() {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    location: "Stockholm",
    vehicleRequired: "Tung Lastbil / Heavy Truck (C)",
    employmentType: "Heltid (Full-time)",
    workingHours: "Dagtid (Daytime shift)",
    salaryType: "Fast Månadslön (Fixed Monthly)",
    salaryAmount: "",
    startDate: "",
    jobDescription: "",
    requirements: "",
    requiresTKT: false, // Taxi driver badge requirement
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Post Submitted:", jobData);
    // Add your API call/post submission logic here
  };

  return (
    <div className="flex   items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              Post a Driver Vacancy
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Find qualified and verified drivers across Sweden
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span
              className={`h-1.5 w-16 rounded-full ${step >= 1 ? "bg-[#2563EB]" : "bg-slate-200"}`}
            />
            <span
              className={`h-1.5 w-16 rounded-full ${step >= 2 ? "bg-[#2563EB]" : "bg-slate-200"}`}
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <AnimatePresence mode="wait">
              {/* STEP 1: Basic Role & Requirements */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Step 1: Role Overview & Qualifications
                  </h3>

                  {/* Job Title */}
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Job Title (Befattning)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. C-Chaufför för Distribution"
                        value={jobData.jobTitle}
                        onChange={(e) =>
                          setJobData({ ...jobData, jobTitle: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Company Name (Företagsnamn)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nordic Logistics AB"
                        value={jobData.companyName}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* License Required & Region */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        License Required (Körkortsklass)
                      </label>
                      <select
                        value={jobData.vehicleRequired}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            vehicleRequired: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        {vehicleCategories.map((vehicle) => (
                          <option key={vehicle} value={vehicle}>
                            {vehicle}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Work Location (Län / Region)
                      </label>
                      <select
                        value={jobData.location}
                        onChange={(e) =>
                          setJobData({ ...jobData, location: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        {swedenRegions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Employment Type & Shift */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Employment Contract (Anställningsform)
                      </label>
                      <select
                        value={jobData.employmentType}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            employmentType: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        {employmentTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Work Shift (Arbetstider)
                      </label>
                      <select
                        value={jobData.workingHours}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            workingHours: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        <option>Dagtid (Day Shift)</option>
                        <option>Kväll / Natt (Evening & Night)</option>
                        <option>Helgarbete (Weekend Shifts)</option>
                        <option>Skiftarbete (Flexible Shifts)</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkbox for TKT requirement */}
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="tktCheck"
                      checked={jobData.requiresTKT}
                      onChange={(e) =>
                        setJobData({
                          ...jobData,
                          requiresTKT: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <label
                      htmlFor="tktCheck"
                      className="text-xs font-bold text-slate-700"
                    >
                      Requires Taxiförarlegitimation (TKT Badge)
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                  >
                    <span>Next: Salary & Job Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Salary, Description & Publish */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Step 2: Compensation & Description
                  </h3>

                  {/* Salary Structure */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Compensation Model
                      </label>
                      <select
                        value={jobData.salaryType}
                        onChange={(e) =>
                          setJobData({ ...jobData, salaryType: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        <option>Fast Månadslön (Fixed Monthly SEK)</option>
                        <option>Timlön (Hourly Wage SEK)</option>
                        <option>
                          Enligt Kollektivavtal (Collective Agreement)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Offered Amount (SEK)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. 32000 SEK / månad"
                          value={jobData.salaryAmount}
                          onChange={(e) =>
                            setJobData({
                              ...jobData,
                              salaryAmount: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                        />
                        <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Target Start Date (Startdatum)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={jobData.startDate}
                        onChange={(e) =>
                          setJobData({ ...jobData, startDate: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      />
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Job Description (Arbetsbeskrivning)
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe daily duties, routes, truck models, working conditions..."
                      value={jobData.jobDescription}
                      onChange={(e) =>
                        setJobData({
                          ...jobData,
                          jobDescription: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>

                  {/* Key Requirements */}
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Requirements & Certifications (Krav/YKB/YKB-kort)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Giltigt YKB, Truckkort A1-A4, Svenska i tal och skrift"
                      value={jobData.requirements}
                      onChange={(e) =>
                        setJobData({ ...jobData, requirements: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Publish Job Post</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
