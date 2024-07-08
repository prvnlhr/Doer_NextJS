import React from "react";
import ChaptersList from "@/components/Chapter/ChaptersList";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import { chapters } from "@/components/courseData";
const ChaptersListPage = async ({ params }) => {
  console.log(params);
  const courseId = params.courseName.split("-")[1];
  const chapters = await fetchChapters(courseId);
  console.log(chapters);
  return <ChaptersList chapters={chapters} />;
};

export default ChaptersListPage;
