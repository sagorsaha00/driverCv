"use client";

import { useMutation } from "@tanstack/react-query";

import {
  loginDriver,
  loginHR,
  registerDriver,
  registerHR,
} from "@/lib/api/auth";
import {
  DriverLoginResponse,
  DriverRegisterPayload,
  HRLoginResponse,
  HRRegisterPayload,
  LoginPayload,
} from "@/type/auth";

export const useRegisterDriver = () => {
  return useMutation({
    mutationFn: (payload: DriverRegisterPayload) => registerDriver(payload),
  });
};

export const useRegisterHR = () => {
  return useMutation({
    mutationFn: (payload: HRRegisterPayload) => registerHR(payload),
  });
};
export const useLoginDriver = () => {
  return useMutation<DriverLoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => loginDriver(payload),
  });
};

export const useLoginHR = () => {
  return useMutation<HRLoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => loginHR(payload),
  });
};
