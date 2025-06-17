import React from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ drink }) {
  const { name, description, origin, price } = drink;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.desc}>{description}</p>
      <p className={styles.origin}>Origin: {origin}</p>
      <p className={styles.price}>${price.toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;
