import React from "react";
import styles from "./styles/accordionSkeleton.module.scss";
import Shimmer from "./Shimmer";
const AccordionSkeleton = () => {
  return (
    <>
      <div className={styles.accordHeaderWrapper}></div>
      <div className={styles.accordListWrapper}>
        {Array.from({ length: 8 }).map((item, indx) => (
          <div key={indx} className={styles.itemWrapper}>
            <div className={styles.itemWrapper__titleWrapper}>
              <div>
                <Shimmer />
              </div>
            </div>

            {Array.from({ length: 3 }).map((subItem, index) => (
              <div key={index} className={styles.itemWrapper__subTitleWrapper}>
                <div className={styles.lineDiv}>
                  <div className={styles.dotDiv}></div>
                </div>
                <div className={styles.linkDiv}>
                  <div className={styles.linkElement}>
                    <Shimmer />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccordionSkeleton;
