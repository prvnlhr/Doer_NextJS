import React from "react";
import { SpinnerCircular } from "spinners-react";

const Spinner = ({ color }) => {
  return (
    <SpinnerCircular
      thickness={250}
      style={{ height: "70%" }}
      speed={140}
      color={color ? color : "white"}
      secondaryColor="transparent"
    />
  );
};

export default Spinner;
