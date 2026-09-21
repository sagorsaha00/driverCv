export type Driver = {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: number;
  rating: number;
  salary: string;
  status: string;
  available: string;
  verified: boolean;
  initials: string;
};

export const driverRoles = [
  "All Roles",
  "Heavy Truck Driver (CE)",
  "Heavy Truck Driver (C)",
  "Delivery Van Driver",
  "Personal Chauffeur",
  "Bus & Coach Driver (D)",
  "Taxi & Rideshare",
  "Ambulance Driver",
  "Private Car Driver",
];

export const swedishCities = [
  "All Cities",
  "Stockholm",
  "Gothenburg",
  "Malmö",
  "Uppsala",
  "Jönköping",
];

export const experienceLevels = [
  "All Experience",
  "1-3 Years",
  "3-5 Years",
  "5-8 Years",
  "8+ Years",
];

export const initialDrivers: Driver[] = [
  {
    id: 1,
    name: "Lars Lindqvist",
    role: "Heavy Truck Driver (CE)",
    location: "Stockholm",
    experience: 8,
    rating: 4.9,
    salary: "38,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "LL",
  },
  {
    id: 2,
    name: "Elin Andersson",
    role: "Personal Chauffeur",
    location: "Gothenburg",
    experience: 5,
    rating: 4.8,
    salary: "31,000 SEK/mo",
    status: "Part-time",
    available: "Flexible Hours",
    verified: true,
    initials: "EA",
  },
  {
    id: 3,
    name: "Sven Nilsson",
    role: "Delivery Van Driver",
    location: "Malmö",
    experience: 3,
    rating: 4.7,
    salary: "27,500 SEK/mo",
    status: "Full-time",
    available: "Available in 2 days",
    verified: true,
    initials: "SN",
  },
  {
    id: 4,
    name: "Astrid Berg",
    role: "Bus & Coach Driver (D)",
    location: "Uppsala",
    experience: 10,
    rating: 5.0,
    salary: "34,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "AB",
  },
  {
    id: 5,
    name: "Mikael Lind",
    role: "Heavy Truck Driver (CE)",
    location: "Jönköping",
    experience: 12,
    rating: 4.9,
    salary: "39,000 SEK/mo",
    status: "Full-time",
    available: "Available Now",
    verified: true,
    initials: "ML",
  },
  {
    id: 6,
    name: "Johan Berg",
    role: "Taxi & Rideshare",
    location: "Stockholm",
    experience: 6,
    rating: 4.8,
    salary: "29,000 SEK/mo",
    status: "Flexible",
    available: "Weekends & Evenings",
    verified: true,
    initials: "JB",
  },
];