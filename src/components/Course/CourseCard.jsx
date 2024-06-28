import React from "react";
import styles from "./styles/courseCard.module.scss";
import LinkButton from "../Common/Buttons/LinkButton";
import HighLightBadge from "../Common/CardElements/HighLightBadge";

import ChapterIcon from "../Common/Icons/ChapterIcon";
import ClockIcon from "../Common/Icons/ClockIcon";
const CourseCard = ({ course }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__logoWrapper}>
        <div>
          <svg
            style={{ width: "100%" }}
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_62_132)">
              <path
                d="M0 20C0 8.95431 8.95431 0 20 0H66C77.0457 0 86 8.95431 86 20V66C86 77.0457 77.0457 86 66 86H20C8.95431 86 0 77.0457 0 66V20Z"
                fill="#F0DB4F"
              />
              <path
                d="M78.9613 65.4892C78.3318 61.5652 75.7731 58.2707 68.195 55.197C65.5626 53.9871 62.6278 53.1206 61.7531 51.1259C61.4425 49.965 61.4016 49.311 61.5978 48.608C62.1619 46.3272 64.8841 45.616 67.0423 46.27C68.432 46.7359 69.7482 47.8069 70.5412 49.5154C74.2526 47.1121 74.2444 47.1283 76.8358 45.4771C75.8875 44.0056 75.3807 43.327 74.7594 42.6976C72.5277 40.2043 69.4866 38.9208 64.6225 39.0189C63.7805 39.1252 62.9304 39.2395 62.0883 39.3459C59.6604 39.959 57.3469 41.2343 55.9898 42.9429C51.9187 47.5617 53.0796 55.6466 58.0336 58.9738C62.914 62.6362 70.0834 63.47 70.9989 66.8953C71.89 71.0891 67.9171 72.446 63.9685 71.9638C61.0583 71.3588 59.4397 69.8792 57.6902 67.1896C54.4694 69.0535 54.4694 69.0535 51.1585 70.9583C51.9433 72.675 52.7689 73.4516 54.0852 74.9394C60.3144 81.2586 75.9039 80.948 78.6998 71.3833C78.8142 71.0563 79.5663 68.8654 78.9613 65.4892ZM46.7522 39.5257H38.7081C38.7081 46.4743 38.6755 53.374 38.6755 60.3226C38.6755 64.7452 38.9044 68.8 38.185 70.0426C37.0078 72.4868 33.9585 72.1844 32.5688 71.7102C31.1545 71.0153 30.4352 70.0262 29.6013 68.6283C29.3724 68.2278 29.2007 67.9171 29.1434 67.8926C26.9608 69.2251 24.7862 70.5657 22.6035 71.8983C23.6909 74.13 25.2931 76.0675 27.345 77.3263C30.4105 79.1657 34.5307 79.7298 38.839 78.7406C41.643 77.9231 44.0626 76.231 45.3297 73.6559C47.1609 70.2797 46.7685 66.1922 46.7522 61.6715C46.7931 54.2977 46.7522 46.924 46.7522 39.5257Z"
                fill="#323330"
              />
            </g>
            <defs>
              <clipPath id="clip0_62_132">
                <rect width="86" height="86" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className={styles.card__linkBtnWrapper}>
        <div>
          <LinkButton to={`courses/${course.title}/chapters`.toLowerCase()} />
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
