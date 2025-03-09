import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const Admin = () => {
  const [product, setProducts] = useState([]);
  // let { id } = useParams();
  const navigate = useNavigate(); // Hook untuk navigasi

  function getProducts() {
    fetch("http://localhost:3003/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        alert("Unable to get the data");
      });
  }

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/products/${id}`);
      toast.success(`Data Berhasil dihapus`);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error(`Gagal menghapus data`);
    }
  };

  useEffect(getProducts, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 mt-4"> Product List </h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/admin/create" role="button">
            Create
          </Link>
        </div>
        <div className="col"></div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>CategoryId</th>
            <th>Image</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.categoryId}</td>
                <td>
                  <img src={product.image} width="100" alt={product.name}></img>
                </td>
                <td>{product.description}</td>
                <td>{product.stock}</td>

                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  {/* <Link className="btn btn-primary btn-sm me-1" to={"admin/products/edit/" + product.id}>
                    Edit
                  </Link> */}
                  <Link className="btn btn-primary btn-sm me-1" to={"/admin/edit/" + product.id} role="button">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
