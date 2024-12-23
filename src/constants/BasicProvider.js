import axios from "axios";
import Cookies from "js-cookie";
class BasicProvider {
  constructor(url, dispatch) {
    this.url = "http://localhost:3004" + "/api/" + url;
    // this.url = process.env.REACT_APP_NODE_URL + "/api/" + url;

    this.dispatch = dispatch;
  }

  async getRequest() {
    try {
      const config = this.getHeaders();
      if (this.url.includes("files")) {
        config.responseType = "blob";
      }
      const response = await axios.get(this.url, config);

      return this.processResponse(response);
    } catch (error) {
      this.handleException(error);
    }
  }

  async postRequest(data) {
    try {
      const response = await axios.post(this.url, data, this.getHeaders(data));
      return this.processResponse(response);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getPdf() {
    try {
      const config = this.getHeaders();
      config.responseType = "blob";
      const response = await axios.get(this.url, config);
      return this.processResponse(response);
    } catch (error) {
      this.handleException(error);
    }
  }

  processResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      if (response?.data?.data) {
        return response?.data;
      } else {
        return response;
      }
    } else {
      const errorMessage = response?.data?.message || "Unknown error occurred";
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }
  }

  getHeaders(data) {
    const headers = {};

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const token = this.getTokenFromCookie();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return { headers: headers };
  }

  getTokenFromCookie() {
    const token = Cookies.get(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`);
    return token;
  }

  handleException(error) {
    if (process.env.REACT_APP_DEBUG) {
      console.error(error.response.data);
    }

    if (error.response.data.statusCode === 401) {
      Cookies.remove(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`, {
        path: "",
        domain: process.env.REACT_APP_URL,
      });
      this.dispatch({ type: "set", isNotLoggin: error.response.data.error });
    }

    if (error.response.data.statusCode === 403) {
      Cookies.remove(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`, {
        path: "",
        domain: process.env.REACT_APP_URL,
      });
      this.dispatch({ type: "set", isBlock: error.response.data.data });
    }

    if (error.hasOwnProperty("response")) {
      if (error.response.hasOwnProperty("data")) {
        this.dispatch({ type: "set", isSuccessful: false });
        // this.dispatch({ type: 'set', validations: [error.response.data] })
        throw error.response.data;
      }
      throw error.response;
    }
    throw error;
  }

  async putRequest(data) {
    try {
      const response = await axios.put(this.url, data, this.getHeaders());
      return this.processResponse(response);
    } catch (error) {
      console.error("Error occurred during PUT request:", error);
      this.handleException(error);
    }
  }

  async patchRequest(data) {
    try {
      const response = await axios.patch(this.url, data, this.getHeaders(data));
      return this.processResponse(response);
    } catch (error) {
      this.handleException(error);
    }
  }

  async deleteRequest(data) {
    try {
      var config = this.getHeaders();
      const response = await axios.post(this.url, data, config);

      return this.processResponse(response);
    } catch (error) {
      console.error("Error occurred during DELETE request:", error);
      this.handleException(error);
    }
  }
}

export default BasicProvider;
