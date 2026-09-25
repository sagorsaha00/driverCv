export default function JobCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-2xl
        border
        border-[var(--border,_#e2e8f0)]
        bg-[var(--card,_#ffffff)]
        p-5
        sm:p-6
      "
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex-1">
          <div className="mb-4 flex gap-2">
            <div className="h-6 w-24 rounded-lg bg-slate-200" />
            <div className="h-6 w-20 rounded-lg bg-slate-200" />
          </div>

          <div className="h-6 w-2/3 rounded-lg bg-slate-200" />

          <div className="mt-3 flex gap-3">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>

          <div className="mt-5 h-3 w-full rounded bg-slate-200" />
          <div className="mt-2 h-3 w-4/5 rounded bg-slate-200" />

          <div className="mt-5 flex gap-2">
            <div className="h-6 w-20 rounded-md bg-slate-200" />
            <div className="h-6 w-24 rounded-md bg-slate-200" />
            <div className="h-6 w-16 rounded-md bg-slate-200" />
          </div>
        </div>

        <div className="lg:w-[190px]">
          <div className="h-4 w-24 rounded bg-slate-200 lg:ml-auto" />
          <div className="mt-2 h-6 w-32 rounded bg-slate-200 lg:ml-auto" />
          <div className="mt-4 h-10 w-full rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
