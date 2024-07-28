"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import styles from "./styles/breadCrumbs.module.scss";
import Link from "next/link";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import { generateSlug } from "@/lib/utils/slugUtil";

const BreadCrumbsBar = () => {
  const params = useParams();
  const pathname = usePathname();

  let { courseId, chapterId, topicId } = params || {
    courseId: "",
    chapterId: "",
    topicId: "",
  };

  const pathSegments = pathname
    .split("/")
    .filter((seg) =>
      ["add", "edit", "courses", "topics", "chapters"].includes(seg)
    );

  let links = {
    courses: `/admin/courses`,
    chapters: `/admin/courses/${courseId}/chapters`,
    topics: `/admin/courses/${courseId}/chapters/${chapterId}/topics`,
  };

  return (
    <div className={styles.breadCrumbsBar}>
      {pathSegments.map((segment, index) => (
        <div key={index} className={styles.breadcrumbWrapper}>
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
            <div
              className={styles.breadcrumbWrapper__iconWrapper__iconDiv}
              style={{ width: "15px", height: "15px" }}
            >
              <ChevronRightIcon color={"#8b98a5"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbsBar;
