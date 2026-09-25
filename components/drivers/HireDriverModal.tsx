"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  PhoneCall,
  UserCheck,
  X,
} from "lucide-react";
import { Driver } from "@/type/driver";
import { useAuthStore } from "@/store/authStore";
import { useSendMessage } from "@/lib/hook/useDashboard";

type Props = {
  driver: Driver;
  onClose: () => void;
};

export default function HireDriverModal({ driver, onClose }: Props) {
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const { user } = useAuthStore();
  const sendMessageMutation = useSendMessage();

  const handleHireRequest = async () => {
    if (!jobTitle.trim() || sending) return;

    setSending(true);

    try {
      const senderHrId = user && "id" in user ? Number((user as any).id) : undefined;
      const senderName =
        user && "name" in user
          ? String((user as any).name)
          : user && "companyName" in user
          ? String((user as any).companyName)
          : "Fleet Recruiter";
      const senderCompany =
        user && "companyName" in user
          ? String((user as any).companyName)
          : "Fleet Operations";
      const senderPhone =
        user && "phoneNumber" in user ? String((user as any).phoneNumber) : undefined;
      const senderEmail =
        user && "email" in user ? String((user as any).email) : undefined;

      await sendMessageMutation.mutateAsync({
        senderHrId,
        senderName,
        senderCompany,
        senderPhone,
        senderEmail,
        receiverDriverId: Number(driver.id),
        subject: `Hiring Proposal: ${jobTitle.trim()} (${employmentType})`,
        content: `Position: ${jobTitle.trim()}\nType: ${employmentType}${
          startDate ? `\nStart Date: ${startDate}` : ""
        }\n\n${
          message.trim() ||
          "We would like to extend a hiring proposal for you to join our driving team."
        }`,
      });

      setSentSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (error) {
      console.error("Hire request failed:", error);
    } finally {
      setSending(false);
    }
  };

  const firstName = driver.fullname ? driver.fullname.split(" ")[0] : "Driver";
  const initials = driver.fullname
    ? driver.fullname
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DR";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <UserCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-text">Hire Driver</h2>
              <p className="mt-0.5 text-[10px] text-text-subtle">
                Send a formal hiring proposal or contact immediately
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-subtle transition hover:bg-surface-muted hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto px-5 py-5">
          {/* DRIVER SUMMARY & HR DIRECT CALL */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary-100 bg-primary-50 font-bold text-primary">
                {driver.ProfileImage ? (
                  <img
                    src={driver.ProfileImage}
                    alt={driver.fullname}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-text">
                  {driver.fullname}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-text-muted">
                  <MapPin className="h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{driver.regions?.join(", ") || "Nationwide"}</span>
                </p>
              </div>
            </div>

            {/* Direct Phone Dial Button */}
            <a
              href={`tel:${driver.phonenumber}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-success px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-success/90"
              title="Call driver directly"
            >
              <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
              <span>Call: {driver.phonenumber}</span>
            </a>
          </div>

          {/* SUCCESS MESSAGE */}
          {sentSuccess ? (
            <div className="my-8 rounded-xl border border-success/30 bg-success-bg p-6 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
              <p className="mt-2 text-sm font-bold text-text">Hiring Proposal Sent!</p>
              <p className="mt-1 text-xs text-text-muted">
                {driver.fullname} has been notified with your offer details.
              </p>
            </div>
          ) : (
            /* FORM */
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-text">
                  Position / Role Title *
                </label>
                <div className="relative">
                  <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Delivery Driver"
                    className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-xs text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-text">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface py-2.5 px-3 text-xs text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-text">
                    Desired Start Date
                  </label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-xs text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-text">
                  Note to Driver (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={`Hi ${firstName}, we would like to offer you a driving position...`}
                  className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-xs leading-5 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* Driver Key Metrics */}
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface-muted p-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-subtle">
                    Expected Salary
                  </span>
                  <p className="font-bold text-text">
                    ৳{Number(driver.targetMonthlySalary || 0).toLocaleString()} / mo
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-subtle">
                    Working Hours
                  </span>
                  <p className="font-bold text-text">{driver.workingHours || "8 Hours"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!sentSuccess && (
          <div className="flex shrink-0 items-center justify-between border-t border-border-subtle bg-surface-subtle px-5 py-3.5">
            <span className="text-[10px] text-text-subtle">
              Official inquiry via DriverCVs
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-muted hover:bg-surface-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleHireRequest}
                disabled={!jobTitle.trim() || sending}
                className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Proposal"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
