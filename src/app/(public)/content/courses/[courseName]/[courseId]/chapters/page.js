import React from "react";
import ChaptersList from "@/components/Chapter/ChaptersList";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import ChapterCardSkeleton from "@/components/Common/Skeletons/ChapterCardSkeleton";
import ChaptersListSkeleton from "@/components/Common/Skeletons/ChaptersListSkeleton";
const ChaptersListPage = async ({ params, searchParams }) => {
  const courseId = params.courseId;
  const chapters = await fetchChapters(courseId);
  return (
    <ChaptersList
      searchParams={searchParams}
      params={params}
      chapters={chapters}
    />
  );
};

export default ChaptersListPage;
