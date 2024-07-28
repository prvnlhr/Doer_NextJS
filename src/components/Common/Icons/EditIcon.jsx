"use client";
import React from "react";
import styles from "./styles/editIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const EditIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      // width="10"
      // height="9"
      className={styles.icon}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9585 3.37489L7.55325 2.78014C7.69385 2.63949 7.77284 2.44876 7.77284 2.24989C7.77284 2.05101 7.69385 1.86028 7.55325 1.71964L7.48875 1.65514C7.3481 1.51453 7.15737 1.43555 6.9585 1.43555C6.75962 1.43555 6.56889 1.51453 6.42825 1.65514L5.8335 2.24989L6.9585 3.37489Z"
        fill="#D9D9D9"
      />
      <path
        d="M2.0835 5.99989L1.7085 7.49989L3.2085 7.12489L6.9585 3.37489L5.8335 2.24989L2.0835 5.99989Z"
        fill={theme === "dark" ? "#c7bafd" : "#635db0"}
      />
      <path
        d="M2.0835 5.99989L1.81833 5.73472C1.77027 5.78278 1.73618 5.843 1.71969 5.90894L2.0835 5.99989ZM1.7085 7.49989L1.34469 7.40894C1.31274 7.53673 1.35019 7.67191 1.44333 7.76505C1.53647 7.85819 1.67166 7.89564 1.79945 7.86369L1.7085 7.49989ZM3.2085 7.12489L3.29945 7.48869C3.36538 7.47221 3.4256 7.43811 3.47366 7.39005L3.2085 7.12489ZM7.55325 2.78014L7.81841 3.0453L7.81845 3.04526L7.55325 2.78014ZM7.55325 1.71964L7.81845 1.45451L7.81841 1.45447L7.55325 1.71964ZM7.48875 1.65514L7.75391 1.38997L7.75387 1.38993L7.48875 1.65514ZM6.42825 1.65514L6.16312 1.38993L6.16308 1.38997L6.42825 1.65514ZM5.8335 2.24989L5.56833 1.98472L5.56833 1.98472L5.8335 2.24989ZM5.0835 7.12489C4.87639 7.12489 4.7085 7.29278 4.7085 7.49989C4.7085 7.70699 4.87639 7.87489 5.0835 7.87489V7.12489ZM8.0835 7.87489C8.2906 7.87489 8.4585 7.70699 8.4585 7.49989C8.4585 7.29278 8.2906 7.12489 8.0835 7.12489V7.87489ZM1.71969 5.90894L1.34469 7.40894L2.0723 7.59084L2.4473 6.09084L1.71969 5.90894ZM1.79945 7.86369L3.29945 7.48869L3.11755 6.76108L1.61755 7.13608L1.79945 7.86369ZM3.47366 7.39005L7.81841 3.0453L7.28808 2.51497L2.94333 6.85972L3.47366 7.39005ZM7.81845 3.04526C8.02936 2.83429 8.14784 2.5482 8.14784 2.24989H7.39784C7.39784 2.34932 7.35834 2.44469 7.28804 2.51501L7.81845 3.04526ZM8.14784 2.24989C8.14784 1.95158 8.02936 1.66548 7.81845 1.45451L7.28804 1.98476C7.35834 2.05508 7.39784 2.15045 7.39784 2.24989H8.14784ZM7.81841 1.45447L7.75391 1.38997L7.22358 1.9203L7.28808 1.9848L7.81841 1.45447ZM7.75387 1.38993C7.5429 1.17903 7.25681 1.06055 6.9585 1.06055L6.9585 1.81055C7.05793 1.81055 7.1533 1.85004 7.22362 1.92034L7.75387 1.38993ZM6.9585 1.06055C6.66019 1.06055 6.37409 1.17903 6.16312 1.38993L6.69337 1.92034C6.76369 1.85004 6.85906 1.81055 6.9585 1.81055V1.06055ZM6.16308 1.38997L1.81833 5.73472L2.34866 6.26505L6.69341 1.9203L6.16308 1.38997ZM3.47366 7.39005L7.22366 3.64005L6.69333 3.10972L2.94333 6.85972L3.47366 7.39005ZM7.22366 3.10972L6.09866 1.98472L5.56833 2.51505L6.69333 3.64005L7.22366 3.10972ZM5.56833 1.98472L1.81833 5.73472L2.34866 6.26505L6.09866 2.51505L5.56833 1.98472ZM5.0835 7.87489H8.0835V7.12489H5.0835V7.87489ZM7.22366 3.64005L7.81841 3.0453L7.28808 2.51497L6.69333 3.10972L7.22366 3.64005ZM6.16308 1.38997L5.56833 1.98472L6.09866 2.51505L6.69341 1.9203L6.16308 1.38997Z"
        fill={theme === "dark" ? "#c7bafd" : "#635db0"}
      />
    </svg>
  );
};

export default EditIcon;
