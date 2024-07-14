import React from "react";
import ClassRoomLayout from "@/components/Classroom/ClassRoomLayout";
const page = ({ params, children }) => {
  return <ClassRoomLayout params={params}>{children}</ClassRoomLayout>;
};

export default page;
