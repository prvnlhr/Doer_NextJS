"use client";
import React from "react";
import styles from "./styles/datatable.module.scss";
import DeleteIcon from "@/components/Common/Icons/DeleteIcon";
const DeleteBtn = () => {
  return (
    <button type="button" className={styles.actionBtnsWrapper__actionButton}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteBtn;
