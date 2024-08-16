regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve input values
  const userField = regForm.querySelector("#username").value
  const emailField = regForm.querySelector("input[name='email']").value
  const passwordField = regForm.querySelector("#password").value

  // Validate username
  if (userField === "") {
    alert("Username field must be filled");
    return; // Stop further execution if validation fails
  }

  const uniqueChars = new Set(userField);
  if (uniqueChars.size < 2) {
    alert("Username must contain at least two unique characters.");
    return; // Stop further execution if validation fails
  }

  const noSpecialCharsOrWhitespace = /^[a-zA-Z0-9]+$/.test(userField);
  if (!noSpecialCharsOrWhitespace) {
    alert("Username cannot contain special characters or whitespace.");
    return; // Stop further execution if validation fails
  }

  // Validate email
  const emailValidationResult = disallowedDom(emailField);
  if (emailValidationResult !== true) {
    alert(emailValidationResult);
    return; // Stop further execution if validation fails
  }

  // Validate password
  const passwordValidationResult = passwordValidation(passwordField);
  if (passwordValidationResult !== true) {
    alert(passwordValidationResult);
    return; // Stop further execution if validation fails
  }

  alert(
    `Username, email, and password are valid:\nUsername: ${userField}\nEmail: ${emailField}\nPassword: ${passwordField}`
  );
});

function disallowedDom(domain) {
  if (domain.includes("@") && domain.endsWith(".com")) {
    if (domain === "example.com") {
      return "Email domain cannot be example.com";
    }
    return true;
  } else {
    return "Email domain is invalid";
  }
}

function passwordValidation(password) {
  // Regular expressions to check for at least one uppercase letter, one lowercase letter, one number, and one special character
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Added more special characters

  // Check if password contains the word "password" in any case
  const hasForbiddenWord = /password/i.test(password);

  // Return true if all conditions are met, and false if any are not met
  return (
    hasUpperCase &&
    hasLowerCase &&
    hasNum &&
    hasSpecialChar &&
    !hasForbiddenWord
  );
}
