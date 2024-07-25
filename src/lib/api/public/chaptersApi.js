const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://doer-next.vercel.app";

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
