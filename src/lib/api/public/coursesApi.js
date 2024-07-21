const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3000";

export async function fetchCourses() {
  try {
    let response = await fetch(`${BASE_URL}/api/courses`);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch courses error:", error);

    throw new Error(`Fetch courses error: ${error}`);
  }
}
