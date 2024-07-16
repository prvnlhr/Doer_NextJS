import React from "react";
import styles from "./styles/landing.module.scss";
import IntroSection from "./IntroSection";
import FeaturesSection from "./FeaturesSection";
const Landing = () => {
  return (
    <div className={styles.landingPageWrapper}>
      <div className={styles.innerWrapper}>
        <IntroSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Landing;
