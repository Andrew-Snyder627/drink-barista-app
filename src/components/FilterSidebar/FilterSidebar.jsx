import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./FilterSidebar.module.css";

// FilterSidebar renders a search input for filtering drinks.

function FilterSidebar({ search, setSearch }) {
  return (
    <div className={styles.sidebar}>
      <TextField
        label="Search Drinks"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
    </div>
  );
}

export default FilterSidebar;
