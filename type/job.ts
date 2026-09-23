// type/job.ts

export interface CreateJobPayload {
  jobTitle: string;
  companyName: string;
  location: string;
  vehicleRequired: string;
  employmentType: string;
  workingHours: string;
  salaryType: string;
  salaryAmount: string;
  startDate?: string;
  jobDescription: string;
  requirements?: string;
  requiresTKT: boolean;
  hrId: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobResponse {
  message: string;
  job: DriverJob;
}
