import TopicContent from "@/components/Topic/MainView/TopicContent";
import { fetchTopicById } from "@/lib/api/public/topicsApi";
import {
  fetchUsersBookmarkById,
  fetchUsersBookmarks,
} from "@/lib/api/public/usersApi";
import React from "react";
import { auth } from "../../../../../../../../../../../../auth";
import TopicPageSkeleton from "@/components/Common/Skeletons/TopicPageSkeleton";

const Page = async ({ params }) => {
  const topic = await fetchTopicById(params);
  const session = await auth();
  const userId = session?.user?.userId;
  const bookmark = await fetchUsersBookmarkById(userId, topic._id);
  const bookmarks = await fetchUsersBookmarks(userId);
  return <TopicContent bookmarks={bookmarks} topic={topic} />;
  // return <TopicPageSkeleton />;
};

export default Page;
