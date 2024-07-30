import React from "react";
import styles from "./styles/datatable.module.scss";
import StatusDotIcon from "@/components/Common/Icons/StatusDotIcon";
import EditIcon from "@/components/Common/Icons/EditIcon";
import DeleteIcon from "@/components/Common/Icons/DeleteIcon";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import AddIcon from "@/components/Common/Icons/styles/AddIcon";
import Link from "next/link";
import SearchBar from "./SearchBar";

const StatusBadge = ({ value, color }) => {
  return (
    <div
      className={`${styles.statusBadgeWrapper} ${
        value === true
          ? styles[`statusBadgeWrapper--activeBg`]
          : styles[`statusBadgeWrapper--inactiveBg`]
      }`}
    >
      <div className={styles.statusBadgeWrapper__iconWrapper}>
        <div className={styles.statusBadgeWrapper__iconWrapper__iconDiv}>
          <StatusDotIcon color={color} />
        </div>
      </div>
      <div className={styles.statusBadgeWrapper__statusTextWrapper}>
        <p
          className={`${
            value === true ? styles.activeText : styles.inactiveText
          }`}
        >
          {value ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

const Datatable = ({ data, columns, getEditUrl, getAddUrl, getDeleteUrl }) => {
  return (
    <div className={styles.datatableWrapper}>
      <div className={styles.datatableContainer}>
        <div className={styles.datatableContainer__toolbar}>
          <SearchBar />
          <Link href={getAddUrl()} className={styles.addBtn}>
            <p>Add</p>
            <div className={styles.addBtn__iconDiv}>
              <AddIcon />
            </div>
          </Link>
        </div>
        <div className={styles.tableContentWrapper}>
          <div className={styles.tableScrollWrapper}>
            <table>
              <thead>
                <tr>
                  <th>
                    <p>No.</p>
                  </th>
                  {columns.map((colName) => (
                    <th key={colName}>
                      <p className={styles.text}>
                        {colName === "chaptersCount"
                          ? "Total Chapters"
                          : colName === "topicsCount"
                          ? "Total Topics"
                          : colName.charAt(0).toUpperCase() + colName.slice(1)}
                      </p>
                    </th>
                  ))}
                  <th>
                    <p>Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <p>{index + 1}.</p>
                      </td>
                      {columns.map((colName) => (
                        <td key={colName}>
                          {colName === "status" ? (
                            <StatusBadge
                              value={row[colName]}
                              color={
                                row[colName] === true ? "#12b76a" : "#c4320a"
                              }
                            />
                          ) : colName === "chapters" ? (
                            <p>
                              {Array.isArray(row[colName])
                                ? row[colName].length
                                : row[colName]}
                            </p>
                          ) : (
                            <p>{row[colName]}</p>
                          )}
                        </td>
                      ))}
                      <td>
                        <div className={styles.actionBtnsWrapper}>
                          <Link
                            href={getEditUrl(row["_id"])}
                            className={styles.actionBtnsWrapper__actionButton}
                          >
                            <EditIcon />
                          </Link>
                          <Link
                            href={getDeleteUrl ? getDeleteUrl(row["_id"]) : "#"}
                            className={styles.actionBtnsWrapper__actionButton}
                          >
                            <DeleteIcon />
                          </Link>
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

export default Datatable;
