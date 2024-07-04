import React from "react";
import Datatable from "@/components/Admin/Datatable/Datatable";
import { fetchTopics } from "@/lib/api/admin/topicsApi";

const TopicsPage = async ({ params }) => {
  const getEditUrl = (topicId) => {
    return `/admin/courses/${params.courseId}/chapters/${params.chapterId}/topics/${topicId}/edit`;
  };

  const getAddUrl = () => {
    return `/admin/courses/${params.courseId}/chapters/${params.chapterId}/topics/add`;
  };

  const getDeleteUrl = (topicId) => {
    return `/admin/courses/${params.courseId}/chapters/${params.chapterId}/topics/${topicId}/delete`;
  };
  const columns = ["title", "status"];

  const topics = await fetchTopics(params.courseId, params.chapterId);

  return (
    <Datatable
      data={topics}
      columns={columns}
      getEditUrl={getEditUrl}
      getAddUrl={getAddUrl}
      getDeleteUrl={getDeleteUrl}
    />
  );
};

export default TopicsPage;
