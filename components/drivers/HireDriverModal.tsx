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
  Send,
  UserCheck,
  X,
} from "lucide-react";

import { Driver } from "../constant/driverData";

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

  const handleHireRequest = async () => {
    if (!jobTitle.trim() || sending) return;

    setSending(true);

    try {
      // TODO:
      // Replace this with your real backend API.
      //
      // Example:
      //
      // const response = await fetch("/api/hire-requests", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     driverId: driver.id,
      //     jobTitle,
      //     employmentType,
      //     startDate,
      //     message,
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Failed to send hiring request");
      // }

      await new Promise((resolve) => setTimeout(resolve, 800));

      onClose();
    } catch (error) {
      console.error("Hire request failed:", error);
    } finally {
      setSending(false);
    }
  };

  const firstName = driver.name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-text/35
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 12,
          scale: 0.97,
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hire-driver-title"
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-2xl
          border border-border
          bg-surface
          shadow-lg
        "
      >
        {/* =========================================================
            HEADER
        ========================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b border-border-subtle
            px-5 py-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-lg
                bg-primary-50
                text-primary
              "
            >
              <UserCheck className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="hire-driver-title"
                className="
                  text-sm
                  font-bold
                  tracking-tight
                  text-text
                "
              >
                Hire Driver
              </h2>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-text-subtle
                "
              >
                Send a hiring request to this driver
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close hire modal"
            className="
              rounded-lg
              p-2
              text-text-subtle
              transition
              hover:bg-surface-muted
              hover:text-text
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =========================================================
            CONTENT
        ========================================================== */}

        <div
          className="
            overflow-y-auto
            px-5 py-5
            sm:px-6
          "
        >
          {/* DRIVER SUMMARY */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border border-border
              bg-surface-muted
              p-4
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              {/* Avatar */}

              <div
                className="
                  relative
                  flex h-12 w-12
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-primary-100
                  text-xs
                  font-bold
                  text-primary-800
                "
              >
                {driver.initials}

                {driver.verified && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      -right-1
                      flex h-5 w-5
                      items-center justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-primary
                      text-white
                    "
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                )}
              </div>

              {/* Driver info */}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-text
                    "
                  >
                    {driver.name}
                  </h3>

                  {driver.verified && (
                    <span
                      className="
                        hidden
                        shrink-0
                        items-center
                        gap-1
                        rounded-md
                        bg-success-bg
                        px-2 py-1
                        text-[9px]
                        font-bold
                        text-success
                        sm:inline-flex
                      "
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-text-muted
                  "
                >
                  {driver.role}
                </p>

                <div
                  className="
                    mt-1.5
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    text-text-subtle
                  "
                >
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{driver.location}</span>
                </div>
              </div>
            </div>

            {/* Availability */}

            <div
              className="
                hidden
                shrink-0
                flex-col
                items-end
                gap-1
                sm:flex
              "
            >
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[9px]
                  font-bold
                  text-success
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-success
                  "
                />
                Available
              </span>

              <span
                className="
                  text-[9px]
                  text-text-subtle
                "
              >
                {driver.available}
              </span>
            </div>
          </div>

          {/* FORM */}

          <div className="mt-6 space-y-5">
            {/* JOB TITLE */}

            <div>
              <label
                htmlFor="hire-job-title"
                className="
                  mb-2
                  block
                  text-[11px]
                  font-bold
                  text-text
                "
              >
                Position / Job Title
              </label>

              <div className="relative">
                <BriefcaseBusiness
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
                  id="hire-job-title"
                  type="text"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                  placeholder="e.g. Heavy Truck Driver"
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

            {/* EMPLOYMENT + DATE */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >
              {/* Employment Type */}

              <div>
                <label
                  htmlFor="employment-type"
                  className="
                    mb-2
                    block
                    text-[11px]
                    font-bold
                    text-text
                  "
                >
                  Employment Type
                </label>

                <div className="relative">
                  <BriefcaseBusiness
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

                  <select
                    id="employment-type"
                    value={employmentType}
                    onChange={(event) => setEmploymentType(event.target.value)}
                    className="
                      w-full
                      appearance-none
                      rounded-lg
                      border border-border
                      bg-surface
                      py-3
                      pl-10 pr-3
                      text-xs
                      font-medium
                      text-text
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-[rgba(106,136,50,0.12)]
                    "
                  >
                    <option value="Full-time">Full-time</option>

                    <option value="Part-time">Part-time</option>

                    <option value="Contract">Contract</option>

                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              {/* Start Date */}

              <div>
                <label
                  htmlFor="start-date"
                  className="
                    mb-2
                    block
                    text-[11px]
                    font-bold
                    text-text
                  "
                >
                  Preferred Start Date
                </label>

                <div className="relative">
                  <CalendarDays
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
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border border-border
                      bg-surface
                      py-3
                      pl-10 pr-3
                      text-xs
                      font-medium
                      text-text
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-[rgba(106,136,50,0.12)]
                    "
                  />
                </div>
              </div>
            </div>

            {/* MESSAGE */}

            <div>
              <label
                htmlFor="hire-message"
                className="
                  mb-2
                  block
                  text-[11px]
                  font-bold
                  text-text
                "
              >
                Message to Driver
                <span
                  className="
                    ml-1
                    font-normal
                    text-text-subtle
                  "
                >
                  (optional)
                </span>
              </label>

              <textarea
                id="hire-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder={`Hi ${firstName}, we'd like to discuss a ${driver.role} opportunity with you...`}
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
                  flex
                  items-center
                  gap-1.5
                  text-[9px]
                  text-text-subtle
                "
              >
                <MessageSquare className="h-3 w-3" />
                The driver will receive your hiring request.
              </div>
            </div>

            {/* DRIVER INFORMATION */}

            <div
              className="
                grid
                grid-cols-2
                gap-2
                sm:grid-cols-3
              "
            >
              {/* Experience */}

              <div
                className="
                  rounded-lg
                  border border-border-subtle
                  bg-surface-muted
                  p-3
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-text-subtle
                  "
                >
                  Experience
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    text-text
                  "
                >
                  {driver.experience} years
                </p>
              </div>

              {/* Salary */}

              <div
                className="
                  rounded-lg
                  border border-border-subtle
                  bg-surface-muted
                  p-3
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-text-subtle
                  "
                >
                  Expected Salary
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    text-text
                  "
                >
                  {driver.salary}
                </p>
              </div>

              {/* Response */}

              <div
                className="
                  col-span-2
                  rounded-lg
                  border border-border-subtle
                  bg-surface-muted
                  p-3
                  sm:col-span-1
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-text-subtle
                  "
                >
                  Response
                </p>

                <p
                  className="
                    mt-1
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-bold
                    text-success
                  "
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  Usually fast
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FOOTER
        ========================================================== */}

        <div
          className="
            flex
            shrink-0
            flex-col-reverse
            gap-3
            border-t border-border-subtle
            bg-surface-subtle
            px-5 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          {/* Secure message */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              text-text-subtle
            "
          >
            <Mail className="h-3.5 w-3.5" />
            Your request will be sent securely.
          </div>

          {/* Buttons */}

          <div
            className="
              flex
              w-full
              gap-2
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
                px-5 py-2.5
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
              disabled={!jobTitle.trim() || sending}
              onClick={handleHireRequest}
              className="
                flex
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
                  Send Hiring Request
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
