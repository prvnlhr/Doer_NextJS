import React from "react";
import MainLayout from "@/components/Admin/MainLayout/MainLayout";

const AdminPageLayout = ({ children, modal }) => {
  return (
    <MainLayout>
      {modal}
      {children}
    </MainLayout>
  );
};

export default AdminPageLayout;
