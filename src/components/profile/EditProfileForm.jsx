import { Component } from "react";
import PropTypes from "prop-types";

export default class EditProfileForm extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
  };

  render() {
    const { userInfo, handleChange, handleSubmit, handleFileChange, toggleModal } = this.props;

    return (
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Personal Information</h5>
              <button type="button" className="close" onClick={toggleModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Job</label>
                  <input
                    type="text"
                    className="form-control"
                    name="job"
                    value={userInfo.job}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Birthday</label>
                  <input
                    type="text"
                    className="form-control"
                    name="birthday"
                    value={userInfo.birthday}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    name="profilePic"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
