import { Component } from "react";

export default class MenuOptionModel extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <select className="custom-select" id="inputGroupSelect01">
          <option selected>overall</option>
          <option value="0">June-July</option>
          <option value="1">May-June</option>
          <option value="2">April-May</option>
          <option value="3">March-April</option>
        </select>
      </div>
    );
  }
}
