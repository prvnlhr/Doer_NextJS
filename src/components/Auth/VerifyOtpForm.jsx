import React from "react";
import styles from "./styles/verifyOtpForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOtp } from "@/lib/api/auth/authApi";

const VerifyOtpForm = () => {
  const initialValues = {
    otp: "",
  };

  const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: verifyOtpSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await verifyOtp(values.otp);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.verifyOtpFormWrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your OTP"
            className={
              formik.errors.otp && formik.touched.otp ? styles.inputError : ""
            }
          />
          {formik.errors.otp && formik.touched.otp ? (
            <div className={styles.error}>{formik.errors.otp}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
