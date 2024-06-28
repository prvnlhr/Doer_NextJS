"use client";
import React from "react";
import { useParams } from "next/navigation";
import topics from "../../../../../../../components/topicsData";
import Datatable from "@/components/Admin/Datatable/Datatable";
const TopicsPage = () => {
  const params = useParams();
  const { courseName, chapterName } = params;
  console.log(courseName, chapterName);
  // console.table(topics);
  const topicsArr = topics.filter(
    (topics) => topics.chapterNameSlug === chapterName
  );
  console.log(topicsArr);

  const getEditUrl = (slug) => {
    return `/admin/courses/${courseName}/chapters/${chapterName}/topics/${slug}/edit`;
  };

  const getAddUrl = () => {
    return `/admin/courses/${courseName}/chapters/${chapterName}/topics/add`;
  };

  const columns = ["title", "status", "duration"];

  //TODO : deleteURl

  return (
    <Datatable
      data={topicsArr}
      columns={columns}
      getEditUrl={getEditUrl}
      getAddUrl={getAddUrl}
    />
  );
};

export default TopicsPage;
