"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/mainHeader.module.scss";
import popUpStyles from "./styles/popUpMenu.module.scss";
import AppLogo from "../logo/AppLogo";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
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
          <>
            {session?.user?.role === "admin" && (
              <Link
                prefetch={false}
                href={`/admin/courses`}
                className={`${styles.navbarLink} ${styles.adminPanelBtn}`}
              >
                <p>Admin Panel</p>
              </Link>
            )}
            <Link
              prefetch={false}
              href={`/user/${session?.user?.userId}/classroom`}
              className={styles.navbarLink}
            >
              <p>Classroom</p>
            </Link>
          </>
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
          <div className={popUpStyles.popMenuWrapper} ref={popupRef}>
            <div className={popUpStyles.userInfoCell}>
              <div className={popUpStyles.userIconCell}>
                <div className={popUpStyles.userBadgeDiv}>
                  <p>{session?.user?.name.charAt(0)}</p>
                </div>
              </div>
              <div className={popUpStyles.userNameCell}>
                <p>{session.user.name}</p>
              </div>
              <div className={popUpStyles.userEmailCell}>
                <p>{session.user.email}</p>
              </div>
            </div>
            <div className={popUpStyles.logoutCell}>
              <button
                type="button"
                className={popUpStyles.logoutBtn}
                onClick={() => signOut()}
              >
                <div className={popUpStyles.lgIconCell}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M17.4395 14.62L19.9995 12.06L17.4395 9.5"
                        stroke="#AB9EF6"
                        strokeWidth="1.5"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.75977 12.0596H19.9298"
                        stroke="#AB9EF6"
                        strokeWidth="1.5"
                        stroke-miterlimit="10"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      d="M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"
                      stroke="#AB9EF6"
                      strokeWidth="1.5"
                      stroke-miterlimit="10"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className={popUpStyles.lgTextCell}>
                  <p>Sign out</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;
