import React from "react";
import CoursesList from "@/components/Course/CourseList";

import { fetchCourses } from "@/lib/api/coursesApi";

const CoursesListPage = async () => {
  const courses = await fetchCourses();
  // const courses = [];
  return <CoursesList courses={courses} />;
};

export default CoursesListPage;
