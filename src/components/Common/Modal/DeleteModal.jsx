import React from "react";
import styles from "./styles/deleteModal.module.scss";
import CancelBtn from "./CancelBtn";
import DeleteBtn from "./DeleteBtn";

const DeleteModal = ({ deleteProps }) => {
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
          <DeleteBtn deleteProps={deleteProps} />
          <CancelBtn />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
