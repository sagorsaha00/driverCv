import {
  DriverSearchResult,
  LocationsResponse,
  MarketplaceSearchResponse,
  SearchParams,
} from "@/type/search";
import {
  Driver,
  DriverFilterOptions,
  DriverPaginationMeta,
} from "@/type/driver";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export interface DynamicDriverSearchResult {
  drivers: Driver[];
  allDrivers: Driver[];
  pagination: DriverPaginationMeta;
  filterOptions: DriverFilterOptions;
  categoryCounts: Record<string, number>;
  regionCounts: Record<string, number>;
}

export const searchService = {
  /**
   * Universal search API for drivers, jobs, or all
   */
  async search(params: SearchParams): Promise<MarketplaceSearchResponse> {
    const searchParams = new URLSearchParams();

    if (params.q) searchParams.set("q", params.q);
    if (
      params.location &&
      params.location !== "All" &&
      params.location !== "All Regions"
    ) {
      searchParams.set("location", params.location);
    }
    if (params.posted) searchParams.set("posted", params.posted);
    if (params.type) searchParams.set("type", params.type);
    if (
      params.category &&
      params.category !== "All" &&
      params.category !== "All Categories"
    ) {
      searchParams.set("category", params.category);
    }
    if (
      params.workingHours &&
      params.workingHours !== "All" &&
      params.workingHours !== "All Hours"
    ) {
      searchParams.set("workingHours", params.workingHours);
    }
    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));

    const response = await fetch(
      `${API_URL}/search?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to search marketplace: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Fetches dynamic locations
   */
  async getLocations(): Promise<LocationsResponse> {
    const response = await fetch(`${API_URL}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load locations");
    }

    return response.json();
  },

  /**
   * Dynamic search specifically for ExploreDrivers
   * Integrates live backend /search and /api/driver/allData
   */
  async getExploreDrivers(
    params: SearchParams = {},
  ): Promise<DynamicDriverSearchResult> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, params.limit || 9);

    let driversList: Driver[] = [];
    let locationsList: string[] = [];

    // Parallel fetch: backend search/allData and locations
    try {
      const [driverRes, locRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/driver/allData`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }),
        this.getLocations(),
      ]);

      if (driverRes.status === "fulfilled" && driverRes.value.ok) {
        const json = await driverRes.value.json();
        if (Array.isArray(json.data)) {
          driversList = json.data;
        } else if (Array.isArray(json)) {
          driversList = json;
        }
      } else {
        // Fallback to /search?type=drivers
        const searchRes = await this.search({
          ...params,
          type: "drivers",
          limit: 100,
        });
        driversList = (searchRes.data?.drivers || []) as unknown as Driver[];
      }

      if (locRes.status === "fulfilled" && Array.isArray(locRes.value.data)) {
        locationsList = locRes.value.data;
      }
    } catch (err) {
      console.error("searchService error:", err);
    }

    // Dynamic stats and options extraction
    const regionCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    const regionsSet = new Set<string>(locationsList);
    const categoriesSet = new Set<string>();
    const hoursSet = new Set<string>();
    let minSalary = Infinity;
    let maxSalary = 0;

    driversList.forEach((driver) => {
      // Regions
      if (Array.isArray(driver.regions)) {
        driver.regions.forEach((r) => {
          if (r && r.trim()) {
            const clean = r.trim();
            regionsSet.add(clean);
            regionCounts[clean] = (regionCounts[clean] || 0) + 1;
          }
        });
      }

      // Categories
      if (Array.isArray(driver.licenseCategories)) {
        driver.licenseCategories.forEach((c) => {
          if (c && c.trim()) {
            const clean = c.trim();
            categoriesSet.add(clean);
            categoryCounts[clean] = (categoryCounts[clean] || 0) + 1;
          }
        });
      }

      // Working Hours
      if (driver.workingHours && driver.workingHours.trim()) {
        hoursSet.add(driver.workingHours.trim());
      }

      // Salary
      if (typeof driver.targetMonthlySalary === "number") {
        if (driver.targetMonthlySalary < minSalary)
          minSalary = driver.targetMonthlySalary;
        if (driver.targetMonthlySalary > maxSalary)
          maxSalary = driver.targetMonthlySalary;
      }
    });

    const standardCategories = [
      "Car",
      "Motorcycle",
      "Heavy Truck",
      "Delivery Van",
      "Bus & Coach",
      "Personal Chauffeur",
    ];
    standardCategories.forEach((cat) => categoriesSet.add(cat));

    const filterOptions: DriverFilterOptions = {
      regions: Array.from(regionsSet).sort(),
      categories: Array.from(categoriesSet).sort(),
      workingHoursList: Array.from(hoursSet).sort(),
      minSalary: minSalary === Infinity ? 0 : minSalary,
      maxSalary: maxSalary === 0 ? 100000 : maxSalary,
    };

    // Filter drivers
    let filtered = [...driversList];

    if (params.q && params.q.trim()) {
      const q = params.q.trim().toLowerCase();
      filtered = filtered.filter((d) => {
        const nameMatch = d.fullname?.toLowerCase().includes(q);
        const emailMatch = d.email?.toLowerCase().includes(q);
        const phoneMatch = d.phonenumber?.includes(q);
        const licenseMatch = d.drivingLicenseNumber?.toLowerCase().includes(q);
        const nidMatch = d.personalIdentityNumber?.includes(q);
        const regionMatch = d.regions?.some((r) => r.toLowerCase().includes(q));
        const categoryMatch = d.licenseCategories?.some((c) =>
          c.toLowerCase().includes(q),
        );
        return (
          nameMatch ||
          emailMatch ||
          phoneMatch ||
          licenseMatch ||
          nidMatch ||
          regionMatch ||
          categoryMatch
        );
      });
    }

    if (
      params.location &&
      params.location !== "All Regions" &&
      params.location !== "All"
    ) {
      filtered = filtered.filter((d) =>
        d.regions?.some(
          (r) => r.toLowerCase() === params.location!.toLowerCase(),
        ),
      );
    }

    if (
      params.category &&
      params.category !== "All Categories" &&
      params.category !== "All"
    ) {
      filtered = filtered.filter((d) =>
        d.licenseCategories?.some(
          (c) => c.toLowerCase() === params.category!.toLowerCase(),
        ),
      );
    }

    if (
      params.workingHours &&
      params.workingHours !== "All Hours" &&
      params.workingHours !== "All"
    ) {
      filtered = filtered.filter((d) => d.workingHours === params.workingHours);
    }

    if (typeof params.minSalary === "number" && params.minSalary > 0) {
      filtered = filtered.filter(
        (d) => d.targetMonthlySalary >= params.minSalary!,
      );
    }

    if (typeof params.maxSalary === "number" && params.maxSalary > 0) {
      filtered = filtered.filter(
        (d) => d.targetMonthlySalary <= params.maxSalary!,
      );
    }

    // Sort
    if (params.sortBy === "salary_asc") {
      filtered.sort((a, b) => a.targetMonthlySalary - b.targetMonthlySalary);
    } else if (params.sortBy === "salary_desc") {
      filtered.sort((a, b) => b.targetMonthlySalary - a.targetMonthlySalary);
    } else if (params.sortBy === "name_asc") {
      filtered.sort((a, b) => a.fullname.localeCompare(b.fullname));
    } else if (params.sortBy === "name_desc") {
      filtered.sort((a, b) => b.fullname.localeCompare(a.fullname));
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);

    const startIndex = (safePage - 1) * limit;
    const pagedDrivers = filtered.slice(startIndex, startIndex + limit);

    return {
      drivers: pagedDrivers,
      allDrivers: driversList,
      pagination: {
        page: safePage,
        limit,
        total,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
      filterOptions,
      categoryCounts,
      regionCounts,
    };
  },
};
