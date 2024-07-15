import InProgressList from "@/components/Classroom/InProgress/InProgressList";
import { fetchUsersCoursesProgress } from "@/lib/api/public/usersApi";
import React from "react";

const InProgressPage = async ({ params }) => {
  const { userId } = params;
  const inprogressCourses = await fetchUsersCoursesProgress(userId);
  return <InProgressList inprogressCourses={inprogressCourses} />;
};

export default InProgressPage;
