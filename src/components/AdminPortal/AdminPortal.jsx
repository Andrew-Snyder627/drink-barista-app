import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductForm from "../ProductForm/ProductForm";
import EditDrinkForm from "../EditDrinkForm/EditDrinkForm";
import styles from "./AdminPortal.module.css";

// AdminPortal renders two sections
// First is the ProductForm for creating new drinks
// Second is the dropdown/EditDrinkForm to update existing drinks

function AdminPortal() {
  // Fetch all drinks so you can pick one to edit
  const {
    data: drinks = [],
    loading,
    error,
  } = useFetch("http://localhost:4000/drinks");
  const [selectedId, setSelectedId] = useState(null);

  function handleUpdated() {
    // After an edit, re-fetch the drinks list by clearing selection
    setSelectedId(null);
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Add a New Drink</h1>
        <ProductForm />
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h2>Edit Existing Drink</h2>

        {loading && <p>Loading drinks…</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && (
          <select
            value={selectedId || ""}
            onChange={(e) => setSelectedId(e.target.value)}
            className={styles.select}
          >
            <option value="" disabled>
              -- Select a drink to edit --
            </option>
            {drinks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        {selectedId && (
          <EditDrinkForm id={selectedId} onUpdated={handleUpdated} />
        )}
      </section>
    </div>
  );
}

export default AdminPortal;
