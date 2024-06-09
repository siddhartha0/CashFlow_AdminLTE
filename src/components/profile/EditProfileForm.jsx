import { Component } from 'react';

export default class ProfileForm extends Component {
  state = {
    userProfile: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: '',
      dateOfBirth: '',
    },
  };

  componentDidMount() {
    this.setState({
      userProfile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '9876543210',
        address: '123 Main St, City, Country',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userProfile: {
        ...prevState.userProfile,
        [name]: value
      },
      isChangesSaved: false, // Reset the changes saved state when user modifies the form
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', this.state.userProfile);
    this.setState({
      isChangesSaved: true,
    });
  };

  render() {
    const { userProfile, isChangesSaved } = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Edit Profile</h3>
        </div>
        <div className="card-body">
          {isChangesSaved && ( 
            <div className="alert alert-success" role="alert">
              Changes saved successfully!
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={userProfile.firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={userProfile.lastName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userProfile.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={userProfile.phoneNumber}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={userProfile.address}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={userProfile.gender}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}
