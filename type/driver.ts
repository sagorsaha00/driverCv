export interface Driver {
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
  certificates?: string | null;
  role: string;
}

export interface DriverPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface DriversApiResponse {
  message?: string;
  data: Driver[];
  pagination?: Partial<DriverPaginationMeta>;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface DriverFilterParams {
  search?: string;
  region?: string;
  category?: string;
  workingHours?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: "rating" | "salary_asc" | "salary_desc" | "name_asc" | "name_desc" | "recent";
  page?: number;
  limit?: number;
}

export interface DriverFilterOptions {
  regions: string[];
  categories: string[];
  workingHoursList: string[];
  minSalary: number;
  maxSalary: number;
}
