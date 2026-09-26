"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  Truck,
  PhoneCall,
  Mail,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Send,
  RefreshCw,
  Zap,
} from "lucide-react";
import { DriverNotification } from "@/type/dashboard";
import { DriverJob } from "@/type/job";

interface Props {
  notification: DriverNotification | null;
  onClose: () => void;
  onAccept?: (jobTitle: string, company: string) => void;
  onReplyMessage?: (hrPhone?: string, hrEmail?: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function InvitationJobDetailsModal({
  notification,
  onClose,
  onAccept,
  onReplyMessage,
}: Props) {
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!notification) {
      setJob(null);
      return;
    }

    const jobId = notification.referenceId;
    if (jobId && notification.type === "personal_offer" || notification.type === "job_post") {
      setLoading(true);
      fetch(`${API_URL}/api/driverJob/singleJob/${jobId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.job) {
            setJob(data.job);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch full job info:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setJob(null);
    }
  }, [notification]);

  if (!notification) return null;

  const handleAcceptClick = () => {
    setAccepted(true);
    if (onAccept && job) {
      onAccept(job.jobTitle, job.companyName || job.hr?.companyName);
    }
  };

  const hrPhone = job?.hr?.phoneNumber;
  const hrEmail = job?.hr?.email;
  const hrName = job?.hr?.name || job?.hr?.companyName;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border-2 border-border bg-surface shadow-2xl flex flex-col"
        >
          {/* Header Banner */}
          <div className="border-b-2 border-border bg-surface-subtle p-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                    {notification.type === "personal_offer" ? "Exclusive Direct Job Offer" : "Job Invitation"}
                  </span>
                  <span className="text-xs text-text-muted">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-black text-text mt-1">
                  {job?.jobTitle || notification.title}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  From: <strong>{job?.companyName || job?.hr?.companyName || "Verified Fleet Employer"}</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-2xl border-2 border-border bg-surface flex items-center justify-center text-text-muted hover:text-text hover:border-border-strong cursor-pointer transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 space-y-6 flex-1">
            {loading ? (
              <div className="py-12 text-center text-text-muted space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm font-bold">Loading full job details...</p>
              </div>
            ) : job ? (
              <>
                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-border bg-surface-subtle p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-text-muted block">
                      Location / Route
                    </span>
                    <p className="text-sm font-black text-text flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface-subtle p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-text-muted block">
                      Vehicle Required
                    </span>
                    <p className="text-sm font-black text-text flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{job.vehicleRequired}</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface-subtle p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-text-muted block">
                      Compensation
                    </span>
                    <p className="text-sm font-black text-green-700 flex items-center gap-1">
                      <Banknote className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{job.salaryAmount}</span>
                    </p>
                    <span className="text-[10px] text-text-muted block">{job.salaryType}</span>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface-subtle p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-text-muted block">
                      Shift / Hours
                    </span>
                    <p className="text-sm font-black text-text flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{job.workingHours || job.employmentType}</span>
                    </p>
                  </div>
                </div>

                {/* Recruiter Direct Contact Box */}
                <div className="rounded-3xl border-2 border-primary/30 bg-primary-50/40 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-black text-text">
                        Employer Contact Information
                      </span>
                    </div>
                    <span className="rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-[10px] font-bold">
                      Verified Contact
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                    {hrPhone && (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-border">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-text-muted block">
                            Direct Phone
                          </span>
                          <span className="font-bold text-text">{hrPhone}</span>
                        </div>
                        <a
                          href={`tel:${hrPhone}`}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-black text-white hover:bg-green-700 cursor-pointer shadow-xs"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    )}

                    {hrEmail && (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-border">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-text-muted block">
                            Email Address
                          </span>
                          <span className="font-bold text-text truncate max-w-[150px]">{hrEmail}</span>
                        </div>
                        <a
                          href={`mailto:${hrEmail}`}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-bold text-text hover:bg-surface-muted cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          <span>Email</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-text-muted mb-2">
                    Job Description & Offer Details
                  </h4>
                  <div className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-text whitespace-pre-wrap">
                    {job.jobDescription || notification.message}
                  </div>
                </div>

                {/* Requirements */}
                {job.requirements && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-text-muted mb-2">
                      Route Requirements
                    </h4>
                    <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-4 text-sm leading-relaxed text-text whitespace-pre-wrap">
                      {job.requirements}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Fallback if job details cannot be fetched */
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-surface-subtle p-5 space-y-2">
                  <h4 className="text-base font-black text-text">{notification.title}</h4>
                  <p className="text-sm leading-relaxed text-text whitespace-pre-wrap">
                    {notification.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t-2 border-border bg-surface-subtle p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border-2 border-border bg-surface px-5 py-3 text-xs font-bold text-text hover:bg-surface-muted cursor-pointer transition"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {hrPhone && (
                <a
                  href={`tel:${hrPhone}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-xs font-black text-white hover:bg-green-700 shadow-md cursor-pointer transition"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Call Employer Now</span>
                </a>
              )}

              {!accepted ? (
                <button
                  type="button"
                  onClick={handleAcceptClick}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-black text-white hover:bg-primary-hover shadow-md cursor-pointer transition"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Accept Offer / Contact</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-2xl bg-green-100 text-green-800 px-5 py-3 text-xs font-black">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Offer Accepted! Employer notified.</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
