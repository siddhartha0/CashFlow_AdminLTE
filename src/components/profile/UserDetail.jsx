import { Component } from "react";

class PersonalInformation extends Component {
  render() {
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
              <h3 className="profile-username mt-3 text-center">John Doe</h3>
              <p className="text-muted text-center">Scientist</p>
            </div>
            <div className="col-md-8">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>john.doe@example.com</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-phone mr-2"></i>
                  <span>+977 9801234567</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>Balkumari, Lalitpur</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-venus-mars mr-2"></i>
                  <span>Male</span>
                </li>
                <li className="mb-3">
                  <i className="fas fa-birthday-cake mr-2"></i>
                  <span>01-Jan-1990</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInformation;
