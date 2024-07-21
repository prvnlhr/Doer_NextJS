const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3000";

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
