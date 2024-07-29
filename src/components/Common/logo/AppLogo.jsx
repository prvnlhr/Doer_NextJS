import React from "react";
import styles from "./styles/appLogo.module.scss";
import Link from "next/link";
import LogoSvg from "./LogoSvg";

const AppLogo = () => {
  return (
    <Link className={styles.logoLink} href="/">
      <LogoSvg />
    </Link>
  );
};

export default AppLogo;
