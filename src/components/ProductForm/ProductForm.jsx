import React, { useState } from "react";
import useFormFields from "../../hooks/useFormFields";
import { createDrink } from "../../api/drinks";
import TextInput from "../TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./ProductForm.module.css";

function ProductForm() {
  const [fields, handleChange, resetFields] = useFormFields({
    name: "",
    description: "",
    origin: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    const { name, description, origin, price } = fields;
    if (!name || !description || !origin || !price) {
      return setError("All fields are required.");
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return setError("Price must be a non-negative number.");
    }

    try {
      await createDrink({ ...fields, price: priceNum });
      setSuccess("Drink successfully created!");
      resetFields();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <TextInput
        label="Drink Name"
        name="name"
        value={fields.name}
        onChange={handleChange}
      />
      <TextInput
        label="Description"
        name="description"
        value={fields.description}
        onChange={handleChange}
      />
      <TextInput
        label="Origin"
        name="origin"
        value={fields.origin}
        onChange={handleChange}
      />
      <TextInput
        label="Price"
        name="price"
        type="number"
        value={fields.price}
        onChange={handleChange}
      />

      <SubmitButton>Create Drink</SubmitButton>
    </form>
  );
}

export default ProductForm;
