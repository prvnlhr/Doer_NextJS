import React from "react";
import styles from "./styles/highLightBadge.module.scss";

const HighLightBadge = ({ IconComponent, text, isHighlighted }) => {
  return (
    <div className={`${styles.badge} ${isHighlighted && styles.borderedBadge}`}>
      <div className={styles.badge__innerWrapper}>
        {IconComponent && (
          <div className={styles.badge__innerWrapper__iconWrapper}>
            <div
              className={styles.badge__innerWrapper__iconWrapper__iconInnerDiv}
            >
              <IconComponent />
            </div>
          </div>
        )}

        <div className={styles.badge__innerWrapper__textWrapper}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default HighLightBadge;
