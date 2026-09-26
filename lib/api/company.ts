import axios from "axios";
import { HR } from "@/type/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const companyService = {
  getAllCompanies: async (): Promise<HR[]> => {
    try {
      const res = await api.get<HR[]>("/api/hr/allHrData");
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      return [];
    }
  },

  getCompanyById: async (id: number | string): Promise<HR | null> => {
    try {
      const res = await api.get<HR>(`/api/hr/singleHrData/${id}`);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch company by id:", error);
      return null;
    }
  },
};
