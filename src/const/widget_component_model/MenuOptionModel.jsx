import { Component } from "react";
import PropTypes from "prop-types";

export default class MenuOptionModel extends Component {
  static propTypes = {
    option: PropTypes.array,
    PickPlatform: PropTypes.func,
  };

  selectValue(e) {
    console.log(e.target.value);
  }

  render() {
    const { option, PickPlatform } = this.props;
    return (
      <div className="input-group mb-3 ">
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={(e) => PickPlatform(e)}
          // value={selectedPlatform}
        >
          {option?.map((opt) => (
            <option key={opt?.title} value={opt.value}>
              {opt.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
