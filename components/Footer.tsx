import Link from "next/link";
import { Car, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-xs text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-md shadow-black/10">
                <Car className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-black tracking-tight text-black">
                Driver<span className="text-zinc-500">CVs</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-500 max-w-sm">
              Sweden&apos;s dedicated marketplace for verified commercial drivers, heavy freight operators, delivery personnel, and passenger transport companies.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-800 bg-zinc-100 px-3 py-2 rounded-xl border border-zinc-200 w-fit">
              <ShieldCheck className="h-4 w-4 text-black" />
              <span>Transportstyrelsen Verified Credentials</span>
            </div>
          </div>

          {/* Quick Links: For Employers */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-black">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/ExploreDrivers" className="hover:text-black transition-colors">
                  Find Professional Drivers
                </Link>
              </li>
              <li>
                <Link href="/PostDriverJob" className="hover:text-black transition-colors">
                  Post a Job Vacancy
                </Link>
              </li>
              <li>
                <Link href="/ExploreDrivers?role=Heavy+Truck" className="hover:text-black transition-colors">
                  Heavy Freight (CE) Drivers
                </Link>
              </li>
              <li>
                <Link href="/ExploreDrivers?role=Delivery" className="hover:text-black transition-colors">
                  Delivery Van Chauffeurs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-black transition-colors">
                  Employer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: For Drivers */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-black">
              For Drivers
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/EmployerJobFeed" className="hover:text-black transition-colors">
                  Browse Driving Jobs
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-black transition-colors">
                  Create Driver Profile
                </Link>
              </li>
              <li>
                <Link href="/EmployerJobFeed?loc=Stockholm" className="hover:text-black transition-colors">
                  Stockholm Driving Jobs
                </Link>
              </li>
              <li>
                <Link href="/EmployerJobFeed?loc=Gothenburg" className="hover:text-black transition-colors">
                  Gothenburg Freight Jobs
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-black transition-colors">
                  Driver Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-black">
              Support &amp; Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>Stockholm, Sweden</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-500">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <span>support@drivercvs.se</span>
              </li>
              <li className="pt-2">
                <Link href="/login" className="hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-black transition-colors">
                  Privacy Policy &amp; GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} DriverCVs Nordic AB. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Org.nr: 556123-4567</span>
            <span>•</span>
            <span>GDPR Compliant</span>
            <span>•</span>
            <span>BankID Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
