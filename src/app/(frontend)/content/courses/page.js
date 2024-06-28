// /app/courses/page.js
import React from "react";
import CoursesList from "@/components/Course/CourseList";

async function fetchCourses() {
  const res = await fetch(`http://localhost:3000/api/courses`, {
    cache: "no-store", // Ensure fresh data on each request
  });
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await res.json();
  return data;
}

const CoursesListPage = async () => {
  let courses = [];
  try {
    courses = await fetchCourses();
    console.log(courses);
  } catch (error) {
    console.error(error);
  }

  return <CoursesList courses={courses} />;
};

export default CoursesListPage;
