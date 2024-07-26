import React from "react";
import CoursesList from "@/components/Course/CourseList";
import { fetchCourses } from "@/lib/api/admin/coursesApi";

const CoursesListPage = async ({ searchParams }) => {
  const courses = await fetchCourses();
  return <CoursesList courses={courses} searchParams={searchParams} />;
};

export default CoursesListPage;
