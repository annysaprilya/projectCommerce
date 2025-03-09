import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const Edit = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: " ",
    name: " ",
    price: " ",
    categoryId: " ",
    image: ``,
    description: " ",
    stock: " ",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.put(`http://localhost:3003/products/` + id);
        console.log(data.data);
        setFormData(data.data);
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.put(`http://localhost:3003/products/` + id, {
        name: formData.name,
        price: formData.price,
        categoryId: formData.categoryId,
        image: formData.image,
        description: formData.description,
        stock: formData.stock,
      });
      toast.success(`Data Berhasil diubah`);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">ID</label>
              <div className="col-sm-8">
                <input readOnly className="form-control-plaintext" defaultValue={id} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
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
              <label className="col-sm-4 col-form-label">Price</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  step="0.01"
                  min="1"
                  value={formData.price}
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
                  rows="4"
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
                  name="description"
                  rows="4"
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
                {/* <Link className="btn btn-secondary" to="/admin/products" role="button">Cancel</Link> */}
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

export default Edit;
