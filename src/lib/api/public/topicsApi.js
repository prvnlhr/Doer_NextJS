const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchTopicById(params) {
  // console.log("topicsApi.................", params[0], params[1], params[2]);
  try {
    const response = await fetch(
      `${BASE_URL}/api/courses/${params[0]}/chapters/${params[1]}/topics/${params[2]}`
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
