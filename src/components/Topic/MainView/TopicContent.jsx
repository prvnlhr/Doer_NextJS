"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import styles from "./styles/topicContent.module.scss";
import ClockIcon from "@/components/Common/Icons/ClockIcon";
import BookmarkIconFilled from "@/components/Common/Icons/BookmarkIconFilled";
import { useSession } from "next-auth/react";
import { toggleBookmark } from "@/lib/api/public/usersApi";
import { useInView } from "react-intersection-observer";

const TopicContent = ({ topic }) => {
  const { data: session } = useSession();
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const handleBookmarkBtnClicked = async () => {
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
    rootMargin: "0px 0px 0px 0px",
  });

  useEffect(() => {
    if (inView && !hasReachedEnd) {
      console.log("Reached Page End");
      setHasReachedEnd(true);
    }
  }, [inView, hasReachedEnd]);

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
            >
              <div className={styles.btnIconDiv}>
                <BookmarkIconFilled />
              </div>
              <div className={styles.btnTextDiv}>
                <p>Add to Bookmarks</p>
              </div>
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
