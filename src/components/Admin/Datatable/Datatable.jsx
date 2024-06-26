"use client";
import React from "react";
import styles from "./styles/datatable.module.scss";
import { courses } from "../../../courseData";

const Datatable = () => {
  const columns = ["title", "chapters", "status"];
  return (
    <div className={styles.datatableWrapper}>
      <div className={styles.datatableContainer}>
        <div className={styles.datatableContainer__toolbar}></div>
        <div className={styles.tableContentWrapper}>
          <div className={styles.tableScrollWrapper}>
            <table>
              <thead>
                <tr>
                  <th>{<p>No.</p>}</th>
                  {columns.map((colName) => (
                    <th key={colName}>
                      <p className={styles.text}>
                        {colName.charAt(0).toUpperCase() + colName.slice(1)}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className={index === 2 && styles.big}>
                    <td>
                      <p>{index + 1}.</p>
                    </td>
                    {columns.map((colName) => (
                      <td key={colName}>
                        <p>{course[colName]}</p>
                      </td>
                    ))}
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

export default Datatable;
