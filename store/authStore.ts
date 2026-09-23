import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Driver, HR, UserRole } from "@/type/auth";
export interface AuthState {
  user: Driver | HR | null;
  role: UserRole | null;
  isAuthenticated: boolean;

  setAuth: (user: Driver | HR, role: UserRole) => void;

  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,

      setAuth: (user: Driver | HR, role: UserRole) => {
        set({
          user,
          role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "hire-driver-auth",
    },
  ),
);
