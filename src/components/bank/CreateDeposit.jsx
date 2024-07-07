import { Component } from "react";

export default class CreateDeposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      type: "",
      cashType: "",
      amount: "",
      fromAccountId: "",
      toAccountId: "",
      issuedAt: "",
      remarks: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  render() {
    return (
      <div className="container">
        <h2>Create Deposit</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Cash Type</label>
            <input
              type="text"
              name="cashType"
              value={this.state.cashType}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>From Account ID</label>
            <input
              type="text"
              name="fromAccountId"
              value={this.state.fromAccountId}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>To Account ID</label>
            <input
              type="text"
              name="toAccountId"
              value={this.state.toAccountId}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Issued At</label>
            <input
              type="date"
              name="issuedAt"
              value={this.state.issuedAt}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={this.state.remarks}
              onChange={this.handleChange}
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
