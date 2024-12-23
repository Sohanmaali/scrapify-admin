export default class DateTimeHelper {
  // Method to format date string to "dd MMM yyyy"
  static formatDate(dateString) {
    // Create a new Date object from the given date string
    const date = new Date(dateString);

    // Get day, month, and year from the Date object
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth(); // 0-based index
    const year = date.getUTCFullYear();

    // Custom month mapping
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Get the month name
    const month = monthNames[monthIndex];

    return `${String(day).padStart(2, '0')} ${month} ${year}`;
  }
}
