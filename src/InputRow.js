import React from "react";
import useFormField from "./useFormField";

const InputRow = ({ label, fieldId }) => {
  const { input, meta } = useFormField(fieldId);
  const { active, errorMessage } = meta;
  return (
    <div className={active ? "active" : ""}>
      <label>{label}</label>
      <input {...input} placeholder={label} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default InputRow;
