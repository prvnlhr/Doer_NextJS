import React from "react";
import styles from "./styles/courseList.module.scss";
import CourseCard from "./CourseCard";

const CoursesList = ({ courses }) => {
  const coursesx = [
    {
      title: "JavaScript",
      id: "01",
      chapters: [
        {
          title: "Introduction",
          id: "01-01",
          topics: [
            { title: "What is JavaScript?", id: "01-01-01" },
            { title: "History of JavaScript", id: "01-01-02" },
          ],
        },
        {
          title: "Variables and Data Types",
          id: "01-02",
          topics: [
            { title: "Variables", id: "01-02-01" },
            { title: "Data Types", id: "01-02-02" },
            { title: "Type Conversion", id: "01-02-03" },
          ],
        },
        {
          title: "Functions",
          id: "01-03",
          topics: [
            { title: "Function Declarations", id: "01-03-01" },
            { title: "Function Expressions", id: "01-03-02" },
            { title: "Arrow Functions", id: "01-03-03" },
          ],
        },
      ],
    },
    {
      title: "C++",
      id: "02",
      chapters: [
        {
          title: "Basics",
          id: "02-01",
          topics: [
            { title: "Syntax", id: "02-01-01" },
            { title: "Variables", id: "02-01-02" },
          ],
        },
        {
          title: "Object-Oriented Programming",
          id: "02-02",
          topics: [
            { title: "Classes and Objects", id: "02-02-01" },
            { title: "Inheritance", id: "02-02-02" },
          ],
        },
      ],
    },
    {
      title: "Python",
      id: "03",
      chapters: [
        {
          title: "Getting Started",
          id: "03-01",
          topics: [
            { title: "Introduction", id: "03-01-01" },
            { title: "Installation", id: "03-01-02" },
            { title: "First Program", id: "03-01-03" },
          ],
        },
        {
          title: "Data Structures",
          id: "03-02",
          topics: [
            { title: "Lists", id: "03-02-01" },
            { title: "Tuples", id: "03-02-02" },
            { title: "Dictionaries", id: "03-02-03" },
            { title: "Sets", id: "03-02-04" },
          ],
        },
        {
          title: "Advanced Topics",
          id: "03-03",
          topics: [
            { title: "Decorators", id: "03-03-01" },
            { title: "Generators", id: "03-03-02" },
          ],
        },
      ],
    },
    {
      title: "React",
      id: "04",
      chapters: [
        {
          title: "Fundamentals",
          id: "04-01",
          topics: [
            { title: "Components", id: "04-01-01" },
            { title: "JSX", id: "04-01-02" },
            { title: "Props and State", id: "04-01-03" },
          ],
        },
        {
          title: "Hooks",
          id: "04-02",
          topics: [
            { title: "useState", id: "04-02-01" },
            { title: "useEffect", id: "04-02-02" },
            { title: "Custom Hooks", id: "04-02-03" },
          ],
        },
        {
          title: "Advanced Guides",
          id: "04-03",
          topics: [
            { title: "Context", id: "04-03-01" },
            { title: "Refs", id: "04-03-02" },
            { title: "Error Boundaries", id: "04-03-03" },
          ],
        },
        {
          title: "Performance",
          id: "04-04",
          topics: [
            { title: "React.memo", id: "04-04-01" },
            { title: "useCallback", id: "04-04-02" },
            { title: "useMemo", id: "04-04-03" },
          ],
        },
      ],
    },
  ];
  return (
    <div className={styles.courseListWrapper}>
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
};

export default CoursesList;
