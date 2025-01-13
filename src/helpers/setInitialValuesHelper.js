const setInitialValuesHelper = (defaultValues, responseData) => {
    const updatedValues = { ...defaultValues };
  
    Object.keys(defaultValues).forEach((key) => {
      if (responseData[key] !== undefined) {
        // Check if the response key is an object with _id, otherwise assign the value
        updatedValues[key] = responseData[key]?._id || responseData[key];
      }
    });
  
    return updatedValues;
  };
export default setInitialValuesHelper  