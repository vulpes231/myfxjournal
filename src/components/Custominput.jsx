import React from "react";
import { styles } from "../styles";

const Custominput = ({
  type,
  name,
  customClass,
  value,
  handleChange,
  placeHolder,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={`${customClass} ${styles.secondary.border} w-full p-2`}
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  );
};

export default Custominput;
