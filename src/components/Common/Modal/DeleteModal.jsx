"use client";
import React from "react";
import styles from "./styles/deleteModal.module.scss";
import { useRouter } from "next/navigation";

const DeleteModal = ({ params }) => {
  const router = useRouter();
  return (
    <div className={styles.modalWrapprer}>
      <div className={styles.modalInnerWrapper}>
        <div className={styles.modalTitleWrapper}>
          <p>Delete Course</p>
        </div>
        <div className={styles.modalMessageWrapper}>
          <p>
            Are you sure you want to delete this course? This action cannot be
            undone. Once deleted, all associated data will be permanently
            removed. Please confirm to delete.
          </p>
        </div>
        <div className={styles.modalBtnWrapper}>
          <button
            type="button"
            className={`${styles.modalBtn} ${styles.confirmBtn}`}
          >
            <p>Okay</p>
          </button>
          <button
            onClick={() => router.back()}
            type="button"
            className={`${styles.modalBtn} ${styles.cancelBtn}`}
          >
            <p>Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
