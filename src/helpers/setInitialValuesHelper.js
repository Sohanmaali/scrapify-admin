const setInitialValuesHelper = (defaultValues, responseData) => {
    const updatedValues = { ...defaultValues };
  
    Object.keys(defaultValues).forEach((key) => {
      if (responseData[key] !== undefined) {
        updatedValues[key] = responseData[key]?._id || responseData[key];
      }
    });
  
    return updatedValues;
  };
export default setInitialValuesHelper  