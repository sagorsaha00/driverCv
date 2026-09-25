"use client";

import { Building2, Mail, Phone, ShieldCheck, User } from "lucide-react";

import { DriverJobHR } from "@/type/driverJob";

interface Props {
  employer: DriverJobHR;
}

export function EmployerContactCard({ employer }: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border,_#e2e8f0)]
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          border-b
          border-[var(--border,_#e2e8f0)]
          p-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary,_#2563eb)]/10
              text-[var(--primary,_#2563eb)]
            "
          >
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3
                className="
                  text-sm
                  font-black
                  text-[var(--foreground,_#0f172a)]
                "
              >
                Employer Contact
              </h3>

              <ShieldCheck
                className="
                  h-3.5
                  w-3.5
                  text-emerald-600
                "
              />
            </div>

            <p
              className="
                mt-0.5
                text-[11px]
                text-[var(--muted-foreground,_#64748b)]
              "
            >
              Direct company contact information
            </p>
          </div>
        </div>
      </div>

      {/* DETAILS */}

      <div className="space-y-4 p-5">
        {/* CONTACT PERSON */}

        <div className="flex items-start gap-3">
          <User
            className="
              mt-0.5
              h-4
              w-4
              text-[var(--muted-foreground,_#94a3b8)]
            "
          />

          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--muted-foreground,_#94a3b8)]
              "
            >
              Contact Person
            </p>

            <p
              className="
                mt-1
                text-xs
                font-bold
                text-[var(--foreground,_#0f172a)]
              "
            >
              {employer.name}
            </p>
          </div>
        </div>

        {/* COMPANY */}

        <div className="flex items-start gap-3">
          <Building2
            className="
              mt-0.5
              h-4
              w-4
              text-[var(--muted-foreground,_#94a3b8)]
            "
          />

          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--muted-foreground,_#94a3b8)]
              "
            >
              Company
            </p>

            <p
              className="
                mt-1
                text-xs
                font-bold
                text-[var(--foreground,_#0f172a)]
              "
            >
              {employer.companyName}
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[var(--muted-foreground,_#64748b)]
              "
            >
              Org. No: {employer.organizationNumber}
            </p>
          </div>
        </div>

        {/* EMAIL */}

        <div>
          <p
            className="
              mb-2
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-[var(--muted-foreground,_#94a3b8)]
            "
          >
            Email
          </p>

          <a
            href={`mailto:${employer.email}`}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-[var(--border,_#e2e8f0)]
              bg-[var(--muted,_#f8fafc)]
              p-3
              transition

              hover:border-[var(--primary,_#2563eb)]/40
              hover:bg-[var(--primary,_#2563eb)]/5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                text-[var(--primary,_#2563eb)]
                shadow-sm
              "
            >
              <Mail className="h-4 w-4" />
            </div>

            <span
              className="
                min-w-0
                truncate
                text-xs
                font-bold
                text-[var(--foreground,_#0f172a)]
              "
            >
              {employer.email}
            </span>
          </a>
        </div>

        {/* PHONE */}

        <div>
          <p
            className="
              mb-2
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-[var(--muted-foreground,_#94a3b8)]
            "
          >
            Phone Number
          </p>

          <a
            href={`tel:${employer.phoneNumber}`}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-[var(--primary,_#2563eb)]
              p-3
              text-white
              shadow-lg
              shadow-[var(--primary,_#2563eb)]/15
              transition

              hover:opacity-90
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white/15
              "
            >
              <Phone className="h-4 w-4" />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  text-white/70
                "
              >
                Call Employer
              </p>

              <p
                className="
                  text-xs
                  font-black
                "
              >
                {employer.phoneNumber}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
