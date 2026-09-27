export function getDriverRoleTitle(driver?: {
  vehicleTypes?: string[];
  licenseCategories?: string[];
  role?: string;
}): string {
  if (!driver) return "Commercial Driver";

  // 1. If explicit vehicle types were chosen during registration
  if (Array.isArray(driver.vehicleTypes) && driver.vehicleTypes.length > 0) {
    const v = driver.vehicleTypes.filter(Boolean);
    if (v.length === 1) {
      return v[0].toLowerCase().includes("driver") ? v[0] : `${v[0]} Driver`;
    }
    if (v.length === 2) {
      return `${v[0]} & ${v[1]} Driver`;
    }
    return `${v[0]} & ${v[1]} Driver`;
  }

  // 2. If license categories are present
  if (Array.isArray(driver.licenseCategories) && driver.licenseCategories.length > 0) {
    const cats = driver.licenseCategories;
    const isCE = cats.includes("CE") || cats.includes("C1E");
    const isC = cats.includes("C") || cats.includes("C1");
    const isBus = cats.includes("D") || cats.includes("DE");
    const isVan = cats.includes("B") || cats.includes("Class B");

    if (isCE) {
      return "Heavy Truck & Trailer (CE) Driver";
    }
    if (isC) {
      return "Heavy Truck (Class C) Driver";
    }
    if (isBus) {
      return "Commercial Bus (Class D) Driver";
    }
    if (isVan) {
      return "Delivery & Van (Class B) Driver";
    }
    return `Class ${cats.join("/")} Driver`;
  }

  return "Commercial Driver";
}
