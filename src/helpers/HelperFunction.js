import axios from "axios"; // Import axios or any other HTTP client you're using
import BasicProvider from "../constants/BasicProvider";

class HelperFunctions {
  // Static method to trash data
  static async trashData(moduleName, dataIds) {
    try {
      const response = await new BasicProvider(
        `${moduleName}/multi/trash`
      ).patchRequest({ ids: dataIds });
      return response;
    } catch (error) {
      console.error("Error while moving data to trash:", error);
      throw error;
    }
  }

  // Static method to delete data
  static async deleteData(moduleName, dataIds) {
    try {
      const response = await new BasicProvider(
        `${moduleName}/multi/delete`
      ).deleteRequest({ ids: dataIds });
      return response;
    } catch (error) {
      console.error("Error deleting data:", error);
      return false;
    }
  }

  //   Static method to get data
  static async getData(moduleName, currentPage, rowPerPage, visitedProfileId) {
    try {
      const response = await new BasicProvider(
        `${moduleName}?currentPage=${currentPage}&rowPerPage=${rowPerPage}`
      ).getRequest();
     
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], total: 0 }; // Return an empty result if there's an error
    }
  }
  static convertToQueryString(params) {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  }
}

export default HelperFunctions;
