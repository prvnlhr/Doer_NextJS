"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const DeletePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/admin/courses`);
  }, []);
  return <></>;
};

export default DeletePage;
