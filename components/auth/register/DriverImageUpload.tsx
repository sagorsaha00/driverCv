"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, Trash2, UserRound } from "lucide-react";
import { uploadImage } from "@/lib/api/uploadt";

interface DriverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function DriverImageUpload({
  value,
  onChange,
}: DriverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setLoading(true);

    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    onChange("");
    setError("");
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface-muted)]">
          {value ? (
            <Image
              src={value}
              alt="Driver profile"
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserRound className="h-7 w-7 text-[var(--text-subtle)]" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-9 items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--primary-300)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}

              {loading ? "Uploading..." : "Upload photo"}
            </button>

            {value && !loading && (
              <button
                type="button"
                onClick={removeImage}
                className="inline-flex h-9 items-center gap-2 border border-[var(--border)] px-3 text-xs font-semibold text-[var(--danger)] transition hover:bg-[var(--danger-bg)]"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            )}
          </div>

          <p className="mt-2 text-xs text-[var(--text-subtle)]">
            JPG, PNG or WEBP · Maximum 5MB
          </p>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
