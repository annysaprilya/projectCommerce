import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router"; // Import useNavigate dari react-router-dom
import toast, { Toaster } from "react-hot-toast";

const CreateCategory = () => {
  const [formData, setFormData] = React.useState({
    // categoryId: "",
    name: ""
  });
  const navigate = useNavigate(); // Hook untuk navigasi
  const storedUser = localStorage.getItem("user");
  const datauser = JSON.parse(storedUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.post(`http://localhost:3003/categories`, {
        // categoryId: parseInt(formData.categoryId), // Pastikan categoryId adalah number
        name: formData.name

      });
      toast.success(`Data Berhasil ditambahkan`);
      navigate("/admincategory"); // Pindah ke halaman Admin setelah submit berhasil
    } catch (error) {
      console.log(error);
      toast.error(`Gagal menambahkan data`);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Category</h2>

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

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to="/admincategory" role="button">
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

export default CreateCategory;