"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-xs font-black text-white shadow-md shadow-blue-500/20">
            DC
          </div>
          <span className="font-display text-lg font-black tracking-tight text-slate-900">
            Driver<span className="text-[#2563EB]">CVs</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-xs font-semibold text-slate-600 md:flex">
          <Link
            href="/ExploreDrivers"
            className="transition-colors hover:text-[#2563EB]"
          >
            Find Drivers
          </Link>
          <Link href="/EmployerJobFeed" className="transition-colors hover:text-[#2563EB]">
            Find Driving Jobs
          </Link>
        
          <Link
            href="/login"
            className="transition-colors hover:text-[#2563EB]"
          >
            Log In
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#post-job"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Post a Job</span>
              <span className="sm:hidden">Post</span>
            </Link>
          </motion.div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3 text-xs font-semibold text-slate-700">
              <Link href="#drivers" onClick={() => setIsOpen(false)}>
                Find Drivers
              </Link>
              <Link href="#jobs" onClick={() => setIsOpen(false)}>
                Find Driving Jobs
              </Link>
              <Link href="#how-it-works" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
              <Link href="#login" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
