"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Banknote,
  Car,
  Filter,
  Building2,
  Calendar,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  licenseRequired: string;
  employmentType: string;
  salary: string;
  postedDate: string;
  description: string;
  tags: string[];
}

const mockJobs: JobPost[] = [
  {
    id: "1",
    title: "C-Driver for Distribution",
    company: "Nordic Transport AB",
    location: "Stockholm",
    licenseRequired: "Heavy Truck (C)",
    employmentType: "Full-time",
    salary: "32,000 SEK / month",
    postedDate: "2 days ago",
    description:
      "We are looking for an experienced C-driver for local distribution in the Stockholm area. Daytime shifts with fixed routes.",
    tags: ["YKB Required", "Daytime", "Local Transport"],
  },
  {
    id: "2",
    title: "Bus Driver for Public Transit",
    company: "Sverige Buss & Travel",
    location: "Gothenburg",
    licenseRequired: "Bus (D)",
    employmentType: "Full-time",
    salary: "30,500 SEK / month",
    postedDate: "Today",
    description:
      "Seeking a bus driver for scheduled route services in Gothenburg. We offer competitive terms and shift work.",
    tags: ["D License", "Shift Work", "Collective Agreement"],
  },
  {
    id: "3",
    title: "Taxi Driver / Rideshare Driver",
    company: "City Cab Sweden",
    location: "Malmö",
    licenseRequired: "Taxi (TKT)",
    employmentType: "Part-time / On-demand",
    salary: "180 SEK / hour",
    postedDate: "3 days ago",
    description:
      "Seeking drivers with a valid Taxi Driver Badge (TKT) for driving during weekends and evenings.",
    tags: ["TKT Required", "Flexible Hours", "Rideshare"],
  },
  {
    id: "4",
    title: "CE-Driver Long-Haul Transport",
    company: "ScanLogistics AB",
    location: "Jönköping",
    licenseRequired: "Truck & Trailer (CE)",
    employmentType: "Full-time",
    salary: "36,000 SEK / month",
    postedDate: "1 week ago",
    description:
      "Long-distance driving with heavy truck and trailer between Jönköping and northern Sweden (Norrland).",
    tags: ["CE License", "YKB Required", "Long-Haul Transport"],
  },
];

export default function EmployerJobFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState("All");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === "All" || job.location === selectedLocation;
    const matchesLicense =
      selectedLicense === "All" ||
      job.licenseRequired.includes(selectedLicense);

    return matchesSearch && matchesLocation && matchesLicense;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">
            Active Company Vacancies
          </span>
          <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
            Available Driver Jobs in Sweden
          </h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Browse driver listings posted directly by verified transport
            companies
          </p>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Region Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              >
                <option value="All">All Locations (Alla Län)</option>
                <option value="Stockholm">Stockholm</option>
                <option value="Göteborg">Göteborg</option>
                <option value="Malmö">Malmö</option>
                <option value="Jönköping">Jönköping</option>
              </select>
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* License Filter */}
            <div className="relative">
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
              >
                <option value="All">All License Types</option>
                <option value="C">C - Heavy Truck</option>
                <option value="CE">CE - Truck & Trailer</option>
                <option value="D">D - Bus</option>
                <option value="Taxi">Taxi (TKT)</option>
              </select>
              <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Job Cards Feed */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#2563EB] hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  {/* Left Info Column */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
                        {job.licenseRequired}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {job.postedDate}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-[#2563EB]">
                        {job.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {job.employmentType}
                        </span>
                      </div>
                    </div>

                    <p className="line-clamp-2 text-xs text-slate-500">
                      {job.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Salary & Action Column */}
                  <div className="flex flex-row items-center justify-between border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="block text-[10px] font-bold uppercase text-slate-400">
                        Salary
                      </span>
                      <span className="text-sm font-black text-[#2563EB]">
                        {job.salary}
                      </span>
                    </div>

                    <button className="mt-2 flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700">
                      <span>Apply Now</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              <p className="text-xs font-bold">
                No job vacancies found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
