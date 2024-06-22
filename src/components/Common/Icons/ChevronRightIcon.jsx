import React from "react";
import styles from "./styles/chevronIcon.module.scss";
const ChevronRightIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.91162 19.9201L15.4316 13.4001C16.2016 12.6301 16.2016 11.3701 15.4316 10.6001L8.91162 4.08008"
        stroke="#3D4754"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;
