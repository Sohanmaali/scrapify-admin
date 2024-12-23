import { object } from "prop-types";

const isValidDate = (date) => {
  const parsedDate = Date.parse(date);
  return (
    !isNaN(parsedDate) &&
    new Date(parsedDate).toISOString().split("T")[0] === date
  );
};

export const submitHalper = (initialValues, validationRules, dispatch) => {
  const errors = {};

  Object.keys(validationRules).forEach((field) => {
    const fieldRules = validationRules[field];
    const value = initialValues[field] || "";
    const stringValue = String(value).trim();

    if (fieldRules.required && !stringValue) {
      errors[field] = `${field.replace("_", " ")} is required`;
    }

    if (fieldRules.type === "date" && !isValidDate(value)) {
      errors[field] = `${field.replace("_", " ")} is not a valid date`;
    }
  });

  if (Object.keys(errors).length > 0) {
    dispatch({ type: "SET_ERRORS", payload: errors });
    return false; // Validation failed
  }

  // No errors, return the form values in FormData
  const formData = new FormData();
  Object.keys(initialValues).forEach((key) => {
    formData.append(key, initialValues[key]);
  });

  return formData;
};
