import ChapterCardSkeleton from "@/components/Common/Skeletons/ChapterCardSkeleton";
import ChaptersListSkeleton from "@/components/Common/Skeletons/ChaptersListSkeleton";
import React from "react";

const loading = () => {
  return (
    <ChaptersListSkeleton>
      <ChapterCardSkeleton />
    </ChaptersListSkeleton>
  );
};

export default loading;
