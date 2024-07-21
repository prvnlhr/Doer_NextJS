import revalidateTagHandler from "@/app/revalidate";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Get all topics
export async function fetchTopics(courseId, chapterId, searchKey) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}/topics?search=${searchKey}`,
      { next: { revalidate: 0 } }
    );
    if (!response.ok) {
      throw new Error(`fetch error ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Error in fetching topics ${error}`);
  }
}

export async function fetchTopicById(courseId, chapterId, topicId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}/topics/${topicId}`,
      { next: { revalidate: 0 } }
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

export async function createTopic(topicData, courseId, chapterId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}/topics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topicData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Create topic error : ${error}`);
  }
}

export async function updateTopic(topicData, courseId, chapterId, topicId) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}/topics/${topicId}`,
      {
        method: "POST",
        body: JSON.stringify(topicData),
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to update topic");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Update topic error: ${error}`);
  }
}

export async function deleteTopic(courseId, chapterId, topicId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}/topics/${topicId}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("HTTP ! Error Failed to delete topic and its content");
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error in deleting the topic ${error}`);
  }
}
