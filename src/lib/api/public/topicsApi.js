const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchTopicById(params) {
  console.log("topicsApi.................", params);
  const { courseId, chapterId, topicId } = params;
  // return "ok";
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