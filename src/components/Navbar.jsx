import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken")
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1364BA",
    padding: "10px 20px",
    color: "#fff",
    zIndex: 100,
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 20px",
    fontSize: "18px",
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div>
        <h1>Aul Shopping</h1>
      </div>
      <div>
        <Link style={linkStyle} to="/home">
          Home
        </Link>
        <Link style={linkStyle} to="/CartList">
          Cart
        </Link>
        {isAuthenticated && datauser ? (
          <>
            <span style={linkStyle}>{datauser.email}</span>
            <button style={{ ...linkStyle, backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
            <Link style={linkStyle} to="/login">
                Login
            </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;