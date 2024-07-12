"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/verifyOtpForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitBtnIcon from "../Common/Icons/SubmitBtnIcon";
import Spinner from "../Common/Icons/Spinner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { resendOtp } from "@/lib/api/auth/authApi";

const VerifyOtpForm = ({ email }) => {
  const router = useRouter();

  const initialOtp = Array(5).fill("");
  const [otp, setOtp] = useState(initialOtp);
  const [timer, setTimer] = useState(120);
  const [showResendButton, setShowResendButton] = useState(false);

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
        const res = await signIn("credentials", {
          email: email,
          otp: values.otp,
          redirect: false,
        });
        if (res.error) {
          const error = JSON.parse(res.error);
          throw new Error(error);
        } else {
          console.log("Successfully signed in", res);
          router.push("/");
        }
      } catch (error) {
        console.error("Sign-in error:", error.message);
        setErrors({ formError: "Authentication failed" });
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

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return { minutes, seconds };
  };

  const { minutes, seconds } = formatTime(timer);

  const maskEmail = (email) => {
    if (!email) {
      return "You Email address";
    }
    const [username, domain] = email.split("@");
    const maskedUsername = `${username.slice(0, 3)}***${username.charAt(
      username.length - 1
    )}`;
    return `${maskedUsername}@${domain}`;
  };

  const resendOtpHandler = async () => {
    try {
      formik.setSubmitting(true);
      const resendRes = await resendOtp(email);
      if (resendRes.message === "OTP sent successfully") {
        setTimer(120);
        setShowResendButton(false);
        formik.setErrors({
          formError: resendRes.message || "Enter the new OTP",
        });
      } else {
        console.log("ERROR", resendRes);
        formik.setErrors({
          formError: resendRes.message || "Unexpected error",
        });
      }
    } catch (error) {
      console.log("ERROR2", error);
      console.error("Resend OTP error:", error);
      formik.setErrors({ formError: error.message || "Resend OTP error" });
    } finally {
      formik.setSubmitting(false);
    }
  };
  return (
    <div className={styles.verifyOtpFormWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.headerCell}>
          <p>OTP Verification</p>
        </div>
        <div className={styles.subHeaderCell}>
          <p>Enter the OTP received on</p>
          <p>{maskEmail(email)}</p>
        </div>
        <div className={styles.messageCell}>
          {formik.errors.formError && (
            <div className={styles.messageDiv}>
              <p>{formik.errors.formError}</p>
            </div>
          )}
        </div>
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
          {showResendButton ? (
            <button type="button" onClick={resendOtpHandler}>
              {formik.isSubmitting ? (
                <div className={styles.resendSpinnerDiv}>
                  <Spinner color="#635DB0" />
                </div>
              ) : (
                <p>Resend OTP</p>
              )}
            </button>
          ) : (
            <div className={styles.timerWrapper}>
              <div className={styles.timeDiv}>
                <p>{minutes}</p>
              </div>
              :
              <div className={styles.timeDiv}>
                <p>{seconds}</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonCell}>
          <div className={styles.buttonWrapper}>
            <div className={styles.textDiv}>
              <p>
                Verify<span>OTP</span>
              </p>
            </div>
            <button type="submit" className={styles.submitButton}>
              {formik.isSubmitting && !showResendButton ? (
                <Spinner />
              ) : (
                <SubmitBtnIcon />
              )}
            </button>
          </div>
        </div>
        <div className={styles.footerCell}>
          {/* <p>Not yet Registered ?</p>
            <Link className={styles.footerLink} href="/auth/signup">
              <p>Sign Up</p>
            </Link> */}
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
