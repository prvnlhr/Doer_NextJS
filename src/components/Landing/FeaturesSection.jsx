import React from "react";
import styles from "./styles/featuresSection.module.scss";
import TrackingIcon from "./TrackingIcon";
import ContentIcon from "./ContentIcon";
import UIIcon from "./UIIcon";
const FeaturesSection = () => {
  return (
    <div className={styles.featuresSectionOuterWrapper}>
      <div className={styles.featuresSectionInnerWrapper}>
        <div className={styles.headingWrapper}>
          <div className={styles.lineDiv}></div>
          <p>
            <span className={styles.spanText}>Features</span> you
          </p>
          <p>will love.</p>
        </div>
        <div className={styles.contentOuterWrapper}>
          {/*------------ Card 1 ---------- */}
          <div className={styles.featureCardOuterWrapper}>
            <div className={styles.featureCardInnerWrapper}>
              <div className={styles.cardIconWrapper}>
                <div className={styles.iconDiv}>
                  <UIIcon />
                </div>
              </div>
              <div className={styles.cardTitleWrapper}>
                <p>User Interface</p>
              </div>
              <div className={styles.cardDescWrapper}>
                <p>
                  Simple clutter free ui for better user experience. Visually
                  pleasing, simple and easy to understand
                </p>
              </div>
            </div>
          </div>

          {/*------------ Card 2 ---------- */}
          <div className={styles.featureCardOuterWrapper}>
            <div className={styles.featureCardInnerWrapper}>
              <div className={styles.cardIconWrapper}>
                <div className={styles.iconDiv}>
                  <ContentIcon />
                </div>
              </div>
              <div className={styles.cardTitleWrapper}>
                <p>Content</p>
              </div>
              <div className={styles.cardDescWrapper}>
                <p>
                  Detailed and precise content for better understanding with
                  illustrations and pictures so that learning becomes breeze
                </p>
              </div>
            </div>
          </div>

          {/*------------ Card 3 ---------- */}
          <div className={styles.featureCardOuterWrapper}>
            <div className={styles.featureCardInnerWrapper}>
              <div className={styles.cardIconWrapper}>
                <div className={styles.iconDiv}>
                  <TrackingIcon />
                </div>
              </div>
              <div className={styles.cardTitleWrapper}>
                <p>Tracking</p>
              </div>
              <div className={styles.cardDescWrapper}>
                <p>
                  Track you course progress and analyze your productivity from
                  Classroom page with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
