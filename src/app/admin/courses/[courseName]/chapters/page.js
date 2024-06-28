// Import necessary modules and components
import Datatable from "@/components/Admin/Datatable/Datatable";
import React from "react";
import { courses } from "../../../../../components/courseData";

const ChaptersPage = ({ params }) => {
  const getEditUrl = (slug) => {
    return `/admin/courses/${params.courseName}/chapters/${slug}/edit`;
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
    <Datatable data={chapters} columns={columns} getEditUrl={getEditUrl} getAddUrl={getAddUrl}/>
  );
};

export default ChaptersPage;
