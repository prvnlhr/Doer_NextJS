import React from "react";
import styles from "./styles/highLightBadge.module.scss";

const HighLightBadge = ({
  text,
  spanText,
  IconComponent,
  isHighlighted,
  type,
}) => {
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
        <p className={styles[`textWrapper--${type}Text`]}>
          {spanText && <span>{spanText} </span>}
          {text}
        </p>
      </div>
    </div>
  );
};

export default HighLightBadge;
