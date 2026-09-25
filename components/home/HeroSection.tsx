"use client";

import { useEffect, useState } from "react";
import { Briefcase, ShieldCheck } from "lucide-react";
import MarketplaceSearch from "./search/MarketplaceSearch";
import { useAuthStore } from "@/store/authStore";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  const authRole = useAuthStore(
    (state) => state.role || (state.user as any)?.role?.toLowerCase()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDriver = mounted && authRole === "driver";

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b border-[var(--border)]
        bg-[var(--bg)]
        pt-12 pb-16
        lg:pt-20 lg:pb-24
      "
    >
      <div
        className="
          absolute
          left-1/2 top-0
          -z-10
          h-[380px]
          w-full
          max-w-7xl
          -translate-x-1/2
          bg-gradient-to-b
          from-[var(--primary-100)]/40
          via-[var(--surface-muted)]/20
          to-transparent
          blur-3xl
        "
      />

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-12
            lg:gap-8
          "
        >
          {/* LEFT */}

          <div
            className="
              text-center
              lg:col-span-6
              lg:text-left
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border-strong)]
                bg-[var(--surface-muted)]
                px-3.5 py-1.5
                text-[11px]
                font-bold
                text-[var(--text)]
              "
            >
              {isDriver ? (
                <>
                  <Briefcase className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Verified Driving Jobs</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Verified Driver Marketplace</span>
                </>
              )}
            </div>

            <h1
              className="
                mt-5
                text-4xl
                font-black
                tracking-tight
                text-[var(--text)]
                sm:text-5xl
                xl:text-6xl
              "
            >
              {isDriver ? (
                <>
                  Find Driving Jobs.
                  <br />
                  <span className="text-[var(--primary)]">
                    Fast, Verified, High-Paying.
                  </span>
                </>
              ) : (
                <>
                  Hire Trusted Drivers.
                  <br />
                  <span className="text-[var(--primary)]">
                    Verified, Fast, Reliable.
                  </span>
                </>
              )}
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-relaxed
                text-[var(--text-muted)]
                lg:mx-0
              "
            >
              {isDriver
                ? "Connect directly with top fleet employers and discover high-paying driving opportunities across Sweden."
                : "Connect directly with professional drivers and discover driving opportunities across Sweden."}
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              mx-auto
              w-full
              max-w-xl
              lg:col-span-6
              lg:ml-auto
            "
          >
            <MarketplaceSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
