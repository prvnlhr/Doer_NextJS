import ContentListSkeleton from "@/components/Common/Skeletons/ContentListSkeleton";
import CourseCardSkeleton from "@/components/Common/Skeletons/CourseCardSkeleton";
import React from "react";

const loading = () => {
  return (
    <ContentListSkeleton>
      <CourseCardSkeleton />
    </ContentListSkeleton>
  );
};

export default loading;
