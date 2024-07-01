// Import necessary modules and components
import Datatable from "@/components/Admin/Datatable/Datatable";
import React from "react";
import { courses } from "../../../../../components/courseData";

const ChaptersPage = ({ params }) => {
  console.log("🚀 ~ file: page.js:7 ~ ChaptersPage ~ params:", params);
  const getEditUrl = (chapterNameSlug, chapterId) => {
    return `/admin/courses/${params.courseName}/chapters/${chapterNameSlug}/edit/${chapterId}`;
  };
  const getAddUrl = () => {
    return `/admin/courses/${params.courseName}/chapters/add`;
  };
  const columns = ["title", "courseName", "status", "topics"];

  //TODO : deleteURl

  let chapters = courses
    .filter((course) => course.titleSlug === params.courseName)
    .flatMap((course) => course.chapters);

  return (
    <Datatable
      data={chapters}
      columns={columns}
      getEditUrl={getEditUrl}
      getAddUrl={getAddUrl}
    />
  );
};

export default ChaptersPage;
