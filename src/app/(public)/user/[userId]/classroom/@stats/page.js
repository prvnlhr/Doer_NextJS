import Stats from "@/components/Classroom/Stats/Stats";
import { fetchUsersStatsData } from "@/lib/api/public/usersApi";
import React from "react";

const page = async ({ params }) => {
  const { userId } = params;
  const stats = await fetchUsersStatsData(userId);
  console.log("stats", stats);
  return <Stats stats={stats} />;
};

export default page;
