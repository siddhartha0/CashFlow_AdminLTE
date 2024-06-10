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
    const { selectMonth, currentId } = this.props;
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
        {this.durationHeader?.map((month, i) => (
          <button
            className={`page-item  
            border-0 rounded mr-4 text-white ${
              currentId === i ? "bg-primary" : "bg-white"
            }
          `}
            style={{
              padding: "5px",
            }}
            key={month + i}
            onClick={() => {
              selectMonth(i);
            }}
          >
            {month.month}
          </button>
        ))}
      </div>
    );
  }
}
