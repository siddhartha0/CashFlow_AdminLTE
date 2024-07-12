import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const UpdateAsset = () => {
  const { id } = useParams();
  const location = useLocation();
  const asset = location.state?.asset || {};

  const [formData, setFormData] = useState({
    userId: asset.userId || "",
    name: asset.name || "",
    value: asset.value || "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <h1>Update Asset</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Asset Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Asset Value</label>
          <input
            type="number"
            className="form-control"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateAsset;
