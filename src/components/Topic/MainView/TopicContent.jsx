"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import styles from "./styles/topicContent.module.scss";
import ClockIcon from "@/components/Common/Icons/ClockIcon";
import BookmarkIconFilled from "@/components/Common/Icons/BookmarkIconFilled";
import { useSession } from "next-auth/react";
import DOMPurify from "dompurify";
import {
  toggleBookmark,
  updateCourseProgress,
  updateUsersTimeSpentData,
} from "@/lib/api/public/usersApi";
import { useInView } from "react-intersection-observer";
import { getLastMonday } from "@/lib/utils/dailyTimeSpentUtils";
import BookmarkIcon from "@/components/Common/Icons/BookmarkIcon";
import Spinner from "@/components/Common/Icons/Spinner";
import { useAppState } from "@/context/AppContext";

const TopicContent = ({ bookmarks, topic }) => {
  const { data: session } = useSession();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const {
    completedTopics,
    setCompletedTopics,
    setBookmarkedTopics,
    bookmarkedTopics,
  } = useAppState();

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const handleBookmarkBtnClicked = async () => {
    setIsBookmarking(true);
    const userId = session?.user?.userId;
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};

    const bookmarkData = {
      topicDuration: topic?.duration,
      ...currentState,
    };
    try {
      const res = await toggleBookmark(userId, bookmarkData);
      // console.log(res.message);
      if (res && res.message === "Bookmark added") {
        setBookmarkedTopics((prevBookmarks) => [
          ...prevBookmarks,
          bookmarkData,
        ]);
      } else if (res && res.message === "Bookmark removed") {
        setBookmarkedTopics((prevBookmarks) =>
          prevBookmarks.filter(
            (bookmark) => bookmark.topicId !== bookmarkData.topicId
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsBookmarking(false);
    }
  };

  const markTopicCompleted = async () => {
    const userId = session?.user?.userId;
    if (!userId) {
      // Exit early if userId is not available
      return;
    }
    const progressData = JSON.parse(localStorage.getItem("courseState"));
    if (completedTopics.includes(topic._id)) {
      return;
    }

    try {
      const response = await updateCourseProgress(userId, progressData);
      if (response && response.message === "Course progress updated") {
        setCompletedTopics((prevTopics) => [...prevTopics, topic._id]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const syncAndResetData = async () => {
    const localStorageData = JSON.parse(
      localStorage.getItem("dailyTimeSpent")
    ) || [0, 0, 0, 0, 0, 0, 0];
    try {
      await updateUsersTimeSpentData(userId, localStorageData);
      localStorage.setItem(
        "dailyTimeSpent",
        JSON.stringify([0, 0, 0, 0, 0, 0, 0])
      );
      localStorage.setItem("lastSyncDate", new Date().toISOString());
    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  };

  useEffect(() => {
    if (inView && !hasReachedEnd) {
      setHasReachedEnd(true);
      markTopicCompleted();
    }
  }, [inView, hasReachedEnd]);

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      if (block.dataset.highlighted) {
        delete block.dataset.highlighted;
      }
      hljs.highlightElement(block);
      block.dataset.highlighted = "yes";
    });
  }, [topic.content]);

  useEffect(() => {
    const startTime = new Date().getTime();

    return () => {
      const userId = session?.user?.userId;
      if (!userId) return;
      const endTime = new Date().getTime();
      const difference = endTime - startTime;
      const minDiff = difference / 60000;

      if (startTime) {
        const dayIndex = new Date().getDay();
        const adjustedCurrentDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

        // Check if data needs to be synced before updating localStorage
        const lastSyncDate = new Date(
          localStorage.getItem("lastSyncDate") || 0
        );
        const currentMonday = getLastMonday();
        if (currentMonday > lastSyncDate) {
          syncAndResetData(userId);
        }

        // Update localStorage
        const dailyTimeSpent = JSON.parse(
          localStorage.getItem("dailyTimeSpent")
        ) || [0, 0, 0, 0, 0, 0, 0];
        dailyTimeSpent[adjustedCurrentDayIndex] += minDiff;
        localStorage.setItem("dailyTimeSpent", JSON.stringify(dailyTimeSpent));

        let prevTotalTime =
          JSON.parse(localStorage.getItem("totalTimeSpent")) || 0;
        const updateTotalTime = Math.ceil(prevTotalTime + minDiff);

        localStorage.setItem("totalTimeSpent", JSON.stringify(updateTotalTime));
      }
    };
  }, []);

  useEffect(() => {
    setBookmarkedTopics(bookmarks);
  }, [bookmarks]);

  const isBookmarked = () => {
    return (
      bookmarkedTopics &&
      bookmarkedTopics.some((item) => item.topicId === topic._id)
    );
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topicHeaderWrapper}>
        <div className={styles.durationWrapper}>
          <div className={styles.durationIconDiv}>
            <ClockIcon />
          </div>
          <div className={styles.durationTextDiv}>
            <p>
              {topic.duration} <span>min read</span>
            </p>
          </div>
        </div>
        {session?.user && (
          <>
            <div className={styles.verticalLine}></div>
            <button
              type="button"
              className={styles.bookmarkBtn}
              onClick={handleBookmarkBtnClicked}
              disabled={isBookmarking}
            >
              <div className={styles.btnIconDiv}>
                {isBookmarking ? (
                  <Spinner color="#635DB0" />
                ) : isBookmarked() ? (
                  <BookmarkIconFilled />
                ) : (
                  <BookmarkIcon />
                )}
              </div>
              {!isBookmarking && (
                <div className={styles.btnTextDiv}>
                  <p>{isBookmarked() ? "Remove" : "Bookmark"}</p>
                </div>
              )}
            </button>
          </>
        )}
      </div>
      <div className={styles.topicContentWrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(topic.content),
          }}
        />
        <hr className={`${styles.endLine} `} ref={ref} />
      </div>
    </div>
  );
};

export default TopicContent;
