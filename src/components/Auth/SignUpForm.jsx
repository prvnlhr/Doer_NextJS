"use client";
import React from "react";
import styles from "./styles/signUpForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "@/lib/api/auth/authApi";

const SignUpForm = () => {
  const initialValues = {
    fullname: "",
    email: "",
    country: "",
  };

  const signUpSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const userData = {
          ...values,
        };
        console.log(userData);
        // return;
        const res = await signUp(userData);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.signUpFormWrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your fullname"
            className={
              formik.errors.fullname && formik.touched.fullname
                ? styles.inputError
                : ""
            }
          />
          {formik.errors.fullname && formik.touched.fullname ? (
            <div className={styles.error}>{formik.errors.fullname}</div>
          ) : null}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={
              formik.errors.email && formik.touched.email
                ? styles.inputError
                : ""
            }
          />
          {formik.errors.email && formik.touched.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <input
            type="text"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your country"
            className={
              formik.errors.country && formik.touched.country
                ? styles.inputError
                : ""
            }
          />
          {formik.errors.country && formik.touched.country ? (
            <div className={styles.error}>{formik.errors.country}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
