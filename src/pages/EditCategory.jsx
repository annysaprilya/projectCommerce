import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const EditCategory = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: " ",
    name: " "
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await axios.get(`http://localhost:3003/categories/` + id);
          console.log(data.data);
          setFormData(data.data);
        //   navigate("/admincategory");
        } catch (error) {
          console.log(error);
        }
      };    
    fetchData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.put(`http://localhost:3003/categories/` + id, {
        name: formData.name,
        categoryId: formData.categoryId
      });
      toast.success(`Data Berhasil diubah`);
      navigate("/admincategory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Category </h2>

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

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                {/* <Link className="btn btn-secondary" to="/admin/products" role="button">Cancel</Link> */}
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

export default EditCategory;
