// ========================
// CONFIGURATION SECTION
// ========================

// List of countries with ISO codes and dial codes
const COUNTRY_LIST = [
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "UK", dialCode: "+44" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Germany", code: "DE", dialCode: "+49" }
];

// Simulated backend response for pre-fill
const BACKEND_PREFILL = {
  countryCode: "US",      // ISO code
  mobileNumber: "987654321"
};

// ========================
// DOM ELEMENT REFERENCES
// ========================
const countrySelect = document.getElementById("country");
const countryCodeLabel = document.getElementById("countryCodeLabel");
const mobileInput = document.getElementById("mobileNumber");
const form = document.getElementById("mobileForm");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("errorMsg");

// ========================
// INITIALIZATION FUNCTIONS
// ========================

// Populate the dropdown with countries
function populateCountryDropdown() {
  COUNTRY_LIST.forEach(({ name, code, dialCode }) => {
    const option = document.createElement("option");
    option.value = code;                         // ISO country code
    option.textContent = name;                   // Display name
    option.setAttribute("data-dialcode", dialCode); // Custom attribute
    countrySelect.appendChild(option);
  });
}

// Pre-fill values using backend data
function applyBackendPrefill(data) {
  countrySelect.value = data.countryCode;
  mobileInput.value = data.mobileNumber;
  updateCountryCodeLabel();
}

// Set the country code label based on selected dropdown value
function updateCountryCodeLabel() {
  const selectedOption = countrySelect.options[countrySelect.selectedIndex];
  const dialCode = selectedOption.getAttribute("data-dialcode") || "+--";
  countryCodeLabel.textContent = dialCode;
}

// ========================
// VALIDATION FUNCTION
// ========================

/**
 * Validate mobile number.
 * Rules:
 * - Only digits
 * - 8 to 15 digits
 * - Should not start with 0
 */
function isValidMobileNumber(number) {
  return /^[1-9]\d{7,14}$/.test(number);
}

// ========================
// EVENT HANDLERS
// ========================

// Allow only numeric input
function restrictToDigits(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent page reload

  // Clear previous messages
  errorDiv.textContent = "";
  resultDiv.textContent = "";

  const selectedOption = countrySelect.options[countrySelect.selectedIndex];
  const dialCode = selectedOption.getAttribute("data-dialcode");
  const mobileNumber = mobileInput.value.trim();

  // Perform validation
  if (!isValidMobileNumber(mobileNumber)) {
    errorDiv.textContent = "Enter a valid mobile number (8–15 digits, not starting with 0).";
    return;
  }

  // Construct full number
  const fullMobileNumber = dialCode + mobileNumber;

  // Show result
  resultDiv.textContent = "Saved mobile number: " + fullMobileNumber;

  // Simulate backend call
  console.log("Payload to backend:", {
    country: selectedOption.value,
    fullMobile: fullMobileNumber
  });
}

// ========================
// SETUP ON PAGE LOAD
// ========================

// Attach all event listeners and initialize UI
function initializeForm() {
  populateCountryDropdown();
  applyBackendPrefill(BACKEND_PREFILL);
  countrySelect.addEventListener("change", updateCountryCodeLabel);
  mobileInput.addEventListener("input", restrictToDigits);
  form.addEventListener("submit", handleFormSubmit);
}

// Initialize the form when DOM is ready
initializeForm();
