import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1364BA",
    padding: "10px 20px",
    color: "#fff",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 20px",
    fontSize: "18px",
  };

  return (
    <nav style={navStyle}>
      <div>
        <h1>Aul Shopping</h1>
      </div>
      <div>
        <a href="#home" style={linkStyle}>
          Home
        </a>
        <a href="#cart" style={linkStyle}>
          Cart
        </a>
        <Link style={linkStyle} to={"/login"}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
