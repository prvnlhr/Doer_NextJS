"use client";
import React from "react";
import styles from "./styles/commonHeading.module.scss";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import Link from "next/link";
import SearchIcon from "../Icons/SearchIcon";
import { useRouter } from "next/navigation";
import CrossIcon from "../Icons/CrossIcon";

const CommonHeading = ({ to, text, searchParams }) => {
  const { item: searchedItemId } = searchParams || {};
  const router = useRouter();

  const hanldeLinkSearchBtnClicked = () => {
    const url = new URL(window.location);
    if (searchedItemId) {
      url.searchParams.delete("item");
      // console.log(url.href);
      router.replace(url.href);
    } else {
      url.searchParams.append("search", true);
      // console.log(url.href);
      router.replace(url.href);
    }
  };

  return (
    <>
      <div className={styles.backBtnWrapperGrid}>
        <Link href={to ? to : "#"} className={styles.iconCell}>
          <div className={styles.chevIconDiv}>
            <ChevronRightIcon color="white" />
          </div>
        </Link>
        <div className={styles.textCell}>
          <p>{text}</p>
        </div>
        <div className={styles.lineCell}></div>
        <div className={styles.emptyCell}></div>
      </div>
      <div
        onClick={hanldeLinkSearchBtnClicked}
        href="?search=true"
        className={styles.searchBtnWrapper}
      >
        <div className={styles.textWrapper}>
          <p>{searchedItemId ? "CLEAR" : "SEARCH"}</p>
        </div>
        <div className={styles.lineDiv}></div>
        <div className={styles.iconWrapper}>
          <div className={styles.iconDiv}>
            {searchedItemId ? <CrossIcon color="#6167a0" /> : <SearchIcon />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonHeading;
