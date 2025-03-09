import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const AdminCategory = () => {
  const [category, setCategory] = useState([]);
  // let { id } = useParams();
  const navigate = useNavigate(); // Hook untuk navigasi

  function getCategory() {
    fetch(`http://localhost:3003/categories`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        alert("Unable to get the data");
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/categories`);
        console.log(response.data);
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/categories/${id}`);
      toast.success(`Data Berhasil dihapus`);
      navigate("/admincategory");
    } catch (error) {
      console.log(error);
      toast.error(`Gagal menghapus data`);
    }
  };

  useEffect(getCategory, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 mt-4"> Categoryt List </h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/admincategory/createcategory" role="button">
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
          </tr>
        </thead>
        <tbody>
          {category.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>

                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  {/* <Link className="btn btn-primary btn-sm me-1" to={"admin/products/edit/" + product.id}>
                    Edit
                  </Link> */}
                  <Link className="btn btn-primary btn-sm me-1" to={"/admincategory/editcategory/" + category.id} role="button">
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

export default AdminCategory;
