"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/mainHeader.module.scss";
import AppLogo from "../logo/AppLogo";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import PopUpMenuIcon from "../Icons/PopUpMenuIcon";
import { usePathname } from "next/navigation";
import { useSelectedLayoutSegment } from "next/navigation";

const MainHeader = () => {
  const segment = useSelectedLayoutSegment();
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;
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

  const isAuthPage =
    pathname === "/auth/signin" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/verifyotp";

  const isClassroomPage = pathname.includes("classroom");
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.headerWrapper__leftSection}>
        <div className={styles.appLogoWrapper}>
          <AppLogo />
        </div>
      </div>
      <div className={styles.headerWrapper__rightSection}>
        {status === "authenticated" && !isClassroomPage ? (
          <Link
            prefetch={false}
            href={`/user/${session?.user?.userId}/classroom`}
            className={styles.navbarLink}
          >
            <p>Classroom</p>
          </Link>
        ) : (
          !isAuthPage &&
          status === "unauthenticated" && (
            <Link href="/auth/signin" className={styles.navbarLink}>
              <p>Log In</p>
            </Link>
          )
        )}

        {status === "authenticated" && (
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
