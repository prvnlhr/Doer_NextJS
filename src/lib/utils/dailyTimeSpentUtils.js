export function getLastMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday being the start of the week
  const lastMonday = new Date(date.setDate(diff));
  lastMonday.setHours(0, 0, 0, 0); // Reset time to the start of the day
  return lastMonday;
}

export function convertMinutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.ceil(totalMinutes % 60);
  return { hours, minutes };
}
