import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#2563EB] text-[10px] font-black text-white">
            DC
          </div>
          <span className="font-bold text-slate-900">DriverCVs</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="hover:text-slate-900">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-slate-900">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-slate-900">
            Support Contact
          </Link>
        </div>

        <p>© 2026 DriverCVs Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
