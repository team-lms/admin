import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validate as Validator } from 'validate.js';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { Teams, CountryList, Designation } from '../../../api/service';
import 'react-datepicker/dist/react-datepicker.css';

const UserForm = ({ title, cancelLink, handleSubmitForm }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userForm, setUserForm] = useState({
    submitted: false,
    errors: null
  });

  const [userDetails, setUserDetails] = useState({
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
    teamId: null,
    hiredOn: new Date(),
    jobType: 'Full Time',
    status: 'Active'
  });
  const [filters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortBy: 'createdAt'
  });
  const [teamList, setTeamList] = useState([]);
  const [designationList, setDesignationList] = useState([]);

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    if (title.split(' ')[0] === 'Edit') {
      setIsEdit(true);
      const user = JSON.parse(window.localStorage.getItem('currentUser'));
      setUserDetails((userDetail) => ({
        ...userDetail,
        ...user,
        teamId: user.teamAssociation.team.id,
        dateOfBirth: moment(user.dateOfBirth).toDate(),
        hiredOn: moment(user.hiredOn).toDate()
      }));
    }
  }, [title]);

  useEffect(() => {
    const validationResult = Validator.validate(userDetails, {
      firstName: { presence: { allowEmpty: false } },
      phoneNumber: { presence: { allowEmpty: false }, length: { is: 10 } },
      whatsappNumber: { length: { is: 10 } },
      email: { presence: { allowEmpty: false }, email: true },
      dateOfBirth: { presence: { allowEmpty: false } },
      address: { presence: { allowEmpty: false } },
      pinCode: {
        presence: { allowEmpty: false },
        numericality: { onlyInteger: true }
      },
      sex: { presence: { allowEmpty: false } },
      maritalStatus: { presence: { allowEmpty: false } },
      nationality: { presence: { allowEmpty: false } },
      designation: { presence: { allowEmpty: false } },
      hiredOn: { presence: { allowEmpty: false } },
      jobType: { presence: { allowEmpty: false } },
      status: { presence: { allowEmpty: false } }
    });

    if (typeof userDetails !== 'undefined') {
      if (userDetails.whatsappNumber
        && userDetails.whatsappNumber.length === 0) {
        delete validationResult.whatsappNumber;
      }
    }

    setUserForm((prev) => ({
      ...prev,
      errors: validationResult || null
    }));
  }, [userDetails]);


  useEffect(() => {
    /**
 * Get Country Wise Information
 */
    const getCountry = async () => {
      const result = await CountryList.getCountryList();
      setCountryList(result.data);
    };

    /**
 * Get Team API Call
 */
    const getTeams = async () => {
      const result = await Teams.getTeamList(filters);
      if (result.data.success) {
        setTeamList(result.data.data.rows);
      } else {
        toast.error(result.message);
      }
    };

    getTeams();
    getCountry();
  }, [filters]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserForm(() => ({
      ...userForm,
      submitted: true
    }));
    if (userForm.errors
      && userForm.errors.whatsappNumber
      && userForm.errors.whatsappNumber[0] && userDetails.whatsappNumber === '') {
      delete (userForm.errors.whatsappNumber);
    }
    if ((userForm.errors === null)
      || (userForm.errors.length === 0)
      || Object.keys(userForm.errors).length === 0) {
      handleSubmitForm(userDetails);
    }
  };

  /**
   * Get Designation List
   */
  useEffect(() => {
    const getDesignations = async () => {
      const result = await Designation.getDesignationList(filters);
      if (result.data.success) {
        setDesignationList(result.data.data.rows);
      } else {
        toast.error(result.message);
      }
    };
    getDesignations();
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(() => ({
      ...userDetails,
      [name]: value
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">
          { title }
        </h1>
      </div>
      <form onSubmit={ handleSubmit }>
        <div className="p-3 rounded">
          <h4>Personal Information</h4>
          <div className="form-row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="firstNameField">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="firstNameField"
                  name="firstName"
                  placeholder="First name"
                  value={ userDetails.firstName }
                  onChange={ handleChange }
                />
                { (userForm.submitted && userForm.errors
                  && userForm.errors.firstName)
                  && (
                    <span className="text-danger">{ userForm.errors.firstName[0] }</span>
                  ) }
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
                  placeholder="Middle name"
                  value={ userDetails.middleName }
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
                  value={ userDetails.lastName }
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
                  value={ userDetails.phoneNumber }
                  onChange={ handleChange }
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.phoneNumber)
                  && (userForm.errors.phoneNumber[0]
                    ? (<span className="text-danger">{ userForm.errors.phoneNumber[0] }</span>)
                    : (<span className="text-danger">{ userForm.errors.phoneNumber[1] }</span>)
                  ) }
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="whatsappNumberField">WhatsApp Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Whatsapp Number"
                  value={ userDetails.whatsappNumber }
                  onChange={ handleChange }
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.whatsappNumber)
                  && (
                    <span className="text-danger">
                      { userForm.errors.whatsappNumber[0] }
                    </span>
                  ) }

              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <input
                  className="form-control"
                  type="text"
                  id="emailField"
                  name="email"
                  placeholder="Email Id"
                  value={ userDetails.email }
                  onChange={ handleChange }
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.email)
                  && (userForm.errors.email[0]
                    ? (<span className="text-danger">{ userForm.errors.email[0] }</span>)
                    : (<span className="text-danger">{ userForm.errors.email[1] }</span>)
                  ) }

              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="dateOfBirthField">Date Of Birth</label>
                <DatePicker
                  selected={ userDetails.dateOfBirth }
                  id="dateOfBirthField"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  onChange={ (date) => handleChange({ target: { name: 'dateOfBirth', value: date } }) }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.dateOfBirth)
                  && (
                    <span className="text-danger">
                      { userForm.errors.dateOfBirth[0] }
                    </span>
                  ) }

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
                  value={ userDetails.address }
                  onChange={ handleChange }
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.address)
                  && (
                    <span className="text-danger">
                      { userForm.errors.address[0] }
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
                  value={ userDetails.pinCode }
                  onChange={ handleChange }
                />
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.pinCode)
                  && (userForm.errors.pinCode[0]
                    ? (
                      <span className="text-danger">
                        { userForm.errors.pinCode[0] }
                      </span>
                    )
                    : (
                      <span className="text-danger">
                        { userForm.errors.pinCode[1] }
                      </span>
                    )) }
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="sexField">Select Sex</label>
                <select
                  className="custom-select"
                  type="text"
                  id="sexField"
                  name="sex"
                  value={ userDetails.sex }
                  onChange={ handleChange }
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.sex)
                  && (
                    <span className="text-danger">
                      { userForm.errors.sex[0] }
                    </span>
                  ) }
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
                  value={ userDetails.maritalStatus }
                  onChange={ handleChange }
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.maritalStatus)
                  && (
                    <span className="text-danger">
                      { userForm.errors.maritalStatus[0] }
                    </span>
                  ) }
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="nationalityField">Nationality</label>
                <select
                  className="custom-select"
                  type="text"
                  id="nationalityField"
                  name="nationality"
                  value={ userDetails.nationality }
                  onChange={ handleChange }
                >
                  <option value="">Select Nationality</option>
                  { countryList.map((country) => (
                    <option key={ country.name } value={ country.demonym }>
                      { country.demonym }
                    </option>
                  )) }
                </select>
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.nationality)
                  && (
                    <span className="text-danger">
                      { userForm.errors.nationality[0] }
                    </span>
                  ) }

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
                  value={ userDetails.designation }
                  onChange={ handleChange }
                >
                  <option value="">Select a Designation</option>
                  { ' ' }
                  {
                    designationList.map(
                      (designation, index) => (
                        <option
                          // eslint-disable-next-line react/no-array-index-key
                          key={ index }
                          value={ designation.id }
                        >
                          { designation.name }
                        </option>
                      )
                    )
                  }
                </select>
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.designation)
                  && (
                    <span className="text-danger">
                      { userForm.errors.designation[0] }
                    </span>
                  ) }
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="teamField">Team</label>
                <select
                  className="custom-select"
                  type="text"
                  id="teamField"
                  name="teamId"
                  value={ userDetails.teamId }
                  onChange={ handleChange }
                >
                  <option value="">Select A Team</option>
                  { teamList.map((team) => (
                    <option key={ team.id } value={ team.id }>{ team.teamName }</option>
                  )) }
                </select>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="hiredOnField">Hired On</label>

                <DatePicker
                  selected={ userDetails.hiredOn }
                  id="hiredOnField"
                  placeholder="Hired On"
                  name="hiredOn"
                  onChange={ (date) => handleChange({ target: { name: 'hiredOn', value: date } }) }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />

                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.hiredOn)
                  && (
                    <span className="text-danger">
                      { userForm.errors.hiredOn[0] }
                    </span>
                  ) }
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
                  value={ userDetails.jobType }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                </select>
                { (userForm.submitted
                  && userForm.errors
                  && userForm.errors.jobType)
                  && (
                    <span className="text-danger">
                      { userForm.errors.jobType[0] }
                    </span>
                  ) }
              </div>
            </div>
            <div className="col-12 text-right">
              <button type="submit" className="btn btn-primary mr-2">
                {
                  isEdit ? 'Update' : 'Create'
                }
              </button>
              <Link type="submit" className="btn btn-secondary" to={ cancelLink }>Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};


UserForm.propTypes = {
  title: PropTypes.string.isRequired,
  cancelLink: PropTypes.string.isRequired,
  handleSubmitForm: PropTypes.func.isRequired
};


export default UserForm;
