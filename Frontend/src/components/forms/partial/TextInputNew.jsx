import { TextField } from "@mui/material";
import { useState } from "react";

export default function TextInput({
  labelText,
  inputType,
  isRequired,
  placeholderText,
  helperText,
  inputProps,
  textFieldProps,
  validationFunction,
  formData,
  setFormData,
}) {
  const [valueDirty, setValueDirty] = useState(false);

  const valueIsValidKey = inputProps.name + "IsValid";

  function handleChange(e) {
    const inputValue = e.target.value;

    setFormData((prevData) => ({
      entity: {
        ...prevData.entity,
        [inputProps.name]: inputValue,
      },
      validation: {
        ...prevData.validation,
        [valueIsValidKey]: validationFunction(inputValue),
      },
    }));
  }

  return (
    <TextField
      label={labelText}
      type={inputType || "text"}
      fullWidth
      margin="dense"
      value={formData.entity[inputProps.name] || ""}
      required={isRequired}
      placeholder={placeholderText}
      inputProps={inputProps}
      {...textFieldProps}
      onBlur={() => {
        setValueDirty(true);
      }}
      error={valueDirty && !formData.validation[valueIsValidKey]}
      helperText={
        valueDirty && !formData.validation[valueIsValidKey]
          ? helperText.error
          : helperText.details
      }
      onChange={handleChange}
    />
  );
}
