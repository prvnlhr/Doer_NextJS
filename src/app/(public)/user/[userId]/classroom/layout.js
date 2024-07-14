import ClassRoomLayout from "@/components/Classroom/ClassRoomLayout";
import React from "react";

const layout = ({ children, params }) => {
  return <ClassRoomLayout params={params}>{children}</ClassRoomLayout>;
};

export default layout;
