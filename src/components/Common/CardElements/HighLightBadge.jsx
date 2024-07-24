import React from "react";
import styles from "./styles/highLightBadge.module.scss";

const HighLightBadge = ({ text, IconComponent, isHighlighted }) => {
  return (
    <div
      className={`${styles.badgeWrapper} ${
        isHighlighted && styles["badgeWrapper--highlightBadge"]
      }`}
    >
      {IconComponent && (
        <div className={styles.iconWrapper}>
          <div className={styles.iconDiv}>{<IconComponent />}</div>
        </div>
      )}
      <div className={styles.textWrapper}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default HighLightBadge;
