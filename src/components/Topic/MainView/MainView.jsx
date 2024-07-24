"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/mainView.module.scss";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { useSession } from "next-auth/react";

const MainView = ({ children, params }) => {
  const { showTopicSidebar, setShowTopicSidebar, courseState } = useAppState();
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = JSON.parse(localStorage?.getItem("courseState"));
      setTopicName(storedState?.topicName || "");
    }
  }, []);

  return (
    <div
      className={`${styles.mainViewWrapper} ${
        showTopicSidebar
          ? styles["mainViewWrapper--show"]
          : styles["mainViewWrapper--hide"]
      }`}
    >
      <div className={styles.mainViewWrapper__breadcrumbsWrapper}>
        <div className={styles.toggleIconContainer}>
          <div
            className={styles.toggleIconDiv}
            onClick={() => setShowTopicSidebar((prev) => !prev)}
          >
            <SideBarToggleIcon />
          </div>
        </div>
        <div className={styles.breadcrumbsGroup}>
          {/* BreadCrumb 1 */}
          <div className={styles.breadCrumbsContainer}>
            <Link href={`/content/courses`} className={styles.link}>
              <p>Course</p>
            </Link>
            <div className={styles.chevIconContainer}>
              <div className={styles.chevIconDiv}>
                <ChevronRightIcon color={"#3D4754"} />
              </div>
            </div>
          </div>

          {/* BreadCrumb 2 */}
          <div className={styles.breadCrumbsContainer}>
            <Link
              href={`/content/courses/${params.courseName}/${params.courseId}/chapters`}
              className={styles.link}
            >
              <p>Chapters</p>
            </Link>
            <div className={styles.chevIconContainer}>
              <div className={styles.chevIconDiv}>
                <ChevronRightIcon color={"#3D4754"} />
              </div>
            </div>
          </div>

          {/* BreadCrumb 3 */}
          <div className={styles.breadCrumbsContainer}>
            <Link
              href={`/content/courses/${params.courseName}/${params.courseId}/chapters`}
              className={styles.link}
            >
              <p style={{ color: "#635db0", fontWeight: 500 }}>{topicName}</p>
            </Link>
            <div className={styles.chevIconContainer}>
              <div className={styles.chevIconDiv}>
                <ChevronRightIcon color={"#3D4754"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainViewWrapper__contentWrapper}>{children}</div>
    </div>
  );
};

export default MainView;
