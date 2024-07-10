"use client";
import React from "react";
import styles from "./styles/mainHeader.module.scss";
import AppLogo from "../logo/AppLogo";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const MainHeader = () => {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.headerWrapper__appLogoWrapper}>
        <AppLogo />
      </div>
      <div className={styles.headerWrapper__rightSection}>
        {session ? (
          <Link href="/classroom" className={styles.navbarLink}>
            <p>Classroom</p>
          </Link>
        ) : (
          <Link href="/auth/signin" className={styles.navbarLink}>
            <p>Log In</p>
          </Link>
        )}

        <div className={styles.userAvatarDiv} onClick={() => signOut()}></div>
      </div>
    </nav>
  );
};

export default MainHeader;
