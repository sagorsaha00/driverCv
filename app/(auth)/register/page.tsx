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
    <div className="flex min-h-[calc(100vh-65px)] bg-zinc-50">
      {/* Left Feature Column (Desktop) */}
      <div className="relative hidden w-2/5 overflow-hidden bg-black p-12 text-white lg:flex lg:flex-col lg:justify-between border-r border-zinc-900">
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg">
              <Car className="h-5 w-5 text-black" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Driver<span className="text-zinc-500">CVs</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-300">
            <Sparkles className="h-3 w-3 text-white" />
            <span>Fast-Track Onboarding</span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white">
            {role === "driver"
              ? "Get Direct Access to Verified Driving Contracts"
              : "Source Pre-Screened Drivers for Your Fleet"}
          </h2>

          <p className="mt-4 text-xs leading-relaxed text-zinc-400">
            {role === "driver"
              ? "Join Sweden's largest vetted driver network. Keep 100% of your agreed compensation with zero commission deductions."
              : "Post vacancies in under 2 minutes, review verified driver credentials, and dispatch without intermediary overheads."}
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Free registration with immediate profile activation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Full compliance with Swedish transport regulations</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
              <span>Direct communication via in-app messenger</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-zinc-500">
          <p>
            © {new Date().getFullYear()} DriverCVs Nordic AB. Sweden Transport
            Registry Compliant.
          </p>
        </div>
      </div>

      {/* Right Form Wizard */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/50 sm:p-10">
            {/* Title */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-black">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-black text-black">
                Create an Account
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                {role === "driver"
                  ? "Register as a licensed professional driver and connect with employers"
                  : "Register as a company or fleet manager to hire verified drivers"}
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-xl bg-zinc-100 p-1 border border-zinc-200">
              <button
                type="button"
                onClick={() => {
                  setRole("driver");
                  setStep(1);
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  role === "driver"
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
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
                    ? "bg-black text-white shadow-xs"
                    : "text-zinc-600 hover:text-black"
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
                          ? "bg-black text-white shadow-xs"
                          : "bg-zinc-200 text-zinc-500"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="h-3.5 w-3.5" /> : s}
                    </span>
                    {s < 3 && (
                      <span
                        className={`h-0.5 w-8 sm:w-12 rounded-full transition-all ${
                          step > s ? "bg-black" : "bg-zinc-200"
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Step 1: Account Credentials
                    </h3>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-black">
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
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      </div>
                    </div>

                    {role === "employer" && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-bold text-black">
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
                              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                            />
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-black">
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
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
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
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                          />
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
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
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                          />
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-black">
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
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                        />
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
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
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 hover:bg-zinc-800 cursor-pointer"
                      >
                        <span>Next: Driving Capabilities</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 hover:bg-zinc-800 cursor-pointer"
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Step 2: Licenses &amp; Driving Preferences
                    </h3>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-black">
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
                                  ? "border-black bg-zinc-100 text-black shadow-2xs"
                                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px]">{v}</span>
                                {selected && (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
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
                          className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-bold text-black focus:border-black focus:outline-none"
                        >
                          <option>Full-time (Heltid 8-10 hrs)</option>
                          <option>Part-time (Deltid)</option>
                          <option>Weekend Shifts Only (Helgpass)</option>
                          <option>Flexible / On-Demand (Extra)</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
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
                            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-black focus:border-black focus:outline-none"
                          />
                          <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>
                    </div>

                    {/* Preferred Operating Regions */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-black">
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
                          className="flex-1 rounded-xl border border-zinc-200 bg-white py-2 px-3.5 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => addPreferredArea(customLocation)}
                          className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 cursor-pointer"
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
                            className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] font-medium text-zinc-600 hover:border-black hover:text-black cursor-pointer"
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
                            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 border border-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-900"
                          >
                            <MapPin className="h-3 w-3 text-black" />
                            <span>{area}</span>
                            <button
                              type="button"
                              onClick={() => removeArea(area)}
                              className="text-zinc-400 hover:text-black ml-0.5 cursor-pointer"
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
                        className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-zinc-200 py-3 text-xs font-bold text-zinc-800 hover:bg-zinc-50 cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 hover:bg-zinc-800 cursor-pointer"
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                      Step 3: Verification Credentials (Transportstyrelsen)
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
                          Driving License Reference No.
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SE-19850412-1234"
                          value={formData.licenseNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              licenseNumber: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-xs font-medium text-black focus:border-black focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-black">
                          Swedish Personal Number (Personnummer)
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
                          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3.5 text-xs font-medium text-black focus:border-black focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Certifications Check */}
                    <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasYKB}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasYKB: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-zinc-300 text-black"
                        />
                        <span className="font-semibold text-zinc-900">
                          I hold a valid YKB (Yrkeskompetensbevis) certificate
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasDigitalTacho}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasDigitalTacho: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-zinc-300 text-black"
                        />
                        <span className="font-semibold text-zinc-900">
                          I hold a valid Digital Tachograph Card (Förarkort)
                        </span>
                      </label>
                    </div>

                    {/* Upload Dropzones */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center hover:border-black transition-colors bg-white">
                        <Upload className="mx-auto h-6 w-6 text-zinc-400" />
                        <span className="mt-1.5 block text-xs font-bold text-black">
                          Driver License Copy
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Front &amp; Back (JPG, PNG, PDF)
                        </span>
                        <input
                          type="file"
                          className="mt-2 text-[10px] text-zinc-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-zinc-100 file:font-semibold"
                        />
                      </div>

                      <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center hover:border-black transition-colors bg-white">
                        <FileCheck className="mx-auto h-6 w-6 text-zinc-400" />
                        <span className="mt-1.5 block text-xs font-bold text-black">
                          YKB Certificate / Proof
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          Certificate copy (Optional)
                        </span>
                        <input
                          type="file"
                          className="mt-2 text-[10px] text-zinc-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-zinc-100 file:font-semibold"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-zinc-200 py-3 text-xs font-bold text-zinc-800 hover:bg-zinc-50 cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md shadow-black/10 hover:bg-zinc-800 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Activating driver profile...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Complete Driver Registration</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="mt-6 text-center text-xs font-medium text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-black hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
