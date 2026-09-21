"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MessageSquare, Send, X } from "lucide-react";

import type { Driver } from "../constant/driverData";

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

  const firstName = driver.name.split(" ")[0];

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    setSending(true);

    try {
      // TODO:
      // Replace this mock request with your real API call.
      //
      // const response = await fetch("/api/messages", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     driverId: driver.id,
      //     subject: subject.trim(),
      //     message: message.trim(),
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Failed to send message");
      // }

      await new Promise((resolve) => setTimeout(resolve, 700));

      setSubject("");
      setMessage("");

      onClose();
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
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !sending) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.97,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-driver-title"
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-lg
          flex-col
          overflow-hidden
          rounded-2xl
          border border-border
          bg-surface
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            flex shrink-0
            items-center justify-between
            border-b border-border-subtle
            px-5 py-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-lg
                bg-primary-50
                text-primary
              "
            >
              <MessageSquare className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2
                id="message-driver-title"
                className="
                  text-sm
                  font-bold
                  tracking-tight
                  text-text
                "
              >
                Message Driver
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-text-subtle
                "
              >
                Start a conversation with {driver.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            aria-label="Close message modal"
            className="
              shrink-0
              rounded-lg
              p-2
              text-text-subtle
              transition
              hover:bg-surface-muted
              hover:text-text
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* DRIVER INFO */}
        <div
          className="
            mx-5 mt-5
            flex min-w-0
            items-center gap-3
            rounded-xl
            border border-border
            bg-surface-muted
            p-3
          "
        >
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-lg
              bg-primary-100
              text-xs
              font-bold
              text-primary-800
            "
          >
            {driver.initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <p
                className="
                  min-w-0 truncate
                  text-xs
                  font-bold
                  text-text
                "
              >
                {driver.name}
              </p>

              {driver.verified && (
                <span
                  title="Verified driver"
                  className="
                    flex h-4 w-4 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-primary
                    text-white
                  "
                >
                  <CheckCircle2 className="h-3 w-3" />
                </span>
              )}
            </div>

            <p
              className="
                mt-0.5
                truncate
                text-[10px]
                text-text-subtle
              "
            >
              {driver.role} · {driver.location}
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="overflow-y-auto px-5 py-5">
          <div className="space-y-5">
            {/* SUBJECT */}
            <div>
              <label
                htmlFor="message-subject"
                className="
                  mb-2 block
                  text-[11px]
                  font-bold
                  text-text
                "
              >
                Subject
              </label>

              <div className="relative">
                <Mail
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-text-subtle
                  "
                />

                <input
                  id="message-subject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  maxLength={120}
                  placeholder="e.g. Driver position in Stockholm"
                  className="
                    w-full
                    rounded-lg
                    border border-border
                    bg-surface
                    py-3
                    pl-10 pr-3
                    text-xs
                    text-text
                    outline-none
                    transition
                    placeholder:text-text-subtle
                    focus:border-primary
                    focus:ring-4
                    focus:ring-[rgba(106,136,50,0.12)]
                  "
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="driver-message"
                  className="
                    text-[11px]
                    font-bold
                    text-text
                  "
                >
                  Message
                </label>

                <span
                  className="
                    text-[9px]
                    text-text-subtle
                  "
                >
                  {message.length}/1000
                </span>
              </div>

              <textarea
                id="driver-message"
                value={message}
                onChange={(event) => {
                  if (event.target.value.length <= 1000) {
                    setMessage(event.target.value);
                  }
                }}
                rows={6}
                placeholder={`Hi ${firstName}, I'm interested in discussing a driving opportunity with you...`}
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border border-border
                  bg-surface
                  px-3 py-3
                  text-xs
                  leading-5
                  text-text
                  outline-none
                  transition
                  placeholder:text-text-subtle
                  focus:border-primary
                  focus:ring-4
                  focus:ring-[rgba(106,136,50,0.12)]
                "
              />

              <div
                className="
                  mt-1.5
                  flex items-start gap-1.5
                  text-[9px]
                  leading-4
                  text-text-subtle
                "
              >
                <MessageSquare className="mt-0.5 h-3 w-3 shrink-0" />

                <span>
                  Keep your message professional and relevant to the driving
                  opportunity.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex shrink-0
            flex-col gap-3
            border-t border-border-subtle
            bg-surface-subtle
            px-5 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex items-center gap-2
              text-[9px]
              text-text-subtle
            "
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />

            <span>Your message will be sent securely.</span>
          </div>

          <div
            className="
              flex w-full gap-2
              sm:w-auto
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="
                flex-1
                rounded-lg
                border border-border
                bg-surface
                px-4 py-2.5
                text-[11px]
                font-semibold
                text-text-muted
                transition
                hover:border-primary-200
                hover:bg-primary-50
                hover:text-primary-700
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:flex-none
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5 py-2.5
                text-[11px]
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-primary-hover
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:flex-none
              "
            >
              {sending ? (
                <>
                  <span
                    className="
                      h-3.5 w-3.5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
