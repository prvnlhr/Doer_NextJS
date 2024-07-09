import React from "react";
import styles from "./styles/topicContent.module.scss";
const TopicContent = ({ children }) => {
  return <div className={styles.topicContentWrapper}>{children}</div>;
};

export default TopicContent;
