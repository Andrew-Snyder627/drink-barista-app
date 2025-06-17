import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Shop
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Admin
      </NavLink>
    </nav>
  );
}

export default NavBar;
