import { fetchTopicById } from "@/lib/api/public/topicsApi";
import React from "react";

const Page = async ({ params }) => {
  const topic = await fetchTopicById(params);
  console.log(topic);
  return <>{topic.content}</>;
};

export default Page;
