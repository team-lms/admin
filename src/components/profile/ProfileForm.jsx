import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { validate as Validator } from 'validate.js';
import { LoginUser } from '../../api/service';
import { setProfile } from '../../store/actions/profile';

const SettingsForm = ({ profile }) => {
  const dispatch = useDispatch();
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
    whatsappNumber: '',
    dateOfBirth: new Date(),
    address: '',
    pinCode: '',
    sex: '',
    maritalStatus: '',
    nationality: '',
    designation: '',
    team: '',
    hiredOn: new Date(),
    jobType: '',
    status: ''
  });

  useEffect(() => {
    setProfileDetails((prevProfile) => ({
      ...prevProfile,
      ...profile,
      dateOfBirth: moment(profile.dateOfBirth).toDate(),
      hiredOn: moment(profile.hiredOn).toDate()
    }
    ));
  }, []);

  useEffect(() => {
    const validationResult = Validator.validate(profileDetails, {
      whatsappNumber: { length: { is: 10 } },
      address: { presence: { allowEmpty: false } },
      pinCode: {
        presence: { allowEmpty: false },
        numericality: { onlyInteger: true }
      },
      maritalStatus: { presence: { allowEmpty: false } },
      jobType: { presence: { allowEmpty: false } },
      status: { presence: { allowEmpty: false } }
    });
    setProfileForm((prev) => ({
      ...prev,
      errors: validationResult || null
    }));
  }, [profileDetails]);

  const saveProfile = async (body) => {
    const result = await LoginUser.updateProfile(body);
    if (result.data.success) {
      toast.success(result.data.message);
      const updatedProfile = await LoginUser.getProfile();
      dispatch(setProfile(updatedProfile.data.data));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfileForm(() => ({
      ...profileForm,
      submitted: true
    }));
    console.log(profileForm);
    if (profileForm.errors
      && profileForm.errors.whatsappNumber
      && profileForm.errors.whatsappNumber[0] && profileForm.whatsappNumber === '') {
      delete (profileForm.errors.whatsappNumber);
    }
    if ((profileForm.errors === null)
      || profileForm.errors.length === 0
      || Object.keys(profileForm.errors).length === 0) {
      saveProfile(profileDetails);
    }
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
                <span className="form-control">{ profileDetails.firstName }</span>
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
                  value={ profileDetails.middleName ? profileDetails.middleName : '' }
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
                  value={ profileDetails.lastName ? profileDetails.lastName : '' }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="phoneNumberField">Phone Number</label>
                <span className="form-control">{ profileDetails.phoneNumber }</span>
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
                  value={ profileDetails.whatsappNumber ? profileDetails.whatsappNumber : '' }
                  onChange={ handleChange }
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <span className="form-control">{ profileDetails.email }</span>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="dateOfBirthField">Date of Birth</label>
                <DatePicker
                  disabled
                  selected={ profileDetails.dateOfBirth }
                  id="dateOfBirthField"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  onChange={ (date) => handleChange({ target: { name: 'dateOfBirth', value: date } }) }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
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
                { (profileForm.submitted
                  && profileForm.errors
                  && profileForm.errors.address)
                  && (
                    <span className="text-danger">
                      { profileForm.errors.address[0] }
                    </span>
                  ) }
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
                { (profileForm.submitted
                  && profileForm.errors
                  && profileForm.errors.pinCode)
                  && (
                    <span className="text-danger">
                    { profileForm.errors.pinCode[0] }
                    </span>
                  ) }
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="sexField">Sex</label>
                <span className="form-control">{ profileDetails.sex }</span>
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
                { (profileForm.submitted
                  && profileForm.errors
                  && profileForm.errors.maritalStatus)
                  && (
                    <span className="text-danger">
                      { profileForm.errors.maritalStatus[0] }
                    </span>
                  ) }
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label htmlFor="nationalityField">Nationality</label>
                <span className="form-control">{ profileDetails.nationality }</span>
              </div>
            </div>
          </div>

          <h4>Job Details</h4>
          <div className="form-row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="designationField">Designation</label>
                <span className="form-control">{ profileDetails.designation }</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="hiredOnField">Hired On</label>
                <DatePicker
                  disabled
                  selected={ profileDetails.hiredOn }
                  id="hiredOnField"
                  placeholder="Hired on"
                  name="hiredOn"
                  onChange={ (date) => handleChange({ target: { name: 'hiredOn', value: date } }) }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
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
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
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
            <div className="col-12 text-right">
              <button type="submit" className="btn btn-primary mr-2">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

SettingsForm.propTypes = {
  profile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps)(SettingsForm);
