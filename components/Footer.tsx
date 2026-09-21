"use client";

import Link from "next/link";
import { Car, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-muted)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--on-primary)] shadow-md shadow-[var(--shadow-xs)]">
                <Car className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-black tracking-tight text-[var(--text)]">
                Driver<span className="text-[var(--primary)]">CVs</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-[var(--text-muted)] max-w-sm">
              Sweden&apos;s dedicated marketplace for verified commercial
              drivers, heavy freight operators, delivery personnel, and
              passenger transport companies.
            </p>

            <div className="flex items-center gap-2 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.77 5.6c1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links: For Employers */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text)]">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/ExploreDrivers"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Find Professional Drivers
                </Link>
              </li>
              <li>
                <Link
                  href="/PostDriverJob"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Post a Job Vacancy
                </Link>
              </li>
              <li>
                <Link
                  href="/ExploreDrivers?role=Heavy+Truck"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Heavy Freight (CE) Drivers
                </Link>
              </li>
              <li>
                <Link
                  href="/ExploreDrivers?role=Delivery"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Delivery Van Chauffeurs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Employer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: For Drivers */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text)]">
              For Drivers
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/EmployerJobFeed"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Browse Driving Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Create Driver Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/EmployerJobFeed?loc=Stockholm"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Stockholm Driving Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/EmployerJobFeed?loc=Gothenburg"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Gothenburg Freight Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Driver Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text)]">
              Support &amp; Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>Stockholm, Sweden</span>
              </li>
              <li className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>support@drivercvs.se</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/login"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Privacy Policy &amp; GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
