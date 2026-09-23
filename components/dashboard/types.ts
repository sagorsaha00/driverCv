export type DashboardRole = "hr" | "driver";

export type HRTab =
  | "overview"
  | "candidates"
  | "compliance"
  | "postings"
  | "shifts";

export type DriverTab =
  | "overview"
  | "jobs"
  | "applications"
  | "credentials"
  | "earnings";

export interface CandidateItem {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  licenseClasses: string[];
  location: string;
  experienceYears: number;
  rating: number;
  salaryExpectation: string;
  ykbValidUntil: string;
  ykbStatus: "active" | "expiring_soon" | "expired";
  tachoCard: boolean;
  adrCert: boolean;
  availability: "immediate" | "within_week" | "flexible";
  appliedFor?: string;
  appliedDate?: string;
  matchScore: number;
  phone: string;
  email: string;
  summary: string;
}

export interface JobPostingItem {
  id: string;
  title: string;
  routeLocation: string;
  licenseRequired: string;
  employmentType: string;
  salary: string;
  applicantsCount: number;
  shortlistedCount: number;
  status: "published" | "reviewing" | "filled" | "paused";
  postedDate: string;
  vehicleType: string;
  urgent?: boolean;
}

export interface ApplicationItem {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: "submitted" | "in_review" | "interview_scheduled" | "offer_received" | "rejected";
  interviewDate?: string;
  nextStep: string;
  notes?: string;
}

export interface ComplianceItem {
  id: string;
  driverName: string;
  role: string;
  licenseNumber: string;
  licenseValidUntil: string;
  ykbExpires: string;
  ykbStatus: "valid" | "warning" | "urgent";
  tachoExpires: string;
  adrExpires: string;
  medicalCheckupDate: string;
  complianceScore: number;
}

export interface ShiftItem {
  id: string;
  route: string;
  vehicle: string;
  startTime: string;
  endTime: string;
  date: string;
  assignedDriver?: string;
  driverInitials?: string;
  status: "confirmed" | "pending_assignment" | "in_transit" | "completed";
  rate: string;
}

export const INITIAL_HR_POSTINGS: JobPostingItem[] = [
  {
    id: "post-1",
    title: "Class CE Long-Haul Logistics Chauffeur",
    routeLocation: "Stockholm – Jönköping – Malmö",
    licenseRequired: "Class CE + YKB",
    employmentType: "Full-Time (Fixed Route)",
    salary: "39,500 – 44,000 SEK / mo",
    applicantsCount: 16,
    shortlistedCount: 4,
    status: "published",
    postedDate: "2 days ago",
    vehicleType: "Scania R500 25.25m Combo",
    urgent: true,
  },
  {
    id: "post-2",
    title: "Class C Regional Distribution Driver",
    routeLocation: "Greater Stockholm & Uppsala",
    licenseRequired: "Class C",
    employmentType: "Day Shift (06:00 – 15:00)",
    salary: "34,000 – 38,000 SEK / mo",
    applicantsCount: 9,
    shortlistedCount: 2,
    status: "published",
    postedDate: "4 days ago",
    vehicleType: "Volvo FL Electric 16t",
  },
  {
    id: "post-3",
    title: "ADR Tanker & Hazardous Goods Specialist",
    routeLocation: "Gothenburg Port – Karlstad",
    licenseRequired: "Class CE + ADR Tank",
    employmentType: "Shift Rotation",
    salary: "43,000 – 48,500 SEK / mo",
    applicantsCount: 6,
    shortlistedCount: 3,
    status: "reviewing",
    postedDate: "1 week ago",
    vehicleType: "Volvo FH16 Tanker",
  },
  {
    id: "post-4",
    title: "Intercity Bus & Tourist Coach Driver",
    routeLocation: "Gothenburg – Oslo Corridor",
    licenseRequired: "Class D + YKB",
    employmentType: "Contract / Scheduled",
    salary: "33,000 – 37,500 SEK / mo",
    applicantsCount: 11,
    shortlistedCount: 1,
    status: "published",
    postedDate: "1 week ago",
    vehicleType: "Scania Touring HD Coach",
  },
];

export const INITIAL_CANDIDATES: CandidateItem[] = [
  {
    id: "cand-1",
    name: "Lars Lindqvist",
    initials: "LL",
    licenseClasses: ["Class CE", "Class C", "Class B"],
    location: "Stockholm, Sweden",
    experienceYears: 8,
    rating: 4.95,
    salaryExpectation: "38,500 SEK / mo",
    ykbValidUntil: "Oct 2028",
    ykbStatus: "active",
    tachoCard: true,
    adrCert: true,
    availability: "immediate",
    appliedFor: "Class CE Long-Haul Logistics Chauffeur",
    appliedDate: "3 hours ago",
    matchScore: 98,
    phone: "+46 70 812 34 56",
    email: "lars.lindqvist@nordicdrive.se",
    summary:
      "Seasoned Class CE heavy truck operator with extensive Nordic winter highway and refrigerated freight experience. Transportstyrelsen verified with zero infraction points.",
  },
  {
    id: "cand-2",
    name: "Elin Andersson",
    initials: "EA",
    licenseClasses: ["Class C", "Class B"],
    location: "Gothenburg, Sweden",
    experienceYears: 5,
    rating: 4.88,
    salaryExpectation: "35,000 SEK / mo",
    ykbValidUntil: "May 2027",
    ykbStatus: "active",
    tachoCard: true,
    adrCert: false,
    availability: "immediate",
    appliedFor: "Class C Regional Distribution Driver",
    appliedDate: "Yesterday",
    matchScore: 94,
    phone: "+46 73 945 11 22",
    email: "elin.a@svenskdistribution.se",
    summary:
      "Punctual and detail-oriented urban logistics driver. Familiar with retail distribution centers across Western Götaland and Gothenburg metro.",
  },
  {
    id: "cand-3",
    name: "Sven Nilsson",
    initials: "SN",
    licenseClasses: ["Class CE", "Class C", "ADR Tank"],
    location: "Malmö / Helsingborg",
    experienceYears: 11,
    rating: 4.92,
    salaryExpectation: "42,000 SEK / mo",
    ykbValidUntil: "Jan 2029",
    ykbStatus: "active",
    tachoCard: true,
    adrCert: true,
    availability: "within_week",
    appliedFor: "ADR Tanker & Hazardous Goods Specialist",
    appliedDate: "2 days ago",
    matchScore: 96,
    phone: "+46 72 311 88 90",
    email: "sven.nilsson.trans@gmail.com",
    summary:
      "Certified dangerous goods haulier with decade of chemical and bulk fuel transit between Skåne and Denmark. Clean tachograph compliance history.",
  },
  {
    id: "cand-4",
    name: "Astrid Berg",
    initials: "AB",
    licenseClasses: ["Class D", "Class B", "Taxi TKT"],
    location: "Uppsala / Stockholm",
    experienceYears: 9,
    rating: 5.0,
    salaryExpectation: "34,500 SEK / mo",
    ykbValidUntil: "Nov 2026",
    ykbStatus: "active",
    tachoCard: true,
    adrCert: false,
    availability: "immediate",
    appliedFor: "Intercity Bus & Tourist Coach Driver",
    appliedDate: "3 days ago",
    matchScore: 92,
    phone: "+46 70 554 90 12",
    email: "astrid.berg.coach@outlook.com",
    summary:
      "Public transit and international charter coach specialist. Recognized for passenger safety, exemplary route punctuality, and calm Scandinavian winter driving.",
  },
  {
    id: "cand-5",
    name: "Mikael Lind",
    initials: "ML",
    licenseClasses: ["Class CE", "Class C"],
    location: "Jönköping, Sweden",
    experienceYears: 14,
    rating: 4.97,
    salaryExpectation: "40,000 SEK / mo",
    ykbValidUntil: "Dec 2025",
    ykbStatus: "expiring_soon",
    tachoCard: true,
    adrCert: false,
    availability: "flexible",
    appliedFor: "Class CE Long-Haul Logistics Chauffeur",
    appliedDate: "4 days ago",
    matchScore: 95,
    phone: "+46 76 123 45 67",
    email: "mikael.lind.truck@telia.com",
    summary:
      "Master haulier with timber and timber trailer experience in central Sweden. High route efficiency and modern eco-driving credentials.",
  },
];

export const INITIAL_COMPLIANCE: ComplianceItem[] = [
  {
    id: "comp-1",
    driverName: "Lars Lindqvist",
    role: "Class CE Line Haul",
    licenseNumber: "SE-19880412-4412",
    licenseValidUntil: "2032-04-12",
    ykbExpires: "2028-10-15",
    ykbStatus: "valid",
    tachoExpires: "2027-08-20",
    adrExpires: "2026-11-30",
    medicalCheckupDate: "2027-05-10",
    complianceScore: 100,
  },
  {
    id: "comp-2",
    driverName: "Mikael Lind",
    role: "Class CE Bulk Timber",
    licenseNumber: "SE-19760921-3190",
    licenseValidUntil: "2029-09-21",
    ykbExpires: "2025-12-10",
    ykbStatus: "warning",
    tachoExpires: "2026-03-14",
    adrExpires: "N/A",
    medicalCheckupDate: "2026-02-18",
    complianceScore: 84,
  },
  {
    id: "comp-3",
    driverName: "Elin Andersson",
    role: "Class C Urban Freight",
    licenseNumber: "SE-19940215-8821",
    licenseValidUntil: "2034-02-15",
    ykbExpires: "2027-05-22",
    ykbStatus: "valid",
    tachoExpires: "2028-01-19",
    adrExpires: "N/A",
    medicalCheckupDate: "2028-09-01",
    complianceScore: 100,
  },
  {
    id: "comp-4",
    driverName: "Sven Nilsson",
    role: "Class CE ADR Chemical",
    licenseNumber: "SE-19811103-6714",
    licenseValidUntil: "2031-11-03",
    ykbExpires: "2029-01-30",
    ykbStatus: "valid",
    tachoExpires: "2027-11-12",
    adrExpires: "2026-06-15",
    medicalCheckupDate: "2026-08-20",
    complianceScore: 98,
  },
];

export const INITIAL_SHIFTS: ShiftItem[] = [
  {
    id: "sh-1",
    route: "Stockholm Syd (Årsta) -> Jönköping CombiTerminal",
    vehicle: "Scania 500S Semi (24m)",
    startTime: "21:30",
    endTime: "06:00",
    date: "Tonight",
    assignedDriver: "Lars Lindqvist",
    driverInitials: "LL",
    status: "confirmed",
    rate: "4,200 SEK",
  },
  {
    id: "sh-2",
    route: "Gothenburg Arendal -> Malmö Hamn",
    vehicle: "Volvo FH Electric (25.25m)",
    startTime: "05:00",
    endTime: "13:30",
    date: "Tomorrow",
    assignedDriver: "Sven Nilsson",
    driverInitials: "SN",
    status: "confirmed",
    rate: "3,950 SEK",
  },
  {
    id: "sh-3",
    route: "Uppsala Norr -> Gävle Bro Distribution Hub",
    vehicle: "Scania P280 Box Truck (18t)",
    startTime: "07:00",
    endTime: "16:00",
    date: "Tomorrow",
    status: "pending_assignment",
    rate: "3,400 SEK",
  },
  {
    id: "sh-4",
    route: "Helsingborg -> Linköping Express Depot",
    vehicle: "Volvo FM 420 Drawbar",
    startTime: "18:00",
    endTime: "02:30",
    date: "Friday",
    status: "pending_assignment",
    rate: "3,800 SEK",
  },
];

export const DRIVER_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-1",
    jobTitle: "CE-Chaufför Fjärrtransporter (Natt)",
    companyName: "Nordic Cargo Logistics AB",
    location: "Stockholm – Jönköping Hub",
    salary: "41,500 SEK / mo + OB Tillägg",
    appliedDate: "Yesterday at 14:20",
    status: "interview_scheduled",
    interviewDate: "Thursday, 10:00 (Video / Teams)",
    nextStep: "Fleet Manager Interview & Route Confirmation",
    notes: "Employer reviewed Transportstyrelsen YKB verification. High match score.",
  },
  {
    id: "app-2",
    jobTitle: "Distribution Chaufför Klass C (Dagtid)",
    companyName: "Svensk Post Transport AB",
    location: "Stockholm Väst (Veddesta)",
    salary: "35,200 SEK / mo",
    appliedDate: "3 days ago",
    status: "in_review",
    nextStep: "Awaiting HR candidate shortlist approval",
    notes: "Application viewed by Hiring Team.",
  },
  {
    id: "app-3",
    jobTitle: "ADR Tankbilschaufför Bulk",
    companyName: "ScanFuel Nordic AB",
    location: "Nynäshamn Depot",
    salary: "44,800 SEK / mo",
    appliedDate: "1 week ago",
    status: "offer_received",
    nextStep: "Review Contract terms & start date confirmation",
    notes: "Direct contract offer issued. Valid until end of week.",
  },
];
