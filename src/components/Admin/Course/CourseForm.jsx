"use client";
import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/courseForm.module.scss";
import Image from "next/image";
import { createCourse, updateCourse } from "@/lib/api/admin/coursesApi";
import Spinner from "@/components/Common/Icons/Spinner";
import { useRouter } from "next/navigation";

const CourseForm = ({ course }) => {
  const router = useRouter();
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

        if (course) {
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
          // console.log(values);
          res = await createCourse(formData);
          action.resetForm();
          if (res && res._id) {
            router.push(`${res._id}/edit`);
          }
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
      // console.log(course);
      setCourseData({
        _id: course._id,
        title: course.title,
        description: course.description,
        status: course.status,
        cloudinary_id: course.cloudinary_id,
        logoUrl: course.logoUrl,
      });
    }
    // return () => {
    //   if (courseData && courseData.logoUrl !== null) {
    //     URL.revokeObjectURL(logoUrl);
    //   }
    // };
  }, [course]);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formGrid} onSubmit={formik.handleSubmit}>
        <div className={styles.formGrid__logoCell}>
          <div className={styles.logoInputGroup}>
            <input
              className={styles.logoInputGroup__logoInput}
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
            />
            <label className={styles.logoInputGroup__logoLabel} htmlFor="file">
              {courseData && courseData.logoUrl ? (
                <div className={styles.logoInputGroup__previewDiv}>
                  <Image
                    quality={10}
                    fill={true}
                    src={courseData.logoUrl}
                    alt="Logo Preview"
                    sizes="(max-width:100%)"
                  />
                </div>
              ) : (
                <div className={styles.logoInputGroup__uploadBox}>
                  <p>
                    Choose Course <br /> Logo
                  </p>
                </div>
              )}
            </label>
          </div>
          <div className={`${styles.errorGroup} ${styles.logoErrorGroup}`}>
            {formik.errors.file && formik.touched.file && (
              <p>{formik.errors.file}</p>
            )}
          </div>
        </div>
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
        <div className={styles.formGrid__descriptionCell}>
          <div className={styles.inputGroup}>
            <label
              htmlFor="description"
              className={styles.inputGroup__labelTag}
            >
              <p>Description</p>
            </label>
            <textarea
              className={styles.inputGroup__textAreaField}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.description && formik.touched.description && (
              <p>{formik.errors.description}</p>
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
                checked={courseData && courseData.status === true}
                onChange={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    status: !prev.status,
                  }));
                  formik.setFieldValue("status", true);
                }}
              />
              <label
                className={`${styles.btnWrapper} ${
                  courseData &&
                  courseData.status &&
                  styles["btnWrapper--activeBtn"]
                }`}
                htmlFor="activeStatus"
              >
                <div className={styles.radioDotDiv}>
                  <div
                    className={`${styles.radioDot} ${
                      courseData &&
                      courseData.status &&
                      styles["radioDot--activeDot"]
                    }`}
                  ></div>
                </div>
                <p>Active</p>
              </label>
              <input
                type="radio"
                id="inactiveStatus"
                checked={courseData && courseData.status === false}
                onChange={() => {
                  setCourseData((prev) => ({
                    ...prev,
                    status: !prev.status,
                  }));
                  formik.setFieldValue("status", false);
                }}
              />
              <label
                className={`${styles.btnWrapper} ${
                  courseData &&
                  !courseData.status &&
                  styles["btnWrapper--inactiveBtn"]
                }`}
                htmlFor="inactiveStatus"
              >
                <div className={styles.radioDotDiv}>
                  <div
                    className={`${styles.radioDot} ${
                      courseData &&
                      !courseData.status &&
                      styles["radioDot--inactiveDot"]
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

export default CourseForm;
