export function generateSlug(segment) {
  let slug =
    segment &&
    segment
      .toLowerCase()
      .replace(/\./g, "") // Remove dots
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .trim(); // Trim any leading or trailing whitespace

  return slug;
}
