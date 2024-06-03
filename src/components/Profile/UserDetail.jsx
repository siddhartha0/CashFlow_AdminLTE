import { Component } from "react";


export default class UserDetail extends Component {

    constructor(){
        super();
    }

  render() {
    return (
      <>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                <img
                  className="profile-user-img img-fluid img-circle"
                  src="../../dist/img/user4-128x128.jpg"
                  alt="User profile picture"
                />
              </div>

              <h3 className="profile-username text-center">Iron Man</h3>

              <p className="text-muted text-center">Software Engineer</p>

              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Email</b> <a className="float-right">ironman@example.com</a>
                </li>
                <li className="list-group-item">
                  <b>Phone Number</b> <a className="float-right">+977 980123456</a>
                </li>
                <li className="list-group-item">
                  <b>Address</b> <a className="float-right">Balkumari, Lalitpurs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
