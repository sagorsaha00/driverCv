import {
  Briefcase,
  Check,
  MapPin,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import FilterGroup from "./FilterGroup";
import {
  driverRoles,
  experienceLevels,
  swedishCities,
} from "../constant/driverData";

type Props = {
  selectedRole: string;
  setSelectedRole: (value: string) => void;

  selectedCity: string;
  setSelectedCity: (value: string) => void;

  selectedExperience: string;
  setSelectedExperience: (value: string) => void;

  resetFilters: () => void;
};

export default function DriverFilters({
  selectedRole,
  setSelectedRole,
  selectedCity,
  setSelectedCity,
  selectedExperience,
  setSelectedExperience,
  resetFilters,
}: Props) {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />

          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-[10px] font-semibold text-text-subtle transition hover:text-primary"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* ROLE */}
      <FilterGroup title="Driver Role">
        <div className="space-y-1">
          {driverRoles.map((role) => {
            const selected = selectedRole === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-primary text-white shadow-sm"
                    : "font-medium text-text-muted hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                <span>{role}</span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* LOCATION */}
      <FilterGroup title="Location">
        <div className="space-y-1">
          {swedishCities.map((city) => {
            const selected = selectedCity === city;

            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-primary text-white shadow-sm"
                    : "font-medium text-text-muted hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {city}
                </span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* EXPERIENCE */}
      <FilterGroup title="Experience">
        <div className="space-y-1">
          {experienceLevels.map((level) => {
            const selected = selectedExperience === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedExperience(level)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-xs transition ${
                  selected
                    ? "bg-primary text-white shadow-sm"
                    : "font-medium text-text-muted hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  {level}
                </span>

                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* TRUST */}
      <div className="rounded-xl border border-border bg-surface-muted p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-xs font-bold text-text">
              Verified Driver Network
            </p>

            <p className="mt-1 text-[10px] leading-5 text-text-muted">
              Driver profiles are reviewed before appearing in the hiring
              marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
