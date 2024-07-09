import React from "react";
import styles from "./styles/mainView.module.scss";
import TopicContent from "./TopicContent";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import Link from "next/link";
import { useParams } from "next/navigation";
import { reverseSlug } from "@/lib/utils/slugUtil";
const MainView = ({ children, show, setShow }) => {
  const params = useParams();
  return (
    <div
      className={`${styles.mainViewWrapper} ${
        show ? styles["mainViewWrapper--show"] : styles["mainViewWrapper--hide"]
      }`}
    >
      <div className={styles.mainViewWrapper__breadcrumbsWrapper}>
        <div
          className={styles.toggleIconDiv}
          onClick={() => setShow((prev) => !prev)}
        >
          <SideBarToggleIcon />
        </div>
        <div className={styles.breadcrumbsGroup}>
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

          <div className={styles.breadCrumbsContainer}>
            <Link
              href={`/content/courses/${params.courseName}/${params.courseId}/chapters`}
              className={styles.link}
            >
              <p style={{ color: "#635db0", fontWeight: 500 }}>
                {reverseSlug(params.topicName)}
              </p>
            </Link>
            <div className={styles.chevIconContainer}>
              <div className={styles.chevIconDiv}>
                <ChevronRightIcon color={"#3D4754"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainViewWrapper__contentWrapper}>
        <TopicContent>{children}</TopicContent>
      </div>
    </div>
  );
};

export default MainView;
