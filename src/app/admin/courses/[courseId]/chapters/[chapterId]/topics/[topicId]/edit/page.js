import TopicForm from "@/components/Admin/Topic/TopicForm";
import { fetchTopicById } from "@/lib/api/admin/topicsApi";
import React from "react";

const TopicEditPage = async ({ params }) => {
  const { courseId, chapterId, topicId } = params;
  const topic = await fetchTopicById(courseId, chapterId, topicId);
  return <TopicForm topic={topic} />;
};

export default TopicEditPage;
