import TopicContent from "@/components/Topic/MainView/TopicContent";
import { fetchTopicById } from "@/lib/api/public/topicsApi";
import { fetchUsersBookmarks } from "@/lib/api/public/usersApi";
import React from "react";
import { auth } from "../../../../../../../../../../../../auth";

const Page = async ({ params }) => {
  const topic = await fetchTopicById(params);
  // console.log("topic1", topic);
  const session = await auth();
  // console.log("session", session);
  const userId = session?.user?.userId;
  // console.log("userId", userId);
  let bookmarks = [];
  if (userId) {
    bookmarks = await fetchUsersBookmarks(userId);
  }
  return <TopicContent bookmarks={bookmarks} topic={topic} />;
};

export default Page;
