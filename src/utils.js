/**
 * Calculates the difference in days between two dates.
 */
function differenceInDays(date1,date2) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.round((d1 - d2) / msPerDay);
}

/**
 * Generates a random hex color.
 */
function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6,"0")}`;
}

export { differenceInDays,generateRandomColor };
