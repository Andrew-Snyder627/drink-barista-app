import { useState } from "react";

function useFormFields(initialState) {
  const [fields, setFields] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function resetFields() {
    setFields(initialState);
  }

  return [fields, handleChange, resetFields];
}

export default useFormFields;
