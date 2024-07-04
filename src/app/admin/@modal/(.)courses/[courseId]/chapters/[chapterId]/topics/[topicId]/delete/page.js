import DeleteModal from "@/components/Common/Modal/DeleteModal";
import { deleteTopic } from "@/lib/api/admin/topicsApi";
import React from "react";

const page = ({ params }) => {
  const topicDeleteProps = {
    type: "topic",
    params: params,
  };

  return <DeleteModal deleteProps={topicDeleteProps} />;
};

export default page;