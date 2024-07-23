"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/topicForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import CKeditor from "../CKeditor/CKeditor";
import ChevronRightIcon from "@/components/Common/Icons/ChevronRightIcon";
import { useParams, useRouter } from "next/navigation";
import { createTopic, updateTopic } from "@/lib/api/admin/topicsApi";
import Spinner from "@/components/Common/Icons/Spinner";
import CrossIcon from "@/components/Common/Icons/CrossIcon";

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

const TopicForm = ({ topic }) => {
  const router = useRouter();
  const [initialDuration, setInitialDuration] = useState(0);

  const [selectedStatus, setSelectedStatus] = useState(
    topic ? topic.status : true
  );
  const [showPreviewPane, setShowPreviewPane] = useState(true);

  const params = useParams();
  function convertToMinutes(days, hours, minutes) {
    const minutesPerDay = 24 * 60;
    const minutesPerHour = 60;
    return days * minutesPerDay + hours * minutesPerHour + minutes;
  }

  function convertMinutes(minutes) {
    const days = Math.floor(minutes / (24 * 60));
    const remainingMinutesAfterDays = minutes % (24 * 60);
    const hours = Math.floor(remainingMinutesAfterDays / 60);
    const remainingMinutes = remainingMinutesAfterDays % 60;

    return {
      minutes: remainingMinutes,
      hours: hours,
      days: days,
    };
  }

  const initialValues = {
    title: topic ? topic.title : "",
    minutes: 0,
    hours: 0,
    days: 0,
    status: topic ? topic.status : true,
    content: topic ? topic.content : "",
  };

  const toggleStatus = () => {
    formik.setFieldValue("status", formik.values.status === 1 ? 0 : 1);
    setSelectedStatus((prev) => !prev);
  };

  const togglePreviewPane = () => {
    setShowPreviewPane((prev) => !prev);
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
    status: Yup.boolean().required("Status is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const topicData = {
        title: values.title,
        status: values.status,
        content: values.content,
      };

      const durationInMinutes = convertToMinutes(
        formik.values.days,
        formik.values.hours,
        formik.values.minutes
      );

      const duration = durationInMinutes - initialDuration;
      topicData.duration = duration;

      console.log(values);
      return;

      let res;
      try {
        if (topic) {
          res = await updateTopic(
            topicData,
            params.courseId,
            params.chapterId,
            params.topicId
          );
          setInitialDuration(res.duration);
        } else {
          res = await createTopic(topicData, params.courseId, params.chapterId);
          if (res && res._id) {
            router.push(`${res._id}/edit`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (topic && topic.duration) {
      setInitialDuration(topic.duration);
      const durationObj = convertMinutes(topic.duration);
      formik.setFieldValue("minutes", durationObj.minutes);
      formik.setFieldValue("hours", durationObj.hours);
      formik.setFieldValue("days", durationObj.days);
      formik.setFieldValue("status", topic.status);
      setSelectedStatus(topic.status);
    }
  }, [topic]);

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
        >
          <div className={styles.formGridContainer}>
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
              <div
                className={`
                  ${styles.inputGroup}
                   ${styles.statusInputGroup}`}
              >
                <div className={styles.statusInputGroup__labelDiv}>
                  <p>Status</p>
                </div>
                <div className={styles.statusInputGroup__inputBtnWrapper}>
                  <input
                    type="radio"
                    id="activeStatus"
                    checked={selectedStatus === true}
                    onChange={toggleStatus}
                  />
                  <label
                    className={`${styles.btnWrapper} ${
                      selectedStatus && styles["btnWrapper--activeBtn"]
                    }`}
                    htmlFor="activeStatus"
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          selectedStatus && styles["radioDot--activeDot"]
                        }`}
                      ></div>
                    </div>
                    <p>Active</p>
                  </label>
                  <input
                    type="radio"
                    id="inactiveStatus"
                    checked={selectedStatus === false}
                    onChange={toggleStatus}
                  />
                  <label
                    className={`${styles.btnWrapper} ${
                      !selectedStatus && styles["btnWrapper--inactiveBtn"]
                    }`}
                    htmlFor="inactiveStatus"
                  >
                    <div className={styles.radioDotDiv}>
                      <div
                        className={`${styles.radioDot} ${
                          !selectedStatus && styles["radioDot--inactiveDot"]
                        }`}
                      ></div>
                    </div>
                    <p>Inative</p>
                  </label>
                </div>
              </div>
              <div className={styles.errorGroup}>
                {formik.errors.status && formik.touched.status && (
                  <p>{formik.errors.status}</p>
                )}
              </div>
            </div>
            <div className={styles.editorCell}>
              <div className={styles.editorCell__editorHeaderWrapper}>
                <div
                  className={
                    styles.editorCell__editorHeaderWrapper__labelWrapper
                  }
                >
                  <p>Topic content</p>
                </div>
                <div
                  className={
                    styles.editorCell__editorHeaderWrapper__previewBtnWrapper
                  }
                >
                  <button
                    onClick={togglePreviewPane}
                    type="button"
                    className={styles.previewBtn}
                  >
                    <p>Preview</p>
                  </button>
                </div>
              </div>
              <div className={styles.editorCell__editorContainer}>
                <CKeditor
                  content={topic ? topic.content : ""}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
              <div className={styles.editorCell__errorGroup}>
                {formik.errors.content && formik.touched.content && (
                  <p>{formik.errors.content}</p>
                )}
              </div>
            </div>
            <div className={styles.buttonCell}>
              <button disabled={formik.isSubmitting} type="submit">
                {formik.isSubmitting ? (
                  <div className={styles.spinnerDiv}>
                    <Spinner />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
        <div
          className={`${styles.previewWrapper} ${
            showPreviewPane
              ? styles["previewWrapper--showPane"]
              : styles["previewWrapper--hidePane"]
          }`}
        >
          <div className={styles.previewWrapper__headerWrapper}>
            <div className={styles.previewWrapper__headerWrapper__textWrapper}>
              <p>CONTENT PREVIEW</p>
            </div>
            <div
              onClick={togglePreviewPane}
              className={styles.previewWrapper__headerWrapper__toggleWrapper}
            >
              <div className={styles.closePreviewBtnDiv}>
                <CrossIcon />
              </div>
            </div>
          </div>
          <div className={styles.previewWrapper__contentWrapper}>
            <div
              dangerouslySetInnerHTML={{
                __html: formik.values.content,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicForm;
