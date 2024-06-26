import React from "react";
import styles from "./styles/courseForm.module.scss";
const CourseForm = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer}>
        <div className={styles.formContainer__logoCell}>
          <div className={styles.logoFormGroup}>
            <div className={styles.logoFormGroup__inputGroup}>
              {/* File input with hidden "Choose File" button */}
              <input
                type="file"
                id="logoInput"
                className={styles.fileInput}
                // onChange={handleFileChange}
                accept="image/*" // Optional: Limit to specific file types
              />
              {/* Custom styled box to indicate file input */}
              <label htmlFor="logoInput" className={styles.fileInputLabel}>
                Drag and drop or click to upload
              </label>
            </div>
            <div className={styles.logoFormGroup__errorGroup}>
              <p>Course Logo is required</p>
            </div>
          </div>
        </div>
        <div className={styles.formContainer__titleCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <p>Title</p>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <input value={"Javascript - Basic to Advanced"} />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              <p>Title is required</p>
            </div>
          </div>
        </div>
        <div className={styles.formContainer__descriptionCell}>
          <div className={styles.formGroup}>
            <div className={styles.formGroup__inputGroup}>
              <div className={styles.formGroup__inputGroup__labelDiv}>
                <p>Description</p>
              </div>
              <div className={styles.formGroup__inputGroup__inputDiv}>
                <textarea
                  value={
                    "JavaScript (JS) is a versatile and dynamic programming language primarily used for enhancing the interactivity of web pages. Developed initially as a client-side scripting language for web browsers, JS has evolved into a ubiquitous language capable of running on both client and server sides through frameworks like Node.js. Its flexibility allows developers to create dynamic, responsive user interfaces and web applications. JS supports object-oriented, imperative, and functional programming paradigms, making it suitable for a wide range of tasks from simple DOM manipulation to complex application development. Its widespread adoption and continuous evolution through ECMAScript"
                  }
                />
              </div>
            </div>
            <div className={styles.formGroup__errorGroup}>
              <p>Description is required</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
