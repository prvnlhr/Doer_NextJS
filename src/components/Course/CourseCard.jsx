"use client";
import React from "react";
import styles from "./styles/courseCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";

import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";
import Image from "next/image";
import { generateSlug } from "@/lib/utils/slugUtil";
import { convertMinutesToHours } from "@/lib/utils/durationConvert";
import { useSearchParams } from "next/navigation";

const CourseCard = ({ course }) => {
  const searchParams = useSearchParams();
  const { item: searchedItemId } = searchParams || undefined;

  return (
    <div
      className={`${styles.card} ${
        searchedItemId &&
        searchedItemId === course._id &&
        styles["card--searchedItem"]
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
            text={`${course.chaptersCount} Chapters`}
            isHighlighted={true}
          />
        </div>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__innerDiv}>
          <HighLightBadge
            IconComponent={ClockIcon}
            text={convertMinutesToHours(course.duration)}
            isHighlighted={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
