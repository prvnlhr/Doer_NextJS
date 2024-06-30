import React from "react";
import styles from "./styles/chapterIcon.module.scss";
const ChapterIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6C3 3.79086 4.79086 2 7 2H11H13.0632C13.6568 2 14.2197 2.26365 14.5997 2.71963L18.5364 7.44373C18.836 7.80316 19 8.25623 19 8.7241V12V18C19 20.2091 17.2091 22 15 22H7C4.79086 22 3 20.2091 3 18V6Z"
        stroke="#2B3F6C"
        strokeWidth="1.5"
      />
      <path
        d="M14 2.5V6C14 7.10457 14.8954 8 16 8H18.5"
        stroke="#2B3F6C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M6.99988 12H14.9999"
        stroke="#2B3F6C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M6.99988 17H10.9999"
        stroke="#2B3F6C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChapterIcon;
