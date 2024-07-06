import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWithdraw = () => {
  const [form, setForm] = useState({
    userId: "",
    type: "",
    cashType: "",
    amount: "",
    fromAccountId: "",
    toAccountId: "",
    issuedAt: "",
    remarks: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", form);
    // Navigate back to the Withdraw page or another page
    navigate("/withdraw");
  };

  return (
    <div className="container">
      <h2>Create Withdraw</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cashType">Cash Type</label>
          <input
            type="text"
            className="form-control"
            id="cashType"
            name="cashType"
            value={form.cashType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromAccountId">From Account ID</label>
          <input
            type="text"
            className="form-control"
            id="fromAccountId"
            name="fromAccountId"
            value={form.fromAccountId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toAccountId">To Account ID</label>
          <input
            type="text"
            className="form-control"
            id="toAccountId"
            name="toAccountId"
            value={form.toAccountId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issuedAt">Issued At</label>
          <input
            type="date"
            className="form-control"
            id="issuedAt"
            name="issuedAt"
            value={form.issuedAt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            className="form-control"
            id="remarks"
            name="remarks"
            value={form.remarks}
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

export default CreateWithdraw;
