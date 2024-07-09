import { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  updateCredentials,
  userDetails,
} from "../../slices/slice/auth/AuthSlice";
import { useUpdateUserMutation } from "../../slices/api/user/UserApi";
import LoaderSpinner from "../../const/widget_component_model/LoaderSpinner";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateProfileForm() {
  const details = useSelector(userDetails);

  const [userProfile, setUserProfile] = useState({
    userName: details?.username,
    email: details?.email,
    contact: details?.contact,
    address: details?.address,
    gender: details?.gender ?? "male",
    dateOfBirth: details?.dateOfBirth ?? "1990-01-01",
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [isChangesSaved, setIsChangesSave] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Number(details?.id);
    const newUpdatedValue = {
      id: id,
      username: userProfile.userName,
      email: userProfile?.email,
      contact: userProfile?.contact,
      address: userProfile?.address,
      gender: userProfile?.gender,
      dateOfBirth: userProfile?.dateOfBirth,
    };
    console.log("Updated Profile:", newUpdatedValue);
    await updateUser({ id, newUpdatedValue }).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
        if (resp?.error?.status !== "FETCH_ERROR")
          toast.error(resp?.error?.data?.message);
      }

      if (resp.data) {
        setIsChangesSave(true);
        dispatch(updateCredentials(newUpdatedValue));
      }
    });
  };

  return (
    <ProfileForm
      userProfile={userProfile}
      handleInputChange={(e) => handleInputChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
      isChangesSaved={isChangesSaved}
      isLoading={isLoading}
    />
  );
}

class ProfileForm extends Component {
  static propTypes = {
    userProfile: PropTypes.object,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    isChangesSaved: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  render() {
    const {
      userProfile,
      handleInputChange,
      handleSubmit,
      isChangesSaved,
      isLoading,
    } = this.props;

    return (
      <div className="card">
        <Toaster />
        {isLoading && <LoaderSpinner />}
        <div className="card-header">
          <h3 className="card-title">Edit Profile</h3>
        </div>
        <div className="card-body">
          {isChangesSaved && (
            <div className="alert alert-success" role="alert">
              Changes saved successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={userProfile?.userName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                value={userProfile.contact}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={userProfile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={userProfile.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={userProfile.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

connect()(ProfileForm);
