import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { updateDrink } from "../../api/drinks";
import TextInput from "../TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./EditDrinkForm.module.css";

function EditDrinkForm({ id, onUpdated }) {
  const {
    data: drink,
    loading,
    error,
  } = useFetch(`http://localhost:4000/drinks/${id}`);

  // Form state
  const [fields, setFields] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  // Populate form when the drink loads
  useEffect(() => {
    if (drink) {
      setFields({
        name: drink.name,
        description: drink.description,
        origin: drink.origin,
        price: drink.price.toString(),
      });
      setMessage("");
    }
  }, [drink]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    // Basic validation
    const { name, description, origin, price } = fields;
    if (!name || !description || !origin || !price) {
      return setMessage("All fields are required.");
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return setMessage("Price must be a non-negative number.");
    }

    try {
      await updateDrink(id, { name, description, origin, price: priceNum });
      setMessage("Drink updated successfully!");
      onUpdated(); // notify parent to refresh list if needed
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  if (loading) return <p>Loading drink…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Edit “{drink.name}”</h3>
      <TextInput
        label="Name"
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

      {message && (
        <div
          className={
            message.startsWith("Error") ? styles.error : styles.success
          }
        >
          {message}
        </div>
      )}

      <SubmitButton>Update Drink</SubmitButton>
    </form>
  );
}

export default EditDrinkForm;
