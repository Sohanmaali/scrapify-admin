import { toast } from "react-toastify";

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
    // Display each error as a toast notification
    Object.values(errors).forEach((error) => toast.error(error));
    dispatch({ type: "SET_ERRORS", payload: errors });
    return false; // Validation failed
  }

  // No errors, return the form values in FormData
  const formData = new FormData();
  // Object.keys(initialValues).forEach((key) => {
  //   formData.append(key, initialValues[key]);
  // });

  Object.keys(initialValues).forEach((key) => {
    if (key === "gallery" && Array.isArray(initialValues[key])) {
      initialValues[key].forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}`, item);
        } else {
          formData.append(`exist_gallery`, JSON.stringify(item));
        }
      });
    } else {
      formData.append(key, initialValues[key]);
    }
  });

  return formData;
};
