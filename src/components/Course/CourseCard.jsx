import React from "react";
import styles from "./styles/courseCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";

import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";
import Image from "next/image";
import { generateSlug } from "@/lib/utils/slugUtil";

const CourseCard = ({ course }) => {
  return (
    <div className={styles.card}>
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
            to={`courses/${generateSlug(course.title)}-${
              course._id
            }/chapters`.toLowerCase()}
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
            text={"26 Chapters"}
            isHighlighted={true}
          />
        </div>
      </div>
      <div className={styles.card__durationWrapper}>
        <div className={styles.card__durationWrapper__innerDiv}>
          <HighLightBadge
            IconComponent={ClockIcon}
            text={"2 Months"}
            isHighlighted={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
