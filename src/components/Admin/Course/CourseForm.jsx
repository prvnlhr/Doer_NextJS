"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/courseForm.module.scss";
const CourseForm = () => {
  const initialValues = {
    logo: "",
    title: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.mixed()
      .test("fileType", "Invalid file format", (value) => {
        if (!value) return false;
        const supportedFormats = [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/svg+xml",
        ];
        return supportedFormats.includes(value.type);
      })
      .required("Course Logo is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, action) => {
        console.log({ values });
        action.resetForm();
      },
    });
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formContainer__logoCell}>
          <div className={styles.logoFormGroup}>
            <div className={styles.logoFormGroup__inputGroup}>
              <input
                type="file"
                name="logo"
                id="logo"
                value={values.logo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className={styles.customUploadBox} htmlFor="logo">
                <div className={styles.uploadDiv}>
                  <p>
                    Choose course <br />
                    Logo
                  </p>
                </div>
              </label>
            </div>
            <div className={styles.logoFormGroup__errorGroup}>
              {errors.logo && touched.logo ? <p>{errors.logo}</p> : null}
            </div>
          </div>
        </div>
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
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              {errors.title && touched.title ? <p>{errors.title}</p> : null}
            </div>
          </div>
        </div>
        <div className={styles.formContainer__descriptionCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <label
                  className={styles.formGroup__inputGroup__labelDiv__labelTag}
                  htmlFor="description"
                >
                  Description
                </label>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              {errors.description && touched.description ? (
                <p>{errors.description}</p>
              ) : null}
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CourseForm;
