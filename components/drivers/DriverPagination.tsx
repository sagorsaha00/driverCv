"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DriverPaginationMeta } from "@/type/driver";

interface Props {
  pagination: DriverPaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function DriverPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: Props) {
  const { page, limit, total, totalPages } = pagination;
  const [jumpInput, setJumpInput] = useState("");

  if (total === 0) return null;

  const startIdx = Math.min((page - 1) * limit + 1, total);
  const endIdx = Math.min(page * limit, total);

  // Generate smart pagination page numbers
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // page siblings

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page - delta > 2) {
      pages.push("...");
    }

    const start = Math.max(2, page - delta);
    const end = Math.min(totalPages - 1, page + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page + delta < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpInput("");
    }
  };

  const perPageOptions = [6, 9, 18, 36];

  return (
    <nav
      aria-label="Driver pagination"
      className="mt-8 flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)] md:flex-row md:items-center md:justify-between md:p-5"
    >
      {/* LEFT: RESULTS SUMMARY & PER-PAGE SELECTOR */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl bg-[var(--surface-subtle)] px-3.5 py-2 border border-[var(--border)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
          </span>
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Showing{" "}
            <span className="font-bold text-[var(--text)]">{startIdx}</span>
            –
            <span className="font-bold text-[var(--text)]">{endIdx}</span> of{" "}
            <span className="font-bold text-[var(--primary)]">{total.toLocaleString()}</span> Drivers
          </p>
        </div>

        {/* PER PAGE PILLS */}
        <div className="hidden sm:flex items-center gap-1 rounded-2xl bg-[var(--surface-subtle)] p-1 border border-[var(--border)]">
          <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
            Per page
          </span>
          {perPageOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onLimitChange(opt)}
              className={`h-7 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                limit === opt
                  ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER & RIGHT: PAGE NUMBER BUTTONS & JUMP INPUT */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
        {/* NAV BUTTONS */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            title="First page"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>

          {/* Prev Page */}
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            title="Previous page"
            className="flex h-9 items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-bold text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Numerical Page Pills */}
          <div className="flex items-center gap-1 px-1">
            {getVisiblePages().map((p, idx) => {
              if (p === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-9 w-7 items-center justify-center text-xs font-bold text-[var(--text-subtle)]"
                  >
                    •••
                  </span>
                );
              }

              const pageNum = p as number;
              const isActive = pageNum === page;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`flex h-9 min-w-[36px] items-center justify-center rounded-xl px-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-sm scale-105"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Page */}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            title="Next page"
            className="flex h-9 items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-bold text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Last Page */}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            title="Last page"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--primary)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>

        {/* JUMP TO PAGE INPUT (Scale for millions) */}
        {totalPages > 3 && (
          <form
            onSubmit={handleJump}
            className="flex items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)] p-1"
          >
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder={`${page}`}
              className="h-7 w-12 rounded-xl bg-[var(--surface)] text-center text-xs font-bold text-[var(--text)] outline-none border border-[var(--border)] focus:border-[var(--primary)]"
            />
            <span className="text-[10px] font-bold text-[var(--text-subtle)] pr-1">
              / {totalPages}
            </span>
            <button
              type="submit"
              className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--on-primary)] transition hover:opacity-90 cursor-pointer"
              title="Jump to page"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
