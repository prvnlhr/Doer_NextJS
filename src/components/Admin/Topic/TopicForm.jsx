"use client";
import React, { useState } from "react";
import styles from "./styles/topicForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import CKeditor from "../CKeditor/CKeditor";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";

const DurationInput = ({ label, value, onChange, onBlur, formik }) => {
  const incrementHigherUnit = (higherLabel, amount) => {
    const higherValue = parseInt(formik.values[higherLabel] || 0) + amount;
    onChange({ target: { name: higherLabel, value: higherValue } });
  };

  const decrementHigherUnit = (higherLabel, amount) => {
    const higherValue = Math.max(
      0,
      parseInt(formik.values[higherLabel] || 0) - amount
    );
    onChange({ target: { name: higherLabel, value: higherValue } });
  };

  const incrementValue = () => {
    let newValue = parseInt(value || 0) + 1;

    if (label === "minutes" && newValue > 59) {
      newValue = 0;
      incrementHigherUnit("hours", 1);
    } else if (label === "hours" && newValue > 23) {
      newValue = 0;
      incrementHigherUnit("days", 1);
    }
    onChange({ target: { name: label, value: newValue } });
  };

  const decrementValue = () => {
    let newValue = Math.max(0, parseInt(value || 0) - 1);

    if (label === "minutes" && newValue < 0) {
      newValue = 59;
      decrementHigherUnit("hours", 1);
    } else if (label === "hours" && newValue < 0) {
      newValue = 23;
      decrementHigherUnit("days", 1);
    }
    onChange({ target: { name: label, value: newValue } });
  };

  return (
    <div className={styles.durationInputWrapper}>
      <div className={styles.labelGroup}>
        <label htmlFor={label}>
          <p>{label.charAt(0).toUpperCase() + label.slice(1)}</p>
        </label>
      </div>
      <div className={styles.inputBtnGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            id={label}
            name={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.btnContainer}>
            <button type="button" onClick={incrementValue}>
              <ChevronRightIcon color={"#7E8DA4"} />
            </button>
          </div>
          <div className={styles.btnContainer}>
            <button type="button" onClick={decrementValue}>
              <ChevronRightIcon color={"#7E8DA4"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopicForm = () => {
  const [selectedStatus, setSelectedStatus] = useState(1);

  const initialValues = {
    title: "",
    minutes: "",
    hours: "",
    days: "",
    status: selectedStatus,
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(200, "Title must be at most 200 characters")
      .required("Title is required"),
    minutes: Yup.number()
      .min(0, "Minutes must be at least 0")
      .max(59, "Minutes must be less than 60")
      .required("Minutes are required"),
    hours: Yup.number()
      .min(0, "Hours must be at least 0")
      .max(23, "Hours must be less than 24")
      .required("Hours are required"),
    days: Yup.number()
      .min(0, "Days must be at least 0")
      .required("Days are required"),
    content: Yup.string().required("Topic content is required"),
    status: Yup.number().required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      console.log("Form submitted with values:", values);
      // Perform your submission logic here
    },
  });
  const toggleStatus = () => {
    formik.setFieldValue("status", formik.values.status === 1 ? 0 : 1);
    setSelectedStatus((prev) => !prev);
  };

  const [showPreviewPane, setShowPreviewPane] = useState(true);

  const togglePreviewPane = () => {
    console.log("..toggling");
    setShowPreviewPane((prev) => !prev);
  };
  return (
    <div className={styles.formWrapper}>
      <div className={`${styles.formInnerWrapper}`}>
        <form
          className={`${styles.formContainer} ${
            showPreviewPane
              ? styles["formContainer--shrinkForm"]
              : styles["formContainer--expandForm"]
          }`}
          onSubmit={formik.handleSubmit}
          onClick={togglePreviewPane}
        ></form>
        <div
          onClick={togglePreviewPane}
          className={`${styles.previewWrapper} ${
            showPreviewPane
              ? styles["previewWrapper--showPane"]
              : styles["previewWrapper--hidePane"]
          }`}
        ></div>
      </div>
    </div>
  );
};

export default TopicForm;
