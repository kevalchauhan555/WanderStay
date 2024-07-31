document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation");

  function validateAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
  }

  function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
  }

  function validateDates(checkin, checkout) {
    const today = new Date().toISOString().split("T")[0];
    if (checkin < today) {
      return "Check-In date must be today or in the future.";
    }
    if (checkout <= checkin) {
      return "Check-Out date must be after Check-In date.";
    }
    return null;
  }

  form.addEventListener("submit", function (event) {
    let isValid = true;

    // Validate Aadhaar
    const aadhaar = document.querySelector("#aadhaar").value;
    if (!validateAadhaar(aadhaar)) {
      isValid = false;
      const aadhaarInput = document.querySelector("#aadhaar");
      aadhaarInput.classList.add("is-invalid");
      aadhaarInput.nextElementSibling.textContent =
        "Aadhaar number must be exactly 12 digits.";
    } else {
      document.querySelector("#aadhaar").classList.remove("is-invalid");
    }

    // Validate Mobile Number
    const mobile = document.querySelector("#mobile").value;
    if (!validateMobile(mobile)) {
      isValid = false;
      const mobileInput = document.querySelector("#mobile");
      mobileInput.classList.add("is-invalid");
      mobileInput.nextElementSibling.textContent =
        "Please enter a valid 10-digit mobile number.";
    } else {
      document.querySelector("#mobile").classList.remove("is-invalid");
    }

    // Validate Dates
    const checkin = document.querySelector("#checkin").value;
    const checkout = document.querySelector("#checkout").value;
    const dateError = validateDates(checkin, checkout);
    if (dateError) {
      isValid = false;
      document.querySelector("#checkin").classList.add("is-invalid");
      document.querySelector("#checkout").classList.add("is-invalid");
      document.querySelector("#checkin").nextElementSibling.textContent =
        dateError;
      document.querySelector("#checkout").nextElementSibling.textContent =
        dateError;
    } else {
      document.querySelector("#checkin").classList.remove("is-invalid");
      document.querySelector("#checkout").classList.remove("is-invalid");
    }

    if (!isValid) {
      event.preventDefault(); // Stop form submission
    }
  });
});
