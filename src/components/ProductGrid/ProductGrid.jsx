import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

// ProductGrid lays out a grid of drink cards.

function ProductGrid({ drinks }) {
  return (
    <div className={styles.grid}>
      {drinks.map((drink) => (
        <ProductCard key={drink.id} drink={drink} />
      ))}
    </div>
  );
}

export default ProductGrid;
