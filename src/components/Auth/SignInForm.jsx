"use client";
import React, { useState } from "react";
import styles from "./styles/signInForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "@/lib/api/auth/authApi";
import EmailIcon from "../Common/Icons/EmailIcon";
import SubmitBtnIcon from "../Common/Icons/SubmitBtnIcon";
import Link from "next/link";
import Spinner from "../Common/Icons/Spinner";
import VerifyOtpForm from "./VerifyOtpForm";

const SignInForm = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const initialValues = {
    email: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await signIn(values.email);
        if (res.message === "OTP sent successfully") {
          setShowOtpForm(true);
        } else {
          setErrors({ formError: res.message || "Unexpected error" });
        }
      } catch (error) {
        console.error("Sign-in error:", error);
        setErrors({ formError: error.message || "SignIn error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.pageWrapper}>
      {showOtpForm ? (
        <VerifyOtpForm email={formik.values.email} />
      ) : (
        <div className={styles.signInFormWrapper}>
          <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <div className={styles.headerCell}></div>
            <div className={styles.messageCell}>
              {formik.errors.formError && (
                <div className={styles.messageDiv}>
                  <p>{formik.errors.formError}</p>
                </div>
              )}
            </div>

            <div className={styles.emailCell}>
              <div className={styles.inputGroup}>
                <div className={styles.iconCell}>
                  <div className={styles.iconWrapper}>
                    <EmailIcon />
                  </div>
                </div>
                <div className={styles.labelCell}>
                  <label htmlFor="email">
                    <p>EMAIL</p>
                  </label>
                </div>
                <div className={styles.inputCell}>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className={styles.errorGroup}>
                {formik.errors.email && formik.touched.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div className={styles.buttonCell}>
              <div className={styles.buttonWrapper}>
                <div className={styles.textDiv}>
                  <p>
                    Sign<span>In</span>
                  </p>
                </div>
                <button type="submit" className={styles.submitButton}>
                  {formik.isSubmitting ? <Spinner /> : <SubmitBtnIcon />}
                </button>
              </div>
            </div>
            <div className={styles.footerCell}>
              <p>Not yet Registered ?</p>
              <Link className={styles.footerLink} href="/auth/signup">
                <p>SignUp</p>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
