// helper/validationHelper.js

function validateRegisterInput(data) {
  const errors = [];

  if (!data.username || data.username.trim() === "") {
      errors.push("Username is required.");
  }

  if (!data.email || !data.email.includes("@")) {
      errors.push("Valid email is required.");
  }

  if (!data.password || data.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
  }

  if (!data.role || (data.role !== "admin" && data.role !== "user")) {
      errors.push("Role must be either 'admin' or 'user'.");
  }

  return errors;
}

function validateLoginInput(data) {
  const errors = [];

  if (!data.username || data.username.trim() === "") {
      errors.push("Username is required.");
  }

  if (!data.password || data.password.trim() === "") {
      errors.push("Password is required.");
  }

  return errors;
}

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
