"use client";
import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/courseForm.module.scss";
import Image from "next/image";

const CourseForm = () => {
  const [selectedStatus, setSelectedStatus] = useState(1);

  const [logoPreview, setLogoPreview] = useState(null);

  const initialValues = {
    logo: null,
    title: "",
    description: "",
    status: 1,
  };

  const validationSchema = Yup.object().shape({
    logo: Yup.mixed()
      .required("Course Logo is required")
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
    title: Yup.string()
      .max(200, "Title must be at most 200 characters")
      .required("Title is required"),
    description: Yup.string().required("Description is required"),
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

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.formContainer__logoCell}>
          <div className={styles.logoFormGroup}>
            <div className={styles.logoFormGroup__inputGroup}>
              <input
                type="file"
                name="logo"
                id="logo"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              <label className={styles.customUploadBox} htmlFor="logo">
                {formik.values.logo ? (
                  <div className={styles.logoPreviewDiv}>
                    <Image
                      quality={10}
                      fill={true}
                      src={logoPreview}
                      alt="Logo Preview"
                    />
                  </div>
                ) : (
                  <div className={styles.uploadDiv}>
                    <p>
                      Choose course <br />
                      Logo
                    </p>
                  </div>
                )}
              </label>
            </div>
            <div className={styles.logoFormGroup__errorGroup}>
              {formik.errors.logo && formik.touched.logo && (
                <p>{formik.errors.logo}</p>
              )}
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
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
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

export default CourseForm;
