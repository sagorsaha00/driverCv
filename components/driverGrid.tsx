"use client";

import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";  

const drivers = [
  {
    id: 1,
    name: "Arman Hassan",
    role: "Taxi & Rideshare Driver",
    loc: "Stockholm",
    rate: "4.9",
    status: "Available Now",
    init: "AH",
  },
  {
    id: 2,
    name: "Emma Lindqvist",
    role: "Heavy Truck Driver (CE)",
    loc: "Gothenburg",
    rate: "5.0",
    status: "Available in 2 days",
    init: "EL",
  },
  {
    id: 3,
    name: "Johan Berg",
    role: "Coach & Bus Driver",
    loc: "Malmö",
    rate: "4.8",
    status: "Weekends Only",
    init: "JB",
  },
];

export default function DriverGridSection() {
  const router = useRouter();

  // Dynamic routing function using driver ID
  const handleViewProfile = (id?: number) => {
    if (id) {
      router.push(`/driverProfile/${id}`);
    } else {
      router.push("/ExploreDrivers");  
    }
  };

  return (
    <section className="bg-slate-50/80 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
              VERIFIED PROFESSIONALS
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-3xl">
              Drivers in Your Area
            </h2>
          </div>
          <button
            onClick={() => handleViewProfile()}
            className="cursor-pointer text-left text-xs font-bold text-[#2563EB] hover:underline sm:text-right"
          >
            Explore All Drivers →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((d) => (
            <motion.div
              key={d.id}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-sm font-black text-[#2563EB]">
                  {d.init}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{d.name}</h3>
                  <p className="text-[11px] text-slate-500">{d.role}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {d.loc}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <b>{d.rate}</b>
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {d.status}
              </div>

              {/* Dynamic ID onClick Listener added below */}
              <button
                onClick={() => handleViewProfile(d.id)}
                className="mt-4 w-full cursor-pointer rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#2563EB]"
              >
                View Profile →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
