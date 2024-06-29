import React from "react";
import { useParams, usePathname } from "next/navigation";
import styles from "./styles/breadCrumbs.module.scss";
import Link from "next/link";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import { generateSlug } from "@/lib/utils/slugUtil";
const BreadCrumbsBar = () => {
  const params = useParams();
  const pathname = usePathname();

  let { courseName, chapterName, topicName } = params || {
    courseName: "",
    chapterName: "",
    topicName: "",
  };

  const normalizedCourseName = generateSlug(courseName);
  const normalizedChapterName = generateSlug(chapterName);
  const normalizedTopicName = generateSlug(topicName);

  const pathSegments = pathname
    .split("/")
    .filter(
      (seg) => !["admin", courseName, chapterName, topicName, ""].includes(seg)
    );

  let links = {
    courses: `/admin/courses`,
    chapters: `/admin/courses/${normalizedCourseName}/chapters`,
    topics: `/admin/courses/${normalizedCourseName}/chapters/${normalizedChapterName}/topics`,
  };

  return (
    <div className={styles.breadCrumbsBar}>
      {pathSegments.map((segment, index) => (
        <div className={styles.breadcrumbWrapper}>
          <Link
            className={styles.breadcrumbWrapper__link}
            href={links[segment] || "#"}
          >
            <p
              className={`${styles["breadcrumbWrapper__link--normalText"]} ${
                index === pathSegments.length - 1 &&
                styles["breadcrumbWrapper__link--currentText"]
              }`}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </p>
          </Link>
          <div className={styles.breadcrumbWrapper__iconWrapper}>
            <div className={styles.breadcrumbWrapper__iconWrapper__iconDiv}>
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbsBar;
