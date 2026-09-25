"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/lib/api/dashboard";
import { SendMessagePayload, UpdateDriverPayload } from "@/type/dashboard";
import { useAuthStore } from "@/store/authStore";

export function useDriverMessages(driverId?: number) {
  return useQuery({
    queryKey: ["driver-messages", driverId],
    queryFn: () => (driverId ? dashboardService.getDriverMessages(driverId) : Promise.resolve([])),
    enabled: Boolean(driverId && driverId > 0),
    refetchInterval: 8000, // Poll every 8s for live message updates
  });
}

export function useDriverNotifications(driverId?: number) {
  return useQuery({
    queryKey: ["driver-notifications", driverId],
    queryFn: () => (driverId ? dashboardService.getDriverNotifications(driverId) : Promise.resolve([])),
    enabled: Boolean(driverId && driverId > 0),
    refetchInterval: 8000, // Poll every 8s for live notifications
  });
}

export function useHrMessages(hrId?: number) {
  return useQuery({
    queryKey: ["hr-messages", hrId],
    queryFn: () => (hrId ? dashboardService.getHrMessages(hrId) : Promise.resolve([])),
    enabled: Boolean(hrId && hrId > 0),
    refetchInterval: 10000,
  });
}

export function useHrJobs(hrId?: number) {
  return useQuery({
    queryKey: ["hr-jobs", hrId],
    queryFn: () => (hrId ? dashboardService.getHrJobs(hrId) : Promise.resolve([])),
    enabled: Boolean(hrId && hrId > 0),
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => dashboardService.sendMessage(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["driver-messages", variables.receiverDriverId] });
      queryClient.invalidateQueries({ queryKey: ["driver-notifications", variables.receiverDriverId] });
      if (variables.senderHrId) {
        queryClient.invalidateQueries({ queryKey: ["hr-messages", variables.senderHrId] });
      }
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dashboardService.markMessageRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-messages"] });
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dashboardService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver-notifications"] });
    },
  });
}

export function useUpdateDriverProfile() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: ({ driverId, payload }: { driverId: number; payload: UpdateDriverPayload }) =>
      dashboardService.updateDriverProfile(driverId, payload),
    onSuccess: (updatedDriver) => {
      // Sync with Zustand authStore
      setAuth(updatedDriver, "driver");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      queryClient.invalidateQueries({ queryKey: ["driver-single", updatedDriver.id] });
    },
  });
}
