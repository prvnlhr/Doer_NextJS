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
          console.log(values);
          res = await createCourse(formData);
          action.resetForm();
          router.push(`/admin/courses`);
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
          <div className={styles.logoInputGroup}></div>
          <div className={styles.errorGroup}>
            <p>Course Logo is required</p>
          </div>
        </div>
        <div className={styles.formGrid__titleCell}>
          <div className={styles.inputGroup}>
            <label className={styles.inputGroup__labelTag}>
              <p>Title</p>
            </label>
            <input className={styles.inputGroup__inputField} />
          </div>
          <div className={styles.errorGroup}>
            <p>Title is required</p>
          </div>
        </div>
        <div className={styles.formGrid__descriptionCell}>
          <div className={styles.inputGroup}>
            <label className={styles.inputGroup__labelTag}>
              <p>Description</p>
            </label>
            <textarea className={styles.inputGroup__textAreaField} />
          </div>
          <div className={styles.errorGroup}></div>
        </div>
        <div className={styles.formGrid__buttonCell}></div>
      </form>
    </div>
  );
};

export default CourseForm;
