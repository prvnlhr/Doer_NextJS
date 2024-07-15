import revalidateTagHandler from "@/app/revalidate";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

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
    const response = await fetch(`${BASE_URL}/api/user/${userId}/bookmarks`, {
      next: { revalidate: 0 },
    });
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
  } catch (error) {
    console.error("Toogle bookmark error:", error);
    throw new Error(`${error.message}`);
  }
}
