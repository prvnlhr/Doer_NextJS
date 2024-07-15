import React from "react";
import AdminLayout from "@/components/Admin/Layouts/AdminLayout";

const AdminPageLayout = ({ children, modal }) => {
  return <AdminLayout modal={modal}>{children}</AdminLayout>;
};

export default AdminPageLayout;
