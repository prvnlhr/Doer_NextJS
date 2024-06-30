import CourseForm from "@/components/Admin/Course/CourseForm";
import { fetchCourseById } from "@/lib/api/admin/coursesApi";
import React from "react";

const CourseEditPage = async ({ searchParams }) => {
  console.log(searchParams);
  const course = await fetchCourseById(searchParams.id);
  return <CourseForm course={course} />;
};

export default CourseEditPage;
