import React from "react";
import styles from "./styles/editIcon.module.scss";
const EditIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.625 2.24989L6.75 3.37489M4.875 7.49989H7.875M1.875 5.99989L1.5 7.49989L3 7.12489L7.34475 2.78014C7.48535 2.63949 7.56434 2.44876 7.56434 2.24989C7.56434 2.05101 7.48535 1.86028 7.34475 1.71964L7.28025 1.65514C7.1396 1.51453 6.94887 1.43555 6.75 1.43555C6.55113 1.43555 6.3604 1.51453 6.21975 1.65514L1.875 5.99989Z"
        stroke="#2B3F6C"
        stroke-width="0.5625"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
