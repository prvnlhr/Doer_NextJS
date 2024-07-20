const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function search(filterKey, searchQuery) {
  console.log("Searching...", filterKey, searchQuery);
  try {
    let response = await fetch(
      `${BASE_URL}/api/search?filter=${filterKey}&searchKey=${searchQuery}`,
      {
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}
