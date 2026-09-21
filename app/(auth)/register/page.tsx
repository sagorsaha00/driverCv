"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  Banknote,
  Car,
  FileCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  X,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const vehicleOptions = [
  "Personbil / Private Car (B)",
  "Lätt Lastbil / Light Truck (B)",
  "Tung Lastbil / Heavy Truck (C)",
  "Lastbil med Släp / Truck with Trailer (CE)",
  "Buss / Bus (D)",
  "Taxi (Taxiförarlegitimation - TKT)",
  "Truckkort / Forklift (A1-A4)",
  "ADR / Dangerous Goods Transport",
];

const swedishRegions = [
  "Stockholm",
  "Göteborg (Västra Götaland)",
  "Malmö (Skåne)",
  "Uppsala",
  "Jönköping",
  "Östergötland",
  "Västerås",
  "Hela Sverige / Nationwide",
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"driver" | "employer">("driver");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customLocation, setCustomLocation] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    orgNumber: "",
    vehicleTypes: [] as string[],
    workingHours: "Full-time (Heltid)",
    weekendAvailable: "Flexible / Shift work",
    preferredAreas: ["Stockholm"] as string[],
    expectedSalary: "",
    licenseNumber: "",
    personNumber: "",
    hasYKB: true,
    hasDigitalTacho: true,
  });

  const toggleArrayItem = (value: string) => {
    setFormData((prev) => {
      const exists = prev.vehicleTypes.includes(value);
      return {
        ...prev,
        vehicleTypes: exists
          ? prev.vehicleTypes.filter((i) => i !== value)
          : [...prev.vehicleTypes, value],
      };
    });
  };

  const addPreferredArea = (area: string) => {
    if (!area.trim()) return;
    if (!formData.preferredAreas.includes(area.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferredAreas: [...prev.preferredAreas, area.trim()],
      }));
    }
    setCustomLocation("");
  };

  const removeArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredAreas: prev.preferredAreas.filter((item) => item !== area),
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "driver") {
        router.push("/EmployerJobFeed");
      } else {
        router.push("/ExploreDrivers");
      }
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-background text-foreground">
      {/* Left Feature Column (Desktop) */}
      <div className="relative hidden w-2/5 overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between border-r border-border">
        <div className="relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Fast-Track Onboarding</span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight">
            {role === "driver"
              ? "Get Direct Access to Verified Driving Contracts"
              : "Source Pre-Screened Drivers for Your Fleet"}
          </h2>

          <p className="mt-4 text-xs leading-relaxed opacity-80">
            {role === "driver"
              ? "Join Sweden's largest vetted driver network. Keep 100% of your agreed compensation with zero commission deductions."
              : "Post vacancies in under 2 minutes, review verified driver credentials, and dispatch without intermediary overheads."}
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-xs opacity-90">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Free registration with immediate profile activation</span>
            </div>
            <div className="flex items-center gap-3 text-xs opacity-90">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Full compliance with Swedish transport regulations</span>
            </div>
            <div className="flex items-center gap-3 text-xs opacity-90">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Direct communication via in-app messenger</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Wizard */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl text-card-foreground sm:p-10">
            {/* Title */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-black">
                Create an Account
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {role === "driver"
                  ? "Register as a licensed professional driver and connect with employers"
                  : "Register as a company or fleet manager to hire verified drivers"}
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-xl bg-muted p-1 border border-border">
              <button
                type="button"
                onClick={() => {
                  setRole("driver");
                  setStep(1);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  role === "driver"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Car className="h-4 w-4" />
                <span>I Am a Driver</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole("employer");
                  setStep(1);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  role === "employer"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>I Want to Hire Drivers</span>
              </button>
            </div>

            {/* Step Indicators for Driver */}
            {role === "driver" && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                        step >= s
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="h-3.5 w-3.5" /> : s}
                    </span>
                    {s < 3 && (
                      <span
                        className={`h-0.5 w-8 sm:w-12 rounded-full transition-all ${
                          step > s ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleRegister} className="mt-6">
              <AnimatePresence mode="wait">
                {/* STEP 1: Basic Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Step 1: Account Credentials
                    </h3>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-foreground">
                        {role === "driver"
                          ? "Full Name"
                          : "Contact Person Name"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={
                            role === "driver"
                              ? "e.g. Lars Lindqvist"
                              : "e.g. Maria Eriksson"
                          }
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>

                    {role === "employer" && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-bold text-foreground">
                            Company Name (Företagsnamn)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="e.g. ScanLogistics AB"
                              value={formData.companyName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  companyName: e.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                            />
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-foreground">
                            Organization Number (Org.nr)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="556123-4567"
                            value={formData.orgNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                orgNumber: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background py-2.5 px-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="name@example.se"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          />
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Phone Number (Sweden)
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="+46 70 123 45 67"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          />
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-foreground">
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          placeholder="At least 8 characters"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>

                    {role === "driver" ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            !formData.fullName ||
                            !formData.email ||
                            !formData.phone
                          ) {
                            alert(
                              "Please fill in your name, email, and phone number.",
                            );
                            return;
                          }
                          setStep(2);
                        }}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md opacity-90 hover:opacity-100 cursor-pointer"
                      >
                        <span>Next: Driving Capabilities</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md opacity-90 hover:opacity-100 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Creating company account...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Employer Registration</span>
                            <CheckCircle2 className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Driving Capabilities (Driver Only) */}
                {step === 2 && role === "driver" && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Step 2: Licenses &amp; Driving Preferences
                    </h3>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-foreground">
                        License Categories You Hold:
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {vehicleOptions.map((v) => {
                          const selected = formData.vehicleTypes.includes(v);
                          return (
                            <button
                              key={v}
                              type="button"
                              onClick={() => toggleArrayItem(v)}
                              className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                                selected
                                  ? "border-primary bg-muted text-foreground shadow-2xs"
                                  : "border-border bg-background text-muted-foreground hover:border-foreground/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px]">{v}</span>
                                {selected && (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Working Hours / Availability
                        </label>
                        <select
                          value={formData.workingHours}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              workingHours: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-background p-2.5 text-xs font-bold text-foreground focus:border-primary focus:outline-none"
                        >
                          <option>Full-time (Heltid 8-10 hrs)</option>
                          <option>Part-time (Deltid)</option>
                          <option>Weekend Shifts Only (Helgpass)</option>
                          <option>Flexible / On-Demand (Extra)</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Target Monthly Salary (SEK)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="e.g. 34000"
                            value={formData.expectedSalary}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                expectedSalary: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
                          />
                          <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Preferred Operating Regions */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-foreground">
                        Operating Regions (Län / Cities):
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type city (e.g. Uppsala, Helsingborg)..."
                          value={customLocation}
                          onChange={(e) => setCustomLocation(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addPreferredArea(customLocation);
                            }
                          }}
                          className="flex-1 rounded-xl border border-border bg-background py-2 px-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => addPreferredArea(customLocation)}
                          className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>

                      {/* Common Region Pills */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {swedishRegions.map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={() => addPreferredArea(region)}
                            className="rounded-lg border border-border bg-muted/50 px-2 py-1 text-[10px] font-medium text-muted-foreground hover:border-primary hover:text-foreground cursor-pointer"
                          >
                            + {region}
                          </button>
                        ))}
                      </div>

                      {/* Selected Areas */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {formData.preferredAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-muted border border-border px-2.5 py-1 text-xs font-semibold text-foreground"
                          >
                            <MapPin className="h-3 w-3 text-primary" />
                            <span>{area}</span>
                            <button
                              type="button"
                              onClick={() => removeArea(area)}
                              className="text-muted-foreground hover:text-foreground ml-0.5 cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-border py-3 text-xs font-bold text-foreground hover:bg-muted cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 cursor-pointer"
                      >
                        <span>Next: Verification &amp; Docs</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Verification (Driver Only) */}
                {step === 3 && role === "driver" && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Step 3: Identity Verification &amp; Credentials
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Personal Identity Number (Personnummer)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="YYYYMMDD-XXXX"
                          value={formData.personNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              personNumber: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-background py-2.5 px-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-foreground">
                          Driving License Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. 19900101-1234"
                            value={formData.licenseNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                licenseNumber: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                          />
                          <FileCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Certifications & Tacho Checkboxes */}
                    <div className="space-y-2 rounded-xl bg-muted/40 p-3.5 border border-border">
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-wide">
                        Swedish Professional Qualification Checklist
                      </p>

                      <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasYKB}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasYKB: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span>
                          YKB Certificate (Yrkeskompetensbevis) Active
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasDigitalTacho}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasDigitalTacho: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span>
                          Digital Tachograph Card (Förarkort för färdskrivare)
                        </span>
                      </label>
                    </div>

                    {/* Resume / Document Upload */}
                    <div>
                      <label className="mb-1 block text-xs font-bold text-foreground">
                        Upload Driving CV / Certificates (Optional)
                      </label>
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-xs font-semibold text-foreground">
                          Click or drag files here to upload
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          PDF, DOCX up to 10MB
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-border py-3 text-xs font-bold text-foreground hover:bg-muted cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Creating Driver Profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Driver Registration</span>
                            <CheckCircle2 className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-foreground hover:underline"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
