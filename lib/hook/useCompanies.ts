"use client";

import { useQuery } from "@tanstack/react-query";
import { companyService } from "@/lib/api/company";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies-all"],
    queryFn: companyService.getAllCompanies,
    staleTime: 1000 * 60,
  });
}

export function useSingleCompany(id: number | string | undefined) {
  return useQuery({
    queryKey: ["company-single", id],
    queryFn: () => companyService.getCompanyById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60,
  });
}
