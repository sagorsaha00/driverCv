"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  PlusCircle,
  Car,
  Briefcase,
  User,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Find Drivers", href: "/ExploreDrivers", icon: Car },
    { name: "Find Driving Jobs", href: "/EmployerJobFeed", icon: Briefcase },
    { name: "Dashboard", href: "/dashboard", icon: User },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/80 bg-white/90 shadow-xs backdrop-blur-md"
          : "border-b border-zinc-200/50 bg-white/75 backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-md shadow-black/10 transition-transform duration-200 group-hover:scale-105">
            <Car className="h-5 w-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-black" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-tight text-black">
              Driver<span className="text-zinc-500">CVs</span>
            </span>
            <span className="-mt-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Verified Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-2 text-xs font-semibold transition-all rounded-lg ${
                  isActive
                    ? "text-black font-bold bg-zinc-100"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center text-xs font-bold text-zinc-700 hover:text-black transition-colors px-3 py-2 rounded-lg hover:bg-zinc-100/70"
          >
            Sign In
          </Link>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/PostDriverJob"
              className="inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-zinc-800"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Post a Job</span>
              <span className="sm:hidden">Post</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 shadow-xs transition-colors hover:bg-zinc-50 md:hidden cursor-pointer"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-zinc-200 bg-white px-4 py-4 md:hidden shadow-lg"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-black font-bold"
                        : "text-zinc-700 hover:bg-zinc-50 hover:text-black"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-zinc-400" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                  </Link>
                );
              })}

              <div className="mt-2 pt-2 border-t border-zinc-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-50"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Log In to Account</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-black py-2.5 text-xs font-bold text-white shadow-xs hover:bg-zinc-800"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Register Free</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
