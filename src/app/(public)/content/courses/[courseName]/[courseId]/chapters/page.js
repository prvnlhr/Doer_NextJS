import React from "react";
import ChaptersList from "@/components/Chapter/ChaptersList";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
const ChaptersListPage = async ({ params }) => {
  const courseId = params.courseId;
  const chapters = await fetchChapters(courseId);
  return <ChaptersList chapters={chapters} />;
};

export default ChaptersListPage;
