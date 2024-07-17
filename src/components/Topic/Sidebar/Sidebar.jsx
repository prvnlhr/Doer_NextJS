"use client";
import React from "react";
import styles from "./styles/sidebar.module.scss";
import useSWR from "swr";

import Accordion from "./Accordion";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";
import { useAppState } from "@/context/AppContext";
import AccordionSkeleton from "@/components/Common/Skeletons/AccordionSkeleton";

const fetcher = (courseId) => fetchChapters(courseId);

const Sidebar = ({ params }) => {
  const { data, error, isLoading } = useSWR([params.courseId], fetcher);
  const { showTopicSidebar, setShowTopicSidebar } = useAppState();

  return (
    <div
      className={`${styles.sidebarWrapper} ${
        showTopicSidebar
          ? styles["sidebarWrapper--show"]
          : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}>
        <div
          className={styles.toggleIconDiv}
          onClick={() => setShowTopicSidebar((prev) => !prev)}
        >
          <SideBarToggleIcon />
        </div>
      </div>
      {isLoading ? (
        <AccordionSkeleton />
      ) : (
        <Accordion accordionListData={data} params={params} />
      )}
    </div>
  );
};

export default Sidebar;
