import { Component } from "react";
import UserDetail from "../../components/profile/UserDetail";
import BalanceInfo from "../../components/profile/BalanceInfo";
import MenuOptionModel from "../../const/widget_component_model/MenuOptionModel";
import { PickWallet } from "../../const/PickWallet";

export default class BankProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWallet: PickWallet[0] 
    };
  }

  pickWallet = (selectedWallet) => {
    this.setState({ selectedWallet });
  }

  render() {
    const { selectedWallet } = this.state;

    return (
      <div className="p-4">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/Home">Home</a>
                  </li>
                  <li className="breadcrumb-item active">User Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT STARTS FROM HERE */}

        <section className="content">
          <div className="container-fluid">
            <div className="">
              <BalanceInfo />
            </div>
            <div>
            <MenuOptionModel
              className="breadcrumb float-sm-left p-2"
              option={PickWallet}
              PickPlatform={this.pickWallet}
            />
            <div className="row">
              <div className="col-md-5 align-items-center">
                <UserDetail />
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12">
                    <h2>{selectedWallet.name}</h2>
                    <p>{selectedWallet.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6 align-items-center">
              </div>
              <div className="col-md-6 align-items-center">
              </div>
            </div> */}
          </div>
          </div>
        </section>
      </div>
    );
  }
}
