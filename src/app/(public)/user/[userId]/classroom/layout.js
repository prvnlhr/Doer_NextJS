import ClassRoomLayout from "@/components/Classroom/ClassRoomLayout";
import React from "react";

const layout = ({ params, stats, inprogress, children, bookmarks }) => {
  return (
    <ClassRoomLayout
      params={params}
      inprogress={inprogress}
      bookmarks={bookmarks}
      stats={stats}
    >
      {children}
    </ClassRoomLayout>
  );
};

export default layout;
