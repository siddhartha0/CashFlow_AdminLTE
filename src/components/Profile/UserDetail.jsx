import { Component } from "react";

class PersonalInformation extends Component {
  render() {
    return (
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Personal Information</h3>
        </div>
        <div className="card-body box-profile">
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src="../../dist/img/user4-128x128.jpg"
              alt="User profile picture"
            />
          </div>
          <h3 className="profile-username text-center">John Doe</h3>
          <p className="text-muted text-center">
            Personal Financial Management
          </p>
          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
              <b>Email</b> <a className="float-right">john.doe@example.com</a>
            </li>
            <li className="list-group-item">
              <b>Phone Number</b> <a className="float-right">+977 9801234567</a>
            </li>
            <li className="list-group-item">
              <b>Address</b> <a className="float-right">Balkumari, Lalitpur</a>
            </li>
            <li className="list-group-item">
              <b>Gender</b> <a className="float-right">Male</a>
            </li>
            <li className="list-group-item">
              <b>Date of Birth</b> <a className="float-right">01-Jan-1990</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PersonalInformation;
