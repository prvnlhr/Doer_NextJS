"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/sidebar.module.scss";
import useSWR from "swr";

import Accordion from "./Accordion";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";
import { useAppState } from "@/context/AppContext";
import AccordionSkeleton from "@/components/Common/Skeletons/AccordionSkeleton";
import { fetchUsersCoursesProgressByCourseId } from "@/lib/api/public/usersApi";
import { useSession } from "next-auth/react";

const fetchChaptersFetcher = (courseId) => fetchChapters(courseId);

const fetchUsersCourseProgressFetcher = (userId, courseId) =>
  fetchUsersCoursesProgressByCourseId(userId, courseId);

const Sidebar = ({ params }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;

  const {
    data: chaptersData,
    error: chaptersError,
    isLoading: chaptersLoading,
  } = useSWR(params.courseId ? [params.courseId] : null, fetchChaptersFetcher);

  const {
    data: userCourseProgressData,
    error: userCourseProgressError,
    isLoading: userCourseProgressLoading,
  } = useSWR(
    userId && params.courseId ? [userId, params.courseId] : null,
    fetchUsersCourseProgressFetcher
  );

  const { showTopicSidebar, setShowTopicSidebar } = useAppState();
  const [topicIds, setTopicIds] = useState([]);

  const getAllTopicIds = (data) => {
    return data.reduce((acc, course) => {
      const chapterTopicIds = course.chapters.reduce((acc, chapter) => {
        const topicIds = chapter.topics.map((topic) => topic.topicId);
        return acc.concat(topicIds);
      }, []);
      return acc.concat(chapterTopicIds);
    }, []);
  };

  useEffect(() => {
    if (userCourseProgressData && userCourseProgressData.length > 0) {
      const topicIds = getAllTopicIds(userCourseProgressData);
      setTopicIds(topicIds);
    } else {
      setTopicIds([]);
    }
  }, [userCourseProgressData]);

  return (
    <div
      className={`${styles.sidebarWrapper} ${
        showTopicSidebar
          ? styles["sidebarWrapper--show"]
          : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}>
        <div
          className={styles.toggleIconDiv}
          onClick={() => setShowTopicSidebar((prev) => !prev)}
        >
          <SideBarToggleIcon />
        </div>
      </div>
      {chaptersLoading || userCourseProgressLoading ? (
        <AccordionSkeleton />
      ) : (
        <Accordion
          accordionListData={chaptersData}
          params={params}
          topicIds={topicIds}
        />
      )}
    </div>
  );
};

export default Sidebar;
