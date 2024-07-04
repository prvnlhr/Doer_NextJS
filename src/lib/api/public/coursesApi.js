const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchCourses() {
  try {
    let response = await fetch(`${BASE_URL}/api/public/courses`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}
