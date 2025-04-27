const createFormData = (data) => {
    const formData = new FormData();
  
    if (!data || typeof data !== "object") return false;
  
    Object.keys(data).forEach((key) => {
      const value = data[key];
  
      // Check if the value is an instance of File
      if (value instanceof File) {
        formData.append(key, value); // Append the file
      }
      // Check if the value is an array
      else if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      }
      // Handle other values (undefined, null, or simple values like string, number, etc.)
      else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  
    return formData;
  };
  
  export default createFormData;
  