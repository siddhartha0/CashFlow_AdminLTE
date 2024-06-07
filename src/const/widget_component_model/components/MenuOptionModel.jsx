import { Component } from "react";
import PropTypes from "prop-types";

export default class MenuOptionModel extends Component {
  static propTypes = {
    option: PropTypes.array,
    PickPlatform: PropTypes.func,
    selectedPlatform: PropTypes.string,
    id: PropTypes.string,
  };

  selectValue(e) {
    console.log(e.target.value);
  }

  render() {
    const { option, PickPlatform, selectedPlatform, id } = this.props;
    return (
      <div className="input-group ">
        <select
          className={`custom-select text-md ${
            id === "indi_Wallet_Bank"
              ? selectedPlatform === "Bank"
                ? "bg-primary"
                : "bg-success"
              : ""
          }`}
          id="inputGroupSelect01"
          onChange={(e) => PickPlatform(e)}
        >
          {option?.map((opt) => (
            <option value={opt.value} key={opt?.title} className="bg-white ">
              {opt.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
