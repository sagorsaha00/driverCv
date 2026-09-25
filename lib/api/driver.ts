import { Driver, DriverFilterParams } from "@/type/driver";
import { searchService, DynamicDriverSearchResult } from "@/lib/api/search";

export type FetchDriversResult = DynamicDriverSearchResult;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const driverService = {
  /**
   * Fetches dynamic driver data and dynamic locations using searchService
   */
  async getAllDrivers(params: DriverFilterParams = {}): Promise<FetchDriversResult> {
    return searchService.getExploreDrivers({
      q: params.search,
      location: params.region,
      category: params.category,
      workingHours: params.workingHours,
      minSalary: params.minSalary,
      maxSalary: params.maxSalary,
      sortBy: params.sortBy,
      page: params.page,
      limit: params.limit,
    });
  },

  /**
   * Fetches single driver profile data:
   * http://localhost:5000/api/driver/driverSingleData/:id
   */
  async getSingleDriver(id: string | number): Promise<Driver> {
    const res = await fetch(`${API_BASE_URL}/api/driver/driverSingleData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch driver details (${res.status})`);
    }

    const json = await res.json();
    return (json && json.data ? json.data : json) as Driver;
  },
};
