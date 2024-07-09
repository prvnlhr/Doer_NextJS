const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchChapters(courseId) {
  try {
    let response = await fetch(`${BASE_URL}/api/courses/${courseId}/chapters`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`Failed to fetch chapters ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Fetch chapters error: ${error}`);
  }
}
