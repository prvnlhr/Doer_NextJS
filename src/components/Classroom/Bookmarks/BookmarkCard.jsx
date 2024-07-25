"use client";
import React from "react";
import styles from "./styles/bookmarkCard.module.scss";
import HighLightBadge from "../../Common/CardElements/HighLightBadge";
import ChevronRightIcon from "../../Common/Icons/ChevronRightIcon";
import LinkButton from "@/components/Common/Buttons/LinkButton";
import { generateSlug } from "@/lib/utils/slugUtil";
import ClockIcon from "@/components/Common/Icons/ClockIcon";

const BookmarkCard = ({ bookmark }) => {
  const {
    courseId,
    courseName,
    chapterId,
    chapterName,
    topicName,
    topicId,
    topicDuration,
    topicsCount,
  } = bookmark;

  return (
    <div className={styles.card}>
      <div className={styles.card__breadCrumbsWrapper}>
        <p>{courseName}</p>
        <div className={styles.card__breadCrumbsWrapper__chevIconDiv}>
          <ChevronRightIcon />
        </div>
      </div>
      <div className={styles.card__titleWrapper}>
        <p>{topicName}</p>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__badgeContainer}>
          <HighLightBadge
            IconComponent={ClockIcon}
            text={`Duration ${topicDuration} Min`}
            isHighlighted={true}
            type={"bookmark"}
          />
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.card__linkBtnWrapper__btnWrapper}>
          <LinkButton
            to={`/content/courses/${generateSlug(
              courseName
            )}/${courseId}/chapters/${generateSlug(
              chapterName
            )}/${chapterId}/topic/${generateSlug(topicName)}/${topicId}`}
            linkProps={{
              courseId,
              courseName,
              chapterId,
              chapterName,
              topicName,
              topicId,
              topicsCount,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
