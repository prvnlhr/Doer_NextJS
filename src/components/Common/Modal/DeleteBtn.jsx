"use client";
import React from "react";

import styles from "./styles/deleteModal.module.scss";
import { deleteCourse } from "@/lib/api/admin/coursesApi";
import { deleteChapter } from "@/lib/api/admin/chaptersApi";
import { deleteTopic } from "@/lib/api/admin/topicsApi";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ deleteProps }) => {
  const router = useRouter();
  const deleteHandler = async () => {
    const { type, params } = deleteProps;
    const { courseId, chapterId, topicId } = params;
    try {
      let res;
      if (type === "course") {
        res = await deleteCourse(courseId);
      } else if (type === "chapter") {
        res = await deleteChapter(courseId, chapterId);
      } else if (type === "topic") {
        res = await deleteTopic(courseId, chapterId, topicId);
      }
      router.back();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={deleteHandler}
      type="button"
      className={`${styles.modalBtn} ${styles.confirmBtn}`}
    >
      <p>Okay</p>
    </button>
  );
};

export default DeleteBtn;
