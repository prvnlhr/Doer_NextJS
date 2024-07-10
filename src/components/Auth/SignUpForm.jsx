"use client";
import React from "react";
import styles from "./styles/signUpForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "@/lib/api/auth/authApi";
import UserIcon from "../Common/Icons/UserIcon";
import EmailIcon from "../Common/Icons/EmailIcon";
import LocationIcon from "../Common/Icons/LocationIcon";
import SubmitBtnIcon from "../Common/Icons/SubmitBtnIcon";
import Link from "next/link";
import Spinner from "../Common/Icons/Spinner";

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
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
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
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.headerCell}></div>
        <div className={styles.messageCell}></div>

        <div className={styles.fullNameCell}>
          <div className={styles.inputGroup}>
            <div className={styles.iconCell}>
              <div className={styles.iconWrapper}>
                <UserIcon />
              </div>
            </div>
            <div className={styles.labelCell}>
              <label htmlFor="fullname">
                <p>FULLNAME</p>
              </label>
            </div>
            <div className={styles.inputCell}>
              <input
                id="fullname"
                type="text"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your fullname/name"
              />
            </div>
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.fullname && formik.touched.fullname && (
              <p>{formik.errors.fullname}</p>
            )}
          </div>
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
        <div className={styles.countryCell}>
          <div className={styles.inputGroup}>
            <div className={styles.iconCell}>
              <div className={styles.iconWrapper}>
                <LocationIcon />
              </div>
            </div>
            <div className={styles.labelCell}>
              <label htmlFor="country">
                <p>COUNTRY</p>
              </label>
            </div>
            <div className={styles.inputCell}>
              <input
                id="country"
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your country"
              />
            </div>
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.country && formik.touched.country && (
              <p>{formik.errors.country}</p>
            )}
          </div>
        </div>
        <div className={styles.buttonCell}>
          <div className={styles.buttonWrapper}>
            <div className={styles.textDiv}>
              <p>
                Sign<span>Up</span>
              </p>
            </div>
            <button type="submit" className={styles.submitButton}>
              {formik.isSubmitting ? <Spinner /> : <SubmitBtnIcon />}
            </button>
          </div>
        </div>
        <div className={styles.footerCell}>
          <p>Already Registered ?</p>
          <Link className={styles.footerLink} href="/auth/signin">
            <p>SignIn</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
