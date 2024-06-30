"use client";
import React, { useState } from "react";
import styles from "./styles/chapterForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
const ChapterForm = () => {
  console.log("CHAPTER");
  const [selectedStatus, setSelectedStatus] = useState(1);

  const initialValues = {
    title: "",
    status: 1,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(200, "Title must be at most 200 characters")
      .required("Title is required"),
    status: Yup.number().required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      console.log({ values });
      // action.resetForm();
    },
  });

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.formContainer__titleCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <label
                  className={styles.formGroup__inputGroup__labelDiv__labelTag}
                  htmlFor="title"
                >
                  Title
                </label>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              {formik.errors.title && formik.touched.title && (
                <p>{formik.errors.title}</p>
              )}
            </div>
          </div>
        </div>
        {/* Status */}
        <div className={styles.formContainer__statusCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <p className={styles.formGroup__inputGroup__labelDiv__labelTag}>
                  Status
                </p>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <div className={styles.statusInputWrapper}>
                  <div
                    onClick={() => setSelectedStatus((prev) => !prev)}
                    className={`${styles.radioBtnWrapper} ${
                      selectedStatus && styles["radioBtnWrapper--activeBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          selectedStatus && styles["radioDotDiv--activeDot"]
                        }`}
                      ></div>
                    </div>
                    <div className={styles.radioLabelDiv}>
                      <p>Active</p>
                    </div>
                  </div>
                </div>
                <div className={styles.statusInputWrapper}>
                  <div
                    onClick={() => setSelectedStatus((prev) => !prev)}
                    className={`${styles.radioBtnWrapper} ${
                      !selectedStatus && styles["radioBtnWrapper--inactiveBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          !selectedStatus && styles["radioDotDiv--inactiveDot"]
                        }`}
                      ></div>
                    </div>
                    <div className={styles.radioLabelDiv}>
                      <p>Inactive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className={styles.formContainer__buttonCell}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChapterForm;
