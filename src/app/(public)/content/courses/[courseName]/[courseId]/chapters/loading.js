import ChapterCardSkeleton from "@/components/Common/Skeletons/ChapterCardSkeleton";
import ContentListSkeleton from "@/components/Common/Skeletons/ContentListSkeleton";
import React from "react";

const loading = () => {
  return (
    <ContentListSkeleton>
      <ChapterCardSkeleton />
    </ContentListSkeleton>
  );
};

export default loading;
