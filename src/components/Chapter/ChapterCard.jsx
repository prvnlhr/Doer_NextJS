import React from "react";
import styles from "./styles/chapterCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";
import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";

const TopicsListItem = ({ topic }) => {
  return (
    <div className={styles.topicItemWrapper}>
      <div className={styles.topicItemWrapper__dotIndicatorDiv}>
        <div></div>
      </div>
      <p>{topic.title}</p>
    </div>
  );
};

const ChapterCard = ({ chapter }) => {
  let cp_name = chapter.title.replace(/ /g, "-").toLowerCase();
  let firstTopicName = chapter.topics[0].title.replace(/ /g, "-").toLowerCase();
  return (
    <div className={styles.card}>
      <div className={styles.card__chapterNumWrapper}>
        <p>CHAPTER 01</p>
      </div>
      <div className={styles.card__bookmarkIconWrapper}></div>
      <div className={styles.card__titleWrapper}>
        <p>{chapter.title}</p>
      </div>
      <div className={styles.card__topicsListWrapper}>
        <div className={styles.listInnerWrapper}>
          {chapter.topics.map((topic, index) => (
            <TopicsListItem key={index} topic={topic} />
          ))}
        </div>
      </div>
      <div className={styles.card__topicsCountWrapper}>
        <HighLightBadge
          IconComponent={ChapterIcon}
          text={"26 Chapters"}
          isHighlighted={true}
        />
      </div>
      <div className={styles.card__durationWrapper}>
        <HighLightBadge
          IconComponent={ClockIcon}
          text={"2 Months"}
          isHighlighted={false}
        />
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}>
          <LinkButton to={`chapters/${cp_name}/topic/${firstTopicName}`} />
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
