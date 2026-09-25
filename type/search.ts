export type SearchType = "all" | "drivers" | "jobs";

export type PostedFilter = "" | "24h" | "week" | "month";

export interface SearchParams {
  q?: string;
  location?: string;
  posted?: PostedFilter;
  type?: SearchType;
  category?: string;
  workingHours?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface DriverSearchResult {
  id: number;
  fullname: string;
  email: string;
  phonenumber: string;
  ProfileImage: string | null;
  workingHours: string;
  licenseCategories: string[];
  targetMonthlySalary: number;
  regions: string[];
  personalIdentityNumber?: string;
  drivingLicenseNumber?: string;
  certificates: string | null;
  role: "driver";
}

export interface JobSearchResult {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  vehicleRequired: string;
  employmentType: string;
  workingHours: string;
  salaryType: string;
  salaryAmount: string;
  startDate: string | null;
  jobDescription: string;
  requirements: string | null;
  requiresTKT: boolean;
  createdAt: string;
  updatedAt: string;

  hr: {
    id: number;
    name: string;
    companyName: string;
  };
}

export interface SearchCounts {
  drivers: number;
  jobs: number;
  total: number;
}

export interface MarketplaceSearchData {
  query: {
    q: string;
    location: string;
    posted: PostedFilter;
    type: SearchType;
  };

  drivers: DriverSearchResult[];
  jobs: JobSearchResult[];

  counts: SearchCounts;

  pagination: {
    page: number;
    limit: number;
  };
}

export interface MarketplaceSearchResponse {
  success: boolean;
  message: string;
  data: MarketplaceSearchData;
}

export interface LocationsResponse {
  success: boolean;
  data: string[];
}
