import React, { useState } from 'react';
import moment from 'moment';

const SettingsForm = () => {
  const [profileForm, setProfileForm] = useState({
    submitted: false,
    errors: null
  });
  const [profileDetails, setProfileDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsAppNumber: '',
    dateOfBirth: moment(),
    address: '',
    pinCode: '',
    sex: '',
    maritalStatus: '',
    nationality: '',
    designation: '',
    team: '',
    hiredOn: moment(),
    jobType: '',
    status: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfileForm(() => ({
      ...profileForm,
      submitted: true
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails(() => ({
      ...profileDetails,
      [name]: value
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Profile</h1>
      </div>
      <form onSubmit={ handleSubmit }>
        <div className="p-3 rounded">
          <div className="form-row">
            <img
              src="https://randomuser.me/api/portraits/men/77.jpg"
              className="rounded-circle d-block mb-3"
              alt="Profile"
            />
          </div>
          <div className="form-row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="firstNameField">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="firstNameField"
                  name="firstName"
                  placeholder="First Name"
                  value={ profileDetails.firstName }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="middleNameField">Middle Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="middleNameField"
                  name="middleName"
                  placeholder="Middle Name"
                  value={ profileDetails.middleName }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="lastNameField">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="lastNameField"
                  name="lastName"
                  placeholder="Last Name"
                  value={ profileDetails.lastName }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="phoneNumberField">Phone Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="phoneNumberField"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={ profileDetails.phoneNumber }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="whatsappNumberField">Whatsapp Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Whatsapp Number"
                  value={ profileDetails.whatsappNumber }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <span className="form-control">sijusamson@gmail.com</span>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="dateOfBirthField">Date of Birth</label>
                <span className="form-control">04/06/1995</span>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="addressField">Address</label>
                <input
                  className="form-control"
                  type="text"
                  id="addressField"
                  name="address"
                  placeholder="Address"
                  value={ profileDetails.address }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="pinCodeField">Pincode</label>
                <input
                  className="form-control"
                  type="text"
                  id="pinCodeField"
                  name="pinCode"
                  placeholder="PinCode"
                  value={ profileDetails.pinCode }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="sexField">Sex</label>
                <span className="form-control">Male</span>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="maritalStatusField">Marital Status</label>
                <select
                  className="custom-select"
                  type="text"
                  id="maritalStatusField"
                  name="maritalStatus"
                  value={ profileDetails.maritalStatus }
                  onChange={ handleChange }
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
                {/* { (employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.maritalStatus)
                  && (
                    <span className="text-danger">
                      { employeeForm.errors.maritalStatus[0] }
                    </span>
                  ) } */}
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="nationalityField">Nationality</label>
                <span className="form-control">Indian</span>
              </div>
            </div>
          </div>

          <h4>Job Details</h4>
          <div className="form-row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="designationField">Designation</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ profileDetails.designation }
                  onChange={ handleChange }
                >
                  <option value="">Select a Designation</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="teamField">Team</label>
                <select
                  className="custom-select"
                  type="text"
                  id="teamField"
                  name="team"
                  value={ profileDetails.team }
                  onChange={ handleChange }
                >
                  <option value="">Select a Team</option>
                  {/* { teamList.map((team) => (
                    <option value={ team.teamName }>{ team.teamName }</option>
                  )) } */}
                </select>
                { (profileForm.submitted
                  && profileForm.errors
                  && profileForm.errors.team)
                  && (
                    <span className="text-danger">
                      { profileForm.errors.team[0] }
                    </span>
                  ) }
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="hiredOnField">Hired On</label>
                <span className="form-control">11/01/2020</span>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label htmlFor="jobTypeField">Job Type</label>
                <select
                  className="custom-select"
                  type="text"
                  id="jobTypeField"
                  name="jobType"
                  value={ profileDetails.jobType }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Part Time</option>
                  <option value="Inactive">Full Time</option>
                </select>
                { (profileForm.submitted
                  && profileForm.errors
                  && profileForm.errors.jobType)
                  && (
                    <span className="text-danger">
                      { profileForm.errors.jobType[0] }
                    </span>
                  ) }
              </div>
            </div>

          </div>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
