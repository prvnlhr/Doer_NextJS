"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

const BookmarkIcon = () => {
  const { theme } = useTheme();
  return (
    <svg
      style={{ width: "100%", aspectRatio: "1/1" }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
      />
      <path
        opacity="0.3"
        d="M9 8.5H15"
        stroke={theme === "dark" ? "#a399f2" : "#6167a0"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkIcon;
