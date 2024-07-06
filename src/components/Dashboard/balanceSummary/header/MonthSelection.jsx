import { Component } from "react";
import PropTypes from "prop-types";

export default class MonthSelection extends Component {
  durationHeader = [];
  static propTypes = {
    months: PropTypes.string,
    selectMonth: PropTypes.func,
    currentId: PropTypes.number,
  };

  constructor(props) {
    super(props);
    var { months } = props;
    if (months) {
      const newMonths = ["overall", ...months];
      months = newMonths;
    }

    months?.map((month, i) => {
      const headerData = {
        month: month,
        id: i,
      };
      this.durationHeader = [...this.durationHeader, headerData];
    });
  }

  render() {
    const { selectMonth } = this.props;
    return (
      <div
        className="d-flex card-body"
        style={{
          maxWidth: "550px",
          //   marginTop: "20px",
          overflowX: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <select
          onChange={(e) => {
            selectMonth(parseInt(e.target.value));
          }}
        >
          {this.durationHeader?.map((month, i) => (
            <option key={i} value={i}>
              {month.month}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
