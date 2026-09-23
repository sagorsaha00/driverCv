"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DriverStepBasic, { type DriverFormData } from "./DriverStepBasic";
import DriverStepCapabilities from "./DriverStepCapabilities";
import DriverStepVerification from "./DriverStepVerification";
import { useAuthStore } from "@/store/authStore";
import { useRegisterDriver } from "@/lib/api/apiCall";

interface Props {
  step: number;
  setStep: (step: number) => void;
}

const initialData: DriverFormData = {
  fullname: "",
  email: "",
  phonenumber: "",
  password: "",
  ProfileImage: "",
  workingHours: "",
  licenseCategories: [],
  targetMonthlySalary: "",
  regions: [],
  personalIdentityNumber: "",
  drivingLicenseNumber: "",
  certificates: "",
  vehicleTypes: [],
  weekendAvailable: false,
  hasYKB: false,
  hasDigitalTacho: false,
};

export default function DriverRegisterForm({ step, setStep }: Props) {
  const router = useRouter();
  const mutation = useRegisterDriver();

  const [data, setFormData] = useState<DriverFormData>(initialData);

  const setData = <K extends keyof DriverFormData>(
    key: K,
    value: DriverFormData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        fullname: data.fullname,
        email: data.email,
        phonenumber: data.phonenumber,
        ProfileImage: data.ProfileImage || null,
        password: data.password,
        workingHours: data.workingHours,
        licenseCategories: data.licenseCategories,
        targetMonthlySalary: Number(data.targetMonthlySalary),
        regions: data.regions,
        personalIdentityNumber: data.personalIdentityNumber,
        drivingLicenseNumber: data.drivingLicenseNumber,
        certificates: data.certificates || null,
      };

      const driver = await mutation.mutateAsync(payload);

      useAuthStore.getState().setAuth(driver, "driver");

      router.push("/EmployerJobFeed");
    } catch (error) {
      console.error("Driver registration failed:", error);
    }
  };

  if (step === 1) {
    return (
      <DriverStepBasic
        data={data}
        setData={setData}
        onNext={() => setStep(2)}
      />
    );
  }

  if (step === 2) {
    return (
      <DriverStepCapabilities
        data={data}
        setData={setData}
        onNext={() => setStep(3)}
        onBack={() => setStep(1)}
      />
    );
  }

  return (
    <DriverStepVerification
      data={data}
      setData={setData}
      onBack={() => setStep(2)}
      onSubmit={handleSubmit}
      loading={mutation.isPending}
    />
  );
}
