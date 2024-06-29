const BASE_URL = process.env.BASE_URL;

export async function fetchCourses() {
  try {
    let response = await fetch(`${BASE_URL}/api/courses`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error.message}`);
  }
}

export async function createCourse(courseData) {
  try {
    console.log(courseData);
    const response = await fetch(`http://localhost:3000/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error("Failed to create course");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Create course error: ${error.message}`);
  }
}
