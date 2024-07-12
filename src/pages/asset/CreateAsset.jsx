import React, { Component } from "react";

export default class CreateAsset extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      name: "",
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", this.state);
  };

  render() {
    const { userId, name, value } = this.state;

    return (
      <div>
        <h1>Create Asset</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              value={userId}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Asset Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Asset Value</label>
            <input
              type="number"
              className="form-control"
              id="value"
              name="value"
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
