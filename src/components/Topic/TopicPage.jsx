"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/topicPage.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";

const TopicPage = ({ accordionData, params }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.topicPageWrapper}>
      <div className={styles.topicPageWrapper__pageInnerWrapper}>
        <Sidebar
          params={params}
          accordionData={accordionData}
          show={show}
          setShow={setShow}
        />
        <MainContent params={params} show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default TopicPage;
