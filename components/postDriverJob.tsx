"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Loader2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useAuthStore } from "@/store/authStore";

import type { HR } from "@/type/auth";
import { useCreateJob } from "@/lib/api/apiCall";

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

/* ============================================================
   TYPES
============================================================ */

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

/* ============================================================
   INITIAL DATA
============================================================ */

const createInitialJobData = (companyName = ""): JobData => ({
  jobTitle: "",
  companyName,

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

/* ============================================================
   COMPONENT
============================================================ */

export default function PostDriverJob() {
  const router = useRouter();

  /* ==========================================================
     AUTH
  ========================================================== */

  const user = useAuthStore((state) => state.user);

  const role = useAuthStore((state) => state.role);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hr: HR | null = role === "hr" && user ? (user as HR) : null;

  const createJobMutation = useCreateJob();

  const [step, setStep] = useState(1);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [publishedJobTitle, setPublishedJobTitle] = useState("");

  const [publishedCompanyName, setPublishedCompanyName] = useState("");

  const [jobData, setJobData] = useState<JobData>(() => createInitialJobData());
 

  useEffect(() => {
    if (!hr?.companyName) {
      return;
    }

    setJobData((prev) => ({
      ...prev,
      companyName: hr.companyName,
    }));
  }, [hr?.companyName]);

  /* ==========================================================
     PROTECT PAGE
  ========================================================== */

  useEffect(() => {
    /*
     * If Zustand already knows that this user
     * is authenticated but isn't HR,
     * they cannot access Post Job.
     */
    if (isAuthenticated && role !== "hr") {
      router.replace("/EmployerJobFeed");
    }
  }, [isAuthenticated, role, router]);

  /* ==========================================================
     UPDATE FIELD
  ========================================================== */

  const updateField = <K extends keyof JobData>(
    field: K,
    value: JobData[K],
  ) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /* ==========================================================
     STEP 1 VALIDATION
  ========================================================== */

  const handleNextStep = () => {
    setErrorMessage("");

    if (!jobData.jobTitle.trim()) {
      setErrorMessage("Please enter a job title.");

      return;
    }

    if (!hr) {
      setErrorMessage("Employer account information could not be found.");

      return;
    }

    setStep(2);
  };

  /* ==========================================================
     SUBMIT JOB
  ========================================================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    /* -----------------------------
       AUTH CHECK
    ------------------------------ */

    if (!isAuthenticated || role !== "hr" || !hr) {
      setErrorMessage(
        "Please login with an employer account to publish a job.",
      );

      return;
    }

    /* -----------------------------
       VALIDATION
    ------------------------------ */

    if (!jobData.jobTitle.trim()) {
      setErrorMessage("Please enter a job title.");

      setStep(1);

      return;
    }

    if (!jobData.salaryAmount.trim()) {
      setErrorMessage("Please enter the offered salary.");

      return;
    }

    if (!jobData.jobDescription.trim()) {
      setErrorMessage("Please enter a job description.");

      return;
    }

    /* -----------------------------
       CREATE JOB
    ------------------------------ */

    try {
      const response = await createJobMutation.mutateAsync({
        jobTitle: jobData.jobTitle.trim(),

        /*
         * Always use company from
         * authenticated HR.
         */
        companyName: hr.companyName,

        location: jobData.location,

        vehicleRequired: jobData.vehicleRequired,

        employmentType: jobData.employmentType,

        workingHours: jobData.workingHours,

        salaryType: jobData.salaryType,

        salaryAmount: jobData.salaryAmount.trim(),

        startDate: jobData.startDate || undefined,

        jobDescription: jobData.jobDescription.trim(),

        requirements: jobData.requirements.trim() || undefined,

        requiresTKT: jobData.requiresTKT,

        hrId: hr.id,
      });

      /*
       * Keep success information separately.
       * That way resetting form won't remove
       * success screen information.
       */
      setPublishedJobTitle(response.job.jobTitle);

      setPublishedCompanyName(response.job.companyName);

      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error("Create job error:", error);

      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.error;

        setErrorMessage(
          typeof backendMessage === "string"
            ? backendMessage
            : "Unable to publish the job.",
        );

        return;
      }

      setErrorMessage("Something went wrong while publishing the job.");
    }
  };

  /* ==========================================================
     POST ANOTHER JOB
  ========================================================== */

  const handlePostAnother = () => {
    setIsSubmitted(false);

    setStep(1);

    setErrorMessage("");

    setPublishedJobTitle("");

    setPublishedCompanyName("");

    setJobData(createInitialJobData(hr?.companyName || ""));
  };

  /* ==========================================================
     NOT AUTHENTICATED
  ========================================================== */

  if (!isAuthenticated) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-[var(--bg)] px-4 py-8">
        <div className="mx-auto flex min-h-[500px] max-w-xl items-center justify-center">
          <div className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-lg)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[var(--text)]">
              Employer Login Required
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Please sign in with your company account before publishing a
              driver vacancy.
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-6 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-bold text-[var(--on-primary)]"
            >
              Go to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     DRIVER ACCOUNT
  ========================================================== */

  if (role !== "hr" || !hr) {
    return <main className="min-h-[calc(100vh-65px)] bg-[var(--bg)]" />;
  }

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[var(--bg)] px-4 py-8 text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--primary)]">
              <Briefcase className="h-7 w-7" />
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-[var(--text)] sm:text-3xl">
              Post a Driver Vacancy
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Find qualified and verified drivers across Sweden.
            </p>
          </div>

          {/* =================================================
              CARD
          ================================================== */}

          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-lg)] sm:p-8">
            {isSubmitted ? (
              /* =============================================
                 SUCCESS
              ============================================== */

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--success-bg)] text-[var(--success)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="mt-5 text-2xl font-extrabold text-[var(--text)]">
                  Job Vacancy Published!
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--text-muted)]">
                  Your post for{" "}
                  <strong className="text-[var(--text)]">
                    {publishedJobTitle}
                  </strong>{" "}
                  by{" "}
                  <strong className="text-[var(--text)]">
                    {publishedCompanyName}
                  </strong>{" "}
                  is now live. Verified drivers matching your requirements can
                  discover your vacancy.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => router.push("/EmployerJobFeed")}
                    className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 py-3 text-sm font-bold text-[var(--on-primary)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]"
                  >
                    View Job Feed
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handlePostAnother}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-bold text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
                  >
                    Post Another Requirement
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* =============================================
                    PROGRESS
                ============================================== */}

                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          step >= 1
                            ? "bg-[var(--primary)] text-[var(--on-primary)]"
                            : "bg-[var(--surface-muted)] text-[var(--text-subtle)]"
                        }`}
                      >
                        1
                      </span>

                      <span className="hidden text-xs font-bold text-[var(--text)] sm:block">
                        Role Basics
                      </span>
                    </div>

                    <div
                      className={`h-0.5 w-10 transition-colors sm:w-16 ${
                        step >= 2
                          ? "bg-[var(--primary)]"
                          : "bg-[var(--border-subtle)]"
                      }`}
                    />

                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          step >= 2
                            ? "bg-[var(--primary)] text-[var(--on-primary)]"
                            : "bg-[var(--surface-muted)] text-[var(--text-subtle)]"
                        }`}
                      >
                        2
                      </span>

                      <span className="hidden text-xs font-bold text-[var(--text)] sm:block">
                        Compensation
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-xs text-[var(--text-subtle)]">
                    Step {step} of 2
                  </div>
                </div>

                {/* =============================================
                    ERROR
                ============================================== */}

                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -6,
                      }}
                      className="mb-5 rounded-[var(--radius-md)] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =============================================
                    FORM
                ============================================== */}

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* =========================================
                        STEP 1
                    ========================================== */}

                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-lg font-extrabold text-[var(--text)]">
                            Role Overview
                          </h2>

                          <p className="mt-1 text-xs text-[var(--text-muted)]">
                            Tell drivers what position you are hiring for.
                          </p>
                        </div>

                        {/* JOB TITLE */}

                        <div>
                          <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                            Job Title
                          </label>

                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />

                            <input
                              type="text"
                              required
                              value={jobData.jobTitle}
                              onChange={(e) =>
                                updateField("jobTitle", e.target.value)
                              }
                              placeholder="e.g. C-Chaufför för Distribution"
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-sm font-medium text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                            />
                          </div>
                        </div>

                        {/* COMPANY */}

                        <div>
                          <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                            Company Name
                          </label>

                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />

                            <input
                              type="text"
                              value={hr.companyName}
                              readOnly
                              className="w-full cursor-not-allowed rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] py-3 pl-10 pr-4 text-sm font-medium text-[var(--text)] outline-none"
                            />
                          </div>

                          <p className="mt-1.5 text-[10px] font-medium text-[var(--text-subtle)]">
                            Company information is automatically loaded from
                            your employer account.
                          </p>
                        </div>

                        {/* LICENSE + LOCATION */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              License Required
                            </label>

                            <select
                              value={jobData.vehicleRequired}
                              onChange={(e) =>
                                updateField("vehicleRequired", e.target.value)
                              }
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                            >
                              {vehicleCategories.map((vehicle) => (
                                <option key={vehicle} value={vehicle}>
                                  {vehicle}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              Work Location
                            </label>

                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />

                              <select
                                value={jobData.location}
                                onChange={(e) =>
                                  updateField("location", e.target.value)
                                }
                                className="w-full appearance-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-3 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
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

                        {/* EMPLOYMENT + SHIFT */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              Employment Type
                            </label>

                            <select
                              value={jobData.employmentType}
                              onChange={(e) =>
                                updateField("employmentType", e.target.value)
                              }
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                            >
                              {employmentTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              Work Shift
                            </label>

                            <select
                              value={jobData.workingHours}
                              onChange={(e) =>
                                updateField("workingHours", e.target.value)
                              }
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
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

                        <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]">
                          <input
                            type="checkbox"
                            checked={jobData.requiresTKT}
                            onChange={(e) =>
                              updateField("requiresTKT", e.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 rounded accent-[var(--primary)]"
                          />

                          <div>
                            <p className="text-sm font-bold text-[var(--text)]">
                              Taxi Badge Required
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                              Requires Taxiförarlegitimation (TKT).
                            </p>
                          </div>

                          <ShieldCheck className="ml-auto h-5 w-5 shrink-0 text-[var(--primary-500)]" />
                        </label>

                        {/* NEXT */}

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] py-3.5 text-sm font-bold text-[var(--on-primary)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--primary-hover)] active:scale-[0.99] active:bg-[var(--primary-active)]"
                        >
                          Continue to Compensation
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* =========================================
                        STEP 2
                    ========================================== */}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-lg font-extrabold text-[var(--text)]">
                            Compensation & Job Details
                          </h2>

                          <p className="mt-1 text-xs text-[var(--text-muted)]">
                            Add salary, requirements and vacancy details.
                          </p>
                        </div>

                        {/* SALARY */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              Compensation Model
                            </label>

                            <select
                              value={jobData.salaryType}
                              onChange={(e) =>
                                updateField("salaryType", e.target.value)
                              }
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                            >
                              {salaryTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                              Offered Amount
                            </label>

                            <div className="relative">
                              <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />

                              <input
                                type="text"
                                required
                                value={jobData.salaryAmount}
                                onChange={(e) =>
                                  updateField("salaryAmount", e.target.value)
                                }
                                placeholder="e.g. 34,000 SEK / month"
                                className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-sm font-medium text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* START DATE */}

                        <div>
                          <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                            Target Start Date
                          </label>

                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />

                            <input
                              type="date"
                              value={jobData.startDate}
                              onChange={(e) =>
                                updateField("startDate", e.target.value)
                              }
                              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-sm font-medium text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                            />
                          </div>
                        </div>

                        {/* REQUIREMENTS */}

                        <div>
                          <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                            Requirements & Certifications
                          </label>

                          <input
                            type="text"
                            value={jobData.requirements}
                            onChange={(e) =>
                              updateField("requirements", e.target.value)
                            }
                            placeholder="e.g. YKB, Digital Driver Card, ADR..."
                            className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                          />
                        </div>

                        {/* DESCRIPTION */}

                        <div>
                          <label className="mb-2 block text-xs font-bold text-[var(--text)]">
                            Job Description
                          </label>

                          <textarea
                            rows={5}
                            required
                            value={jobData.jobDescription}
                            onChange={(e) =>
                              updateField("jobDescription", e.target.value)
                            }
                            placeholder="Describe daily duties, routes, truck models, working conditions..."
                            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-medium leading-6 text-[var(--text)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--focus-ring)]"
                          />
                        </div>

                        {/* BUTTONS */}

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                          <button
                            type="button"
                            disabled={createJobMutation.isPending}
                            onClick={() => setStep(1)}
                            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3.5 text-sm font-bold text-[var(--text)] transition hover:bg-[var(--surface-muted)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/3"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </button>

                          <button
                            type="submit"
                            disabled={createJobMutation.isPending}
                            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] py-3.5 text-sm font-bold text-[var(--on-primary)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--primary-hover)] active:scale-[0.99] active:bg-[var(--primary-active)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-2/3"
                          >
                            {createJobMutation.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Publish Job Post
                              </>
                            )}
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
