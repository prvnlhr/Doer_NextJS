import React from "react";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import MainContent from "@/components/Admin/MainContent/MainContent";
import styles from "./adminpanel.module.scss";

const AdminPanelLayout = ({ children }) => {
  let show = true;
  return (
    <div className={styles.adminPanelWrapper}>
      <div className={styles.adminPanelWrapper__pageInnerWrapper}>
        <Sidebar show={show} />
        <MainContent children={children} show={show} />
      </div>
    </div>
  );
};

export default AdminPanelLayout;
