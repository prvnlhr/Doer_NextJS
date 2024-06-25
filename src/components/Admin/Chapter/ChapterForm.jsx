"use client";
import React, { useState } from "react";
import styles from "./styles/chapterForm.module.scss";
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
  durationHours: Yup.number()
    .required("Hours is required")
    .integer("Hours must be an integer")
    .min(1, "Hours must be between 1 and 24")
    .max(24, "Hours must be between 1 and 24"),
  durationDays: Yup.number()
    .required("Days is required")
    .integer("Days must be an integer")
    .min(0, "Days must be between 0 and 31")
    .max(31, "Days must be between 0 and 31"),
  durationMonths: Yup.number()
    .required("Months is required")
    .integer("Months must be an integer")
    .min(1, "Months must be between 1 and 36")
    .max(36, "Months must be between 1 and 36"),
  title: Yup.string()
    .max(200, "Title must be at most 200 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const CourseForm = () => {
  const [logoPreview, setLogoPreview] = useState(null); // State for image preview

  const formik = useFormik({
    initialValues: {
      logo: null,
      durationHours: "",
      durationDays: "",
      durationMonths: "",
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file); // Set Formik field value
    if (file) {
      // Generate preview URL
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL); // Set preview URL in state
    }
  };

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
              {formik.values.logo ? (
                <div className={styles.previewDiv}>
                  <img
                    src={URL.createObjectURL(formik.values.logo)}
                    alt="Logo Preview"
                  />
                </div>
              ) : (
                <div className={styles.uploadDiv}>
                  <p>Choose Image</p>
                </div>
              )}
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
            <p className={styles.labelText}>Duration (Hours / Days / Months)</p>
          </div>
          <div
            className={`${styles.formGroupWrapper__inputDiv} ${styles.formGroupWrapper__durationInputDiv}`}
          >
            <input
              className={` ${styles.formGroupWrapper__durationInputDiv__durationInputTag}`}
              id="durationHours"
              name="durationHours"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.durationHours}
              placeholder="Hours"
              type="number"
              min={1}
              max={24}
              inputMode="numeric"
            />
            <input
              className={` ${styles.formGroupWrapper__durationInputDiv__durationInputTag}`}
              id="durationDays"
              name="durationDays"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.durationDays}
              placeholder="Days"
              type="number"
              min={0}
              max={31}
              inputMode="numeric"
            />
            <input
              className={` ${styles.formGroupWrapper__durationInputDiv__durationInputTag}`}
              id="durationMonths"
              name="durationMonths"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.durationMonths}
              placeholder="Months"
              type="number"
              min={1}
              max={36}
              inputMode="numeric"
            />
          </div>
        </div>
        <div className={styles.errorWrapper}>
          {formik.touched.durationHours && formik.errors.durationHours ? (
            <p>{formik.errors.durationHours}</p>
          ) : null}
          {formik.touched.durationDays && formik.errors.durationDays ? (
            <p>{formik.errors.durationDays}</p>
          ) : null}
          {formik.touched.durationMonths && formik.errors.durationMonths ? (
            <p>{formik.errors.durationMonths}</p>
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
              className={`${styles.formGroupWrapper__inputDiv__inputTag} `}
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
      <div className={styles.form__submitBtnWrapper}>
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
