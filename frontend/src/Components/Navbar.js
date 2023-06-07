import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <button id="navbar-button">
        <MenuIcon />
      </button>
      <div id="navbar-brand">taskover</div>
    </div>
  );
}

export default Navbar;
