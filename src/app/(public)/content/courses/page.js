import React from "react";
import CoursesList from "@/components/Course/CourseList";
import { fetchCourses } from "@/lib/api/public/coursesApi";

const CoursesListPage = async () => {
  const courses = await fetchCourses();
  return <CoursesList courses={courses} />;
};

export default CoursesListPage;
