import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function fetchCourses() {
  try {
    let response = await fetch(`${BASE_URL}/api/admin/courses`, {
      cache: "no-store",
    });

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
    let response = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course by id");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch courses error: ${error}`);
  }
}

export async function updateCourse(formData, courseId) {
  try {
    let response = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      method: "POST",
      cache: "no-store",
      body: formData,
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch course by id");
    }
    // revalidatePath(`/admin/courses/[courseId]/edit`, "page");
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
      throw new Error("Failed to delete course and its content");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error in deleting the course ${error}`);
  }
}
export async function createCourse(formData) {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/courses`, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to create course");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Create course error: ${error}`);
  }
}
