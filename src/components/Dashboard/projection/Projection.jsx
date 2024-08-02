import { Component, useEffect, useState } from "react";
import HeadController from "../../../behindTheScene/helper/HeadController";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";

export default function Projection() {
  const { user_Bank_Data, userbankDataExists } = HeadController();

  const [userbank, setUserBank] = useState([]);

  useEffect(() => {
    if (userbankDataExists) {
      let options = [];
      user_Bank_Data.map((bank) => {
        const projectedAmount =
          (bank?.interestRate / 100) * bank?.currentAmount + bank.currentAmount;
        const option = {
          id: bank.id,
          title: bank.bankName,
          currentAmount: bank.currentAmount,
          projectedAmount: projectedAmount,
        };
        options.push(option);
      });
      setUserBank(options);
    }
  }, [user_Bank_Data, userbankDataExists]);

  return <ProjectionWrappedAgain userbank={userbank} />;
}

class ProjectionWrappedAgain extends Component {
  static propTypes = {
    userbank: PropTypes.array,
  };

  render() {
    const { userbank } = this.props;

    const state = {
      series: [
        {
          name: "Actual",
          data: userbank?.map((bank) => ({
            x: bank.title,
            y: bank.currentAmount,

            goals: [
              {
                name: "Expected",
                value: bank.projectedAmount,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          })),
        },
      ],
      options: {
        chart: {
          height: 100,
          type: "bar",
        },
        plotOptions: {
          bar: {
            columnWidth: "20%",
          },
        },
        colors: ["#00E396"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Actual", "Expected"],
          markers: {
            fillColors: ["#00E396", "#775DD0"],
          },
        },
      },
    };

    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
