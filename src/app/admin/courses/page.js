import Datatable from "@/components/Admin/Datatable/Datatable";
import React from "react";
import { courses } from "@/components/courseData";
const CoursesPage = () => {
  const getEditUrl = (slug) => {
    return `/admin/courses/${slug}/edit`;
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
