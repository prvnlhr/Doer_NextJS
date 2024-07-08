import React from "react";
import styles from "./styles/adminLayout.module.scss";
import BreadCrumbsBar from "../Breadcrumbs/BreadCrumbsBar";
import TabsBar from "../Tabs/TabsBar";
const AdminLayout = ({ children, modal }) => {
  return (
    <div className={styles.adminLayoutWrapper}>
      <div className={styles.sidebarCell}></div>
      <div className={styles.breadcrumbsCell}>
        <BreadCrumbsBar />
      </div>
      <div className={styles.tabsbarCell}>
        <TabsBar />
      </div>
      <div className={styles.subPagesCell}>
        {modal}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
