import React from "react";
import ClassRoomLayout from "@/components/Classroom/ClassRoomLayout";
const ClassRoomLayoutPage = ({ children, params }) => {
  return <ClassRoomLayout params={params}>{children}</ClassRoomLayout>;
};

export default ClassRoomLayoutPage;
