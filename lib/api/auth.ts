import axios from "axios";

import type {
  Driver,
  DriverLoginResponse,
  DriverRegisterPayload,
  HR,
  HRLoginResponse,
  HRRegisterPayload,
  LoginPayload,
} from "@/type/auth";
import { CreateJobPayload, CreateJobResponse, DriverJob } from "@/type/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerDriver = async (
  payload: DriverRegisterPayload,
): Promise<Driver> => {
  const response = await api.post<Driver>(
    "/api/driver/driverRegister",
    payload,
  );

  return response.data;
};

export const registerHR = async (payload: HRRegisterPayload): Promise<HR> => {
  const response = await api.post<HR>("/api/hr/hrRegister", payload);

  return response.data;
};
export const loginDriver = async (
  payload: LoginPayload,
): Promise<DriverLoginResponse> => {
  const response = await api.post<DriverLoginResponse>(
    "/api/driver/driverlogin",
    payload,
  );

  return response.data;
};

export const loginHR = async (
  payload: LoginPayload,
): Promise<HRLoginResponse> => {
  const response = await api.post<HRLoginResponse>("/api/hr/hrLogin", payload);

  return response.data;
};

export const createJob = async (
  payload: CreateJobPayload,
): Promise<CreateJobResponse> => {
  const response = await api.post<CreateJobResponse>("/api/driverJob/createDriverJob", payload);

  return response.data;
};

export const getJobs = async (): Promise<DriverJob[]> => {
  const response = await api.get<{
    jobs: DriverJob[];
  }>("/api/driverJob/getAllDriverJobs");

  return response.data.jobs;
};
