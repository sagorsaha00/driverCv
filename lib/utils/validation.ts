/**
 * Sweden and General Auth Validation Utilities
 * Enforces strict validation rules for Swedish Phone numbers,
 * Personal Identity Numbers (Personnummer), Organization Numbers,
 * and Email / Gmail addresses.
 */

/**
 * Validates standard and Gmail email addresses
 * Requires a valid local part, @ symbol, domain name, and at least a 2-letter TLD.
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates Swedish Phone numbers
 * Accepts:
 * - International format: +46 7X XXX XX XX, +467XXXXXXXX, 0046 7X...
 * - Domestic format: 07X XXX XX XX, 07XXXXXXXX, 08-XXX XX XX (landline/fleet)
 * - Also allows common Scandinavian/EU formats (+46, 070, 072, 073, 076, 079)
 * Rejecting random numbers like "123", "5656566", or non-numeric garbage.
 */
export const isValidSwedishPhone = (phone: string): boolean => {
  if (!phone) return false;
  // Strip spaces, dashes, parentheses
  const cleaned = phone.trim().replace(/[\s\-\(\)\.]/g, "");

  // Swedish mobile and standard formats:
  // Starts with +46 followed by 7-10 digits: +46701234567
  // Or starts with 0046 followed by 7-10 digits: 0046701234567
  // Or starts with 0 followed by 7-10 digits: 0701234567, 081234567
  const swedishPattern = /^(\+46|0046|0)[1-9]\d{6,9}$/;
  return swedishPattern.test(cleaned);
};

/**
 * Validates Swedish Personal Identity Number (Personnummer)
 * Accepts:
 * - 12-digit format: YYYYMMDD-XXXX or YYYYMMDDXXXX
 * - 10-digit format: YYMMDD-XXXX or YYMMDDXXXX
 * Checks valid year, month (01-12), and day (01-31).
 */
export const isValidSwedishPersonnummer = (pin: string): boolean => {
  if (!pin) return false;
  const cleaned = pin.trim().replace(/[\s\-]/g, "");

  // 10 digits (YYMMDDXXXX) or 12 digits (YYYYMMDDXXXX)
  const pinPattern = /^((19|20)?\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{4}$/;
  return pinPattern.test(cleaned);
};

/**
 * Validates Swedish Organization Number (Organisationsnummer) for HR/Fleets
 * Format: 10 digits, usually XXXXXX-XXXX (e.g. 556123-4567)
 */
export const isValidSwedishOrgNumber = (org: string): boolean => {
  if (!org) return false;
  const cleaned = org.trim().replace(/[\s\-]/g, "");
  return /^\d{10}$/.test(cleaned);
};

/**
 * Validates Driving License Number
 * Must be at least 6 alphanumeric characters without spaces
 */
export const isValidDrivingLicenseNumber = (license: string): boolean => {
  if (!license) return false;
  const cleaned = license.trim().replace(/[\s\-]/g, "");
  return /^[a-zA-Z0-9]{6,20}$/.test(cleaned);
};

/**
 * Validates Login Identifier (can be Email or Swedish Phone Number)
 */
export const validateLoginIdentifier = (
  input: string
): { valid: boolean; type: "email" | "phone" | "invalid"; message?: string } => {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      valid: false,
      type: "invalid",
      message: "Please enter your email or phone number.",
    };
  }

  if (trimmed.includes("@")) {
    if (isValidEmail(trimmed)) {
      return { valid: true, type: "email" };
    }
    return {
      valid: false,
      type: "invalid",
      message: "Please enter a valid email address (e.g. driver@gmail.com).",
    };
  }

  // Treat as phone number
  if (isValidSwedishPhone(trimmed)) {
    return { valid: true, type: "phone" };
  }

  return {
    valid: false,
    type: "invalid",
    message:
      "Please enter a valid email (e.g. name@gmail.com) or Swedish phone number (+46 70 123 45 67 / 070 123 45 67).",
  };
};
