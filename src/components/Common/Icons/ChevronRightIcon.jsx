import React from "react";
import styles from "./styles/chevronIcon.module.scss";

const ChevronRightIcon = ({ color }) => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.23438 6.89062L5.76562 4.5L3.23438 2.10938"
        stroke={color ? color : "black"}
        strokeWidth="0.84375"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;
