import React from "react";
import styles from "./styles/chapterCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";
import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";
import { convertMinutesToHours } from "@/lib/utils/durationConvert";
import { generateSlug } from "@/lib/utils/slugUtil";
import TopicIcon from "../Common/Icons/TopicIcon";

const TopicsListItem = ({ topic, index }) => {
  const MIN_OPACITY = 0.2;
  const MAX_OPACITY = 1;
  const fadeFactor = 0.2; // The factor by which the opacity decreases per item

  // Calculate opacity based on the index
  const opacity = Math.max(MAX_OPACITY - index * fadeFactor, MIN_OPACITY);

  return (
    <div className={styles.topicItemWrapper}>
      <div
        className={styles.topicItemWrapper__bulletElement}
        style={{ opacity }}
      >
        <div className={styles.lineDiv}></div>
      </div>
      <div className={styles.topicItemWrapper__textDiv} style={{ opacity }}>
        <p>{topic.title}</p>
      </div>
    </div>
  );
};
const ChapterCard = ({ chapter, index, searchParams }) => {
  const { item: searchedItemId } = searchParams || undefined;
  return (
    <div
      className={`${styles.card} ${
        searchedItemId &&
        searchedItemId === chapter._id &&
        styles["card--searchedItem"]
      }`}
    >
      <div className={styles.card__chapterNumWrapper}>
        <div>
          <p>
            {index <= 9 ? " 0" + (index + 1) : index + 1}
            <span>.</span>
          </p>
        </div>
      </div>
      <div className={styles.card__bookmarkIconWrapper}></div>
      <div className={styles.card__titleWrapper}>
        <p>{chapter.title}</p>
      </div>
      <div className={styles.card__topicsListWrapper}>
        <div className={styles.listInnerWrapper}>
          {chapter && chapter.topics && chapter.topics.length > 0 ? (
            chapter.topics.map((topic, index) => (
              <TopicsListItem key={topic._id} topic={topic} index={index} />
            ))
          ) : (
            <TopicsListItem key={"0"} topic={{ title: "No Topics" }} />
          )}
        </div>
      </div>
      <div className={styles.card__topicsCountWrapper}>
        <HighLightBadge
          IconComponent={TopicIcon}
          text={`${chapter.topicsCount} Topics`}
          isHighlighted={true}
          type={"chapter"}
        />
      </div>
      <div className={styles.card__durationWrapper}>
        <HighLightBadge
          IconComponent={ClockIcon}
          text={convertMinutesToHours(chapter.duration)}
          isHighlighted={false}
          type={"chapter"}
        />
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}>
          <LinkButton
            to={`chapters/${chapter.slug}/${chapter._id}/topic/${chapter.topics[0].slug}/${chapter.topics[0]._id}`}
            linkProps={{
              chapterId: chapter._id,
              chapterName: chapter.title,
              topicId: chapter.topics[0]._id,
              topicName: chapter.topics[0].title,
              topicsCount: chapter.topicsCount,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
