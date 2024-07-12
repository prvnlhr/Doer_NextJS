"use client";
import React, { useState } from "react";
import styles from "./styles/signInForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { demoSignIn, userSignIn } from "@/lib/api/auth/authApi";
import EmailIcon from "../Common/Icons/EmailIcon";
import SubmitBtnIcon from "../Common/Icons/SubmitBtnIcon";
import Link from "next/link";
import Spinner from "../Common/Icons/Spinner";
import VerifyOtpForm from "./VerifyOtpForm";
import CrossIcon from "../Common/Icons/CrossIcon";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [isDemoLogin, setIsDemoLogin] = useState(false);
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
        const res = await userSignIn(values.email);
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

  const handleDemoLogin = async () => {
    try {
      formik.setSubmitting(true);
      const demoRes = await demoSignIn();
      if (demoRes.error) {
        formik.setErrors({ formError: demoRes.message || "Unexpected error" });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Demo sign-in error:", error);
      formik.setErrors({
        formError: error.message || "Failed to sign in with demo account",
      });
    } finally {
      formik.setSubmitting(false);
      setIsDemoLogin(false);
    }
  };
  return (
    <div className={styles.pageWrapper}>
      {showOtpForm ? (
        <VerifyOtpForm email={formik.values.email} />
      ) : (
        <div className={styles.signInFormWrapper}>
          <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
            <div className={styles.headerCell}>
              <Link className={styles.closeLink} href="/">
                <div className={styles.closeIconDiv}>
                  <CrossIcon />
                </div>
              </Link>
            </div>
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
                  {formik.isSubmitting && !isDemoLogin ? (
                    <Spinner />
                  ) : (
                    <SubmitBtnIcon />
                  )}
                </button>
              </div>
            </div>
            <div className={styles.footerCell}>
              <p>Not yet Registered ?</p>
              <Link className={styles.footerLink} href="/auth/signup">
                <p>SignUp</p>
              </Link>
            </div>
            <div className={styles.demoLoginCell}>
              <button
                type="button"
                onClick={() => {
                  handleDemoLogin();
                  setIsDemoLogin((prev) => !prev);
                }}
                className={`${styles.demoLoginBtn}`}
                disabled={formik.isSubmitting}
              >
                <div className={styles.btnTextDiv}>
                  <p>Demo Login</p>
                </div>
                <div className={styles.demoBtnIconDiv}>
                  {formik.isSubmitting && isDemoLogin ? (
                    <Spinner color={"#635DB0"} />
                  ) : (
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
