"use client";
import React from "react";
import styles from "./styles/editIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const EditIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4534 5.11594L18.9195 8.58209M3.89953 16.6698L2.74414 21.2913L7.36568 20.1359L20.752 6.74965C21.1852 6.31632 21.4285 5.72867 21.4285 5.11594C21.4285 4.5032 21.1852 3.91556 20.752 3.48222L20.5532 3.2835C20.1199 2.85029 19.5323 2.60693 18.9195 2.60693C18.3068 2.60693 17.7192 2.85029 17.2858 3.2835L3.89953 16.6698Z"
        stroke="#AB9EF6"
        strokeWidth="1.35407"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.8403 21.3936H22.2552"
        stroke="#AB9EF6"
        stroke-opacity="0.3"
        strokeWidth="1.3518"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EditIcon;
