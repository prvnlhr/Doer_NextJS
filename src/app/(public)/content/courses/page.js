import React from "react";
import CoursesList from "@/components/Course/CourseList";

const CoursesListPage = async ({ searchParams }) => {
  return <CoursesList searchParams={searchParams} />;
};

export default CoursesListPage;
