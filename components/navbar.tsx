"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Plus,
  Car,
  Briefcase,
  User,
  ShieldCheck,
  ChevronRight,
  LogIn,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      name: "Find Drivers",
      href: "/ExploreDrivers",
      icon: Car,
    },
    {
      name: "Driving Jobs",
      href: "/EmployerJobFeed",
      icon: Briefcase,
    },
    // {
    //   name: "Dashboard",
    //   href: "/dashboard",
    //   icon: User,
    // },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-border/80 bg-surface/95 shadow-[0_4px_20px_rgba(23,32,18,0.06)] backdrop-blur-xl"
            : "border-b border-border/60 bg-surface/90 backdrop-blur-lg"
        }
      `}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link href="/" className="group flex items-center gap-2.5 no-underline">
          {/* Logo Mark */}
          <div
            className="
              relative flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-[10px]
              bg-primary
              text-on-primary
              shadow-[0_4px_12px_rgba(106,136,50,0.22)]
              transition-all duration-300
              group-hover:bg-primary-hover
              group-hover:shadow-[0_6px_16px_rgba(106,136,50,0.28)]
            "
          >
            <Car
              className="
                h-[18px] w-[18px]
                transition-transform duration-300
                group-hover:-rotate-6
              "
            />

            {/* Status dot */}
            <span
              className="
                absolute -bottom-0.5 -right-0.5
                h-2.5 w-2.5
                rounded-full
                border-2 border-surface
                bg-primary-400
              "
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col">
            <span
              className="
                font-display
                text-[17px]
                font-extrabold
                leading-none
                tracking-[-0.03em]
                text-text
              "
            >
              Driver<span className="text-primary">CVs</span>
            </span>

            <span
              className="
                mt-1
                flex items-center gap-1
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-text-muted
              "
            >
              <ShieldCheck className="h-2.5 w-2.5 text-primary" />
              Verified Marketplace
            </span>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="
                  group relative
                  flex items-center gap-2
                  py-2
                  text-[13px]
                  font-semibold
                  no-underline
                "
              >
                <Icon
                  className={`
                    h-3.5 w-3.5
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-primary"
                        : "text-text-muted group-hover:text-primary"
                    }
                  `}
                />

                <span
                  className={`
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-text"
                        : "text-text-muted group-hover:text-text"
                    }
                  `}
                >
                  {link.name}
                </span>

                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-line"
                    className="
                      absolute
                      -bottom-[1px]
                      left-0 right-0
                      h-[2px]
                      rounded-full
                      bg-primary
                    "
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}
        <div className="flex items-center gap-2">
          {/* Sign In */}
          <Link
            href="/login"
            className="
              hidden
              items-center
              rounded-[8px]
              px-3
              py-2
              text-[13px]
              font-semibold
              text-text-muted
              no-underline
              transition-colors duration-200
              hover:bg-surface-muted
              hover:text-text
              sm:inline-flex
            "
          >
            Sign in
          </Link>

          {/* Post Job */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/PostDriverJob"
              className="
                inline-flex
                h-9
                items-center
                gap-2
                rounded-[8px]
                bg-primary
                px-3.5
                text-[12px]
                font-bold
                text-on-primary
                no-underline
                shadow-[0_3px_10px_rgba(106,136,50,0.18)]
                transition-all duration-200
                hover:bg-primary-hover
                hover:shadow-[0_5px_14px_rgba(106,136,50,0.25)]
              "
            >
              <Plus className="h-3.5 w-3.5" />

              <span className="hidden sm:inline">Post a Job</span>

              <span className="sm:hidden">Post</span>
            </Link>
          </motion.div>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className="
              flex h-9 w-9
              cursor-pointer
              items-center justify-center
              rounded-[8px]
              border border-border
              bg-surface
              text-text
              transition-all duration-200
              hover:border-border-strong
              hover:bg-surface-muted
              hover:text-primary
              md:hidden
            "
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

       
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.22,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="
              overflow-hidden
              border-t border-border-subtle
              bg-surface
              md:hidden
            "
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
             
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group
                        flex items-center justify-between
                        rounded-[9px]
                        px-3
                        py-3
                        no-underline
                        transition-colors duration-200
                        ${
                          isActive
                            ? "bg-surface-muted text-text"
                            : "text-text-muted hover:bg-surface-subtle hover:text-text"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            flex h-8 w-8
                            items-center justify-center
                            rounded-[8px]
                            transition-colors
                            ${
                              isActive
                                ? "bg-primary text-on-primary"
                                : "bg-surface-muted text-text-muted group-hover:text-primary"
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <span className="text-[13px] font-semibold">
                          {link.name}
                        </span>
                      </div>

                      <ChevronRight
                        className={`
                          h-4 w-4
                          transition-transform duration-200
                          group-hover:translate-x-0.5
                          ${isActive ? "text-primary" : "text-text-subtle"}
                        `}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile actions */}
              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-2
                  border-t border-border-subtle
                  pt-4
                "
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="
                    flex h-10
                    items-center justify-center
                    gap-2
                    rounded-[8px]
                    border border-border
                    bg-surface
                    text-[12px]
                    font-bold
                    text-text
                    no-underline
                    transition-colors
                    hover:bg-surface-muted
                  "
                >
                  <LogIn className="h-3.5 w-3.5 text-text-muted" />
                  Sign in
                </Link>

                <Link
                  href="/PostDriverJob"
                  onClick={() => setIsOpen(false)}
                  className="
                    flex h-10
                    items-center justify-center
                    gap-2
                    rounded-[8px]
                    bg-primary
                    text-[12px]
                    font-bold
                    text-on-primary
                    no-underline
                    shadow-sm
                    transition-colors
                    hover:bg-primary-hover
                  "
                >
                  <Plus className="h-3.5 w-3.5" />
                  Post a Job
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
