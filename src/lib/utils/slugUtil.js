export function generateSlug(segment) {
  let slug =
    segment &&
    segment
      .toLowerCase() // Convert to lowercase
      .normalize("NFD") // Normalize Unicode characters
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/--+/g, "-") // Replace multiple dashes with a single dash
      .trim(); // Trim leading and trailing dashes

  return slug;
}

export function reverseSlug(slug) {
  if (!slug) return "";

  let segment = slug
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

  return segment;
}
