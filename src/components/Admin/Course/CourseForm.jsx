"use client";
import React from "react";
import styles from "./styles/courseForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  logo: Yup.mixed()
    .required("Logo is required")
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      const supportedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      return supportedFormats.includes(value.type);
    }),
  duration: Yup.string().required("Duration is required"),
  title: Yup.string()
    .max(200, "Title must be at most 200 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const CourseForm = () => {
  const formik = useFormik({
    initialValues: {
      logo: null,
      duration: "",
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {/* Logo */}
      <div className={styles.form__logoWrapper}>
        <div className={styles.formGroupWrapper}>
          <div className={styles.formGroupWrapper__labelDiv}>
            <p className={styles.labelText}>Course Logo</p>
          </div>
          <div
            className={`${styles.formGroupWrapper__inputDiv} ${styles.formGroupWrapper__logoInputDiv}`}
          >
            <input
              id="logo"
              name="logo"
              type="file"
              className={styles.hiddenFileInput}
              onChange={(event) => {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              }}
            />
            <label htmlFor="logo" className={styles.customUploadBox}>
              <p>Choose Image</p>
            </label>
          </div>
        </div>
        <div className={styles.errorWrapper}>
          {formik.touched.logo && formik.errors.logo ? (
            <p>{formik.errors.logo}</p>
          ) : null}
        </div>
      </div>

      {/* Duration */}
      <div className={styles.form__durationWrapper}>
        <div className={styles.formGroupWrapper}>
          <div className={styles.formGroupWrapper__labelDiv}>
            <label
              className={styles.formGroupWrapper__labelDiv__labelTag}
              htmlFor="duration"
            >
              <p className={styles.labelText}>Duration</p>
            </label>
          </div>
          <div className={styles.formGroupWrapper__inputDiv}>
            <input
              className={`${styles.formGroupWrapper__inputDiv__inputTag}`}
              id="duration"
              name="duration"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
            />
          </div>
        </div>
        <div className={styles.errorWrapper}>
          {formik.touched.duration && formik.errors.duration ? (
            <p>{formik.errors.duration}</p>
          ) : null}
        </div>
      </div>

      {/* Title */}
      <div className={styles.form__titleWrapper}>
        <div className={styles.formGroupWrapper}>
          <div className={styles.formGroupWrapper__labelDiv}>
            <label
              className={styles.formGroupWrapper__labelDiv__labelTag}
              htmlFor="title"
            >
              <p className={styles.labelText}>Title</p>
            </label>
          </div>
          <div className={styles.formGroupWrapper__inputDiv}>
            <input
              className={styles.formGroupWrapper__inputDiv__inputTag}
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
        </div>
        <div className={styles.errorWrapper}>
          {formik.touched.title && formik.errors.title ? (
            <p>{formik.errors.title}</p>
          ) : null}
        </div>
      </div>

      {/* Description */}
      <div className={styles.form__descriptionWrapper}>
        <div className={styles.formGroupWrapper}>
          <div className={styles.formGroupWrapper__labelDiv}>
            <label
              className={styles.formGroupWrapper__labelDiv__labelTag}
              htmlFor="description"
            >
              <p className={styles.labelText}>Description</p>
            </label>
          </div>
          <div className={styles.formGroupWrapper__inputDiv}>
            <textarea
              className={`${styles.formGroupWrapper__inputDiv__inputTag} ${styles.formGroupWrapper__inputDiv__textAreaInputTag}`}
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
        </div>
        <div className={styles.errorWrapper}>
          {formik.touched.description && formik.errors.description ? (
            <p>{formik.errors.description}</p>
          ) : null}
        </div>
      </div>

      {/* Submit Button */}
      <div className={styles.form__editorWrapper}>
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
