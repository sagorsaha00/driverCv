"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  ShieldCheck,
  User,
  ArrowRight,
  Phone,
  Mail,
  FileText,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCompanies } from "@/lib/hook/useCompanies";
import { useAuthStore } from "@/store/authStore";

export default function CompaniesPage() {
  const { data: companies = [], isLoading, isError, refetch } = useCompanies();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.companyName?.toLowerCase().includes(q) ||
      c.name?.toLowerCase().includes(q) ||
      c.organizationNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-8 font-sans text-[var(--text)]">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ========================================================
            HERO HEADER
        ========================================================= */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Transport Employers & Fleets</span>
            </div>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Browse Registered Companies
            </h1>

            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Explore trusted transport operators, freight carriers, and fleet management companies registered on DriverCVs. Connect directly with hiring managers.
            </p>
          </div>

          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none hidden md:block">
            <Building2 className="w-80 h-80 text-primary" />
          </div>
        </div>

        {/* ========================================================
            SEARCH BAR
        ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-subtle)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, contact, or org number..."
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 py-3 text-xs sm:text-sm font-medium text-[var(--text)] placeholder-[var(--text-subtle)] shadow-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="text-xs font-semibold text-[var(--text-muted)]">
            Showing <span className="font-bold text-[var(--text)]">{filteredCompanies.length}</span> {filteredCompanies.length === 1 ? "Company" : "Companies"}
          </div>
        </div>

        {/* ========================================================
            COMPANIES GRID
        ========================================================= */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center shadow-xs">
            <Building2 className="mx-auto h-12 w-12 text-red-500 opacity-80" />
            <h3 className="mt-4 text-base font-bold text-[var(--text)]">Failed to load companies</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Please check your connection and try again.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover"
            >
              Retry Loading
            </button>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center shadow-xs">
            <Building2 className="mx-auto h-12 w-12 text-[var(--text-subtle)] opacity-40" />
            <h3 className="mt-4 text-base font-bold text-[var(--text)]">No companies found</h3>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {searchQuery ? "Try refining your search keyword." : "There are currently no registered fleet companies."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => {
              const initial = company.companyName?.charAt(0)?.toUpperCase() || "C";

              return (
                <motion.div
                  key={company.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Header: Avatar + Name */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary border border-primary/20">
                        {initial}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h2 className="truncate text-base font-extrabold text-[var(--text)]">
                            {company.companyName}
                          </h2>
                        </div>

                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-0.5 text-[10px] font-bold text-success border border-success/30">
                          <ShieldCheck className="h-3 w-3" />
                          Verified Fleet
                        </span>
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="space-y-2.5 pt-2 border-t border-[var(--border-subtle)] text-xs">
                      {/* Recruiter / HR Contact */}
                      <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                        <User className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-[var(--text)]">{company.name}</span>
                        <span className="text-[10px] text-[var(--text-subtle)]">(Recruiter)</span>
                      </div>

                      {/* Org Number */}
                      <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                        <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-mono text-[11px] font-medium text-[var(--text)]">
                          Org: {company.organizationNumber}
                        </span>
                      </div>

                      {/* Contact Status */}
                      {isAuthenticated ? (
                        <>
                          <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                            <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="font-mono text-[11px] text-[var(--text)]">
                              {company.phoneNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[var(--text-muted)]">
                            <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="truncate text-[11px] text-[var(--text)]">
                              {company.email}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="rounded-xl bg-[var(--surface-muted)]/60 px-3 py-2 text-[11px] font-medium text-[var(--text-muted)]">
                          🔒 Log in to view direct recruiter phone and email
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                    <Link
                      href={`/Companies/${company.id}`}
                      className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-hover active:scale-95 no-underline"
                    >
                      <span>View Company Profile</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
