import ChapterForm from "@/components/Admin/Chapter/ChapterForm";
import { fetchChapterById } from "@/lib/api/admin/chaptersApi";
import React from "react";

const ChapterEditPage = async ({ params }) => {
  const { courseId, chapterId } = params;
  console.log(courseId, chapterId);

  const chapter = await fetchChapterById(courseId, chapterId);
  return <ChapterForm chapter={chapter} />;
};

export default ChapterEditPage;
