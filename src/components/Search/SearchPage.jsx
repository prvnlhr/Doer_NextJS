"use client";
import React, { useState } from "react";
import styles from "./styles/search.module.scss";
import SearchIcon from "../Common/Icons/SearchIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChevronRightIcon from "../Common/Icons/ChevronRightIcon";
import useSWR from "swr";
import { search } from "@/lib/api/public/searchApi";
import ChapterResultElement from "./ChapterResultElement";
import CourseResultElement from "./CourseResultElement";
import TopicResultElement from "./TopicResultElement";
import { useDebounce } from "./useDebounce";

// Define search filters
const searchFilters = [
  // { text: "All", key: "all", href: "?search=true&filter=all" },
  { text: "Course", key: "course", href: "?search=true&filter=course" },
  { text: "Chapter", key: "chapter", href: "?search=true&filter=chapter" },
  { text: "Topic", key: "topic", href: "?search=true&filter=topic" },
];

// Fetcher function for useSWR
const searchFetcher = (filterKey, searchQuery) =>
  search(filterKey, searchQuery);

const SearchPage = () => {
  const searchParams = useSearchParams();
  const filterKey = searchParams.get("filter") || "course";
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // useSWR hook to fetch data based on filter key and search query
  const {
    data: searchedData,
    error,
    isLoading: isSearching,
  } = useSWR(
    debouncedSearchQuery ? [filterKey, debouncedSearchQuery] : null,
    ([filterKey, debouncedSearchQuery]) =>
      searchFetcher(filterKey, debouncedSearchQuery),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  return (
    <div className={styles.searchPageWrapper}>
      <div className={styles.searchHeaderWrapper}></div>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchIconWrapper}>
          <div className={styles.searchIconDiv}>
            <SearchIcon />
          </div>
        </div>
        <div className={styles.divisionLine}></div>
        <div className={styles.searchInputWrappper}>
          <input
            value={searchQuery} // Control the input value
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Course, Chapter, Topic"
          />
        </div>
      </div>

      <div className={styles.searchFilterWrapper}>
        {searchFilters.map((filter) => (
          <Link
            key={filter.key}
            className={`${styles.filterLink} ${
              filterKey === filter.key && styles["filterLink--activeLink"]
            }`}
            href={`${filter.href}`}
          >
            <p>{filter.text}</p>
          </Link>
        ))}
      </div>

      <div className={styles.searchListWrapper}>
        {isSearching && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
        {searchedData && searchedData.length === 0 && <p>No results found</p>}
        {searchedData &&
          searchedData.map((item, index) => {
            switch (filterKey) {
              case "course":
                return <CourseResultElement item={item} key={index} />;
              case "chapter":
                return <ChapterResultElement item={item} key={index} />;
              case "topic":
                return <TopicResultElement item={item} key={index} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
};

export default SearchPage;
