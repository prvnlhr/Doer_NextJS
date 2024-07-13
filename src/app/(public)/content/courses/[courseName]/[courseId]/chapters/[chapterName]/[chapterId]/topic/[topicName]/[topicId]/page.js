import TopicContent from "@/components/Topic/MainView/TopicContent";
import { fetchTopicById } from "@/lib/api/public/topicsApi";
import React from "react";

const Page = async ({ params }) => {
  const topic = await fetchTopicById(params);
  return <TopicContent topic={topic} />;
};

export default Page;
