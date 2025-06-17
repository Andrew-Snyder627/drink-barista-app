import React from "react";
import ProductForm from "../ProductForm/ProductForm";

function AdminPortal() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add a New Drink</h1>
      <ProductForm />
    </div>
  );
}

export default AdminPortal;
