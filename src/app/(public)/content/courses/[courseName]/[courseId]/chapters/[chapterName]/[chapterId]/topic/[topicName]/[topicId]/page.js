import Content from "@/components/Topic/MainView/Content";
import { fetchTopicById } from "@/lib/api/public/topicsApi";
import React from "react";

const Page = async ({ params }) => {
  const topic = await fetchTopicById(params);
  return <Content topic={topic} />;
};

export default Page;
