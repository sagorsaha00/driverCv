import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { MapPin, X } from "lucide-react";

interface LocationSearchProps {
  selectedLocations: string[];
  onAddLocation: (location: string) => void;
  onRemoveLocation: (location: string) => void;
}

export function LocationSearch({
  selectedLocations,
  onAddLocation,
  onRemoveLocation,
}: LocationSearchProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "se" }, // Restrict suggestions (e.g. Sweden 'se' or Bangladesh 'bd')
    },
    debounce: 300,
  });

  const handleSelect = (description: string) => () => {
    setValue(description, false);
    clearSuggestions();
    if (!selectedLocations.includes(description)) {
      onAddLocation(description);
    }
    setValue(""); // Reset search field
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search location/address..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3.5 text-xs font-medium text-slate-900 focus:border-[#2563EB] focus:outline-none"
        />
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        {/* Suggestions List */}
        {status === "OK" && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={handleSelect(description)}
                className="cursor-pointer px-3 py-2 text-xs hover:bg-slate-100"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Location Chips */}
      <div className="flex flex-wrap gap-2">
        {selectedLocations.map((loc) => (
          <span
            key={loc}
            className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-bold text-white"
          >
            {loc}
            <button
              type="button"
              onClick={() => onRemoveLocation(loc)}
              className="hover:text-red-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
