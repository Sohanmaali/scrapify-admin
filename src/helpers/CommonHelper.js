export default class CommonHelper {
  static convertToQueryString = (data) => {
    const queryParams = Object.keys(data)
      .filter((key) => data[key] !== "") // Exclude empty values
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

    return queryParams;
  };
}
