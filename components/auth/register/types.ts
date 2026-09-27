export interface DriverFormData {
  fullname: string;
  email: string;
  phonenumber: string;
  password: string;

  workingHours: string;
  licenseCategories: string[];
  targetMonthlySalary: string;
  regions: string[];

  personalIdentityNumber: string;
  drivingLicenseNumber: string;
  certificates: string;

  ProfileImage: string;
  vehicleTypes: string[];
  weekendAvailable: boolean;
  hasYKB: boolean;
  hasDigitalTacho: boolean;
}

export interface HRFormData {
  name: string;
  companyName: string;
  organizationNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
}