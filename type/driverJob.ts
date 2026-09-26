export interface DriverJobHR {
  id: number;
  name: string;
  companyName: string;
  organizationNumber: string;
  email: string;
  phoneNumber: string;
}

export interface DriverJob {
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
  hrId: number;
  isDirectOffer?: boolean;
  assignedDriverId?: number | null;
  createdAt: string;
  updatedAt: string;
  hr: DriverJobHR;
}

export interface GetDriverJobsResponse {
  jobs: DriverJob[];
}

export interface GetDriverJobResponse {
  success: boolean;
  message: string;
  job: DriverJob;
}
