"use client";
import React from "react";
import styles from "./styles/deleteModal.module.scss";
import { useRouter } from "next/navigation";

const CancelBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      type="button"
      className={`${styles.modalBtn} ${styles.cancelBtn}`}
    >
      <p>Cancel</p>
    </button>
  );
};

export default CancelBtn;
