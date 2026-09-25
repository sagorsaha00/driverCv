"use client";

import { useQuery } from "@tanstack/react-query";
import { driverService } from "@/lib/api/driver";
import { DriverFilterParams, Driver } from "@/type/driver";

export function useDrivers(params: DriverFilterParams = {}) {
  const query = useQuery({
    queryKey: [
      "drivers-explorer",
      params.search || "",
      params.region || "All Regions",
      params.category || "All Categories",
      params.workingHours || "All Hours",
      params.minSalary || 0,
      params.maxSalary || 0,
      params.sortBy || "default",
      params.page || 1,
      params.limit || 9,
    ],
    queryFn: () => driverService.getAllDrivers(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    drivers: query.data?.drivers ?? [],
    allDrivers: query.data?.allDrivers ?? [],
    pagination: query.data?.pagination ?? {
      page: params.page || 1,
      limit: params.limit || 9,
      total: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
    filterOptions: query.data?.filterOptions ?? {
      regions: [],
      categories: [],
      workingHoursList: [],
      minSalary: 0,
      maxSalary: 100000,
    },
    categoryCounts: query.data?.categoryCounts ?? {},
    regionCounts: query.data?.regionCounts ?? {},
  };
}

export function useSingleDriver(id: string | number | undefined) {
  return useQuery({
    queryKey: ["driver-single", id],
    queryFn: () => driverService.getSingleDriver(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
