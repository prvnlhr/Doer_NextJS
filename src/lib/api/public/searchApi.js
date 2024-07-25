const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://doer-next.vercel.app";

export async function search(filterKey, searchQuery) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/search?filter=${filterKey}&searchKey=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}
