"use client";
import React from "react";
import styles from "./styles/mainView.module.scss";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";

const MainView = ({ children, params }) => {
  const { showTopicSidebar, setShowTopicSidebar, courseState } = useAppState();

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
                <ChevronRightIcon color={"#667085"} />
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
                <ChevronRightIcon color={"#667085"} />
              </div>
            </div>
          </div>

          {/* BreadCrumb 3 */}
          <div className={styles.breadCrumbsContainer}>
            <Link
              href={`/content/courses/${params.courseName}/${params.courseId}/chapters`}
              className={styles.link}
            >
              <p className={styles.topicNameText}>
                {courseState.topicName}
              </p>
            </Link>
            <div className={styles.chevIconContainer}>
              <div className={styles.chevIconDiv}>
                <ChevronRightIcon color={"#8b98a5"} />
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
