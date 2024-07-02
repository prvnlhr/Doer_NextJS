"use client";
import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/courseForm.module.scss";
import Image from "next/image";
import { createCourse, updateCourse } from "@/lib/api/admin/coursesApi";

const CourseForm = ({ course }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    course ? course.status : true
  );
  const [logoPreview, setLogoPreview] = useState(null);

  const initialValues = {
    file: null,
    title: course ? course.title : "",
    description: course ? course.description : "",
    status: course ? course.status : true,
    oldFile: course && course.logoUrl ? 1 : 0,
  };

  const validationSchema = Yup.object().shape({
    // oldFile: Yup.number(),
    // file: Yup.mixed().when("oldFile", {
    //   is: 0, // Validate file only if oldFile is 0 (indicating no existing logo)
    //   then: Yup.mixed()
    //     .test("fileType", "Course Logo must be an image file", (value) => {
    //       if (!value) return true; // Allow null values (no file selected)
    //       const supportedFormats = [
    //         "image/jpeg",
    //         "image/png",
    //         "image/gif",
    //         "image/svg+xml",
    //         "image/bmp",
    //         "image/webp",
    //         "image/tiff",
    //         "image/x-icon",
    //         "image/heif",
    //         "image/heic",
    //       ];
    //       return supportedFormats.includes(value.type);
    //     })
    //     .required("Course Logo is required"),
    // }),
    title: Yup.string()
      .max(200, "Title must be at most 200 characters")
      .required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: (values, action) => {
      // action.resetForm();
      console.log(values);
      // try {
      //   console.log(course);
      //   //TODO : check if logo image file is updated or not, by comparing
      //   let res;
      //   const formData = new FormData();
      //   formData.append("title", values.title);
      //   formData.append("description", values.description);
      //   formData.append("status", values.status);
      //   formData.append("file", values.file);
      //   if (course) {
      //     console.log(course);
      //     return;
      //     res = updateCourse();
      //   } else {
      //     return;
      //     res = await createCourse(formData);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("file", file);
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

  useEffect(() => {
    if (course && course.logoUrl) {
      setLogoPreview(course.logoUrl);
    }
  }, []);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <input
          type="hidden"
          name="oldFile"
          id="oldFile"
          value={course && course.logoUrl ? 1 : 0}
        />
        <div className={styles.formContainer__logoCell}>
          <div className={styles.logoFormGroup}>
            <div className={styles.logoFormGroup__inputGroup}>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              <label className={styles.customUploadBox} htmlFor="file">
                {logoPreview ? (
                  <div className={styles.logoPreviewDiv}>
                    <Image
                      quality={10}
                      fill={true}
                      src={logoPreview}
                      alt="Logo Preview"
                      sizes="(max-width:100%)"
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
              {formik.errors.file && formik.touched.file && (
                <p>{formik.errors.file}</p>
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
                    onClick={() => {
                      setSelectedStatus((prev) => !prev);
                      formik.setFieldValue("status", true);
                    }}
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
                    onClick={() => {
                      setSelectedStatus((prev) => !prev);
                      formik.setFieldValue("status", false);
                    }}
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
          <button disabled={formik.isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
