"use client";

import { PostedFilter, SearchType } from "@/type/search";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../api/search";

interface SearchOptions {
  q: string;
  location: string;
  posted: PostedFilter;
  type?: SearchType;
  enabled?: boolean;
}

export function useMarketplaceSearch({
  q,
  location,
  posted,
  type = "all",
  enabled = true,
}: SearchOptions) {
  return useQuery({
    queryKey: ["marketplace-search", q, location, posted, type],

    queryFn: () =>
      searchService.search({
        q,
        location,
        posted,
        type,
        page: 1,
        limit: 10,
      }),

    enabled,
    staleTime: 30_000,
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["marketplace-locations"],
    queryFn: () => searchService.getLocations(),
    staleTime: 5 * 60 * 1000,
  });
}
