const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://doer-next.vercel.app";

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
