import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import styles from "./ShopPage.module.css";

// ShopPage displays a list of drinks fetched from teh API
// Includes a search filter via FliterSidebar

function ShopPage() {
  const {
    data: drinksData,
    loading,
    error,
  } = useFetch("http://localhost:4000/drinks");
  const [search, setSearch] = useState("");

  // 1) Short-circuit on loading / error
  if (loading) return <div className={styles.message}>Loading drinks…</div>;
  if (error) return <div className={styles.message}>Error: {error}</div>;

  // 2) Now that fetch is done, data should be an array — but just in case:
  const drinks = Array.isArray(drinksData) ? drinksData : [];

  // 3) Safe to filter
  const filteredDrinks = drinks.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar search={search} setSearch={setSearch} />
      </aside>
      <main className={styles.main}>
        <ProductGrid drinks={filteredDrinks} />
      </main>
    </div>
  );
}

export default ShopPage;
