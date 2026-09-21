"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const LINE_1 = "Your Vehicle. Your Schedule.";
const LINE_2 = "The Verified Driver.";
const PARAGRAPH =
  "Hire vetted, background-checked professional drivers seamlessly without agency markups, long waiting periods, or complicated paperwork.";

const FEATURES = [
  "Verified Swedish Transport Agency (Transportstyrelsen) credentials",
  "YKB certification, digital tachograph card, and criminal record clearance",
  "Flexible hiring: hourly on-call, daily freight shifts, or permanent contracts",
];

/* Fires once when the section scrolls into view */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/* Returns how many characters are typed so far */
function useTypewriter(length: number, active: boolean, speed: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(length);
      return;
    }

    const id = setInterval(() => {
      setCount((c) => {
        if (c >= length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);

    return () => clearInterval(id);
  }, [active, length, speed]);

  return count;
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse rounded-sm bg-[var(--primary)]"
    />
  );
}

export default function DarkFeatureSection() {
  const router = useRouter();
  const { ref, inView } = useInViewOnce<HTMLElement>();

  /* Step 1: headline types out. Step 2: paragraph types out. Step 3: everything else rises in. */
  const headlineLength = LINE_1.length + LINE_2.length;
  const headlineCount = useTypewriter(headlineLength, inView, 32);
  const headlineDone = inView && headlineCount >= headlineLength;

  const paragraphCount = useTypewriter(PARAGRAPH.length, headlineDone, 8);
  const paragraphDone = headlineDone && paragraphCount >= PARAGRAPH.length;

  const line1Typed = LINE_1.slice(0, headlineCount);
  const line1Rest = LINE_1.slice(headlineCount);
  const line2Count = Math.max(0, headlineCount - LINE_1.length);
  const line2Typed = LINE_2.slice(0, line2Count);
  const line2Rest = LINE_2.slice(line2Count);
  const typingLine1 = inView && !headlineDone && headlineCount < LINE_1.length;
  const typingLine2 = inView && !headlineDone && headlineCount >= LINE_1.length;

  /* Rise-in reveal classes */
  const reveal = `transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
    paragraphDone ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
  const delay = (ms: number) => ({
    transitionDelay: paragraphDone ? `${ms}ms` : "0ms",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] py-20 text-[var(--text)] sm:py-28"
    >
      {/* Background: soft glow + faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>Smart verification and matching</span>
            </div>

            {/* Typed headline */}
            <h2
              aria-label={`${LINE_1} ${LINE_2}`}
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl"
            >
              <span aria-hidden>
                <span>{line1Typed}</span>
                {typingLine1 && <Caret />}
                <span className="opacity-0">{line1Rest}</span>
                <br />
                <span className="text-[var(--primary)]">
                  {line2Typed}
                </span>
                {typingLine2 && <Caret />}
                <span className="opacity-0">{line2Rest}</span>
              </span>
            </h2>

            {/* Typed paragraph */}
            <p
              aria-label={PARAGRAPH}
              className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-muted)]"
            >
              <span aria-hidden>
                <span>{PARAGRAPH.slice(0, paragraphCount)}</span>
                <span className="opacity-0">{PARAGRAPH.slice(paragraphCount)}</span>
              </span>
            </p>

            {/* Features rise in after typing */}
            <ul className="mt-8 space-y-4">
              {FEATURES.map((text, i) => (
                <li
                  key={text}
                  className={`flex items-start gap-3 ${reveal}`}
                  style={delay(i * 120)}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] border border-[var(--border)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-[var(--text-muted)]">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-10 flex flex-wrap items-center gap-4 ${reveal}`}
              style={delay(420)}
            >
              <button
                onClick={() => router.push("/PostDriverJob")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition hover:bg-[var(--primary-hover)] active:translate-y-px"
              >
                <span>Post a Driver Requirement</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push("/ExploreDrivers")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-muted)]"
              >
                <span>Browse Candidates</span>
              </button>
            </div>
          </div>

          {/* Right column: glass preview card */}
          <div
            className={`rounded-3xl border border-[var(--border)] bg-[var(--surface-subtle)] p-6 shadow-2xl backdrop-blur-xl sm:p-7 ${reveal}`}
            style={delay(200)}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)] border border-[var(--border)]">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    Live driver match simulation
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Stockholm Region • Ready to dispatch
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-[var(--border-strong)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                Active match
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <span className="block text-xs text-[var(--text-muted)]">
                  Target license category
                </span>
                <p className="mt-1.5 text-sm font-semibold text-[var(--text)]">
                  Heavy Freight Truck (CE License) + YKB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <span className="block text-xs text-[var(--text-muted)]">
                    Duration and shift
                  </span>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--text)]">
                    Flexible shift / Full-time
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <span className="block text-xs text-[var(--text-muted)]">
                    Est. market rate
                  </span>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--primary)]">
                    32,500 SEK / mo
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                    <span>3 candidates passed Transportstyrelsen checks</span>
                  </div>
                  <span className="text-xs font-semibold text-[var(--primary)]">
                    98% match
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[var(--border)]">
                  <div className="h-full w-[98%] rounded-full bg-[var(--primary)]" />
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/ExploreDrivers")}
              className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-3.5 text-sm font-semibold text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition hover:bg-[var(--primary-hover)] active:translate-y-px"
            >
              <span>Explore Matched Drivers Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}