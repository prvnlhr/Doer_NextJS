import TopicPage from "@/components/Topic/TopicPage";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import React from "react";

const Page = async ({ params }) => {
  const allChapterList = await fetchChapters(params.courseId);
  return <TopicPage accordionData={allChapterList} params={params} />;
};

export default Page;
