const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchChapters(courseId) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch chapters");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(`Fetch chapters error: ${error}`);
  }
}

export async function fetchChapterById(courseId, chapterId) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch chapter by id error : ${error}`);
  }
}

export async function createChapter(chapterData, courseId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chapterData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Create chapter error : ${error}`);
  }
}

export async function updateChapter(chapterData, courseId, chapterId) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(chapterData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Create chapter error : ${error}`);
  }
}

export async function deleteChapter(courseId, chapterId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/courses/${courseId}/chapters/${chapterId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("HTTP ! Error Failed to delete chapter and its content");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error in deleting the chapter ${error}`);
  }
}
