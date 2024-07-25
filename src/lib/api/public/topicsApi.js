const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://doer-next.vercel.app";

export async function fetchTopicById(params) {
  const { courseId, chapterId, topicId } = params;
  try {
    const response = await fetch(
      `${BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/topics/${topicId}`
    );
    if (!response.ok) {
      throw new Error(`fetch error ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Error in fetching topic by Id ${error}`);
  }
}
