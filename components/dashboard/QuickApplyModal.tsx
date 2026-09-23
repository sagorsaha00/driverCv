"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  MapPin,
  Briefcase,
  CheckCircle2,
  Send,
  Award,
  Truck,
  FileCheck2,
} from "lucide-react";
import { useState } from "react";
import type { JobPostingItem } from "./types";

interface QuickApplyModalProps {
  job: JobPostingItem | null;
  onClose: () => void;
  onSubmit: (jobTitle: string, company: string) => void;
}

export default function QuickApplyModal({
  job,
  onClose,
  onSubmit,
}: QuickApplyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(
    "Hello! I am a verified CE driver with active YKB through 2028. I am available for immediate commercial freight shifts and would welcome this route."
  );

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(job.title, "Nordic Logistics AB");
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F09]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-border bg-surface-subtle p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Truck className="h-3.5 w-3.5" />
                  Commercial Shift Application
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-text">
                  {job.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {job.routeLocation}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-text">{job.salary}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-colors hover:border-border-strong hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Attached Credentials Verified Box */}
            <div className="rounded-xl border border-border bg-surface-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text">
                  Verified Profile Credentials Attached
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success">
                  <ShieldCheck className="h-3 w-3" />
                  Transportstyrelsen Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary sm:grid-cols-3">
                <div className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface p-2 font-medium">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  <span>Class CE + C Driver</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface p-2 font-medium">
                  <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                  <span>YKB Valid 2028</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface p-2 font-medium col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span>Gen 2 Tacho Card</span>
                </div>
              </div>
            </div>

            {/* Note to Fleet Manager */}
            <div>
              <label
                htmlFor="driver-cover-note"
                className="block text-xs font-bold text-text mb-1.5"
              >
                Personal Note / Availability Details
              </label>
              <textarea
                id="driver-cover-note"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                className="w-full rounded-xl border border-border bg-surface p-3 text-xs text-text leading-relaxed outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Mention any route preferences, start date, or specific vehicle experience..."
              />
              <p className="mt-1 text-[11px] text-text-muted">
                Your verified Swedish phone, email, and digital license card will be securely transmitted to the fleet operator.
              </p>
            </div>

            {/* Swedish Collective Agreement Notice */}
            <div className="rounded-xl border border-primary/20 bg-primary-50/40 p-3 text-[11px] text-text-secondary flex items-start gap-2.5">
              <Briefcase className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>
                <strong>Swedish Collective Agreement (Kollektivavtal):</strong> This position complies with statutory driving & resting times (Vägtrafiklagen) and industry standard OB compensation.
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-text transition-colors hover:bg-surface-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover disabled:opacity-75"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 animate-bounce" />
                    Application Transmitted!
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Submit Application Direct
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
