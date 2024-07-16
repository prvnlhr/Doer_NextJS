export function convertMinutesToHours(minutes) {
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "Invalid input"; // Handle invalid input gracefully
  }

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const fraction = remainingMinutes / 60;

    const roundedFraction = Math.round(fraction * 2) / 2; // Round to nearest 0.5
    const totalHours = hours + roundedFraction;

    return `${totalHours} Hour${totalHours !== 1 ? "s" : ""}`; // Pluralize "Hour" if necessary
  } else {
    return `${minutes} Minute${minutes !== 1 ? "s" : ""}`; // Pluralize "Minute" if necessary
  }
}
