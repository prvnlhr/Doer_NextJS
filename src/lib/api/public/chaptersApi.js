const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3000";

export async function fetchChapters(courseId) {
  try {
    let response = await fetch(`${BASE_URL}/api/courses/${courseId}/chapters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Fetch chapters error: ${error}`);
  }
}
