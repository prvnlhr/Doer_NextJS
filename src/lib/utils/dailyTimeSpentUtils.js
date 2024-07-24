export function getLastMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday being the start of the week
  const lastMonday = new Date(date.setDate(diff));
  lastMonday.setHours(0, 0, 0, 0); // Reset time to the start of the day
  return lastMonday;
}

export const getMonday = (date) => {
  const today = new Date(date);
  const day = today.getDay();
  const difference = (day + 6) % 7; // Number of days to the previous Monday
  today.setDate(today.getDate() - difference);
  today.setHours(0, 0, 0, 0);
  return today;
};

export const isOldData = (weekStartDate, currentMonday) => {
  return new Date(weekStartDate) < currentMonday;
};

export function convertMinutesToHoursAndMinutes(timeInMilliseconds) {
  // const hours = Math.floor(totalMinutes / 60);
  // const minutes = Math.ceil(totalMinutes % 60);

  const hours = Math.floor(timeInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  return { hours, minutes };
}
export function millisecondsToHoursAndMinutes(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / 60000); // Convert milliseconds to minutes
  const hours = Math.floor(totalMinutes / 60); // Convert minutes to hours
  const minutes = totalMinutes % 60; // Remaining minutes

  return { hours, minutes };
}
