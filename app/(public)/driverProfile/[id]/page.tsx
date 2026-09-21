"use client";
import React, { useState } from "react";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Car,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  MoreVertical,
  Award,
  DollarSign,
  Calendar,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function DriverProfileView() {
  const [activeTab, setActiveTab] = useState("overview");

  // Driver mock data aligned with custom design system tokens
  const driver = {
    name: "Marcus Vance",
    id: "DRV-84920",
    rating: 4.92,
    totalRides: 1420,
    completionRate: "98.5%",
    status: "Active",
    joinedDate: "March 2023",
    email: "marcus.vance@example.com",
    phone: "+1 (555) 234-5678",
    location: "Austin, Texas",
    vehicle: {
      model: "Toyota Camry Hybrid",
      year: "2022",
      plate: "TX-90210",
      color: "Forest Green",
      vin: "4T1B11HK5MW123456",
    },
    documents: [
      { name: "Driver's License", status: "Verified", date: "Exp. 2028" },
      { name: "Vehicle Registration", status: "Verified", date: "Exp. 2027" },
      { name: "Background Check", status: "Verified", date: "Passed Apr 2026" },
      {
        name: "Insurance Certificate",
        status: "Pending Review",
        date: "Uploaded yesterday",
      },
    ],
    recentRides: [
      {
        id: "R-9081",
        date: "Today, 2:15 PM",
        pickup: "Downtown Plaza",
        dropoff: "Airport Terminal 2",
        fare: "$34.50",
        status: "Completed",
      },
      {
        id: "R-9078",
        date: "Today, 11:30 AM",
        pickup: "West End Station",
        dropoff: "Oakridge Mall",
        fare: "$18.20",
        status: "Completed",
      },
      {
        id: "R-9065",
        date: "Yesterday, 6:40 PM",
        pickup: "Tech Park Block B",
        dropoff: "Sunset Avenue",
        fare: "$22.00",
        status: "Completed",
      },
      {
        id: "R-9042",
        date: "Yesterday, 1:10 PM",
        pickup: "Grand Avenue",
        dropoff: "Central Park East",
        fare: "$15.80",
        status: "Completed",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* --- BREADCRUMB & TOP HEADER ACTIONS --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-subtle)] mb-1">
              <span>Drivers</span>
              <span>/</span>
              <span className="text-[var(--text)] font-medium">
                {driver.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Driver Profile
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow-xs)] transition-colors"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-[var(--on-primary)] rounded-[var(--radius)] shadow-[var(--shadow-xs)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)]"
            >
              Assign Trip
            </button>
          </div>
        </div>

        {/* --- MAIN PROFILE BANNER CARD --- */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Driver Identity */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[var(--radius-lg)] bg-[var(--primary-100)] text-[var(--primary-800)] flex items-center justify-center text-2xl font-bold border-2 border-[var(--primary-200)]">
                  MV
                </div>
                <span className="absolute -bottom-1 -right-1 p-1 bg-[var(--success)] text-white rounded-full border-2 border-[var(--surface)]">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                    {driver.name}
                  </h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-[var(--radius-sm)] bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)]/20">
                    {driver.status}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[var(--text-subtle)]" />
                  {driver.vehicle.color} {driver.vehicle.model} •{" "}
                  <span className="font-mono text-xs">
                    {driver.vehicle.plate}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[var(--text-subtle)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {driver.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Joined {driver.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Rating & Completion Metrics */}
            <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border)]">
              <div className="text-left md:text-right">
                <div className="flex items-center md:justify-end gap-1 text-[var(--warning)] font-bold text-lg">
                  <Star className="w-5 h-5 fill-[var(--warning)] text-[var(--warning)]" />
                  <span>{driver.rating}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Rating (480 reviews)
                </p>
              </div>

              <div className="h-8 w-px bg-[var(--border)] hidden sm:block"></div>

              <div className="text-left md:text-right">
                <p className="text-lg font-bold text-[var(--text)]">
                  {driver.totalRides}
                </p>
                <p className="text-xs text-[var(--text-muted)]">Total Trips</p>
              </div>

              <div className="h-8 w-px bg-[var(--border)] hidden sm:block"></div>

              <div className="text-left md:text-right">
                <p className="text-lg font-bold text-[var(--primary)]">
                  {driver.completionRate}
                </p>
                <p className="text-xs text-[var(--text-muted)]">Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- KEY STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-subtle)] font-medium uppercase tracking-wider">
                Weekly Revenue
              </span>
              <div className="p-2 bg-[var(--surface-muted)] text-[var(--primary)] rounded-[var(--radius-sm)]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text)] mt-2">
              $1,240.50
            </p>
            <p className="text-xs text-[var(--success)] font-medium mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last week
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-subtle)] font-medium uppercase tracking-wider">
                Hours Online
              </span>
              <div className="p-2 bg-[var(--surface-muted)] text-[var(--primary)] rounded-[var(--radius-sm)]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text)] mt-2">
              38.5 hrs
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Target: 40 hrs/week
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-subtle)] font-medium uppercase tracking-wider">
                Acceptance Rate
              </span>
              <div className="p-2 bg-[var(--surface-muted)] text-[var(--primary)] rounded-[var(--radius-sm)]">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text)] mt-2">94%</p>
            <p className="text-xs text-[var(--success)] font-medium mt-1">
              Top tier driver
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-xs)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-subtle)] font-medium uppercase tracking-wider">
                Safety Score
              </span>
              <div className="p-2 bg-[var(--surface-muted)] text-[var(--primary)] rounded-[var(--radius-sm)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text)] mt-2">
              99 / 100
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              0 incidents reported
            </p>
          </div>
        </div>

        {/* --- TABS NAVIGATION --- */}
        <div className="border-b border-[var(--border)] flex items-center gap-6 text-sm font-medium">
          {["overview", "trips", "documents", "vehicle"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition-colors relative ${
                activeTab === tab
                  ? "text-[var(--primary)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* --- TAB CONTENT AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Trips List */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-xs)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[var(--text)]">
                  Recent Trips
                </h3>
                <button
                  type="button"
                  className="text-xs text-[var(--primary)] font-semibold hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {driver.recentRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[var(--text)]">
                          {ride.id}
                        </span>
                        <span className="text-xs text-[var(--text-subtle)]">
                          • {ride.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--text)]">
                        {ride.pickup}{" "}
                        <span className="text-[var(--text-subtle)] font-normal">
                          →
                        </span>{" "}
                        {ride.dropoff}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-[var(--text)]">
                        {ride.fare}
                      </p>
                      <span className="text-xs text-[var(--success)] font-medium">
                        {ride.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Verification Section */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-xs)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[var(--text)]">
                  Compliance & Documents
                </h3>
                <span className="text-xs text-[var(--text-muted)]">
                  4 Uploaded
                </span>
              </div>

              <div className="space-y-3">
                {driver.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text-muted)]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">
                          {doc.name}
                        </p>
                        <p className="text-xs text-[var(--text-subtle)]">
                          {doc.date}
                        </p>
                      </div>
                    </div>

                    <div>
                      {doc.status === "Verified" ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--success-bg)] text-[var(--success)] font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--warning-bg)] text-[var(--warning)] font-medium">
                          <AlertCircle className="w-3 h-3" />
                          Pending Review
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-xs)] space-y-4">
              <h3 className="text-base font-bold text-[var(--text)]">
                Contact Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <Mail className="w-4 h-4 text-[var(--text-subtle)] flex-shrink-0" />
                  <span className="truncate text-[var(--text)]">
                    {driver.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <Phone className="w-4 h-4 text-[var(--text-subtle)] flex-shrink-0" />
                  <span className="text-[var(--text)]">{driver.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <MapPin className="w-4 h-4 text-[var(--text-subtle)] flex-shrink-0" />
                  <span className="text-[var(--text)]">{driver.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex gap-2">
                <button
                  type="button"
                  className="w-full py-2 bg-[var(--surface-muted)] hover:bg-[var(--primary)] hover:text-white border border-[var(--border)] text-[var(--text)] text-xs font-semibold rounded-[var(--radius-sm)] transition-colors flex items-center justify-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  className="w-full py-2 bg-[var(--surface-muted)] hover:bg-[var(--primary)] hover:text-white border border-[var(--border)] text-[var(--text)] text-xs font-semibold rounded-[var(--radius-sm)] transition-colors flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> Call
                </button>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-xs)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[var(--text)]">
                  Assigned Vehicle
                </h3>
                <span className="p-1 text-[var(--text-subtle)] hover:text-[var(--text)] cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </span>
              </div>

              <div className="p-3 bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded-[var(--radius)] flex items-center gap-3">
                <Car className="w-8 h-8 text-[var(--primary)] flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[var(--text)]">
                    {driver.vehicle.model}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {driver.vehicle.year} • {driver.vehicle.color}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-subtle)]">
                    License Plate
                  </span>
                  <span className="font-mono font-bold text-[var(--text)]">
                    {driver.vehicle.plate}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-subtle)]">VIN</span>
                  <span className="font-mono text-[var(--text-muted)] text-[11px]">
                    {driver.vehicle.vin}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-subtle)]">
                    Inspection Status
                  </span>
                  <span className="font-medium text-[var(--success)]">
                    Passed (2026)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
