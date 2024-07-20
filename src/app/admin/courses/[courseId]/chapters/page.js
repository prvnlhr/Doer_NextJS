import Datatable from "@/components/Admin/Datatable/Datatable";
import { fetchChapters } from "@/lib/api/admin/chaptersApi";
import React from "react";

export default async function ChaptersPage({ searchParams, params }) {
  const { search } = searchParams;

  const getEditUrl = (chapterId) => {
    return `/admin/courses/${params.courseId}/chapters/${chapterId}/edit`;
  };
  const getAddUrl = () => {
    return `/admin/courses/${params.courseId}/chapters/add`;
  };

  const getDeleteUrl = (chapterId) => {
    return `/admin/courses/${params.courseId}/chapters/${chapterId}/delete`;
  };

  const columns = ["title", "topicsCount", "status"];
  const chapters = await fetchChapters(params.courseId, search);
  return (
    <Datatable
      data={chapters}
      columns={columns}
      getEditUrl={getEditUrl}
      getAddUrl={getAddUrl}
      getDeleteUrl={getDeleteUrl}
    />
  );
}
