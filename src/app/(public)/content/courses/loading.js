import CourseCardSkeleton from "@/components/Common/Skeletons/CourseCardSkeleton";
import CoursesListSkeleton from "@/components/Common/Skeletons/CoursesListSkeleton";
import React from "react";

const loading = () => {
  return (
    <CoursesListSkeleton>
      <CourseCardSkeleton />
    </CoursesListSkeleton>
  );
};

export default loading;
