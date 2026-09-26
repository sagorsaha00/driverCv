import axios from "axios";
import {
  DriverMessage,
  DriverNotification,
  SendMessagePayload,
  UpdateDriverPayload,
} from "@/type/dashboard";
import { Driver } from "@/type/auth";
import { DriverJob } from "@/type/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dashboardService = {
  // SEND MESSAGE
  sendMessage: async (payload: SendMessagePayload): Promise<DriverMessage> => {
    const response = await api.post<{ message: string; data: DriverMessage }>(
      "/api/message/send",
      payload
    );
    return response.data.data;
  },

  // GET DRIVER MESSAGES
  getDriverMessages: async (driverId: number): Promise<DriverMessage[]> => {
    const response = await api.get<any>(`/api/message/driver/${driverId}`);
    return Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];
  },

  // GET HR SENT MESSAGES
  getHrMessages: async (hrId: number): Promise<DriverMessage[]> => {
    const response = await api.get<any>(`/api/message/hr/${hrId}`);
    return Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];
  },

  // MARK MESSAGE AS READ
  markMessageRead: async (messageId: number): Promise<void> => {
    await api.patch(`/api/message/markRead/${messageId}`);
  },

  // GET DRIVER NOTIFICATIONS
  getDriverNotifications: async (driverId: number): Promise<DriverNotification[]> => {
    const response = await api.get<any>(`/api/notification/driver/${driverId}`);
    return Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];
  },

  // MARK NOTIFICATION AS READ
  markNotificationRead: async (notificationId: number): Promise<void> => {
    await api.patch(`/api/notification/markRead/${notificationId}`);
  },

  // MARK ALL NOTIFICATIONS AS READ
  markAllNotificationsRead: async (driverId: number): Promise<void> => {
    await api.patch(`/api/notification/markAllRead/${driverId}`);
  },

  // UPDATE DRIVER PROFILE
  updateDriverProfile: async (
    driverId: number,
    payload: UpdateDriverPayload
  ): Promise<Driver> => {
    const response = await api.put<Driver>(`/api/driver/${driverId}`, payload);
    return response.data;
  },

  // GET HR POSTED JOBS
  getHrJobs: async (hrId: number): Promise<DriverJob[]> => {
    const response = await api.get<any>(`/api/driverJob/hrJobs/${hrId}`);
    return Array.isArray(response.data?.jobs)
      ? response.data.jobs
      : Array.isArray(response.data)
      ? response.data
      : [];
  },
};
