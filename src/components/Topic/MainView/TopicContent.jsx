"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import styles from "./styles/topicContent.module.scss";
import ClockIcon from "@/components/Common/Icons/ClockIcon";
import BookmarkIconFilled from "@/components/Common/Icons/BookmarkIconFilled";
import { useSession } from "next-auth/react";
import DOMPurify from "isomorphic-dompurify";
import { useInView } from "react-intersection-observer";
import BookmarkIcon from "@/components/Common/Icons/BookmarkIcon";
import Spinner from "@/components/Common/Icons/Spinner";
import { useAppState } from "@/context/AppContext";
import parse from "html-react-parser";

import {
  toggleBookmark,
  updateCourseProgress,
  updateUserTimeSpendings,
} from "@/lib/api/public/usersApi";

const TopicContent = ({ bookmarks, topic }) => {
  const { data: session } = useSession();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [sanitizedHTML, setSanitizedHTML] = useState(null);

  const {
    completedTopics,
    setCompletedTopics,
    setBookmarkedTopics,
    bookmarkedTopics,
  } = useAppState();

  const [ref, inView] = useInView({ threshold: 0 });
  const userId = session?.user?.userId;

  const handleBookmarkBtnClicked = async () => {
    setIsBookmarking(true);
    const storedCourseState = localStorage.getItem("courseState");
    const currentState = storedCourseState ? JSON.parse(storedCourseState) : {};

    const bookmarkData = { topicDuration: topic?.duration, ...currentState };
    try {
      const res = await toggleBookmark(userId, bookmarkData);
      if (res) {
        setBookmarkedTopics((prevBookmarks) =>
          res.message === "Bookmark added"
            ? [...prevBookmarks, bookmarkData]
            : prevBookmarks.filter(
                (bookmark) => bookmark.topicId !== bookmarkData.topicId
              )
        );
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsBookmarking(false);
    }
  };

  const markTopicCompleted = async () => {
    console.log(completedTopics);
    if (!userId || completedTopics.includes(topic._id)) return;

    const progressData = JSON.parse(localStorage.getItem("courseState"));
    // console.log("progressData", progressData);
    try {
      // console.log("marking...");
      const response = await updateCourseProgress(userId, progressData);
      // console.log("response", response);
      if (response?.message === "Course progress updated") {
        setCompletedTopics((prevTopics) => [...prevTopics, topic._id]);
      }
    } catch (error) {
      console.error("Error updating course progress:", error);
    }
  };

  useEffect(() => {
    if (inView && !hasReachedEnd) {
      setHasReachedEnd(true);
      markTopicCompleted();
    }
  }, [inView, hasReachedEnd]);

  useEffect(() => {
    setBookmarkedTopics(bookmarks);
  }, [bookmarks]);

  const isBookmarked = () => {
    return bookmarkedTopics.some((item) => item.topicId === topic._id);
  };

  const sanitizeContentHelper = (content) => {
    return DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
  };

  useEffect(() => {
    const sanitizedContent = sanitizeContentHelper(topic.content);
    setSanitizedHTML(sanitizedContent);
  }, [topic.content]);

  useEffect(() => {
    if (sanitizedHTML) {
      document.querySelectorAll("pre code").forEach((block) => {
        if (block.dataset.highlighted) {
          delete block.dataset.highlighted;
        }
        hljs.highlightElement(block);
        block.dataset.highlighted = "yes";
      });
    }
  }, [sanitizedHTML]);

  useEffect(() => {
    const startTime = new Date().getTime();
    return async () => {
      if (!userId) return;
      const endTime = new Date().getTime();
      const diffMilliSeconds = endTime - startTime;
      const dayIndex = new Date().getDay();
      const adjustedCurrentDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      try {
        // console.log("updating...", adjustedCurrentDayIndex, diffMilliSeconds);
        const updateRes = await updateUserTimeSpendings(userId, {
          dayIndex: adjustedCurrentDayIndex,
          timeSpent: diffMilliSeconds,
        });
        // console.log("updateRes", updateRes);
      } catch (error) {
        console.error(
          "Error updating time spent data at Topic Content page:",
          error
        );
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
                  <Spinner color="#6167a0" />
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
        {sanitizedHTML ? parse(sanitizedHTML) : <p>Loading content...</p>}
        <hr className={styles.endLine} ref={ref} />
      </div>
    </div>
  );
};

export default TopicContent;
