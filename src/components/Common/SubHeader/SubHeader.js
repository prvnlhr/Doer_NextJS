import React from "react";
import styles from "./styles/subHeader.module.scss";
import CommonHeading from "../Heading/CommonHeading";
const SubHeader = () => {
  return (
    <div className={styles.secHeaderWrapper}>
      <CommonHeading />
    </div>
  );
};

export default SubHeader;
