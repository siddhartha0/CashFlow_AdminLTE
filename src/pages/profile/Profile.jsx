import { Component } from "react";
import UserDetail from "../../components/Profile/UserDetail";
import SavingGoals from "../../components/Profile/SavingGoals";
// import CreditScore from "../../components/Profile/CreditScore";

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
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <UserDetail />
              </div>

              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <SavingGoals />
                  </div>
                </div>
                {/* <div className="row mt-4">
                  <div className="col-md-12">
                    <CreditScore />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
