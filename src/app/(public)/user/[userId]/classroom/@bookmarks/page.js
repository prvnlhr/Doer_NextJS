import BookmarksList from "@/components/Classroom/Bookmarks/BookmarksList";
import { fetchUsersBookmarks } from "@/lib/api/public/usersApi";
import React from "react";

const page = async ({ params }) => {
  const { userId } = params;
  const bookmarks = await fetchUsersBookmarks(userId);
  return <BookmarksList bookmarks={bookmarks} />;
};

export default page;
