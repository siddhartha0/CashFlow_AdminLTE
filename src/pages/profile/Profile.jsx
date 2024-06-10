import { Component } from "react";
import UserDetail from "../../components/profile/UserDetail";
import BalanceInfo from "../../components/profile/BalanceInfo";
import UserWalletAccounts from "../../components/profile/UserWalletAccounts";
import SavingGoals from "../../components/profile/SavingGoals";
import UserBankAccounts from "../../components/profile/UserBankAccounts";

export default class Profile extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="container my-4">
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
              <div className=" row mb-4">
                <div className="col-md-6">
                  <UserDetail />
                </div>
                <div className="col-md-6">
                  <BalanceInfo />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <UserWalletAccounts />
                </div>
                <div className="col-md-6">
                  <UserBankAccounts />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-12">
                  <SavingGoals />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
