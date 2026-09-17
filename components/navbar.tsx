"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Find Drivers", href: "#drivers" },
  { label: "For Companies", href: "#companies" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      {/* Container aligned with page margin */}
      <div className="mx-auto flex h-20 w-[88%] max-w-7xl items-center justify-between">
        {/* ================= CLEAN LOGO ================= */}
        <a
          href="#home"
          className="flex items-center text-xl font-extrabold tracking-tight text-slate-900"
        >
          Hire<span className="text-[#1D70F5]">Driver</span>
        </a>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative py-2 text-[14px] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
            >
              <span>{item.label}</span>

              {/* Simple & Smooth Expanding Bottom Line */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#1D70F5] transition-all duration-300 ease-in-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* ================= ACTION BUTTON & MOBILE TOGGLE ================= */}
        <div className="flex items-center gap-4">
          <a
            href="#post-job"
            className="hidden rounded-lg bg-[#1D70F5] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 active:scale-[0.98] sm:block"
          >
            Post a Driver Job
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100 bg-white px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[15px] font-medium text-slate-700 transition-colors hover:text-[#1D70F5]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#post-job"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full rounded-lg bg-[#1D70F5] py-3 text-center text-[14px] font-semibold text-white shadow-sm"
              >
                Post a Driver Job
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
