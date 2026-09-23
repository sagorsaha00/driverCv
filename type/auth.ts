export type UserRole = "driver" | "hr";

export interface DriverRegisterPayload {
  fullname: string;
  email: string;
  phonenumber: string;
  ProfileImage?: string | null;
  password: string;
  workingHours: string;
  licenseCategories: string[];
  targetMonthlySalary: number;
  regions: string[];
  personalIdentityNumber: string;
  drivingLicenseNumber: string;
  certificates?: string | null;
}

export interface HRRegisterPayload {
  name: string;
  companyName: string;
  organizationNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface Driver {
  id: number;
  fullname: string;
  email: string;
  phonenumber: string;
  ProfileImage?: string | null;
  workingHours: string;
  licenseCategories: string[];
  targetMonthlySalary: number;
  regions: string[];
  personalIdentityNumber: string;
  drivingLicenseNumber: string;
  certificates?: string | null;
  role: "driver";
}

export interface HR {
  id: number;
  name: string;
  companyName: string;
  organizationNumber: string;
  email: string;
  phoneNumber: string;
  role: "hr";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface DriverLoginResponse {
  message: string;
  driver: Driver;
}

export interface HRLoginResponse {
  message: string;
  hr: HR;
}

export interface AuthState {
  user: Driver | HR | null;
  role: UserRole | null;
  isAuthenticated: boolean;

  setAuth: (user: Driver | HR, role: UserRole) => void;

  logout: () => void;
}
