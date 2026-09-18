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
} from "lucide-react";
import Link from "next/link";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

export const vehicleOptions = [
  "Personbil / Private Car (B)",
  "Lätt Lastbil / Light Truck (B)",
  "Tung Lastbil / Heavy Truck (C)",
  "Lastbil med Släp / Truck with Trailer (CE)",
  "Buss / Bus (D)",
  "Taxi (Taxiförarlegitimation)",
  "Lätt Motorcykel / Light Motorcycle (A1)",
  "Tung Motorcykel / Heavy Motorcycle (A)",
  "Traktor / Maskin / Tractor",
];

export default function RegisterPage() {
  const [role, setRole] = useState<"driver" | "employer">("driver");
  const [step, setStep] = useState(1);

  // Google Maps Loader
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    vehicleTypes: [] as string[],
    workingHours: "Full-time (8-10 hrs)",
    weekendAvailable: "Friday & Saturday",
    preferredAreas: [] as string[],
    expectedSalary: "",
    licenseNumber: "",
    nidNumber: "",
  });

  const toggleArrayItem = (
    listKey: "vehicleTypes" | "preferredAreas",
    value: string,
  ) => {
    setFormData((prev) => {
      const exists = prev[listKey].includes(value);
      return {
        ...prev,
        [listKey]: exists
          ? prev[listKey].filter((i) => i !== value)
          : [...prev[listKey], value],
      };
    });
  };

  // Google Places Autocomplete Select Handler
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address || place.name) {
        const selectedLocation = place.formatted_address || place.name || "";
        if (
          selectedLocation &&
          !formData.preferredAreas.includes(selectedLocation)
        ) {
          setFormData((prev) => ({
            ...prev,
            preferredAreas: [...prev.preferredAreas, selectedLocation],
          }));
        }
      }
    }
  };

  const handleRemoveArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredAreas: prev.preferredAreas.filter((item) => item !== area),
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register Data:", { role, ...formData });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900">
              Create an Account
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {role === "driver"
                ? "Register as a professional driver and get hired"
                : "Register as an employer or company to hire drivers"}
            </p>
          </div>

          {/* Role Switcher */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => {
                setRole("driver");
                setStep(1);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === "driver"
                  ? "bg-white text-[#2563EB] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>I am a Driver</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("employer");
                setStep(1);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === "employer"
                  ? "bg-white text-[#2563EB] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>I Want to Hire</span>
            </button>
          </div>

          {/* Step Progress */}
          {role === "driver" && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <span
                className={`h-1.5 w-12 rounded-full ${
                  step >= 1 ? "bg-[#2563EB]" : "bg-slate-200"
                }`}
              />
              <span
                className={`h-1.5 w-12 rounded-full ${
                  step >= 2 ? "bg-[#2563EB]" : "bg-slate-200"
                }`}
              />
              <span
                className={`h-1.5 w-12 rounded-full ${
                  step >= 3 ? "bg-[#2563EB]" : "bg-slate-200"
                }`}
              />
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-6">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Step 1: Account Information
                  </h3>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      {role === "driver" ? "Full Name" : "Contact Person Name"}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {role === "employer" && (
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Company Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Acme Transport Ltd."
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                        />
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                        />
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+880 1700 000000"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                        />
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      />
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {role === "driver" ? (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                    >
                      <span>Next: Driving Preferences</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                    >
                      <span>Complete Employer Registration</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && role === "driver" && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Step 2: Driving Capabilities
                  </h3>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-900">
                      Vehicles you can drive:
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {vehicleOptions.map((v) => {
                        const selected = formData.vehicleTypes.includes(v);
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => toggleArrayItem("vehicleTypes", v)}
                            className={`rounded-xl border p-2.5 text-left text-[11px] font-bold transition-all ${
                              selected
                                ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Working Hours
                      </label>
                      <select
                        value={formData.workingHours}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workingHours: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      >
                        <option>Full-time (8-10 Hours)</option>
                        <option>Part-time (4-6 Hours)</option>
                        <option>Night Shift Only</option>
                        <option>Flexible / On-Demand</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Expected Monthly Salary (BDT)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 25000"
                          value={formData.expectedSalary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expectedSalary: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                        />
                        <Banknote className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* MAP LOCATION TYPE INPUT */}
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-900">
                      Preferred Locations:
                    </label>

                    {isLoaded ? (
                      <Autocomplete
                        onLoad={(auto) => setAutocomplete(auto)}
                        onPlaceChanged={onPlaceChanged}
                      >
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Type a city or location from map..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                          />
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </Autocomplete>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          disabled
                          placeholder="Loading map locations..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-400"
                        />
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    )}

                    {/* Selected Map Locations */}
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {formData.preferredAreas.map((area) => (
                        <span
                          key={area}
                          className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-bold text-white shadow-sm"
                        >
                          {area}
                          <button
                            type="button"
                            onClick={() => handleRemoveArea(area)}
                            className="hover:text-red-200"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                    >
                      <span>Next: Documents</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && role === "driver" && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Step 3: Verification Documents
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Driving License No.
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DK-1234567"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            licenseNumber: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        NID Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="10 or 17 Digit NID"
                        value={formData.nidNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nidNumber: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-dashed border-slate-300 p-3 text-center transition-colors hover:border-[#2563EB]">
                      <Upload className="mx-auto h-5 w-5 text-slate-400" />
                      <span className="mt-1 block text-[11px] font-bold text-slate-900">
                        Photo
                      </span>
                      <input
                        type="file"
                        className="mt-2 text-[10px] text-slate-500"
                      />
                    </div>

                    <div className="rounded-xl border border-dashed border-slate-300 p-3 text-center transition-colors hover:border-[#2563EB]">
                      <FileCheck className="mx-auto h-5 w-5 text-slate-400" />
                      <span className="mt-1 block text-[11px] font-bold text-slate-900">
                        License Copy
                      </span>
                      <input
                        type="file"
                        className="mt-2 text-[10px] text-slate-500"
                      />
                    </div>

                    <div className="rounded-xl border border-dashed border-slate-300 p-3 text-center transition-colors hover:border-[#2563EB]">
                      <FileCheck className="mx-auto h-5 w-5 text-slate-400" />
                      <span className="mt-1 block text-[11px] font-bold text-slate-900">
                        NID Copy
                      </span>
                      <input
                        type="file"
                        className="mt-2 text-[10px] text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex w-1/3 items-center justify-center gap-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Complete Driver Registration</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-6 text-center text-xs font-medium text-slate-500">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-bold text-[#2563EB] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
