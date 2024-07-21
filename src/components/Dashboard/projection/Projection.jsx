import { Component, useEffect, useState } from "react";
import HeadController from "../../../behindTheScene/helper/HeadController";
import PropTypes from "prop-types";
import LocalStorageInitData from "../../../behindTheScene/helper/LocalStorageInitData";
import SmallLineChart from "../../../const/widget_component_model/charts/SmallLineChart";
import ReactApexChart from "react-apexcharts";

export default function Projection() {
  const { user_Bank_Data, userbankDataExists } = HeadController();

  const { allBankData } = LocalStorageInitData();

  const [userbank, setUserBank] = useState([]);

  const [chartData, setChartData] = useState();

  const [selectedPlatform, setSelectedPatform] = useState(
    user_Bank_Data ? user_Bank_Data[0] : null
  );

  const [getSelectedBankDetails, setSelectedBankDetails] = useState();

  const selectPlatform = (e) => {
    const value = e.target.value;
    const getSelectedData = user_Bank_Data?.filter(
      (account) => account.bankName === value
    );

    setSelectedPatform(getSelectedData[0]);
    const filteredBankData = allBankData.entities.filter(
      (data) => data.bankName === value
    );
    setSelectedBankDetails(filteredBankData[0]);
  };

  useEffect(() => {
    if (userbankDataExists) {
      let options = [];
      user_Bank_Data.map((bank) => {
        console.log(bank);
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
      console.log(options);
      setUserBank(options);
    }
  }, [user_Bank_Data, userbankDataExists]);

  return (
    <ProjectionWrapped
      userbank={userbank}
      selectPlatform={selectPlatform}
      selectedPlatform={selectedPlatform}
      chartProjectionData={getSelectedBankDetails}
      userbankDataExists={userbankDataExists}
      user_Bank_Data={user_Bank_Data}
    />
  );
}

class ProjectionWrapped extends Component {
  static propTypes = {
    userbank: PropTypes.array,
    selectPlatform: PropTypes.func,
    selectedPlatform: PropTypes.object,
    chartProjectionData: PropTypes.object,
    userbankDataExists: PropTypes.bool,
  };

  render() {
    const {
      userbank,
      selectPlatform,
      selectedPlatform,
      chartProjectionData,
      userbankDataExists,
    } = this.props;
    console.log(userbank);

    const state = {
      series: [
        {
          data: userbank.map((bank) => bank.currentAmount),
        },
        {
          data: userbank.map((bank) => bank.projectedAmount),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 430,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: userbank.map((bank) => bank.title),
        },
      },
    };

    return (
      <main id="parentDiv" className="d-flex flex-column gap-2">
        <header className="text-black text-bold text-md">Projection</header>
        {userbankDataExists ? (
          <section className="d-flex flex-column mt-2 ">
            <article>{userbank?.currentAmount}</article>
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
          </section>
        ) : (
          <section className="mt-2">No Data</section>
        )}
        <SmallLineChart />
      </main>
    );
  }
}
