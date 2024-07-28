import React, { useState } from "react";
import popUpStyles from "./styles/popUpMenu.module.scss";
import UserIcon from "../Icons/UserIcon";
import { useTheme } from "@/context/ThemeContext";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
const PopUpMenu = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const { toggleTheme, theme } = useTheme();
  return (
    <div className={popUpStyles.popMenuWrapper}>
      <div className={popUpStyles.themeToggleCell}>
        <div
          className={`${popUpStyles.themeToggleBtnWrapper} `}
          onClick={toggleTheme}
        >
          <div
            className={`${popUpStyles.toggleBtn} ${
              popUpStyles[`toggleBtn--${theme === "dark" ? "dark" : "light"}`]
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
      <div className={popUpStyles.nameCell}>
        <div className={popUpStyles.nameWrapper}>
          <div className={popUpStyles.nameIconDiv}>
            <UserIcon />
          </div>
          <div className={popUpStyles.nameTextDiv}>
            <p>Praveen Lohar</p>
          </div>
        </div>
      </div>
      <div className={popUpStyles.logoutCell}>
        <button type="button">
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default PopUpMenu;
