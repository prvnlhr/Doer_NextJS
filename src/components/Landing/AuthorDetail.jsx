"use client";
import React from "react";

const AuthorDetail = () => {
  function decodeAuthorDetails() {
    let ascii = [80, 82, 65, 86, 69, 69, 78, 32, 76, 79, 72, 65, 82];
    let author = ascii.map((val) => String.fromCharCode(val));
    alert(author.join(""));
  }
  decodeAuthorDetails(decodeAuthorDetails);
  return <></>;
};

export default AuthorDetail;
