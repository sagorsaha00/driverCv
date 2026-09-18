import Link from "next/link";
import { ShieldCheck, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-br-lg rounded-tl-lg bg-[#6082B6] font-display text-xs font-black text-white shadow-sm">
                DC
              </div>
              <span className="font-display text-base font-black tracking-tight text-[#36454F]">
                Driver<span className="text-[#6082B6]">Cv</span>
              </span>
            </div>

            <p className="mt-3 max-w-xs text-xs font-medium leading-relaxed text-slate-500">
              Sweden’s premier platform matching verified professional drivers
              with top hiring transport companies.
            </p>

            {/* Sweden Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <MapPin className="h-3 w-3 text-[#6082B6]" />
              <span>Operating across Sweden</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-slate-500">
              <li>
                <Link
                  href="#jobs"
                  className="transition-colors hover:text-[#6082B6]"
                >
                  Find Driving Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#drivers"
                  className="transition-colors hover:text-[#6082B6]"
                >
                  Hire Drivers
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="transition-colors hover:text-[#6082B6]"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="transition-colors hover:text-[#6082B6]"
                >
                  Employer Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
              Driver Categories
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-slate-500">
              <li>Heavy Truck (CE)</li>
              <li>Personal Chauffeur</li>
              <li>Delivery & Van</li>
              <li>Bus & Coach (D)</li>
            </ul>
          </div>

          {/* Verification CTA */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#36454F]">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Verified Hiring</span>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Looking for licensed drivers with checked backgrounds?
            </p>
            <Link
              href="#post-job"
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#6082B6] hover:text-[#4F71A5]"
            >
              Post Job Requirement
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row text-[11px] font-medium text-slate-400">
          <p>© 2026 DriverCv AB. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-slate-600">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-slate-600">
              Terms of Service
            </Link>
            <Link href="#cookies" className="hover:text-slate-600">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
