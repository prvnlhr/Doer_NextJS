import React from "react";
import styles from "./styles/deleteIcon.module.scss";
const DeleteIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_440_550)">
        <path
          d="M2.05135 2.25526V6.94801C2.0513 7.08202 2.07766 7.21473 2.12892 7.33855C2.18018 7.46237 2.25534 7.57487 2.3501 7.66963C2.44486 7.76439 2.55737 7.83955 2.68119 7.89081C2.80501 7.94207 2.93772 7.96843 3.07173 7.96838H5.92848C6.199 7.96838 6.45844 7.86092 6.64973 7.66963C6.84101 7.47834 6.94848 7.2189 6.94848 6.94838V2.25488M1.23535 2.25526H7.76485"
          stroke="#2B3F6C"
          strokeWidth="0.5625"
          strokeLinejoin="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.27588 2.25563V1.64325C3.27588 1.56285 3.29172 1.48324 3.3225 1.40896C3.35328 1.33469 3.39839 1.2672 3.45526 1.21037C3.51213 1.15353 3.57964 1.10846 3.65394 1.07773C3.72823 1.04699 3.80785 1.0312 3.88825 1.03125H5.11225C5.19265 1.0312 5.27228 1.04699 5.34657 1.07773C5.42087 1.10846 5.48838 1.15353 5.54525 1.21037C5.60212 1.2672 5.64723 1.33469 5.67801 1.40896C5.70879 1.48324 5.72463 1.56285 5.72463 1.64325V2.25563M3.68425 6.372V4.33238M5.31663 6.372V4.33238"
          stroke="#2B3F6C"
          strokeWidth="0.5625"
          strokeLinejoin="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_440_550">
          <rect width="9" height="9" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteIcon;
