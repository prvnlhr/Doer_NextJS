"use client";
import React from "react";
import styles from "./styles/bookmarkCard.module.scss";
// import LinkButton from "../../Common/Button/LinkButton";
import HighLightBadge from "../../Common/CardElements/HighLightBadge";
import TopicIcon from "../../Common/Icons/TopicIcon";
import ChevronRightIcon from "../../Common/Icons/ChevronRightIcon";
import LinkButton from "@/components/Common/Buttons/LinkButton";
const BookmarkCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__breadCrumbsWrapper}>
        <p>React</p>
        <div className={styles.card__breadCrumbsWrapper__chevIconDiv}>
          <ChevronRightIcon />
        </div>
      </div>
      <div className={styles.card__titleWrapper}>
        <p>Virtual Dom and its significance</p>
      </div>
      <div className={styles.card__topicsCountWrapper}>
        <div className={styles.card__topicsCountWrapper__badgeContainer}>
          <HighLightBadge
            IconComponent={TopicIcon}
            text={"TOPICS"}
            isHighlighted={true}
          />
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.card__linkBtnWrapper__btnWrapper}>
          <LinkButton to="#" />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
