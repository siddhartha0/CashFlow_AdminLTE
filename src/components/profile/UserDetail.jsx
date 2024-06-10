import { Component } from "react";
import EditProfileForm from "./EditProfileForm";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {
      name: "John Doe",
      job: "Scientist",
      email: "john.doe@example.com",
      phone: "+977 9801234567",
      address: "Balkumari, Lalitpur",
      gender: "Male",
      birthday: "01-Jan-1990",
      profilePic: "../../dist/img/user4-128x128.jpg",
    };

    this.state = {
      showModal: false,
      userInfo: storedUserInfo,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userInfo: { ...prevState.userInfo, [name]: value },
    }));
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState((prevState) => ({
        userInfo: { ...prevState.userInfo, profilePic: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userInfo } = this.state;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.toggleModal();
  };

  render() {
    const { showModal, userInfo } = this.state;

    return (
      <>
        <div className="card mb-4" style={{ backgroundColor: "#f8d7da" }}>
          <div className="card-header bg-danger">
            <h3 className="card-title mt-2">Personal Information</h3>
            <button className="card-tools btn text-white" onClick={this.toggleModal}>
              Edit
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-md-6 d-flex flex-column align-items-center border-end border-dark">
                <img
                  className="img-fluid img-circle"
                  src={userInfo.profilePic}
                  alt="User profile picture"
                  style={{ width: "75px", height: "75px" }}
                />
                <h3 className="profile-username mt-3 text-center">{userInfo.name}</h3>
                <p className="text-muted text-center">{userInfo.job}</p>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <i className="fas fa-envelope mr-2"></i>
                    <span>{userInfo.email}</span>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-phone mr-2"></i>
                    <span>{userInfo.phone}</span>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{userInfo.address}</span>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-venus-mars mr-2"></i>
                    <span>{userInfo.gender}</span>
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-birthday-cake mr-2"></i>
                    <span>{userInfo.birthday}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <EditProfileForm
            userInfo={userInfo}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleFileChange={this.handleFileChange}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default PersonalInformation;
