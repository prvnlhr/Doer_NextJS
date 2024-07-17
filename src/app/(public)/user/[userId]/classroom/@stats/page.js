import Stats from "@/components/Classroom/Stats/Stats";
import { fetchUsersStats } from "@/lib/api/public/usersApi";
import React from "react";

const page = async ({ params }) => {
  const { userId } = params;
  const stats = await fetchUsersStats(userId);
  return <Stats />;
};

export default page;
