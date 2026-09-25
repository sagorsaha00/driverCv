"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Car,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuthStore();

  const role = user?.role?.toLowerCase();

  const isHR = isAuthenticated && role === "hr";
  const isDriver = isAuthenticated && role === "driver";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    setIsOpen(false);
    logout();
    router.push("/login");
    router.refresh();
  };

  // ============================================================
  // ROLE BASED NAVIGATION
  // ============================================================

  const navLinks = [];

  // HR can find drivers.
  // Logged-out users can also see this.
  if (!isAuthenticated || isHR) {
    navLinks.push({
      name: "Find Drivers",
      href: "/ExploreDrivers",
      icon: Car,
    });
  }

  // Driver can find driving jobs.
  // Logged-out users can also see this.
  if (!isAuthenticated || isDriver) {
    navLinks.push({
      name: "Driving Jobs",
      href: "/EmployerJobFeed",
      icon: Briefcase,
    });
  }

  // Dashboard for logged in users
  if (isAuthenticated) {
    navLinks.push({
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    });
  }

  // ============================================================
  // USER DISPLAY DATA
  // ============================================================

  const userObj = user as any;
  const displayName =
    userObj?.name || userObj?.fullname || userObj?.companyName || "My Account";

  const profileImage =
    userObj?.ProfileImage || userObj?.profileImage || userObj?.image || null;

  const firstLetter = displayName?.charAt(0)?.toUpperCase() || "U";

  // ============================================================
  // ACTIVE LINK
  // ============================================================

  const isActiveLink = (href: string) => {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  };

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
      {/* ========================================================
          MAIN NAVBAR
      ========================================================= */}

      <div
        className="
          mx-auto flex h-[68px] max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ======================================================
            LOGO
        ======================================================= */}

        <Link href="/" className="group flex items-center gap-2.5 no-underline">
          {/* Logo Icon */}

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

            {/* Online / Status Dot */}

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

        {/* ======================================================
            DESKTOP NAVIGATION
        ======================================================= */}

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isActiveLink(link.href);

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

                {/* Active Line */}

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

        {/* ======================================================
            DESKTOP RIGHT SIDE
        ======================================================= */}

        <div className="flex items-center gap-2">
          {/* ====================================================
              NOT LOGGED IN → SIGN IN
          ===================================================== */}

          {!isAuthenticated && (
            <Link
              href="/login"
              className="
                hidden
                h-9
                items-center
                gap-2
                rounded-[8px]
                px-3
                text-[13px]
                font-semibold
                text-text-muted
                no-underline
                transition-colors duration-200
                hover:bg-surface-muted
                hover:text-text
                sm:flex
              "
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign in
            </Link>
          )}

          {/* ====================================================
              HR ONLY → POST JOB
          ===================================================== */}

          {isHR && (
            <motion.div
              className="hidden sm:block"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
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
                Post a Job
              </Link>
            </motion.div>
          )}

          {/* ====================================================
              LOGGED IN → PROFILE
          ===================================================== */}

          {isAuthenticated && user && (
            <div ref={profileRef} className="relative hidden md:block">
              {/* Profile Button */}

              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                }}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                className="
                  flex
                  h-10
                  cursor-pointer
                  items-center
                  gap-2.5
                  rounded-[10px]
                  border border-border
                  bg-surface
                  p-1.5
                  pr-3
                  transition-all duration-200
                  hover:border-border-strong
                  hover:bg-surface-muted
                "
              >
                {/* Profile Image */}

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="
                      h-7 w-7
                      shrink-0
                      rounded-[7px]
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-7 w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-[7px]
                      bg-primary/10
                      text-[12px]
                      font-bold
                      text-primary
                    "
                  >
                    {firstLetter}
                  </div>
                )}

                {/* Name */}

                <div className="max-w-[130px] text-left">
                  <p
                    className="
                      truncate
                      text-[11px]
                      font-bold
                      leading-tight
                      text-text
                    "
                  >
                    {displayName}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      font-medium
                      capitalize
                      leading-none
                      text-text-muted
                    "
                  >
                    {role}
                  </p>
                </div>

                <ChevronDown
                  className={`
                    h-3.5 w-3.5
                    shrink-0
                    text-text-muted
                    transition-transform duration-200
                    ${profileOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* =================================================
                  PROFILE DROPDOWN
              ================================================== */}

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    className="
                      absolute
                      right-0
                      top-[48px]
                      z-50
                      w-[245px]
                      overflow-hidden
                      rounded-[12px]
                      border border-border
                      bg-surface
                      shadow-[0_14px_40px_rgba(23,32,18,0.12)]
                    "
                  >
                    {/* Profile Information */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        p-3.5
                      "
                    >
                      {/* Large Image */}

                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={displayName}
                          className="
                            h-10 w-10
                            shrink-0
                            rounded-[9px]
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-10 w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-[9px]
                            bg-primary/10
                            text-sm
                            font-bold
                            text-primary
                          "
                        >
                          {firstLetter}
                        </div>
                      )}

                      {/* User Information */}

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            truncate
                            text-[13px]
                            font-bold
                            text-text
                          "
                        >
                          {displayName}
                        </p>

                        <p
                          className="
                            mt-0.5
                            truncate
                            text-[10px]
                            text-text-muted
                          "
                        >
                          {user.email}
                        </p>

                        <span
                          className="
                            mt-1
                            inline-block
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-primary
                          "
                        >
                          {role}
                        </span>
                      </div>
                    </div>

                    {/* Menu links */}
                    <div className="border-t border-border-subtle p-1.5 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="
                          flex
                          w-full
                          cursor-pointer
                          items-center
                          gap-2.5
                          rounded-[8px]
                          px-3
                          py-2
                          text-left
                          text-[12px]
                          font-semibold
                          text-text
                          no-underline
                          transition-colors duration-200
                          hover:bg-surface-muted
                        "
                      >
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                        Go to Dashboard
                      </Link>
                    </div>

                    {/* Logout */}
                    <div
                      className="
                        border-t border-border-subtle
                        p-1.5
                      "
                    >
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
                          flex
                          w-full
                          cursor-pointer
                          items-center
                          gap-2.5
                          rounded-[8px]
                          px-3
                          py-2.5
                          text-left
                          text-[12px]
                          font-semibold
                          text-red-500
                          transition-colors duration-200
                          hover:bg-red-50
                        "
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className="
              flex
              h-9 w-9
              cursor-pointer
              items-center
              justify-center
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

      {/* ========================================================
          MOBILE MENU
      ========================================================= */}

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
            <div
              className="
                mx-auto
                max-w-7xl
                px-4
                py-4
                sm:px-6
              "
            >
              {/* =================================================
                  LOGGED IN MOBILE PROFILE
              ================================================== */}

              {isAuthenticated && user && (
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-3
                    rounded-[11px]
                    border border-border
                    bg-surface-muted/50
                    p-3
                  "
                >
                  {/* Image */}

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={displayName}
                      className="
                        h-10 w-10
                        shrink-0
                        rounded-[9px]
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-10 w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-primary/10
                        text-sm
                        font-bold
                        text-primary
                      "
                    >
                      {firstLetter}
                    </div>
                  )}

                  {/* Details */}

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        truncate
                        text-[13px]
                        font-bold
                        text-text
                      "
                    >
                      {displayName}
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-[10px]
                        text-text-muted
                      "
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* Role */}

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-primary/10
                      px-2
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-primary
                    "
                  >
                    {role}
                  </span>
                </div>
              )}

              {/* =================================================
                  MOBILE NAV LINKS
              ================================================== */}

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = isActiveLink(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group
                        flex
                        items-center
                        justify-between
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
                            flex
                            h-8 w-8
                            items-center
                            justify-center
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

                        <span
                          className="
                            text-[13px]
                            font-semibold
                          "
                        >
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

              {/* =================================================
                  HR MOBILE → POST JOB
              ================================================== */}

              {isHR && (
                <Link
                  href="/PostDriverJob"
                  onClick={() => setIsOpen(false)}
                  className="
                    mt-3
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    bg-primary
                    text-[12px]
                    font-bold
                    text-on-primary
                    no-underline
                    shadow-sm
                    transition-colors duration-200
                    hover:bg-primary-hover
                  "
                >
                  <Plus className="h-4 w-4" />
                  Post a Job
                </Link>
              )}

              {/* =================================================
                  NOT LOGGED IN → SIGN IN
              ================================================== */}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="
                    mt-3
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    border border-border
                    bg-surface
                    text-[12px]
                    font-bold
                    text-text
                    no-underline
                    transition-colors duration-200
                    hover:bg-surface-muted
                  "
                >
                  <LogIn className="h-4 w-4 text-text-muted" />
                  Sign in
                </Link>
              )}

              {isAuthenticated && (
                <div
                  className="
                    mt-4
                    border-t border-border-subtle
                    pt-3
                  "
                >
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      h-11
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-[9px]
                      border border-red-200
                      bg-red-50
                      text-[12px]
                      font-bold
                      text-red-500
                      transition-colors duration-200
                      hover:bg-red-100
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
