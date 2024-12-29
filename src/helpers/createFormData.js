const createFormData = (data) => {
  const formData = new FormData();

  if (!data || typeof data !== 'object') return false;

  // Iterate over each key-value pair in the data
  Object.keys(data).forEach((key) => {
      const value = data[key];

      if (value instanceof File) {
          formData.append(key, value);  // Append the file
      } else if (value !== undefined && value !== null) {
          formData.append(key, value);  // Append normal field data, excluding null/undefined values
      }
  });

  return formData;
};

export default createFormData;
