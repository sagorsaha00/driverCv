"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  FileText,
  Clock,
} from "lucide-react";
import { useState } from "react";
import type { CandidateItem } from "./types";

interface CandidateModalProps {
  candidate: CandidateItem | null;
  onClose: () => void;
  onInvite: (candidateName: string, role: string) => void;
}

export default function CandidateModal({
  candidate,
  onClose,
  onInvite,
}: CandidateModalProps) {
  const [invited, setInvited] = useState(false);
  const [inviteMessage, setInviteMessage] = useState(
    "Hi, we reviewed your verified driver profile and would like to invite you for an interview regarding our commercial fleet vacancies."
  );

  if (!candidate) return null;

  const handleSendInvite = () => {
    setInvited(true);
    setTimeout(() => {
      onInvite(candidate.name, candidate.appliedFor || "Commercial Driver");
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
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        >
          {/* Header Banner */}
          <div className="border-b border-border bg-surface-subtle p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-extrabold text-on-primary shadow-md">
                  {candidate.initials}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold tracking-tight text-text">
                      {candidate.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-success-border bg-success-bg px-2.5 py-0.5 text-[11px] font-bold text-success">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Transportstyrelsen Verified
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {candidate.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-text">
                      ★ {candidate.rating.toFixed(2)} Rating
                    </span>
                    <span>•</span>
                    <span className="text-primary font-bold">
                      {candidate.matchScore}% Route Match
                    </span>
                  </div>
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

          {/* Body Content */}
          <div className="max-h-[68vh] overflow-y-auto p-6 space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Experience
                </span>
                <p className="mt-1 text-base font-extrabold text-text">
                  {candidate.experienceYears} Years
                </p>
                <span className="text-[10px] text-text-muted">Nordic Highways</span>
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Target Salary
                </span>
                <p className="mt-1 text-base font-extrabold text-text">
                  {candidate.salaryExpectation.split("/")[0]}
                </p>
                <span className="text-[10px] text-text-muted">SEK / month</span>
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  YKB Validity
                </span>
                <p className="mt-1 text-base font-extrabold text-success">
                  {candidate.ykbValidUntil}
                </p>
                <span className="text-[10px] text-text-muted">Valid in EU</span>
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Availability
                </span>
                <p className="mt-1 text-base font-extrabold text-primary capitalize">
                  {candidate.availability.replace("_", " ")}
                </p>
                <span className="text-[10px] text-text-muted">Ready for dispatch</span>
              </div>
            </div>

            {/* License & Endorsements */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Driver Credentials & Permits
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {candidate.licenseClasses.map((lic) => (
                  <span
                    key={lic}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {lic}
                  </span>
                ))}

                {candidate.tachoCard && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-subtle px-3 py-1.5 text-xs font-bold text-text-secondary">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Digital Tachograph Card Gen 2
                  </span>
                )}

                {candidate.adrCert && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-warning-border bg-warning-bg px-3 py-1.5 text-xs font-bold text-warning">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    ADR Dangerous Goods Certified
                  </span>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Candidate Profile Summary
              </h4>
              <p className="mt-2 rounded-xl border border-border-subtle bg-surface-subtle p-4 text-xs leading-relaxed text-text-secondary sm:text-sm">
                &ldquo;{candidate.summary}&rdquo;
              </p>
            </div>

            {/* Direct Contact Info */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-subtle text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-text-muted">
                    Direct Phone
                  </span>
                  <p className="text-xs font-bold text-text">{candidate.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-subtle text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-text-muted">
                    Verified Email
                  </span>
                  <p className="text-xs font-bold text-text">{candidate.email}</p>
                </div>
              </div>
            </div>

            {/* Direct Invitation Message */}
            <div className="rounded-xl border border-primary/20 bg-primary-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Briefcase className="h-4 w-4" />
                <span>Invite to Dispatch Shift or Vacancy</span>
              </div>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={2}
                className="mt-2.5 w-full rounded-lg border border-border bg-surface p-2.5 text-xs text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Include customized dispatch notes or shift rate..."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-2.5 border-t border-border bg-surface-subtle p-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-text transition-colors hover:bg-surface-muted"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSendInvite}
              disabled={invited}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-on-primary shadow-sm transition-all hover:bg-primary-hover disabled:opacity-75"
            >
              {invited ? (
                <>
                  <CheckCircle2 className="h-4 w-4 animate-bounce" />
                  Invitation Dispatched!
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Dispatch Interview Invitation
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
