export function convertMinutesToHours(minutes) {
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "Invalid input"; // Handle invalid input gracefully
  }

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return `${hours} Hour${hours !== 1 ? "s" : ""}`; // Pluralize "Hour" if necessary
  } else {
    return `${minutes} Minute${minutes !== 1 ? "s" : ""}`; // Pluralize "Minute" if necessary
  }
}
