import React from "react";
import styles from "./styles/datatableSkeleton.module.scss";
import AddIcon from "../Icons/styles/AddIcon";
import SearchBar from "@/components/Admin/Datatable/SearchBar";
import Link from "next/link";
import DeleteIcon from "../Icons/DeleteIcon";
import Shimmer from "./Shimmer";
const DatatableSkeleton = () => {
  const data = [
    {
      _id: "1",
      title: "Course 1",
      description: "Description of Course 1",
      status: true,
      chapters: [1, 2, 3],
    },
    {
      _id: "2",
      title: "Course 2",
      description: "Description of Course 2",
      status: false,
      chapters: [1, 2],
    },
    {
      _id: "3",
      title: "Course 3",
      description: "Description of Course 3",
      status: true,
      chapters: [1, 2, 3, 4],
    },
  ];

  const columns = ["title", "description", "status", "chapters"];

  return (
    <div className={styles.datatableWrapper}>
      <div className={styles.datatableContainer}>
        <div className={styles.datatableContainer__toolbar}></div>
        <div className={styles.tableContentWrapper}>
          <div className={styles.tableScrollWrapper}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      <Shimmer />
                    </div>
                  </th>
                  {Array.from({ length: 4 }).map((colName) => (
                    <th key={colName}>
                      <Shimmer />
                    </th>
                  ))}
                  <th>
                    <div>
                      <Shimmer />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <div className={styles.textDiv}>
                          <Shimmer />
                        </div>
                      </td>
                      {columns.map((colName) => (
                        <td key={colName}>
                          <div className={styles.textDiv}>
                            <Shimmer />
                          </div>
                        </td>
                      ))}
                      <td>
                        <div className={styles.actionBtnsWrapper}>
                          <div
                            className={styles.actionBtnsWrapper__actionButton}
                          >
                            <Shimmer />
                          </div>
                          <div
                            className={styles.actionBtnsWrapper__actionButton}
                          >
                            <Shimmer />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatatableSkeleton;
