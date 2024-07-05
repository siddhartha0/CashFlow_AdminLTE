import { Component } from "react";
import { connect, useSelector } from "react-redux";
import { userDetails } from "../../slices/slice/auth/AuthSlice";

export default function UserInformation() {
  const details = useSelector(userDetails);

  return (
    <div>
      <PersonalInformation
        userName={details.username}
        email={details.email}
        contact={details.contact}
        address={details.address}
        gender={details.gender ?? "male"}
        dateOfBirth={details.dateOfBirth ?? "09-1-2000"}
      />
    </div>
  );
}

class PersonalInformation extends Component {
  render() {
    const { userName, email, contact, address, gender, dateOfBirth } =
      this.props;
    return (
      <div className="card mb-4" style={{ backgroundColor: "#f8d7da" }}>
        <div className="card-header bg-danger text-white">
          <h3 className="card-title">Personal Information</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 d-flex flex-column align-items-center">
              <img
                className="img-fluid img-circle"
                src="../../dist/img/user4-128x128.jpg"
                alt="User profile picture"
                style={{ width: "75px", height: "75px" }}
              />
              <h3 className="profile-username mt-3 text-center">{userName}</h3>
              <p className="text-muted text-center">Scientist</p>
            </div>
            <div className="col-md-8">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>{email}</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-phone mr-2"></i>
                  <span>+977 {contact}</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{address}</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-venus-mars mr-2"></i>
                  <span>{gender}</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-birthday-cake mr-2"></i>
                  <span>{dateOfBirth}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

connect().PersonalInformation;
