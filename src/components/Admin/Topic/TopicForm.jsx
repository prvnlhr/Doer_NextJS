"use client";
import React, { useState } from "react";
import styles from "./styles/topicForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import CKeditor from "../CKeditor/CKeditor";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import CkeditorComponent from "@/components/custom-editor2.js";

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
    status: 1,
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
    // content: Yup.string().required("Topic content is required"),
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

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.titleCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <label htmlFor="title">
                  <p>Title</p>
                </label>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              {formik.errors.title && formik.touched.title && (
                <p>{formik.errors.title}</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.durationCell}>
          <div className={styles.durationFormGroup}>
            <DurationInput
              label={"minutes"}
              value={formik.values.minutes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
            <div className={styles.errorGroup}>
              {formik.errors.minutes && formik.touched.minutes && (
                <p>{formik.errors.minutes}</p>
              )}
            </div>
          </div>
          <div className={styles.durationFormGroup}>
            <DurationInput
              label={"hours"}
              value={formik.values.hours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
            <div className={styles.errorGroup}>
              {formik.errors.hours && formik.touched.hours && (
                <p>{formik.errors.hours}</p>
              )}
            </div>
          </div>
          <div className={styles.durationFormGroup}>
            <DurationInput
              label={"days"}
              value={formik.values.days}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={formik}
            />
            <div className={styles.errorGroup}>
              {formik.errors.days && formik.touched.days && (
                <p>{formik.errors.days}</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.statusCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__statusInputGroup}>
              <div className={styles.formGroup__statusInputGroup__labelDiv}>
                <p
                  className={
                    styles.formGroup__statusInputGroup__labelDiv__labelTag
                  }
                >
                  Status
                </p>
              </div>
              <div className={styles.formGroup__statusInputGroup__inputDiv}>
                <div className={styles.statusInputWrapper}>
                  <div
                    onClick={() => setSelectedStatus((prev) => !prev)}
                    className={`${styles.radioBtnWrapper} ${
                      selectedStatus && styles["radioBtnWrapper--activeBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          selectedStatus && styles["radioDotDiv--activeDot"]
                        }`}
                      ></div>
                    </div>
                    <div className={styles.radioLabelDiv}>
                      <p>Active</p>
                    </div>
                  </div>
                </div>
                <div className={styles.statusInputWrapper}>
                  <div
                    onClick={() => setSelectedStatus((prev) => !prev)}
                    className={`${styles.radioBtnWrapper} ${
                      !selectedStatus && styles["radioBtnWrapper--inactiveBtn"]
                    }`}
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          !selectedStatus && styles["radioDotDiv--inactiveDot"]
                        }`}
                      ></div>
                    </div>
                    <div className={styles.radioLabelDiv}>
                      <p>Inactive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}></div>
          </div>
        </div>

        <div className={styles.editorCell}>
          <CKeditor setFieldValue={formik.setFieldValue} />
          
        </div>
        <div className={styles.buttonCell}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm;
