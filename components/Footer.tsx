export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div
        className="
        mx-auto
        flex
        max-w-[900px]
        flex-col
        gap-5
        px-5
        py-7

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
      >
        {/* Logo */}

        <div className="flex items-center gap-2">
          <div
            className="
            flex
            h-7
            w-7
            items-center
            justify-center
            bg-[#2563EB]
            text-[9px]
            font-black
            text-white
          "
          >
            H
          </div>

          <span
            className="
            text-[13px]
            font-black
            tracking-[-0.04em]
            text-slate-900
          "
          >
            Hire<span className="text-[#2563EB]">Driver</span>
          </span>
        </div>

        {/* Links */}

        <div
          className="
          flex
          flex-wrap
          gap-5
          text-[9px]
          font-medium
          text-slate-400
        "
        >
          <a href="#home" className="hover:text-slate-800">
            Home
          </a>

          <a href="#jobs" className="hover:text-slate-800">
            Jobs
          </a>

          <a href="#drivers" className="hover:text-slate-800">
            Drivers
          </a>

          <a href="#how-it-works" className="hover:text-slate-800">
            How it works
          </a>

          <a href="#post-job" className="hover:text-slate-800">
            For companies
          </a>
        </div>

        <p className="text-[9px] text-slate-300">© 2026 HireDriver</p>
      </div>
    </footer>
  );
}
