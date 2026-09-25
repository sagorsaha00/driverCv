export interface DriverMessage {
  id: number;
  senderHrId?: number | null;
  senderName: string;
  senderCompany: string;
  senderPhone?: string | null;
  senderEmail?: string | null;
  receiverDriverId: number;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface DriverNotification {
  id: number;
  driverId?: number | null;
  title: string;
  message: string;
  type: "job_post" | "personal_offer" | "message" | string;
  referenceId?: number | null;
  isRead: boolean;
  createdAt: string;
}

export interface SendMessagePayload {
  senderHrId?: number;
  senderName: string;
  senderCompany: string;
  senderPhone?: string;
  senderEmail?: string;
  receiverDriverId: number;
  subject?: string;
  content: string;
}

export interface UpdateDriverPayload {
  fullname?: string;
  phonenumber?: string;
  ProfileImage?: string;
  workingHours?: string;
  licenseCategories?: string[];
  targetMonthlySalary?: number;
  regions?: string[];
  personalIdentityNumber?: string;
  drivingLicenseNumber?: string;
  certificates?: string | null;
}
