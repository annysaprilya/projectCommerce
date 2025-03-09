import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import baju from "/baju.jpg";
import axios from "axios";
import Hero from "../components/Hero";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/products`);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const renderProductCards = () => {
    return products.map((product, index) => (
      <div
        key={index}
        style={{
          flex: "1 1 calc(33.333% - 20px)",
          margin: "10px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{product.name}</h2>
        <img src={baju} alt="" width={300} />
        <p style={{ textAlign: "center", marginBottom: "20px" }}>{product.description}</p>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>{product.price}</p>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>{product.stock}</p>

        <form style={{ ...formStyle, alignItems: "center" }}>
        <button
            type="submit"
            style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
            }}
        >
            <Link to={`/detailproduk/${product.id}`} style={{color:"#fff", textDecoration:"none"}}>Detail Product</Link>
        </button>
        </form>
      </div>
    ));
  };

  return (
    <div>
      <Navbar />
      <Hero />
      {/* <h1 style={{ textAlign: "center" }}>Beranda Product</h1> */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "20px" }}>{renderProductCards()}</div>
    </div>
  );
};

export default Home;
