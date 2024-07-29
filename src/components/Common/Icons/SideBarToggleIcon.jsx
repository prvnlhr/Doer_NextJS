"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/sidebarToggleIcon.module.scss";
import { useTheme } from "@/context/ThemeContext";
const SideBarToggleIcon = () => {
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState(null);

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  const strokeColor = clientTheme === "dark" ? "white" : "black";

  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_616_444)">
        <path
          d="M23.0293 3.729L0.972982 3.729"
          stroke={strokeColor}
          strokeWidth="2.06778"
          strokeLinecap="round"
        />
        <path
          opacity="0.3"
          d="M23.0293 12L0.972982 12"
          stroke={strokeColor}
          strokeWidth="2.06778"
          strokeLinecap="round"
        />
        <path
          d="M23.0293 20.2712H0.972982"
          stroke={strokeColor}
          strokeWidth="2.06778"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_444">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SideBarToggleIcon;
