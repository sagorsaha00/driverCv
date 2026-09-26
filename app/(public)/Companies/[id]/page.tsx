"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  PhoneCall,
  ShieldCheck,
  User,
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  Lock,
  LogIn,
  RefreshCw,
  Copy,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSingleCompany } from "@/lib/hook/useCompanies";
import { useHrJobs } from "@/lib/hook/useDashboard";
import { useAuthStore } from "@/store/authStore";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SingleCompanyPage({ params }: Props) {
  const router = useRouter();
  const { id } = use(params);
  const companyId = Number(id);

  const [mounted, setMounted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: company,
    isLoading: loadingCompany,
    isError: companyError,
    refetch: refetchCompany,
  } = useSingleCompany(companyId);

  const {
    data: hrJobs = [],
    isLoading: loadingJobs,
  } = useHrJobs(companyId);

  // Filter out any personal direct offers so they are never public
  const publicCompanyJobs = hrJobs.filter(
    (job: any) => !job.isDirectOffer && !job.assignedDriverId
  );

  const handleCopyPhone = () => {
    if (company?.phoneNumber) {
      navigator.clipboard.writeText(company.phoneNumber);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // ========================================================
  // AUTHENTICATION GATE
  // ========================================================
  if (mounted && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-16 text-center font-sans">
        <div className="max-w-md w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-[var(--text)]">
            Login Required
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Please log in to your account to view this company&apos;s full fleet profile, recruiter direct phone number, email address, and active job postings.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => router.push(`/login?redirect=/Companies/${id}`)}
              className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Log In to View Company</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/Companies")}
              className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Companies</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // LOADING STATE
  // ========================================================
  if (loadingCompany) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-6 w-32 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
          <div className="h-48 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6" />
          <div className="h-64 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6" />
        </div>
      </div>
    );
  }

  // ========================================================
  // ERROR STATE
  // ========================================================
  if (companyError || !company) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-4 py-16 text-center font-sans">
        <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs">
          <Building2 className="mx-auto h-12 w-12 text-red-500 opacity-80" />
          <h2 className="mt-4 text-base font-bold text-[var(--text)]">Company Not Found</h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            We were unable to locate the details for this fleet company.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/Companies")}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Companies</span>
            </button>
            <button
              type="button"
              onClick={() => refetchCompany()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const initial = company.companyName?.charAt(0)?.toUpperCase() || "C";

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 font-sans text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/Companies"
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[var(--text-muted)] transition hover:text-primary no-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Companies</span>
          </Link>

          <span className="text-xs font-mono font-medium text-[var(--text-subtle)]">
            Company ID: #{company.id}
          </span>
        </div>

        {/* ========================================================
            COMPANY BANNER & CONTACT
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Identity Info */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-3xl font-black text-primary border border-primary/20">
                {initial}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
                    {company.companyName}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success border border-success/30">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Fleet Employer
                  </span>
                </div>

                <p className="mt-1 text-xs sm:text-sm font-semibold text-[var(--text-muted)]">
                  Registered Commercial Transport Provider
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--text-subtle)]">
                  <span className="flex items-center gap-1.5 font-medium text-[var(--text)]">
                    <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                    Org No: <span className="font-mono">{company.organizationNumber}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-medium text-[var(--text)]">
                    <User className="h-3.5 w-3.5 text-primary shrink-0" />
                    Contact: {company.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[var(--border-subtle)] md:border-t-0 md:pt-0">
              <div className="relative inline-flex items-center">
                <a
                  href={`tel:${company.phoneNumber}`}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-success px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-success/90 active:scale-95 no-underline"
                >
                  <PhoneCall className="h-4 w-4 animate-pulse" />
                  <span>Call: {company.phoneNumber}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="ml-1.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                  title="Copy Phone Number"
                >
                  <Copy className="h-4 w-4" />
                </button>

                {copiedPhone && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-[var(--text)] px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
                    Copied!
                  </span>
                )}
              </div>

              <a
                href={`mailto:${company.email}`}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-xs font-bold text-[var(--text)] transition hover:border-primary hover:bg-[var(--surface-muted)] no-underline"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            DETAILS GRID
        ========================================================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT 2 COLUMNS: OPEN JOBS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[var(--text)]">
                    Active Job Openings
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Public driver vacancies currently open at {company.companyName}
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {publicCompanyJobs.length} {publicCompanyJobs.length === 1 ? "Job" : "Jobs"}
                </span>
              </div>

              {loadingJobs ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--surface-muted)]" />
                  ))}
                </div>
              ) : publicCompanyJobs.length === 0 ? (
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-8 text-center">
                  <Briefcase className="mx-auto h-8 w-8 text-[var(--text-subtle)] opacity-50" />
                  <p className="mt-2 text-xs font-semibold text-[var(--text)]">
                    No active job vacancies at the moment
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                    You can call or email the recruiter directly using the contact details on this page.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {publicCompanyJobs.map((job: any) => (
                    <div
                      key={job.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 transition hover:border-primary/40 hover:bg-[var(--surface)]"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[var(--text)]">
                            {job.jobTitle}
                          </h3>
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {job.vehicleRequired}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-semibold text-[var(--text)]">
                            <Banknote className="h-3.5 w-3.5 text-primary shrink-0" />
                            {job.salaryAmount}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                            {job.workingHours || "Full-time"}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/EmployerJobFeed/${job.id}`}
                        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-95 no-underline shrink-0"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: RECRUITER & COMPANY INFO */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[var(--text)]">
                Recruiter Direct Contact
              </h2>

              <div className="space-y-3 text-xs">
                {/* Contact Name */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                      Hiring Manager / HR
                    </p>
                    <p className="font-bold text-[var(--text)]">{company.name}</p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                      Phone Number
                    </p>
                    <a
                      href={`tel:${company.phoneNumber}`}
                      className="font-mono font-bold text-[var(--text)] hover:text-primary transition"
                    >
                      {company.phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${company.email}`}
                      className="truncate block font-medium text-[var(--text)] hover:text-primary transition"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="rounded-2xl bg-primary/5 border border-primary/20 p-3.5 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    This company has verified business registration (Org: {company.organizationNumber}) and is authorized to hire drivers on DriverCVs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
