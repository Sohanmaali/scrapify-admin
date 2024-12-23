import Cookies from "js-cookie";
import BasicProvider from "../../src/constants/BasicProvider.js";
import { jwtDecode } from "jwt-decode";

class AuthHelpers {
  static async login(formdata, navigate, dispatch) {
    try {
      const response = await new BasicProvider(
        "auth/admin/login",
        dispatch
      ).postRequest(formdata);
      if (response.data.access_token) {


        Cookies.set(
          `${process.env.REACT_APP_COOKIE_PREFIX}_auth`,
          response.data.access_token,
          {
            expires: 30,
            path: "/",
            // domain: process.env.REACT_APP_DOMAIN,
            // sameSite: "None", // Changed to None for cross-domain
            // secure: true, // Ensure this is true if using HTTPS
          }
        );

        dispatch({ type: "set", isLogin: true });

        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async isAuthenticated() {
    // Check if the token exists in cookies
    const token = Cookies.get(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`);
    return !!token;
  }

  static async logout(dispatch) {
   
    try {
      Cookies.remove(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`, {
        path: "/",
        // domain: process.env.REACT_APP_DOMAIN,
      });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: "set", isLogin: false });
  }

  static getTokenData() {
    // Get the token from cookies
    const token = Cookies.get(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`);

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

    return null;
  }

  static async getToken() {
    return Cookies.get(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`);
  }
}
export default AuthHelpers;
