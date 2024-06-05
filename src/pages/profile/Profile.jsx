import { Component } from "react";
import UserDetail from "../../components/profile/UserDetail";
import BalanceStats from "../../components/Dashboard/BalanceStats";
import UserAccounts from "../../components/profile/UserBankAccounts";
import BalanceInfo from "../../components/profile/BalanceInfo";
import UserWalletAccounts from "../../components/profile/UserWalletAccounts";

export default class Profile extends Component {
  constructor() {
    super();
  }

  render() {
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
          <div className="container-fluid  ">
            <div className="">
              <BalanceInfo />
              </div>
            <div className="row">
              <div className="col-md-5 align-items-center">
                <UserDetail />
              </div>

              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12">
                  <UserAccounts />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 align-items-center">
              <BalanceStats />
                
              </div>
              <div className="col-md-6 align-items-center">
              <UserWalletAccounts />
                
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
