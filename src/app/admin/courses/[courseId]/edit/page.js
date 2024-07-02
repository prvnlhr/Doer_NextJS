import CourseForm from "@/components/Admin/Course/CourseForm";
import { fetchCourseById } from "@/lib/api/admin/coursesApi";
import React from "react";

const page = async ({ params }) => {
  const { courseId } = params;
  const course = await fetchCourseById(courseId);
  return <CourseForm course={course} />;
};

export default page;
