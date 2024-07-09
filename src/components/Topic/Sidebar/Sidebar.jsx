import React from "react";
import styles from "./styles/sidebar.module.scss";
import useSWR from "swr";

import Accordion from "./Accordion";
import { fetchChapters } from "@/lib/api/public/chaptersApi";
import SideBarToggleIcon from "@/components/Common/Icons/SideBarToggleIcon";

const fetcher = (courseId) => fetchChapters(courseId);

const Sidebar = ({ show, setShow, params }) => {
  const { data, error, isLoading } = useSWR([params.courseId], fetcher);

  return (
    <div
      className={`${styles.sidebarWrapper} ${
        show ? styles["sidebarWrapper--show"] : styles["sidebarWrapper--hide"]
      } `}
    >
      <div className={styles.sidebarWrapper__sidebarHeader}>
        <div
          className={styles.toggleIconDiv}
          onClick={() => setShow((prev) => !prev)}
        >
          <SideBarToggleIcon />
        </div>
      </div>
      {isLoading ? (
        <p>Loading accordion skeleton</p>
      ) : (
        <Accordion params={params} accordionListData={data} />
      )}
    </div>
  );
};

export default Sidebar;
