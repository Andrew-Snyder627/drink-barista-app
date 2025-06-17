import React from "react";
import Button from "@mui/material/Button";
import styles from "./SubmitButton.module.css";

function SubmitButton({ children }) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      className={styles.button}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
