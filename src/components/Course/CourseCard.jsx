import React from "react";
import styles from "./styles/courseCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";

import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";
import Image from "next/image";
import { generateSlug } from "@/lib/utils/slugUtil";
import { convertMinutesToHours } from "@/lib/utils/durationConvert";

const CourseCard = ({ course, searchParams }) => {
  const { item: searchedItemId } = searchParams || {};
  const time = convertMinutesToHours(course.duration);
  return (
    <div
      className={`
      ${styles.card} 
      ${
        searchedItemId &&
        searchedItemId === course._id &&
        styles["card--searchedItem"]
      }    
      ${
        searchedItemId && searchedItemId !== course._id
          ? styles["card--blur"]
          : ""
      }`}
    >
      <div className={styles.card__logoWrapper}>
        <div>
          <Image
            src={course.logoUrl}
            alt={course.title}
            fill={true}
            quality={50}
          />
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div className={styles.buttonWrapper}>
          <LinkButton
            to={`courses/${course.slug}/${course._id}/chapters`}
            linkProps={{
              courseId: course._id,
              courseName: course.title,
              chaptersCount: course.chaptersCount,
            }}
          />
        </div>
      </div>
      <div className={styles.card__titleWrapper}>
        <p>{course.title}</p>
      </div>
      <div className={styles.card__descWrapper}>
        <p>{course.description}</p>
      </div>
      <div className={styles.card__chapterWrapper}>
        <div className={styles.card__chapterWrapper__innerDiv}>
          <HighLightBadge
            IconComponent={ChapterIcon}
            text={`${course.chaptersCount > 1 ? "Chapters" : "Chapter"}`}
            spanText={course.chaptersCount}
            isHighlighted={true}
            type={"course"}
          />
        </div>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__innerDiv}>
          <HighLightBadge
            IconComponent={ClockIcon}
            text={time.unit}
            spanText={time.number}
            isHighlighted={false}
            type={"course"}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
