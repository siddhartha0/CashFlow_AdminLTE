import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import AssetPieChart from "../../components/asset/AssetPieChart";
import DynamicTable from "../../components/asset/DynamicTable";

class Asset extends Component {
  constructor() {
    super();
    this.state = {
      pieChartData: {
        series: [300000, 20000], // Example values for House and Car
        labels: ["House", "Car"],
      },
      assets: [
        { id: 1, name: "House", value: 300000, userId: 1 },
        { id: 2, name: "Car", value: 20000, userId: 2 },
      ],
    };
  }

  handleUpdate = (asset) => {
    this.props.navigate(`/dashboard/asset/update/${asset.id}`, {
      state: { asset },
    });
  };

  handleDelete = (id) => {
    console.log(`Delete asset with id: ${id}`);
    this.setState((prevState) => ({
      assets: prevState.assets.filter((asset) => asset.id !== id),
    }));
  };

  render() {
    const { pieChartData, assets } = this.state;

    return (
      <div>
        <h1>Asset Management</h1>
        <Link to="/dashboard/asset/new" className="btn btn-primary mb-3">
          Create Asset
        </Link>
        <div className="row card">
          <div>
            <AssetPieChart
              series={pieChartData.series}
              labels={pieChartData.labels}
            />
          </div>
        </div>
        <div className="row mt-4 card">
          <div className="col-lg-12">
            <DynamicTable
              headers={[
                { key: "name", label: "Asset Name" },
                { key: "value", label: "Asset Value" },
                { key: "actions", label: "Actions" },
              ]}
              data={assets.map((asset) => ({
                ...asset,
                actions: (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => this.handleUpdate(asset)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(asset.id)}
                    >
                      Delete
                    </button>
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => <Asset {...props} navigate={useNavigate()} />;
