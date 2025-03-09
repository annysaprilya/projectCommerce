import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router"; // Import useNavigate dari react-router-dom
import toast, { Toaster } from "react-hot-toast";

const Create = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    categoryId: "",
    image: "",
    description: "",
    stock: "",
  });
  const navigate = useNavigate(); // Hook untuk navigasi
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.post(`http://localhost:3003/products`, {
        name: formData.name,
        price: parseFloat(formData.price), // Pastikan price adalah number
        categoryId: parseInt(formData.categoryId), // Pastikan categoryId adalah number
        userId: datauser.userId,
        image: formData.image,
        description: formData.description,
        stock: parseInt(formData.stock), // Pastikan stock adalah number
      });
      toast.success(`Data Berhasil ditambahkan`);
      navigate("/admin"); // Pindah ke halaman Admin setelah submit berhasil
    } catch (error) {
      console.log(error);
      toast.error(`Gagal menambahkan data`);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="name">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  id="name"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="price">
                Price
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  step="0.01"
                  min="1"
                  id="price"
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      price: event.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Category</label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="category"
                  value={formData.categoryId}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      categoryId: event.target.value,
                    });
                  }}
                >
                  <option value="1">T-Shirts</option>
                  <option value="2">Jeans</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Image</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      image: event.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Stock</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      stock: event.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/admin" role="button">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;