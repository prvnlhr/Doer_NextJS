import { revalidatePathHandler, revalidateTagHandler } from "@/app/revalidate";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchCourses(searchKey) {
  try {
    let response = await fetch(
      `${BASE_URL}/api/admin/courses?search=${searchKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}
export async function fetchCourseById(courseId) {
  try {
    let response = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch course by id");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}

export async function createCourse(formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/courses`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create course");
    }
    await revalidatePathHandler("/admin/courses", "page");
    await revalidatePathHandler("/", "layout");


    return response.json();
  } catch (error) {
    throw new Error(`Create course error: ${error}`);
  }
}

export async function updateCourse(formData, courseId) {
  try {
    let response = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch course by id");
    }
    await revalidatePathHandler("/admin/courses/[courseId]/edit", "page");
    await revalidatePathHandler("/admin/courses", "page");
    await revalidatePathHandler("/", "layout");


    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(
        " HTTP !  Error :: Failed to delete course and its content"
      );
    }
    await revalidatePathHandler("/admin/courses", "page");
    await revalidatePathHandler("/", "layout");


    return response.json();
  } catch (error) {
    throw new Error(`Error in deleting the course ${error}`);
  }
}
