import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./TextInput.module.css";

function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  helperText,
}) {
  return (
    <div className={styles.wrapper}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        error={!!error}
        helperText={helperText}
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default TextInput;
