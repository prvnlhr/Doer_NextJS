"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/datatable.module.scss";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchQuery("");
      const url = new URL(window.location);
      url.searchParams.delete("search");
      router.replace(url.href);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      const url = new URL(window.location);
      url.searchParams.delete("search");
      router.replace(url.href);
    } else {
      router.push(`?search=${searchQuery}`);
    }
  };
  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchWrapper__inputWrapper}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.searchWrapper__iconWrapper}>
        <div
          onClick={handleSearch}
          className={styles.searchWrapper__iconWrapper__searchIconDiv}
        >
          {searchQuery && searchQuery.length > 0 ? (
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                fill="#635db0"
              />
            </svg>
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
