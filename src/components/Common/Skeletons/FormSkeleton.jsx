import React from "react";
import styles from "./styles/formSkeleton.module.scss";
import Shimmer from "./Shimmer";
const FormSkeleton = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formGrid}>
        <div className={styles.formGrid__titleCell}>
          <div className={styles.inputGroup}>
            <div className={styles.inputGroup__labelTag}>
              <div className={styles.labelTextDiv}>
                <Shimmer />
              </div>
            </div>
            <div className={styles.inputGroup__inputField}>
              <div className={styles.inputTextDiv}>
                <Shimmer />
              </div>
            </div>
          </div>
          <div className={styles.errorGroup}></div>
        </div>
        <div className={styles.formGrid__statusCell}>
          <div className={`${styles.inputGroup} ${styles.statusInputGroup}`}>
            <div className={styles.statusInputGroup__labelDiv}>
              <div className={styles.labelTextDiv}>
                <Shimmer />
              </div>
            </div>
            <div className={styles.statusInputGroup__inputBtnWrapper}>
              <div className={`${styles.btnWrapper} `}>
                <div className={styles.radioDotDiv}>
                  <div className={`${styles.radioDot}`}>
                    <Shimmer />
                  </div>
                </div>
                <div className={styles.statusLabelDiv}>
                  <Shimmer />
                </div>
              </div>

              <div className={`${styles.btnWrapper} `}>
                <div className={styles.radioDotDiv}>
                  <div className={`${styles.radioDot} `}>
                    <Shimmer />
                  </div>
                </div>
                <div className={styles.statusLabelDiv}>
                  <Shimmer />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.errorGroup}></div>
        </div>
        <div className={styles.formGrid__buttonCell}>
          <div className={styles.button}>
            <Shimmer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
