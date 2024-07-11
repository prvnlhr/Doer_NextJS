"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/mainHeader.module.scss";
import AppLogo from "../logo/AppLogo";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import PopUpMenuIcon from "../Icons/PopUpMenuIcon";
import { usePathname } from "next/navigation";

const MainHeader = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [showPopUp, setShowPopUp] = useState(false);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setShowPopUp(false);
      }
    };

    if (showPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopUp]);

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
          pathname !== "/auth/signin" &&
          pathname !== "/auth/signup" &&
          pathname !== "/auth/verifyotp" && (
            <Link href="/auth/signin" className={styles.navbarLink}>
              <p>Log In</p>
            </Link>
          )
        )}

        {session && (
          <div className={styles.menuIconWrapper} ref={iconRef}>
            <div
              className={styles.popUpIconDiv}
              onClick={() => setShowPopUp((prev) => !prev)}
            >
              <PopUpMenuIcon />
            </div>
          </div>
        )}

        {showPopUp && (
          <div className={styles.popUpMenu} ref={popupRef}>
            <div className={styles.userNameWrapper}>
              <p>Logged in as -</p>
              <p>{session && session.user.name}</p>
            </div>
            <div className={styles.logoutBtnWrapper}>
              <button type="button" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;
