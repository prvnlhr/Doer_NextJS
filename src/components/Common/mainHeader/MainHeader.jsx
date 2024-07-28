"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/mainHeader.module.scss";
import popUpStyles from "./styles/popUpMenu.module.scss";
import AppLogo from "../logo/AppLogo";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import PopUpMenuIcon from "../Icons/PopUpMenuIcon";
import { usePathname } from "next/navigation";
import PopUpMenu from "./PopUpMenu";
import { useTheme } from "@/context/ThemeContext";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
import UserIcon from "../Icons/UserIcon";
const MainHeader = () => {
  const { toggleTheme, theme } = useTheme();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [showPopUp, setShowPopUp] = useState(false);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the pop-up menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAuthPage =
    pathname === "/auth/signin" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/verifyotp";

  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/auth");

  const isClassroomPage = pathname.includes("classroom");
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.headerWrapper__leftSection}>
        <div className={styles.appLogoWrapper}>
          <AppLogo />
        </div>
      </div>
      <div className={styles.headerWrapper__rightSection}>
        {status === "authenticated" && !isClassroomPage && !isAdminPath ? (
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

        <div className={styles.menuIconWrapper} ref={iconRef}>
          <div
            className={styles.popUpIconDiv}
            onClick={() => setShowPopUp((prev) => !prev)}
          >
            <PopUpMenuIcon />
          </div>
        </div>

        {showPopUp && (
          <div className={popUpStyles.popMenuWrapper} ref={popupRef}>
            <div className={popUpStyles.themeToggleCell}>
              <div
                className={`${popUpStyles.themeToggleBtnWrapper} `}
                onClick={toggleTheme}
              >
                <div
                  className={`${popUpStyles.toggleBtn} ${
                    popUpStyles[
                      `toggleBtn--${theme === "dark" ? "dark" : "light"}`
                    ]
                  }`}
                >
                  <div className={popUpStyles.btnIconDiv}>
                    {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                  </div>
                  <div className={popUpStyles.btnTextDiv}>
                    <p>{theme === "dark" ? "Dark" : "Light"}</p>
                  </div>
                </div>
              </div>
            </div>
            {status === "authenticated" && (
              <>
                <div className={popUpStyles.nameCell}>
                  <div>
                    <p>Logged in as -</p>
                  </div>
                  <div>
                    <p>Praveen Lohar</p>
                  </div>
                </div>
                <div className={popUpStyles.logoutCell}>
                  <button type="button" onClick={() => signOut()}>
                    <p>Logout</p>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;
