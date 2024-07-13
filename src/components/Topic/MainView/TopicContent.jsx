"use client";
import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
// import "highlight.js/styles/night-owl.css";
import styles from "./styles/topicContent.module.scss";
import ClockIcon from "@/components/Common/Icons/ClockIcon";
import BookmarkIconFilled from "@/components/Common/Icons/BookmarkIconFilled";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toggleBookmark } from "@/lib/api/public/usersApi";

const TopicContent = ({ topic }) => {
  const { data: session } = useSession();
  const params = useParams();

  const handleBookmarkBtnClicked = async () => {
    const userId = session?.user?.userId;
    const bookmarkData = {
      duration: topic?.duration,
      ...params,
    };
    try {
      const res = await toggleBookmark(userId, bookmarkData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Highlight the code blocks
    document.querySelectorAll("pre code").forEach((block) => {
      // Remove data-highlighted attribute if it exists
      if (block.dataset.highlighted) {
        delete block.dataset.highlighted;
      }
      hljs.highlightElement(block);
      block.dataset.highlighted = "yes";
    });
  }, [topic.content]);

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
      </div>
      <div className={styles.topicContentWrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: topic.content,
          }}
        />
      </div>
    </div>
  );
};

export default TopicContent;
