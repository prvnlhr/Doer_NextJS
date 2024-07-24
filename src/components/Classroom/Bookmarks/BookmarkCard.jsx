"use client";
import React from "react";
import styles from "./styles/bookmarkCard.module.scss";
import HighLightBadge from "../../Common/CardElements/HighLightBadge";
import ChevronRightIcon from "../../Common/Icons/ChevronRightIcon";
import LinkButton from "@/components/Common/Buttons/LinkButton";
import { generateSlug } from "@/lib/utils/slugUtil";
import ClockIcon from "@/components/Common/Icons/ClockIcon";

const BookmarkCard = ({ bookmark }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__breadCrumbsWrapper}>
        <p>{bookmark.courseName}</p>
        <div className={styles.card__breadCrumbsWrapper__chevIconDiv}>
          <ChevronRightIcon />
        </div>
      </div>
      <div className={styles.card__titleWrapper}>
        <p>{bookmark.topicName}</p>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__badgeContainer}>
          <HighLightBadge
            IconComponent={ClockIcon}
            text={`Duration ${bookmark.topicDuration} Min`}
            isHighlighted={true}
            type={"bookmark"}
          />
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.card__linkBtnWrapper__btnWrapper}>
          <LinkButton
            to={`/content/courses/${generateSlug(bookmark.courseName)}/${
              bookmark.courseId
            }/chapters/${generateSlug(bookmark.chapterName)}/${
              bookmark.chapterId
            }/topic/${generateSlug(bookmark.topicName)}/${bookmark.topicId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
