import React from "react";
import styles from "./styles/inProgressCard.module.scss";
import LinkButton from "@/components/Common/Buttons/LinkButton";
import { generateSlug } from "@/lib/utils/slugUtil";
import HighLightBadge from "@/components/Common/CardElements/HighLightBadge";

const InProgressCard = ({ courseProgress }) => {
  const { courseName, courseId, totalChapters, chapters } = courseProgress;

  const { chapterName, chapterId, topics } = chapters[0] || {};
  const { topicName, topicId } = topics[0] || {};

  const percentOfCourseCompleted = (chapters.length / totalChapters) * 100;

  const integerPart = Math.floor(percentOfCourseCompleted);
  const fractionalPart = percentOfCourseCompleted - integerPart;
  const fractionalCeil = fractionalPart ? Math.ceil(fractionalPart * 100) : 0;

  return (
    <div className={styles.card} key={courseProgress._id}>
      <div className={styles.card__typeWrapper}>
        <HighLightBadge
          text={"COURSE"}
          isHighlighted={true}
          type={"inprogress"}
        />
      </div>
      <div className={styles.card__titleWrapper}>
        <p>{courseName}</p>
      </div>
      <div className={styles.card__progressBarWrapper}>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarTrack__progressBar}
            style={{ width: `${percentOfCourseCompleted}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.card__progressPercWrapper}>
        <div className={styles.valueWrapper}>
          <p>
            {integerPart}
            <span>{fractionalCeil ? `.${fractionalCeil}` : ""}%</span>
          </p>
        </div>
        <div className={styles.lableWrapper}>
          <p>PROGRESS</p>
        </div>
      </div>
      <div className={styles.card__completedWrapper}>
        <div className={styles.valueWrapper}>
          <p>
            {chapters.length}
            <span>/{totalChapters}</span>
          </p>
        </div>
        <div className={styles.lableWrapper}>
          <p>CHAPTERS COMPLETED</p>
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.btnContainer}>
          <LinkButton
            to={`/content/courses/${generateSlug(
              courseName
            )}/${courseId}/chapters/${generateSlug(
              chapterName
            )}/${chapterId}/topic/${generateSlug(topicName)}/${topicId}`}
            linkProps={{
              chapterId,
              chapterName,
              topicId,
              topicName,
              topicsCount: topics.length,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InProgressCard;
