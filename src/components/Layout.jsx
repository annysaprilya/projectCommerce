import React from "react";
import { BrowserRouter, Link, useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.clear();

      navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom bpx-shadow">
      <div className="container">
        <Link className="navbar-brand" to={"/admin"}>
          <img src="logo.svg" alt="..." width="120" className="me-2" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/Admin">
                Produk List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/Cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </a>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Layout;
