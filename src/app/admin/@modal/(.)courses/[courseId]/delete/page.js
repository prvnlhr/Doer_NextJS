import DeleteModal from "@/components/Common/Modal/DeleteModal";

import React from "react";

const page = ({ params }) => {
  const courseDeleteProps = {
    type: "course",
    params: params,
  };

  return <DeleteModal deleteProps={courseDeleteProps} />;
};

export default page;
