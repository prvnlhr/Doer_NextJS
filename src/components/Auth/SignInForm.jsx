"use client";
import React from "react";
import styles from "./styles/signInForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "@/lib/api/auth/authApi";

const SignInForm = () => {
  const initialValues = {
    email: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values);
        const res = await signIn(values.email);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.signInFormWrapper}>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
