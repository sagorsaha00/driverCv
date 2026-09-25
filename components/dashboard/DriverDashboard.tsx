"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Send,
  Zap,
  Bell,
  MessageSquare,
  Phone,
  User,
  Save,
  Check,
  RefreshCw,
  PhoneCall,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import {
  useDriverMessages,
  useDriverNotifications,
  useMarkMessageRead,
  useMarkNotificationRead,
  useUpdateDriverProfile,
} from "@/lib/hook/useDashboard";
import { useDriverJobs } from "@/lib/api/apiCall";
import { DriverJob } from "@/type/job";

interface DriverDashboardProps {
  onShowToast: (msg: string) => void;
}

type SimpleDriverTab = "messages" | "offers" | "jobs" | "profile";

const LICENSE_OPTIONS = [
  "Car",
  "Class B",
  "Class C (Truck)",
  "Class CE (Heavy Combo)",
  "Class D (Bus)",
  "Motorcycle",
];

const REGION_OPTIONS = [
  "Stockholm",
  "Gothenburg",
  "Malmö",
  "Uppsala",
  "Jönköping",
  "Dhaka",
  "Chattogram",
];

export default function DriverDashboard({ onShowToast }: DriverDashboardProps) {
  const { user } = useAuthStore();
  const driverId = user && "id" in user ? Number(user.id) : undefined;
  const driverData = user && "role" in user && user.role === "driver" ? (user as any) : null;

  // Active simple tab
  const [activeTab, setActiveTab] = useState<SimpleDriverTab>("messages");

  // React Query dynamic data
  const { data: messages = [], isLoading: loadingMessages } = useDriverMessages(driverId);
  const { data: notifications = [], isLoading: loadingNotifications } = useDriverNotifications(driverId);
  const { data: jobsResponse, isLoading: loadingJobs } = useDriverJobs();
  const liveJobs: DriverJob[] = Array.isArray(jobsResponse)
    ? jobsResponse
    : Array.isArray(jobsResponse?.jobs)
    ? jobsResponse.jobs
    : [];

  const markMessageReadMutation = useMarkMessageRead();
  const markNotificationReadMutation = useMarkNotificationRead();
  const updateProfileMutation = useUpdateDriverProfile();

  // Availability state
  const [isAvailable, setIsAvailable] = useState(true);

  // Job Search / Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Profile Edit Form State
  const [editForm, setEditForm] = useState({
    fullname: driverData?.fullname || "Driver",
    phonenumber: driverData?.phonenumber || "",
    targetMonthlySalary: driverData?.targetMonthlySalary ? String(driverData.targetMonthlySalary) : "35000",
    workingHours: driverData?.workingHours || "8 Hours",
    licenseCategories: Array.isArray(driverData?.licenseCategories) ? driverData.licenseCategories : ["Class B", "Class C (Truck)"],
    regions: Array.isArray(driverData?.regions) ? driverData.regions : ["Stockholm"],
  });

  // Keep form in sync when auth store updates
  useEffect(() => {
    if (driverData) {
      setEditForm({
        fullname: driverData.fullname || "Driver",
        phonenumber: driverData.phonenumber || "",
        targetMonthlySalary: driverData.targetMonthlySalary ? String(driverData.targetMonthlySalary) : "35000",
        workingHours: driverData.workingHours || "8 Hours",
        licenseCategories: Array.isArray(driverData.licenseCategories) ? driverData.licenseCategories : ["Class B"],
        regions: Array.isArray(driverData.regions) ? driverData.regions : ["Stockholm"],
      });
    }
  }, [driverData]);

  // Unread counts
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;
  const unreadOffersCount = notifications.filter((n) => !n.isRead).length;

  const toggleAvailability = () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState);
    onShowToast(
      nextState
        ? "You are now marked Available. Companies can call and hire you."
        : "You are now Off-Duty. Companies will not disturb you."
    );
  };

  // Profile Save Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverId) {
      onShowToast("Unable to identify driver account. Please log in again.");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({
        driverId,
        payload: {
          fullname: editForm.fullname.trim(),
          phonenumber: editForm.phonenumber.trim(),
          targetMonthlySalary: Number(editForm.targetMonthlySalary) || 35000,
          workingHours: editForm.workingHours,
          licenseCategories: editForm.licenseCategories,
          regions: editForm.regions,
        },
      });
      onShowToast("Profile saved successfully!");
    } catch (err: any) {
      onShowToast(err?.message || "Failed to save profile. Please try again.");
    }
  };

  // Toggle license checkbox
  const toggleLicenseCategory = (category: string) => {
    setEditForm((prev) => {
      const exists = prev.licenseCategories.includes(category);
      return {
        ...prev,
        licenseCategories: exists
          ? prev.licenseCategories.filter((c: string) => c !== category)
          : [...prev.licenseCategories, category],
      };
    });
  };

  // Toggle region checkbox
  const toggleRegion = (reg: string) => {
    setEditForm((prev) => {
      const exists = prev.regions.includes(reg);
      return {
        ...prev,
        regions: exists
          ? prev.regions.filter((r: string) => r !== reg)
          : [...prev.regions, reg],
      };
    });
  };

  // Filter live jobs
  const filteredJobs = liveJobs.filter((job: DriverJob) => {
    const q = searchQuery.toLowerCase();
    return (
      job.jobTitle.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.companyName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ========================================================
          1. SIMPLE STATUS CARD (EASY FOR ANYONE TO UNDERSTAND)
         ======================================================== */}
      <div className="rounded-3xl border-2 border-border bg-surface p-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-primary text-white text-2xl font-black flex items-center justify-center shadow-md">
              {editForm.fullname ? editForm.fullname.charAt(0).toUpperCase() : "D"}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${
                isAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-text sm:text-2xl">
                {editForm.fullname}
              </h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                Verified Driver
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">
              📞 Phone: <strong>{editForm.phonenumber || "Not set"}</strong> • Salary:{" "}
              <strong>{Number(editForm.targetMonthlySalary).toLocaleString()} SEK/mo</strong>
            </p>
          </div>
        </div>

        {/* Big Friendly Availability Button */}
        <button
          type="button"
          onClick={toggleAvailability}
          className={`px-6 py-3.5 rounded-2xl text-sm font-black transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
            isAvailable
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          <span className="text-base">{isAvailable ? "🟢" : "⚪"}</span>
          <span>{isAvailable ? "I Am Available to Work" : "I Am Off-Duty"}</span>
        </button>
      </div>

      {/* ========================================================
          2. SIMPLE 4 TABS (BIG & EASY TO CLICK)
         ======================================================== */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setActiveTab("messages")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "messages"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <span className="text-base font-black">Messages</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "messages"
                ? "bg-white/30 text-white"
                : "bg-primary-50 text-primary"
            }`}
          >
            {messages.length} messages {unreadMessagesCount > 0 ? `(${unreadMessagesCount} new)` : ""}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("offers")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "offers"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            <span className="text-base font-black">Job Offers</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "offers"
                ? "bg-white/30 text-white"
                : "bg-primary-50 text-primary"
            }`}
          >
            {notifications.length} alerts {unreadOffersCount > 0 ? `(${unreadOffersCount} new)` : ""}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "jobs"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-base font-black">Find Jobs</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "jobs"
                ? "bg-white/30 text-white"
                : "bg-primary-50 text-primary"
            }`}
          >
            {liveJobs.length} available
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            activeTab === "profile"
              ? "border-primary bg-primary text-white shadow-md"
              : "border-border bg-surface text-text hover:bg-surface-subtle"
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <span className="text-base font-black">My Profile</span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              activeTab === "profile"
                ? "bg-white/30 text-white"
                : "bg-surface-muted text-text-muted"
            }`}
          >
            Edit & Update
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: MESSAGES (SIMPLE & CLEAR)
         ======================================================== */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-text">
              Messages from Companies
            </h3>
            <span className="text-xs text-text-muted">
              {unreadMessagesCount} unread message(s)
            </span>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-3xl border-2 p-6 shadow-sm space-y-4 transition ${
                  msg.isRead
                    ? "border-border bg-surface"
                    : "border-primary/50 bg-primary-50/20"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-text">
                        {msg.senderName}
                      </span>
                      <span className="rounded-lg bg-surface-muted px-2.5 py-0.5 text-xs font-bold text-text-secondary">
                        {msg.senderCompany}
                      </span>
                      {!msg.isRead && (
                        <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black text-white">
                          NEW
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-primary mt-1">
                      {msg.subject}
                    </h4>
                    <span className="text-xs text-text-muted">
                      Sent on {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Big Call Button */}
                  <div className="flex flex-wrap items-center gap-2">
                    {msg.senderPhone && (
                      <a
                        href={`tel:${msg.senderPhone}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-4 py-2.5 text-xs font-black text-white shadow-sm hover:bg-green-700 cursor-pointer"
                      >
                        <PhoneCall className="h-4 w-4" />
                        <span>Call: {msg.senderPhone}</span>
                      </a>
                    )}

                    {msg.senderEmail && (
                      <a
                        href={`mailto:${msg.senderEmail}`}
                        className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text hover:bg-surface-muted cursor-pointer"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        <span>Email</span>
                      </a>
                    )}

                    {!msg.isRead && (
                      <button
                        type="button"
                        onClick={() => {
                          markMessageReadMutation.mutate(msg.id);
                          onShowToast("Message marked as read.");
                        }}
                        className="rounded-2xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text-muted hover:text-text cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-4 text-sm leading-relaxed text-text whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center bg-surface">
                <MessageSquare className="h-12 w-12 text-text-muted mx-auto" />
                <h4 className="text-base font-black text-text mt-3">
                  No Messages Yet
                </h4>
                <p className="text-sm text-text-muted mt-1 max-w-md mx-auto">
                  When a company finds your profile and wants to hire you, their message and phone number will appear here!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: JOB OFFERS & NOTIFICATIONS (SIMPLE & CLEAR)
         ======================================================== */}
      {activeTab === "offers" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-text">
              Direct Job Offers & Alerts
            </h3>
            <span className="text-xs text-text-muted">
              {unreadOffersCount} new alert(s)
            </span>
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => {
              const isPersonal = notif.type === "personal_offer";
              return (
                <div
                  key={notif.id}
                  className={`rounded-3xl border-2 p-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition ${
                    isPersonal
                      ? "border-amber-400 bg-amber-50/50"
                      : notif.isRead
                      ? "border-border bg-surface"
                      : "border-primary/50 bg-primary-50/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isPersonal
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-primary-50 text-primary"
                      }`}
                    >
                      {isPersonal ? <Zap className="h-6 w-6" /> : <Bell className="h-6 w-6" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-text">
                          {notif.title}
                        </h4>
                        {isPersonal && (
                          <span className="rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-black">
                            PERSONAL OFFER FOR YOU
                          </span>
                        )}
                        {!notif.isRead && (
                          <span className="rounded-full bg-primary text-white px-2 py-0.5 text-[9px] font-black">
                            NEW
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-text mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      <span className="text-xs text-text-muted block mt-1">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("jobs");
                        onShowToast("Showing available jobs.");
                      }}
                      className="rounded-2xl bg-primary px-5 py-2.5 text-xs font-black text-white hover:bg-primary-hover shadow-sm cursor-pointer"
                    >
                      View Details
                    </button>

                    {!notif.isRead && (
                      <button
                        type="button"
                        onClick={() => {
                          markNotificationReadMutation.mutate(notif.id);
                          onShowToast("Notification marked as read.");
                        }}
                        className="rounded-2xl border border-border bg-surface px-3 py-2 text-xs font-bold text-text-muted hover:text-text cursor-pointer"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {notifications.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center bg-surface">
                <Bell className="h-12 w-12 text-text-muted mx-auto" />
                <h4 className="text-base font-black text-text mt-3">
                  No Offers Yet
                </h4>
                <p className="text-sm text-text-muted mt-1">
                  Whenever an employer offers you a job, it will show up right here!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: FIND JOBS (SIMPLE LIST & EASY APPLY)
         ======================================================== */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-black text-text">
              Available Jobs ({liveJobs.length})
            </h3>

            {/* Simple Search */}
            <div className="relative min-w-[260px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search by city or job name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border-2 border-border bg-surface p-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hover:border-primary/50 transition"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-black text-text">
                      {job.jobTitle}
                    </h4>
                    <span className="rounded-lg bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {job.vehicleRequired}
                    </span>
                    <span className="rounded-lg bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
                      {job.companyName}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 font-bold">
                      <MapPin className="h-4 w-4 text-primary" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.employmentType} ({job.workingHours})</span>
                    <span>•</span>
                    <span className="font-black text-green-700 text-sm">
                      💰 {job.salaryAmount} ({job.salaryType})
                    </span>
                  </p>

                  {job.jobDescription && (
                    <p className="text-xs text-text-muted line-clamp-2 mt-1">
                      {job.jobDescription}
                    </p>
                  )}
                </div>

                <div className="sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onShowToast(`Application sent for ${job.jobTitle}! Employer has your details.`);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-primary-hover cursor-pointer"
                  >
                    <span>Apply for this Job</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center bg-surface">
                <Briefcase className="h-12 w-12 text-text-muted mx-auto" />
                <h4 className="text-base font-black text-text mt-3">
                  No Jobs Found
                </h4>
                <p className="text-sm text-text-muted mt-1">
                  Try clearing your search.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: MY PROFILE & EDIT (VERY SIMPLE FORM)
         ======================================================== */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-black text-text">
              My Profile & Information
            </h3>
            <p className="text-sm text-text-muted">
              Update your information below so employers can contact and hire you easily.
            </p>
          </div>

          <form
            onSubmit={handleSaveProfile}
            className="rounded-3xl border-2 border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-black text-text mb-1.5">
                My Full Name
              </label>
              <input
                type="text"
                required
                value={editForm.fullname}
                onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-base text-text outline-none focus:border-primary"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-black text-text mb-1.5">
                Phone Number (Where companies can call you)
              </label>
              <input
                type="text"
                required
                value={editForm.phonenumber}
                onChange={(e) => setEditForm({ ...editForm, phonenumber: e.target.value })}
                className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-base text-text outline-none focus:border-primary"
              />
            </div>

            {/* Salary & Hours */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-black text-text mb-1.5">
                  Expected Monthly Salary (SEK)
                </label>
                <input
                  type="number"
                  required
                  value={editForm.targetMonthlySalary}
                  onChange={(e) => setEditForm({ ...editForm, targetMonthlySalary: e.target.value })}
                  className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-base text-text outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-text mb-1.5">
                  Working Hours Preference
                </label>
                <select
                  value={editForm.workingHours}
                  onChange={(e) => setEditForm({ ...editForm, workingHours: e.target.value })}
                  className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-base text-text outline-none focus:border-primary cursor-pointer"
                >
                  <option value="8 Hours">8 Hours (Normal Day)</option>
                  <option value="10 Hours">10 Hours</option>
                  <option value="12 Hours">12 Hours (Shift)</option>
                  <option value="Flexible Shift">Flexible</option>
                </select>
              </div>
            </div>

            {/* License Categories */}
            <div>
              <label className="block text-sm font-black text-text mb-2">
                What vehicles can you drive? (Click to select)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {LICENSE_OPTIONS.map((cat) => {
                  const selected = editForm.licenseCategories.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleLicenseCategory(cat)}
                      className={`px-4 py-2.5 rounded-2xl text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                        selected
                          ? "bg-primary text-white shadow-sm"
                          : "border-2 border-border bg-surface text-text hover:bg-surface-subtle"
                      }`}
                    >
                      {selected && <Check className="h-4 w-4" />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regions / Cities */}
            <div>
              <label className="block text-sm font-black text-text mb-2">
                Cities you can work in (Click to select)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {REGION_OPTIONS.map((reg) => {
                  const selected = editForm.regions.includes(reg);
                  return (
                    <button
                      type="button"
                      key={reg}
                      onClick={() => toggleRegion(reg)}
                      className={`px-4 py-2.5 rounded-2xl text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                        selected
                          ? "bg-primary text-white shadow-sm"
                          : "border-2 border-border bg-surface text-text hover:bg-surface-subtle"
                      }`}
                    >
                      {selected && <Check className="h-4 w-4" />}
                      <span>{reg}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Big Green Save Button */}
            <div className="pt-4 border-t border-border">
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-600 px-8 py-4 text-base font-black text-white shadow-md hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Save My Profile</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
