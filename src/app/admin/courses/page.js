import Datatable from "@/components/Admin/Datatable/Datatable";
import { fetchCourses } from "@/lib/api/admin/coursesApi";
import React from "react";

const CoursesPage = async () => {
  
  const courses = await fetchCourses();

  const getEditUrl = (courseId) => {
    return `/admin/courses/${courseId}/edit`;
  };

  const getAddUrl = () => {
    return `/admin/courses/add`;
  };
  const columns = ["title", "chapters", "status"];

  return (
    /*
      Datatable component takes four props:
      1. data -> Array of objects representing the rows to display in the table
      2. columns -> Array of column names to render/show in the table header
      3. getEditUrl -> Function to generate the edit URL for each row
      4. getAddUrl -> Function to generate the URL for adding a new row
    */
    <Datatable
      data={courses}
      columns={columns}
      getEditUrl={getEditUrl}
      getAddUrl={getAddUrl}
    />
  );
};

export default CoursesPage;
