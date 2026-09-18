"use client";

import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  Download,
  Clock,
  CheckCircle2,
  Award,
  CalendarCheck,
  Truck,
  BadgeCheck,
  TrendingUp,
  MessageSquare,
  Bookmark,
} from "lucide-react";

interface DriverProfileProps {
  driver?: any;
  onBack?: () => void;
}

export default function DriverProfileView({
  driver,
  onBack,
}: DriverProfileProps) {
  // Fallback dummy data if driver prop is missing
  const data = driver || {
    name: "Lars Lindqvist",
    role: "Heavy Truck Driver (CE)",
    location: "Stockholm, Sweden",
    exp: "8 Years",
    rating: "4.9",
    reviewCount: 18,
    salary: "38,000 SEK/mo",
    verified: true,
    initials: "LL",
    phone: "+46 70 123 4567",
    email: "lars.lindqvist@example.se",
    responseTime: "Usually replies within 2 hours",
    availability: "Available Immediately",
    safetyScore: "Zero incidents / 8 yrs",
    vehicleTypes: ["Semi-trailer", "Refrigerated", "Tautliner", "Tanker"],
    languages: ["Swedish", "English", "Finnish"],
    about:
      "Professional Heavy Truck Driver with over 8 years of experience in long-haul freight and regional distribution across Sweden and the Nordics. Proven track record of zero-accident driving, excellent route optimization skills, and meticulous vehicle inspection.",
    licenses: [
      { name: "Class CE (Heavy Trailer)", status: "Verified" },
      { name: "Class C (Heavy Truck)", status: "Verified" },
      { name: "CPC (Yrkeskompetensbevis)", status: "Verified" },
      { name: "ADR Certification", status: "Pending renewal" },
    ],
    experience: [
      {
        id: 1,
        company: "Nordic Logistics AB",
        location: "Stockholm",
        role: "Senior Freight Driver (CE)",
        period: "2021 - Present",
        type: "Full-time",
        highlights: [
          "Managed intercity freight routes connecting Stockholm, Gothenburg, and Malmö.",
          "Maintained a 99.8% on-time delivery rate with zero safety incidents over 3 years.",
          "Handled daily vehicle safety logs and digital tachograph compliance.",
        ],
      },
      {
        id: 2,
        company: "Svea Transport Services",
        location: "Uppsala",
        role: "Distribution Van Driver",
        period: "2018 - 2021",
        type: "Full-time",
        highlights: [
          "Executed last-mile parcel deliveries across Eastern Sweden.",
          "Operated refrigerated delivery trucks under strict temperature monitoring.",
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: "Stockholm Transport Academy",
        degree: "Professional Driver Certification (CE)",
        year: "2018",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:border-[#6082B6] hover:text-[#6082B6]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Drivers</span>
          </button>
        )}

        {/* Profile Banner / Header Card */}
        <div className="relative overflow-hidden rounded-bl-3xl rounded-tr-3xl rounded-tl-xl rounded-br-xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Profile Avatar */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#6082B6]/10 text-xl font-black text-[#6082B6]">
                {data.initials}
                {data.verified && (
                  <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                    <BadgeCheck className="h-3.5 w-3.5 text-white" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-[#36454F]">
                    {data.name}
                  </h1>
                </div>

                <p className="mt-1 text-xs font-bold text-[#6082B6]">
                  {data.role}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {data.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <b className="text-[#36454F]">{data.rating}</b> (
                    {data.reviewCount} ratings)
                  </span>
                </div>

                {/* Availability pill — the thing a hiring manager scans for first */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {data.availability}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                    <MessageSquare className="h-3 w-3" />
                    {data.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions — hire-oriented, primary action is unmistakable */}
            <div className="flex w-full flex-col gap-2 sm:w-48">
              <button className="flex items-center justify-center gap-2 rounded-bl-xl rounded-tr-2xl rounded-tl-md rounded-br-md bg-[#6082B6] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#4F71A5]">
                <CalendarCheck className="h-3.5 w-3.5" />
                <span>Request Interview</span>
              </button>
              <div className="flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-700 transition-colors hover:bg-slate-100">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  Message
                </button>
                <button
                  aria-label="Save driver"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 transition-colors hover:bg-slate-100"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#6082B6] underline-offset-2 hover:underline">
                <Download className="h-3.5 w-3.5" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Left Content */}
          <div className="space-y-6 lg:col-span-8">
            {/* About Section */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
                About
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {data.about}
              </p>

              {/* Vehicle types as scannable tags — the fastest fit check for a hiring manager */}
              {data.vehicleTypes && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {data.vehicleTypes.map((v: string) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                    >
                      <Truck className="h-3 w-3 text-slate-400" />
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Work Experience Section */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <Briefcase className="h-4 w-4 text-[#6082B6]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
                  Work Experience
                </h3>
              </div>

              <div className="mt-5 space-y-6">
                {data.experience.map((item: any) => (
                  <div
                    key={item.id}
                    className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-full before:w-[2px] before:bg-slate-200 last:before:hidden"
                  >
                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#6082B6]" />

                    <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                      <h4 className="text-xs font-bold text-[#36454F]">
                        {item.role}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-0.5 text-[11px] font-semibold text-[#6082B6]">
                      {item.company} •{" "}
                      <span className="font-normal text-slate-400">
                        {item.location}
                      </span>
                    </p>

                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-500">
                      {item.highlights.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <GraduationCap className="h-4 w-4 text-[#6082B6]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
                  Education & Driving Certification
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                {data.education.map((edu: any) => (
                  <div
                    key={edu.id}
                    className="flex items-start justify-between rounded-xl bg-slate-50 p-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#36454F]">
                        {edu.degree}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Info */}
          <div className="space-y-6 lg:col-span-4">
            {/* Trust & Safety — the card an employer checks before anything else */}
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Trust & Safety
                </h3>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700/80">Identity verified</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700/80">Background check</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700/80">Safety record</span>
                  <span className="font-bold text-emerald-800">
                    {data.safetyScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#6082B6]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
                  Quick Stats
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Total Experience</span>
                  <span className="font-bold text-[#36454F]">{data.exp}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Expected Salary</span>
                  <span className="font-bold text-[#36454F]">
                    {data.salary}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Employment Type</span>
                  <span className="font-bold text-[#36454F]">Full-time</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Languages</span>
                  <span className="font-bold text-[#36454F]">
                    {data.languages?.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Driving Status</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </div>
              </div>
            </div>

            {/* Valid Licenses — status per item, not just a flat list */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#6082B6]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#36454F]">
                  Licenses & Permits
                </h3>
              </div>

              <div className="space-y-2">
                {data.licenses.map((lic: any, i: number) => {
                  const verified = lic.status === "Verified";
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
                    >
                      <span className="text-xs font-semibold text-slate-700">
                        {lic.name}
                      </span>
                      <span
                        className={`shrink-0 text-[9px] font-bold ${
                          verified ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {lic.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#36454F]">
                Direct Contact
              </h3>

              <div className="space-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#6082B6]" />
                  <span>{data.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#6082B6]" />
                  <span className="truncate">{data.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
