const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", error);
      throw new Error(`fetch error ${errorMessage}`);
    }
  } catch (error) {
    console.error("Fetch user error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function toggleBookmark(userId, bookmarkData) {
  console.log(userId, bookmarkData);
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmarkData),
      cache: "no-store",
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Fetch user error:", error);
      throw new Error(`fetch error ${errorMessage}`);
    }
  } catch (error) {
    console.error("Toogle bookmark error:", error);
    throw new Error(`${error.message}`);
  }
}
