"use client";
import React, { useState } from "react";
import styles from "./styles/chapterForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { createChapter, updateChapter } from "@/lib/api/admin/chaptersApi";
import Spinner from "@/components/Common/Icons/Spinner";

const ChapterForm = ({ chapter }) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(
    chapter ? chapter.status : true
  );
  const params = useParams();
  const initialValues = {
    title: chapter ? chapter.title : "",
    status: chapter ? chapter.status : true,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(200, "Title must be at most 200 characters")
      .required("Title is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, action) => {
      try {
        const chapterData = { ...values };
        let res;
        if (chapter) {
          res = await updateChapter(
            chapterData,
            params.courseId,
            params.chapterId
          );
        } else {
          res = await createChapter(chapterData, params.courseId);
        }
        if (res && res._id) {
          router.push(`${res._id}/edit`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formGrid} onSubmit={formik.handleSubmit}>
        <div className={styles.formGrid__titleCell}>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.inputGroup__labelTag}>
              <p>Title</p>
            </label>
            <input
              className={styles.inputGroup__inputField}
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.title && formik.touched.title && (
              <p>{formik.errors.title}</p>
            )}
          </div>
        </div>
        <div className={styles.formGrid__statusCell}>
          <div className={`${styles.inputGroup} ${styles.statusInputGroup}`}>
            <div className={styles.statusInputGroup__labelDiv}>
              <p>Status</p>
            </div>
            <div className={styles.statusInputGroup__inputBtnWrapper}>
              <input
                type="radio"
                id="activeStatus"
                checked={selectedStatus === true}
                onChange={() => {
                  setSelectedStatus(true);
                  formik.setFieldValue("status", true);
                }}
              />
              <label
                className={`${styles.btnWrapper} ${
                  selectedStatus && styles["btnWrapper--activeBtn"]
                }`}
                htmlFor="activeStatus"
              >
                <div className={styles.radioDotDiv}>
                  <div
                    className={`${styles.radioDot} ${
                      selectedStatus && styles["radioDot--activeDot"]
                    }`}
                  ></div>
                </div>
                <p>Active</p>
              </label>
              <input
                type="radio"
                id="inactiveStatus"
                checked={selectedStatus === false}
                onChange={() => {
                  setSelectedStatus(false);
                  formik.setFieldValue("status", false);
                }}
              />
              <label
                className={`${styles.btnWrapper} ${
                  !selectedStatus && styles["btnWrapper--inactiveBtn"]
                }`}
                htmlFor="inactiveStatus"
              >
                <div className={styles.radioDotDiv}>
                  <div
                    className={`${styles.radioDot} ${
                      !selectedStatus && styles["radioDot--inactiveDot"]
                    }`}
                  ></div>
                </div>
                <p>Inative</p>
              </label>
            </div>
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.status && formik.touched.status && (
              <p>{formik.errors.status}</p>
            )}
          </div>
        </div>
        <div className={styles.formGrid__buttonCell}>
          <button disabled={formik.isSubmitting} type="submit">
            {formik.isSubmitting ? (
              <div className={styles.spinnerDiv}>
                <Spinner />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChapterForm;
