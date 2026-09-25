"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MessageSquare, PhoneCall, Send, X } from "lucide-react";
import { Driver } from "@/type/driver";
import { useAuthStore } from "@/store/authStore";
import { useSendMessage } from "@/lib/hook/useDashboard";

type MessageDriverModalProps = {
  driver: Driver;
  onClose: () => void;
};

export default function MessageDriverModal({
  driver,
  onClose,
}: MessageDriverModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { user } = useAuthStore();
  const sendMessageMutation = useSendMessage();

  const firstName = driver.fullname ? driver.fullname.split(" ")[0] : "Driver";
  const initials = driver.fullname
    ? driver.fullname
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DR";

  const handleSend = async () => {
    if (!message.trim() || sending) return;

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
        subject: subject.trim() || `Inquiry for ${driver.fullname}`,
        content: message.trim(),
      });

      setSent(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !sending) {
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
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-bold text-text">Message Driver</h2>
              <p className="mt-0.5 truncate text-[10px] text-text-subtle">
                Send a message to {driver.fullname}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="rounded-lg p-1.5 text-text-subtle transition hover:bg-surface-muted hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* DRIVER INFO & PHONE CALL */}
        <div className="mx-5 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-muted p-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-100 font-bold text-primary-800">
              {driver.ProfileImage ? (
                <img
                  src={driver.ProfileImage}
                  alt={driver.fullname}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-text">
                {driver.fullname}
              </p>
              <p className="truncate text-[10px] text-text-subtle">
                {driver.regions?.join(", ") || "Nationwide"}
              </p>
            </div>
          </div>

          {/* HR Call Now */}
          <a
            href={`tel:${driver.phonenumber}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-success px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-success/90"
            title="Dial driver immediately"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Call Driver</span>
          </a>
        </div>

        {/* FORM */}
        <div className="overflow-y-auto px-5 py-5">
          {sent ? (
            <div className="my-6 rounded-xl border border-success/30 bg-success-bg p-6 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
              <p className="mt-2 text-sm font-bold text-text">Message Sent!</p>
              <p className="mt-1 text-xs text-text-muted">
                Your message has been dispatched to {driver.fullname}.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-text">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Job Opportunity in Dhaka"
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-bold text-text">Message *</label>
                  <span className="text-[10px] text-text-subtle">
                    {message.length}/1000
                  </span>
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  rows={5}
                  placeholder={`Hi ${firstName}, I am interested in discussing a driving opportunity...`}
                  className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-xs leading-5 text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!sent && (
          <div className="flex shrink-0 items-center justify-between border-t border-border-subtle bg-surface-subtle px-5 py-3.5">
            <span className="text-[10px] text-text-subtle">
              Direct and secure delivery
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={sending}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-muted hover:bg-surface-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim() || sending}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
