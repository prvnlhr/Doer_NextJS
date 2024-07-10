"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/verifyOtpForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, signOut, useSession } from "next-auth/react";
import EmailIcon from "../Common/Icons/EmailIcon";
import SubmitBtnIcon from "../Common/Icons/SubmitBtnIcon";
import Link from "next/link";
import Spinner from "../Common/Icons/Spinner";

const VerifyOtpForm = () => {
  const { data, session, status } = useSession();

  const initialOtp = Array(5).fill("");
  const [otp, setOtp] = useState(initialOtp);

  const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{5}$/, "OTP must be exactly 5 digits")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: { otp: otp.join("") },
    validationSchema: verifyOtpSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values);
        const res = await signIn("credentials", {
          email: "prvnlhr522@gmail.com",
          otp: values.otp,
          redirect: false,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  useEffect(() => {
    formik.setFieldValue("otp", otp.join(""));
  }, [otp]);
  return (
    <div className={styles.verifyOtpFormWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.headerCell}>
          <p>OTP Verification</p>
        </div>
        <div className={styles.subHeaderCell}>
          <p>Enter the OTP recieved on</p>
          <p>prvn***@gmail.com</p>
        </div>
        <div className={styles.messageCell}></div>
        <div className={styles.inputCell}>
          <div className={styles.inputGroup}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className={styles.otpInput}
              />
            ))}
          </div>
          <div className={styles.errorGroup}>
            {formik.errors.otp && formik.touched.otp && (
              <p>{formik.errors.otp}</p>
            )}
          </div>
        </div>
        <div className={styles.resendCell}>
          {/* <div className={styles.timerWrapper}>
            <div className={styles.timeDiv}>
              <p>04</p>
            </div>
            :
            <div className={styles.timeDiv}>
              <p>21</p>
            </div>
          </div> */}
          <button type="button">
            <p>Resend OTP</p>
          </button>
        </div>
        <div className={styles.buttonCell}>
          <div className={styles.buttonWrapper}>
            <div className={styles.textDiv}>
              <p>
                Verify<span>OTP</span>
              </p>
            </div>
            <button type="submit" className={styles.submitButton}>
              {formik.isSubmitting ? <Spinner /> : <SubmitBtnIcon />}
            </button>
          </div>
        </div>
        <div className={styles.footerCell}>
          {/* <p>Not yet Registered ?</p>
          <Link className={styles.footerLink} href="/auth/signup">
            <p>SignUp</p>
          </Link> */}
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
