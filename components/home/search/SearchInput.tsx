"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  placeholder?: string;
  label?: string;
}

export default function SearchInput({
  value,
  onChange,
  inputRef,
  placeholder = "Truck, delivery, CE driver...",
  label = "Job Title or Driver",
}: Props) {
  return (
    <div
      className="
        flex min-h-[52px]
        items-center gap-3
        rounded-xl
        border border-[var(--border)]
        bg-[var(--surface)]
        px-3.5
        transition-all
        focus-within:border-[var(--primary)]
        focus-within:ring-2
        focus-within:ring-[var(--focus-ring)]
      "
    >
      <Search
        className="
          h-4 w-4
          shrink-0
          text-[var(--primary)]
        "
      />

      <div className="min-w-0 flex-1">
        <label
          className="
            block
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-[var(--text-muted)]
          "
        >
          {label}
        </label>

        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="
              w-full
              border-none
              bg-transparent
              p-0
              text-[13px]
              font-semibold
              text-[var(--text)]
              outline-none
              placeholder:text-[var(--text-subtle)]
            "
          />

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="
                ml-2
                cursor-pointer
                text-[var(--text-subtle)]
                hover:text-[var(--text)]
              "
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
