import { revalidatePathHandler, revalidateTagHandler } from "@/app/revalidate";

const BASE_URL = process.env.BASE_URL || "https://doer-next.vercel.app";

export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`);
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersBookmarks(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/bookmarks`);
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user's bookmarks error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }

    return response.json();
  } catch (error) {
    console.log(error);
    console.error("Fetch user's bookmarks error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersBookmarkById(userId, topicId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/user/${userId}/bookmarks/${topicId}`
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user's bookmark by id error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    console.error("Fetch user's bookmark by id error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersCoursesProgress(userId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/user/${userId}/courses-progress`
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersCoursesProgressByCourseId(params) {
  try {
    const userId = params[0];
    const courseId = params[1];
    const response = await fetch(
      `${BASE_URL}/api/user/${userId}/courses-progress/${courseId}`
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersLastopened(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`);
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function toggleBookmark(userId, bookmarkData) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmarkData),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    await revalidatePathHandler("/(public)/user/[userId]/classroom", "layout");

    return response.json();
  } catch (error) {
    console.error("Toogle bookmark error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function updateCourseProgress(userId, progressData) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/user/${userId}/courses-progress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progressData),
      }
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error in updating the course progress:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    await revalidatePathHandler("/(public)/user/[userId]/classroom", "layout");

    return response.json();
  } catch (error) {
    console.error("Error in updating the course progress:", error);
    throw new Error(`${error.message}`);
  }
}

export async function fetchUsersStats(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/stats`);
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error in fetching user's stats:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in fetching user's stats:", error);
    throw new Error(`${error.message}`);
  }
}

export async function updateUserStats(userId, timeSpentData) {
  try {
    console.log(userId, timeSpentData);
    const response = await fetch(`${BASE_URL}/api/user/${userId}/stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeSpentData),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error in updating the user's stats:", errorMessage);
      throw new Error(`fetch error ${errorMessage}`);
    }
    await revalidatePathHandler("/(public)/user/[userId]/classroom", "layout");
    return response.json();
  } catch (error) {
    console.error("Error in updating the user's stats:", error);
    throw new Error(`${error.message}`);
  }
}
