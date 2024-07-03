"use client";
import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/courseForm.module.scss";
import Image from "next/image";
import { createCourse, updateCourse } from "@/lib/api/admin/coursesApi";
import Spinner from "@/components/Common/Icons/Spinner";

const CourseForm = ({ course }) => {
  const [courseData, setCourseData] = useState({
    id: "",
    title: "",
    description: "",
    status: true,
    logoUrl: null,
    cloudinary_id: "",
  });

  const initialValues = {
    file: null,
    title: course ? course.title : "",
    description: course ? course.description : "",
    status: course ? course.status : true,
  };

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/svg+xml",
  ];

  let commanSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.boolean().required("Status is required"),
  });

  const createSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("Course Logo is required")
      .test(
        "fileSize",
        "File size is too large. Maximum size is 200KB.",
        (value) => {
          if (!value) return false;
          return value.size <= 200 * 1024; // 200KB in bytes
        }
      )
      .test("fileFormat", "Unsupported file format", (value) => {
        if (!value) return false;
        return SUPPORTED_FORMATS.includes(value.type);
      }),
  });

  const editSchema = Yup.object().shape({
    file: Yup.mixed()
      .nullable() // Allow null values
      .notRequired() // Make it not required
      .test(
        "fileSize",
        "File size is too large. Maximum size is 200KB.",
        (value) => {
          if (!value) return true;
          return value.size <= 200 * 1024; // 200KB in bytes
        }
      )
      .test("fileFormat", "Unsupported file format", (value) => {
        if (!value) return true;
        return SUPPORTED_FORMATS.includes(value.type);
      }),
  });

  const validationSchema = course
    ? commanSchema.concat(editSchema)
    : commanSchema.concat(createSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, action) => {
      try {
        let res;
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("status", values.status);
        formData.append("file", values.file);

        console.log(course);
        // return;

        if (course) {
          console.log(courseData._id);
          formData.append("cloudinary_id", courseData.cloudinary_id);
          res = await updateCourse(formData, courseData._id);
          setCourseData({
            _id: res._id,
            title: res.title,
            description: res.description,
            status: res.status,
            logoUrl: res.logoUrl,
            cloudinary_id: res.cloudinary_id,
          });
        } else {
          res = await createCourse(formData);
          action.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("file", file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setCourseData((prev) => ({
        ...prev,
        logoUrl: previewURL,
      }));
    }
  };

  useEffect(() => {
    if (course) {
      console.log(course.logoUrl);
      setCourseData({
        _id: course._id,
        title: course.title,
        description: course.description,
        status: course.status,
        cloudinary_id: course.cloudinary_id,
        logoUrl: course.logoUrl,
      });
    }
    return () => {
      if (courseData.logoUrl) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [course]);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
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
                {courseData && courseData.logoUrl ? (
                  <div className={styles.logoPreviewDiv}>
                    <Image
                      quality={10}
                      fill={true}
                      src={courseData.logoUrl}
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
                      setCourseData((prev) => ({
                        ...prev,
                        status: !prev.status,
                      }));

                      formik.setFieldValue("status", true);
                    }}
                    className={`${styles.radioBtnWrapper} ${
                      courseData &&
                      courseData.status &&
                      styles["radioBtnWrapper--activeBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          courseData &&
                          courseData.status &&
                          styles["radioDotDiv--activeDot"]
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
                      setCourseData((prev) => ({
                        ...prev,
                        status: !prev.status,
                      }));
                      formik.setFieldValue("status", false);
                    }}
                    className={`${styles.radioBtnWrapper} ${
                      !(courseData && courseData.status) &&
                      styles["radioBtnWrapper--inactiveBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          !(courseData && courseData.status) &&
                          styles["radioDotDiv--inactiveDot"]
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

        <div className={styles.formContainer__buttonCell}>
          <button disabled={true} type="submit">
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

export default CourseForm;
