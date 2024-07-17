"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import styles from "./styles/topicContent.module.scss";
import ClockIcon from "@/components/Common/Icons/ClockIcon";
import BookmarkIconFilled from "@/components/Common/Icons/BookmarkIconFilled";
import { useSession } from "next-auth/react";

import {
  toggleBookmark,
  updateCourseProgress,
} from "@/lib/api/public/usersApi";
import { useInView } from "react-intersection-observer";
import { getLastMonday } from "@/lib/utils/dailyTimeSpentUtils";
import BookmarkIcon from "@/components/Common/Icons/BookmarkIcon";
import Spinner from "@/components/Common/Icons/Spinner";

const TopicContent = ({ bookmark, topic }) => {
  const { data: session } = useSession();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

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
    } catch (error) {
      console.log(error);
    } finally {
      setIsBookmarking(false);
    }
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      if (block.dataset.highlighted) {
        delete block.dataset.highlighted;
      }
      hljs.highlightElement(block);
      block.dataset.highlighted = "yes";
    });
  }, [topic.content]);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const markTopicCompleted = async () => {
    const userId = session?.user?.userId;
    const progressData = JSON.parse(localStorage.getItem("courseState"));
    try {
      const response = await updateCourseProgress(userId, progressData);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inView && !hasReachedEnd) {
      setHasReachedEnd(true);
      markTopicCompleted();
    }
  }, [inView, hasReachedEnd]);

  const syncAndResetData = async () => {
    const localStorageData = JSON.parse(
      localStorage.getItem("dailyTimeSpent")
    ) || [0, 0, 0, 0, 0, 0, 0];
    try {
      await updateUserStats(userId, localStorageData);
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
    const startTime = new Date().getTime();

    return () => {
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
                ) : bookmark.bookmarkId ? (
                  <BookmarkIconFilled />
                ) : (
                  <BookmarkIcon />
                )}
              </div>
              {!isBookmarking && (
                <div className={styles.btnTextDiv}>
                  <p>{bookmark.bookmarkId ? "Remove" : "Bookmark"}</p>
                </div>
              )}
            </button>
          </>
        )}
      </div>
      <div className={styles.topicContentWrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: topic.content,
          }}
        />
        <hr className={`${styles.endLine} `} ref={ref} />
      </div>
    </div>
  );
};

export default TopicContent;
