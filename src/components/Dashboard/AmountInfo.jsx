import { Component } from "react";
import AmountInfoComponents from "./AmountInfoComps/AmountInfoComponents";
import { FaAngleDown, FaAngleUp, FaMinus } from "react-icons/fa6";
import PropTypes from "prop-types";
import Balance from "../../behindTheScene/balance/Balance";
import PercentilePieChart from "../../const/widget_component_model/PercentilePieChart";
import AccordianModel from "../../const/widget_component_model/AccordianModel";

export default class AmountInfo extends Component {
  constructor() {
    super();
  }
  static propTypes = {
    header: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    const { header, label } = this.props;
    const storageData = JSON.parse(localStorage.getItem("dashboard"));
    const cashflow = new Balance();

    return (
      <div className="d-flex flex-column gap-4  ">
        <header
          className="text-lg "
          style={{
            color: "#9B4078",
            fontWeight: 600,
          }}
        >
          {header}
        </header>

        <div className="d-flex  w-[100%] mt-4 ">
          <AmountInfoComponents
            icon={
              <FaAngleUp className="text-lg place-self-start text-success" />
            }
            amount={
              label === "Bank"
                ? cashflow.measureHighestAmount(storageData.bankhistory)
                : cashflow.measureHighestAmount(storageData.walletHistory)
            }
            label="Highest"
          />

          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "80px",
              marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />
          <AmountInfoComponents
            icon={<FaMinus className="text-lg place-self-start text-primary" />}
            amount={
              label === "Bank"
                ? cashflow.measureAverageMoney(storageData.bankhistory)
                : cashflow.measureAverageMoney(storageData.walletHistory)
            }
            label="Average"
          />

          <hr
            className="text-dark text-opacity-50"
            style={{
              width: ".5px",
              height: "80px",
              marginTop: "-5px",
              background: "#DDDFE1",
            }}
          />
          <AmountInfoComponents
            icon={
              <FaAngleDown className="text-lg place-self-start text-danger" />
            }
            label="Lowest"
            amount={
              label === "Bank"
                ? cashflow.measureLowestAmount(storageData.bankhistory)
                : cashflow.measureLowestAmount(storageData.walletHistory)
            }
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>
            <AccordianModel title="Balance maintained  above average ">
              <div
                style={{
                  width: "180px",
                }}
              >
                <PercentilePieChart
                  seriesValue={
                    label === "Bank"
                      ? `${cashflow.aboveAvg(storageData.bankhistory)} `
                      : cashflow.aboveAvg(storageData.walletHistory)
                  }
                  color="#ABE5A1"
                />
              </div>
            </AccordianModel>
          </div>

          <div>
            <AccordianModel title="Balance maintained  below average ">
              <div
                style={{
                  width: "180px",
                }}
              >
                <PercentilePieChart
                  seriesValue={
                    label === "Bank"
                      ? cashflow.belowAvg(storageData.bankhistory)
                      : cashflow.belowAvg(storageData.walletHistory)
                  }
                  color="#DC3545"
                />
              </div>
            </AccordianModel>
          </div>
        </div>
      </div>
    );
  }
}
