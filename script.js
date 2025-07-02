document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const ageInput = document.getElementById("age");
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const termsCheckbox = document.getElementById("terms");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const ageError = document.getElementById("ageError");
  const genderError = document.getElementById("genderError");
  const termsError = document.getElementById("termsError");

  // Function to show error message
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("is-invalid");
    errorElement.textContent = message;
    errorElement.style.display = "block"; // Make visible
  }

  // Function to hide error message
  function hideError(inputElement, errorElement) {
    inputElement.classList.remove("is-invalid");
    errorElement.textContent = "";
    errorElement.style.display = "none"; // Hide
  }

  // Validate Full Name
  function validateFullName() {
    if (fullNameInput.value.trim() === "") {
      showError(fullNameInput, fullNameError, "Full name is required.");
      return false;
    } else {
      hideError(fullNameInput, fullNameError);
      return true;
    }
  }

  // Validate Email
  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      showError(emailInput, emailError, "Email address is required.");
      return false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    } else {
      hideError(emailInput, emailError);
      return true;
    }
  }

  // Validate Age
  function validateAge() {
    const age = parseInt(ageInput.value);
    if (isNaN(age) || ageInput.value.trim() === "") {
      showError(ageInput, ageError, "Age is required.");
      return false;
    } else if (age < 18 || age > 99) {
      showError(ageInput, ageError, "Age must be between 18 and 99.");
      return false;
    } else {
      hideError(ageInput, ageError);
      return true;
    }
  }

  // Validate Gender
  function validateGender() {
    let isChecked = false;
    for (const radio of genderRadios) {
      if (radio.checked) {
        isChecked = true;
        break;
      }
    }
    if (!isChecked) {
      // Apply 'is-invalid' to the first radio input for visual consistency
      // Or to a parent div if you want to highlight the group
      genderRadios[0].classList.add("is-invalid");
      genderError.style.display = "block"; // Make visible
      genderError.textContent = "Please select your gender.";
      return false;
    } else {
      genderRadios[0].classList.remove("is-invalid");
      genderError.style.display = "none"; // Hide
      genderError.textContent = "";
      return true;
    }
  }

  // Validate Terms and Conditions
  function validateTerms() {
    if (!termsCheckbox.checked) {
      showError(
        termsCheckbox,
        termsError,
        "You must agree to the terms and conditions."
      );
      return false;
    } else {
      hideError(termsCheckbox, termsError);
      return true;
    }
  }

  // Add real-time validation on input/change
  fullNameInput.addEventListener("input", validateFullName);
  emailInput.addEventListener("input", validateEmail);
  ageInput.addEventListener("input", validateAge);
  genderRadios.forEach((radio) =>
    radio.addEventListener("change", validateGender)
  );
  termsCheckbox.addEventListener("change", validateTerms);

  // Form submission handler
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Run all validations
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    // Check if all fields are valid
    if (
      isFullNameValid &&
      isEmailValid &&
      isAgeValid &&
      isGenderValid &&
      isTermsValid
    ) {
      alert("Form submitted successfully!"); // Use a custom modal in a real app
      form.reset(); // Reset the form after successful submission
      // Manually hide any error messages that might still be showing after reset
      hideError(fullNameInput, fullNameError);
      hideError(emailInput, emailError);
      hideError(ageInput, ageError);
      genderRadios[0].classList.remove("is-invalid"); // Clear gender error class
      genderError.style.display = "none";
      hideError(termsCheckbox, termsError);
    } else {
      console.log("Form has validation errors.");
    }
  });
});
