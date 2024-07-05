import { Component } from "react";
import BalanceInfo from "../../components/profile/BalanceInfo";
import UserWalletAccounts from "../../components/profile/UserWalletAccounts";
import SavingGoals from "../../components/profile/SavingGoals";
import UserBankAccounts from "../../components/profile/UserBankAccounts"; // Assuming the path is correct
import UserInformation from "../../components/profile/UserDetail";

export default class Profile extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="container">
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
              <div className="row mb-4">
                <div className="col-md-12">
                  <BalanceInfo />
                </div>
              </div>
              <div className="row mb-4 align-items-end">
                <div className="col-md-5">
                  <UserInformation />
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
