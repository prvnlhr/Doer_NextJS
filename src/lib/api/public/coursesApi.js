const BASE_URL = process.env.BASE_URL || "https://doer-next.vercel.app";

export async function fetchCourses() {
  try {
    let response = await fetch(`${BASE_URL}/api/courses`);
    console.log("BASE_URL", process.env.BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch courses error:", error);

    throw new Error(`Fetch courses error: ${error}`);
  }
}
