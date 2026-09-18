"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

const vehicleCategories = [
  "Personbil / Private Car (B)",
  "Lätt Lastbil / Light Truck (B)",
  "Tung Lastbil / Heavy Truck (C)",
  "Lastbil med Släp / Truck with Trailer (CE)",
  "Buss / Bus (D)",
  "Taxi (Taxiförarlegitimation)",
  "Taxi (Taxiförarlegitimation - TKT)",
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

const workingHours = [
  "Dagtid (Day Shift)",
  "Kväll / Natt (Evening & Night Shift)",
  "Helgarbete (Weekend Shifts)",
  "Skiftarbete (Flexible Shifts)",
];

const salaryTypes = [
  "Fast Månadslön (Fixed Monthly SEK)",
  "Timlön (Hourly Wage SEK)",
  "Enligt Kollektivavtal (Collective Agreement)",
];

type JobData = {
  jobTitle: string;
  companyName: string;
  location: string;
  vehicleRequired: string;
  employmentType: string;
  workingHours: string;
  salaryType: string;
  salaryAmount: string;
  startDate: string;
  jobDescription: string;
  requirements: string;
  requiresTKT: boolean;
};

export default function PostDriverJob() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [jobData, setJobData] = useState<JobData>({
    jobTitle: "",
    companyName: "",
    location: "Stockholm",
    vehicleRequired: "Tung Lastbil / Heavy Truck (C)",
    employmentType: "Heltid (Full-time)",
    workingHours: "Dagtid (Day Shift)",
    salaryType: "Fast Månadslön (Fixed Monthly SEK)",
    salaryAmount: "",
    startDate: "",
    jobDescription: "",
    requirements: "Giltigt YKB, Digitalt Förarkort",
    requiresTKT: false,
  });

  const updateField = <K extends keyof JobData>(
    field: K,
    value: JobData[K]
  ) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (!jobData.jobTitle.trim()) {
      alert("Please enter a job title.");
      return;
    }

    if (!jobData.companyName.trim()) {
      alert("Please enter your company name.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jobData.salaryAmount.trim()) {
      alert("Please enter the offered salary.");
      return;
    }

    if (!jobData.jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    console.log("Job Post Submitted:", jobData);

    // Add your API call here
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Briefcase className="h-7 w-7" />
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Post a Driver Vacancy
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Find qualified and verified drivers across Sweden.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
            {isSubmitted ? (
              /* SUCCESS */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
                  Job Vacancy Published!
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                  Your post for{" "}
                  <strong className="text-slate-800">
                    {jobData.jobTitle}
                  </strong>{" "}
                  by{" "}
                  <strong className="text-slate-800">
                    {jobData.companyName}
                  </strong>{" "}
                  is now live. Verified drivers matching your requirements can
                  discover your vacancy.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => router.push("/EmployerJobFeed")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    View Job Feed
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      setJobData({
                        jobTitle: "",
                        companyName: "",
                        location: "Stockholm",
                        vehicleRequired:
                          "Tung Lastbil / Heavy Truck (C)",
                        employmentType: "Heltid (Full-time)",
                        workingHours: "Dagtid (Day Shift)",
                        salaryType:
                          "Fast Månadslön (Fixed Monthly SEK)",
                        salaryAmount: "",
                        startDate: "",
                        jobDescription: "",
                        requirements:
                          "Giltigt YKB, Digitalt Förarkort",
                        requiresTKT: false,
                      });
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Post Another Requirement
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          step >= 1
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        1
                      </span>

                      <span className="hidden text-xs font-bold text-slate-700 sm:block">
                        Role Basics
                      </span>
                    </div>

                    <div
                      className={`h-0.5 w-10 sm:w-16 ${
                        step >= 2 ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    />

                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          step >= 2
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        2
                      </span>

                      <span className="hidden text-xs font-bold text-slate-700 sm:block">
                        Compensation
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-xs text-slate-400">
                    Step {step} of 2
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-lg font-extrabold text-slate-900">
                            Role Overview
                          </h2>
                          <p className="mt-1 text-xs text-slate-500">
                            Tell drivers what position you are hiring for.
                          </p>
                        </div>

                        {/* Job Title */}
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-800">
                            Job Title
                          </label>

                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              type="text"
                              required
                              value={jobData.jobTitle}
                              onChange={(e) =>
                                updateField("jobTitle", e.target.value)
                              }
                              placeholder="e.g. C-Chaufför för Distribution"
                              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-800">
                            Company Name
                          </label>

                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              type="text"
                              required
                              value={jobData.companyName}
                              onChange={(e) =>
                                updateField("companyName", e.target.value)
                              }
                              placeholder="e.g. Nordic Logistics AB"
                              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            />
                          </div>
                        </div>

                        {/* License + Location */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              License Required
                            </label>

                            <select
                              value={jobData.vehicleRequired}
                              onChange={(e) =>
                                updateField(
                                  "vehicleRequired",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            >
                              {vehicleCategories.map((vehicle) => (
                                <option key={vehicle} value={vehicle}>
                                  {vehicle}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              Work Location
                            </label>

                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <select
                                value={jobData.location}
                                onChange={(e) =>
                                  updateField("location", e.target.value)
                                }
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                              >
                                {swedenRegions.map((region) => (
                                  <option key={region} value={region}>
                                    {region}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Employment + Shift */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              Employment Type
                            </label>

                            <select
                              value={jobData.employmentType}
                              onChange={(e) =>
                                updateField(
                                  "employmentType",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            >
                              {employmentTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              Work Shift
                            </label>

                            <select
                              value={jobData.workingHours}
                              onChange={(e) =>
                                updateField(
                                  "workingHours",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            >
                              {workingHours.map((hours) => (
                                <option key={hours} value={hours}>
                                  {hours}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* TKT */}
                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/40">
                          <input
                            type="checkbox"
                            checked={jobData.requiresTKT}
                            onChange={(e) =>
                              updateField(
                                "requiresTKT",
                                e.target.checked
                              )
                            }
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                          />

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              Taxi Badge Required
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Requires Taxiförarlegitimation (TKT).
                            </p>
                          </div>

                          <ShieldCheck className="ml-auto h-5 w-5 shrink-0 text-blue-500" />
                        </label>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
                        >
                          Continue to Compensation
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-lg font-extrabold text-slate-900">
                            Compensation & Job Details
                          </h2>

                          <p className="mt-1 text-xs text-slate-500">
                            Add salary, requirements and vacancy details.
                          </p>
                        </div>

                        {/* Salary */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              Compensation Model
                            </label>

                            <select
                              value={jobData.salaryType}
                              onChange={(e) =>
                                updateField(
                                  "salaryType",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            >
                              {salaryTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-800">
                              Offered Amount
                            </label>

                            <div className="relative">
                              <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                              <input
                                type="text"
                                required
                                value={jobData.salaryAmount}
                                onChange={(e) =>
                                  updateField(
                                    "salaryAmount",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. 34,000 SEK / month"
                                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Start Date */}
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-800">
                            Target Start Date
                          </label>

                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              type="date"
                              value={jobData.startDate}
                              onChange={(e) =>
                                updateField("startDate", e.target.value)
                              }
                              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                            />
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-800">
                            Requirements & Certifications
                          </label>

                          <input
                            type="text"
                            value={jobData.requirements}
                            onChange={(e) =>
                              updateField("requirements", e.target.value)
                            }
                            placeholder="e.g. YKB, Digital Driver Card, ADR..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="mb-2 block text-xs font-bold text-slate-800">
                            Job Description
                          </label>

                          <textarea
                            rows={5}
                            required
                            value={jobData.jobDescription}
                            onChange={(e) =>
                              updateField(
                                "jobDescription",
                                e.target.value
                              )
                            }
                            placeholder="Describe daily duties, routes, truck models, working conditions..."
                            className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                          />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:w-1/3"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </button>

                          <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] sm:w-2/3"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Publish Job Post
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}