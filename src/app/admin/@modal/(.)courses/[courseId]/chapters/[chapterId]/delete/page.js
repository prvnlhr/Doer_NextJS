import DeleteModal from "@/components/Common/Modal/DeleteModal";
import { deleteChapter } from "@/lib/api/admin/chaptersApi";
import React from "react";

const page = async ({ params }) => {
  const chapterDeleteProps = {
    type: "chapter",
    params: params,

  };

  return <DeleteModal deleteProps={chapterDeleteProps} />;
};

export default page;
