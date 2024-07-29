import React from "react";
import CoursesList from "@/components/Course/CourseList";
import { fetchCourses } from "@/lib/api/admin/coursesApi";
import CoursesListSkeleton from "@/components/Common/Skeletons/CoursesListSkeleton";
import CourseCardSkeleton from "@/components/Common/Skeletons/CourseCardSkeleton";

const CoursesListPage = async ({ searchParams }) => {
  const courses = await fetchCourses();
  return <CoursesList courses={courses} searchParams={searchParams} />;
  // return (
  //   <CoursesListSkeleton>
  //     <CourseCardSkeleton />
  //   </CoursesListSkeleton>
  // );
};

export default CoursesListPage;
