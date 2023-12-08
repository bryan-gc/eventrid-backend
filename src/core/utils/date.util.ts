export function addHoursToDate(date: Date, hours: number) {
  const dateWithExtraHours = new Date();
  dateWithExtraHours.setTime(date.getTime() + hours * 60 * 60 * 1000);
  return dateWithExtraHours;
}
