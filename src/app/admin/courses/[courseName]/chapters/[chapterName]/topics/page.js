import React from "react";
import topics from "../../../../../../../components/topicsData";
import Datatable from "@/components/Admin/Datatable/Datatable";

const TopicsPage = ({ params }) => {
  // const params = useParams();
  const { courseName, chapterName } = params;
  console.log("🚀 ~ file: page.js:8 ~ TopicsPage ~ courseName:", courseName);
  console.log("🚀 ~ file: page.js:8 ~ TopicsPage ~ chapterName:", chapterName);

  // console.table(topics);
  const topicsArr = topics.filter(
    (topics) => topics.chapterNameSlug === chapterName
  );

  const getEditUrl = (topicNameSlug, topicId) => {
    return `/admin/courses/${courseName}/chapters/${chapterName}/topics/${topicNameSlug}/edit/${topicId}`;
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
